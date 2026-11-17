'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
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
  Award,
  Crown,
  BookOpen,
  LogOut,
  KeyRound,
  Settings,
  Lock,
  Loader2,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { ACADEMIC_BRANCHES } from '@/lib/data/lms-data'
import { PrimaryButton } from '@/components/ui/Buttons'

export default function StudentProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    educationLevel: 'B.Tech / B.E (Engineering)',
    collegeName: '',
    degree: 'Bachelor of Technology',
    branchCode: 'CSE',
    passedOutYear: '2026',
  })

  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  // Protect route
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Sync profile from Clerk user and Supabase database
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        fullName: prev.fullName || user.fullName || user.firstName || '',
        email: user.primaryEmailAddress?.emailAddress || prev.email,
      }))
    }

    async function loadRemoteProfile() {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const data = await res.json()
          if (data?.profile || data?.qualification) {
            setProfile((prev) => ({
              ...prev,
              fullName: data.profile?.full_name || prev.fullName || user?.fullName || '',
              email: data.profile?.email || prev.email || user?.primaryEmailAddress?.emailAddress || '',
              phone: data.profile?.phone || prev.phone,
              collegeName: data.qualification?.college_name || prev.collegeName,
              branchCode: data.qualification?.branch_code || prev.branchCode,
              educationLevel: data.qualification?.education_level || prev.educationLevel,
              degree: data.qualification?.degree || prev.degree,
              passedOutYear: data.qualification?.passed_out_year || prev.passedOutYear,
            }))
            return
          }
        }
      } catch (e) {
        console.warn('Could not fetch remote profile:', e)
      }
    }

    if (isSignedIn) {
      loadRemoteProfile()
    }
  }, [user, isSignedIn])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // Save to database
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
    } catch (e) {
      console.warn('Failed to sync profile to database:', e)
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3500)
  }

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut({ redirectUrl: '/' })
      }
    } catch (e) {}
    router.push('/')
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#092653] mx-auto" />
          <p className="text-xs font-bold text-slate-500">Loading student profile...</p>
        </div>
      </div>
    )
  }

  const currentBranch =
    ACADEMIC_BRANCHES.find((b) => b.code === profile.branchCode) || ACADEMIC_BRANCHES[0]

  const displayName = profile.fullName || user?.fullName || user?.firstName || 'Student'
  const displayEmail = profile.email || user?.primaryEmailAddress?.emailAddress || 'student@saryonaya.edu'

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#102B50] flex flex-col font-sans antialiased selection:bg-[#E9AC32]/30">
      <Navbar />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-20 md:pb-12">
        
        {/* 1. Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Student Photograph */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-[#E9AC32] p-1 overflow-hidden shadow-lg bg-white shrink-0 flex items-center justify-center">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="Student Profile Photo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#092653] to-[#1456A0] text-white flex items-center justify-center font-black text-2xl">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Profile Credentials */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-[#E9AC32]/40 text-[#b87e1a] text-xs font-bold">
                <GraduationCap size={14} />
                <span>{currentBranch.code} • {currentBranch.name}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
                {displayName}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-500 font-medium">
                {profile.collegeName && (
                  <>
                    <span className="flex items-center gap-1">
                      <Building2 size={14} className="text-slate-400" />
                      {profile.collegeName}
                    </span>
                    <span>•</span>
                  </>
                )}
                {profile.passedOutYear && (
                  <>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      Graduation Year: {profile.passedOutYear}
                    </span>
                    <span>•</span>
                  </>
                )}
                <span className="text-[#092653] font-semibold">{profile.educationLevel}</span>
              </div>
            </div>

            {/* Quick Settings Shortcut */}
            <div className="shrink-0">
              <Link href="/settings">
                <button className="px-4 py-2 rounded-full text-xs font-bold text-[#092653] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer">
                  <Settings size={14} />
                  <span>Settings</span>
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* 2. Quick Statistics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {/* Enrolled Courses */}
          <Link
            href="/my-courses"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_3px_14px_rgba(9,38,83,0.04)] hover:shadow-md hover:border-[#1456A0]/40 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1456A0] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen size={22} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Enrolled Courses
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#102B50] block">
                4 Active
              </span>
              <span className="text-[11px] text-[#1456A0] font-semibold">View library →</span>
            </div>
          </Link>

          {/* Certificates */}
          <Link
            href="/certificates"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_3px_14px_rgba(9,38,83,0.04)] hover:shadow-md hover:border-[#E9AC32]/60 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#b87e1a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Award size={22} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Certificates
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#102B50] block">
                1 Verified
              </span>
              <span className="text-[11px] text-[#b87e1a] font-semibold">Download credential →</span>
            </div>
          </Link>

          {/* Membership Status */}
          <Link
            href="/subscriptions"
            className="p-5 rounded-2xl bg-gradient-to-r from-[#061B3A] to-[#092653] text-white border border-slate-800 shadow-[0_3px_14px_rgba(9,38,83,0.1)] hover:brightness-110 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#F8D77A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Crown size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#F8D77A] block">
                Membership Status
              </span>
              <span className="text-lg sm:text-xl font-black text-white block">
                Active Member
              </span>
              <span className="text-[11px] text-slate-300">Upgrade or Manage →</span>
            </div>
          </Link>
        </div>

        {/* 3. Account Section + Academic Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT: Account Status & Actions Card (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)] space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#092653] tracking-wider pb-3 border-b border-slate-100">
                <KeyRound size={16} className="text-[#b87e1a]" />
                <span>Account &amp; Security</span>
              </div>

              {/* Status */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Auth Status</span>
                <span className="font-bold text-[#102B50] flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Active Session
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {displayEmail}
                </span>
              </div>

              {/* Account Quick Links */}
              <div className="space-y-2">
                <Link
                  href="/settings"
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#102B50] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Lock size={14} className="text-slate-400" />
                    <span>Change Password</span>
                  </span>
                  <ArrowRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/settings"
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#102B50] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Settings size={14} className="text-slate-400" />
                    <span>Platform Settings</span>
                  </span>
                  <ArrowRight size={14} className="text-slate-400" />
                </Link>
              </div>

              {/* Logout button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-full text-xs font-black text-rose-600 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/90 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <LogOut size={15} />
                  <span>Log Out of SARYONAYA</span>
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: Academic Profile Edit Form (8 cols) */}
          <form
            onSubmit={handleSave}
            className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)] space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-black text-[#102B50]">
                  Academic &amp; Personal Credentials
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Used for verified certificate issuance and customized course recommendations.
                </p>
              </div>
            </div>

            {saved && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in-50">
                <ShieldCheck size={16} />
                <span>Profile saved successfully!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#E9AC32] focus-within:bg-white transition-all">
                  <User size={15} className="text-slate-400" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500">
                  <Mail size={15} className="text-slate-400" />
                  <input
                    type="email"
                    disabled
                    value={displayEmail}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none cursor-not-allowed text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#E9AC32] focus-within:bg-white transition-all">
                  <Phone size={15} className="text-slate-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Academic Branch</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <GraduationCap size={15} className="text-slate-400" />
                  <select
                    value={profile.branchCode}
                    onChange={(e) => setProfile({ ...profile, branchCode: e.target.value })}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50] cursor-pointer"
                  >
                    {ACADEMIC_BRANCHES.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.code} - {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">College / Institute</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#E9AC32] focus-within:bg-white transition-all">
                  <Building2 size={15} className="text-slate-400" />
                  <input
                    type="text"
                    value={profile.collegeName}
                    onChange={(e) => setProfile({ ...profile, collegeName: e.target.value })}
                    placeholder="Enter College or University Name"
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Passed-Out Year</label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#E9AC32] focus-within:bg-white transition-all">
                  <Calendar size={15} className="text-slate-400" />
                  <input
                    type="text"
                    value={profile.passedOutYear}
                    onChange={(e) => setProfile({ ...profile, passedOutYear: e.target.value })}
                    placeholder="e.g. 2026"
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <PrimaryButton
                type="submit"
                size="md"
                disabled={saving}
                icon={<Save size={15} className="mr-1 text-[#F8D77A]" />}
              >
                {saving ? 'Saving...' : 'Save Academic Profile'}
              </PrimaryButton>
            </div>
          </form>

        </div>

      </main>

      <Footer />
      <BottomNav />
    </div>
  )
}
