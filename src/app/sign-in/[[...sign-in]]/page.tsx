'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Phone,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { useClerk } from '@clerk/nextjs'

export default function SignInPage() {
  const router = useRouter()
  const clerk = useClerk()

  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check if student profile exists in localStorage or initialize session
      const savedProfile = localStorage.getItem('saryonaya_user_profile')
      let studentName = 'Student'
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile)
          if (parsed?.fullName) studentName = parsed.fullName
        } catch (e) {}
      }

      localStorage.setItem(
        'saryonaya_demo_session',
        JSON.stringify({
          active: true,
          phone: `+91 ${phone.trim()}`,
          name: studentName,
          loggedInAt: new Date().toISOString(),
        })
      )

      setSuccess(true)
      setTimeout(() => {
        router.push('/student/dashboard')
      }, 500)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      if (clerk?.loaded && clerk?.client) {
        await clerk.client.signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/student/dashboard',
        })
      } else {
        router.push('/student/dashboard')
      }
    } catch (e) {
      router.push('/student/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf2fc] via-white to-[#f4f8fc] text-[#092347] relative flex flex-col justify-between overflow-x-hidden font-sans antialiased selection:bg-[#dfa32b]/30">
      
      {/* TOP DECORATIVE WAVE CURVE (Navy + Gold accent) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden h-32 sm:h-44 z-0">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Deep Navy Curved Wave */}
          <path
            d="M0,0 L500,0 L500,35 Q350,115 180,60 Q80,25 0,95 Z"
            fill="#071d38"
          />
          {/* Rich Gold Ribbon Border */}
          <path
            d="M0,95 Q80,25 180,60 Q350,115 500,35"
            fill="none"
            stroke="#dfa32b"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* TOP BAR: Round Back Button */}
      <div className="relative z-10 max-w-md w-full mx-auto px-5 pt-4 sm:pt-6">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#071d38] hover:bg-slate-50 transition-transform active:scale-90"
          aria-label="Back to home"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </Link>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-md w-full mx-auto px-5 py-4 sm:py-8 flex-1 flex flex-col justify-center">
        
        {/* BRAND LOGO & HEADER */}
        <div className="text-center space-y-1.5 pb-6">
          <div className="flex justify-center mb-1">
            <SaryonayaLogo size="md" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#071d38] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#557086] font-medium max-w-xs mx-auto">
            Login with your registered phone number to continue your learning journey
          </p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Phone Number with +91 selector */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_10px_rgba(9,35,71,0.03)] px-4 py-3.5 flex items-center justify-between gap-3 focus-within:border-[#071d38] focus-within:ring-2 focus-within:ring-[#071d38]/10 transition-all">
            <div className="flex items-center gap-3.5 flex-1">
              <Phone size={19} className="text-[#1a4a84] shrink-0" strokeWidth={2.2} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
                maxLength={10}
                className="w-full bg-transparent text-sm font-semibold text-[#092347] placeholder-slate-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#092347] pl-3 border-l border-slate-200 shrink-0 select-none">
              <span>+91</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>

          {/* PRIMARY BUTTON: Login → */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 sm:py-4 rounded-full bg-[#071d38] hover:bg-[#0a274b] active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-[0_6px_22px_rgba(7,29,56,0.28)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <span>{success ? 'Logging In...' : loading ? 'Verifying...' : 'Login'}</span>
              <ArrowRight size={17} strokeWidth={2.4} />
            </button>
          </div>
        </form>

        {/* DIVIDER: — or — */}
        <div className="flex items-center justify-center gap-3 my-3 text-slate-400 text-xs select-none">
          <span className="w-14 h-px bg-slate-200" />
          <span className="font-medium">or</span>
          <span className="w-14 h-px bg-slate-200" />
        </div>

        {/* GOOGLE SIGN IN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#071d38] font-bold text-xs sm:text-sm border border-[#071d38] flex items-center justify-center gap-2.5 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
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
          <span>Sign in with Google</span>
        </button>

        {/* FOOTER LINK: Don't have an account? Create Account */}
        <div className="text-center pt-4 pb-6">
          <span className="text-xs text-slate-500 font-medium">
            Don't have an account?{' '}
          </span>
          <Link
            href="/sign-up"
            className="text-xs font-bold text-[#1a4a84] hover:underline"
          >
            Create Account
          </Link>
        </div>
      </main>

      {/* BOTTOM DECORATIVE WAVE CURVE (Navy + Gold accent) */}
      <div className="relative pointer-events-none overflow-hidden h-20 sm:h-28 w-full z-0 mt-auto">
        <svg
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Rich Gold Ribbon Border */}
          <path
            d="M0,70 Q140,25 280,65 Q410,95 500,30"
            fill="none"
            stroke="#dfa32b"
            strokeWidth="4"
          />
          {/* Deep Navy Curved Wave */}
          <path
            d="M0,70 Q140,25 280,65 Q410,95 500,30 L500,100 L0,100 Z"
            fill="#071d38"
          />
        </svg>
      </div>
    </div>
  )
}
