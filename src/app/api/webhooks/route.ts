import { NextRequest, NextResponse } from 'next/server'
import { razorpayService } from '@/lib/services/razorpay'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature') || ''

    const isValid = await razorpayService.verifyWebhook(body, signature)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    let payload: any
    try {
      payload = JSON.parse(body)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    switch (payload.event) {
      case 'payment.captured':
        await handlePaymentCaptured(payload.payload?.payment?.entity || payload.data?.object)
        break
      case 'payment.failed':
        await handlePaymentFailed(payload.payload?.payment?.entity || payload.data?.object)
        break
      default:
        console.log(`Unhandled webhook event: ${payload.event}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

async function handlePaymentCaptured(payment: Record<string, any>) {
  if (!payment) return
  const { id, amount, currency, status, order_id, method } = payment

  // Record payment in database
  const { data: existingPayment } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('razorpay_payment_id', id)
    .single()

  if (existingPayment) {
    await supabaseAdmin
      .from('payments')
      .update({
        amount: Number(amount) / 100,
        currency,
        status,
        order_id,
        payment_method: method,
      })
      .eq('razorpay_payment_id', id)
  } else {
    await supabaseAdmin
      .from('payments')
      .insert({
        razorpay_payment_id: id,
        amount: Number(amount) / 100,
        currency: currency || 'INR',
        status: status || 'captured',
        order_id,
        payment_method: method,
      })
  }

  // Update order status and activate enrollment
  if (order_id) {
    await supabaseAdmin
      .from('orders')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('razorpay_order_id', order_id)

    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('course_id, student_id')
      .eq('razorpay_order_id', order_id)
      .single()

    if (order && order.course_id && order.student_id) {
      // Check existing enrollment
      const { data: existingEnrollment } = await supabaseAdmin
        .from('enrollments')
        .select('id')
        .eq('student_id', order.student_id)
        .eq('course_id', order.course_id)
        .single()

      if (!existingEnrollment) {
        await supabaseAdmin.from('enrollments').insert({
          student_id: order.student_id,
          course_id: order.course_id,
          enrollment_type: 'one_time',
          status: 'active',
          purchased_at: new Date().toISOString(),
        })
      }
    }
  }
}

async function handlePaymentFailed(payment: Record<string, any>) {
  if (!payment) return
  const { id, order_id } = payment

  if (order_id) {
    await supabaseAdmin
      .from('orders')
      .update({ status: 'failed', updated_at: new Date().toISOString() })
      .eq('razorpay_order_id', order_id)
  }
}
