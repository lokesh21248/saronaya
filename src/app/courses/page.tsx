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
  Filter,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
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
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased selection:bg-[#e5a93b]/30">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl px-4 sm:px-6 pt-3 space-y-5">
        {/* Header */}
        <header className="flex items-center justify-between py-2">
          <SaryonayaLogo size="md" />

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

        {/* Search Bar with Filter Sliders Icon */}
        <div className="relative flex items-center">
          <div className="relative w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-14 py-3.5 bg-white rounded-2xl border border-slate-100 text-sm text-[#102b46] placeholder-slate-400 shadow-[0_4px_20px_rgba(16,43,70,0.04)] focus:outline-none focus:ring-2 focus:ring-[#e5a93b]/40 font-medium"
            />
          </div>
          <button
            onClick={() => setSelectedBranch(selectedBranch === 'ALL' ? 'CSE' : 'ALL')}
            className="absolute right-2 p-2.5 rounded-xl bg-white text-[#102b46] hover:bg-slate-50 border border-slate-100 shadow-sm transition-all"
            aria-label="Filter"
          >
            <SlidersHorizontal size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* 4 Category Cards matching the screenshot */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {categories.slice(1).map((cat) => {
            const isSelected = selectedCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(isSelected ? 'All' : cat.name)}
                className={`p-3 sm:p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/60 border-[#e5a93b] shadow-md ring-1 ring-[#e5a93b]/40 scale-[1.02]'
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-[0_4px_20px_rgba(16,43,70,0.04)] hover:shadow-md'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                    isSelected ? 'text-[#c58a23]' : 'text-[#102b46]'
                  }`}
                >
                  {cat.name === 'Programming' && (
                    <span className="font-mono text-base font-bold tracking-tight">&lt;/&gt;</span>
                  )}
                  {cat.name === 'Data Science' && <BarChart3 size={24} strokeWidth={2.4} />}
                  {cat.name === 'Design' && <Palette size={24} strokeWidth={2.4} />}
                  {cat.name === 'Business' && <Briefcase size={24} strokeWidth={2.4} />}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#102b46] text-center leading-tight">
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
          <span className="text-xs font-bold text-[#c58a23] flex items-center gap-1">
            {filteredCourses.length} Available
          </span>
        </div>

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((c) => {
            const isPython = c.slug.includes('python') || c.title.toLowerCase().includes('python')
            const isData = c.slug.includes('data') || c.slug.includes('learning') || c.category.includes('AI')

            return (
              <div
                key={c.id}
                className="bg-white rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div>
                  {/* Visual Header matching mobile design */}
                  <div className="relative h-44 bg-gradient-to-br from-[#0b1e33] to-[#122e4d] p-4 flex items-center justify-center overflow-hidden">
                    {/* Golden Rating Pill Badge top-left */}
                    <div className="absolute top-3 left-3 bg-[#e5a93b] text-[#102b46] px-2.5 py-1 rounded-full text-[11px] font-black flex items-center gap-1 shadow-sm z-10">
                      <Play size={10} className="fill-[#102b46]" />
                      <span>{c.rating || '4.5'}</span>
                      <span className="opacity-75 font-semibold">({c.reviews || '12k'})</span>
                    </div>

                    {/* Branch Badge top-right */}
                    <div className="absolute top-3 right-3 bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20 z-10">
                      {c.eligibleBranches[0] || 'ENGINEERING'}
                    </div>

                    {/* Dynamic Graphic */}
                    {isPython ? (
                      <div className="flex items-center justify-between w-full px-4">
                        {/* Coding Laptop Graphic */}
                        <div className="w-24 h-16 rounded-lg bg-[#081524] border border-cyan-500/30 p-1.5 shadow-inner">
                          <div className="space-y-1">
                            <div className="h-1 w-8 bg-cyan-400/80 rounded" />
                            <div className="h-1 w-14 bg-amber-400/80 rounded" />
                            <div className="h-1 w-10 bg-emerald-400/80 rounded" />
                            <div className="h-1 w-12 bg-purple-400/80 rounded" />
                          </div>
                        </div>
                        {/* Python Official Logo Emblem */}
                        <div className="w-16 h-16 flex items-center justify-center drop-shadow-xl">
                          <svg viewBox="0 0 128 128" className="w-14 h-14">
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
                      <div className="flex items-end justify-center gap-2 h-24 w-full px-6 pt-4">
                        <div className="w-4 bg-cyan-400 rounded-t h-8" />
                        <div className="w-4 bg-cyan-400 rounded-t h-14" />
                        <div className="w-4 bg-cyan-400 rounded-t h-10" />
                        <div className="w-4 bg-[#e5a93b] rounded-t h-16" />
                        <div className="w-4 bg-[#e5a93b] rounded-t h-20 shadow-lg shadow-amber-500/30" />
                        <div className="w-4 bg-[#e5a93b] rounded-t h-24 shadow-lg shadow-amber-500/40" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#e5a93b]">
                        <BookOpen size={36} />
                      </div>
                    )}
                  </div>

                  {/* Course Details */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <h3 className="text-base font-black text-[#102b46] group-hover:text-[#c58a23] transition-colors leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#5a7184] font-medium line-clamp-1">
                      {c.subtitle || c.tagline || c.description}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-[#5a7184] font-semibold">
                      <div className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        <span>{c.duration}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <BarChart3 size={13} className="text-slate-400" />
                        <span>{c.level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Enroll Button Row */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100/80 mt-2">
                  <div className="text-lg font-black text-[#102b46]">
                    ₹{c.price.toLocaleString('en-IN')}
                  </div>
                  <Link href={`/courses/${c.slug}`}>
                    <button className="px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center gap-1.5 transition-all">
                      <Play size={11} className="fill-[#102b46]" />
                      <span>Enroll Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Premium Banner: "Get Unlimited Access" */}
        <section className="relative rounded-[24px] bg-gradient-to-r from-[#0c243c] via-[#0f2d4a] to-[#163a5f] p-5 sm:p-6 text-white overflow-hidden shadow-lg border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Crown size={26} className="text-[#f5c465]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Get Unlimited Access
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  Subscribe and unlock all engineering courses & certificates
                </p>
              </div>
            </div>

            <Link href="/pricing" className="shrink-0">
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-md flex items-center justify-center gap-1.5 transition-all">
                <span>Go Premium</span>
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
