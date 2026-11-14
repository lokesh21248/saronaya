'use client'

import React, { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Loader2,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams?.get('order_id') || `SAR-${Math.floor(100000 + Math.random() * 900000)}`
  const amount = searchParams?.get('amount') || '1,999'
  const courseTitle = searchParams?.get('course') || 'Full Access Engineering Masterclass'

  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    )
  }, [])

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-[0_12px_45px_rgba(9,38,83,0.08)] text-center relative overflow-hidden">
      {/* Top Gold ribbon accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#092653] via-[#E9AC32] to-[#1456A0]" />

      {/* Success Animated Icon */}
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.35)] mb-5 ring-8 ring-emerald-50">
        <CheckCircle2 className="w-11 h-11" />
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-50 text-[#b87e1a] border border-[#E9AC32]/40 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-[#E9AC32]" />
        Transaction Confirmed
      </span>

      <h1 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
        Payment Successful!
      </h1>
      <p className="text-sm text-slate-500 font-medium mt-1 max-w-md mx-auto">
        Thank you for enrolling with SARYONAYA. Your learning journey has officially begun!
      </p>

      {/* Receipt Breakdown Card */}
      <div className="mt-8 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
          <span className="text-slate-500 font-semibold">Order ID</span>
          <span className="font-mono font-bold text-[#092653]">{orderId}</span>
        </div>

        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
          <span className="text-slate-500 font-semibold">Course / Plan</span>
          <span className="font-bold text-[#102B50] text-right truncate max-w-[240px]">
            {courseTitle}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
          <span className="text-slate-500 font-semibold">Date &amp; Time</span>
          <span className="font-semibold text-slate-700">{dateStr || 'Today'}</span>
        </div>

        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
          <span className="text-slate-500 font-semibold">Payment Status</span>
          <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified by Razorpay
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-extrabold text-[#102B50]">Total Paid</span>
          <span className="text-xl font-black text-[#092653]">₹{amount}</span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/my-learning" className="w-full sm:w-auto">
          <PrimaryButton
            size="lg"
            className="w-full sm:w-auto"
            rightIcon={<ArrowRight className="w-4 h-4 text-[#F8D77A]" />}
          >
            Go to My Learning
          </PrimaryButton>
        </Link>

        <Link href="/student/dashboard" className="w-full sm:w-auto">
          <SecondaryButton size="lg" className="w-full sm:w-auto">
            Student Dashboard
          </SecondaryButton>
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <span>Need help with your order?</span>
        <Link href="/settings" className="text-[#1456A0] font-bold hover:underline">
          Contact Student Support
        </Link>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#102B50] flex flex-col font-sans selection:bg-[#E9AC32]/30">
      <Navbar />
      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
        <Suspense
          fallback={
            <div className="bg-white rounded-3xl p-12 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#092653]" />
              <p className="mt-3 text-sm font-bold text-[#102B50]">Loading order receipt...</p>
            </div>
          }
        >
          <PaymentSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}