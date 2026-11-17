'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import {
  BookOpen,
  GraduationCap,
  Clock,
  Award,
  Play,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Crown,
  Loader2,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function StudentDashboard() {
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()
  const [selectedBranch, setSelectedBranch] = useState('CSE')
  const [collegeName, setCollegeName] = useState('Engineering College')
  const [courses, setCourses] = useState<any[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)

  // Route protection: redirect unauthenticated users to sign-in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Load real student academic profile from Supabase
  useEffect(() => {
    async function fetchStudentProfile() {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const data = await res.json()
          if (data?.qualification?.college_name) {
            setCollegeName(data.qualification.college_name)
          }
          if (data?.qualification?.branch_code) {
            setSelectedBranch(data.qualification.branch_code)
          }
        }
      } catch (e) {
        console.warn('Could not fetch remote profile:', e)
      }
    }

    if (isSignedIn) {
      fetchStudentProfile()
    }
  }, [isSignedIn])

  // Fetch real courses from database
  useEffect(() => {
    async function loadCourses() {
      try {
        setLoadingCourses(true)
        const res = await fetch(`/api/courses?branch=${selectedBranch}`)
        if (res.ok) {
          const json = await res.json()
          setCourses(json.data || [])
        }
      } catch (err) {
        console.warn('Could not load courses:', err)
      } finally {
        setLoadingCourses(false)
      }
    }
    loadCourses()
  }, [selectedBranch])

  const currentBranchInfo =
    ACADEMIC_BRANCHES.find((b) => b.code === selectedBranch) || ACADEMIC_BRANCHES[0]

  const stats = [
    { label: 'Active Courses', value: '0', icon: BookOpen, color: 'text-[#dfa32b] bg-amber-50' },
    { label: 'Completed Lessons', value: '0', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Hours Watched', value: '0h', icon: Clock, color: 'text-blue-600 bg-blue-50' },
    { label: 'Certificates', value: '0', icon: Award, color: 'text-purple-600 bg-purple-50' },
  ]

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f6f9fd] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#092347] mx-auto" />
          <p className="text-xs font-bold text-slate-500">Loading student dashboard...</p>
        </div>
      </div>
    )
  }

  const studentDisplayName = user?.fullName || user?.firstName || 'Student'

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#092347] pb-24 md:pb-12 font-sans antialiased selection:bg-[#dfa32b]/30">
      {/* Master Navbar with Login/Logout & Official Logo */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6 sm:space-y-8">

        {/* Academic Profile Welcome Card */}
        <div className="bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.06)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#dfa32b]/40 text-[#b37a18] text-xs font-bold mb-2">
                <GraduationCap size={14} className="text-[#dfa32b]" />
                <span>{currentBranchInfo.code} • {currentBranchInfo.name}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-[#092347] tracking-tight">
                Welcome back, {studentDisplayName}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-[#557086] font-medium mt-1">
                Enrolled at {collegeName}. Ready to continue your degree track?
              </p>
            </div>

            <Link href="/onboarding">
              <button className="px-4 py-2 sm:py-2.5 rounded-full border border-slate-200 text-xs font-bold text-[#092347] hover:bg-slate-50 transition-all cursor-pointer">
                Change Branch
              </button>
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(16,43,70,0.04)] flex items-center gap-3 sm:gap-4"
              >
                <div className={`p-3 rounded-2xl ${s.color} shrink-0`}>
                  <Icon size={22} strokeWidth={2.4} />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs text-[#5a7184] font-semibold block">
                    {s.label}
                  </span>
                  <span className="text-lg sm:text-2xl font-black text-[#102b46] mt-0.5 block">
                    {s.value}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Course Prompt Card */}
        <section className="bg-gradient-to-r from-[#0c243c] via-[#0f2d4a] to-[#163a5f] rounded-2xl sm:rounded-[28px] p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-[#f5c465] text-xs font-bold">
                <Sparkles size={13} />
                <span>Academic Path</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Engineering Curriculum Specialization
              </h3>
              <p className="text-xs text-slate-300">
                Explore accredited modules aligned with university syllabi and verified industry credentials.
              </p>
            </div>

            <Link href="/courses" className="shrink-0">
              <button className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Play size={13} className="fill-[#102b46]" />
                <span>Explore Courses</span>
              </button>
            </Link>
          </div>
        </section>

        {/* Branch-Specific Recommended Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#102b46] tracking-tight">
                Recommended for {currentBranchInfo.code}
              </h2>
              <p className="text-xs text-[#5a7184] font-medium">
                Mapped directly to your university academic curriculum
              </p>
            </div>
            <Link
              href="/courses"
              className="text-xs sm:text-sm font-bold text-[#c58a23] hover:text-[#a8741a] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loadingCourses ? (
            <div className="py-12 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#092347] mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-semibold">Loading courses...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="relative h-40 bg-gradient-to-br from-[#0b1e33] to-[#122e4d] p-4 flex items-center justify-center overflow-hidden">
                      <div className="absolute top-3 left-3 bg-[#e5a93b] text-[#102b46] px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm z-10">
                        <Play size={10} className="fill-[#102b46]" />
                        <span>{c.rating || '4.8'}</span>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#e5a93b]">
                        <BookOpen size={28} />
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-2">
                      <h3 className="text-sm sm:text-base font-black text-[#102b46] group-hover:text-[#c58a23] transition-colors leading-snug line-clamp-1">
                        {c.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#5a7184] font-medium line-clamp-1">
                        {c.short_description || c.description}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] text-[#5a7184] font-semibold">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          <span>{c.duration_hours ? `${c.duration_hours}h` : '10h'}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <BookOpen size={12} className="text-slate-400" />
                          <span>{c.lessons_count || 0} Lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">One-time pass</span>
                      <span className="text-base font-black text-[#102b46]">
                        {c.price ? `₹${c.price}` : 'Free'}
                      </span>
                    </div>

                    <Link href={`/courses/${c.slug || c.id}`}>
                      <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#102b46] text-white hover:bg-[#1a446c] transition-all cursor-pointer">
                        View Course
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No courses published for this branch yet</p>
              <p className="text-xs text-slate-400 mt-1">Check back soon or browse other engineering disciplines.</p>
              <Link href="/courses">
                <button className="mt-4 px-5 py-2 rounded-full bg-[#092347] text-white text-xs font-bold hover:bg-[#143d70] transition-colors cursor-pointer">
                  Browse All Courses
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}
