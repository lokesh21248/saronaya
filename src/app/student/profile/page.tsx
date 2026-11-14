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

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/courses' },
    { label: 'Progress', href: '/student/progress' },
    { label: 'Certificates', href: '/student/certificates' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0d2238] pb-24 md:pb-12 font-sans antialiased selection:bg-[#e5a93b]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 space-y-5 sm:space-y-6 md:space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between py-2 border-b border-transparent md:border-slate-100 md:pb-4">
          <div className="flex items-center gap-6">
            <SaryonayaLogo size="md" />

            <nav className="hidden lg:flex items-center gap-1.5 ml-4">
              {navLinks.map((link) => {
                const isActive = link.href === '/student/profile'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-50 text-[#c58a23] border border-[#e5a93b]/40'
                        : 'text-[#102b46]/80 hover:text-[#102b46] hover:bg-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/pricing"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0e2742] to-[#123963] text-amber-300 text-xs font-bold shadow-sm"
            >
              <Crown size={13} className="text-[#f5c465]" />
              <span>Go Premium</span>
            </Link>

            <Link
              href="/student/progress"
              className="relative p-2.5 rounded-full bg-white shadow-sm border border-slate-100 text-[#102b46] hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={19} strokeWidth={2.2} />
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

        {/* Responsive 2-Col Layout on Laptop: Profile Card on Left (4 cols), Form on Right (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Profile Card Summary (4 cols on laptop) */}
          <div className="lg:col-span-4 bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-7 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full ring-4 ring-[#e5a93b] p-1 overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                alt="Student Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-[#e5a93b]/40 text-[#c58a23] text-xs font-bold mb-1">
                <GraduationCap size={13} />
                <span>{currentBranch.code} • {currentBranch.name}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102b46]">
                {profile.fullName}
              </h1>
              <p className="text-xs text-[#5a7184] font-medium">
                {profile.email}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {profile.collegeName}
              </p>
            </div>

            {/* Quick Shortcuts */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 mt-4">
              <Link
                href="/student/certificates"
                className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
              >
                <Award size={18} className="mx-auto text-[#c58a23] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-[#102b46] mt-1 block">1 Certificate</span>
              </Link>
              <Link
                href="/student/courses"
                className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
              >
                <BookOpen size={18} className="mx-auto text-[#102b46] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-[#102b46] mt-1 block">3 Courses</span>
              </Link>
              <Link
                href="/pricing"
                className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
              >
                <Crown size={18} className="mx-auto text-[#c58a23] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-[#102b46] mt-1 block">Go Premium</span>
              </Link>
            </div>
          </div>

          {/* Academic Details Form (8 cols on laptop) */}
          <form
            onSubmit={handleSave}
            className="lg:col-span-8 bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(16,43,70,0.05)] space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-black text-[#102b46]">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div className="pt-3">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#d99222] via-[#e5a93b] to-[#f5c465] text-[#102b46] hover:brightness-105 shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Save size={15} />
                <span>Save Academic Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
