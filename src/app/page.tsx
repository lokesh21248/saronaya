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
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
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
      thumbnailBg: 'from-[#07182e] to-[#0d2a4d]',
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
      thumbnailBg: 'from-[#07182e] to-[#0a2f58]',
    },
    {
      id: 'course-web-02',
      slug: 'full-stack-web-development',
      title: 'Full-Stack Web Dev',
      subtitle: 'React, Node.js & Cloud',
      rating: '4.8',
      reviews: '15k',
      duration: '16h 40m',
      level: 'Beginner',
      price: '₹1,299',
      imageType: 'web',
      thumbnailBg: 'from-[#07182e] to-[#12365e]',
    },
    {
      id: 'course-ai-04',
      slug: 'deep-learning-ai',
      title: 'Machine Learning & AI',
      subtitle: 'Neural Nets & LLMs',
      rating: '4.9',
      reviews: '10k',
      duration: '20h 10m',
      level: 'Advanced',
      price: '₹1,899',
      imageType: 'ai',
      thumbnailBg: 'from-[#07182e] to-[#0e3057]',
    },
  ]

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/courses' },
    { label: 'Progress', href: '/student/progress' },
    { label: 'Certificates', href: '/student/certificates' },
  ]

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#092347] pb-24 md:pb-12 font-sans antialiased selection:bg-[#dfa32b]/30">
      {/* Master Navbar with Login/Logout & Official Logo */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6 sm:space-y-8">
        {/* Hero Banner Section */}
        <section className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-white via-white to-[#f0f6ff] border border-slate-100 shadow-[0_8px_30px_rgba(9,35,71,0.06)] overflow-hidden p-5 sm:p-8 lg:p-10">
          {/* Decorative Navy & Gold Waves Background */}
          <div className="absolute top-0 right-0 w-2/3 sm:w-1/2 h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-12 -right-8 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-bl from-[#092347] to-[#07182e] rounded-full blur-[2px] opacity-95" />
            <div className="absolute top-1/3 -right-6 w-52 sm:w-80 h-44 sm:h-64 border-[6px] border-[#dfa32b] rounded-full opacity-80" />
            <div className="absolute top-6 right-8 sm:right-16 text-white/20">
              <Play size={40} fill="currentColor" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-6 items-center relative z-10">
            {/* Left Content */}
            <div className="col-span-7 sm:col-span-7 lg:col-span-8 space-y-2.5 sm:space-y-4 pr-1 sm:pr-4">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#092347] leading-[1.15] tracking-tight">
                Learn Anytime, <br />
                <span className="bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#b87e1a] bg-clip-text text-transparent font-serif italic">
                  Anywhere
                </span>
              </h1>

              <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-[#557086] font-medium leading-relaxed max-w-sm sm:max-w-md">
                Upgrade your skills with expert-led online courses
              </p>

              {/* Master Premium Gold Button */}
              <div className="pt-1 sm:pt-2">
                <Link href="/courses">
                  <button className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#092347] font-black text-xs sm:text-sm border-t border-[#ffe8a3]/60 shadow-[0_4px_18px_rgba(223,163,43,0.35)] hover:shadow-[0_6px_24px_rgba(223,163,43,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 tracking-wide">
                    <span>Explore Courses</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="col-span-5 sm:col-span-5 lg:col-span-4 flex justify-end relative">
              <div className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-2 ring-[#dfa32b]/30">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                  alt="Student with laptop and headphones"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-3 sm:pt-5">
            <span
              onClick={() => setCarouselIndex(0)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                carouselIndex === 0 ? 'w-6 bg-[#092347]' : 'w-1.5 bg-slate-300'
              }`}
            />
            <span
              onClick={() => setCarouselIndex(1)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                carouselIndex === 1 ? 'w-6 bg-[#092347]' : 'w-1.5 bg-slate-300'
              }`}
            />
            <span
              onClick={() => setCarouselIndex(2)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                carouselIndex === 2 ? 'w-6 bg-[#092347]' : 'w-1.5 bg-slate-300'
              }`}
            />
          </div>
        </section>

        {/* Floating Search Bar */}
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-3 sm:py-3.5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(9,35,71,0.05)] border border-slate-100 focus-within:border-[#dfa32b] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <Search size={19} className="text-[#557086]" strokeWidth={2.2} />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#092347] placeholder-[#557086]/70 outline-none font-medium"
              />
            </div>

            <Link
              href="/courses"
              className="p-2 sm:p-2.5 rounded-xl hover:bg-slate-50 text-[#092347] transition-colors ml-2"
              aria-label="Filter courses"
            >
              <SlidersHorizontal size={19} strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        {/* 4 Category Cards */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`py-3 sm:py-5 px-2 sm:px-4 rounded-2xl border flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/70 border-[#dfa32b] shadow-md ring-1 ring-[#dfa32b]/40 scale-[1.02]'
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-[0_4px_20px_rgba(9,35,71,0.04)] hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? 'text-[#b87e1a]' : 'text-[#092347]'
                  }`}
                >
                  {cat.name === 'Programming' && (
                    <span className="font-mono text-sm sm:text-xl font-bold tracking-tighter">&lt;/&gt;</span>
                  )}
                  {cat.name === 'Data Science' && (
                    <div className="flex items-end gap-0.5 h-5 sm:h-6">
                      <span className="w-1 sm:w-1.5 h-2.5 bg-current rounded-xs" />
                      <span className="w-1 sm:w-1.5 h-4 bg-current rounded-xs" />
                      <span className="w-1 sm:w-1.5 h-5 sm:h-6 bg-current rounded-xs" />
                    </div>
                  )}
                  {cat.name === 'Design' && <Palette size={20} className="sm:w-6 sm:h-6" strokeWidth={2.2} />}
                  {cat.name === 'Business' && <Briefcase size={20} className="sm:w-6 sm:h-6" strokeWidth={2.2} />}
                </div>

                <span
                  className={`text-[10px] sm:text-xs md:text-sm font-bold tracking-tight text-center leading-tight ${
                    isSelected ? 'text-[#092347]' : 'text-[#557086]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Popular Courses Section */}
        <div className="space-y-3.5 sm:space-y-4 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-black text-[#092347] tracking-tight">
              Popular Courses
            </h2>
            <Link
              href="/courses"
              className="text-xs sm:text-sm font-bold text-[#b87e1a] hover:text-[#916110] transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-100 shadow-[0_4px_20px_rgba(9,35,71,0.05)] hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Media */}
                  <div
                    className={`relative h-36 sm:h-40 bg-gradient-to-tr ${course.thumbnailBg} p-3.5 flex items-center justify-center overflow-hidden`}
                  >
                    <div className="absolute top-3 left-3 bg-[#dfa32b] text-[#092347] px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm z-10">
                      <Play size={10} className="fill-[#092347]" />
                      <span>
                        {course.rating} ({course.reviews})
                      </span>
                    </div>

                    {/* Graphic Artwork */}
                    {course.imageType === 'python' ? (
                      <div className="flex items-center justify-between w-full px-5">
                        <div className="w-20 h-14 bg-[#051325] border border-blue-400/40 rounded-md p-1.5 shadow-md flex flex-col justify-between">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <div className="space-y-0.5 font-mono text-[6px] text-blue-300">
                            <p className="text-emerald-400">def code():</p>
                            <p className="pl-1 text-amber-300">return True</p>
                          </div>
                        </div>
                        <div className="w-12 h-12 relative flex items-center justify-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg rotate-12 flex items-center justify-center shadow-lg">
                            <div className="w-8 h-8 bg-amber-400 rounded-lg -rotate-12 opacity-90" />
                          </div>
                        </div>
                      </div>
                    ) : course.imageType === 'datascience' ? (
                      <div className="flex items-end justify-center gap-2 h-20 w-full px-6">
                        <div className="w-3.5 bg-blue-500 rounded-t h-[40%]" />
                        <div className="w-3.5 bg-blue-400 rounded-t h-[65%]" />
                        <div className="w-3.5 bg-cyan-400 rounded-t h-[50%]" />
                        <div className="w-3.5 bg-[#dfa32b] rounded-t h-[90%]" />
                        <div className="w-3.5 bg-[#f5cb68] rounded-t h-[75%]" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#dfa32b]">
                        <BookOpen size={28} />
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="font-black text-sm sm:text-base text-[#092347] group-hover:text-[#b87e1a] transition-colors leading-snug line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#557086] font-medium line-clamp-1">
                      {course.subtitle}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#8294a5] font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#8294a5]" />
                        {course.duration}
                      </span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100/80 mt-1">
                  <span className="text-base sm:text-lg font-black text-[#092347]">
                    {course.price}
                  </span>

                  <Link href={`/courses/${course.slug}`}>
                    <button className="px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#092347] border-t border-[#ffe8a3]/60 shadow-[0_3px_12px_rgba(223,163,43,0.3)] hover:shadow-[0_4px_18px_rgba(223,163,43,0.45)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 transition-all tracking-wide">
                      <Play size={10} className="fill-[#092347]" />
                      <span>Enroll Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Banner: "Get Unlimited Access" */}
        <section className="relative rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-[#07182e] via-[#092347] to-[#12365e] p-5 sm:p-7 lg:p-9 text-white overflow-hidden shadow-xl border border-[#1b3d64]">
          <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-20">
            <div className="w-64 h-64 border-[4px] border-[#dfa32b] rounded-full -top-12 -right-12 absolute" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#ffd56b]/20 to-transparent border border-[#ffd56b]/40 flex items-center justify-center shrink-0 shadow-inner">
                <Crown size={26} className="text-[#ffd56b]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                  Get Unlimited Access
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Subscribe and unlock all engineering courses, code repositories & certificates
                </p>
              </div>
            </div>

            <Link href="/pricing" className="shrink-0 pt-1 sm:pt-0">
              <button className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#092347] border-t border-[#ffe8a3]/60 shadow-[0_4px_18px_rgba(223,163,43,0.35)] hover:shadow-[0_6px_24px_rgba(223,163,43,0.5)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all tracking-wide">
                <span>Go Premium</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
