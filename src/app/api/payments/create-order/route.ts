import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { razorpayService } from '@/lib/services/razorpay'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const body = await request.json()
    const { courseId, planId, amount, currency = 'INR' } = body

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 })
    }

    const receipt = `rcpt_${Date.now()}`
    const order = await razorpayService.createOrder(amount, currency, receipt, {
      courseId: courseId || '',
      planId: planId || '',
      studentId: userId || 'guest',
    })

    // Record order in Supabase
    if (order.id) {
      await supabaseAdmin.from('orders').insert({
        student_id: userId || 'guest',
        course_id: courseId || null,
        subscription_id: planId || null,
        razorpay_order_id: order.id,
        amount: amount,
        currency,
        status: 'pending',
        receipt,
      })
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 })
  }
}
