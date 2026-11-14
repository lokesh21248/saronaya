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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'quiz'>('notes')
  const [completedLessons, setCompletedLessons] = useState<string[]>(['les-py-1'])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const isCurrentCompleted = completedLessons.includes(activeLesson.id)

  const toggleComplete = () => {
    if (isCurrentCompleted) {
      setCompletedLessons(completedLessons.filter((id) => id !== activeLesson.id))
    } else {
      setCompletedLessons([...completedLessons, activeLesson.id])
    }
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
    }
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div className="min-h-screen bg-navy-deep text-cream flex flex-col">
      {/* Top Learning Navigation Bar */}
      <header className="bg-navy border-b border-line/20 px-4 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/student/dashboard"
            className="p-2 rounded-lg bg-navy-soft/60 hover:bg-navy-soft text-cream transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block">
              {course.title}
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {activeLesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-navy-soft/60 rounded-full border border-line/10 text-xs text-muted">
            <BookOpen size={14} className="text-gold" />
            <span>
              {completedLessons.length} of {allLessons.length} completed
            </span>
          </div>

          <Button
            variant={isCurrentCompleted ? 'outline' : 'gold'}
            size="sm"
            onClick={toggleComplete}
            className="flex items-center gap-1.5 text-xs font-semibold"
          >
            <CheckCircle2 size={16} className={isCurrentCompleted ? 'text-emerald-400' : ''} />
            <span className="hidden sm:inline">
              {isCurrentCompleted ? 'Completed' : 'Mark Complete'}
            </span>
          </Button>

          {/* Mobile sidebar toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-cream"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </header>

      {/* Main Learning Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Video Player & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Player Box */}
          <div className="relative bg-black aspect-video w-full max-h-[68vh] flex items-center justify-center overflow-hidden">
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
          <div className="bg-navy border-b border-line/20 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-bold text-white">
                {activeLesson.title}
              </h2>
              <span className="text-xs text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/30">
                {activeLesson.durationMinutes} mins
              </span>
            </div>

            <div className="flex items-center gap-3">
              {prevLesson ? (
                <Link href={`/learn/${course.id}/${prevLesson.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 border-line/30 text-xs">
                    <ChevronLeft size={16} /> Previous
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled className="opacity-40 text-xs">
                  <ChevronLeft size={16} /> Previous
                </Button>
              )}

              {nextLesson ? (
                <Link href={`/learn/${course.id}/${nextLesson.id}`}>
                  <Button variant="gold" size="sm" className="flex items-center gap-1 text-navy-deep font-bold text-xs">
                    Next <ChevronRight size={16} />
                  </Button>
                </Link>
              ) : (
                <Link href={`/student/quizzes?courseId=${course.id}`}>
                  <Button variant="gold" size="sm" className="flex items-center gap-1 text-navy-deep font-bold text-xs">
                    Take Quiz <Sparkles size={14} />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Tabs: Notes / PDF Resources / Quiz */}
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex border-b border-line/20 gap-6">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'notes'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-muted hover:text-cream'
                }`}
              >
                <BookOpen size={16} /> Lesson Notes
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'resources'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-muted hover:text-cream'
                }`}
              >
                <Download size={16} /> PDF Resources & Downloads
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'quiz'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-muted hover:text-cream'
                }`}
              >
                <HelpCircle size={16} /> Course Quiz
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'notes' && (
              <div className="bg-navy border border-line/20 rounded-xl p-5 space-y-4">
                <h3 className="text-base font-bold text-white">Summary & Key Concepts</h3>
                <p className="text-sm text-cream/90 leading-relaxed">
                  In this lesson of <span className="text-gold font-semibold">{course.title}</span>, we explore the core principles essential for engineering applications. Pay close attention to standard syntax, memory models, time complexity trade-offs, and practical debugging methods.
                </p>
                <div className="bg-navy-soft/60 border border-line/15 rounded-lg p-4 text-xs space-y-2 text-muted">
                  <p className="font-semibold text-white">Key Takeaways:</p>
                  <ul className="list-disc list-inside space-y-1 text-cream/80">
                    <li>Understand runtime environment and environment variables.</li>
                    <li>Follow modular coding standards and clear variable naming conventions.</li>
                    <li>Complete the interactive quiz after completing all lessons in this section.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="bg-navy border border-line/20 rounded-xl p-5 space-y-4">
                <h3 className="text-base font-bold text-white">Downloadable Study Materials</h3>
                <p className="text-xs text-muted">
                  Stored securely in Supabase Storage. Click to download lecture slides, reference cheat sheets, and source code.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-navy-soft/50 border border-line/10 rounded-lg hover:border-gold/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-gold/15 text-gold">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {activeLesson.pdfNotesName || 'Lecture-Notes-Summary.pdf'}
                        </p>
                        <span className="text-xs text-muted">PDF Document • 2.4 MB</span>
                      </div>
                    </div>

                    <a
                      href={activeLesson.pdfNotesUrl || '#'}
                      download
                      className="px-3 py-1.5 rounded-lg bg-navy-deep hover:bg-gold hover:text-navy-deep text-gold text-xs font-semibold border border-gold/30 transition-colors flex items-center gap-1.5"
                    >
                      <Download size={14} /> Download
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-navy-soft/50 border border-line/10 rounded-lg hover:border-gold/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-blue-500/15 text-blue-400">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Saryonaya-Engineering-Formula-Sheet.pdf
                        </p>
                        <span className="text-xs text-muted">PDF Document • 1.8 MB</span>
                      </div>
                    </div>

                    <button
                      className="px-3 py-1.5 rounded-lg bg-navy-deep hover:bg-gold hover:text-navy-deep text-gold text-xs font-semibold border border-gold/30 transition-colors flex items-center gap-1.5"
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="bg-navy border border-line/20 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Course Assessment Quiz</h3>
                    <p className="text-xs text-muted">
                      Pass with 75% or higher to earn your verified certificate.
                    </p>
                  </div>
                  <Link href={`/student/quizzes?courseId=${course.id}`}>
                    <Button variant="gold" size="sm" className="font-bold text-navy-deep">
                      Start Quiz
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Course Curriculum & Lesson List Sidebar */}
        <div
          className={`lg:w-96 bg-navy border-l border-line/20 flex flex-col shrink-0 ${
            isSidebarOpen ? 'fixed inset-0 z-50 overflow-y-auto' : 'hidden lg:flex'
          }`}
        >
          {isSidebarOpen && (
            <div className="p-4 border-b border-line/20 flex items-center justify-between lg:hidden">
              <span className="font-bold text-white">Course Curriculum</span>
              <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
                <X size={20} />
              </Button>
            </div>
          )}

          <div className="p-4 border-b border-line/20 bg-navy-glow/20">
            <h3 className="font-bold text-white text-sm">Course Content</h3>
            <div className="flex items-center justify-between text-xs text-muted mt-1.5">
              <span>{course.sections.length} Sections</span>
              <span>{allLessons.length} Lessons ({course.durationHours}h total)</span>
            </div>
            {/* Overall progress bar */}
            <div className="mt-3">
              <div className="h-1.5 w-full bg-navy-deep rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300"
                  style={{
                    width: `${Math.round((completedLessons.length / allLessons.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-line/10">
            {course.sections.map((section, sIdx) => (
              <div key={section.id} className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gold uppercase tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson.id
                    const isDone = completedLessons.includes(lesson.id)

                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${course.id}/${lesson.id}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                          isActive
                            ? 'bg-navy-soft border-l-4 border-gold'
                            : 'hover:bg-navy-soft/40'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 size={16} className="text-emerald-400" />
                          ) : isActive ? (
                            <Play size={16} className="text-gold fill-gold" />
                          ) : (
                            <Circle size={16} className="text-muted" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-xs font-medium leading-tight ${
                              isActive ? 'text-gold font-bold' : 'text-cream'
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <span className="text-[11px] text-muted block mt-1">
                            {lesson.durationMinutes} mins {lesson.isFreePreview && '• Free Preview'}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
