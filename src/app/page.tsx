'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  PlayCircle,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
import { COURSES_DATA, ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function HomePage() {
  const [activeBranch, setActiveBranch] = useState<string>('ALL')

  const filteredCourses =
    activeBranch === 'ALL'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.eligibleBranches.includes(activeBranch))

  return (
    <div className="min-h-screen bg-navy-deep text-cream flex flex-col">
      <StudentTopNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 border-b border-line/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-gold/10 via-navy-soft/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy border border-gold/40 text-gold text-xs font-semibold shadow-md">
            <Sparkles size={14} className="text-gold" />
            <span>Next-Gen Engineering Education & LMS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Learn Beautifully. <br />
            <span className="gradient-text">Engineered for Your Academic Branch.</span>
          </h1>

          <p className="text-base sm:text-lg text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Saryonaya delivers branch-specific engineering courses, Mux adaptive HD video streaming, downloadable notes, and verifiable certificates tailored for CSE, IT, ECE, EEE, AI&ML, MECH & CIVIL students.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/courses">
              <Button variant="gold" size="lg" className="w-full sm:w-auto font-bold text-navy-deep px-8 shadow-xl flex items-center gap-2">
                Explore Branch Courses <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-cream hover:bg-white/10 px-8">
                Create Student Account
              </Button>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-line/10">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-gold">7+</p>
              <p className="text-xs text-muted mt-0.5">Engineering Branches</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-gold">100%</p>
              <p className="text-xs text-muted mt-0.5">Adaptive HD Streaming</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-gold">₹499/m</p>
              <p className="text-xs text-muted mt-0.5">Affordable Subscriptions</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-gold">Verified</p>
              <p className="text-xs text-muted mt-0.5">Academic Certificates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Branch-Based Course Explorer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              Curated Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Explore Courses by Branch
            </h2>
            <p className="text-muted text-sm mt-1">
              Filter courses designed and approved for your engineering discipline.
            </p>
          </div>

          <Link href="/courses" className="text-xs sm:text-sm text-gold hover:underline font-semibold flex items-center gap-1">
            View All Catalog ({COURSES_DATA.length}) <ChevronRight size={16} />
          </Link>
        </div>

        {/* Branch Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveBranch('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeBranch === 'ALL'
                ? 'bg-gold text-navy-deep shadow-md'
                : 'bg-navy border border-line/15 text-muted hover:text-cream'
            }`}
          >
            🌟 All Branches
          </button>
          {ACADEMIC_BRANCHES.map((b) => (
            <button
              key={b.code}
              onClick={() => setActiveBranch(b.code)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeBranch === b.code
                  ? 'bg-gold text-navy-deep shadow-md'
                  : 'bg-navy border border-line/15 text-muted hover:text-cream'
              }`}
            >
              <span>{b.icon}</span>
              <span>{b.code}</span>
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-navy border border-line/20 rounded-2xl overflow-hidden hover:border-gold/50 transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-navy-soft">
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

                <div className="p-6">
                  {/* Eligible branch tags */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {course.eligibleBranches.map((code) => (
                      <span
                        key={code}
                        className="px-2 py-0.5 text-[10px] rounded bg-navy-soft font-semibold text-gold border border-line/10"
                      >
                        {code}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-gold transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2 mt-1.5 leading-relaxed">
                    {course.tagline}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted mt-4 pt-3 border-t border-line/10">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-gold" /> {course.durationHours} hrs
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} className="text-gold" /> {course.lessonsCount} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={14} className="text-gold" /> Certificate
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-line/10 bg-navy/40">
                <div>
                  <span className="text-xs text-muted line-through mr-1.5">
                    ₹{course.originalPrice}
                  </span>
                  <span className="text-xl font-black text-gold">₹{course.price}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="outline" size="sm" className="border-line/30 text-xs">
                      Syllabus
                    </Button>
                  </Link>
                  <Link href={`/learn/${course.id}/${course.sections[0].lessons[0].id}`}>
                    <Button variant="gold" size="sm" className="text-xs font-bold text-navy-deep">
                      Preview
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose SARYONAYA Feature Highlights */}
      <section className="bg-navy-soft/40 py-20 border-y border-line/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Built Specifically for Engineering Undergrads
            </h2>
            <p className="text-muted text-sm sm:text-base">
              Say goodbye to generic tutorials. Learn what actually matches your university syllabus and placement drives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-navy border border-line/15 rounded-2xl p-6 space-y-4 hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Branch-Based Filtering</h3>
              <p className="text-xs text-muted leading-relaxed">
                Courses are intelligently mapped to CSE, ECE, EEE, IT, AI&ML, MECH and CIVIL so students never waste time on irrelevant material.
              </p>
            </div>

            <div className="bg-navy border border-line/15 rounded-2xl p-6 space-y-4 hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <PlayCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Adaptive Mux Streaming</h3>
              <p className="text-xs text-muted leading-relaxed">
                Silky-smooth playback at 0.5x to 2.0x speeds with offline resume, signed video protection, and chapter navigation.
              </p>
            </div>

            <div className="bg-navy border border-line/15 rounded-2xl p-6 space-y-4 hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Verified Academic Certificates</h3>
              <p className="text-xs text-muted leading-relaxed">
                Pass interactive technical quizzes (75%+ score) to generate cryptographic certificates verifiable on LinkedIn and resumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-gradient-to-r from-navy to-navy-soft py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-black text-white">
            Ready to Accelerate Your Engineering Career?
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Enroll today or start with our monthly branch subscriptions starting at ₹499/month.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/courses">
              <Button variant="gold" size="lg" className="font-bold text-navy-deep px-8">
                Browse Courses
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="border-line/30 px-8">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
