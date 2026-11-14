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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold">
            <Sparkles size={14} />
            <span>Create Student Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#102b46]">
            Start Your Learning Journey
          </h1>
          <p className="text-xs sm:text-sm text-[#5a7184] font-medium max-w-sm mx-auto">
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
                colorPrimary: '#e5a93b',
                colorBackground: '#ffffff',
                borderRadius: '1.25rem',
              },
              elements: {
                rootBox: 'w-full max-w-md',
                card: 'shadow-[0_8px_30px_rgba(16,43,70,0.06)] border border-slate-100 rounded-[28px] p-6 sm:p-8',
                headerTitle: 'text-[#102b46] font-black text-xl',
                headerSubtitle: 'text-[#5a7184] text-xs font-medium',
                formButtonPrimary:
                  'bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] font-black hover:brightness-105 shadow-sm text-xs py-3 rounded-full',
                formFieldInput:
                  'border-slate-200 focus:border-[#e5a93b] focus:ring-2 focus:ring-[#e5a93b]/20 rounded-xl text-xs sm:text-sm font-medium',
                footerActionLink: 'text-[#c58a23] font-bold hover:underline',
                dividerLine: 'bg-slate-100',
                dividerText: 'text-slate-400 text-xs font-medium',
              },
            }}
          />
        </div>

        {/* Guest Explorer Option */}
        <div className="max-w-md mx-auto text-center space-y-3 pt-2">
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-xs font-bold text-[#102b46] block">
                Just exploring?
              </span>
              <span className="text-[11px] text-[#5a7184]">
                Browse all courses and curriculums before signing up.
              </span>
            </div>

            <Link href="/courses">
              <button className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-[#102b46] hover:bg-slate-200 transition-colors flex items-center gap-1 shrink-0">
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
