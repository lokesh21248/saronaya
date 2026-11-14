'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CreditCard,
  QrCode,
  Building,
  Loader2,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Gold3DButton } from '@/components/ui/Buttons'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseParam = searchParams?.get('course') || 'Full Access Engineering Masterclass'
  const priceParam = Number(searchParams?.get('price') || 1999)

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi')
  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState('FIRST100')
  const [discount, setDiscount] = useState(200)

  const finalAmount = Math.max(0, priceParam - discount)

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push(
        `/payment-success?order_id=SAR-${Math.floor(100000 + Math.random() * 900000)}&amount=${finalAmount}&course=${encodeURIComponent(
          courseParam
        )}`
      )
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: Payment Methods */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)]">
          <h2 className="text-base font-black text-[#102B50] mb-4 flex items-center justify-between">
            <span>Select Payment Method</span>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted
            </span>
          </h2>

          <div className="space-y-3">
            {/* UPI Option */}
            <label
              onClick={() => setPaymentMethod('upi')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === 'upi'
                  ? 'border-[#092653] bg-blue-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#092653]">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#102B50]">UPI / QR (Instant)</p>
                  <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              </div>
              <input
                type="radio"
                name="method"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
                className="w-4 h-4 accent-[#092653]"
              />
            </label>

            {/* Card Option */}
            <label
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'border-[#092653] bg-blue-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#092653]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#102B50]">Credit / Debit Card</p>
                  <p className="text-xs text-slate-500">Visa, Mastercard, RuPay, Maestro</p>
                </div>
              </div>
              <input
                type="radio"
                name="method"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="w-4 h-4 accent-[#092653]"
              />
            </label>

            {/* Net Banking */}
            <label
              onClick={() => setPaymentMethod('netbanking')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === 'netbanking'
                  ? 'border-[#092653] bg-blue-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#092653]">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#102B50]">Net Banking</p>
                  <p className="text-xs text-slate-500">All major Indian banks supported</p>
                </div>
              </div>
              <input
                type="radio"
                name="method"
                checked={paymentMethod === 'netbanking'}
                onChange={() => setPaymentMethod('netbanking')}
                className="w-4 h-4 accent-[#092653]"
              />
            </label>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Payments are secured with Razorpay&apos;s industry-grade 256-bit encryption.</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="lg:col-span-5">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)] sticky top-24">
          <h2 className="text-base font-black text-[#102B50] mb-4 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between font-semibold text-slate-700">
              <span className="truncate max-w-[200px]">{courseParam}</span>
              <span className="font-bold">₹{priceParam.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Welcome Discount (FIRST100)</span>
              <span>-₹{discount}</span>
            </div>

            <div className="flex justify-between text-slate-500">
              <span>GST / Tax (18% Included)</span>
              <span>₹0.00</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-black text-[#102B50]">Total Amount</span>
              <span className="text-2xl font-black text-[#092653]">
                ₹{finalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Pay Now Button */}
          <div className="mt-6">
            <Gold3DButton
              size="lg"
              isLoading={loading}
              onClick={handlePay}
              className="w-full"
            >
              Pay ₹{finalAmount.toLocaleString('en-IN')} &amp; Enroll
            </Gold3DButton>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-slate-400 font-medium">
              30-Day Money-Back Guarantee • Instant Lifetime Access
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#102B50] flex flex-col font-sans selection:bg-[#E9AC32]/30">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-500 mb-2">
            <Link href="/courses" className="hover:text-[#092653]">Courses</Link>
            <span>/</span>
            <span className="text-[#092653]">Secure Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
            Review Order &amp; Complete Payment
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="bg-white rounded-3xl p-12 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#092653]" />
              <p className="mt-3 text-sm font-bold text-[#102B50]">Loading order details...</p>
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}