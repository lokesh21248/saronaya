'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  Clock,
  BookOpen,
  Filter,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { CourseCard, CourseCardData } from '@/components/ui/CourseCard'
import { COURSES_DATA } from '@/lib/data/lms-data'
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons'

export default function CoursesExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('ALL')
  const [selectedLevel, setSelectedLevel] = useState('ALL')
  const [selectedPriceRange, setSelectedPriceRange] = useState('ALL')
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Map COURSES_DATA into CourseCardData format
  const mappedCourses: CourseCardData[] = useMemo(() => {
    return COURSES_DATA.map((c, index) => {
      let imageType: CourseCardData['imageType'] = 'general'
      let badge: CourseCardData['badge'] = 'Bestseller'

      if (c.slug.includes('python') || c.category.includes('Programming')) {
        imageType = 'python'
        badge = index % 2 === 0 ? 'Bestseller' : 'Popular'
      } else if (c.category.includes('AI') || c.category.includes('Data')) {
        imageType = 'datascience'
        badge = 'New'
      } else if (c.category.includes('Design') || c.category.includes('Web')) {
        imageType = 'design'
        badge = 'Popular'
      } else if (c.category.includes('Business')) {
        imageType = 'business'
        badge = 'Top Rated'
      }

      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        subtitle: c.tagline,
        instructor: {
          name: c.instructor.name,
          title: c.instructor.title,
        },
        rating: Number(c.rating || 4.8),
        reviews: c.reviews || '8.5K',
        duration: c.duration || `${c.durationHours}h`,
        lessonsCount: c.lessonsCount || 45,
        price: c.price,
        originalPrice: c.originalPrice,
        badge,
        imageType,
      }
    })
  }, [])

  // Filter & sort logic
  const filteredCourses = useMemo(() => {
    return mappedCourses
      .filter((c) => {
        // Search
        const matchesSearch =
          !searchQuery.trim() ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())

        // Branch filter
        const original = COURSES_DATA.find((item) => item.id === c.id)
        const matchesBranch =
          selectedBranch === 'ALL' ||
          original?.eligibleBranches.includes(selectedBranch) ||
          original?.category.toLowerCase().includes(selectedBranch.toLowerCase())

        // Level
        const matchesLevel =
          selectedLevel === 'ALL' || original?.level.toLowerCase() === selectedLevel.toLowerCase()

        // Price range
        let matchesPrice = true
        const numPrice = typeof c.price === 'number' ? c.price : Number(c.price.replace(/[^\d]/g, ''))
        if (selectedPriceRange === 'under-1500') matchesPrice = numPrice < 1500
        if (selectedPriceRange === '1500-2000') matchesPrice = numPrice >= 1500 && numPrice <= 2000
        if (selectedPriceRange === 'above-2000') matchesPrice = numPrice > 2000

        // Rating
        const matchesRating = minRating === 0 || Number(c.rating) >= minRating

        return matchesSearch && matchesBranch && matchesLevel && matchesPrice && matchesRating
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return Number(b.rating) - Number(a.rating)
        if (sortBy === 'price-asc') return Number(a.price) - Number(b.price)
        if (sortBy === 'price-desc') return Number(b.price) - Number(a.price)
        return 0 // popular
      })
  }, [mappedCourses, searchQuery, selectedBranch, selectedLevel, selectedPriceRange, minRating, sortBy])

  const branches = [
    { code: 'ALL', name: 'All Specializations' },
    { code: 'CSE', name: 'Computer Science (CSE)' },
    { code: 'AI_ML', name: 'AI & Data Science' },
    { code: 'ECE', name: 'Electronics & Comm (ECE)' },
    { code: 'EEE', name: 'Electrical Engineering' },
    { code: 'MECH', name: 'Mechanical Engineering' },
    { code: 'CIVIL', name: 'Civil Engineering' },
    { code: 'Web', name: 'Full-Stack Web Dev' },
  ]

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#07182e] flex flex-col font-sans antialiased selection:bg-[#dfa32b]/30">
      <Navbar />

      <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
        
        {/* Page Header */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#b87e1a]">
            <span>Explore</span>
            <span>/</span>
            <span className="text-slate-500">Course Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#07182e] tracking-tight">
            Engineering Course Marketplace
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Explore university-aligned syllabi, practical coding bootcamps, and gate preparation courses taught by verified engineering faculty.
          </p>
        </div>

        {/* Top Control Bar: Search, View Mode, Sort */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, topic, or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] rounded-2xl border border-slate-200 text-xs sm:text-sm text-[#07182e] placeholder-slate-400 outline-none focus:border-[#dfa32b] focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-[#07182e] flex items-center gap-2"
            >
              <Filter className="w-4 h-4 text-[#e5a93b]" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#07182e] outline-none cursor-pointer focus:border-[#dfa32b]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-white text-[#07182e] shadow-xs' : 'text-slate-400'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-white text-[#07182e] shadow-xs' : 'text-slate-400'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Main 2-Column Marketplace Grid: Sidebar Filters + Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Filters Sidebar (Desktop) */}
          <aside
            className={`lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm uppercase tracking-wider text-[#07182e] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#e5a93b]" />
                <span>Filters</span>
              </h3>
              {(selectedBranch !== 'ALL' || selectedLevel !== 'ALL' || selectedPriceRange !== 'ALL' || minRating !== 0) && (
                <button
                  onClick={() => {
                    setSelectedBranch('ALL')
                    setSelectedLevel('ALL')
                    setSelectedPriceRange('ALL')
                    setMinRating(0)
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Branch / Specialization */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Specialization / Branch
              </h4>
              <div className="space-y-1">
                {branches.map((b) => (
                  <button
                    key={b.code}
                    onClick={() => setSelectedBranch(b.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedBranch === b.code
                        ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{b.name}</span>
                    {selectedBranch === b.code && <span className="w-2 h-2 rounded-full bg-[#dfa32b]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Difficulty Level
              </h4>
              <div className="space-y-1">
                {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedLevel === lvl
                        ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{lvl === 'ALL' ? 'All Levels' : lvl}</span>
                    {selectedLevel === lvl && <span className="w-2 h-2 rounded-full bg-[#dfa32b]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Price
              </h4>
              <div className="space-y-1">
                {[
                  { id: 'ALL', label: 'All Prices' },
                  { id: 'under-1500', label: 'Under ₹1,500' },
                  { id: '1500-2000', label: '₹1,500 - ₹2,000' },
                  { id: 'above-2000', label: 'Above ₹2,000' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPriceRange(p.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedPriceRange === p.id
                        ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{p.label}</span>
                    {selectedPriceRange === p.id && <span className="w-2 h-2 rounded-full bg-[#dfa32b]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Minimum Rating
              </h4>
              <div className="space-y-1">
                {[
                  { r: 0, label: 'All Ratings' },
                  { r: 4.5, label: '★ 4.5 & Above' },
                  { r: 4.8, label: '★ 4.8 & Above' },
                ].map((item) => (
                  <button
                    key={item.r}
                    onClick={() => setMinRating(item.r)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      minRating === item.r
                        ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {minRating === item.r && <span className="w-2 h-2 rounded-full bg-[#dfa32b]" />}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* RIGHT: Course Cards Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Results count & status */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Showing {filteredCourses.length} engineering courses</span>
              {searchQuery && (
                <span className="text-[#07182e]">Results for &ldquo;{searchQuery}&rdquo;</span>
              )}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-[#dfa32b] flex items-center justify-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-black text-[#07182e]">No courses match your filter criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some filters or searching for broader terms like &ldquo;Python&rdquo;, &ldquo;Machine Learning&rdquo;, or &ldquo;Mechanical&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedBranch('ALL')
                    setSelectedLevel('ALL')
                    setSelectedPriceRange('ALL')
                    setMinRating(0)
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#07182e] text-white text-xs font-bold shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredCourses.map((c) => (
                  <CourseCard key={c.id} course={c} viewMode={viewMode} />
                ))}
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  )
}
