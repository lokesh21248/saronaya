'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import {
  ArrowLeft,
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  RotateCcw,
  Loader2,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { PrimaryButton } from '@/components/ui/Buttons'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const clerk = useClerk()

  const [step, setStep] = useState<'REQUEST_CODE' | 'VERIFY_AND_RESET'>('REQUEST_CODE')
  const [email, setEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Step 1: Send 6-digit verification code to email (OTP flow, not magic link)
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Please enter a valid registered email address.')
      return
    }

    setError(null)
    setSuccessMsg(null)
    setLoading(true)

    try {
      if (!clerk?.loaded || !clerk?.client) {
        setError('Authentication service is initializing. Please wait a moment.')
        setLoading(false)
        return
      }

      // Initiate OTP password reset via Clerk
      await clerk.client.signIn.create({
        strategy: 'reset_password_email_code',
        identifier: trimmedEmail,
      })

      setStep('VERIFY_AND_RESET')
      setSuccessMsg(`We sent a 6-digit verification code to ${trimmedEmail}.`)
    } catch (err: any) {
      console.error('Password reset initiation error:', err)
      const code = err?.errors?.[0]?.code
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message

      if (code === 'form_identifier_not_found') {
        setError(`No account found with email "${trimmedEmail}". Please check your email or create an account.`)
      } else {
        setError(msg || 'Unable to send verification code. Please check your email address.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Resend 6-digit verification code
  const handleResendCode = async () => {
    setError(null)
    setResending(true)

    try {
      if (clerk?.loaded && clerk?.client) {
        await clerk.client.signIn.create({
          strategy: 'reset_password_email_code',
          identifier: email.trim().toLowerCase(),
        })
        setSuccessMsg('A new 6-digit verification code has been sent to your email.')
      }
    } catch (err: any) {
      setError('Could not resend code. Please try again in a moment.')
    } finally {
      setResending(false)
    }
  }

  // Step 3: Verify 6-digit code and set new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (!otpCode.trim()) {
      setError('Please enter the 6-digit verification code.')
      return
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify both passwords.')
      return
    }

    setLoading(true)

    try {
      if (!clerk?.loaded || !clerk?.client) {
        setError('Authentication service is initializing.')
        setLoading(false)
        return
      }

      // Complete password reset with code and new password
      const result = await clerk.client.signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: otpCode.trim(),
        password: newPassword,
      })

      if (result.status === 'complete' && result.createdSessionId) {
        await clerk.setActive({ session: result.createdSessionId })
        router.push('/student/dashboard')
        return
      } else if (result.status === 'needs_second_factor') {
        setError('Second factor verification is required for this account.')
      } else {
        setError('Password reset could not be completed. Please check your verification code.')
      }
    } catch (err: any) {
      console.error('Password reset attempt error:', err)
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message
      setError(msg || 'Invalid verification code. Please check your inbox and try again.')
    } finally {
      setLoading(false)
    }
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
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#092653] hover:bg-white active:scale-95 transition-all cursor-pointer group"
            aria-label="Back to Login"
          >
            <ArrowLeft className="w-5 h-5 text-[#092653] group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 -mt-12 sm:-mt-16 relative z-10 mb-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(9,38,83,0.1)] border border-slate-200/80">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <SaryonayaLogo size="lg" />
            <h1 className="text-xl sm:text-2xl font-black text-[#102B50] tracking-tight mt-3">
              {step === 'REQUEST_CODE' ? 'Reset Password' : 'Set New Password'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {step === 'REQUEST_CODE'
                ? 'Enter your registered email to receive a 6-digit verification code'
                : `Enter the 6-digit code sent to ${email} and your new password`}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2 animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Success / Resend Notice */}
          {successMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-start gap-2 animate-in fade-in-50">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{successMsg}</span>
            </div>
          )}

          {/* ==================================================================== */}
          {/* STEP 1: REQUEST 6-DIGIT OTP CODE                                     */}
          {/* ==================================================================== */}
          {step === 'REQUEST_CODE' ? (
            <form onSubmit={handleSendCode} className="space-y-4">
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

              <div className="pt-2">
                <PrimaryButton
                  type="submit"
                  size="lg"
                  isLoading={loading}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#F8D77A]" />}
                >
                  Send Verification Code
                </PrimaryButton>
              </div>

              <div className="text-center pt-3">
                <Link
                  href="/login"
                  className="text-xs font-bold text-[#1456A0] hover:text-[#092653] hover:underline"
                >
                  Remember your password? Login
                </Link>
              </div>
            </form>
          ) : (
            /* ==================================================================== */
            /* STEP 2: VERIFY OTP CODE & SET NEW PASSWORD                          */
            /* ==================================================================== */
            <form onSubmit={handleResetPassword} className="space-y-3.5">
              
              {/* 1. 6-digit Verification Code */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">6-Digit Verification Code</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 focus-within:border-[#E9AC32] focus-within:bg-white focus-within:shadow-md transition-all">
                  <KeyRound className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="Enter 6-digit code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold tracking-widest text-[#102B50] placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              {/* 2. New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">New Password</label>
                <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 focus-within:border-[#E9AC32] focus-within:bg-white focus-within:shadow-md transition-all">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm text-[#102B50] placeholder-slate-400 outline-none font-medium"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-[#092653] transition-colors shrink-0"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 3. Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/90 focus-within:border-[#E9AC32] focus-within:bg-white focus-within:shadow-md transition-all">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-[#102B50] placeholder-slate-400 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <PrimaryButton
                  type="submit"
                  size="lg"
                  isLoading={loading}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#F8D77A]" />}
                >
                  Reset Password & Sign In
                </PrimaryButton>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStep('REQUEST_CODE')}
                  className="font-bold text-slate-500 hover:text-[#092653] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>Change Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resending}
                  className="font-bold text-[#b87e1a] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw size={12} className={resending ? 'animate-spin' : ''} />
                  <span>{resending ? 'Resending...' : 'Resend Code'}</span>
                </button>
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
