'use client'

import React, { useState, useRef, useEffect, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  BookOpen,
  HelpCircle,
  Maximize,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Menu,
  X,
  Award,
  Bell,
  Clock,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { MuxVideoPlayer } from '@/components/video/MuxVideoPlayer'
import { COURSES_DATA, CourseData, LessonData } from '@/lib/data/lms-data'

interface LearnPageProps {
  params: Promise<{
    courseId: string
    lessonId: string
  }>
}

export default function LearnPage({ params }: LearnPageProps) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { courseId, lessonId } = resolvedParams

  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0]

  // Flatten all lessons across sections for linear navigation
  const allLessons: LessonData[] = course.sections.flatMap((s) => s.lessons)
  const currentLessonIndex = allLessons.findIndex((l) => l.id === lessonId)
  const activeLesson = currentLessonIndex !== -1 ? allLessons[currentLessonIndex] : allLessons[0]

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null

  // State
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'quiz'>('notes')
  const [completedLessons, setCompletedLessons] = useState<string[]>(['les-py-1', 'les-py-2'])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const isCurrentCompleted = completedLessons.includes(activeLesson.id)

  const toggleComplete = () => {
    if (isCurrentCompleted) {
      setCompletedLessons(completedLessons.filter((id) => id !== activeLesson.id))
    } else {
      setCompletedLessons([...completedLessons, activeLesson.id])
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] flex flex-col font-sans antialiased selection:bg-[#e5a93b]/30">
      {/* Top Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 h-16 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/student/courses"
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#102b46] transition-colors border border-slate-200/80"
            title="Back to My Courses"
          >
            <ArrowLeft size={18} />
          </Link>

          <SaryonayaLogo size="sm" />

          <div className="hidden md:block pl-3 border-l border-slate-200">
            <span className="text-[10px] font-black text-[#c58a23] uppercase tracking-wider block">
              {course.title}
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-[#102b46] line-clamp-1">
              {activeLesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-[#e5a93b]/30 text-xs font-bold text-[#c58a23]">
            <BookOpen size={14} />
            <span>
              {completedLessons.length} of {allLessons.length} completed
            </span>
          </div>

          <button
            onClick={toggleComplete}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isCurrentCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105'
            }`}
          >
            <CheckCircle2 size={15} />
            <span className="hidden sm:inline">
              {isCurrentCompleted ? 'Completed' : 'Mark Complete'}
            </span>
          </button>

          {/* Mobile playlist drawer toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-[#102b46]"
            aria-label="Toggle Syllabus"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main Learning Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Video Player & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Player Box */}
          <div className="relative bg-black aspect-video w-full max-h-[68vh] flex items-center justify-center overflow-hidden shadow-md">
            <MuxVideoPlayer
              playbackId={activeLesson.muxPlaybackId}
              videoUrl={activeLesson.videoUrl}
              title={activeLesson.title}
              onEnded={() => {
                if (!completedLessons.includes(activeLesson.id)) {
                  setCompletedLessons((prev) => [...prev, activeLesson.id])
                }
              }}
            />
          </div>

          {/* Lesson Action Controls & Navigation */}
          <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-black text-[#102b46]">
                {activeLesson.title}
              </h2>
              <span className="text-xs font-bold text-[#c58a23] px-2.5 py-0.5 rounded-full bg-amber-50 border border-[#e5a93b]/40">
                {activeLesson.durationMinutes} mins
              </span>
            </div>

            <div className="flex items-center gap-2">
              {prevLesson ? (
                <Link href={`/learn/${course.id}/${prevLesson.id}`}>
                  <button className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-[#102b46] hover:bg-slate-50 flex items-center gap-1">
                    <ChevronLeft size={16} /> Previous
                  </button>
                </Link>
              ) : (
                <button disabled className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-300 opacity-50 cursor-not-allowed flex items-center gap-1">
                  <ChevronLeft size={16} /> Previous
                </button>
              )}

              {nextLesson ? (
                <Link href={`/learn/${course.id}/${nextLesson.id}`}>
                  <button className="px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center gap-1">
                    Next <ChevronRight size={16} />
                  </button>
                </Link>
              ) : (
                <Link href={`/student/quizzes?courseId=${course.id}`}>
                  <button className="px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center gap-1">
                    Take Quiz <Sparkles size={13} />
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Tabs: Notes / PDF Resources / Quiz */}
          <div className="p-4 sm:p-6 space-y-5">
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'notes'
                    ? 'border-[#e5a93b] text-[#c58a23]'
                    : 'border-transparent text-slate-400 hover:text-[#102b46]'
                }`}
              >
                <BookOpen size={16} /> Lesson Notes
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'resources'
                    ? 'border-[#e5a93b] text-[#c58a23]'
                    : 'border-transparent text-slate-400 hover:text-[#102b46]'
                }`}
              >
                <Download size={16} /> PDF Resources & Downloads
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'quiz'
                    ? 'border-[#e5a93b] text-[#c58a23]'
                    : 'border-transparent text-slate-400 hover:text-[#102b46]'
                }`}
              >
                <HelpCircle size={16} /> Course Quiz
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'notes' && (
              <div className="bg-white border border-slate-100 rounded-[24px] p-6 space-y-4 shadow-[0_4px_20px_rgba(16,43,70,0.04)]">
                <h3 className="text-base font-black text-[#102b46]">Summary & Key Concepts</h3>
                <p className="text-xs sm:text-sm text-[#5a7184] leading-relaxed">
                  In this lesson of <span className="text-[#c58a23] font-bold">{course.title}</span>, we explore the core principles essential for engineering applications. Pay close attention to standard syntax, memory models, time complexity trade-offs, and practical debugging methods.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs space-y-2 text-[#5a7184]">
                  <p className="font-bold text-[#102b46]">Key Takeaways:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Understand runtime environment and environment variables.</li>
                    <li>Follow modular coding standards and clear variable naming conventions.</li>
                    <li>Complete the interactive quiz after completing all lessons in this section.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="bg-white border border-slate-100 rounded-[24px] p-6 space-y-4 shadow-[0_4px_20px_rgba(16,43,70,0.04)]">
                <h3 className="text-base font-black text-[#102b46]">Downloadable Study Materials</h3>
                <p className="text-xs text-[#5a7184]">
                  Stored securely in Supabase Storage. Click to download lecture slides, reference cheat sheets, and source code.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#e5a93b]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-50 text-[#c58a23]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#102b46]">
                          {activeLesson.pdfNotesName || 'Lecture-Notes-Summary.pdf'}
                        </p>
                        <span className="text-[11px] text-slate-400">PDF Document • 2.4 MB</span>
                      </div>
                    </div>

                    <a
                      href={activeLesson.pdfNotesUrl || '#'}
                      download
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-50 text-[#c58a23] text-xs font-bold border border-[#e5a93b]/40 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Download size={14} /> Download
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="bg-white border border-slate-100 rounded-[24px] p-6 space-y-4 shadow-[0_4px_20px_rgba(16,43,70,0.04)]">
                <h3 className="text-base font-black text-[#102b46]">Course Knowledge Assessment</h3>
                <p className="text-xs text-[#5a7184]">
                  Test your understanding of the concepts covered in {course.title}. Passing qualifies you for the verified certificate.
                </p>
                <Link href={`/student/quizzes?courseId=${course.id}`}>
                  <button className="px-5 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center gap-2">
                    <Award size={15} />
                    <span>Launch Assessment Quiz</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: Course Curriculum Playlist Sidebar */}
        <aside
          className={`lg:w-80 xl:w-96 bg-white border-l border-slate-100 flex flex-col shrink-0 lg:static fixed inset-y-16 right-0 z-30 transition-transform shadow-lg lg:shadow-none ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-black text-[#102b46] uppercase tracking-wider">
              Course Content
            </h3>
            <span className="text-[11px] font-bold text-[#c58a23]">
              {completedLessons.length}/{allLessons.length} Done
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {course.sections.map((section, sIdx) => (
              <div key={section.id} className="space-y-1.5">
                <div className="px-2 py-1 text-[11px] font-black uppercase text-slate-400">
                  Section {sIdx + 1}: {section.title}
                </div>

                <div className="space-y-1">
                  {section.lessons.map((lesson) => {
                    const isSelected = lesson.id === activeLesson.id
                    const isCompleted = completedLessons.includes(lesson.id)

                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${course.id}/${lesson.id}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-start gap-2.5 p-2.5 rounded-2xl text-xs transition-all ${
                          isSelected
                            ? 'bg-amber-50/70 border border-[#e5a93b] text-[#102b46] font-bold shadow-sm'
                            : 'hover:bg-slate-50 text-[#5a7184]'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 size={16} className="text-emerald-600" />
                          ) : isSelected ? (
                            <Play size={14} className="fill-[#c58a23] text-[#c58a23]" />
                          ) : (
                            <Circle size={15} className="text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="line-clamp-1">{lesson.title}</p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {lesson.durationMinutes} mins
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
