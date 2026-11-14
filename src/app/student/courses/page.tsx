'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Clock,
  PlayCircle,
  Award,
  ChevronRight,
  Bell,
  Search,
  CheckCircle,
  Play,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'
import { COURSES_DATA } from '@/lib/data/lms-data'

export default function StudentCoursesPage() {
  const [filterTab, setFilterTab] = useState<'all' | 'in-progress' | 'completed'>('all')

  const enrolledCourses = [
    {
      ...COURSES_DATA[0],
      progress: 65,
      completedLessons: 4,
      totalLessons: 6,
      currentLessonId: 'les-py-5',
      status: 'in-progress',
    },
    {
      ...COURSES_DATA[1],
      progress: 30,
      completedLessons: 2,
      totalLessons: 5,
      currentLessonId: 'les-ds-3',
      status: 'in-progress',
    },
    {
      ...COURSES_DATA[2],
      progress: 100,
      completedLessons: 8,
      totalLessons: 8,
      currentLessonId: 'les-vlsi-8',
      status: 'completed',
    },
  ]

  const displayedCourses = enrolledCourses.filter((c) => {
    if (filterTab === 'in-progress') return c.status === 'in-progress'
    if (filterTab === 'completed') return c.status === 'completed'
    return true
  })

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased selection:bg-[#e5a93b]/30">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 pt-3 space-y-5">
        {/* Header */}
        <header className="flex items-center justify-between py-2">
          <SaryonayaLogo size="md" />

          <div className="flex items-center gap-3">
            <Link
              href="/student/progress"
              className="relative p-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-[#102b46] hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={2.2} />
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

        {/* Page Title & Status Banner */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-2">
                <PlayCircle size={14} />
                <span>My Active Learning</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102b46]">
                Enrolled Courses
              </h1>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium mt-1">
                Continue watching video lectures, track your milestones, and prepare for certifications.
              </p>
            </div>

            <Link href="/courses">
              <button className="px-4 py-2 rounded-full text-xs font-bold border border-slate-200 text-[#102b46] hover:bg-slate-50 transition-all">
                Browse More Courses
              </button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 pt-5 border-t border-slate-100 mt-5">
            {[
              { id: 'all', label: `All (${enrolledCourses.length})` },
              { id: 'in-progress', label: 'In Progress (2)' },
              { id: 'completed', label: 'Completed (1)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterTab === tab.id
                    ? 'bg-[#102b46] text-white shadow-sm'
                    : 'bg-slate-50 text-[#5a7184] hover:text-[#102b46]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enrolled Courses Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {displayedCourses.map((c) => {
            const isCompleted = c.progress === 100

            return (
              <div
                key={c.id}
                className="bg-white rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Thumbnail / Header */}
                  <div className="relative h-40 bg-gradient-to-br from-[#0b1e33] to-[#122e4d] p-4 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-3 left-3 bg-[#e5a93b] text-[#102b46] px-2.5 py-1 rounded-full text-[11px] font-black flex items-center gap-1 shadow-sm z-10">
                      <Play size={10} className="fill-[#102b46]" />
                      <span>{c.rating || '4.5'}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20 z-10">
                      {c.category}
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#e5a93b]">
                      <BookOpen size={30} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-black text-[#102b46] leading-snug">
                      {c.title}
                    </h3>

                    {/* Progress details */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1.5">
                        <span className="text-[#5a7184]">
                          {c.completedLessons} of {c.totalLessons} lessons completed
                        </span>
                        <span className="text-[#c58a23] font-black">{c.progress}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#d99222] to-[#f5c465] rounded-full transition-all duration-500"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  {isCompleted ? (
                    <Link href="/student/certificates">
                      <button className="w-full py-2.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 shadow-sm flex items-center justify-center gap-2 transition-all">
                        <Award size={15} />
                        <span>View Certificate</span>
                      </button>
                    </Link>
                  ) : (
                    <Link href={`/learn/${c.id}/${c.sections[0]?.lessons[0]?.id || 'les-1'}`}>
                      <button className="w-full py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center justify-center gap-2 transition-all">
                        <Play size={13} className="fill-[#102b46]" />
                        <span>Continue Learning</span>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
