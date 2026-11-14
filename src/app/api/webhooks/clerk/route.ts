import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// POST /api/webhooks/clerk - Syncs Clerk users to Supabase profiles
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    let evt: any

    try {
      evt = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const { type, data } = evt

    console.log(`[Clerk Webhook] Received: ${type}`)

    if (type === 'user.created' || type === 'user.updated') {
      const clerkUserId = data.id
      const email = data.email_addresses?.[0]?.email_address || ''
      const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Student'
      const phone = data.phone_numbers?.[0]?.phone_number || null
      const avatarUrl = data.image_url || null

      const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('clerk_user_id', clerkUserId)
        .single()

      if (existingProfile) {
        await supabaseAdmin
          .from('profiles')
          .update({
            full_name: fullName,
            email,
            phone,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProfile.id)
      } else {
        await supabaseAdmin.from('profiles').insert({
          clerk_user_id: clerkUserId,
          full_name: fullName,
          email,
          phone,
          avatar_url: avatarUrl,
          role: 'student',
          status: 'active',
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Clerk Webhook Error]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
