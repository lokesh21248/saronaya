'use client'

import React, { useState, use } from 'react'
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
  Bell,
  Play,
  ArrowRight,
  Star,
  Crown,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'
import { COURSES_DATA, CourseData } from '@/lib/data/lms-data'

interface CourseDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const resolvedParams = use(params)
  const { slug } = resolvedParams

  const course = COURSES_DATA.find((c) => c.slug === slug) || COURSES_DATA[0]

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [course.sections[0]?.id || 'sec-1']: true,
  })
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#102b46]/80 hover:text-[#102b46] hover:bg-white transition-all"
                >
                  {link.label}
                </Link>
              ))}
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

        {/* Course Hero & Preview Card: Responsive Grid */}
        <div className="bg-white rounded-2xl sm:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(16,43,70,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10">
            {/* Left cols: Course Info (7 cols on laptop) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#c58a23] bg-amber-50 border border-[#e5a93b]/40 px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs font-bold text-[#5a7184] bg-slate-100 px-3 py-1 rounded-full">
                  Level: {course.level}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ★ {course.rating || '4.5'} ({course.reviews || '12k'} reviews)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102b46] leading-tight">
                {course.title}
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-[#5a7184] font-medium leading-relaxed">
                {course.description}
              </p>

              {/* Eligible Academic Branches */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#102b46]">
                  <GraduationCap size={15} className="text-[#c58a23]" />
                  <span>Eligible Academic Branches:</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {course.eligibleBranches.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-0.5 text-xs font-black rounded-lg bg-amber-50 text-[#c58a23] border border-[#e5a93b]/30"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta metrics */}
              <div className="flex items-center gap-4 text-xs font-semibold text-[#5a7184] pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock size={15} className="text-[#c58a23]" />
                  <span>{course.duration || `${course.durationHours}h`} on-demand video</span>
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
                {/* Video Play Badge Container */}
                <div className="relative h-44 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center group overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80"
                    alt="Course Preview"
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#e5a93b] text-[#102b46] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} className="fill-[#102b46] ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white">
                    Preview Lesson 1
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-slate-300">
                    One-time payment • Lifetime access to all modules
                  </p>
                </div>

                <ul className="space-y-2 pt-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#f5c465]" />
                    <span>All {course.sections.reduce((acc, s) => acc + s.lessons.length, 0)} video lessons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#f5c465]" />
                    <span>Downloadable syllabus & code notes</span>
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
                  className="w-full py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-all"
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
                Course Curriculum & Syllabus
              </h2>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium">
                {course.sections.length} Sections • {course.sections.reduce((acc, s) => acc + s.lessons.length, 0)} Lessons
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {course.sections.map((section, sIdx) => {
              const isOpen = expandedSections[section.id]
              return (
                <div
                  key={section.id}
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
                        {section.lessons.length} lessons
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
                      {section.lessons.map((lesson, lIdx) => (
                        <div
                          key={lesson.id}
                          className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-3 text-xs transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-amber-50 text-[#c58a23] flex items-center justify-center font-bold text-[11px] shrink-0">
                              {lIdx + 1}
                            </div>
                            <div>
                              <span className="font-bold text-[#102b46] block">{lesson.title}</span>
                              <span className="text-[10px] text-slate-400">
                                {lesson.duration || `${lesson.durationMinutes} mins`}
                              </span>
                            </div>
                          </div>

                          {lesson.isFreePreview || lesson.isPreview ? (
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
            })}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModal && (
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
                <Link href={`/learn/${course.id}/${course.sections[0]?.lessons[0]?.id || 'les-1'}`}>
                  <button className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm transition-all">
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
                    <span className="text-[#c58a23]">₹{course.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={paymentProcessing}
                    className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
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

      <BottomNav />
    </div>
  )
}
