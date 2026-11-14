import { redirect } from 'next/navigation'
import { COURSES_DATA } from '@/lib/data/lms-data'

interface LearnRedirectProps {
  params: Promise<{
    courseId: string
  }>
}

export default async function LearnRedirect({ params }: LearnRedirectProps) {
  const { courseId } = await params
  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0]
  const firstLessonId = course.sections[0]?.lessons[0]?.id || 'les-py-1'

  redirect(`/learn/${course.id}/${firstLessonId}`)
}
