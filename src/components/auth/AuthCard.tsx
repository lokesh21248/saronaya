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
  AlertCircle,
  KeyRound,
  Loader2,
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
    setError(null)

    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !password) {
      setError('Please provide both your email address and password.')
      return
    }

    if (!clerk.loaded || !clerk.client) {
      setError('Authentication service is initializing. Please wait a moment.')
      return
    }

    setLoading(true)

    try {
      const result = await clerk.client.signIn.create({
        identifier: trimmedEmail,
        password,
      })

      if (result.status === 'complete' && result.createdSessionId) {
        await clerk.setActive({ session: result.createdSessionId })
        router.push('/student/dashboard')
      } else if (result.status === 'needs_second_factor') {
        await clerk.client.signIn.prepareSecondFactor({ strategy: 'email_code' })
        setVerifying(true)
        setSuccessMsg(`We sent a 6-digit verification code to ${trimmedEmail}.`)
      } else {
        setError('Additional verification is required for this account.')
      }
    } catch (err: any) {
      const code = err?.errors?.[0]?.code
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Unable to sign in. Please verify your credentials.'
      if (code === 'form_identifier_not_found') {
        setError('No account found with this email. Please switch to Create Account.')
      } else if (code === 'form_password_incorrect') {
        setError('Incorrect password. Please try again or reset your password.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle Sign Up submission
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedName = name.trim()

    if (!trimmedEmail || !password) {
      setError('Please enter your email and a secure password.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (!clerk.loaded || !clerk.client) {
      setError('Authentication service is initializing. Please wait a moment.')
      return
    }

    setLoading(true)

    try {
      const parts = trimmedName.split(' ')
      const firstName = parts[0] || 'Student'
      const lastName = parts.slice(1).join(' ') || undefined

      const signUpAttempt = await clerk.client.signUp.create({
        emailAddress: trimmedEmail,
        password,
        firstName,
        lastName,
      })

      if (signUpAttempt.status === 'complete' && signUpAttempt.createdSessionId) {
        await clerk.setActive({ session: signUpAttempt.createdSessionId })
        router.push('/student/dashboard')
        return
      }

      // Send email verification code
      await clerk.client.signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setVerifying(true)
      setSuccessMsg(`We sent a 6-digit verification code to ${trimmedEmail}.`)
    } catch (err: any) {
      const code = err?.errors?.[0]?.code
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Registration could not be completed.'
      if (code === 'form_identifier_exists') {
        setError('An account with this email already exists. Please switch to Sign In.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP verification for Sign Up / 2FA
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clerk.loaded || !clerk.client) {
      setError('Authentication service is initializing.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      if (mode === 'sign-up') {
        const completeSignUp = await clerk.client.signUp.attemptEmailAddressVerification({
          code: otpCode.trim(),
        })

        if (completeSignUp.status === 'complete' && completeSignUp.createdSessionId) {
          await clerk.setActive({ session: completeSignUp.createdSessionId })
          router.push('/student/dashboard')
          return
        }
      } else {
        const completeSignIn = await clerk.client.signIn.attemptSecondFactor({
          strategy: 'email_code',
          code: otpCode.trim(),
        })

        if (completeSignIn.status === 'complete' && completeSignIn.createdSessionId) {
          await clerk.setActive({ session: completeSignIn.createdSessionId })
          router.push('/student/dashboard')
          return
        }
      }

      setError('Verification could not be finalized. Please verify the code.')
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
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message
      if (msg && msg.includes('oauth_google does not match')) {
        setError('Google Sign-In is not currently enabled in Clerk Dashboard. Please sign in with email and password.')
      } else {
        setError(msg || 'Google Sign-In is currently unavailable.')
      }
    }
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
              className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                mode === 'sign-in'
                  ? 'bg-white text-[#092347] shadow-sm'
                  : 'text-slate-500 hover:text-[#092347]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('sign-up')}
              className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                mode === 'sign-up'
                  ? 'bg-white text-[#092347] shadow-sm'
                  : 'text-slate-500 hover:text-[#092347]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            {successMsg}
          </div>
        )}

        {/* ==================================================================== */}
        {/* EMAIL VERIFICATION STEP                                              */}
        {/* ==================================================================== */}
        {verifying ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-[#092347]">
                Verification Code
              </label>
              <div className="relative">
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  maxLength={6}
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold tracking-widest text-[#092347] placeholder-slate-400 focus:bg-white focus:border-[#dfa32b] focus:ring-2 focus:ring-[#dfa32b]/20 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#123963] hover:brightness-110 active:scale-[0.98] text-white font-black text-xs sm:text-sm tracking-wide border-t border-white/20 border-b border-black/30 shadow-[0_6px_20px_rgba(9,35,71,0.25)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin text-[#F8D77A]" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify & Continue</span>
                  <ArrowRight size={14} className="text-[#F8D77A]" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setVerifying(false)}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-[#092347] transition-colors cursor-pointer"
            >
              ← Back to {mode === 'sign-in' ? 'Sign In' : 'Registration'}
            </button>
          </form>
        ) : (
          /* ==================================================================== */
          /* SIGN IN / SIGN UP FORM                                               */
          /* ==================================================================== */
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
                    placeholder="Your Full Name"
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
                  placeholder="student@saryonaya.edu"
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
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-bold text-[#b37a18] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'sign-up' ? 'Minimum 8 characters' : 'Enter password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={mode === 'sign-up' ? 8 : undefined}
                  className="w-full pl-10 pr-10 py-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-[#092347] placeholder-slate-400 focus:bg-white focus:border-[#dfa32b] focus:ring-2 focus:ring-[#dfa32b]/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#092347] transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            {mode === 'sign-in' && (
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#092347] border-slate-300 focus:ring-[#dfa32b]/20 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs text-slate-600 font-medium select-none cursor-pointer"
                >
                  Remember my credentials
                </label>
              </div>
            )}

            {/* Master Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#123963] hover:brightness-110 active:scale-[0.98] text-white font-black text-xs sm:text-sm tracking-wide border-t border-white/20 border-b border-black/30 shadow-[0_6px_20px_rgba(9,35,71,0.25)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-[#F8D77A]" />
                    <span>{mode === 'sign-in' ? 'Signing In...' : 'Registering...'}</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'sign-in' ? 'Sign In to Portal' : 'Create Student Account'}</span>
                    <ArrowRight size={14} className="text-[#F8D77A]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Divider */}
        {!verifying && (
          <>
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative px-3 bg-white text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Or Continue With
              </span>
            </div>

            {/* Google Sign In */}
            <div>
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
