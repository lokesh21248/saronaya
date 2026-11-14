'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Save,
  Bell,
  Award,
  Crown,
  BookOpen,
  ChevronRight,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { BottomNav } from '@/components/layout/BottomNav'
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

  const currentBranch = ACADEMIC_BRANCHES.find((b) => b.code === profile.branchCode) || ACADEMIC_BRANCHES[0]

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 font-sans antialiased selection:bg-[#e5a93b]/30">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 pt-3 space-y-5">
        {/* Header */}
        <header className="flex items-center justify-between py-2">
          <SaryonayaLogo size="md" />

          <div className="flex items-center gap-3">
            <Link
              href="/student/progress"
              className="relative p-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-[#102b46] hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={2.2} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </Link>

            <div className="w-10 h-10 rounded-full ring-2 ring-[#e5a93b] p-0.5 overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Student Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Profile Card Summary */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 rounded-full ring-4 ring-[#e5a93b] p-1 overflow-hidden shadow-md shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Student Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-1">
                <GraduationCap size={13} />
                <span>{currentBranch.code} • {currentBranch.name}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102b46]">
                {profile.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-[#5a7184] font-medium">
                {profile.email} • {profile.collegeName}
              </p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 mt-6">
            <Link
              href="/student/certificates"
              className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
            >
              <Award size={20} className="mx-auto text-[#c58a23] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#102b46] mt-1 block">1 Certificate</span>
            </Link>
            <Link
              href="/student/courses"
              className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
            >
              <BookOpen size={20} className="mx-auto text-[#102b46] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#102b46] mt-1 block">3 Courses</span>
            </Link>
            <Link
              href="/pricing"
              className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
            >
              <Crown size={20} className="mx-auto text-[#c58a23] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold text-[#102b46] mt-1 block">Go Premium</span>
            </Link>
          </div>
        </div>

        {/* Academic Details Form */}
        <form
          onSubmit={handleSave}
          className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#102b46]">
                Academic & Personal Information
              </h2>
              <p className="text-xs text-[#5a7184] font-medium">
                Used to issue official certificates and customize course recommendations
              </p>
            </div>
          </div>

          {saved && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>Profile and Academic Branch saved successfully!</span>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102b46] mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#102b46] focus:border-[#e5a93b] focus:bg-white outline-none font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102b46] mb-1.5">Email Address</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-400 font-medium cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102b46] mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#102b46] focus:border-[#e5a93b] focus:bg-white outline-none font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102b46] mb-1.5">Academic Branch</label>
              <select
                value={profile.branchCode}
                onChange={(e) => setProfile({ ...profile, branchCode: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#102b46] focus:border-[#e5a93b] focus:bg-white outline-none font-medium transition-all cursor-pointer"
              >
                {ACADEMIC_BRANCHES.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.code} - {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102b46] mb-1.5">College / Institute</label>
              <input
                type="text"
                value={profile.collegeName}
                onChange={(e) => setProfile({ ...profile, collegeName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#102b46] focus:border-[#e5a93b] focus:bg-white outline-none font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102b46] mb-1.5">Expected Graduation Year</label>
              <input
                type="text"
                value={profile.passedOutYear}
                onChange={(e) => setProfile({ ...profile, passedOutYear: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#102b46] focus:border-[#e5a93b] focus:bg-white outline-none font-medium transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Save size={15} />
              <span>Save Academic Profile</span>
            </button>
          </div>
        </form>
      </div>

      <BottomNav />
    </div>
  )
}
