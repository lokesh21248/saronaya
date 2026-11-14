'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, GraduationCap } from 'lucide-react'
import { AuthCard } from '@/components/auth/AuthCard'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f8fc] via-white to-[#f0f4f9] text-[#092347] flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans antialiased selection:bg-[#dfa32b]/30">
      {/* Top Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between pb-3 sm:pb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#557086] hover:text-[#092347] transition-colors py-1.5 px-3 rounded-full hover:bg-white"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#b37a18]">
          <GraduationCap size={15} />
          <span>Registration</span>
        </div>
      </header>

      {/* Main Center Auth Container */}
      <main className="flex-1 flex items-center justify-center py-2 sm:py-6">
        <AuthCard initialMode="sign-up" />
      </main>

      {/* Subtle Footer */}
      <footer className="max-w-md w-full mx-auto text-center pt-4 pb-2 text-[11px] text-[#557086]/80 font-medium">
        © {new Date().getFullYear()} SARVONAYA Online Learning Platform. All rights reserved.
      </footer>
    </div>
  )
}
