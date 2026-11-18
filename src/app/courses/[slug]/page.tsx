'use client'

import React, { useState, useEffect, use } from 'react'
import Link from 'next/link'
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  PlayCircle,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Check,
  Share2,
  Play,
  ArrowRight,
  Star,
  User,
  RefreshCw,
} from 'lucide-react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { BottomNav } from '@/components/layout/BottomNav'
import { COURSES_DATA } from '@/lib/data/lms-data'

interface CourseDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const resolvedParams = use(params)
  const { slug } = resolvedParams

  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Fetch course details dynamically from API / Supabase
  useEffect(() => {
    let isMounted = true

    async function loadCourse() {
      try {
        setLoading(true)
        const res = await fetch(`/api/courses/${slug}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const json = await res.json()
          if (isMounted && json.success && json.data) {
            setCourse(json.data)
            if (json.data.sections && json.data.sections[0]) {
              setExpandedSections({ [json.data.sections[0].id]: true })
            }
            return
          }
        }
      } catch (err) {
        console.warn('Failed to load course from API:', err)
      } finally {
        if (isMounted) setLoading(false)
      }

      // Graceful fallback to local course data if API is empty
      const local = COURSES_DATA.find((c) => c.slug === slug) || COURSES_DATA[0]
      if (isMounted) {
        setCourse(local)
        if (local?.sections?.[0]) {
          setExpandedSections({ [local.sections[0].id]: true })
        }
      }
    }

    loadCourse()

    return () => {
      isMounted = false
    }
  }, [slug])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSimulatePayment = () => {
    setPaymentProcessing(true)
    setTimeout(() => {
      setPaymentProcessing(false)
      setPaymentSuccess(true)
    }, 1500)
  }

  const sections = course?.sections || []
  const eligibleBranches = course?.eligibleBranches || ['CSE', 'AIML', 'ECE']
  const totalLessons =
    course?.totalLessons ||
    sections.reduce((acc: number, s: any) => acc + (s.lessons ? s.lessons.length : 0), 0)

  const instructorName =
    course?.instructor?.name ||
    course?.primary_instructor?.full_name ||
    'Sarvonaya Faculty'

  const instructorBio =
    course?.instructor?.bio ||
    course?.primary_instructor?.bio ||
    'Senior Academic Faculty'

  const categoryName =
    course?.category?.name ||
    course?.category ||
    course?.categories?.name ||
    'General Engineering'

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 md:pb-12 font-sans antialiased selection:bg-[#dfa32b]/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8 space-y-5 sm:space-y-6 md:space-y-8">
        {loading && !course ? (
          <div className="py-24 text-center space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#0B3473]" />
            <p className="text-sm font-semibold text-slate-600">Loading course curriculum &amp; details...</p>
          </div>
        ) : !course ? (
          <div className="py-24 text-center space-y-4 bg-white rounded-3xl p-8 border border-slate-200">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
            <h2 className="text-xl font-bold text-slate-800">Course Not Found</h2>
            <p className="text-xs text-slate-500">The requested course could not be located in the catalog.</p>
            <Link href="/courses">
              <button className="px-5 py-2.5 rounded-full bg-[#0B3473] text-white text-xs font-bold shadow-md">
                Browse Courses Marketplace
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Course Hero & Preview Card: Responsive Grid */}
            <div className="bg-white rounded-2xl sm:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(16,43,70,0.06)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
                {/* Left cols: Course Info (7 cols on laptop) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#c58a23] bg-amber-50 border border-[#e5a93b]/40 px-3 py-1 rounded-full">
                      {categoryName}
                    </span>
                    <span className="text-xs font-bold text-[#5a7184] bg-slate-100 px-3 py-1 rounded-full">
                      Level: {course.level || course.difficulty_level || 'All Levels'}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      ★ {course.rating || course.average_rating || '4.8'} ({course.reviews || course.reviews_count || '128'} reviews)
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102b46] leading-tight">
                    {course.title}
                  </h1>

                  <p className="text-xs sm:text-sm lg:text-base text-[#5a7184] font-medium leading-relaxed">
                    {course.full_description || course.short_description || course.description}
                  </p>

                  {/* Instructor Bio Card */}
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#102b46] text-[#e5a93b] font-bold flex items-center justify-center text-xs shrink-0 overflow-hidden">
                      {course.instructor?.avatar ? (
                        <img src={course.instructor.avatar} alt={instructorName} className="w-full h-full object-cover" />
                      ) : (
                        <User size={18} />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-black text-[#102b46] block">{instructorName}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{instructorBio}</span>
                    </div>
                  </div>

                  {/* Eligible Academic Branches */}
                  {eligibleBranches.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#102b46]">
                        <GraduationCap size={15} className="text-[#c58a23]" />
                        <span>Eligible Academic Branches:</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {eligibleBranches.map((b: string) => (
                          <span
                            key={b}
                            className="px-2.5 py-0.5 text-xs font-black rounded-lg bg-amber-50 text-[#c58a23] border border-[#e5a93b]/30"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meta metrics */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-[#5a7184] pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock size={15} className="text-[#c58a23]" />
                      <span>{course.duration || `${course.duration_hours || 10}h`} on-demand video</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Award size={15} className="text-[#c58a23]" />
                      <span>Verified Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Right cols: Preview & Purchase Card (5 cols on laptop) */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-[#0c243c] to-[#123456] rounded-2xl sm:rounded-[28px] p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="space-y-4">
                    {/* Video / Course Graphic Preview */}
                    <div className="relative h-44 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center group overflow-hidden">
                      <img
                        src={course.thumbnail_url || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80'}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#e5a93b] text-[#102b46] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                          <Play size={20} className="fill-[#102b46] ml-1" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white">
                        Curriculum Preview
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl sm:text-3xl font-black text-white">
                          ₹{Number(course.price || 0).toLocaleString('en-IN')}
                        </div>
                        {course.discount_price && Number(course.discount_price) > Number(course.price) && (
                          <div className="text-xs text-slate-400 line-through">
                            ₹{Number(course.discount_price).toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300">
                        One-time payment • Lifetime access to all modules
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-slate-200">
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#f5c465]" />
                        <span>All {totalLessons} video lessons &amp; projects</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#f5c465]" />
                        <span>Downloadable syllabus &amp; code notes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#f5c465]" />
                        <span>Official Verified Certificate</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setCheckoutModal(true)}
                      className="w-full py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Play size={13} className="fill-[#102b46]" />
                      <span>Enroll in Course</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Sections Accordion */}
            <div className="bg-white rounded-2xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-[#102b46]">
                    Course Curriculum &amp; Syllabus
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5a7184] font-medium mt-0.5">
                    {sections.length} Sections • {totalLessons} Lessons
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {sections.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">Curriculum details are being finalized by faculty.</p>
                ) : (
                  sections.map((section: any, sIdx: number) => {
                    const isOpen = expandedSections[section.id]
                    const lessons = section.lessons || []
                    return (
                      <div
                        key={section.id || sIdx}
                        className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/50"
                      >
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
                        >
                          <div>
                            <span className="text-[11px] font-bold text-[#c58a23] uppercase tracking-wider block">
                              Section {sIdx + 1}
                            </span>
                            <h3 className="text-xs sm:text-sm font-bold text-[#102b46] mt-0.5">
                              {section.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-[#5a7184]">
                              {lessons.length} lessons
                            </span>
                            {isOpen ? (
                              <ChevronUp size={18} className="text-[#102b46]" />
                            ) : (
                              <ChevronDown size={18} className="text-[#102b46]" />
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="p-3 sm:p-4 bg-white border-t border-slate-100 space-y-2">
                            {lessons.map((lesson: any, lIdx: number) => (
                              <div
                                key={lesson.id || lIdx}
                                className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-3 text-xs transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-full bg-amber-50 text-[#c58a23] flex items-center justify-center font-bold text-[11px] shrink-0">
                                    {lIdx + 1}
                                  </div>
                                  <div>
                                    <span className="font-bold text-[#102b46] block">{lesson.title}</span>
                                    <span className="text-[10px] text-slate-400">
                                      {lesson.duration || (lesson.duration_minutes ? `${lesson.duration_minutes}m` : '15m')}
                                    </span>
                                  </div>
                                </div>

                                {lesson.isFreePreview || lesson.isPreview || lesson.is_preview ? (
                                  <Link href={`/learn/${course.id}/${lesson.id}`}>
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-[#c58a23] border border-[#e5a93b]/40 hover:bg-amber-100 transition-colors">
                                      Preview Free
                                    </span>
                                  </Link>
                                ) : (
                                  <span className="text-[10px] text-slate-400 font-semibold">Locked</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Checkout Modal */}
      {checkoutModal && course && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            {paymentSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-black text-[#102b46]">Enrollment Successful!</h3>
                <p className="text-xs text-[#5a7184]">
                  You now have complete access to {course.title}.
                </p>
                <Link href={`/learn/${course.id}/${course.sections?.[0]?.lessons?.[0]?.id || 'les-1'}`}>
                  <button className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm transition-all cursor-pointer">
                    Start Learning Now →
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-[#102b46]">Checkout</h3>
                  <button
                    onClick={() => setCheckoutModal(false)}
                    className="text-xs font-bold text-slate-400 hover:text-[#102b46]"
                  >
                    Cancel
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-[#102b46]">{course.title}</div>
                  <div className="flex justify-between items-center text-sm font-black text-[#102b46]">
                    <span>Total Amount</span>
                    <span className="text-[#c58a23]">₹{Number(course.price || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={paymentProcessing}
                    className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <CreditCard size={15} />
                    <span>{paymentProcessing ? 'Processing with Razorpay...' : 'Pay with Razorpay / UPI'}</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    256-bit SSL encrypted • Instant course access
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  )
}
