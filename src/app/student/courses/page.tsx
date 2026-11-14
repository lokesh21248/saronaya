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
  Crown,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/courses' },
    { label: 'Progress', href: '/student/progress' },
    { label: 'Certificates', href: '/student/certificates' },
  ]

  const displayedCourses = enrolledCourses.filter((c) => {
    if (filterTab === 'in-progress') return c.status === 'in-progress'
    if (filterTab === 'completed') return c.status === 'completed'
    return true
  })

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#092347] pb-24 md:pb-12 font-sans antialiased selection:bg-[#dfa32b]/30">
      {/* Master Navbar with Login/Logout & Official Logo */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6 sm:space-y-8">

        {/* Page Title & Status Banner */}
        <div className="bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-2">
                <PlayCircle size={14} />
                <span>My Active Learning</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-[#102b46]">
                Enrolled Courses
              </h1>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium mt-1">
                Continue watching video lectures, track your milestones, and prepare for certifications.
              </p>
            </div>

            <Link href="/courses">
              <button className="px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold border border-slate-200 text-[#102b46] hover:bg-slate-50 transition-all">
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

        {/* Enrolled Courses Grid: 1 col mobile -> 2 tablet -> 3 laptop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedCourses.map((c) => {
            const isCompleted = c.progress === 100

            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Thumbnail / Header */}
                  <div className="relative h-44 bg-gradient-to-br from-[#0b1e33] to-[#122e4d] p-4 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-3 left-3 bg-[#e5a93b] text-[#102b46] px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm z-10">
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

      <Footer />
      <BottomNav />
    </div>
  )
}
