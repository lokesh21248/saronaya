'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, Clock, PlayCircle, Award, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
import { COURSES_DATA } from '@/lib/data/lms-data'

export default function StudentCoursesPage() {
  const enrolledCourses = [
    { ...COURSES_DATA[0], progress: 65, completedLessons: 4, totalLessons: 6 },
    { ...COURSES_DATA[1], progress: 30, completedLessons: 2, totalLessons: 5 },
  ]

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Enrolled Courses</h1>
            <p className="text-muted text-sm mt-1">
              Resume your active courses and track your lesson completions.
            </p>
          </div>
          <Link href="/courses">
            <Button variant="gold" size="sm" className="font-bold text-navy-deep">
              Explore More Courses
            </Button>
          </Link>
        </div>

        {/* Courses List */}
        <div className="grid md:grid-cols-2 gap-6">
          {enrolledCourses.map((c) => (
            <div
              key={c.id}
              className="bg-navy border border-line/20 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between hover:border-gold/40 transition-colors"
            >
              <div>
                <div className="relative h-48 bg-navy-soft">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-navy-deep/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-gold border border-gold/30">
                    {c.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h2 className="text-lg font-bold text-white">{c.title}</h2>
                  <p className="text-xs text-muted line-clamp-2">{c.description}</p>

                  {/* Progress info */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-muted">
                        {c.completedLessons} of {c.totalLessons} lessons completed
                      </span>
                      <span className="text-gold font-bold">{c.progress}%</span>
                    </div>
                    <div className="h-2 bg-navy-deep rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link href={`/learn/${c.id}/${c.sections[0].lessons[0].id}`}>
                  <Button variant="gold" size="md" className="w-full flex items-center justify-center gap-2 font-bold text-navy-deep">
                    <PlayCircle size={18} />
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
