'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  Loader2,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { useClerk } from '@clerk/nextjs'

export default function SignInPage() {
  const router = useRouter()
  const clerk = useClerk()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // 2FA / Verification code state
  const [needs2FA, setNeeds2FA] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [verifying2FA, setVerifying2FA] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Real Production Sign-In via Clerk
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setErrorCode(null)

    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail) {
      setError('Please enter your email address.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    try {
      if (!clerk?.loaded || !clerk?.client) {
        setError('Authentication service is initializing. Please try again in a moment.')
        setLoading(false)
        return
      }

      // Authenticate against Clerk backend
      const result = await clerk.client.signIn.create({
        identifier: trimmedEmail,
        password: password,
      })

      if (result.status === 'complete' && result.createdSessionId) {
        await clerk.setActive({ session: result.createdSessionId })
        setSuccess(true)
        router.push('/student/dashboard')
        return
      }

      if (result.status === 'needs_second_factor') {
        try {
          await clerk.client.signIn.prepareSecondFactor({
            strategy: 'email_code',
          })
        } catch (prepErr) {
          console.warn('Prepare 2FA notice:', prepErr)
        }
        setNeeds2FA(true)
        setLoading(false)
        return
      }

      if (result.status === 'needs_first_factor') {
        setError('Please complete the authentication steps for your account.')
        setLoading(false)
        return
      }

      setError('Sign-in could not be completed. Please verify your credentials.')
    } catch (err: any) {
      console.error('Clerk sign-in error:', err)
      const code = err?.errors?.[0]?.code
      const longMsg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message
      setErrorCode(code)

      if (code === 'form_identifier_not_found') {
        setError(`No account found with email "${trimmedEmail}". Please check your email or create a new account.`)
      } else if (code === 'form_password_incorrect') {
        setError('Incorrect password. Please verify your password or use Forgot Password.')
      } else if (code === 'session_exists') {
        setSuccess(true)
        router.push('/student/dashboard')
        return
      } else if (code === 'strategy_for_user_invalid') {
        setError('This account was created with a social provider (e.g. Google). Please use Sign in with Google.')
      } else {
        setError(longMsg || 'Invalid email or password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle 2FA verification code submission
  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!otpCode.trim()) {
      setError('Please enter the 6-digit verification code.')
      return
    }

    setVerifying2FA(true)

    try {
      if (clerk?.loaded && clerk?.client) {
        const completeSignIn = await clerk.client.signIn.attemptSecondFactor({
          strategy: 'email_code',
          code: otpCode.trim(),
        })

        if (completeSignIn.status === 'complete' && completeSignIn.createdSessionId) {
          await clerk.setActive({ session: completeSignIn.createdSessionId })
          setSuccess(true)
          router.push('/student/dashboard')
          return
        }
      }
      setError('Verification code was not accepted. Please verify and try again.')
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Invalid verification code. Please check your inbox and try again.'
      setError(msg)
    } finally {
      setVerifying2FA(false)
    }
  }

  // Production Google OAuth
  const handleGoogleLogin = async () => {
    setError(null)
    setLoading(true)

    try {
      if (!clerk?.loaded || !clerk?.client) {
        setError('Authentication service is initializing. Please wait a moment.')
        setLoading(false)
        return
      }

      await clerk.client.signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/student/dashboard',
      })
    } catch (err: any) {
      console.warn('Google sign-in error:', err)
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message
      if (msg && msg.includes('oauth_google does not match')) {
        setError('Google Sign-In is not currently enabled in Clerk Dashboard. Please sign in with email and password.')
      } else {
        setError(msg || 'Google Sign-In is currently unavailable. Please sign in with email and password.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07182e] relative flex flex-col justify-between overflow-x-hidden font-sans antialiased selection:bg-[#dfa32b]/30">
      
      {/* 3D LUXURY TOP DECORATIVE WAVE (Royal Navy with Molten Gold Trim) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden h-36 sm:h-48 z-0">
        <svg
          viewBox="0 0 500 160"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id="navyWaveGradIn" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#051325" />
              <stop offset="60%" stopColor="#092347" />
              <stop offset="100%" stopColor="#0e3463" />
            </linearGradient>
            <linearGradient id="goldWaveGradIn" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dfa32b" />
              <stop offset="50%" stopColor="#fced9f" />
              <stop offset="100%" stopColor="#b37a18" />
            </linearGradient>
            <filter id="goldGlowIn" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#dfa32b" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Deep Navy Curved Wave */}
          <path
            d="M0,0 L500,0 L500,32 Q340,118 175,58 Q75,22 0,98 Z"
            fill="url(#navyWaveGradIn)"
          />

          {/* Golden Ribbon Trim with Glow */}
          <path
            d="M0,98 Q75,22 175,58 Q340,118 500,32"
            fill="none"
            stroke="url(#goldWaveGradIn)"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#goldGlowIn)"
          />
        </svg>
      </div>

      {/* TOP BAR: Floating 3D Circular Back Button */}
      <div className="relative z-10 max-w-md w-full mx-auto px-5 pt-4 sm:pt-6">
        <Link
          href="/"
          className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_18px_rgba(9,35,71,0.08)] border border-slate-200/90 flex items-center justify-center text-[#07182e] hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Back to home"
        >
          <ArrowLeft size={19} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* MAIN LUXURY CONTENT CONTAINER */}
      <main className="relative z-10 max-w-md w-full mx-auto px-5 py-4 sm:py-6 flex-1 flex flex-col justify-center">
        
        {/* BRAND LOGO & HEADER */}
        <div className="text-center space-y-2 pb-4 sm:pb-5">
          <div className="flex justify-center mb-1">
            <SaryonayaLogo size="md" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#07182e] tracking-tight">
            {needs2FA ? 'Verify Your Identity' : 'Welcome Back'}
          </h1>
          <p className="text-xs sm:text-sm text-[#557086] font-medium max-w-xs mx-auto leading-relaxed">
            {needs2FA
              ? `We sent a 6-digit verification code to ${email}`
              : 'Login with your registered credentials to access your courses'}
          </p>
        </div>

        {/* ERROR ALERT BOX */}
        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-2 animate-in fade-in-50">
            <div className="flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
              <p className="leading-relaxed flex-1">{error}</p>
            </div>

            {/* If account not found (422), provide 1-click Register link */}
            {errorCode === 'form_identifier_not_found' && (
              <div className="pt-2 border-t border-rose-200/80 flex items-center justify-between">
                <span className="text-[11px] text-rose-800 font-bold">New to SARYONAYA?</span>
                <Link
                  href={`/sign-up?email=${encodeURIComponent(email.trim())}`}
                  className="px-3 py-1.5 rounded-lg bg-[#07182e] text-[#F8D77A] font-extrabold text-[11px] hover:brightness-110 active:scale-95 transition-all shadow-xs"
                >
                  Create Account Now →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* STEP 2: 2FA OTP VERIFICATION CODE FORM                               */}
        {/* ==================================================================== */}
        {needs2FA ? (
          <form onSubmit={handleVerify2FA} className="space-y-3.5">
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center gap-3.5 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 focus-within:shadow-[0_4px_20px_rgba(9,38,83,0.08)] transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                <KeyRound size={18} strokeWidth={2.2} />
              </div>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                required
                autoFocus
                className="w-full bg-transparent text-sm sm:text-base font-bold text-[#07182e] placeholder-slate-400 outline-none tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={verifying2FA || success}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0d315d] hover:brightness-110 active:scale-[0.98] text-white font-black text-sm tracking-wide border-t border-white/20 border-b border-black/40 shadow-[0_8px_25px_rgba(9,38,83,0.32)] hover:shadow-[0_12px_32px_rgba(9,38,83,0.45)] flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-50 group"
            >
              {verifying2FA ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#F8D77A]" />
                  <span>Verifying Code...</span>
                </>
              ) : success ? (
                <span>Verified! Redirecting...</span>
              ) : (
                <>
                  <span>Verify & Sign In</span>
                  <ArrowRight size={14} strokeWidth={2.6} className="text-[#F8D77A]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between px-1 pt-1 text-xs">
              <button
                type="button"
                onClick={() => setNeeds2FA(false)}
                className="font-bold text-slate-500 hover:text-[#07182e] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft size={13} />
                <span>Back to Login</span>
              </button>
            </div>
          </form>
        ) : (
          /* ==================================================================== */
          /* STEP 1: EMAIL & PASSWORD LOGIN FORM                                  */
          /* ==================================================================== */
          <form onSubmit={handleLogin} className="space-y-3.5">
            
            {/* 1. Email Address */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center gap-3.5 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 focus-within:shadow-[0_4px_20px_rgba(9,38,83,0.08)] transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                <Mail size={18} strokeWidth={2.2} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>

            {/* 2. Password */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 focus-within:shadow-[0_4px_20px_rgba(9,38,83,0.08)] transition-all">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                  <Lock size={18} strokeWidth={2.2} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-[#092347] transition-colors shrink-0 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#557086] font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#092347] border-slate-300 focus:ring-[#dfa32b]/20 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="font-bold text-[#b37a18] hover:underline cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>

            {/* MASTER 3D ROYAL NAVY PRIMARY BUTTON: Sign In */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0d315d] hover:brightness-110 active:scale-[0.98] text-white font-black text-sm tracking-wide border-t border-white/20 border-b border-black/40 shadow-[0_8px_25px_rgba(9,35,71,0.32)] hover:shadow-[0_12px_32px_rgba(9,38,83,0.45)] flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-50 group"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#F8D77A]" />
                    <span>Signing In...</span>
                  </>
                ) : success ? (
                  <span>Success! Redirecting...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight size={14} strokeWidth={2.6} className="text-white" />
                    </div>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* DIVIDER: — or continue with — */}
        <div className="flex items-center justify-center gap-3 my-4 text-slate-400 text-xs select-none">
          <span className="w-14 h-px bg-slate-200" />
          <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">or</span>
          <span className="w-14 h-px bg-slate-200" />
        </div>

        {/* GOOGLE SIGN IN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#07182e] font-bold text-xs sm:text-sm border border-[#092347]/30 hover:border-[#092347] shadow-[0_2px_10px_rgba(9,35,71,0.04)] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
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

        {/* FOOTER LINK: Don't have an account? Create Account */}
        <div className="text-center pt-4 pb-6">
          <span className="text-xs text-slate-500 font-medium">
            Don&apos;t have an account?{' '}
          </span>
          <Link
            href="/sign-up"
            className="text-xs font-black text-[#092347] underline decoration-2 decoration-[#dfa32b] underline-offset-4 hover:text-[#dfa32b] transition-colors"
          >
            Create Account
          </Link>
        </div>
      </main>

      {/* 3D LUXURY BOTTOM DECORATIVE WAVE (Royal Navy with Molten Gold Trim) */}
      <div className="relative pointer-events-none overflow-hidden h-20 sm:h-28 w-full z-0 mt-auto">
        <svg
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-md"
        >
          {/* Golden Ribbon Border with Glow */}
          <path
            d="M0,70 Q140,25 280,65 Q410,95 500,30"
            fill="none"
            stroke="url(#goldWaveGradIn)"
            strokeWidth="4"
            filter="url(#goldGlowIn)"
          />
          {/* Deep Navy Curved Wave */}
          <path
            d="M0,70 Q140,25 280,65 Q410,95 500,30 L500,100 L0,100 Z"
            fill="url(#navyWaveGradIn)"
          />
        </svg>
      </div>
    </div>
  )
}
