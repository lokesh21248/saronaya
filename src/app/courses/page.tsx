'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons'

function CoursesExploreContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'ALL'
  const initialSearch = searchParams.get('search') || searchParams.get('q') || ''
  const initialBranch = searchParams.get('branch') || 'ALL'

  const [coursesList, setCoursesList] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [branches, setBranches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedBranch, setSelectedBranch] = useState(initialBranch)
  const [selectedLevel, setSelectedLevel] = useState('ALL')
  const [selectedPriceRange, setSelectedPriceRange] = useState('ALL')
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Sync category param from URL if it changes
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

  // Load Courses
  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true)
        const res = await fetch('/api/courses')
        if (res.ok) {
          const json = await res.json()
          setCoursesList(json.data || [])
        }
      } catch (err) {
        console.warn('Could not load courses:', err)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  // Load Categories & Branches dynamically from API
  useEffect(() => {
    async function loadFilters() {
      try {
        const [catRes, branchRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/branches'),
        ])

        if (catRes.ok) {
          const catJson = await catRes.json()
          if (catJson.data && Array.isArray(catJson.data)) {
            setCategories(catJson.data)
          }
        }

        if (branchRes.ok) {
          const branchJson = await branchRes.json()
          if (branchJson.data && Array.isArray(branchJson.data)) {
            setBranches(branchJson.data)
          }
        }
      } catch (err) {
        console.warn('Failed to load filter metadata:', err)
      }
    }
    loadFilters()
  }, [])

  // Map database courses into CourseCardData format
  const mappedCourses: CourseCardData[] = useMemo(() => {
    return coursesList.map((c) => {
      let imageType: CourseCardData['imageType'] = 'general'
      const catName = c.category?.name || c.categories?.name || ''
      if (c.slug?.includes('python') || catName.includes('Programming')) {
        imageType = 'python'
      } else if (catName.includes('AI') || catName.includes('Data')) {
        imageType = 'datascience'
      } else if (catName.includes('Design') || catName.includes('Web')) {
        imageType = 'design'
      } else if (catName.includes('Business')) {
        imageType = 'business'
      }

      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        subtitle: c.short_description || c.description,
        instructor: {
          name: c.primary_instructor?.full_name || c.instructor?.name || 'Sarvonaya Faculty',
          title: c.primary_instructor?.bio || 'Senior Academic Faculty',
        },
        rating: Number(c.average_rating || 0),
        reviews: c.reviews_count ? `${c.reviews_count}` : '0',
        duration: c.duration_hours ? `${c.duration_hours}h` : '10h',
        lessonsCount: c.lessons_count || 0,
        price: Number(c.price) || 0,
        originalPrice: c.discount_price ? Number(c.discount_price) : undefined,
        badge: c.difficulty_level || 'All Levels',
        imageType,
        thumbnail: c.thumbnail_url || c.thumbnail,
      }
    })
  }, [coursesList])

  // Filter & sort logic
  const filteredCourses = useMemo(() => {
    return mappedCourses
      .filter((c) => {
        // Search
        const matchesSearch =
          !searchQuery.trim() ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())

        // Category filter
        let matchesCategory = true
        if (selectedCategory && selectedCategory !== 'ALL') {
          const target = selectedCategory.toLowerCase()
          const rawCourse = coursesList.find((raw) => raw.id === c.id)
          const catName = (rawCourse?.category?.name || rawCourse?.categories?.name || '').toLowerCase()
          const catSlug = (rawCourse?.category?.slug || rawCourse?.categories?.slug || '').toLowerCase()
          matchesCategory =
            catName === target ||
            catSlug === target ||
            catName.includes(target) ||
            c.title.toLowerCase().includes(target)
        }

        // Branch filter
        let matchesBranch = true
        if (selectedBranch && selectedBranch !== 'ALL') {
          const target = selectedBranch.toLowerCase()
          matchesBranch =
            c.title.toLowerCase().includes(target) ||
            c.slug.toLowerCase().includes(target)
        }

        // Difficulty level
        let matchesLevel = true
        if (selectedLevel !== 'ALL') {
          matchesLevel = (c.badge || '').toLowerCase() === selectedLevel.toLowerCase()
        }

        // Price range
        let matchesPrice = true
        const numPrice = typeof c.price === 'number' ? c.price : Number(String(c.price).replace(/[^\d]/g, ''))
        if (selectedPriceRange === 'under-1500') matchesPrice = numPrice < 1500
        if (selectedPriceRange === '1500-2000') matchesPrice = numPrice >= 1500 && numPrice <= 2000
        if (selectedPriceRange === 'above-2000') matchesPrice = numPrice > 2000

        // Rating
        const matchesRating = minRating === 0 || Number(c.rating) >= minRating

        return matchesSearch && matchesCategory && matchesBranch && matchesLevel && matchesPrice && matchesRating
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return Number(b.rating) - Number(a.rating)
        if (sortBy === 'price-asc') return Number(a.price) - Number(b.price)
        if (sortBy === 'price-desc') return Number(b.price) - Number(a.price)
        return 0 // popular
      })
  }, [mappedCourses, coursesList, searchQuery, selectedCategory, selectedBranch, selectedLevel, selectedPriceRange, minRating, sortBy])

  // Fallback branches list if API hasn't loaded yet
  const displayBranches = branches.length > 0 ? branches : [
    { code: 'CSE', name: 'Computer Science (CSE)' },
    { code: 'AIML', name: 'AI & Machine Learning' },
    { code: 'ECE', name: 'Electronics & Comm (ECE)' },
    { code: 'EEE', name: 'Electrical Engineering' },
    { code: 'MECH', name: 'Mechanical Engineering' },
    { code: 'CIVIL', name: 'Civil Engineering' },
  ]

  const activeFiltersCount =
    (selectedCategory !== 'ALL' ? 1 : 0) +
    (selectedBranch !== 'ALL' ? 1 : 0) +
    (selectedLevel !== 'ALL' ? 1 : 0) +
    (selectedPriceRange !== 'ALL' ? 1 : 0) +
    (minRating !== 0 ? 1 : 0)

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#07182e] flex flex-col font-sans antialiased selection:bg-[#dfa32b]/30">
      <Navbar />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Page Header */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#b87e1a]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-slate-500">Course Marketplace</span>
            {selectedCategory !== 'ALL' && (
              <>
                <span>/</span>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-black">{selectedCategory}</span>
              </>
            )}
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
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
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
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory('ALL')
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

            {/* Dynamic Category Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Category
                </h4>
                {selectedCategory !== 'ALL' && (
                  <button
                    onClick={() => setSelectedCategory('ALL')}
                    className="text-[10px] text-amber-700 hover:underline font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedCategory === 'ALL'
                      ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  {selectedCategory === 'ALL' && <span className="w-2 h-2 rounded-full bg-[#dfa32b]" />}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    {selectedCategory === cat.name && <span className="w-2 h-2 rounded-full bg-[#dfa32b] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Branch / Specialization */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Specialization / Branch
                </h4>
                {selectedBranch !== 'ALL' && (
                  <button
                    onClick={() => setSelectedBranch('ALL')}
                    className="text-[10px] text-amber-700 hover:underline font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedBranch('ALL')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedBranch === 'ALL'
                      ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Specializations</span>
                  {selectedBranch === 'ALL' && <span className="w-2 h-2 rounded-full bg-[#dfa32b]" />}
                </button>
                {displayBranches.map((b: any) => (
                  <button
                    key={b.code || b.id}
                    onClick={() => setSelectedBranch(b.code || b.name)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      selectedBranch === (b.code || b.name)
                        ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/50'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{b.name}</span>
                    {selectedBranch === (b.code || b.name) && <span className="w-2 h-2 rounded-full bg-[#dfa32b] shrink-0" />}
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
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
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
                Price Range
              </h4>
              <div className="space-y-1">
                {[
                  { id: 'ALL', label: 'All Prices' },
                  { id: 'under-1500', label: 'Under ₹1,500' },
                  { id: '1500-2000', label: '₹1,500 – ₹2,000' },
                  { id: 'above-2000', label: 'Above ₹2,000' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPriceRange(p.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
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
          </aside>

          {/* RIGHT: Courses Results Column */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}</span>
              {selectedCategory !== 'ALL' && (
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Filtered by Category: <strong>{selectedCategory}</strong>
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 rounded-3xl bg-slate-200/70 animate-pulse" />
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
                <h3 className="text-lg font-bold text-[#07182e]">No courses found matching your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some filters or searching with different keywords.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('ALL')
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
                    ? 'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'
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

export default function CoursesExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center text-slate-400 text-sm">Loading course marketplace...</div>}>
      <CoursesExploreContent />
    </Suspense>
  )
}
