'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
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
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold mb-3">
              <Award size={14} />
              <span>Verified Academic Assessments</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Course Quizzes & Tests</h1>
            <p className="text-muted text-sm mt-1 max-w-xl">
              Complete course assessments with a passing score of 75%+ to qualify for your verified academic certificate.
            </p>
          </div>

          {/* Course Selector Dropdown */}
          <div className="shrink-0">
            <label className="block text-xs font-medium text-muted mb-1.5">Select Course Assessment</label>
            <select
              value={selectedCourse.id}
              onChange={(e) => {
                const found = COURSES_DATA.find((c) => c.id === e.target.value)
                if (found) {
                  setSelectedCourse(found)
                  handleReset()
                }
              }}
              className="px-4 py-2.5 bg-navy-soft border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none cursor-pointer"
            >
              {COURSES_DATA.filter((c) => c.quizzes && c.quizzes.length > 0).map((c) => (
                <option key={c.id} value={c.id} className="bg-navy text-cream">
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quiz Area */}
        {quiz ? (
          <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line/10">
              <div>
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  Assessment Module
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{quiz.title}</h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-muted">
                <span className="flex items-center gap-1.5 bg-navy-soft px-3 py-1.5 rounded-lg">
                  <Clock size={14} className="text-gold" /> {quiz.questions.length * 2} Mins
                </span>
                <span className="flex items-center gap-1.5 bg-navy-soft px-3 py-1.5 rounded-lg">
                  <ShieldCheck size={14} className="text-emerald-400" /> Passing: {quiz.passingScore}%
                </span>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {quiz.questions.map((q, qIdx) => {
                const isAnswered = selectedAnswers[qIdx] !== undefined
                const isCorrect = isAnswered && selectedAnswers[qIdx] === q.correctIndex

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-navy-soft/40 border border-line/10 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-bold text-base text-white">
                        <span className="text-gold mr-2 font-mono">Q{qIdx + 1}.</span>
                        {q.question}
                      </h3>
                      {submitted && (
                        <div>
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">
                              <CheckCircle2 size={14} /> Correct (+1)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-400 text-xs font-bold bg-rose-500/10 px-2 py-1 rounded">
                              <XCircle size={14} /> Incorrect
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[qIdx] === optIdx
                        let btnStyle = 'border-line/20 hover:border-gold/50 bg-navy-deep/60 text-cream'

                        if (submitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300 font-semibold'
                          } else if (isSelected && optIdx !== q.correctIndex) {
                            btnStyle = 'border-rose-500/60 bg-rose-500/15 text-rose-300'
                          }
                        } else if (isSelected) {
                          btnStyle = 'border-gold bg-gold/15 text-gold font-semibold'
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={submitted}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            <span className="w-5 h-5 rounded-full border border-line/30 flex items-center justify-center text-[10px] ml-2 shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {submitted && (
                      <div className="p-3 bg-navy-deep/80 rounded-lg text-xs text-muted border-l-2 border-gold mt-2">
                        <span className="font-semibold text-gold">Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Submission / Results Card */}
            {!submitted ? (
              <div className="pt-4 flex items-center justify-between border-t border-line/10">
                <span className="text-xs text-muted">
                  Answered {Object.keys(selectedAnswers).length} of {quiz.questions.length} questions
                </span>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
                  className="font-bold text-navy-deep"
                >
                  Submit Assessment
                </Button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-navy to-navy-soft border border-line/20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto text-gold">
                  <Award size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    Your Score: {score}%
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    {score >= quiz.passingScore
                      ? '🎉 Congratulations! You have successfully passed this assessment.'
                      : 'You need 75% or higher to qualify for your certificate. Review the lesson notes and try again!'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={handleReset} className="border-line/30">
                    <RotateCcw size={16} /> Retake Quiz
                  </Button>
                  {score >= quiz.passingScore && (
                    <Link href="/student/certificates">
                      <Button variant="gold" size="sm" className="font-bold text-navy-deep">
                        View Certificate <ArrowRight size={16} />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center text-muted bg-navy rounded-2xl border border-line/20">
            No quiz available for this course yet.
          </div>
        )}
      </main>
    </div>
  )
}
