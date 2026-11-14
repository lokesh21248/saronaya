'use client'

import React from 'react'
import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 md:pb-12 font-sans antialiased selection:bg-[#e5a93b]/30">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 pt-3 space-y-6">
        
        {/* Top Header */}
        <header className="flex items-center justify-between py-2">
          <SaryonayaLogo size="md" />

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-[#102b46] hover:bg-slate-50 shadow-sm transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </header>

        {/* Brand Banner */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-[#dfa32b]/40 text-[#b37a18] text-xs font-bold shadow-xs">
            <Sparkles size={14} className="text-[#dfa32b]" />
            <span>Create Student Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#092347] tracking-tight">
            Start Your Learning Journey
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] font-medium max-w-sm mx-auto">
            Get instant access to university branch-mapped courses, quizzes, and academic certifications.
          </p>
        </div>

        {/* Clerk Sign Up Card Container */}
        <div className="flex justify-center">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/onboarding"
            appearance={{
              variables: {
                colorPrimary: '#dfa32b',
                colorBackground: '#ffffff',
                borderRadius: '1.25rem',
              },
              elements: {
                rootBox: 'w-full max-w-md',
                card: 'shadow-[0_12px_40px_rgba(9,35,71,0.08)] border border-slate-200/80 rounded-[28px] p-6 sm:p-8',
                headerTitle: 'text-[#092347] font-black text-xl tracking-tight',
                headerSubtitle: 'text-[#64748b] text-xs font-medium',
                formButtonPrimary:
                  'bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#dfa32b] text-[#07182e] font-black hover:brightness-105 shadow-[0_4px_14px_rgba(223,163,43,0.3)] text-xs py-3 rounded-full uppercase tracking-wider',
                formFieldInput:
                  'border-slate-200 focus:border-[#dfa32b] focus:ring-2 focus:ring-[#dfa32b]/20 rounded-xl text-xs sm:text-sm font-medium',
                footerActionLink: 'text-[#dfa32b] font-bold hover:underline',
                dividerLine: 'bg-slate-100',
                dividerText: 'text-slate-400 text-xs font-medium',
              },
            }}
          />
        </div>

        {/* Guest Explorer Option */}
        <div className="max-w-md mx-auto text-center space-y-3 pt-2">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(9,35,71,0.04)] flex items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-xs font-bold text-[#092347] block">
                Just exploring?
              </span>
              <span className="text-[11px] text-[#64748b]">
                Browse all courses and curriculums before signing up.
              </span>
            </div>

            <Link href="/courses">
              <button className="px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#dfa32b] to-[#f5cb68] text-[#07182e] hover:brightness-105 shadow-sm flex items-center gap-1 shrink-0 transition-transform active:scale-95">
                <span>Browse</span>
                <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
