'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Award,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Globe,
  BookOpen,
} from 'lucide-react'

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setEmailInput('')
    }
  }

  const branches = [
    { label: 'Computer Science & Engineering (CSE)', href: '/courses?category=CSE' },
    { label: 'Artificial Intelligence & Data Science', href: '/courses?category=AI_ML' },
    { label: 'Electronics & Communication (ECE)', href: '/courses?category=ECE' },
    { label: 'Electrical & Electronics (EEE)', href: '/courses?category=EEE' },
    { label: 'Mechanical Engineering (MECH)', href: '/courses?category=MECH' },
    { label: 'Civil & Structural Design (CIVIL)', href: '/courses?category=CIVIL' },
  ]

  const quickLinks = [
    { label: 'Explore Courses', href: '/courses' },
    { label: 'Premium Subscriptions', href: '/subscriptions' },
    { label: 'Student Dashboard', href: '/my-learning' },
    { label: 'Progress & Analytics', href: '/progress' },
    { label: 'Verify Certificates', href: '/certificates' },
    { label: 'Account Settings', href: '/settings' },
  ]

  const resources = [
    { label: 'GATE Preparation Notes', href: '/courses?category=CSE' },
    { label: 'Coding Practice Problems', href: '/courses' },
    { label: 'Placement Interview Roadmaps', href: '/courses' },
    { label: 'Research Papers & Whitepapers', href: '/courses' },
    { label: 'Student Community Forum', href: '/my-learning' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-[#061B3A] via-[#092653] to-[#040f21] text-slate-300 pt-12 sm:pt-16 pb-24 md:pb-12 border-t-2 border-[#E9AC32]/40">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#E9AC32]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#1456A0]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#E9AC32] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">100% Accredited</p>
              <p className="text-[11px] text-slate-400">Verifiable Credentials</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">500+ Courses</p>
              <p className="text-[11px] text-slate-400">University &amp; GATE Aligned</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">Industry Mentors</p>
              <p className="text-[11px] text-slate-400">FAANG &amp; Top MNCs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[#F8D77A] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-white">24/7 Support</p>
              <p className="text-[11px] text-slate-400">Dedicated Mentors</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links - Desktop Grid / Mobile Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 sm:py-12">
          
          {/* Brand Info & Contact (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-[#E9AC32] bg-white flex items-center justify-center">
                <svg viewBox="20 110 320 355" className="w-full h-full">
                  <image href="/images/sarvonaya-logo.jpg" width="1024" height="576" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight">SARYONAYA</span>
                <span className="text-[11px] font-bold text-[#E9AC32]">Learn • Grow • Excel</span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              India&apos;s premier engineering and technical education platform. Empowering students across CSE, AI/ML, Electronics, Mechanical, and Civil engineering with verifiable credentials.
            </p>

            {/* Contact Details */}
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E9AC32] shrink-0" />
                <span>support@saryonaya.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E9AC32] shrink-0" />
                <span>+91 98765 43210 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E9AC32] shrink-0" />
                <span>Tech Knowledge Park, Chennai, India</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white mb-2">Subscribe for Scholarship Alerts</p>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  ✓ Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 outline-none focus:border-[#E9AC32]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-black text-[#061B3A] bg-gradient-to-r from-[#E9AC32] to-[#F8D77A] shadow-md hover:brightness-110 active:scale-95 cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Academic Branches (Desktop column / Mobile accordion) */}
          <div className="lg:col-span-3 border-t border-white/10 lg:border-t-0 pt-4 lg:pt-0">
            <button
              onClick={() => toggleSection('branches')}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none"
            >
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider border-l-2 border-[#E9AC32] pl-2.5">
                Academic Branches
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform lg:hidden ${
                  openSection === 'branches' ? 'rotate-180 text-[#E9AC32]' : ''
                }`}
              />
            </button>
            <ul
              className={`space-y-2 text-xs text-slate-400 font-medium pt-3 ${
                openSection === 'branches' ? 'block' : 'hidden lg:block'
              }`}
            >
              {branches.map((b) => (
                <li key={b.label}>
                  <Link href={b.href} className="hover:text-white transition-colors block py-0.5">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (Desktop column / Mobile accordion) */}
          <div className="lg:col-span-2 border-t border-white/10 lg:border-t-0 pt-4 lg:pt-0">
            <button
              onClick={() => toggleSection('links')}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none"
            >
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider border-l-2 border-[#E9AC32] pl-2.5">
                Quick Links
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform lg:hidden ${
                  openSection === 'links' ? 'rotate-180 text-[#E9AC32]' : ''
                }`}
              />
            </button>
            <ul
              className={`space-y-2 text-xs text-slate-400 font-medium pt-3 ${
                openSection === 'links' ? 'block' : 'hidden lg:block'
              }`}
            >
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors block py-0.5">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources (Desktop column / Mobile accordion) */}
          <div className="lg:col-span-3 border-t border-white/10 lg:border-t-0 pt-4 lg:pt-0">
            <button
              onClick={() => toggleSection('resources')}
              className="w-full flex items-center justify-between text-left lg:pointer-events-none"
            >
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider border-l-2 border-[#E9AC32] pl-2.5">
                Resources
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform lg:hidden ${
                  openSection === 'resources' ? 'rotate-180 text-[#E9AC32]' : ''
                }`}
              />
            </button>
            <ul
              className={`space-y-2 text-xs text-slate-400 font-medium pt-3 ${
                openSection === 'resources' ? 'block' : 'hidden lg:block'
              }`}
            >
              {resources.map((r) => (
                <li key={r.label}>
                  <Link href={r.href} className="hover:text-white transition-colors block py-0.5">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium text-center sm:text-left">
          <p>© {new Date().getFullYear()} SARYONAYA. All rights reserved. Designed for Excellence.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/security" className="hover:text-slate-300 transition-colors">
              Security
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}