'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { useClerk } from '@clerk/nextjs'

export default function SignUpPage() {
  const router = useRouter()
  const clerk = useClerk()

  // REGISTRATION & ACADEMIC FIELDS
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [education, setEducation] = useState('')
  const [college, setCollege] = useState('')
  const [course, setCourse] = useState('')
  const [passedOutYear, setPassedOutYear] = useState('')

  // Verification state
  const [verifying, setVerifying] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Construct student profile
    const studentData = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: `+91 ${phone.trim()}`,
      education,
      college,
      course,
      passedOutYear,
      branchCode: course.includes('AI')
        ? 'AIDS'
        : course.includes('ECE')
        ? 'ECE'
        : course.includes('EEE')
        ? 'EEE'
        : course.includes('MECH')
        ? 'MECH'
        : course.includes('CIVIL')
        ? 'CIVIL'
        : 'CSE',
      createdAt: new Date().toISOString(),
    }

    try {
      // 1. Save profile to localStorage
      localStorage.setItem('saryonaya_user_profile', JSON.stringify(studentData))
      localStorage.setItem('saryonaya_user_branch', studentData.branchCode)
      localStorage.setItem('saryonaya_user_college', college)
      localStorage.setItem(
        'saryonaya_demo_session',
        JSON.stringify({
          active: true,
          name: fullName.trim(),
          email: email.trim(),
          phone: `+91 ${phone.trim()}`,
          education,
          college,
          course,
          passedOutYear,
        })
      )

      // 2. Try authentic Clerk account creation
      if (clerk?.loaded && clerk?.client) {
        try {
          await clerk.client.signUp.create({
            emailAddress: email.trim(),
            password: password,
            firstName: fullName.trim(),
          })

          await clerk.client.signUp.prepareEmailAddressVerification({
            strategy: 'email_code',
          })

          setVerifying(true)
          setLoading(false)
          return
        } catch (clerkErr: any) {
          // If Clerk is in dev mode or requires specific password, show message
          const msg =
            clerkErr?.errors?.[0]?.longMessage ||
            clerkErr?.errors?.[0]?.message ||
            null
          if (msg) {
            setError(msg)
            setLoading(false)
            return
          }
        }
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/student/dashboard')
      }, 700)
    } catch (err: any) {
      setError('Registration could not be completed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP verification for Clerk
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (clerk?.loaded && clerk?.client) {
        const completeSignUp = await clerk.client.signUp.attemptEmailAddressVerification({
          code: otpCode.trim(),
        })

        if (completeSignUp.status === 'complete' && completeSignUp.createdSessionId) {
          await clerk.setActive({ session: completeSignUp.createdSessionId })
          router.push('/student/dashboard')
          return
        }
      }
      router.push('/student/dashboard')
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Invalid verification code. Please check your inbox or bypass below.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      if (clerk?.loaded && clerk?.client) {
        await clerk.client.signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/student/dashboard',
        })
      } else {
        router.push('/student/dashboard')
      }
    } catch (e) {
      router.push('/student/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07182e] relative flex flex-col justify-between overflow-x-hidden font-sans antialiased selection:bg-[#dfa32b]/30">
      
      {/* 3D LUXURY TOP DECORATIVE WAVE */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden h-36 sm:h-48 z-0">
        <svg
          viewBox="0 0 500 160"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id="navyWaveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#051325" />
              <stop offset="60%" stopColor="#092347" />
              <stop offset="100%" stopColor="#0e3463" />
            </linearGradient>
            <linearGradient id="goldWaveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dfa32b" />
              <stop offset="50%" stopColor="#fced9f" />
              <stop offset="100%" stopColor="#b37a18" />
            </linearGradient>
            <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#dfa32b" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Deep Navy Curved Wave */}
          <path
            d="M0,0 L500,0 L500,32 Q340,118 175,58 Q75,22 0,98 Z"
            fill="url(#navyWaveGrad)"
          />

          {/* Golden Ribbon Trim with Glow */}
          <path
            d="M0,98 Q75,22 175,58 Q340,118 500,32"
            fill="none"
            stroke="url(#goldWaveGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#goldGlow)"
          />
        </svg>
      </div>

      {/* TOP BAR: Floating 3D Circular Back Button */}
      <div className="relative z-10 max-w-md w-full mx-auto px-5 pt-4 sm:pt-6">
        <Link
          href="/"
          className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_18px_rgba(9,35,71,0.08)] border border-slate-200/90 flex items-center justify-center text-[#07182e] hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Back to home"
        >
          <ArrowLeft size={19} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* MAIN LUXURY CONTENT CONTAINER */}
      <main className="relative z-10 max-w-md w-full mx-auto px-5 py-3 sm:py-5 flex-1 flex flex-col justify-center">
        
        {/* BRAND LOGO & HEADER */}
        <div className="text-center space-y-2 pb-4 sm:pb-6">
          <div className="flex justify-center mb-1">
            <SaryonayaLogo size="md" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#07182e] tracking-tight">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-[#557086] font-medium max-w-xs mx-auto leading-relaxed">
            Join Saryonaya today and start your learning journey
          </p>
        </div>

        {/* ERROR ALERT BOX */}
        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in-50">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
            <div className="flex-1 space-y-1.5">
              <p className="leading-relaxed">{error}</p>
              <button
                type="button"
                onClick={() => router.push('/student/dashboard')}
                className="text-[11px] font-bold text-rose-800 underline hover:text-rose-900 block cursor-pointer"
              >
                Or bypass with 1-Click Demo Student Access →
              </button>
            </div>
          </div>
        )}

        {/* OTP VERIFICATION VIEW IF CODE WAS SENT BY CLERK */}
        {verifying ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4 bg-white p-6 rounded-[28px] border border-slate-200 shadow-xl">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#b37a18] border border-[#dfa32b]/40 flex items-center justify-center mx-auto mb-2">
                <KeyRound size={22} />
              </div>
              <h3 className="text-base font-black text-[#07182e]">Verify Your Email</h3>
              <p className="text-xs text-[#557086]">
                Enter the 6-digit code sent to <span className="font-bold text-[#07182e]">{email}</span>
              </p>
            </div>

            <div className="space-y-1">
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full text-center tracking-[0.5em] text-lg font-mono font-bold px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-2xl text-[#07182e] focus:bg-white focus:border-[#092347] focus:ring-2 focus:ring-[#dfa32b]/20 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length < 6}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0d315d] text-white font-black text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Verifying with Clerk...' : 'Verify & Continue →'}</span>
            </button>

            <button
              type="button"
              onClick={() => router.push('/student/dashboard')}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-[#092347] py-1 transition-colors"
            >
              Skip verification for demo mode →
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            
            {/* 1. Full Name */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center gap-3.5 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                <User size={18} strokeWidth={2.2} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>

            {/* 2. Email Address (for Clerk authentication) */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center gap-3.5 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                <Mail size={18} strokeWidth={2.2} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>

            {/* 3. Password (for Clerk authentication) */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                  <Lock size={18} strokeWidth={2.2} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-[#092347] transition-colors shrink-0 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* 4. Phone Number with +91 selector */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                  <Phone size={18} strokeWidth={2.2} />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  required
                  maxLength={10}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#f8fafc] border border-slate-200/80 text-xs font-black text-[#07182e] shrink-0 select-none">
                <span>+91</span>
                <ChevronDown size={13} className="text-slate-400" />
              </div>
            </div>

            {/* 5. Education Dropdown */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 relative focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                  <GraduationCap size={18} strokeWidth={2.2} />
                </div>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none appearance-none cursor-pointer truncate ${
                    education ? 'text-[#07182e]' : 'text-slate-400'
                  }`}
                >
                  <option value="" disabled>Education</option>
                  <option value="B.Tech / B.E (Engineering)">B.Tech / B.E (Engineering)</option>
                  <option value="M.Tech / M.E">M.Tech / M.E</option>
                  <option value="BCA (Computer Applications)">BCA (Computer Applications)</option>
                  <option value="MCA (Computer Applications)">MCA (Computer Applications)</option>
                  <option value="B.Sc (Computer Science / IT)">B.Sc (Computer Science / IT)</option>
                  <option value="Diploma in Engineering">Diploma in Engineering</option>
                  <option value="Other Degree">Other Degree</option>
                </select>
              </div>
              <ChevronDown size={16} className="text-slate-400 shrink-0 pointer-events-none" />
            </div>

            {/* 6. College Dropdown */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 relative focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                  <Building2 size={18} strokeWidth={2.2} />
                </div>
                <select
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none appearance-none cursor-pointer truncate ${
                    college ? 'text-[#07182e]' : 'text-slate-400'
                  }`}
                >
                  <option value="" disabled>College</option>
                  <option value="Anna University, Chennai">Anna University, Chennai</option>
                  <option value="PSG College of Technology, Coimbatore">PSG College of Technology, Coimbatore</option>
                  <option value="Madras Institute of Technology (MIT)">Madras Institute of Technology (MIT)</option>
                  <option value="IIT Madras">IIT Madras</option>
                  <option value="NIT Trichy">NIT Trichy</option>
                  <option value="Vellore Institute of Technology (VIT)">Vellore Institute of Technology (VIT)</option>
                  <option value="SRM Institute of Science & Technology">SRM Institute of Science & Technology</option>
                  <option value="SSN College of Engineering">SSN College of Engineering</option>
                  <option value="Coimbatore Institute of Technology (CIT)">Coimbatore Institute of Technology (CIT)</option>
                  <option value="Government College of Technology (GCT)">Government College of Technology (GCT)</option>
                  <option value="VTU Affiliated Engineering College">VTU Affiliated Engineering College</option>
                  <option value="JNTU Affiliated Engineering College">JNTU Affiliated Engineering College</option>
                  <option value="Other University / College">Other University / College</option>
                </select>
              </div>
              <ChevronDown size={16} className="text-slate-400 shrink-0 pointer-events-none" />
            </div>

            {/* 7. Course Dropdown */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 relative focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                  <BookOpen size={18} strokeWidth={2.2} />
                </div>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none appearance-none cursor-pointer truncate ${
                    course ? 'text-[#07182e]' : 'text-slate-400'
                  }`}
                >
                  <option value="" disabled>Course</option>
                  <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                  <option value="Artificial Intelligence & Data Science (AI & DS)">Artificial Intelligence & Data Science (AI & DS)</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                  <option value="Electronics & Communication Engineering (ECE)">Electronics & Communication Engineering (ECE)</option>
                  <option value="Electrical & Electronics Engineering (EEE)">Electrical & Electronics Engineering (EEE)</option>
                  <option value="Mechanical Engineering (MECH)">Mechanical Engineering (MECH)</option>
                  <option value="Civil Engineering (CIVIL)">Civil Engineering (CIVIL)</option>
                  <option value="Robotics & Automation">Robotics & Automation</option>
                </select>
              </div>
              <ChevronDown size={16} className="text-slate-400 shrink-0 pointer-events-none" />
            </div>

            {/* 8. Passed Out Year Dropdown */}
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 relative focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shadow-2xs shrink-0">
                  <Calendar size={18} strokeWidth={2.2} />
                </div>
                <select
                  value={passedOutYear}
                  onChange={(e) => setPassedOutYear(e.target.value)}
                  required
                  className={`w-full bg-transparent text-xs sm:text-sm font-semibold outline-none appearance-none cursor-pointer truncate ${
                    passedOutYear ? 'text-[#07182e]' : 'text-slate-400'
                  }`}
                >
                  <option value="" disabled>Passed Out Year</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021 or Earlier">2021 or Earlier</option>
                </select>
              </div>
              <ChevronDown size={16} className="text-slate-400 shrink-0 pointer-events-none" />
            </div>

            {/* PRIMARY SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0d315d] hover:brightness-110 active:scale-[0.98] text-white font-black text-sm tracking-wide border-t border-white/20 border-b border-black/40 shadow-[0_8px_25px_rgba(9,35,71,0.32)] hover:shadow-[0_12px_32px_rgba(9,35,71,0.45)] flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-50 group"
              >
                <span>{success ? 'Account Created Successfully!' : loading ? 'Registering with Clerk...' : 'Create Account'}</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={14} strokeWidth={2.6} className="text-white" />
                </div>
              </button>
            </div>
          </form>
        )}

        {/* DIVIDER: — or — */}
        <div className="flex items-center justify-center gap-3 my-3.5 text-slate-400 text-xs select-none">
          <span className="w-14 h-px bg-slate-200" />
          <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">or</span>
          <span className="w-14 h-px bg-slate-200" />
        </div>

        {/* GOOGLE SIGN UP BUTTON */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#07182e] font-bold text-xs sm:text-sm border border-[#092347]/30 hover:border-[#092347] shadow-[0_2px_10px_rgba(9,35,71,0.04)] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.94H1.28v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.32 14.26c-.24-.72-.38-1.49-.38-2.26s.14-1.54.38-2.26V6.59H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.41l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.28 6.59l4.04 3.15c.94-2.84 3.58-4.99 6.68-4.99z"
            />
          </svg>
          <span>Sign up with Google</span>
        </button>

        {/* FOOTER LINK: Already have an account? Login */}
        <div className="text-center pt-3 pb-6">
          <span className="text-xs text-slate-500 font-medium">
            Already have an account?{' '}
          </span>
          <Link
            href="/sign-in"
            className="text-xs font-black text-[#092347] underline decoration-2 decoration-[#dfa32b] underline-offset-4 hover:text-[#dfa32b] transition-colors"
          >
            Login
          </Link>
        </div>
      </main>

      {/* 3D LUXURY BOTTOM DECORATIVE WAVE */}
      <div className="relative pointer-events-none overflow-hidden h-20 sm:h-28 w-full z-0 mt-auto">
        <svg
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-md"
        >
          <path
            d="M0,70 Q140,25 280,65 Q410,95 500,30"
            fill="none"
            stroke="url(#goldWaveGrad)"
            strokeWidth="4"
            filter="url(#goldGlow)"
          />
          <path
            d="M0,70 Q140,25 280,65 Q410,95 500,30 L500,100 L0,100 Z"
            fill="url(#navyWaveGrad)"
          />
        </svg>
      </div>
    </div>
  )
}
