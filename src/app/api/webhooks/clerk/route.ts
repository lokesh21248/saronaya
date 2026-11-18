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
        .or(`clerk_user_id.eq.${clerkUserId},clerk_id.eq.${clerkUserId},email.eq.${email}`)
        .maybeSingle()

      if (existingProfile) {
        await supabaseAdmin
          .from('profiles')
          .update({
            full_name: fullName,
            email,
            phone,
            avatar_url: avatarUrl,
            clerk_id: clerkUserId,
            clerk_user_id: clerkUserId,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProfile.id)
      } else {
        await supabaseAdmin.from('profiles').insert({
          clerk_id: clerkUserId,
          clerk_user_id: clerkUserId,
          full_name: fullName,
          email,
          phone,
          avatar_url: avatarUrl,
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

