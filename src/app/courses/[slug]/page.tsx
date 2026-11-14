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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
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

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      {/* Hero Banner */}
      <section className="bg-navy border-b border-line/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Course Overview */}
          <div className="lg:col-span-2 space-y-5">
            {/* Branch Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gold bg-gold/15 border border-gold/30 px-3 py-1 rounded-full">
                {course.category}
              </span>
              <span className="text-xs text-cream/70 bg-navy-soft px-3 py-1 rounded-full border border-line/10">
                Level: {course.level}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-cream/80 leading-relaxed">
              {course.tagline}
            </p>

            {/* Academic Branch Eligibility Notice */}
            <div className="p-4 rounded-xl bg-navy-soft/60 border border-line/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
                <GraduationCap size={16} /> Eligible Engineering Branches:
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {course.eligibleBranches.map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 text-xs font-bold rounded-md bg-gold/15 text-gold border border-gold/30"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted">
                Students from these branches can enroll and earn official academic qualification credit.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs sm:text-sm text-muted pt-2">
              <span className="flex items-center gap-1.5 text-cream">
                <Clock size={16} className="text-gold" /> {course.durationHours} Hours Video
              </span>
              <span className="flex items-center gap-1.5 text-cream">
                <BookOpen size={16} className="text-gold" /> {course.lessonsCount} Video Lessons
              </span>
              <span className="flex items-center gap-1.5 text-cream">
                <Award size={16} className="text-gold" /> Verified Certificate
              </span>
            </div>
          </div>

          {/* Right Col: Pricing & Enrollment Card */}
          <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 lg:sticky lg:top-24">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-soft">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <Link
                href={`/learn/${course.id}/${course.sections[0]?.lessons[0]?.id}`}
                className="absolute inset-0 bg-black/40 flex items-center justify-center group"
              >
                <div className="w-14 h-14 rounded-full bg-gold/90 text-navy-deep flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle size={32} />
                </div>
              </Link>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">₹{course.price}</span>
                <span className="text-sm text-muted line-through">₹{course.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  66% OFF
                </span>
              </div>
              <p className="text-xs text-muted mt-1">One-time purchase • Lifetime course access</p>
            </div>

            <div className="space-y-3">
              <Button
                variant="gold"
                size="lg"
                onClick={() => setCheckoutModal(true)}
                className="w-full font-bold text-navy-deep shadow-xl flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                Enroll Now with Razorpay
              </Button>

              <Link href={`/learn/${course.id}/${course.sections[0]?.lessons[0]?.id}`}>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full border-line/30 text-xs flex items-center justify-center gap-2 mt-2"
                >
                  <PlayCircle size={16} /> Watch Free Preview Lesson
                </Button>
              </Link>
            </div>

            <div className="border-t border-line/10 pt-4 space-y-2 text-xs text-muted">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-gold" /> 1080p Mux Adaptive Video Streaming
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-gold" /> Downloadable PDF Lecture Notes
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-gold" /> Branch-specific assessment quiz
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-gold" /> Verifiable Certificate of Completion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus & Course Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">About This Course</h2>
            <p className="text-sm text-cream/80 leading-relaxed">{course.description}</p>
          </div>

          {/* Curriculum Accordion */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
              <span className="text-xs text-muted">
                {course.sections.length} Sections • {course.lessonsCount} Lessons
              </span>
            </div>

            <div className="space-y-3">
              {course.sections.map((section) => {
                const isOpen = expandedSections[section.id]
                return (
                  <div
                    key={section.id}
                    className="border border-line/20 rounded-xl bg-navy overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-navy-soft/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gold uppercase">
                          {section.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span>{section.lessons.length} lessons</span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-line/10 border-t border-line/10 bg-navy-deep/40">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-3.5 px-5 flex items-center justify-between hover:bg-navy-soft/20 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle size={16} className="text-muted" />
                              <span className="text-cream font-medium">{lesson.title}</span>
                              {lesson.isFreePreview && (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                                  Free Preview
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-muted">{lesson.durationMinutes} mins</span>
                              {lesson.isFreePreview && (
                                <Link
                                  href={`/learn/${course.id}/${lesson.id}`}
                                  className="text-gold font-bold hover:underline"
                                >
                                  Watch
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Instructor Bio */}
          <div className="border border-line/20 rounded-2xl p-6 bg-navy space-y-4">
            <h3 className="text-xl font-bold text-white">Course Instructor</h3>
            <div className="flex items-center gap-4">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gold/40"
              />
              <div>
                <h4 className="text-base font-bold text-white">{course.instructor.name}</h4>
                <p className="text-xs text-gold font-medium">{course.instructor.title}</p>
                <p className="text-xs text-muted mt-1">
                  Over 12+ years of engineering curriculum design and cloud engineering leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Razorpay Checkout Simulation Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy border border-line/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-line/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-navy-deep font-bold text-sm">
                  S
                </div>
                <span className="font-bold text-white">Saryonaya • Razorpay Checkout</span>
              </div>
              <button
                onClick={() => {
                  setCheckoutModal(false)
                  setPaymentSuccess(false)
                }}
                className="text-muted hover:text-white"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-white">Enrollment Confirmed!</h3>
                <p className="text-xs text-muted">
                  Your payment of ₹{course.price} was successfully verified via Razorpay webhook.
                </p>
                <div className="pt-4">
                  <Link href={`/learn/${course.id}/${course.sections[0]?.lessons[0]?.id}`}>
                    <Button variant="gold" size="lg" className="w-full font-bold text-navy-deep">
                      Start Course Now
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-navy-soft/60 border border-line/15">
                  <span className="text-xs text-muted">Order Item</span>
                  <p className="font-bold text-white text-sm mt-0.5">{course.title}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-line/10">
                    <span className="text-xs text-muted">Amount Payable</span>
                    <span className="text-xl font-bold text-gold">₹{course.price}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-muted">Payment Method</label>
                  <div className="p-3 rounded-lg border border-gold/40 bg-gold/10 text-xs font-semibold text-gold flex items-center justify-between">
                    <span>UPI / Debit Card / Net Banking (Razorpay)</span>
                    <ShieldCheck size={16} />
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  disabled={paymentProcessing}
                  onClick={handleSimulatePayment}
                  className="w-full font-bold text-navy-deep"
                >
                  {paymentProcessing ? 'Processing Secure Payment...' : `Pay ₹${course.price}`}
                </Button>

                <p className="text-[11px] text-center text-muted">
                  🔒 256-bit encrypted secure transaction with instant entitlement.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
