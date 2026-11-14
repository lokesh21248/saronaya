'use client'

import React from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Award,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { PrimaryButton } from '@/components/ui/Buttons'

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#07182e] via-[#051325] to-[#030b15] text-slate-300 pt-16 sm:pt-20 pb-24 md:pb-12 overflow-hidden border-t-2 border-[#dfa32b]/40">
      
      {/* Decorative Gold Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#dfa32b]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Top Trust & Value Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#e5a93b] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">100% Accredited</p>
              <p className="text-[11px] text-slate-400">Verifiable Certifications</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">500+ Engineering Courses</p>
              <p className="text-[11px] text-slate-400">University & Gate Aligned</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">Industry Mentors</p>
              <p className="text-[11px] text-slate-400">FAANG & Top MNC Experts</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">24/7 Academic Support</p>
              <p className="text-[11px] text-slate-400">Community & Live Q&A</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 py-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-[#e5a93b] bg-white flex items-center justify-center">
                <svg viewBox="20 110 320 355" className="w-full h-full">
                  <image href="/images/sarvonaya-logo.jpg" width="1024" height="576" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight">SARYONAYA</span>
                <span className="text-xs font-bold text-[#e5a93b]">Learn • Grow • Excel</span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              India&apos;s premier engineering and technical education platform. Empowering students across Computer Science, AI/ML, Electronics, Mechanical, and Civil engineering with industry-grade skills and verified academic credentials.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-bold text-[#e5a93b]">
              <span>Trusted by 10,000+ Learners Nationwide</span>
            </div>
          </div>

          {/* Column 2: Academic Branches */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#dfa32b] pl-2.5">
              Academic Branches
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/courses?category=CSE" className="hover:text-white transition-colors">
                  Computer Science (CSE)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=AI_ML" className="hover:text-white transition-colors">
                  AI & Machine Learning (AI/ML)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=ECE" className="hover:text-white transition-colors">
                  Electronics & Comm (ECE)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=EEE" className="hover:text-white transition-colors">
                  Electrical Engineering (EEE)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=MECH" className="hover:text-white transition-colors">
                  Mechanical Engineering (MECH)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=CIVIL" className="hover:text-white transition-colors">
                  Civil Engineering (CIVIL)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#dfa32b] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link href="/subscriptions" className="hover:text-white transition-colors">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/my-learning" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-white transition-colors">
                  Learning Analytics
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-white transition-colors">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Student Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Stay Ahead */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-[#dfa32b] pl-2.5">
              Stay Ahead
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Get notified of new gate courses, AI workshops, and special student scholarship programs.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Thank you for subscribing to SARYONAYA updates!')
              }}
              className="space-y-2"
            >
              <input
                type="email"
                required
                placeholder="Enter college email..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 outline-none focus:border-[#dfa32b] transition-all"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-[#07182e] bg-gradient-to-r from-[#dfa32b] via-[#f7d685] to-[#d99222] border-t border-white/50 border-b-2 border-b-[#a66d0e] shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe for Free</span>
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} SARYONAYA. All rights reserved. Designed for Excellence.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/security" className="hover:text-slate-300 transition-colors">
              Security & Compliance
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
