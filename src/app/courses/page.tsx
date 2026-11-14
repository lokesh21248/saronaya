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
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { BottomNav } from '@/components/layout/BottomNav'
import { COURSES_DATA, ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function CoursesCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('ALL')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = [
    { name: 'All', icon: Sparkles, label: 'All' },
    { name: 'Programming', icon: Code2, label: '</>' },
    { name: 'Data Science', icon: BarChart3, label: 'chart' },
    { name: 'Design', icon: Palette, label: 'palette' },
    { name: 'Business', icon: Briefcase, label: 'briefcase' },
  ]

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/courses' },
    { label: 'Progress', href: '/student/progress' },
    { label: 'Certificates', href: '/student/certificates' },
  ]

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBranch =
      selectedBranch === 'ALL' || course.eligibleBranches.includes(selectedBranch)

    const matchesCategory =
      selectedCategory === 'All' ||
      course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Programming' && (course.category.includes('Computer') || course.category.includes('Software'))) ||
      (selectedCategory === 'Data Science' && (course.category.includes('AI') || course.category.includes('Data')))

    return matchesSearch && matchesBranch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#092347] pb-24 md:pb-12 font-sans antialiased selection:bg-[#dfa32b]/30">
      {/* Master Navbar with Login/Logout & Official Logo */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6 sm:space-y-8">

        {/* Search Bar with Filter Sliders Icon */}
        <div className="relative flex items-center">
          <div className="relative w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search courses by title, branch, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-14 py-3.5 bg-white rounded-2xl border border-slate-100 text-xs sm:text-sm text-[#102b46] placeholder-slate-400 shadow-[0_4px_20px_rgba(16,43,70,0.04)] focus:outline-none focus:ring-2 focus:ring-[#e5a93b]/40 font-medium"
            />
          </div>
          <button
            onClick={() => setSelectedBranch(selectedBranch === 'ALL' ? 'CSE' : 'ALL')}
            className="absolute right-2 p-2 sm:p-2.5 rounded-xl bg-white text-[#102b46] hover:bg-slate-50 border border-slate-100 shadow-sm transition-all"
            aria-label="Filter"
          >
            <SlidersHorizontal size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* 4 Category Cards: Responsive */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {categories.slice(1).map((cat) => {
            const isSelected = selectedCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(isSelected ? 'All' : cat.name)}
                className={`py-3 sm:py-5 px-2 sm:px-4 rounded-2xl border flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/70 border-[#e5a93b] shadow-md ring-1 ring-[#e5a93b]/40 scale-[1.02]'
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-[0_4px_20px_rgba(16,43,70,0.04)] hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black ${
                    isSelected ? 'text-[#c58a23]' : 'text-[#102b46]'
                  }`}
                >
                  {cat.name === 'Programming' && (
                    <span className="font-mono text-sm sm:text-xl font-bold tracking-tight">&lt;/&gt;</span>
                  )}
                  {cat.name === 'Data Science' && <BarChart3 size={22} className="sm:w-6 sm:h-6" strokeWidth={2.4} />}
                  {cat.name === 'Design' && <Palette size={22} className="sm:w-6 sm:h-6" strokeWidth={2.4} />}
                  {cat.name === 'Business' && <Briefcase size={22} className="sm:w-6 sm:h-6" strokeWidth={2.4} />}
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[#102b46] text-center leading-tight">
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Engineering Branch Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedBranch('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedBranch === 'ALL'
                ? 'bg-[#102b46] text-white shadow-sm'
                : 'bg-white border border-slate-100 text-[#5a7184] hover:text-[#102b46]'
            }`}
          >
            All Branches ({COURSES_DATA.length})
          </button>
          {ACADEMIC_BRANCHES.map((b) => (
            <button
              key={b.code}
              onClick={() => setSelectedBranch(b.code)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedBranch === b.code
                  ? 'bg-gradient-to-r from-[#d99222] to-[#f5c465] text-[#102b46] font-extrabold shadow-sm'
                  : 'bg-white border border-slate-100 text-[#5a7184] hover:text-[#102b46]'
              }`}
            >
              <span>{b.code}</span>
            </button>
          ))}
        </div>

        {/* Courses Section Header */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-xl sm:text-2xl font-black text-[#102b46] tracking-tight">
            Popular Courses
          </h2>
          <span className="text-xs sm:text-sm font-bold text-[#c58a23]">
            {filteredCourses.length} Available Courses
          </span>
        </div>

        {/* Courses Grid: Responsive 1 col mobile -> 2 tablet -> 3 laptop -> 4 wide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCourses.map((c) => {
            const isPython = c.slug.includes('python') || c.title.toLowerCase().includes('python')
            const isData = c.slug.includes('data') || c.slug.includes('learning') || c.category.includes('AI')

            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div>
                  {/* Visual Header matching mobile design */}
                  <div className="relative h-40 bg-gradient-to-br from-[#0b1e33] to-[#122e4d] p-4 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-3 left-3 bg-[#e5a93b] text-[#102b46] px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm z-10">
                      <Play size={10} className="fill-[#102b46]" />
                      <span>{c.rating || '4.5'}</span>
                      <span className="opacity-75 font-semibold">({c.reviews || '12k'})</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20 z-10">
                      {c.eligibleBranches[0] || 'ENGINEERING'}
                    </div>

                    {isPython ? (
                      <div className="flex items-center justify-between w-full px-4">
                        <div className="w-20 h-14 rounded-lg bg-[#081524] border border-cyan-500/30 p-1.5 shadow-inner">
                          <div className="space-y-0.5 font-mono text-[6px]">
                            <div className="h-1 w-8 bg-cyan-400/80 rounded" />
                            <div className="h-1 w-12 bg-amber-400/80 rounded" />
                            <div className="h-1 w-9 bg-emerald-400/80 rounded" />
                          </div>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg viewBox="0 0 128 128" className="w-12 h-12">
                            <path
                              fill="#387eb8"
                              d="M63.5 1.5c-34.2 0-32.1 14.8-32.1 14.8l.1 15.3h32.7v4.6H29.1S1.5 33.1 1.5 64.9c0 31.8 24.1 30.7 24.1 30.7h14.4v-20.2s-.8-24.1 23.8-24.1h23.3V34.5s2.4-33-23.6-33zm-13 9.8c3.8 0 6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9-6.9-3.1-6.9-6.9 3.1-6.9 6.9-6.9z"
                            />
                            <path
                              fill="#ffe052"
                              d="M64.5 126.5c34.2 0 32.1-14.8 32.1-14.8l-.1-15.3H63.8v-4.6h35.1s27.6 3.1 27.6-28.7c0-31.8-24.1-30.7-24.1-30.7H108v20.2s.8 24.1-23.8 24.1H60.9v16.9s-2.4 33 23.6 33zm13-9.8c-3.8 0-6.9-3.1-6.9-6.9s3.1-6.9 6.9-6.9 6.9 3.1 6.9 6.9-3.1 6.9-6.9 6.9z"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : isData ? (
                      <div className="flex items-end justify-center gap-1.5 h-20 w-full px-6">
                        <div className="w-3.5 bg-cyan-400 rounded-t h-8" />
                        <div className="w-3.5 bg-cyan-400 rounded-t h-14" />
                        <div className="w-3.5 bg-cyan-400 rounded-t h-10" />
                        <div className="w-3.5 bg-[#e5a93b] rounded-t h-16" />
                        <div className="w-3.5 bg-[#e5a93b] rounded-t h-20 shadow-lg shadow-amber-500/30" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#e5a93b]">
                        <BookOpen size={30} />
                      </div>
                    )}
                  </div>

                  {/* Course Details */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="text-sm sm:text-base font-black text-[#102b46] group-hover:text-[#c58a23] transition-colors leading-snug line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#5a7184] font-medium line-clamp-1">
                      {c.subtitle || c.tagline || c.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-[#5a7184] font-semibold">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        <span>{c.duration || `${c.durationHours}h`}</span>
                      </div>
                      <span>•</span>
                      <span>{c.level}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100/80 mt-1">
                  <div className="text-base sm:text-lg font-black text-[#102b46]">
                    ₹{c.price.toLocaleString('en-IN')}
                  </div>
                  <Link href={`/courses/${c.slug}`}>
                    <button className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center gap-1.5 transition-all">
                      <Play size={10} className="fill-[#102b46]" />
                      <span>Enroll Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Premium Banner: "Get Unlimited Access" */}
        <section className="relative rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-[#07192b] via-[#0c243c] to-[#12365a] p-5 sm:p-7 lg:p-9 text-white overflow-hidden shadow-xl border border-[#1b3d64]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Crown size={26} className="text-[#ffd56b]" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                  Get Unlimited Access
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Subscribe and unlock all engineering courses & certificates
                </p>
              </div>
            </div>

            <Link href="/pricing" className="shrink-0">
              <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-1.5 transition-all">
                <span>Go Premium</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
