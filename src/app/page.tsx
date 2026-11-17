'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  Play,
  ArrowRight,
  Star,
  CheckCircle2,
  Award,
  BookOpen,
  GraduationCap,
  Users,
  Video,
  Clock,
  Sparkles,
  Crown,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { CategoryCard, CategoryData } from '@/components/ui/CategoryCard'
import { CourseCard, CourseCardData } from '@/components/ui/CourseCard'
import {
  PrimaryButton,
  SecondaryButton,
  PremiumButton,
  EnrollButton,
  SubscribeButton,
} from '@/components/ui/Buttons'
import { PromotionalBanners } from '@/components/home/PromotionalBanners'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterActive, setFilterActive] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  // 4 Core Category Cards matching the mockup
  const categories: CategoryData[] = [
    {
      id: 'cat-prog',
      name: 'Programming',
      subtitle: 'Code • Build • Innovate',
      slug: 'programming',
      iconType: 'programming',
    },
    {
      id: 'cat-ds',
      name: 'Data Science',
      subtitle: 'Analyze • Predict • Grow',
      slug: 'datascience',
      iconType: 'datascience',
    },
    {
      id: 'cat-design',
      name: 'Design',
      subtitle: 'Create • Inspire • Design',
      slug: 'design',
      iconType: 'design',
    },
    {
      id: 'cat-biz',
      name: 'Business',
      subtitle: 'Plan • Grow • Succeed',
      slug: 'business',
      iconType: 'business',
    },
  ]

  const [coursesList, setCoursesList] = useState<CourseCardData[]>([])

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch('/api/courses')
        if (res.ok) {
          const json = await res.json()
          const data = json.data || []
          if (Array.isArray(data)) {
            const mapped: CourseCardData[] = data.map((c: any) => ({
              id: c.id,
              slug: c.slug,
              title: c.title,
              instructor: {
                name: c.instructor?.name || c.primary_instructor?.full_name || 'Sarvonaya Faculty',
              },
              rating: Number(c.average_rating) || 0,
              reviews: c.reviews_count ? `${c.reviews_count}` : '0',
              duration: c.duration_hours ? `${c.duration_hours}h` : '10h',
              lessonsCount: c.lessons_count || 0,
              price: Number(c.price) || 0,
              originalPrice: c.discount_price ? Number(c.discount_price) : undefined,
              badge: c.difficulty_level || 'All Levels',
              imageType: 'python',
              thumbnail: c.thumbnail_url || c.thumbnail,
            }))
            setCoursesList(mapped)
          }
        }
      } catch (err) {
        console.warn('Could not load courses from server:', err)
      }
    }
    loadCourses()
  }, [])

  const popularCourses = coursesList.slice(0, 4)
  const featuredCourses = coursesList.slice(4, 8).length > 0 ? coursesList.slice(4, 8) : coursesList.slice(0, 4)

  // FAQs
  const faqs = [
    {
      q: 'Are SARYONAYA course certificates recognized by top engineering companies?',
      a: 'Yes! Every certificate issued by SARYONAYA carries a unique verifiable credential ID and QR code, recognized by premier IT, electronics, core engineering firms, and top MNC hiring partners across India.',
    },
    {
      q: 'Can I access the video lectures and downloadable notes on mobile?',
      a: 'Absolutely. The entire SARYONAYA platform is 100% responsive and optimized for smartphones, tablets, and 4K desktops. You can pause on mobile and resume seamlessly on your laptop.',
    },
    {
      q: 'What is included in the SARYONAYA Premium Membership?',
      a: 'Premium members get unlimited access to all 500+ engineering courses, GATE preparation modules, live mentor doubt-clearing sessions, unlimited quiz practice tests, and verified graduation certificates at zero extra cost.',
    },
    {
      q: 'Do you offer individual course purchases or only subscriptions?',
      a: 'We offer both! You can either enroll in an individual course with lifetime access or join the all-access yearly membership for maximum savings.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#07182e] flex flex-col font-sans antialiased selection:bg-[#dfa32b]/30">
      
      {/* 1. Global Navbar */}
      <Navbar />

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* MOBILE HERO BANNER (< lg) — Exactly matching saryonaya-mobile-design.jpg  */}
        {/* ========================================================================= */}
        <section className="lg:hidden px-3 pt-3 pb-1 bg-gradient-to-b from-[#eef3f9] to-[#f4f7fb]">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(9,38,83,0.14)] border border-slate-200/90 active:scale-[0.99] transition-transform">
            <Link href="/courses" className="block relative group" aria-label="Explore Courses">
              <img
                src="/images/mockup/hero-mobile-banner-2x.png"
                alt="Learn Anytime, Anywhere - Explore Courses"
                className="w-full h-auto object-cover"
                width={944}
                height={484}
              />
              <span className="sr-only">Learn Anytime, Anywhere - Upgrade your skills with expert-led online courses. Explore Courses</span>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DESKTOP HERO SECTION (>= lg) — 4K Premium UI                              */}
        {/* ========================================================================= */}
        <section className="hidden lg:block relative overflow-hidden bg-gradient-to-b from-[#eef3f9] via-white to-[#f4f7fb] pt-6 sm:pt-10 pb-8 sm:pb-14">
          
          {/* Sweeping 3D Royal Navy & Molten Gold Ribbon Waves */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-24 right-0 w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] bg-gradient-to-bl from-[#E9AC32]/20 via-[#092653]/10 to-transparent rounded-full blur-3xl" />
            
            <svg
              className="absolute right-0 top-0 w-full lg:w-[65%] h-full object-cover opacity-90 hidden sm:block"
              viewBox="0 0 900 600"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="heroNavyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#061B3A" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#092653" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1456A0" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="heroGoldRibbon" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E9AC32" />
                  <stop offset="50%" stopColor="#F8D77A" />
                  <stop offset="100%" stopColor="#d4941e" />
                </linearGradient>
              </defs>
              <path
                d="M300 0 C450 150 550 200 900 120 L900 600 L200 600 C350 400 200 250 300 0 Z"
                fill="url(#heroNavyGrad)"
              />
              <path
                d="M200 600 C380 380 480 280 900 200"
                stroke="url(#heroGoldRibbon)"
                strokeWidth="5"
                strokeLinecap="round"
                className="drop-shadow-md"
              />
              <path
                d="M160 600 C350 400 450 300 900 220"
                stroke="#092653"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* HEADLINES, CTAS & SOCIAL PROOF */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                
                {/* Hero Title */}
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B50] tracking-tight leading-[1.12]"
                  >
                    Learn Anytime,{' '}
                    <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#d4941e] via-[#E9AC32] to-[#F8D77A] bg-clip-text text-transparent drop-shadow-xs">
                      Anywhere
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-xl leading-relaxed pt-1"
                  >
                    Upgrade your skills with expert-led online courses and take your career to the next level.
                  </motion.p>
                </div>

                {/* 3D Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
                >
                  <Link href="/courses">
                    <PrimaryButton
                      size="lg"
                      icon={<Play className="w-4 h-4 text-white fill-white shrink-0 mr-1" />}
                      rightIcon={<ArrowRight className="w-4 h-4 text-[#F8D77A] shrink-0" />}
                    >
                      Explore Courses
                    </PrimaryButton>
                  </Link>

                  <Link href="/courses/python-for-beginners">
                    <SecondaryButton
                      size="lg"
                      icon={<Play className="w-4 h-4 text-[#092653] fill-[#092653] shrink-0 mr-1" />}
                    >
                      Watch Demo
                    </SecondaryButton>
                  </Link>
                </motion.div>

                {/* Trust Indicators (Learner Avatars + Rating) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6"
                >
                  {/* Overlapping Avatars */}
                  <div className="flex items-center -space-x-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-tr from-[#061B3A] to-[#092653] text-[#F8D77A] text-xs font-black flex items-center justify-center shadow-sm">
                      +10K
                    </div>
                  </div>

                  {/* Rating Stars & Text */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="font-extrabold text-sm text-[#102B50]">4.8/5</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Trusted by 10,000+ Learners
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* DESKTOP RIGHT COLUMN: 3D Student & Floating Education Elements */}
              <div className="hidden lg:flex lg:col-span-5 relative items-center justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full max-w-lg"
                >
                  <img
                    src="/images/mockup/hero-student-3d.png"
                    alt="SARYONAYA Student & 3D Interactive Elements"
                    className="w-full h-auto object-contain drop-shadow-[0_18px_40px_rgba(9,38,83,0.18)]"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PROMOTIONAL COURSE BANNERS (Carousel / Banners - Large Desktop view)   */}
        {/* ========================================================================= */}
        <div className="hidden lg:block">
          <PromotionalBanners />
        </div>

        {/* ========================================================================= */}
        {/* 4. SEARCH & FILTER BAR                                                    */}
        {/* ========================================================================= */}
        <section className="relative px-3 sm:px-6 lg:px-8 pt-2 sm:pt-0 sm:-mt-4 z-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 max-w-3xl mx-auto">
              
              {/* Large Rounded White Search Bar */}
              <div className="flex-1 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-white rounded-full border border-slate-200/90 shadow-[0_3px_14px_rgba(9,38,83,0.06)] focus-within:border-[#E9AC32] focus-within:shadow-[0_6px_25px_rgba(9,38,83,0.1)] transition-all">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs sm:text-base text-[#102B50] placeholder-slate-400 outline-none w-full font-medium"
                />
              </div>

              {/* 3D Filter Button */}
              <button
                onClick={() => setFilterActive(!filterActive)}
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#061B3A] via-[#092653] to-[#1456A0] text-white font-extrabold text-xs sm:text-sm border-t border-white/20 border-b-[2px] border-b-[#040f21] shadow-[0_3px_12px_rgba(9,38,83,0.28)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F8D77A]" />
                <span>Filter</span>
              </button>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. 4 CORE CATEGORY CARDS (Programming, Data Science, Design, Business)    */}
        {/* ========================================================================= */}
        <section className="px-3 sm:px-6 lg:px-8 pt-3 sm:pt-10 pb-2 sm:pb-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* POPULAR COURSES SECTION (Matching Mockup)                                  */}
        {/* ========================================================================= */}
        <section className="px-3 sm:px-6 lg:px-8 py-4 sm:py-10">
          <div className="max-w-[1280px] mx-auto">
            
            {/* Header row: Yellow bar | Popular Courses  and  View All Courses -> */}
            <div className="flex items-center justify-between gap-4 mb-3 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-1.5 sm:w-2 h-5 sm:h-8 rounded-full bg-gradient-to-b from-[#dfa32b] to-[#f5cb68]" />
                <h2 className="text-base sm:text-2xl md:text-3xl font-black text-[#07182e] tracking-tight">
                  Popular Courses
                </h2>
              </div>

              <Link
                href="/courses"
                className="text-xs sm:text-sm font-extrabold text-[#092347] hover:text-[#b87e1a] flex items-center gap-1 transition-colors group"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 4 Popular Course Cards - 2 Columns on Mobile, 3 on Tablet, 4 on Desktop */}
            {popularCourses.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                {popularCourses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50/60 rounded-2xl border border-slate-100">
                <p className="text-sm font-semibold text-slate-500">Curriculum courses are loading. Explore branches for specific modules.</p>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* MOBILE UNLIMITED ACCESS BANNER (< lg)                                     */}
        {/* ========================================================================= */}
        <section className="lg:hidden px-3 pt-1 pb-4">
          <Link
            href="/subscriptions"
            className="block relative rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(9,38,83,0.12)] active:scale-[0.99] transition-transform"
          >
            <img
              src="/images/mockup/banner-mobile-premium-2x.png"
              alt="Get Unlimited Access - Subscribe and unlock all courses"
              className="w-full h-auto object-cover"
              width={864}
              height={170}
            />
          </Link>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM TRUST STATS BAR (Matching Mockup exactly) */}
        {/* ========================================================================= */}
        <section className="relative py-6 sm:py-8 bg-white border-y border-slate-200/80 shadow-[0_2px_15px_rgba(9,35,71,0.03)] my-6 sm:my-8 overflow-hidden">
          {/* Bottom right gold and royal blue wave ribbon accent matching mockup */}
          <div className="absolute -right-2 -bottom-2 pointer-events-none opacity-90 hidden md:block">
            <svg width="260" height="85" viewBox="0 0 260 85" fill="none">
              <path d="M0 85 C90 50 170 25 260 0 L260 85 Z" fill="#07182e" />
              <path d="M15 85 C95 45 175 20 260 0" stroke="#dfa32b" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-center text-center">
              
              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                <span className="text-xl sm:text-2xl">🏆</span>
                <span className="font-extrabold text-xs sm:text-sm text-[#07182e]">
                  Trusted by 10,000+ Students
                </span>
              </div>

              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                <span className="text-xl sm:text-2xl">📹</span>
                <span className="font-extrabold text-xs sm:text-sm text-[#07182e]">
                  500+ Premium Courses
                </span>
              </div>

              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                <span className="text-xl sm:text-2xl">🎓</span>
                <span className="font-extrabold text-xs sm:text-sm text-[#07182e]">
                  Get Certified
                </span>
              </div>

              <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                <span className="text-xl sm:text-2xl">🎧</span>
                <span className="font-extrabold text-xs sm:text-sm text-[#07182e]">
                  24/7 Support
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED / TRENDING ENGINEERING COURSES */}
        {/* ========================================================================= */}
        <section className="py-8 sm:py-14">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-8">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full bg-gradient-to-b from-[#092347] to-[#1e40af]" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#07182e] tracking-tight">
                  Featured Engineering Programs
                </h2>
              </div>

              <Link
                href="/courses"
                className="text-xs sm:text-sm font-extrabold text-[#092347] hover:text-[#b87e1a] flex items-center gap-1 transition-colors group"
              >
                <span>Browse All</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Featured Engineering Programs - 2 columns on mobile */}
            {featuredCourses.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {featuredCourses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50/60 rounded-2xl border border-slate-100">
                <p className="text-sm font-semibold text-slate-500">Explore our academic branches for curated degree specializations.</p>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY CHOOSE SARYONAYA — 3D Cards */}
        {/* ========================================================================= */}
        <section className="py-10 sm:py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
              <span className="text-xs font-black text-[#b87e1a] uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/40">
                The SARYONAYA Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#07182e] tracking-tight">
                Why Top Engineering Students Choose Us
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Bridging academic university curriculum with practical production engineering skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-sm hover:shadow-xl transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#dfa32b] to-[#f5cb68] text-[#07182e] flex items-center justify-center font-black shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#07182e]">
                  100% Verifiable Credentials
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every completed course issues an ISO-compliant, cryptographic certificate with public shareable link for LinkedIn and resume verification.
                </p>
              </div>

              <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-sm hover:shadow-xl transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#07182e] to-[#123963] text-white flex items-center justify-center font-black shadow-md">
                  <Video className="w-7 h-7 text-[#e5a93b]" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#07182e]">
                  Ultra-Fast 4K Streaming
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Watch buffer-free video lectures on any device with variable speed controls, chapter indexing, interactive quizzes, and downloadable PDF notes.
                </p>
              </div>

              <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-sm hover:shadow-xl transition-all space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black shadow-md">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#07182e]">
                  Industry Mentors & Q&A
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Learn directly from verified university professors and senior engineers currently working at Google, Microsoft, Qualcomm, and TCS.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SUBSCRIPTION PROMOTION (3D Luxury Gold Banner) */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 relative overflow-hidden bg-gradient-to-r from-[#051325] via-[#092347] to-[#051325] text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#dfa32b]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#dfa32b]/60 text-xs font-black text-[#fced9f]">
                <Crown className="w-4 h-4 text-[#e5a93b] fill-[#e5a93b]" />
                <span>ALL-ACCESS MEMBERSHIP</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Unlock Unlimited Learning with{' '}
                <span className="bg-gradient-to-r from-[#fced9f] via-[#e5a93b] to-[#dfa32b] bg-clip-text text-transparent">
                  SARYONAYA Premium
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Gain full access to all 500+ courses across CSE, AI/ML, ECE, EEE, MECH, and Civil. Includes live doubt-clearing sessions, project reviews, and certificates.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link href="/subscriptions">
                  <button className="px-8 py-4 rounded-full font-black text-sm sm:text-base bg-gradient-to-r from-[#dfa32b] via-[#f7d685] to-[#d99222] text-[#07182e] border-t border-white/60 border-b-[3px] border-b-[#a66d0e] shadow-[0_6px_24px_rgba(223,163,43,0.45)] hover:shadow-[0_10px_32px_rgba(223,163,43,0.6)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
                    <Crown className="w-4 h-4" />
                    <span>Join Premium for ₹499/mo</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </Link>

                <Link href="/courses">
                  <button className="px-6 py-4 rounded-full font-bold text-sm sm:text-base bg-white/10 hover:bg-white/15 text-white border border-white/20 active:scale-95 transition-all">
                    Browse All Courses
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDENT TESTIMONIALS */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
              <span className="text-xs font-black text-[#b87e1a] uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/40">
                Student Success Stories
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#07182e] tracking-tight">
                Trusted by Students from Top Colleges
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-sm space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;SARYONAYA&apos;s Python and Data Science roadmap helped me secure a high-package campus placement at Infosys. The video lessons and downloadable lecture notes are world class!&rdquo;
                </p>
                <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden font-bold text-xs flex items-center justify-center">
                    AP
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#07182e]">Aarav Patel</h4>
                    <p className="text-[11px] text-slate-500">CSE Student • Anna University</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-sm space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;The Embedded Systems and IoT curriculum is unmatched. Finding practical ARM Cortex hardware tutorials online was impossible until I found SARYONAYA.&rdquo;
                </p>
                <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden font-bold text-xs flex items-center justify-center">
                    SN
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#07182e]">Sneha Narayanan</h4>
                    <p className="text-[11px] text-slate-500">ECE Graduate • NIT Trichy</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 border-b-[3px] border-b-slate-300 shadow-sm space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;The certificates are verified directly by recruiters. The progress tracking dashboard kept me consistent every single day of my semester exam prep.&rdquo;
                </p>
                <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden font-bold text-xs flex items-center justify-center">
                    RV
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#07182e]">Rahul Verma</h4>
                    <p className="text-[11px] text-slate-500">AI/ML Major • IIT Madras</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-black text-[#b87e1a] uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/40">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#07182e] tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = faqOpen === index
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setFaqOpen(isOpen ? null : index)}
                      className="w-full text-left p-5 sm:p-6 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#07182e]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#dfa32b]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 sm:p-6 pt-0 bg-slate-50/60 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

    </div>
  )
}
