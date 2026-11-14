'use client'

import React from 'react'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Flame,
  Bell,
  Play,
  ArrowRight,
  ShieldCheck,
  Crown,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'

export default function ProgressPage() {
  const weeklyActivity = [
    { day: 'Mon', hours: 1.5, height: '60%' },
    { day: 'Tue', hours: 2.0, height: '80%' },
    { day: 'Wed', hours: 0.5, height: '25%' },
    { day: 'Thu', hours: 2.5, height: '100%' },
    { day: 'Fri', hours: 1.8, height: '70%' },
    { day: 'Sat', hours: 3.0, height: '90%' },
    { day: 'Sun', hours: 1.2, height: '45%' },
  ]

  const recentMilestones = [
    {
      title: 'Python for Beginners',
      detail: 'Completed Lesson 4: Functions & Scope',
      time: '2 hours ago',
      type: 'lesson',
    },
    {
      title: 'Data Structures Quiz',
      detail: 'Scored 92% (A+ Grade)',
      time: 'Yesterday',
      type: 'quiz',
    },
    {
      title: '5-Day Study Streak',
      detail: 'Kept daily consistency for 5 consecutive days',
      time: 'Today',
      type: 'streak',
    },
    {
      title: 'VLSI Design Fundamentals',
      detail: 'Watched 45 mins of CMOS fabrication',
      time: '2 days ago',
      type: 'lesson',
    },
  ]

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/courses' },
    { label: 'Progress', href: '/student/progress' },
    { label: 'Certificates', href: '/student/certificates' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 md:pb-12 font-sans antialiased selection:bg-[#e5a93b]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 space-y-5 sm:space-y-6 md:space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between py-2 border-b border-transparent md:border-slate-100 md:pb-4">
          <div className="flex items-center gap-6">
            <SaryonayaLogo size="md" />

            <nav className="hidden lg:flex items-center gap-1.5 ml-4">
              {navLinks.map((link) => {
                const isActive = link.href === '/student/progress'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-50 text-[#c58a23] border border-[#e5a93b]/40'
                        : 'text-[#102b46]/80 hover:text-[#102b46] hover:bg-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/pricing"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0e2742] to-[#123963] text-amber-300 text-xs font-bold shadow-sm"
            >
              <Crown size={13} className="text-[#f5c465]" />
              <span>Go Premium</span>
            </Link>

            <Link
              href="/student/progress"
              className="relative p-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-[#102b46] hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={19} strokeWidth={2.2} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </Link>

            <Link href="/student/profile" className="relative group">
              <div className="w-10 h-10 rounded-full ring-2 ring-[#e5a93b] p-0.5 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Student Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </Link>
          </div>
        </header>

        {/* Learning Journey Overview Card */}
        <div className="bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-2">
                <TrendingUp size={14} />
                <span>Learning Analytics & Progress</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-[#102b46]">
                Your Learning Journey
              </h1>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium mt-1">
                Monitor your study streak, weekly hours, lesson completions, and quiz performance.
              </p>
            </div>

            {/* Streak Counter Pill */}
            <div className="flex items-center gap-3 bg-amber-50/70 border border-amber-200/80 px-4 py-2.5 rounded-2xl shrink-0">
              <div className="p-2 rounded-xl bg-amber-400/20 text-[#c58a23]">
                <Flame size={22} className="fill-[#e5a93b] text-[#c58a23]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c58a23] block tracking-wider">
                  Current Streak
                </span>
                <span className="text-lg sm:text-xl font-black text-[#102b46]">5 Days Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Grid: Weekly Chart & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Weekly Study Hours Card with Chart (7 cols on laptop) */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#102b46]">
                  Weekly Study Hours
                </h2>
                <p className="text-xs text-[#5a7184] font-medium">
                  Total 12.5 hours tracked this week
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                +24% vs last week
              </span>
            </div>

            {/* Golden Bar Chart Visualization */}
            <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2 sm:px-4 border-b border-slate-100 pb-4">
              {weeklyActivity.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-bold text-[#5a7184]">{bar.hours}h</span>
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-[#d99222] to-[#f5c465] rounded-t-xl transition-all duration-500 hover:brightness-105 shadow-sm"
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#102b46]">{bar.day}</span>
                </div>
              ))}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-[#5a7184] font-semibold block">Avg Daily</span>
                <span className="text-sm sm:text-base font-black text-[#102b46] mt-1 block">1h 48m</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-[#5a7184] font-semibold block">Watched</span>
                <span className="text-sm sm:text-base font-black text-[#102b46] mt-1 block">18 Lessons</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-[#5a7184] font-semibold block">Quiz Score</span>
                <span className="text-sm sm:text-base font-black text-[#c58a23] mt-1 block">88% (Pass)</span>
              </div>
            </div>
          </div>

          {/* Recent Milestones Card (5 cols on laptop) */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] space-y-4">
            <h2 className="text-base sm:text-lg font-black text-[#102b46]">
              Recent Learning Milestones
            </h2>

            <div className="space-y-3">
              {recentMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#e5a93b]/30 flex items-center justify-center text-[#c58a23] shrink-0">
                      {m.type === 'lesson' && <BookOpen size={18} />}
                      {m.type === 'quiz' && <CheckCircle2 size={18} />}
                      {m.type === 'streak' && <Flame size={18} className="fill-[#e5a93b]" />}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#102b46]">{m.title}</h3>
                      <p className="text-[11px] text-[#5a7184] font-medium">{m.detail}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">{m.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
