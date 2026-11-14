'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, ShieldCheck, Zap, Sparkles, CreditCard, CheckCircle2, Bell, Crown, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { BottomNav } from '@/components/layout/BottomNav'
import { SUBSCRIPTION_PLANS } from '@/lib/data/lms-data'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS[1])
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleSimulatePayment = () => {
    setPaymentProcessing(true)
    setTimeout(() => {
      setPaymentProcessing(false)
      setPaymentSuccess(true)
    }, 1500)
  }

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/courses' },
    { label: 'Progress', href: '/student/progress' },
    { label: 'Certificates', href: '/student/certificates' },
  ]

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#092347] pb-24 md:pb-12 font-sans antialiased selection:bg-[#dfa32b]/30">
      {/* Master Navbar with Login/Logout & Official Logo */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6 md:space-y-8">

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold">
            <Crown size={14} />
            <span>SARYONAYA Premium Membership</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#102b46] tracking-tight leading-tight">
            Get Unlimited Access to <br />
            <span className="bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] bg-clip-text text-transparent">
              All Engineering Courses
            </span>
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-[#5a7184] font-medium max-w-xl mx-auto">
            Subscribe for continuous access to branch roadmaps, Mux video lectures, downloadable notes, quizzes, and verified certificates.
          </p>
        </div>

        {/* Pricing Cards: 1 col on mobile, 3 cols on laptop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFeatured = plan.isPopular
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_8px_30px_rgba(16,43,70,0.06)] border transition-all ${
                  isFeatured
                    ? 'border-[#e5a93b] ring-2 ring-[#e5a93b]/50 md:scale-105 z-10'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46]'
                        : 'bg-[#102b46] text-white'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#102b46]">{plan.name}</h3>
                  <p className="text-xs text-[#5a7184] font-medium mt-0.5">{plan.description}</p>

                  <div className="mt-6 mb-6 flex items-baseline">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102b46]">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs sm:text-sm text-[#5a7184] font-bold ml-1.5">
                      / {plan.interval}
                    </span>
                  </div>

                  <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs sm:text-sm text-[#102b46] font-medium">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check size={16} className="text-[#c58a23] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan)
                      setCheckoutModal(true)
                    }}
                    className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-black shadow-sm flex items-center justify-center gap-1.5 transition-all ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105'
                        : 'bg-[#102b46] text-white hover:bg-[#163a5f]'
                    }`}
                  >
                    <span>Subscribe with Razorpay</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            {paymentSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-black text-[#102b46]">Subscription Activated!</h3>
                <p className="text-xs text-[#5a7184]">
                  Welcome to SARYONAYA Premium. All courses are now unlocked for you.
                </p>
                <Link href="/courses">
                  <button className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm transition-all">
                    Start Learning Now →
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-[#102b46]">Subscribe to Plan</h3>
                  <button
                    onClick={() => setCheckoutModal(false)}
                    className="text-xs font-bold text-slate-400 hover:text-[#102b46]"
                  >
                    Cancel
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-[#102b46]">{selectedPlan.name}</div>
                  <div className="flex justify-between items-center text-sm font-black text-[#102b46]">
                    <span>Amount Due</span>
                    <span className="text-[#c58a23]">₹{selectedPlan.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={paymentProcessing}
                    className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <CreditCard size={15} />
                    <span>{paymentProcessing ? 'Processing with Razorpay...' : 'Pay with Razorpay / UPI'}</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Auto-renewing • Cancel anytime from your profile
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
