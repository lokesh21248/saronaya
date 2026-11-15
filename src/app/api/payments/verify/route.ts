import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { razorpayService } from '@/lib/services/razorpay'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const body = await request.json()
    const { paymentId, orderId, signature, courseId } = body

    const isValid = await razorpayService.verifyPaymentSignature(
      paymentId,
      orderId,
      signature
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // Update order status in Supabase
    await supabaseAdmin
      .from('orders')
      .update({ status: 'paid', updated_at: new Date().toISOString() })
      .eq('razorpay_order_id', orderId)

    // Activate enrollment
    if (userId && courseId) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .or(`clerk_id.eq.${userId},clerk_user_id.eq.${userId}`)
        .maybeSingle()

      let profileId = profile?.id

      if (!profileId) {
        const { data: newProf } = await supabaseAdmin
          .from('profiles')
          .insert({
            clerk_id: userId,
            clerk_user_id: userId,
            email: `student_${userId.slice(0, 8)}@saryonaya.com`,
            full_name: 'Student',
            status: 'active',
          })
          .select('id')
          .maybeSingle()
        profileId = newProf?.id
      }

      if (profileId) {
        await supabaseAdmin.from('enrollments').upsert({
          student_id: profileId,
          course_id: courseId,
          access_type: 'individual_purchase',
          enrollment_type: 'individual_purchase',
          status: 'active',
          enrolled_at: new Date().toISOString(),
          purchased_at: new Date().toISOString(),
        }, { onConflict: 'student_id,course_id' })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and enrollment activated',
    })
  } catch (error) {
    console.error('Payment verify error:', error)
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 })
  }
}
