'use client'

import React, { useState } from 'react'
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

  // 4 Popular Courses matching the mockup
  const popularCourses: CourseCardData[] = [
    {
      id: 'course-py-01',
      slug: 'python-for-beginners',
      title: 'Python for Beginners',
      instructor: {
        name: 'Dr. Priya Sharma',
      },
      rating: 4.8,
      reviews: '12.5K',
      duration: '40h',
      lessonsCount: 120,
      price: 1999,
      originalPrice: 3999,
      badge: 'Bestseller',
      imageType: 'python',
    },
    {
      id: 'course-ds-02',
      slug: 'applied-machine-learning',
      title: 'Data Science with Python',
      instructor: {
        name: 'Prof. Arun Kumar',
      },
      rating: 4.8,
      reviews: '8.9K',
      duration: '35h',
      lessonsCount: 90,
      price: 1799,
      originalPrice: 3499,
      badge: 'New',
      imageType: 'datascience',
    },
    {
      id: 'course-uiux-03',
      slug: 'full-stack-web-development',
      title: 'UI/UX Design Mastery',
      instructor: {
        name: 'Sneha Reddy',
      },
      rating: 4.8,
      reviews: '7.2K',
      duration: '28h',
      lessonsCount: 75,
      price: 1499,
      originalPrice: 2999,
      badge: 'Popular',
      imageType: 'design',
    },
    {
      id: 'course-biz-04',
      slug: 'deep-learning-ai',
      title: 'Business Analytics',
      instructor: {
        name: 'Vikram Reddy',
      },
      rating: 4.8,
      reviews: '6.1K',
      duration: '32h',
      lessonsCount: 80,
      price: 1699,
      originalPrice: 3499,
      badge: 'Top Rated',
      imageType: 'business',
    },
  ]

  // Featured Engineering Courses
  const featuredCourses: CourseCardData[] = [
    {
      id: 'course-embedded-05',
      slug: 'embedded-systems-iot',
      title: 'Embedded Systems & IoT with ARM',
      instructor: { name: 'Karthik Raman' },
      rating: 4.9,
      reviews: '4.8K',
      duration: '38h',
      lessonsCount: 85,
      price: 2199,
      originalPrice: 4299,
      badge: 'Bestseller',
      imageType: 'general',
    },
    {
      id: 'course-cad-06',
      slug: 'solidworks-cad-design',
      title: 'Mechanical CAD Modeling (SolidWorks)',
      instructor: { name: 'Rajesh Nair' },
      rating: 4.8,
      reviews: '3.9K',
      duration: '30h',
      lessonsCount: 70,
      price: 1899,
      originalPrice: 3799,
      badge: 'Top Rated',
      imageType: 'general',
    },
    {
      id: 'course-civil-07',
      slug: 'structural-analysis-autocad',
      title: 'Civil & Structural Design (AutoCAD)',
      instructor: { name: 'Ananya Deshmukh' },
      rating: 4.7,
      reviews: '3.2K',
      duration: '26h',
      lessonsCount: 65,
      price: 1599,
      originalPrice: 3199,
      badge: 'Popular',
      imageType: 'general',
    },
    {
      id: 'course-cloud-08',
      slug: 'cloud-devops-kubernetes',
      title: 'Cloud Architecture & DevOps CI/CD',
      instructor: { name: 'Sanjay Mehra' },
      rating: 4.9,
      reviews: '5.5K',
      duration: '42h',
      lessonsCount: 110,
      price: 2499,
      originalPrice: 4999,
      badge: 'New',
      imageType: 'general',
    },
  ]

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
        {/* HERO SECTION — Matching the 4K Mockup exactly */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#eef3f9] via-white to-[#f4f7fb] pt-6 sm:pt-10 pb-12 sm:pb-16">
          
          {/* Sweeping 3D Royal Navy & Molten Gold Ribbon Waves (Mockup Accent) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Top right golden ribbon */}
            <div className="absolute -top-24 right-0 w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] bg-gradient-to-bl from-amber-400/20 via-blue-900/10 to-transparent rounded-full blur-3xl" />
            
            {/* 3D Wave SVG background curves */}
            <svg
              className="absolute right-0 top-0 w-full lg:w-[65%] h-full object-cover opacity-90 hidden sm:block"
              viewBox="0 0 900 600"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="heroNavyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#07182e" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#0e3a6c" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1e5ba3" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="heroGoldRibbon" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#dfa32b" />
                  <stop offset="50%" stopColor="#fced9f" />
                  <stop offset="100%" stopColor="#b37a18" />
                </linearGradient>
              </defs>
              {/* Backing wave curve */}
              <path
                d="M300 0 C450 150 550 200 900 120 L900 600 L200 600 C350 400 200 250 300 0 Z"
                fill="url(#heroNavyGrad)"
              />
              {/* Gold Ribbon Trim */}
              <path
                d="M200 600 C380 380 480 280 900 200"
                stroke="url(#heroGoldRibbon)"
                strokeWidth="5"
                strokeLinecap="round"
                className="drop-shadow-md"
              />
              <path
                d="M160 600 C350 400 450 300 900 220"
                stroke="#092347"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </div>

          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Headlines, CTAs & Social Proof */}
              <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-8">
                
                {/* Hero Title */}
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-[#07182e] tracking-tight leading-[1.08]"
                  >
                    Learn Anytime,{' '}
                    <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] bg-clip-text text-transparent drop-shadow-xs">
                      Anywhere
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-xl leading-relaxed pt-2"
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
                      rightIcon={<ArrowRight className="w-4 h-4 text-[#e5a93b] shrink-0" />}
                    >
                      Explore Courses
                    </PrimaryButton>
                  </Link>

                  <Link href="/courses/python-for-beginners">
                    <SecondaryButton
                      size="lg"
                      icon={<Play className="w-4 h-4 text-[#07182e] fill-[#07182e] shrink-0 mr-1" />}
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
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-tr from-[#07182e] to-[#0e3a6c] text-[#fced9f] text-xs font-black flex items-center justify-center shadow-sm">
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
                      <span className="font-extrabold text-sm text-[#07182e]">4.8/5</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Trusted by 10,000+ Learners
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* RIGHT COLUMN: The exact 3D Student & Floating Education Elements from Mockup */}
              <div className="lg:col-span-5 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl"
                >
                  <img
                    src="/images/mockup/hero-student-3d.png"
                    alt="SARYONAYA Student & 3D Interactive Elements"
                    className="w-full h-auto object-contain drop-shadow-[0_18px_40px_rgba(9,35,71,0.18)] rounded-2xl sm:rounded-3xl"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SEARCH & FILTER BAR (Matching Mockup) */}
        {/* ========================================================================= */}
        <section className="relative -mt-6 z-20">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              
              {/* Large Rounded White Search Bar */}
              <div className="flex-1 flex items-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-white rounded-full border border-slate-200/90 shadow-[0_6px_24px_rgba(9,35,71,0.07)] focus-within:border-[#dfa32b] focus-within:shadow-[0_8px_30px_rgba(9,35,71,0.12)] transition-all">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm sm:text-base text-[#07182e] placeholder-slate-400 outline-none w-full font-medium"
                />
              </div>

              {/* 3D Filter Button */}
              <button
                onClick={() => setFilterActive(!filterActive)}
                className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#123963] text-white font-extrabold text-sm sm:text-base border-t border-white/20 border-b-[2px] border-b-[#030b14] shadow-[0_4px_14px_rgba(7,24,46,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#e5a93b]" />
                <span>Filter</span>
              </button>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4 CORE CATEGORY CARDS (Programming, Data Science, Design, Business) */}
        {/* ========================================================================= */}
        <section className="pt-8 sm:pt-14 pb-8 sm:pb-10">
          <div className="max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* POPULAR COURSES SECTION (Matching Mockup) */}
        {/* ========================================================================= */}
        <section className="py-8 sm:py-12">
          <div className="max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12">
            
            {/* Header row: Yellow bar | Popular Courses  and  View All Courses -> */}
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-8">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-1.5 sm:w-2 h-6 sm:h-8 rounded-full bg-gradient-to-b from-[#dfa32b] to-[#f5cb68]" />
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-[#07182e] tracking-tight">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {popularCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM TRUST STATS BAR (Matching Mockup exactly) */}
        {/* ========================================================================= */}
        <section className="relative py-6 sm:py-8 bg-white border-y border-slate-200/80 shadow-[0_2px_15px_rgba(9,35,71,0.03)] my-8 overflow-hidden">
          {/* Bottom right gold and royal blue wave ribbon accent matching mockup */}
          <div className="absolute -right-2 -bottom-2 pointer-events-none opacity-90 hidden md:block">
            <svg width="260" height="85" viewBox="0 0 260 85" fill="none">
              <path d="M0 85 C90 50 170 25 260 0 L260 85 Z" fill="#07182e" />
              <path d="M15 85 C95 45 175 20 260 0" stroke="#dfa32b" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
              
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl sm:text-2xl">🏆</span>
                <span className="font-extrabold text-xs sm:text-sm text-[#07182e]">
                  Trusted by 10,000+ Students
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-xl sm:text-2xl">📹</span>
                <span className="font-extrabold text-xs sm:text-sm text-[#07182e]">
                  500+ Premium Courses
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="text-xl sm:text-2xl">🎓</span>
                <span className="font-extrabold text-xs sm:text-sm text-[#07182e]">
                  Get Certified
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
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
        <section className="py-12 sm:py-16">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            
            <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <span className="w-1.5 sm:w-2 h-7 sm:h-8 rounded-full bg-gradient-to-b from-[#092347] to-[#1e40af]" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#07182e] tracking-tight">
                  Featured Engineering Programs
                </h2>
              </div>

              <Link
                href="/courses"
                className="text-xs sm:text-sm font-extrabold text-[#092347] hover:text-[#b87e1a] flex items-center gap-1 transition-colors group"
              >
                <span>Browse All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Featured Engineering Programs - 2 columns on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {featuredCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY CHOOSE SARYONAYA — 3D Cards */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            
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

          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
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
        <section className="py-14 sm:py-20">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            
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
