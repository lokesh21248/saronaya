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
  Sparkles,
  Zap,
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

  const handleInstantDemo = () => {
    localStorage.setItem(
      'saryonaya_demo_session',
      JSON.stringify({
        active: true,
        name: 'Aarav Patel',
        phone: '+91 9876543210',
        education: 'B.Tech / B.E (Engineering)',
        college: 'Anna University, Chennai',
        course: 'Computer Science & Engineering (CSE)',
        passedOutYear: '2026',
        loggedInAt: new Date().toISOString(),
      })
    )
    router.push('/student/dashboard')
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
      <main className="relative z-10 max-w-md w-full mx-auto px-5 py-4 sm:py-8 flex-1 flex flex-col justify-center">
        
        {/* BRAND LOGO & HEADER */}
        <div className="text-center space-y-2 pb-6">
          <div className="flex justify-center mb-1">
            <SaryonayaLogo size="md" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#07182e] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#557086] font-medium max-w-xs mx-auto leading-relaxed">
            Login with your registered phone number to continue your learning journey
          </p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Phone Number with +91 selector */}
          <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 focus-within:shadow-[0_4px_20px_rgba(9,35,71,0.08)] transition-all">
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                <Phone size={18} strokeWidth={2.2} />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
                maxLength={10}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#f8fafc] border border-slate-200/80 text-xs font-black text-[#07182e] shrink-0 select-none">
              <span>+91</span>
              <ChevronDown size={13} className="text-slate-400" />
            </div>
          </div>

          {/* MASTER 3D ROYAL NAVY PRIMARY BUTTON: Login → */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0d315d] hover:brightness-110 active:scale-[0.98] text-white font-black text-sm tracking-wide border-t border-white/20 border-b border-black/40 shadow-[0_8px_25px_rgba(9,35,71,0.32)] hover:shadow-[0_12px_32px_rgba(9,35,71,0.45)] flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-50 group"
            >
              <span>{success ? 'Logging In...' : loading ? 'Verifying...' : 'Login'}</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={14} strokeWidth={2.6} className="text-white" />
              </div>
            </button>
          </div>
        </form>

        {/* DIVIDER: — or — */}
        <div className="flex items-center justify-center gap-3 my-3.5 text-slate-400 text-xs select-none">
          <span className="w-14 h-px bg-slate-200" />
          <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">or</span>
          <span className="w-14 h-px bg-slate-200" />
        </div>

        {/* GOOGLE SIGN IN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#07182e] font-bold text-xs sm:text-sm border border-[#092347]/30 hover:border-[#092347] shadow-[0_2px_10px_rgba(9,35,71,0.04)] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer mb-2.5"
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

        {/* INSTANT STUDENT DEMO BUTTON (1-Click) */}
        <button
          type="button"
          onClick={handleInstantDemo}
          className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-amber-100/60 border border-[#dfa32b]/50 text-[#916110] font-black text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:brightness-95 transition-all cursor-pointer active:scale-98"
        >
          <Zap size={14} className="text-[#dfa32b] fill-[#dfa32b]" />
          <span>Instant Student Demo Access (1-Click)</span>
        </button>

        {/* FOOTER LINK: Don't have an account? Create Account */}
        <div className="text-center pt-4 pb-6">
          <span className="text-xs text-slate-500 font-medium">
            Don't have an account?{' '}
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
