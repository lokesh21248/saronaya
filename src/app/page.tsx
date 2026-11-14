'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  SlidersHorizontal,
  Bell,
  Code2,
  BarChart3,
  Palette,
  Briefcase,
  Clock,
  Play,
  ArrowRight,
  Crown,
  ChevronRight,
  Star,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('Programming')
  const [carouselIndex, setCarouselIndex] = useState(0)

  const categories = [
    { name: 'Programming', icon: Code2, label: '</>' },
    { name: 'Data Science', icon: BarChart3, label: 'chart' },
    { name: 'Design', icon: Palette, label: 'palette' },
    { name: 'Business', icon: Briefcase, label: 'briefcase' },
  ]

  const popularCourses = [
    {
      id: 'course-py-01',
      slug: 'python-for-beginners',
      title: 'Python for Beginners',
      subtitle: 'Start your coding journey',
      rating: '4.5',
      reviews: '12k',
      duration: '8h 30m',
      level: 'Beginner',
      price: '₹999',
      imageType: 'python',
      thumbnailBg: 'from-[#0b1e33] to-[#122e4d]',
    },
    {
      id: 'course-ai-03',
      slug: 'applied-machine-learning',
      title: 'Data Science with Python',
      subtitle: 'Analyze • Visualize • Predict',
      rating: '4.6',
      reviews: '8k',
      duration: '12h 15m',
      level: 'Intermediate',
      price: '₹1,499',
      imageType: 'datascience',
      thumbnailBg: 'from-[#0a233f] to-[#0e355f]',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased selection:bg-[#e5a93b]/30">
      {/* Mobile/Desktop Container wrapper */}
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 pt-3 space-y-5">
        {/* Top App Header */}
        <header className="flex items-center justify-between py-2">
          {/* Brand Logo with Golden Seal */}
          <SaryonayaLogo size="md" />

          {/* Right Header: Notification & Avatar */}
          <div className="flex items-center gap-3">
            <Link
              href="/student/progress"
              className="relative p-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-[#102b46] hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={2.2} />
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

        {/* Hero Banner Section */}
        <section className="relative rounded-[28px] bg-gradient-to-r from-white via-white to-[#f0f6ff] border border-slate-100/80 shadow-[0_8px_30px_rgba(16,43,70,0.06)] overflow-hidden p-6 sm:p-8">
          {/* Decorative Navy & Gold Waves on the right background */}
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden">
            {/* Navy Wave Ribbon */}
            <div className="absolute -top-12 -right-8 w-64 h-64 bg-gradient-to-bl from-[#102b46] to-[#0a1e32] rounded-full blur-[2px] opacity-95" />
            {/* Gold Accent Ribbon Curve */}
            <div className="absolute top-1/2 -right-6 w-52 h-44 border-[6px] border-[#e5a93b] rounded-full opacity-80" />
            {/* Play Watermark */}
            <div className="absolute top-8 right-12 text-white/20">
              <Play size={44} fill="currentColor" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative z-10">
            {/* Left Content */}
            <div className="sm:col-span-7 space-y-3.5 pr-2">
              <h1 className="text-[28px] sm:text-3xl lg:text-4xl font-black text-[#102b46] leading-[1.15] tracking-tight">
                Learn Anytime, <br />
                <span className="bg-gradient-to-r from-[#d89b2b] via-[#f5cb68] to-[#c58a23] bg-clip-text text-transparent font-serif italic">
                  Anywhere
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-[#5a7184] font-medium leading-relaxed max-w-xs">
                Upgrade your skills with expert-led online courses
              </p>

              <div className="pt-2">
                <Link href="/courses">
                  <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e5a93b] via-[#f5cb68] to-[#dba032] text-[#0a1e32] font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(229,169,59,0.35)] hover:shadow-[0_6px_22px_rgba(229,169,59,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                    <span>Explore Courses</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Hero Image: Smiling student with headphones on laptop */}
            <div className="sm:col-span-5 flex justify-center sm:justify-end mt-2 sm:mt-0 relative">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                  alt="Student with laptop and headphones"
                  className="w-full h-full object-cover"
                />
                {/* Subtle soft gradient fade at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-4">
            <span
              onClick={() => setCarouselIndex(0)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                carouselIndex === 0 ? 'w-6 bg-[#102b46]' : 'w-1.5 bg-slate-300'
              }`}
            />
            <span
              onClick={() => setCarouselIndex(1)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                carouselIndex === 1 ? 'w-6 bg-[#102b46]' : 'w-1.5 bg-slate-300'
              }`}
            />
            <span
              onClick={() => setCarouselIndex(2)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                carouselIndex === 2 ? 'w-6 bg-[#102b46]' : 'w-1.5 bg-slate-300'
              }`}
            />
          </div>
        </section>

        {/* Floating Search Bar */}
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-[0_4px_20px_rgba(16,43,70,0.06)] border border-slate-100 focus-within:border-[#e5a93b] focus-within:ring-2 focus-within:ring-[#e5a93b]/20 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <Search size={19} className="text-[#5a7184]" strokeWidth={2.2} />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0d2238] placeholder-[#8294a5] font-medium outline-none"
              />
            </div>

            <button
              className="p-1 text-[#102b46] hover:text-[#e5a93b] transition-colors"
              aria-label="Filter"
            >
              <SlidersHorizontal size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Category Icons Row (4 Cards) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-white shadow-[0_6px_20px_rgba(16,43,70,0.10)] border border-[#e5a93b]/50 scale-[1.02]'
                    : 'bg-white shadow-[0_3px_14px_rgba(16,43,70,0.04)] border border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Specific custom glyph icons matching design */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#102b46] mb-1.5">
                  {cat.name === 'Programming' && (
                    <span className="font-mono font-bold text-lg text-[#102b46] tracking-tight">
                      {'</>'}
                    </span>
                  )}
                  {cat.name === 'Data Science' && (
                    <div className="flex items-end gap-1 h-5">
                      <span className="w-1 h-2.5 bg-[#102b46] rounded-xs" />
                      <span className="w-1 h-4 bg-[#102b46] rounded-xs" />
                      <span className="w-1 h-5 bg-[#102b46] rounded-xs" />
                    </div>
                  )}
                  {cat.name === 'Design' && <Palette size={22} strokeWidth={2.2} />}
                  {cat.name === 'Business' && <Briefcase size={22} strokeWidth={2.2} />}
                </div>

                <span
                  className={`text-[11px] sm:text-xs font-semibold tracking-tight text-center ${
                    isSelected ? 'text-[#102b46] font-bold' : 'text-[#334e68]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Popular Courses Section */}
        <div className="space-y-3.5 pt-1">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-[#102b46] tracking-tight">
              Popular Courses
            </h2>
            <Link
              href="/courses"
              className="text-xs sm:text-sm font-bold text-[#d89b2b] hover:text-[#b88226] transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>

          {/* 2 Popular Course Cards (Side-by-Side as in Screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(16,43,70,0.06)] hover:shadow-[0_8px_30px_rgba(16,43,70,0.12)] transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Card Header Media */}
                <div
                  className={`relative h-36 bg-gradient-to-tr ${course.thumbnailBg} p-3.5 flex items-center justify-center overflow-hidden`}
                >
                  {/* Rating Badge (Top Left Pill) */}
                  <div className="absolute top-3 left-3 bg-[#e5a93b] text-[#0a1e32] px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Play size={10} fill="#0a1e32" />
                    <span>
                      {course.rating} ({course.reviews})
                    </span>
                  </div>

                  {/* Graphic Art */}
                  {course.imageType === 'python' ? (
                    <div className="flex items-center justify-center gap-4">
                      {/* Laptop mockup representation */}
                      <div className="w-24 h-16 bg-[#061423] border border-blue-400/40 rounded-md p-1 shadow-md flex flex-col justify-between">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="space-y-1 font-mono text-[6px] text-blue-300">
                          <p className="text-emerald-400">def learn():</p>
                          <p className="pl-1.5">return &apos;Saryonaya&apos;</p>
                        </div>
                      </div>
                      {/* 3D Python Logo Emblem */}
                      <div className="w-14 h-14 relative flex items-center justify-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-xl rounded-tr-none rotate-12 flex items-center justify-center shadow-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#facc15] to-[#ca8a04] rounded-xl rounded-bl-none -rotate-12 opacity-90" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* 3D Data Chart Graphic */
                    <div className="flex items-end justify-center gap-2 h-20 w-full px-6">
                      <div className="w-4 bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-sm h-[40%]" />
                      <div className="w-4 bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-sm h-[65%]" />
                      <div className="w-4 bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-sm h-[50%]" />
                      <div className="w-4 bg-gradient-to-t from-amber-600 to-[#e5a93b] rounded-t-sm h-[90%]" />
                      <div className="w-4 bg-gradient-to-t from-amber-600 to-[#f5d076] rounded-t-sm h-[75%]" />
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-2">
                  <h3 className="font-extrabold text-[15px] sm:text-base text-[#102b46] group-hover:text-[#d89b2b] transition-colors leading-snug line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-[#5a7184] font-medium line-clamp-1">
                    {course.subtitle}
                  </p>

                  {/* Meta row: Duration & Level */}
                  <div className="flex items-center gap-3 text-[11px] text-[#8294a5] font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#8294a5]" />
                      {course.duration}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <BarChart3 size={12} className="text-[#8294a5]" />
                      {course.level}
                    </span>
                  </div>

                  {/* Bottom Row: Price & Enroll Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base sm:text-lg font-black text-[#102b46]">
                      {course.price}
                    </span>

                    <Link href={`/courses/${course.slug}`}>
                      <button className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#e5a93b] via-[#f5cb68] to-[#dba032] text-[#0a1e32] text-[11px] font-bold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5">
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

        {/* "Get Unlimited Access" Premium Membership Banner */}
        <section className="relative rounded-[22px] bg-gradient-to-r from-[#0a1e32] via-[#0d2642] to-[#123153] p-5 sm:p-6 overflow-hidden shadow-[0_8px_30px_rgba(10,30,50,0.18)] text-white">
          {/* Golden Ribbon Accents on sides */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#e5a93b]/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-[#e5a93b]/40 rounded-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              {/* Golden Crown Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e5a93b]/30 to-[#f5d076]/10 border border-[#e5a93b]/50 flex items-center justify-center shrink-0 text-[#f5cb68] shadow-md">
                <Crown size={26} strokeWidth={2.4} fill="#e5a93b" fillOpacity={0.2} />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Get Unlimited Access
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  Subscribe and unlock all courses
                </p>
              </div>
            </div>

            {/* Go Premium Button */}
            <Link href="/pricing" className="shrink-0">
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e5a93b] via-[#f5cb68] to-[#dba032] text-[#0a1e32] font-extrabold text-xs shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5">
                <span>Go Premium</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <BottomNav />
    </div>
  )
}
