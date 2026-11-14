'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Play,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { BottomNav } from '@/components/layout/BottomNav'
import { COURSES_DATA, CourseData } from '@/lib/data/lms-data'

export default function QuizzesPage() {
  const [selectedCourse, setSelectedCourse] = useState<CourseData>(COURSES_DATA[0])
  const [activeQuizIndex, setActiveQuizIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const quiz = selectedCourse.quizzes?.[activeQuizIndex]

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (submitted) return
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIdx]: optionIdx,
    })
  }

  const handleSubmitQuiz = () => {
    if (!quiz) return
    let correctCount = 0
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++
      }
    })
    const finalScore = Math.round((correctCount / quiz.questions.length) * 100)
    setScore(finalScore)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased selection:bg-[#dfa32b]/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8 space-y-5">
        {/* Title banner */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-2">
                <Award size={14} />
                <span>Verified Academic Assessments</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102b46]">
                Course Quizzes & Tests
              </h1>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium mt-1">
                Score 75%+ to qualify for your verified academic certificate.
              </p>
            </div>

            {/* Course Selector Dropdown */}
            <div className="shrink-0">
              <select
                value={selectedCourse.id}
                onChange={(e) => {
                  const found = COURSES_DATA.find((c) => c.id === e.target.value)
                  if (found) {
                    setSelectedCourse(found)
                    handleReset()
                  }
                }}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-[#102b46] text-xs font-bold focus:border-[#e5a93b] outline-none cursor-pointer"
              >
                {COURSES_DATA.filter((c) => c.quizzes && c.quizzes.length > 0).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quiz Container */}
        {quiz ? (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#102b46]">
                  {quiz.title}
                </h2>
                <p className="text-xs text-[#5a7184] font-medium">
                  {quiz.questions.length} Questions • Passing: {quiz.passingScore}%
                </p>
              </div>

              {submitted && (
                <div
                  className={`px-3 py-1 rounded-full text-xs font-black ${
                    score >= quiz.passingScore
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {score >= quiz.passingScore ? 'PASSED' : 'TRY AGAIN'} ({score}%)
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {quiz.questions.map((q, qIdx) => {
                const userAnswer = selectedAnswers[qIdx]
                const isCorrect = userAnswer === q.correctIndex

                return (
                  <div key={q.id} className="space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-[#102b46]">
                      <span className="text-[#c58a23] mr-1.5">{qIdx + 1}.</span>
                      {q.question}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userAnswer === optIdx
                        let styleClass = 'bg-slate-50 border-slate-200 text-[#102b46]'

                        if (submitted) {
                          if (optIdx === q.correctIndex) {
                            styleClass = 'bg-emerald-50 border-emerald-400 text-emerald-800'
                          } else if (isChosen) {
                            styleClass = 'bg-rose-50 border-rose-400 text-rose-800'
                          }
                        } else if (isChosen) {
                          styleClass = 'bg-amber-50/70 border-[#e5a93b] ring-1 ring-[#e5a93b] text-[#102b46]'
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={submitted}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${styleClass}`}
                          >
                            <span>{opt}</span>
                            {submitted && optIdx === q.correctIndex && (
                              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                            )}
                            {submitted && isChosen && optIdx !== q.correctIndex && (
                              <XCircle size={16} className="text-rose-600 shrink-0" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              {submitted ? (
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200 text-[#102b46] hover:bg-slate-50 flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw size={14} />
                  <span>Retry Quiz</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-6 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm disabled:opacity-50 transition-all"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] p-8 text-center text-[#5a7184] border border-slate-100">
            No quiz configured for this course yet.
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
