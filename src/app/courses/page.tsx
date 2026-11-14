'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Filter,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
import { COURSES_DATA, ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function CoursesCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('ALL')
  const [selectedLevel, setSelectedLevel] = useState('ALL')

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBranch =
      selectedBranch === 'ALL' || course.eligibleBranches.includes(selectedBranch)

    const matchesLevel =
      selectedLevel === 'ALL' || course.level === selectedLevel

    return matchesSearch && matchesBranch && matchesLevel
  })

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold mb-3">
              <BookOpen size={14} />
              <span>Full Engineering Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Course Catalog</h1>
            <p className="text-muted text-sm mt-1 max-w-xl">
              Explore branch-mapped engineering courses taught by senior faculty and industry specialists.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3.5 top-3.5 text-muted" />
            <input
              type="text"
              placeholder="Search Python, VLSI, CAD, React..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-navy-soft/80 border border-line/20 rounded-xl text-cream placeholder-muted text-sm focus:border-gold outline-none"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Branch Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedBranch('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedBranch === 'ALL'
                  ? 'bg-gold text-navy-deep font-bold'
                  : 'bg-navy border border-line/15 text-muted hover:text-cream'
              }`}
            >
              All Branches ({COURSES_DATA.length})
            </button>
            {ACADEMIC_BRANCHES.map((b) => (
              <button
                key={b.code}
                onClick={() => setSelectedBranch(b.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedBranch === b.code
                    ? 'bg-gold text-navy-deep font-bold'
                    : 'bg-navy border border-line/15 text-muted hover:text-cream'
                }`}
              >
                <span>{b.icon}</span>
                <span>{b.code}</span>
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1.5 bg-navy border border-line/20 rounded-lg text-xs text-cream outline-none cursor-pointer"
            >
              <option value="ALL">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
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
                  {/* Branch chips */}
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

                  <h2 className="font-bold text-lg text-white group-hover:text-gold transition-colors line-clamp-1">
                    {course.title}
                  </h2>
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

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-navy rounded-2xl border border-line/20">
            <p className="text-base text-muted">No courses found matching your filters.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('')
                setSelectedBranch('ALL')
                setSelectedLevel('ALL')
              }}
              className="mt-4 border-line/30"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
