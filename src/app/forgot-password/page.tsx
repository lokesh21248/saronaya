'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { PrimaryButton } from '@/components/ui/Buttons'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setLoading(true)

    // Simulate OTP / Reset dispatch
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] relative overflow-x-hidden flex flex-col justify-between selection:bg-[#E9AC32]/30">
      
      {/* Top Navy & Molten Gold Wave Banner */}
      <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-gradient-to-r from-[#061B3A] via-[#092653] to-[#1456A0]">
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          viewBox="0 0 1440 280"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0H1440V180C1100 250 820 120 450 220C220 280 100 240 0 200V0Z"
            fill="#092653"
            opacity="0.8"
          />
          <path
            d="M0 160C320 250 680 140 1020 220C1220 270 1360 210 1440 190V230C1320 260 1120 285 960 250C620 170 300 260 0 210V160Z"
            fill="url(#goldTrimTop)"
          />
          <defs>
            <linearGradient id="goldTrimTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E9AC32" />
              <stop offset="50%" stopColor="#F8D77A" />
              <stop offset="100%" stopColor="#E9AC32" />
            </linearGradient>
          </defs>
        </svg>

        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Link
            href="/login"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#092653] hover:bg-white active:scale-95 transition-all"
            aria-label="Back to Login"
          >
            <ArrowLeft className="w-5 h-5 text-[#092653]" />
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 -mt-12 sm:-mt-16 relative z-10 mb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(9,38,83,0.1)] border border-slate-200/80">
          
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center text-center mb-6">
            <SaryonayaLogo size="lg" />
            <h1 className="text-xl sm:text-2xl font-black text-[#102B50] tracking-tight mt-3">
              Reset Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Enter your registered email and we&apos;ll send you a password reset link
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#102B50]">Reset Link Sent!</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  We sent instructions to <strong className="text-[#092653]">{email}</strong>.
                  Please check your inbox and spam folder.
                </p>
              </div>

              <div className="pt-3">
                <Link href="/login" className="w-full block">
                  <PrimaryButton size="lg" className="w-full">
                    Return to Login
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 focus-within:border-[#E9AC32] focus-within:bg-white focus-within:shadow-md transition-all">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="student@saryonaya.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#102B50] placeholder-slate-400 outline-none font-medium"
                  />
                </div>
              </div>

              {/* 3D Submit Button */}
              <div className="pt-2">
                <PrimaryButton
                  type="submit"
                  size="lg"
                  isLoading={loading}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#F8D77A]" />}
                >
                  Send Reset Link
                </PrimaryButton>
              </div>

              {/* Back to Login link */}
              <div className="text-center pt-3">
                <Link
                  href="/login"
                  className="text-xs font-bold text-[#1456A0] hover:text-[#092653] hover:underline"
                >
                  Remember your password? Login
                </Link>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* Bottom Wave Ribbon */}
      <div className="relative w-full h-16 sm:h-20 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C380 120 740 30 1100 80C1280 100 1380 85 1440 60V120H0V60Z"
            fill="#092653"
          />
          <path
            d="M0 70C360 130 760 40 1120 90C1290 110 1380 95 1440 70"
            stroke="#E9AC32"
            strokeWidth="5"
          />
        </svg>
      </div>

    </div>
  )
}