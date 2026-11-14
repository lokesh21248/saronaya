'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, ShieldCheck, Zap, Sparkles, CreditCard, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
import { SUBSCRIPTION_PLANS } from '@/lib/data/lms-data'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS[1]) // Quarterly default
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
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold">
            <Sparkles size={14} />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            One Subscription. <br />
            <span className="gradient-text">Unlimited Engineering Courses.</span>
          </h1>
          <p className="text-muted text-sm sm:text-base">
            Choose a plan that fits your semester. Access branch-specific lectures, downloadable notes, Mux video streaming, and verified academic certificates.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFeatured = plan.isPopular
            return (
              <div
                key={plan.id}
                className={`bg-navy border rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl transition-all ${
                  isFeatured
                    ? 'border-gold shadow-gold/10 ring-2 ring-gold/40 scale-105 z-10'
                    : 'border-line/20 hover:border-gold/30'
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isFeatured ? 'bg-gold text-navy-deep' : 'bg-navy-soft text-gold border border-gold/40'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-muted mt-1">{plan.description}</p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-black text-white">₹{plan.price}</span>
                    <span className="text-xs text-muted ml-2">/ {plan.interval}</span>
                  </div>

                  <ul className="space-y-3 border-t border-line/10 pt-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-cream/90">
                        <Check size={16} className="text-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Button
                    variant={isFeatured ? 'gold' : 'outline'}
                    size="lg"
                    onClick={() => {
                      setSelectedPlan(plan)
                      setCheckoutModal(true)
                    }}
                    className={`w-full font-bold text-sm ${
                      isFeatured ? 'text-navy-deep shadow-lg' : 'border-line/30'
                    }`}
                  >
                    Subscribe with Razorpay
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Individual Course Comparison */}
        <div className="p-6 rounded-2xl bg-navy border border-line/20 text-center max-w-2xl mx-auto space-y-3">
          <h3 className="font-bold text-white text-base">Just need a single course?</h3>
          <p className="text-xs text-muted">
            You can also purchase individual courses with lifetime access for just ₹999 each without subscribing.
          </p>
          <Link href="/courses">
            <Button variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10">
              Browse Individual Courses
            </Button>
          </Link>
        </div>
      </main>

      {/* Subscription Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy border border-line/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-line/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-navy-deep font-bold text-sm">
                  S
                </div>
                <span className="font-bold text-white">Razorpay Subscription</span>
              </div>
              <button
                onClick={() => {
                  setCheckoutModal(false)
                  setPaymentSuccess(false)
                }}
                className="text-muted hover:text-white"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-white">Subscription Active!</h3>
                <p className="text-xs text-muted">
                  You now have unlimited access under the {selectedPlan.name} plan.
                </p>
                <div className="pt-4">
                  <Link href="/student/dashboard">
                    <Button variant="gold" size="lg" className="w-full font-bold text-navy-deep">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-navy-soft/60 border border-line/15">
                  <span className="text-xs text-muted">Selected Membership</span>
                  <p className="font-bold text-white text-base mt-0.5">{selectedPlan.name}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-line/10">
                    <span className="text-xs text-muted">Recurring Amount</span>
                    <span className="text-2xl font-bold text-gold">₹{selectedPlan.price}</span>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  disabled={paymentProcessing}
                  onClick={handleSimulatePayment}
                  className="w-full font-bold text-navy-deep flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  {paymentProcessing ? 'Authorizing Payment...' : `Pay ₹${selectedPlan.price} with Razorpay`}
                </Button>

                <p className="text-[11px] text-center text-muted">
                  🔒 Seamless recurring billing powered by Razorpay. Cancel anytime.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

