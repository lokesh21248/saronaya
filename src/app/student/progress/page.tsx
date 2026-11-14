'use client'

import React from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Flame,
  Star,
  Sparkles,
  Zap,
  Target,
  Trophy,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { PrimaryButton } from '@/components/ui/Buttons'

export default function ProgressPage() {
  const stats = [
    {
      label: 'Learning Streak',
      value: '7 Days',
      detail: 'Daily consistency maintained',
      icon: <Flame className="w-5 h-5 text-[#E9AC32] fill-[#E9AC32]" />,
      bg: 'bg-amber-50',
      border: 'border-amber-200/80',
    },
    {
      label: 'Weekly Study Hours',
      value: '14.2 hrs',
      detail: '+28% vs previous week',
      icon: <Clock className="w-5 h-5 text-[#1456A0]" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200/80',
    },
    {
      label: 'Completed Lessons',
      value: '42 Lessons',
      detail: 'Across 4 active programs',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-200/80',
    },
    {
      label: 'Average Completion',
      value: '76%',
      detail: 'On track for certificate',
      icon: <Target className="w-5 h-5 text-[#092653]" />,
      bg: 'bg-indigo-50',
      border: 'border-indigo-200/80',
    },
  ]

  const weeklyActivity = [
    { day: 'Mon', hours: 2.0, pct: '70%' },
    { day: 'Tue', hours: 2.5, pct: '85%' },
    { day: 'Wed', hours: 1.0, pct: '35%' },
    { day: 'Thu', hours: 3.0, pct: '100%' },
    { day: 'Fri', hours: 2.2, pct: '75%' },
    { day: 'Sat', hours: 3.5, pct: '95%' },
    { day: 'Sun', hours: 1.8, pct: '60%' },
  ]

  const achievementBadges = [
    {
      title: 'First Code Run',
      desc: 'Executed first Python program',
      icon: '🚀',
      unlocked: true,
      date: 'Earned Nov 04',
    },
    {
      title: '7-Day Streak Master',
      desc: 'Studied for 7 consecutive days',
      icon: '🔥',
      unlocked: true,
      date: 'Earned Yesterday',
    },
    {
      title: 'Quiz Ace 90%+',
      desc: 'Scored 92% on Data Structures',
      icon: '🏆',
      unlocked: true,
      date: 'Earned 3 days ago',
    },
    {
      title: 'Certificate Ready',
      desc: 'Completed 80% of Core Python',
      icon: '📜',
      unlocked: false,
      date: 'In Progress (78%)',
    },
  ]

  const quizPerformance = [
    {
      subject: 'Python Functions & Scope',
      score: 92,
      total: 100,
      grade: 'A+',
      status: 'Passed',
    },
    {
      subject: 'Data Structures: Stacks & Queues',
      score: 88,
      total: 100,
      grade: 'A',
      status: 'Passed',
    },
    {
      subject: 'React.js Hooks & Lifecycle',
      score: 85,
      total: 100,
      grade: 'A',
      status: 'Passed',
    },
    {
      subject: 'SQL Relational Queries',
      score: 95,
      total: 100,
      grade: 'A+',
      status: 'Passed',
    },
  ]

  const recentMilestones = [
    {
      title: 'Python for Beginners',
      detail: 'Completed Lesson 12: Object-Oriented Programming',
      time: '2 hours ago',
      type: 'lesson',
    },
    {
      title: 'Weekly Knowledge Check',
      detail: 'Scored 92% in Data Structures quiz',
      time: 'Yesterday',
      type: 'quiz',
    },
    {
      title: '7-Day Streak Milestone',
      detail: 'Reached 7-day consistency badge',
      time: 'Today',
      type: 'streak',
    },
    {
      title: 'Full Stack Web Development',
      detail: 'Submitted Capstone Project 1 for mentor review',
      time: '3 days ago',
      type: 'project',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#102B50] flex flex-col font-sans antialiased selection:bg-[#E9AC32]/30">
      <Navbar />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-20 md:pb-12">
        
        {/* Learning Journey Heading */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#E9AC32]/40 text-[#b87e1a] text-xs font-bold mb-2">
                <TrendingUp size={14} />
                <span>Learning Analytics &amp; Progress</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102B50] tracking-tight">
                Your Learning Journey
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Monitor your daily study streak, weekly hours, lesson completions, and quiz performance.
              </p>
            </div>

            <Link href="/my-learning">
              <PrimaryButton size="md" rightIcon={<ArrowRight className="w-4 h-4 text-[#F8D77A]" />}>
                Continue Learning
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl bg-white border ${s.border} shadow-[0_3px_14px_rgba(9,38,83,0.04)] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-600 line-clamp-1">{s.label}</span>
                <div className={`p-2 rounded-xl ${s.bg}`}>{s.icon}</div>
              </div>
              <div className="mt-3">
                <span className="text-xl sm:text-2xl font-black text-[#102B50] tracking-tight block">
                  {s.value}
                </span>
                <span className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5 block">
                  {s.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Grid: Weekly Activity Chart + Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Weekly Activity Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#102B50]">
                  Weekly Study Hours
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Total 14.2 hours tracked this week
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                +28% vs last week
              </span>
            </div>

            {/* Molten Gold & Royal Blue Activity Chart */}
            <div className="h-60 flex items-end justify-between gap-2 pt-6 px-2 sm:px-4 border-b border-slate-100 pb-4">
              {weeklyActivity.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-bold text-slate-500">{bar.hours}h</span>
                  <div className="w-full max-w-[44px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-[#092653] via-[#1456A0] to-[#E9AC32] rounded-t-xl transition-all duration-500 hover:brightness-110 shadow-sm"
                      style={{ height: bar.pct }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#102B50]">{bar.day}</span>
                </div>
              ))}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-semibold block">Avg Daily</span>
                <span className="text-sm sm:text-base font-black text-[#102B50] mt-1 block">2h 02m</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-semibold block">Videos Watched</span>
                <span className="text-sm sm:text-base font-black text-[#102B50] mt-1 block">24 Lessons</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-semibold block">Quiz Average</span>
                <span className="text-sm sm:text-base font-black text-[#b87e1a] mt-1 block">89.5% (A+)</span>
              </div>
            </div>
          </div>

          {/* Recent Learning Milestones (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)] space-y-4">
            <h2 className="text-base sm:text-lg font-black text-[#102B50]">
              Recent Learning Milestones
            </h2>

            <div className="space-y-3">
              {recentMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#E9AC32]/30 flex items-center justify-center text-[#b87e1a] shrink-0 font-bold">
                      {m.type === 'lesson' && <BookOpen size={18} />}
                      {m.type === 'quiz' && <CheckCircle2 size={18} />}
                      {m.type === 'streak' && <Flame size={18} className="fill-[#E9AC32]" />}
                      {m.type === 'project' && <GraduationCap size={18} />}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#102B50] line-clamp-1">{m.title}</h3>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{m.detail}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">{m.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Two-Column Grid: Quiz Performance + Achievement Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Quiz Performance Table */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#102B50]">
                  Quiz &amp; Assessment Performance
                </h2>
                <p className="text-xs text-slate-500">Track scores across your engineering modules</p>
              </div>
              <span className="text-xs font-bold text-[#1456A0] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                4 Quizzes Completed
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {quizPerformance.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#102B50]">{q.subject}</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12} /> {q.status}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-black text-[#092653] block">
                      {q.score}/{q.total}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#b87e1a] border border-[#E9AC32]/40">
                      Grade: {q.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-[#102B50]">
                Achievement Badges
              </h2>
              <span className="text-xs font-bold text-[#b87e1a]">3 of 4 Unlocked</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {achievementBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                    badge.unlocked
                      ? 'bg-amber-50/40 border-[#E9AC32]/40 shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h4 className="text-xs font-black text-[#102B50] leading-tight">{badge.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{badge.desc}</p>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">{badge.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  )
}