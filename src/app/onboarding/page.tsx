'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { GraduationCap, BookOpen, Building2, Calendar, Phone, Mail, User, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    educationLevel: 'B.Tech / B.E.',
    collegeName: '',
    degree: 'Bachelor of Technology',
    branchCode: 'CSE',
    passedOutYear: '2026',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Store in localStorage for instant client-side responsiveness
      localStorage.setItem('saryonaya_user_branch', formData.branchCode)
      localStorage.setItem('saryonaya_user_college', formData.collegeName)
      localStorage.setItem('saryonaya_user_profile', JSON.stringify(formData))

      // Send to backend API to persist in Supabase
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          clerkUserId: user?.id,
        }),
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/student/dashboard')
      }, 1000)
    } catch (err) {
      console.error('Failed to save profile:', err)
      // Fallback: still navigate
      router.push('/student/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-deep text-cream py-12 px-4 flex flex-col items-center justify-center">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-navy-deep font-black text-lg shadow-lg">
            S
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">SARYONAYA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Complete Your Academic Profile</h1>
        <p className="text-muted text-sm sm:text-base mt-2 max-w-md mx-auto">
          We curate branch-specific engineering courses, lesson roadmaps and verified certificates based on your academic path.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {success ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 size={56} className="text-gold mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-white">Academic Profile Saved!</h2>
            <p className="text-muted">Curating courses for your selected branch...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Info */}
            <div className="border-b border-line/10 pb-5">
              <h3 className="text-sm uppercase tracking-wider text-gold font-semibold mb-4 flex items-center gap-2">
                <User size={16} /> Personal Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-muted" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Naveen Kumar"
                      className="w-full pl-9 pr-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream placeholder-muted text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-3 text-muted" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream placeholder-muted text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-muted" />
                    <input
                      type="email"
                      disabled
                      value={formData.email || user?.primaryEmailAddress?.emailAddress || ''}
                      className="w-full pl-9 pr-3 py-2.5 bg-navy-soft/30 border border-line/10 rounded-lg text-muted text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Academic Details */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-gold font-semibold mb-4 flex items-center gap-2">
                <GraduationCap size={16} /> Academic Background
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Academic Branch *</label>
                  <div className="relative">
                    <select
                      value={formData.branchCode}
                      onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                      className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none cursor-pointer"
                    >
                      {ACADEMIC_BRANCHES.map((b) => (
                        <option key={b.code} value={b.code} className="bg-navy text-cream">
                          {b.icon} {b.code} — {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-muted mt-1">Courses will be filtered for your branch.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Education Level *</label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none cursor-pointer"
                  >
                    <option value="B.Tech / B.E." className="bg-navy text-cream">B.Tech / B.E.</option>
                    <option value="M.Tech" className="bg-navy text-cream">M.Tech / M.E.</option>
                    <option value="MCA" className="bg-navy text-cream">MCA / M.Sc</option>
                    <option value="Diploma" className="bg-navy text-cream">Diploma Engineering</option>
                    <option value="Other" className="bg-navy text-cream">Other Degree</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted mb-1.5">College / University Name *</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-3 text-muted" />
                    <input
                      type="text"
                      required
                      value={formData.collegeName}
                      onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      placeholder="e.g. JNTU College of Engineering / IIT Madras"
                      className="w-full pl-9 pr-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream placeholder-muted text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Degree / Course *</label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="e.g. Computer Science Engineering"
                    className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream placeholder-muted text-sm focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Graduation / Pass-out Year *</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-3 text-muted" />
                    <select
                      value={formData.passedOutYear}
                      onChange={(e) => setFormData({ ...formData, passedOutYear: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none cursor-pointer"
                    >
                      {[2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                        <option key={year} value={year} className="bg-navy text-cream">
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-4 font-bold text-navy-deep hover:bg-gold-light"
            >
              {loading ? 'Saving Profile...' : 'Save & Enter Student Dashboard'}
              <ArrowRight size={18} />
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
