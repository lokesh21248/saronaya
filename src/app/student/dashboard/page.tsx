'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import {
  BookOpen,
  Clock,
  Award,
  BarChart3,
  PlayCircle,
  GraduationCap,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Bell,
  Play,
  ArrowRight,
  Crown,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'
import { COURSES_DATA, ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function StudentDashboard() {
  const { user } = useUser()
  const [selectedBranch, setSelectedBranch] = useState('CSE')
  const [collegeName, setCollegeName] = useState('Engineering College')

  useEffect(() => {
    const savedBranch = localStorage.getItem('saryonaya_user_branch')
    const savedCollege = localStorage.getItem('saryonaya_user_college')
    if (savedBranch) setSelectedBranch(savedBranch)
    if (savedCollege) setCollegeName(savedCollege)
  }, [])

  const currentBranchInfo =
    ACADEMIC_BRANCHES.find((b) => b.code === selectedBranch) || ACADEMIC_BRANCHES[0]

  const branchCourses = COURSES_DATA.filter(
    (c) => c.eligibleBranches.includes(selectedBranch) || c.eligibleBranches.includes('CSE')
  )

  const stats = [
    { label: 'Active Courses', value: '2', icon: BookOpen, color: 'text-[#e5a93b] bg-amber-50' },
    { label: 'Completed Lessons', value: '14', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Hours Watched', value: '8.5h', icon: Clock, color: 'text-blue-600 bg-blue-50' },
    { label: 'Certificates', value: '1', icon: Award, color: 'text-purple-600 bg-purple-50' },
  ]

  const continueCourse = COURSES_DATA[0] // Python for Beginners

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 pt-3 space-y-5">
        {/* Top Header */}
        <header className="flex items-center justify-between py-2">
          <SaryonayaLogo size="md" />

          <div className="flex items-center gap-3">
            <Link
              href="/student/progress"
              className="relative p-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-[#102b46] hover:bg-slate-50 transition-colors"
            >
              <Bell size={20} strokeWidth={2.2} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </Link>

            <Link href="/student/profile">
              <div className="w-10 h-10 rounded-full ring-2 ring-[#e5a93b] p-0.5 overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Student Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </Link>
          </div>
        </header>

        {/* Academic Profile Welcome Card */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.06)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-2">
                <GraduationCap size={14} />
                <span>{currentBranchInfo.code} • {currentBranchInfo.name}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102b46]">
                Welcome back, {user?.firstName || 'Learner'}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium mt-1">
                Enrolled at {collegeName}. You are on a 5-day learning streak!
              </p>
            </div>

            <Link href="/onboarding">
              <button className="px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-[#102b46] hover:bg-slate-50 transition-all">
                Change Branch
              </button>
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_20px_rgba(16,43,70,0.04)] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#8294a5] uppercase tracking-wider">
                    {s.label}
                  </span>
                  <div className={`p-1.5 rounded-lg ${s.color}`}>
                    <Icon size={16} />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#102b46] mt-2">
                  {s.value}
                </div>
              </div>
            )
          })}
        </div>

        {/* Continue Learning Featured Card */}
        <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.06)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#102b46] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Continue Learning
            </h2>
            <Link
              href="/student/courses"
              className="text-xs font-bold text-[#d89b2b] hover:text-[#b88226] flex items-center gap-0.5"
            >
              My Courses <ChevronRight size={14} />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#102b46] to-[#0a1e32] flex items-center justify-center text-[#e5a93b] shadow-md shrink-0">
                <PlayCircle size={30} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#e5a93b] uppercase tracking-wider">
                  Lesson 2 of 6 • 18 min
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#102b46] line-clamp-1">
                  Variables, Data Types and Operators
                </h3>
                <p className="text-xs text-[#5a7184] font-medium">
                  {continueCourse.title}
                </p>
                {/* Progress bar */}
                <div className="mt-2 flex items-center gap-2 w-48 sm:w-60">
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#d89b2b] to-[#f5cb68] rounded-full w-[65%]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#d89b2b]">65%</span>
                </div>
              </div>
            </div>

            <Link href={`/learn/${continueCourse.id}/${continueCourse.sections[0].lessons[1].id}`}>
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e5a93b] via-[#f5cb68] to-[#dba032] text-[#0a1e32] font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5">
                <Play size={12} fill="#0a1e32" />
                <span>Resume Lesson</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Branch-Specific Recommended Courses */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#102b46]">
                Eligible Courses for {currentBranchInfo.code}
              </h2>
              <p className="text-xs text-[#5a7184] font-medium">
                Mapped to your academic syllabus
              </p>
            </div>
            <Link
              href="/courses"
              className="text-xs font-bold text-[#d89b2b] hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {branchCourses.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(16,43,70,0.06)] hover:shadow-[0_8px_30px_rgba(16,43,70,0.12)] transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-36 bg-gradient-to-tr from-[#0b1e33] to-[#122e4d] p-3.5 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#e5a93b] text-[#0a1e32] px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Play size={10} fill="#0a1e32" />
                    <span>4.6 (8k)</span>
                  </div>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-extrabold text-[15px] text-[#102b46] group-hover:text-[#d89b2b] transition-colors leading-snug line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-[#5a7184] font-medium line-clamp-1">
                    {course.tagline}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-[#8294a5] font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.durationHours} hrs
                    </span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-black text-[#102b46]">
                      ₹{course.price}
                    </span>

                    <Link href={`/courses/${course.slug}`}>
                      <button className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#e5a93b] via-[#f5cb68] to-[#dba032] text-[#0a1e32] text-[11px] font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5">
                        <Play size={10} fill="#0a1e32" />
                        <span>Enroll Now</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get Unlimited Access Banner */}
        <section className="relative rounded-[22px] bg-gradient-to-r from-[#0a1e32] via-[#0d2642] to-[#123153] p-5 overflow-hidden shadow-lg text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e5a93b]/30 to-[#f5d076]/10 border border-[#e5a93b]/50 flex items-center justify-center shrink-0 text-[#f5cb68]">
                <Crown size={26} strokeWidth={2.4} fill="#e5a93b" fillOpacity={0.2} />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Get Unlimited Access</h3>
                <p className="text-xs text-slate-300 font-medium">Subscribe and unlock all courses</p>
              </div>
            </div>

            <Link href="/pricing">
              <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e5a93b] via-[#f5cb68] to-[#dba032] text-[#0a1e32] font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5">
                <span>Go Premium</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
