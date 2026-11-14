'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  PlusCircle,
  Search,
  Edit,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { COURSES_DATA, CourseData } from '@/lib/data/lms-data'

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>(COURSES_DATA)
  const [search, setSearch] = useState('')

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  )

  const togglePublish = (id: string) => {
    setCourses(
      courses.map((c) =>
        c.id === id ? { ...c, isPublished: !c.isPublished } : c
      )
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Course Management</h1>
          <p className="text-muted text-sm mt-1">
            Create, update curriculum sections, map engineering branches, and publish lessons.
          </p>
        </div>

        <Link href="/admin/courses/new">
          <Button variant="gold" size="sm" className="font-bold text-navy-deep flex items-center gap-2">
            <PlusCircle size={16} /> New Course
          </Button>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-navy border border-line/20 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-3 text-muted" />
          <input
            type="text"
            placeholder="Filter courses by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-navy-soft/60 border border-line/15 rounded-lg text-cream placeholder-muted text-xs focus:border-gold outline-none"
          />
        </div>
        <span className="text-xs text-muted shrink-0">
          Showing {filtered.length} courses
        </span>
      </div>

      {/* Courses Table */}
      <div className="bg-navy border border-line/20 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-line/10 text-muted uppercase tracking-wider bg-navy-soft/40">
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Eligible Branches</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/10">
              {filtered.map((course) => (
                <tr key={course.id} className="hover:bg-navy-soft/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-12 h-10 object-cover rounded-lg bg-navy-soft shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white text-sm block line-clamp-1">
                          {course.title}
                        </span>
                        <span className="text-[11px] text-muted">
                          {course.sections.length} Sections • {course.lessonsCount} Lessons ({course.durationHours}h)
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-cream font-medium">{course.category}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {course.eligibleBranches.map((b) => (
                        <span
                          key={b}
                          className="px-1.5 py-0.5 rounded bg-gold/15 text-gold text-[10px] font-bold border border-gold/30"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gold text-sm">₹{course.price}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(course.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        course.isPublished
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {course.isPublished ? '● Published' : '○ Draft'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/courses/${course.slug}`}>
                        <Button variant="ghost" size="sm" className="p-1.5 text-muted hover:text-white" title="Preview">
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Link href={`/admin/courses/new`}>
                        <Button variant="ghost" size="sm" className="p-1.5 text-gold hover:text-gold-light" title="Edit">
                          <Edit size={16} />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
