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
    const { data: existingOrder } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid', updated_at: new Date().toISOString() })
      .eq('razorpay_order_id', orderId)
      .select('id, student_id, total_amount, net_amount, currency')
      .maybeSingle()

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

    // Record in payments table for live admin ledger
    try {
      await supabaseAdmin.from('payments').upsert({
        order_id: existingOrder?.id || null,
        student_id: existingOrder?.student_id || null,
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        razorpay_signature: signature,
        amount: existingOrder?.net_amount || existingOrder?.total_amount || 0,
        currency: existingOrder?.currency || 'INR',
        status: 'captured',
        method: 'razorpay',
      }, { onConflict: 'razorpay_payment_id' })
    } catch (payErr) {
      console.warn('Payment record insert warning:', payErr)
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
