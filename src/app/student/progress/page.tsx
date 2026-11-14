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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
import { COURSES_DATA } from '@/lib/data/lms-data'

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

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold mb-3">
              <TrendingUp size={14} />
              <span>Learning Analytics & Progress</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Learning Journey</h1>
            <p className="text-muted text-sm mt-1 max-w-xl">
              Monitor your study streak, weekly hours, lesson completions, and quiz performance.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-navy-soft px-4 py-3 rounded-xl border border-line/15">
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
              <Flame size={24} />
            </div>
            <div>
              <span className="text-xs text-muted block">Current Streak</span>
              <span className="text-xl font-black text-white">5 Days Active</span>
            </div>
          </div>
        </div>

        {/* Progress Overview Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Weekly Learning Chart */}
          <div className="lg:col-span-2 bg-navy border border-line/20 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Weekly Study Hours</h2>
                <p className="text-xs text-muted">Total 12.5 hours this week</p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                +24% vs last week
              </span>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-48 flex items-end justify-between gap-2 pt-8 px-4 border-b border-line/10 pb-4">
              {weeklyActivity.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] text-muted">{bar.hours}h</span>
                  <div className="w-full max-w-[36px] bg-navy-deep rounded-t-lg overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-gold-dark to-gold rounded-t-lg transition-all duration-500 hover:brightness-110"
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center">
              <div className="p-3 bg-navy-soft/40 rounded-xl">
                <span className="text-xs text-muted block">Avg Daily Time</span>
                <span className="text-base font-bold text-white mt-1 block">1h 48m</span>
              </div>
              <div className="p-3 bg-navy-soft/40 rounded-xl">
                <span className="text-xs text-muted block">Videos Watched</span>
                <span className="text-base font-bold text-white mt-1 block">18 Lessons</span>
              </div>
              <div className="p-3 bg-navy-soft/40 rounded-xl">
                <span className="text-xs text-muted block">Avg Quiz Score</span>
                <span className="text-base font-bold text-gold mt-1 block">91%</span>
              </div>
            </div>
          </div>

          {/* Goals and Milestones */}
          <div className="bg-navy border border-line/20 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Milestone Goals</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-white">Complete Python Core</span>
                    <span className="text-gold font-bold">65%</span>
                  </div>
                  <div className="h-2 bg-navy-deep rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full w-[65%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-white">React Web Development</span>
                    <span className="text-blue-400 font-bold">40%</span>
                  </div>
                  <div className="h-2 bg-navy-deep rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full w-[40%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-white">Assessments Passed</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="h-2 bg-navy-deep rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-navy-soft/50 rounded-xl border border-line/10 text-xs space-y-2">
              <span className="text-gold font-semibold flex items-center gap-1.5">
                <Award size={14} /> Next Certificate Unlock
              </span>
              <p className="text-muted leading-relaxed">
                Finish 2 more lessons in Python for Beginners to unlock your verified Grade A certificate.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

