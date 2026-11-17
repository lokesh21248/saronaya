'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Lock,
  CheckCircle2,
  Save,
  ArrowRight,
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile')
  const [saved, setSaved] = useState(false)

  // Profile fields initialized from local storage
  const [name, setName] = useState('Naveen Kumar')
  const [email, setEmail] = useState('naveen@saryonaya.edu')
  const [phone, setPhone] = useState('+91 9876543210')
  const [college, setCollege] = useState('Anna University, Chennai')
  const [education, setEducation] = useState('B.Tech / B.E (Engineering)')
  const [course, setCourse] = useState('Computer Science & Engineering')
  const [passYear, setPassYear] = useState('2026')

  // Notification toggles
  const [emailNotif, setEmailNotif] = useState(true)
  const [courseReminders, setCourseReminders] = useState(true)
  const [promoOffers, setPromoOffers] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const json = await res.json()
          const data = json.data || json
          if (data.full_name || data.fullName) setName(data.full_name || data.fullName)
          if (data.email) setEmail(data.email)
          if (data.phone) setPhone(data.phone)
          if (data.qualification?.college_name) setCollege(data.qualification.college_name)
          if (data.qualification?.education_level) setEducation(data.qualification.education_level)
          if (data.qualification?.degree) setCourse(data.qualification.degree)
          if (data.qualification?.passed_out_year) setPassYear(data.qualification.passed_out_year)
        }
      } catch (e) {
        console.warn('Could not load profile from server:', e)
      }
    }
    loadProfile()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updated = {
        fullName: name,
        email,
        phone,
        collegeName: college,
        educationLevel: education,
        degree: course,
        passedOutYear: passYear,
      }
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      console.error('Failed to save settings:', e)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#102B50] flex flex-col font-sans selection:bg-[#E9AC32]/30">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-7 sm:h-8 rounded-full bg-gradient-to-b from-[#092653] to-[#1456A0]" />
            <h1 className="text-2xl sm:text-3xl font-black text-[#102B50] tracking-tight">
              Account &amp; Platform Settings
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage your personal profile, academic information, security and notifications.
          </p>
        </div>

        {/* Layout: Sidebar Tabs + Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-gradient-to-r from-[#092653] to-[#1456A0] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#092653]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Academic Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-gradient-to-r from-[#092653] to-[#1456A0] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#092653]'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Security &amp; Password</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-gradient-to-r from-[#092653] to-[#1456A0] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#092653]'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'billing'
                    ? 'bg-gradient-to-r from-[#092653] to-[#1456A0] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#092653]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Billing &amp; Invoices</span>
              </button>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(9,38,83,0.05)]">
              
              {saved && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Changes saved successfully to your SARYONAYA account!</span>
                </div>
              )}

              {/* TAB 1: Profile */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSave} className="space-y-5">
                  <h2 className="text-lg font-black text-[#102B50] pb-2 border-b border-slate-100">
                    Personal &amp; Academic Credentials
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Full Name</label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <User className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address</label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Phone Number</label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Education Degree</label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <GraduationCap className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">College / University</label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Specialization Branch</label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-[#102B50]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <PrimaryButton type="submit" size="md" icon={<Save className="w-4 h-4 mr-1 text-[#F8D77A]" />}>
                      Save Changes
                    </PrimaryButton>
                  </div>
                </form>
              )}

              {/* TAB 2: Security */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-black text-[#102B50] pb-2 border-b border-slate-100">
                    Security &amp; Password
                  </h2>

                  <div className="space-y-4 max-w-md">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold outline-none"
                      />
                    </div>

                    <PrimaryButton size="md">Update Password</PrimaryButton>
                  </div>
                </div>
              )}

              {/* TAB 3: Notifications */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-black text-[#102B50] pb-2 border-b border-slate-100">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#102B50]">Email Notifications</p>
                        <p className="text-[11px] text-slate-500">Receive course updates and announcements</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailNotif}
                        onChange={(e) => setEmailNotif(e.target.checked)}
                        className="w-5 h-5 accent-[#092653]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#102B50]">Course Reminders</p>
                        <p className="text-[11px] text-slate-500">Weekly study reminders and quiz alerts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={courseReminders}
                        onChange={(e) => setCourseReminders(e.target.checked)}
                        className="w-5 h-5 accent-[#092653]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 4: Billing */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-black text-[#102B50] pb-2 border-b border-slate-100">
                    Billing &amp; Subscriptions
                  </h2>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#061B3A] to-[#092653] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#F8D77A]">Active Plan</span>
                      <h3 className="text-lg font-black">SARYONAYA Premium Annual</h3>
                      <p className="text-xs text-slate-300">Renews on Nov 14, 2027 • Unlimited Access</p>
                    </div>
                    <Link href="/subscriptions">
                      <button className="px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#E9AC32] to-[#F8D77A] text-[#061B3A] shadow-md hover:brightness-110">
                        Manage Plan
                      </button>
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
