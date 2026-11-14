'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Layers,
  IndianRupee,
  Video,
  Upload,
  CheckCircle2,
  Plus,
  Trash2,
  FileText,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function CourseBuilderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [published, setPublished] = useState(false)

  // Step 1: Basic Info
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    slug: '',
    tagline: '',
    description: '',
    category: 'Programming',
    level: 'Beginner',
    instructorName: 'Dr. Ramesh Sharma',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  })

  // Step 2: Branch Mapping
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['CSE', 'IT', 'AI_ML'])

  // Step 3: Pricing
  const [pricing, setPricing] = useState({
    isFree: false,
    price: 999,
    originalPrice: 2499,
  })

  // Step 4: Sections & Lessons Builder
  const [sections, setSections] = useState([
    {
      id: 'sec-1',
      title: 'Module 1: Core Fundamentals',
      lessons: [
        {
          id: 'les-1',
          title: 'Lesson 1: Introduction and Environment Setup',
          durationMinutes: 15,
          isFreePreview: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          pdfResource: 'Lecture-01-Notes.pdf',
        },
      ],
    },
  ])

  const toggleBranch = (code: string) => {
    if (selectedBranches.includes(code)) {
      setSelectedBranches(selectedBranches.filter((b) => b !== code))
    } else {
      setSelectedBranches([...selectedBranches, code])
    }
  }

  const addSection = () => {
    const newSecId = `sec-${Date.now()}`
    setSections([
      ...sections,
      {
        id: newSecId,
        title: `Module ${sections.length + 1}: Advanced Topics`,
        lessons: [],
      },
    ])
  }

  const addLesson = (sectionId: string) => {
    setSections(
      sections.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            lessons: [
              ...sec.lessons,
              {
                id: `les-${Date.now()}`,
                title: `New Lesson ${sec.lessons.length + 1}`,
                durationMinutes: 20,
                isFreePreview: false,
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                pdfResource: 'Module-Notes.pdf',
              },
            ],
          }
        }
        return sec
      })
    )
  }

  const handlePublish = () => {
    setPublished(true)
    setTimeout(() => {
      router.push('/admin/courses')
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Course Builder Studio</h1>
          <p className="text-muted text-sm mt-1">
            Build and publish branch-mapped curriculum with Mux video assets and Supabase resources.
          </p>
        </div>
        <Link href="/admin/courses">
          <Button variant="outline" size="sm" className="border-line/30">
            Cancel & Return
          </Button>
        </Link>
      </div>

      {/* Stepper Progress Tabs */}
      <div className="grid grid-cols-4 gap-2 border-b border-line/20 pb-4">
        {[
          { num: 1, label: 'Basic Info', icon: BookOpen },
          { num: 2, label: 'Branch Mapping', icon: Layers },
          { num: 3, label: 'Pricing & Access', icon: IndianRupee },
          { num: 4, label: 'Lessons & Videos', icon: Video },
        ].map((s) => {
          const Icon = s.icon
          const isActive = step === s.num
          const isDone = step > s.num

          return (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isActive
                  ? 'bg-navy border-gold text-gold font-bold shadow'
                  : isDone
                  ? 'bg-navy-soft/60 border-emerald-500/40 text-emerald-400'
                  : 'bg-navy/50 border-line/10 text-muted'
              }`}
            >
              <div className="flex items-center gap-2 text-xs">
                {isDone ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                <span className="hidden sm:inline">Step {s.num}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold mt-1 text-white truncate">{s.label}</p>
            </button>
          )
        })}
      </div>

      {/* Step Content */}
      <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-line/10 pb-3">
              Step 1: Basic Course Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Performance VLSI Design with Verilog"
                  value={basicInfo.title}
                  onChange={(e) =>
                    setBasicInfo({
                      ...basicInfo,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-navy-soft/60 border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Tagline / Short Hook *</label>
                <input
                  type="text"
                  placeholder="e.g. Master synchronous clocking, timing closure and FPGA prototyping."
                  value={basicInfo.tagline}
                  onChange={(e) => setBasicInfo({ ...basicInfo, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-navy-soft/60 border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Category *</label>
                  <select
                    value={basicInfo.category}
                    onChange={(e) => setBasicInfo({ ...basicInfo, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-navy-soft/60 border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none cursor-pointer"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Data Science">Data Science & AI</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Cloud & Systems">Cloud & Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Skill Level *</label>
                  <select
                    value={basicInfo.level}
                    onChange={(e) => setBasicInfo({ ...basicInfo, level: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-navy-soft/60 border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Detailed Syllabus Description</label>
                <textarea
                  rows={4}
                  placeholder="Outline key learning outcomes, prerequisites, and laboratory topics..."
                  value={basicInfo.description}
                  onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-navy-soft/60 border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Branch Mapping */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white border-b border-line/10 pb-3 flex items-center gap-2">
                <GraduationCap className="text-gold" size={20} />
                Step 2: Assign Academic Branches (Course Visibility)
              </h2>
              <p className="text-xs text-muted mt-2">
                Select which engineering disciplines can view, browse, and enroll in this course. You can select one, multiple, or all branches.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {ACADEMIC_BRANCHES.map((b) => {
                const isSelected = selectedBranches.includes(b.code)
                return (
                  <div
                    key={b.code}
                    onClick={() => toggleBranch(b.code)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-gold/15 border-gold shadow-md'
                        : 'bg-navy-soft/40 border-line/15 hover:border-line/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{b.icon}</span>
                      <div>
                        <span className="font-bold text-sm text-white block">
                          {b.code} — {b.name}
                        </span>
                        <span className="text-[11px] text-muted line-clamp-1">{b.description}</span>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center text-xs shrink-0 ${
                        isSelected ? 'bg-gold text-navy-deep border-gold font-bold' : 'border-line/40'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-line/10 pb-3">
              Step 3: Pricing and Payment Rules
            </h2>

            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={pricing.isFree}
                  onChange={(e) => setPricing({ ...pricing, isFree: e.target.checked })}
                  className="w-4 h-4 rounded text-gold focus:ring-gold"
                />
                <label htmlFor="isFree" className="text-sm font-medium text-white cursor-pointer">
                  Offer this course as Free for eligible branch students
                </label>
              </div>

              {!pricing.isFree && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">
                      Course Price (₹ INR) *
                    </label>
                    <input
                      type="number"
                      value={pricing.price}
                      onChange={(e) => setPricing({ ...pricing, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-navy-soft/60 border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">
                      Original Price (₹ INR)
                    </label>
                    <input
                      type="number"
                      value={pricing.originalPrice}
                      onChange={(e) =>
                        setPricing({ ...pricing, originalPrice: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 bg-navy-soft/60 border border-line/20 rounded-xl text-cream text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Curriculum, Sections & Mux Videos */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-line/10 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white">Step 4: Sections & Video Lessons</h2>
                <p className="text-xs text-muted">Upload videos via Mux and PDF notes via Supabase Storage.</p>
              </div>
              <Button variant="gold" size="sm" onClick={addSection} className="text-navy-deep font-bold text-xs flex items-center gap-1">
                <Plus size={14} /> Add Section
              </Button>
            </div>

            <div className="space-y-6">
              {sections.map((sec, secIdx) => (
                <div key={sec.id} className="p-5 rounded-2xl bg-navy-soft/40 border border-line/15 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gold">{sec.title}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addLesson(sec.id)}
                      className="border-line/30 text-xs flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Lesson
                    </Button>
                  </div>

                  {/* Lessons list */}
                  <div className="space-y-3">
                    {sec.lessons.map((les, lesIdx) => (
                      <div
                        key={les.id}
                        className="p-3 bg-navy-deep/70 rounded-xl border border-line/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <Video size={16} className="text-gold" />
                          <div>
                            <span className="font-bold text-white block">{les.title}</span>
                            <span className="text-muted text-[11px]">
                              {les.durationMinutes} mins • {les.pdfResource}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-soft border border-line/20 cursor-pointer hover:border-gold/40 text-[11px] text-cream">
                            <Upload size={12} className="text-gold" />
                            <span>Upload to Mux</span>
                            <input type="file" accept="video/*" className="hidden" />
                          </label>
                          <label className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-soft border border-line/20 cursor-pointer hover:border-gold/40 text-[11px] text-cream">
                            <FileText size={12} className="text-blue-400" />
                            <span>Upload PDF</span>
                            <input type="file" accept=".pdf" className="hidden" />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-line/10">
          {step > 1 ? (
            <Button
              variant="outline"
              size="md"
              onClick={() => setStep(step - 1)}
              className="border-line/30 text-xs flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              variant="gold"
              size="md"
              onClick={() => setStep(step + 1)}
              className="text-navy-deep font-bold text-xs flex items-center gap-1"
            >
              Next Step <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              variant="gold"
              size="lg"
              onClick={handlePublish}
              disabled={published}
              className="text-navy-deep font-bold text-sm flex items-center gap-2 shadow-xl"
            >
              <Sparkles size={16} />
              {published ? 'Publishing Course...' : 'Publish Course to LMS'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

