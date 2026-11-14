'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  CreditCard,
  CheckCircle2,
  Crown,
  ArrowRight,
  HelpCircle,
  Award,
  BookOpen,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { PrimaryButton, SecondaryButton, SubscribeButton } from '@/components/ui/Buttons'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const plans = [
    {
      id: 'plan-free',
      name: 'Free Starter',
      badge: 'Free Tier',
      isPopular: false,
      price: 0,
      period: 'forever',
      description: 'Ideal for prospective students wanting to explore lecture previews.',
      features: [
        'Access to Free Preview lectures across all courses',
        'Standard community discussion forum access',
        'Sample code repositories and assignments',
        'Basic syllabus roadmap access',
      ],
      cta: 'Get Started Free',
      ctaVariant: 'secondary',
    },
    {
      id: 'plan-pro',
      name: 'All-Access Pro',
      badge: 'Most Popular',
      isPopular: true,
      price: billingCycle === 'yearly' ? 499 : 699,
      period: 'per month',
      description: 'The definitive engineering pass for college students and job seekers.',
      features: [
        'Unlimited access to ALL 500+ engineering courses',
        'Downloadable full lecture notes & cheatsheets (PDF)',
        'Unlimited practice quizzes & test simulators',
        'ISO-compliant Verifiable Certificates with QR verification',
        'Direct instructor doubt-resolution portal',
        'Offline mobile playback support',
      ],
      cta: 'Subscribe to All-Access Pro',
      ctaVariant: 'gold',
    },
    {
      id: 'plan-college',
      name: 'Campus / Enterprise',
      badge: 'Institutional',
      isPopular: false,
      price: billingCycle === 'yearly' ? 1499 : 1999,
      period: 'per student / yr',
      description: 'Designed for college labs, student cohorts, and department-wide access.',
      features: [
        'Bulk college student licensing & management',
        'Custom department semester syllabus alignment',
        'Faculty analytics dashboard & grading reports',
        'Dedicated campus placement preparation track',
        'Priority 24/7 technical and academic support',
      ],
      cta: 'Contact for Campus Pass',
      ctaVariant: 'navy',
    },
  ]

  const handleSimulatePayment = () => {
    setPaymentProcessing(true)
    setTimeout(() => {
      setPaymentProcessing(false)
      setPaymentSuccess(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#07182e] flex flex-col font-sans antialiased selection:bg-[#dfa32b]/30">
      <Navbar />

      <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16 space-y-12 sm:space-y-16">
        
        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/50 text-[#b87e1a] text-xs font-black">
            <Crown size={14} className="text-[#e5a93b] fill-[#e5a93b]" />
            <span>SARYONAYA MEMBERSHIP TIERS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#07182e] tracking-tight leading-tight">
            One Membership.{' '}
            <span className="bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] bg-clip-text text-transparent">
              Unlimited Knowledge.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Subscribe for continuous access to university-aligned course roadmaps, 4K video lectures, downloadable notes, quizzes, and verified certificates.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="bg-white p-1.5 rounded-full border border-slate-200/90 shadow-sm flex items-center gap-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#07182e] text-white shadow-xs'
                    : 'text-slate-500 hover:text-[#07182e]'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-[#07182e] text-white shadow-xs'
                    : 'text-slate-500 hover:text-[#07182e]'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#dfa32b] to-[#f5cb68] text-[#07182e] text-[10px] font-black">
                  SAVE 25%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isFeatured = plan.isPopular
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_4px_24px_rgba(9,35,71,0.06)] border transition-all ${
                  isFeatured
                    ? 'border-[#e5a93b] ring-2 ring-[#e5a93b]/50 md:-translate-y-2 z-10 shadow-[0_12px_36px_rgba(223,163,43,0.18)]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Popular Pill */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-[#dfa32b] via-[#f7d685] to-[#d99222] text-[#07182e] shadow-md border-t border-white/50">
                    ★ {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black text-[#07182e]">{plan.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="my-6 flex items-baseline">
                    <span className="text-4xl sm:text-5xl font-black text-[#07182e]">
                      {plan.price === 0 ? '₹0' : `₹${plan.price.toLocaleString('en-IN')}`}
                    </span>
                    <span className="text-xs font-bold text-slate-500 ml-2">
                      / {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 border-t border-slate-100 pt-6 text-xs sm:text-sm text-slate-700 font-medium">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={16}
                          className={`shrink-0 mt-0.5 ${
                            isFeatured ? 'text-[#dfa32b]' : 'text-blue-600'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  {isFeatured ? (
                    <SubscribeButton
                      highlight
                      onClick={() => {
                        setSelectedPlan(plan)
                        setCheckoutModal(true)
                      }}
                    >
                      {plan.cta}
                    </SubscribeButton>
                  ) : plan.price === 0 ? (
                    <Link href="/register">
                      <SecondaryButton className="w-full">
                        {plan.cta}
                      </SecondaryButton>
                    </Link>
                  ) : (
                    <PrimaryButton
                      className="w-full"
                      onClick={() => {
                        setSelectedPlan(plan)
                        setCheckoutModal(true)
                      }}
                    >
                      {plan.cta}
                    </PrimaryButton>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Individual Course Purchase Explanation Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-[#b87e1a] text-xs font-extrabold border border-amber-300/40">
                Single Course Option
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#07182e]">
              Prefer to buy a single course instead of a subscription?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Every course in our catalog can also be purchased individually with lifetime access and individual certificate issuance.
            </p>
          </div>

          <Link href="/courses" className="shrink-0">
            <PrimaryButton size="md">
              Browse Individual Courses
            </PrimaryButton>
          </Link>
        </div>

      </main>

      {/* Simulated Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            {paymentSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-black text-[#07182e]">
                  Subscription Activated!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Welcome to SARYONAYA Premium! You now have unlimited access to all courses, notes, and certificates.
                </p>
                <Link href="/my-learning">
                  <button className="w-full py-3.5 rounded-full font-black text-sm bg-gradient-to-r from-[#dfa32b] via-[#f7d685] to-[#d99222] text-[#07182e] shadow-md mt-2">
                    Go to My Learning Dashboard
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-[#07182e]">Complete Subscription</h3>
                  <button
                    onClick={() => setCheckoutModal(false)}
                    className="text-xs font-bold text-slate-400 hover:text-[#07182e]"
                  >
                    Cancel
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-[#07182e]">{selectedPlan?.name}</div>
                  <div className="flex justify-between items-center text-sm font-black text-[#07182e]">
                    <span>Total Amount</span>
                    <span className="text-[#b87e1a]">
                      ₹{selectedPlan?.price?.toLocaleString('en-IN')} / {billingCycle}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={paymentProcessing}
                    className="w-full py-3.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#dfa32b] via-[#f7d685] to-[#d99222] text-[#07182e] border-t border-white/60 border-b-[2px] border-b-[#a66d0e] shadow-md hover:brightness-105 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <CreditCard size={16} />
                    <span>
                      {paymentProcessing ? 'Processing with Razorpay...' : 'Pay with Razorpay / UPI'}
                    </span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    🔒 256-bit encrypted checkout • Cancel anytime from settings
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  )
}
