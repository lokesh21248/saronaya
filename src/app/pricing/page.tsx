'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, ShieldCheck, Zap, Sparkles, CreditCard, CheckCircle2, Bell, Crown, ArrowRight } from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
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

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased selection:bg-[#e5a93b]/30">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl px-4 sm:px-6 pt-3 space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between py-2">
          <SaryonayaLogo size="md" />

          <div className="flex items-center gap-3">
            <Link
              href="/student/progress"
              className="relative p-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-[#102b46] hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={2.2} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </Link>

            <Link href="/student/profile" className="relative group">
              <div className="w-10 h-10 rounded-full ring-2 ring-[#e5a93b] p-0.5 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Student Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </Link>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold">
            <Crown size={14} />
            <span>SARYONAYA Premium Membership</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#102b46] tracking-tight leading-tight">
            Get Unlimited Access to <br />
            <span className="bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] bg-clip-text text-transparent">
              All Engineering Courses
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5a7184] font-medium max-w-lg mx-auto">
            Subscribe for continuous access to branch roadmaps, Mux video lectures, downloadable notes, quizzes, and verified certificates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch pt-2">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFeatured = plan.isPopular
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-[28px] p-6 sm:p-7 flex flex-col justify-between relative shadow-[0_8px_30px_rgba(16,43,70,0.06)] border transition-all ${
                  isFeatured
                    ? 'border-[#e5a93b] ring-2 ring-[#e5a93b]/50 scale-[1.02] z-10'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46]'
                        : 'bg-[#102b46] text-white'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-black text-[#102b46]">{plan.name}</h3>
                  <p className="text-xs text-[#5a7184] font-medium mt-0.5">{plan.description}</p>

                  <div className="mt-5 mb-5 flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-black text-[#102b46]">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#5a7184] font-bold ml-1.5">
                      / {plan.interval}
                    </span>
                  </div>

                  <ul className="space-y-2.5 border-t border-slate-100 pt-5 text-xs text-[#102b46] font-medium">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={15} className="text-[#c58a23] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan)
                      setCheckoutModal(true)
                    }}
                    className={`w-full py-3 rounded-full text-xs font-black shadow-sm flex items-center justify-center gap-1.5 transition-all ${
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
