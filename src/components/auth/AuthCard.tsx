'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  GraduationCap,
  Zap,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'

interface AuthCardProps {
  initialMode?: 'sign-in' | 'sign-up'
}

export function AuthCard({ initialMode = 'sign-in' }: AuthCardProps) {
  const router = useRouter()
  const clerk = useClerk()

  const [mode, setMode] = useState<'sign-in' | 'sign-up'>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Verification step for Sign-Up
  const [verifying, setVerifying] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  // Loading & error state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Clear errors when toggling modes
  const handleModeChange = (newMode: 'sign-in' | 'sign-up') => {
    setMode(newMode)
    setError(null)
    setSuccessMsg(null)
    setVerifying(false)
  }

  // Handle Sign In submission
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clerk.loaded || !clerk.client) {
      handleDemoAccess()
      return
    }

    setError(null)
    setLoading(true)

    try {
      const result = await clerk.client.signIn.create({
        identifier: email.trim(),
        password,
      })

      if (result.status === 'complete' && result.createdSessionId) {
        await clerk.setActive({ session: result.createdSessionId })
        router.push('/student/dashboard')
      } else {
        setError('Additional verification is required. Please check your email or use Instant Demo Login.')
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Unable to sign in. Please verify your credentials or click Instant Student Demo Login below.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Handle Sign Up submission
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clerk.loaded || !clerk.client) {
      handleDemoAccess()
      return
    }

    setError(null)
    setLoading(true)

    try {
      await clerk.client.signUp.create({
        emailAddress: email.trim(),
        password,
        firstName: name.trim() || undefined,
      })

      // Send email verification code
      await clerk.client.signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setVerifying(true)
      setSuccessMsg(`We sent a 6-digit verification code to ${email.trim()}.`)
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Registration could not be completed. Please check your information or try Instant Student Demo Login.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP verification for Sign Up
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clerk.loaded || !clerk.client) {
      handleDemoAccess()
      return
    }

    setError(null)
    setLoading(true)

    try {
      const completeSignUp = await clerk.client.signUp.attemptEmailAddressVerification({
        code: otpCode.trim(),
      })

      if (completeSignUp.status === 'complete' && completeSignUp.createdSessionId) {
        await clerk.setActive({ session: completeSignUp.createdSessionId })
        router.push('/student/dashboard')
      } else {
        setError('Verification could not be finalized. Please try again.')
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Invalid verification code. Please check your inbox and try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // Handle Google OAuth
  const handleGoogleAuth = async () => {
    if (!clerk.loaded || !clerk.client) return
    setError(null)
    try {
      await clerk.client.signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/student/dashboard',
      })
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Google sign-in could not be initiated.')
    }
  }

  // One-click Demo Student Access
  const handleDemoAccess = () => {
    try {
      localStorage.setItem(
        'saryonaya_demo_session',
        JSON.stringify({
          active: true,
          name: name.trim() || 'Aarav Patel',
          email: email.trim() || 'student@saryonaya.edu',
          branch: 'Computer Science & AI',
          semester: '6th Semester',
          enrolledAt: new Date().toISOString(),
        })
      )
    } catch (e) {
      // ignore
    }
    router.push('/student/dashboard')
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Outer Luxury Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 shadow-[0_12px_45px_rgba(9,35,71,0.08)] border border-slate-200/90 relative overflow-hidden">
        {/* Subtle Gold & Navy Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#092347]" />

        {/* Brand Header */}
        <div className="text-center space-y-3 pb-6">
          <div className="flex justify-center">
            <SaryonayaLogo size="md" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#dfa32b]/40 text-[#b37a18] text-[11px] font-bold">
            <Sparkles size={13} className="text-[#dfa32b]" />
            <span>Official University Learning Portal</span>
          </div>

          <p className="text-xs text-[#557086] font-medium max-w-xs mx-auto">
            {mode === 'sign-in'
              ? 'Access your branch-mapped courses, video lectures, and certificates'
              : 'Create your academic profile to unlock expert lectures & quizzes'}
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        {!verifying && (
          <div className="grid grid-cols-2 p-1 bg-[#f4f7fb] rounded-2xl mb-6 border border-slate-200/80">
            <button
              type="button"
              onClick={() => handleModeChange('sign-in')}
              className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                mode === 'sign-in'
                  ? 'bg-gradient-to-r from-[#07182e] to-[#092347] text-[#f5cb68] shadow-sm border border-[#dfa32b]/30'
                  : 'text-[#557086] hover:text-[#092347]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('sign-up')}
              className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                mode === 'sign-up'
                  ? 'bg-gradient-to-r from-[#07182e] to-[#092347] text-[#f5cb68] shadow-sm border border-[#dfa32b]/30'
                  : 'text-[#557086] hover:text-[#092347]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Alert Error Box */}
        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in-50">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
            <div className="flex-1 space-y-1.5">
              <p className="leading-relaxed">{error}</p>
              <button
                type="button"
                onClick={handleDemoAccess}
                className="text-[11px] font-bold text-rose-800 underline hover:text-rose-900 block"
              >
                Or bypass with Instant Demo Student Access →
              </button>
            </div>
          </div>
        )}

        {/* Success Message Box */}
        {successMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in-50">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-600" />
            <p className="leading-relaxed">{successMsg}</p>
          </div>
        )}

        {/* VERIFICATION CODE FORM (When user is signing up) */}
        {verifying ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1 pb-1">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#b37a18] border border-[#dfa32b]/40 flex items-center justify-center mx-auto mb-2">
                <KeyRound size={22} />
              </div>
              <h3 className="text-base font-black text-[#092347]">Enter 6-Digit Code</h3>
              <p className="text-xs text-[#557086]">
                Enter the verification code sent to your email to activate your account.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#092347]">
                Verification Code
              </label>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full text-center tracking-[0.5em] text-lg font-bold font-mono px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-[#092347] focus:bg-white focus:border-[#dfa32b] focus:ring-2 focus:ring-[#dfa32b]/20 outline-none transition-all"
              />
            </div>

            {/* Master Luxury Gold Submit Button */}
            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#07182e] font-black text-xs uppercase tracking-wider border-t border-[#ffe8a3]/80 shadow-[0_4px_18px_rgba(223,163,43,0.35)] hover:shadow-[0_6px_24px_rgba(223,163,43,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Verifying Code...' : 'Verify & Continue →'}</span>
            </button>

            <button
              type="button"
              onClick={() => setVerifying(false)}
              className="w-full text-center text-xs font-bold text-[#557086] hover:text-[#092347] py-1 transition-colors"
            >
              ← Back to Registration
            </button>
          </form>
        ) : (
          /* STANDARD SIGN IN / SIGN UP FORM */
          <form
            onSubmit={mode === 'sign-in' ? handleSignInSubmit : handleSignUpSubmit}
            className="space-y-4"
          >
            {/* Full Name (Sign Up only) */}
            {mode === 'sign-up' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#092347]">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Aarav Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={mode === 'sign-up'}
                    className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-[#092347] placeholder-slate-400 focus:bg-white focus:border-[#dfa32b] focus:ring-2 focus:ring-[#dfa32b]/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#092347]">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-[#092347] placeholder-slate-400 focus:bg-white focus:border-[#dfa32b] focus:ring-2 focus:ring-[#dfa32b]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#092347]">
                  Password
                </label>
                {mode === 'sign-in' && (
                  <button
                    type="button"
                    onClick={() => setError('Please use Instant Student Demo Login below or contact platform admin.')}
                    className="text-[11px] font-bold text-[#b37a18] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-11 py-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-[#092347] placeholder-slate-400 focus:bg-white focus:border-[#dfa32b] focus:ring-2 focus:ring-[#dfa32b]/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#092347] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            {mode === 'sign-in' && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#dfa32b] border-slate-300 focus:ring-[#dfa32b]/20 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs font-semibold text-[#557086] cursor-pointer select-none"
                >
                  Keep me signed in on this device
                </label>
              </div>
            )}

            {/* MASTER LUXURY GOLD SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#07182e] font-black text-xs uppercase tracking-wider border-t border-[#ffe8a3]/80 shadow-[0_4px_18px_rgba(223,163,43,0.35)] hover:shadow-[0_6px_24px_rgba(223,163,43,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>
                  {loading
                    ? 'Processing...'
                    : mode === 'sign-in'
                    ? 'Sign In to SARVONAYA →'
                    : 'Create Free Student Account →'}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Divider */}
        {!verifying && (
          <>
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative px-3 bg-white text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Or Continue With
              </span>
            </div>

            {/* Social & Fast Access Buttons */}
            <div className="space-y-2.5">
              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full py-2.5 px-4 rounded-full border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 text-[#092347] font-bold text-xs flex items-center justify-center gap-2.5 shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.94H1.28v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.26c-.24-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.59H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.41l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.28 6.59l4.04 3.15c.94-2.84 3.58-4.99 6.68-4.99z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Instant Student Demo Access Button */}
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#123963] text-[#f5cb68] font-bold text-xs flex items-center justify-center gap-2 border border-[#dfa32b]/40 shadow-xs hover:border-[#dfa32b] hover:brightness-110 transition-all cursor-pointer active:scale-98"
              >
                <Zap size={14} className="text-[#dfa32b] fill-[#dfa32b]" />
                <span>Instant Student Demo Login (1-Click)</span>
              </button>
            </div>
          </>
        )}

        {/* Security & Credentials Footnote */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#557086]">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>

          <Link
            href="/"
            className="text-[11px] font-bold text-[#092347] hover:text-[#dfa32b] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
