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
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('razorpay_order_id', orderId)

    // Activate enrollment
    if (userId && courseId) {
      await supabaseAdmin.from('enrollments').insert({
        student_id: userId,
        course_id: courseId,
        enrollment_type: 'one_time',
        status: 'active',
        purchased_at: new Date().toISOString(),
      })
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
