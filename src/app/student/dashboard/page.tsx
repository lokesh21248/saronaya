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
  FileText,
  CheckCircle,
  Layers,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { StudentTopNav } from '@/components/student-top-nav'
import { COURSES_DATA, ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function StudentDashboard() {
  const { user, isLoaded } = useUser()
  const [selectedBranch, setSelectedBranch] = useState('CSE')
  const [collegeName, setCollegeName] = useState('Engineering College')

  useEffect(() => {
    // Read student branch from local storage if saved in onboarding
    const savedBranch = localStorage.getItem('saryonaya_user_branch')
    const savedCollege = localStorage.getItem('saryonaya_user_college')
    if (savedBranch) setSelectedBranch(savedBranch)
    if (savedCollege) setCollegeName(savedCollege)
  }, [])

  const currentBranchInfo =
    ACADEMIC_BRANCHES.find((b) => b.code === selectedBranch) || ACADEMIC_BRANCHES[0]

  // Filter courses eligible for this branch
  const branchCourses = COURSES_DATA.filter(
    (c) => c.eligibleBranches.includes(selectedBranch) || c.eligibleBranches.includes('CSE')
  )

  const stats = [
    { label: 'Active Courses', value: '2', icon: BookOpen, color: 'text-gold' },
    { label: 'Lessons Completed', value: '14', icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'Hours Watched', value: '8.5h', icon: Clock, color: 'text-blue-400' },
    { label: 'Certificates Earned', value: '1', icon: Award, color: 'text-amber-400' },
  ]

  const continueCourse = COURSES_DATA[0] // Python for Beginners

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Academic Profile Card */}
        <div className="bg-gradient-to-r from-navy to-navy-soft border border-line/20 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold mb-3">
                <GraduationCap size={14} />
                <span>Academic Branch: {currentBranchInfo.name} ({currentBranchInfo.code})</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome back, {user?.firstName || 'Engineer'}! 👋
              </h1>
              <p className="text-muted text-sm sm:text-base mt-1.5 max-w-2xl">
                Here is your personalized engineering learning dashboard for {collegeName}. You have completed 65% of your weekly learning milestone.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/onboarding">
                <Button variant="outline" size="sm" className="border-gold/40 text-gold hover:bg-gold/10">
                  Update Branch Profile
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="gold" size="sm">
                  Browse All
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={idx}
                className="bg-navy border border-line/20 rounded-xl p-5 hover:border-gold/40 transition-colors shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">
                    {s.label}
                  </span>
                  <div className={`p-2 rounded-lg bg-navy-soft ${s.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-3">
                  {s.value}
                </div>
              </div>
            )
          })}
        </div>

        {/* Continue Learning Featured Card */}
        <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-lg font-bold text-white">Continue Watching</h2>
            </div>
            <Link
              href="/student/courses"
              className="text-xs sm:text-sm text-gold hover:underline flex items-center gap-1 font-medium"
            >
              View Enrolled Courses <ChevronRight size={14} />
            </Link>
          </div>

          <div className="bg-navy-soft/60 border border-line/15 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold">
                <PlayCircle size={32} />
              </div>
              <div>
                <span className="text-xs text-gold uppercase tracking-wider font-semibold">
                  Lesson 2 of 6 • 18 min
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Variables, Data Types and Operators
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Course: {continueCourse.title}
                </p>
                {/* Progress bar */}
                <div className="mt-3 flex items-center gap-3 w-full max-w-md">
                  <div className="h-2 w-full bg-navy-deep rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full w-[65%]" />
                  </div>
                  <span className="text-xs font-semibold text-gold">65%</span>
                </div>
              </div>
            </div>

            <Link href={`/learn/${continueCourse.id}/${continueCourse.sections[0].lessons[1].id}`}>
              <Button variant="gold" size="lg" className="w-full sm:w-auto flex items-center gap-2 font-bold shadow-lg">
                <PlayCircle size={20} />
                Resume Lesson
              </Button>
            </Link>
          </div>
        </div>

        {/* Branch-Specific Recommended Courses */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentBranchInfo.icon}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Eligible Courses for {currentBranchInfo.code} Students
                </h2>
              </div>
              <p className="text-muted text-xs sm:text-sm mt-1">
                Courses mapped and approved for {currentBranchInfo.name} academic branch
              </p>
            </div>

            {/* Quick branch switcher pill tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              {ACADEMIC_BRANCHES.slice(0, 5).map((b) => (
                <button
                  key={b.code}
                  onClick={() => setSelectedBranch(b.code)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedBranch === b.code
                      ? 'bg-gold text-navy-deep font-bold'
                      : 'bg-navy-soft text-muted hover:text-cream'
                  }`}
                >
                  {b.code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchCourses.map((course) => (
              <div
                key={course.id}
                className="bg-navy border border-line/20 rounded-xl overflow-hidden hover:border-gold/50 transition-all group flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-navy-soft">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-navy-deep/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-gold border border-gold/30">
                      {course.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-navy-deep/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-cream">
                      {course.level}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                      {course.eligibleBranches.map((code) => (
                        <span
                          key={code}
                          className="px-2 py-0.5 text-[10px] rounded bg-navy-soft font-semibold text-gold border border-line/10"
                        >
                          {code}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-gold transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted line-clamp-2 mt-1.5">
                      {course.tagline}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted mt-3 pt-3 border-t border-line/10">
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {course.durationHours} hrs
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={13} /> {course.lessonsCount} lessons
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-line/10 bg-navy/50">
                  <div>
                    <span className="text-xs text-muted line-through mr-1.5">
                      ₹{course.originalPrice}
                    </span>
                    <span className="text-lg font-bold text-gold">₹{course.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/courses/${course.slug}`}>
                      <Button variant="outline" size="sm" className="border-line/30 text-xs">
                        Details
                      </Button>
                    </Link>
                    <Link href={`/learn/${course.id}/${course.sections[0].lessons[0].id}`}>
                      <Button variant="gold" size="sm" className="text-xs font-bold text-navy-deep">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Hub: Quizzes & Certificates */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <Link href="/student/progress" className="group">
            <div className="bg-navy border border-line/20 rounded-xl p-5 hover:border-gold/40 transition-colors h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center mb-3">
                  <BarChart3 size={20} />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-gold transition-colors">
                  Learning Analytics & Streak
                </h3>
                <p className="text-xs text-muted mt-1">
                  Track weekly study hours, watch completion rates, and lesson milestones.
                </p>
              </div>
              <span className="text-xs text-gold flex items-center gap-1 mt-4 font-semibold">
                View Progress Report <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>

          <Link href="/student/quizzes" className="group">
            <div className="bg-navy border border-line/20 rounded-xl p-5 hover:border-gold/40 transition-colors h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-gold/15 text-gold flex items-center justify-center mb-3">
                  <Layers size={20} />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-gold transition-colors">
                  Assessments & Quizzes
                </h3>
                <p className="text-xs text-muted mt-1">
                  Test your understanding with chapter-wise quizzes and scorecards.
                </p>
              </div>
              <span className="text-xs text-gold flex items-center gap-1 mt-4 font-semibold">
                Practice Quizzes <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>

          <Link href="/student/certificates" className="group sm:col-span-2 lg:col-span-1">
            <div className="bg-navy border border-line/20 rounded-xl p-5 hover:border-gold/40 transition-colors h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3">
                  <Award size={20} />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-gold transition-colors">
                  Certificates of Completion
                </h3>
                <p className="text-xs text-muted mt-1">
                  Download digitally verified certificates signed by Saryonaya and your college.
                </p>
              </div>
              <span className="text-xs text-gold flex items-center gap-1 mt-4 font-semibold">
                View Certificates (1 ready) <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
