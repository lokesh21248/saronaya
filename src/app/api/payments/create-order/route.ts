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
      let studentUuid = null
      if (userId) {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .or(`clerk_id.eq.${userId},clerk_user_id.eq.${userId}`)
          .maybeSingle()

        if (profile) {
          studentUuid = profile.id
        } else {
          const { data: newP } = await supabaseAdmin
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
          studentUuid = newP?.id
        }
      }

      await supabaseAdmin.from('orders').insert({
        order_number: `ORD-${Date.now()}`,
        student_id: studentUuid,
        clerk_user_id: userId || 'guest',
        course_id: courseId || null,
        subscription_id: planId || null,
        razorpay_order_id: order.id,
        total_amount: amount,
        net_amount: amount,
        amount: amount,
        currency,
        order_type: planId ? 'subscription' : 'course_purchase',
        status: 'created',
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
