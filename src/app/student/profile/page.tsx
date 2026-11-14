'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { User, Mail, Phone, GraduationCap, Building2, Calendar, ShieldCheck, ArrowRight, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StudentTopNav } from '@/components/student-top-nav'
import { ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function StudentProfilePage() {
  const { user } = useUser()

  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Naveen Kumar',
    email: user?.primaryEmailAddress?.emailAddress || 'student@saryonaya.com',
    phone: '+91 98765 43210',
    educationLevel: 'B.Tech / B.E.',
    collegeName: 'JNTU College of Engineering',
    degree: 'Bachelor of Technology',
    branchCode: 'CSE',
    passedOutYear: '2026',
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedBranch = localStorage.getItem('saryonaya_user_branch')
    const savedCollege = localStorage.getItem('saryonaya_user_college')
    const savedProfileStr = localStorage.getItem('saryonaya_user_profile')

    if (savedProfileStr) {
      try {
        setProfile((prev) => ({ ...prev, ...JSON.parse(savedProfileStr) }))
      } catch {}
    } else {
      if (savedBranch) setProfile((prev) => ({ ...prev, branchCode: savedBranch }))
      if (savedCollege) setProfile((prev) => ({ ...prev, collegeName: savedCollege }))
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('saryonaya_user_branch', profile.branchCode)
    localStorage.setItem('saryonaya_user_college', profile.collegeName)
    localStorage.setItem('saryonaya_user_profile', JSON.stringify(profile))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-navy-deep text-cream">
      <StudentTopNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Student Academic Profile</h1>
            <p className="text-muted text-sm mt-1">
              Your academic branch determines course eligibility, curriculum roadmaps, and certification authority.
            </p>
          </div>
          <Link href="/student/dashboard">
            <Button variant="outline" size="sm" className="border-line/30">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSave} className="bg-navy border border-line/20 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          {saved && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2">
              <ShieldCheck size={18} />
              Profile and Academic Branch updated successfully!
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Email Address</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full px-3 py-2.5 bg-navy-soft/30 border border-line/10 rounded-lg text-muted text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Engineering Branch</label>
              <select
                value={profile.branchCode}
                onChange={(e) => setProfile({ ...profile, branchCode: e.target.value })}
                className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none cursor-pointer"
              >
                {ACADEMIC_BRANCHES.map((b) => (
                  <option key={b.code} value={b.code} className="bg-navy text-cream">
                    {b.code} — {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1.5">College / Institute</label>
              <input
                type="text"
                value={profile.collegeName}
                onChange={(e) => setProfile({ ...profile, collegeName: e.target.value })}
                className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Education Level</label>
              <select
                value={profile.educationLevel}
                onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none cursor-pointer"
              >
                <option value="B.Tech / B.E." className="bg-navy text-cream">B.Tech / B.E.</option>
                <option value="M.Tech" className="bg-navy text-cream">M.Tech</option>
                <option value="MCA" className="bg-navy text-cream">MCA</option>
                <option value="Diploma" className="bg-navy text-cream">Diploma Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Graduation Year</label>
              <select
                value={profile.passedOutYear}
                onChange={(e) => setProfile({ ...profile, passedOutYear: e.target.value })}
                className="w-full px-3 py-2.5 bg-navy-soft/60 border border-line/20 rounded-lg text-cream text-sm focus:border-gold outline-none cursor-pointer"
              >
                {[2023, 2024, 2025, 2026, 2027, 2028, 2029].map((year) => (
                  <option key={year} value={year} className="bg-navy text-cream">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="gold" size="lg" className="flex items-center gap-2 font-bold text-navy-deep">
              <Save size={18} />
              Save Academic Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
