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
  Bell,
  Award,
  Crown,
  BookOpen,
  ChevronRight,
  LogOut,
  LogIn,
  KeyRound,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BottomNav } from '@/components/layout/BottomNav'
import { ACADEMIC_BRANCHES } from '@/lib/data/lms-data'

export default function StudentProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Naveen Kumar',
    email: user?.primaryEmailAddress?.emailAddress || 'student@sarvonaya.com',
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

  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: '/' })
    } catch (e) {}
    try {
      localStorage.removeItem('saryonaya_demo_session')
    } catch (e) {}
    router.push('/')
  }

  const currentBranch = ACADEMIC_BRANCHES.find((b) => b.code === profile.branchCode) || ACADEMIC_BRANCHES[0]

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#092347] pb-24 md:pb-12 font-sans antialiased selection:bg-[#dfa32b]/30">
      {/* Master Navbar with Login/Logout & Official Logo */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6 md:space-y-8">
        
        {/* Responsive 2-Col Layout: Profile Card on Left (4 cols), Form on Right (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Profile Card Summary & Account Controls (4 cols on laptop) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-7 border border-slate-100 shadow-[0_4px_24px_rgba(9,35,71,0.05)] text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full ring-4 ring-[#dfa32b] p-1 overflow-hidden shadow-md bg-white">
                <img
                  src={
                    user?.imageUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
                  }
                  alt="Student Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-[#dfa32b]/40 text-[#b87e1a] text-xs font-bold mb-1">
                  <GraduationCap size={13} />
                  <span>{currentBranch.code} • {currentBranch.name}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#092347]">
                  {profile.fullName}
                </h1>
                <p className="text-xs text-[#557086] font-medium">
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
                  <Award size={18} className="mx-auto text-[#b87e1a] group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-[#092347] mt-1 block">1 Certificate</span>
                </Link>
                <Link
                  href="/student/courses"
                  className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
                >
                  <BookOpen size={18} className="mx-auto text-[#092347] group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-[#092347] mt-1 block">3 Courses</span>
                </Link>
                <Link
                  href="/pricing"
                  className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-2xl border border-slate-100 text-center transition-all group"
                >
                  <Crown size={18} className="mx-auto text-[#b87e1a] group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-[#092347] mt-1 block">Go Premium</span>
                </Link>
              </div>
            </div>

            {/* Account & Authentication Card */}
            <div className="bg-white rounded-2xl sm:rounded-[28px] p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(9,35,71,0.05)] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#092347] tracking-wider">
                <KeyRound size={15} className="text-[#b87e1a]" />
                <span>Account & Session</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Status</span>
                <span className="font-bold text-[#092347]">
                  {isSignedIn ? 'Active Clerk Session' : 'Guest / Preview Mode'}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {user?.primaryEmailAddress?.emailAddress || profile.email}
                </span>
              </div>

              {/* Action Buttons: Sign In or Sign Out */}
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <button
                      onClick={handleSignOut}
                      className="w-full py-3 rounded-full text-xs font-black text-rose-600 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/90 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 tracking-wide"
                    >
                      <LogOut size={15} />
                      <span>Log Out of SARVONAYA</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/sign-in" className="block">
                        <button className="w-full py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#092347] border-t border-[#ffe8a3]/60 shadow-[0_4px_16px_rgba(223,163,43,0.3)] hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 transition-all tracking-wide">
                          <LogIn size={15} />
                          <span>Sign In to Cloud Account</span>
                        </button>
                      </Link>
                      <Link href="/sign-up" className="block">
                        <button className="w-full py-2.5 rounded-full text-xs font-bold text-[#092347] bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5 transition-all">
                          <span>Create New Account</span>
                        </button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Academic Details Form (8 cols on laptop) */}
          <form
            onSubmit={handleSave}
            className="lg:col-span-8 bg-white rounded-2xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-[0_4px_24px_rgba(9,35,71,0.05)] space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-xl font-black text-[#092347]">
                  Academic & Personal Information
                </h2>
                <p className="text-xs text-[#557086] font-medium">
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
                <label className="block text-xs font-bold text-[#092347] mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#092347] focus:border-[#dfa32b] focus:bg-white outline-none font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#092347] mb-1.5">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-400 font-medium cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#092347] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#092347] focus:border-[#dfa32b] focus:bg-white outline-none font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#092347] mb-1.5">Academic Branch</label>
                <select
                  value={profile.branchCode}
                  onChange={(e) => setProfile({ ...profile, branchCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#092347] focus:border-[#dfa32b] focus:bg-white outline-none font-medium transition-all cursor-pointer"
                >
                  {ACADEMIC_BRANCHES.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} - {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#092347] mb-1.5">College / Institute</label>
                <input
                  type="text"
                  value={profile.collegeName}
                  onChange={(e) => setProfile({ ...profile, collegeName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#092347] focus:border-[#dfa32b] focus:bg-white outline-none font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#092347] mb-1.5">Expected Graduation Year</label>
                <input
                  type="text"
                  value={profile.passedOutYear}
                  onChange={(e) => setProfile({ ...profile, passedOutYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#092347] focus:border-[#dfa32b] focus:bg-white outline-none font-medium transition-all"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#092347] border-t border-[#ffe8a3]/60 shadow-[0_4px_16px_rgba(223,163,43,0.32)] hover:shadow-[0_6px_22px_rgba(223,163,43,0.48)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 transition-all tracking-wide cursor-pointer"
              >
                <Save size={15} />
                <span>Save Academic Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}
