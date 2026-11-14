'use client'

import { use } from 'react'
import LearnPage from '@/app/learn/[courseId]/[lessonId]/page'
import { COURSES_DATA } from '@/lib/data/lms-data'

interface VideoPageProps {
  params: Promise<{
    id: string
  }>
}

export default function VideoRoutePage({ params }: VideoPageProps) {
  const resolvedParams = use(params)
  const id = resolvedParams.id

  // Find course matching this id or slug, or containing this lesson id
  let matchedCourse = COURSES_DATA.find((c) => c.id === id || c.slug === id)
  let matchedLessonId = matchedCourse?.sections[0]?.lessons[0]?.id || 'les-py-1'

  if (!matchedCourse) {
    // Check if id is a lesson id
    for (const c of COURSES_DATA) {
      for (const s of c.sections) {
        const found = s.lessons.find((l) => l.id === id || l.slug === id)
        if (found) {
          matchedCourse = c
          matchedLessonId = found.id
          break
        }
      }
      if (matchedCourse) break
    }
  }

  const courseId = matchedCourse?.id || COURSES_DATA[0].id

  return (
    <LearnPage
      params={Promise.resolve({
        courseId,
        lessonId: matchedLessonId,
      })}
    />
  )
}

