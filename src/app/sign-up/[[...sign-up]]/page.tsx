'use client'

import React, { useState, useEffect } from 'react'
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
  AlertCircle,
  KeyRound,
  Loader2,
  RotateCcw,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { useClerk } from '@clerk/nextjs'

export default function SignUpPage() {
  const router = useRouter()
  const clerk = useClerk()

  // Academic and Registration Fields
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
  const [resending, setResending] = useState(false)
  const [resendNotice, setResendNotice] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Auto-fill email if passed in query params (e.g. from sign-in page link)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const qEmail = params.get('email')
      if (qEmail) setEmail(qEmail)
    }
  }, [])

  // Helper to determine branch code from course name
  const getBranchCode = (courseName: string): string => {
    if (courseName.includes('AI') || courseName.includes('Data Science')) return 'AIDS'
    if (courseName.includes('ECE') || courseName.includes('Electronics')) return 'ECE'
    if (courseName.includes('EEE') || courseName.includes('Electrical')) return 'EEE'
    if (courseName.includes('MECH') || courseName.includes('Mechanical')) return 'MECH'
    if (courseName.includes('CIVIL') || courseName.includes('Civil')) return 'CIVIL'
    return 'CSE'
  }

  // Save the student's real profile to database and local cache
  const saveStudentProfile = async () => {
    const branchCode = getBranchCode(course)
    const profilePayload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() ? `+91 ${phone.trim()}` : null,
      educationLevel: education,
      collegeName: college.trim(),
      degree: education,
      branchCode,
      passedOutYear,
    }

    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profilePayload),
      })
    } catch (e) {
      console.warn('Profile sync notice:', e)
    }
  }

  // Real Production Registration with Clerk
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedName = fullName.trim()

    if (!trimmedName) {
      setError('Please enter your full name.')
      return
    }
    if (!trimmedEmail) {
      setError('Please enter your email address.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setLoading(true)

    try {
      if (!clerk?.loaded || !clerk?.client) {
        setError('Authentication service is initializing. Please try again.')
        setLoading(false)
        return
      }

      const parts = trimmedName.split(' ')
      const firstName = parts[0]
      const lastName = parts.slice(1).join(' ') || undefined

      // 1. Create Clerk account
      const signUpAttempt = await clerk.client.signUp.create({
        emailAddress: trimmedEmail,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })

      // 2. Check if verification is needed
      if (signUpAttempt.status === 'complete' && signUpAttempt.createdSessionId) {
        await clerk.setActive({ session: signUpAttempt.createdSessionId })
        await saveStudentProfile()
        setSuccess(true)
        router.push('/student/dashboard')
        return
      }

      // 3. Prepare email verification OTP
      await clerk.client.signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      setVerifying(true)
    } catch (err: any) {
      console.error('Clerk sign-up error:', err)
      const code = err?.errors?.[0]?.code
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message

      if (code === 'form_identifier_exists') {
        setError('An account with this email address already exists. Please login instead.')
      } else if (code === 'form_password_pwned') {
        setError('This password has been identified in a breach. Please choose a more secure password.')
      } else {
        setError(msg || 'Registration could not be completed. Please check your information.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Real Email OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResendNotice(null)

    if (!otpCode.trim()) {
      setError('Please enter the 6-digit verification code.')
      return
    }

    setLoading(true)

    try {
      if (!clerk?.loaded || !clerk?.client) {
        setError('Authentication service is initializing.')
        setLoading(false)
        return
      }

      const completeSignUp = await clerk.client.signUp.attemptEmailAddressVerification({
        code: otpCode.trim(),
      })

      if (completeSignUp.status === 'complete' && completeSignUp.createdSessionId) {
        await clerk.setActive({ session: completeSignUp.createdSessionId })
        await saveStudentProfile()
        setSuccess(true)
        router.push('/student/dashboard')
        return
      }

      setError('Verification could not be finalized. Please verify the code.')
    } catch (err: any) {
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Invalid verification code. Please check your email inbox and try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // Resend Email Verification Code
  const handleResendCode = async () => {
    setError(null)
    setResending(true)
    try {
      if (clerk?.loaded && clerk?.client) {
        await clerk.client.signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        })
        setResendNotice('A new 6-digit verification code has been sent to your email.')
      }
    } catch (err: any) {
      setError('Could not resend verification code. Please wait a moment and try again.')
    } finally {
      setResending(false)
    }
  }

  // Production Google OAuth
  const handleGoogleSignUp = async () => {
    setError(null)
    setLoading(true)

    try {
      if (!clerk?.loaded || !clerk?.client) {
        setError('Authentication service is initializing. Please wait a moment.')
        setLoading(false)
        return
      }

      await clerk.client.signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/student/dashboard',
      })
    } catch (err: any) {
      console.warn('Google sign-up error:', err)
      const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message
      if (msg && msg.includes('oauth_google does not match')) {
        setError('Google Sign-In is not currently enabled in Clerk Dashboard. Please register using the form.')
      } else {
        setError(msg || 'Google Sign-In is currently unavailable. Please register using the form.')
      }
      setLoading(false)
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

          <path
            d="M0,0 L500,0 L500,32 Q340,118 175,58 Q75,22 0,98 Z"
            fill="url(#navyWaveGrad)"
          />
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

      {/* TOP BAR: Floating 3D Back Button */}
      <div className="relative z-10 max-w-md w-full mx-auto px-5 pt-4 sm:pt-6">
        <Link
          href="/"
          className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_18px_rgba(9,35,71,0.08)] border border-slate-200/90 flex items-center justify-center text-[#07182e] hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Back to home"
        >
          <ArrowLeft size={19} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-md w-full mx-auto px-5 py-3 sm:py-5 flex-1 flex flex-col justify-center">
        
        {/* BRAND HEADER */}
        <div className="text-center space-y-1.5 pb-3">
          <div className="flex justify-center mb-1">
            <SaryonayaLogo size="md" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#07182e] tracking-tight">
            {verifying ? 'Verify Your Email' : 'Create Account'}
          </h1>
          <p className="text-xs sm:text-sm text-[#557086] font-medium max-w-xs mx-auto">
            {verifying
              ? `We sent a 6-digit code to ${email}. Enter it below to activate your account.`
              : 'Register to unlock branch-mapped curriculum, projects, and certificates'}
          </p>
        </div>

        {/* ERROR / SUCCESS NOTICES */}
        {error && (
          <div className="mb-3.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2 animate-in fade-in-50">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {resendNotice && (
          <div className="mb-3.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium animate-in fade-in-50">
            {resendNotice}
          </div>
        )}

        {/* ==================================================================== */}
        {/* STEP 2: REAL EMAIL OTP VERIFICATION                                  */}
        {/* ==================================================================== */}
        {verifying ? (
          <form onSubmit={handleVerifyOtp} className="space-y-3.5">
            <div className="bg-white rounded-[22px] border border-slate-200/90 shadow-[0_3px_14px_rgba(9,35,71,0.03)] hover:border-slate-300 px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center gap-3.5 focus-within:border-[#092347] focus-within:ring-4 focus-within:ring-[#dfa32b]/15 transition-all">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f0f5fc] to-[#e4eefb] text-[#092347] flex items-center justify-center border border-blue-100/60 shrink-0">
                <KeyRound size={18} strokeWidth={2.2} />
              </div>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                required
                autoFocus
                className="w-full bg-transparent text-sm sm:text-base font-bold text-[#07182e] placeholder-slate-400 outline-none tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0d315d] hover:brightness-110 active:scale-[0.98] text-white font-black text-sm tracking-wide border-t border-white/20 border-b border-black/40 shadow-[0_8px_25px_rgba(9,38,83,0.32)] flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#F8D77A]" />
                  <span>Verifying Code...</span>
                </>
              ) : success ? (
                <span>Account Activated!</span>
              ) : (
                <>
                  <span>Verify Email & Complete Registration</span>
                  <ArrowRight size={14} strokeWidth={2.6} className="text-[#F8D77A]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between px-1 pt-1 text-xs">
              <button
                type="button"
                onClick={() => setVerifying(false)}
                className="font-bold text-slate-500 hover:text-[#07182e] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft size={13} />
                <span>Back to Form</span>
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={resending}
                className="font-bold text-[#b37a18] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw size={12} className={resending ? 'animate-spin' : ''} />
                <span>{resending ? 'Resending...' : 'Resend Code'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* ==================================================================== */
          /* STEP 1: REAL REGISTRATION FORM                                       */
          /* ==================================================================== */
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* 1. Full Name */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center gap-3 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                <User size={16} strokeWidth={2.2} />
              </div>
              <input
                type="text"
                placeholder="Full Name (e.g. Ramesh Kumar)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>

            {/* 2. Email Address */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center gap-3 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                <Mail size={16} strokeWidth={2.2} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>

            {/* 3. Password */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center justify-between gap-3 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                  <Lock size={16} strokeWidth={2.2} />
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
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* 4. Phone Number */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center gap-3 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                <Phone size={16} strokeWidth={2.2} />
              </div>
              <span className="text-xs font-bold text-slate-500 shrink-0 select-none">+91</span>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                required
                maxLength={10}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>

            {/* 5. Higher Education Level */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center justify-between gap-2 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                  <GraduationCap size={16} strokeWidth={2.2} />
                </div>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] outline-none cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select Qualification Level</option>
                  <option value="B.Tech / B.E (Engineering)">B.Tech / B.E (Engineering)</option>
                  <option value="M.Tech / M.E">M.Tech / M.E</option>
                  <option value="BCA / MCA">BCA / MCA</option>
                  <option value="Diploma in Engineering">Diploma in Engineering</option>
                  <option value="Degree / B.Sc / M.Sc">Degree / B.Sc / M.Sc</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <ChevronDown size={14} className="text-slate-400 shrink-0 pointer-events-none" />
            </div>

            {/* 6. College / University Name */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center gap-3 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                <Building2 size={16} strokeWidth={2.2} />
              </div>
              <input
                type="text"
                placeholder="College / University Name"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] placeholder-slate-400 outline-none"
              />
            </div>

            {/* 7. Degree / Academic Branch */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center justify-between gap-2 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                  <BookOpen size={16} strokeWidth={2.2} />
                </div>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] outline-none cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select Academic Branch</option>
                  <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                  <option value="Artificial Intelligence & Data Science (AI/DS)">Artificial Intelligence & Data Science (AI/DS)</option>
                  <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                  <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering (MECH)">Mechanical Engineering (MECH)</option>
                  <option value="Civil Engineering (CIVIL)">Civil Engineering (CIVIL)</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <ChevronDown size={14} className="text-slate-400 shrink-0 pointer-events-none" />
            </div>

            {/* 8. Passed Out Year */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 px-3.5 py-2.5 flex items-center justify-between gap-2 focus-within:border-[#092347] focus-within:ring-2 focus-within:ring-[#dfa32b]/20 transition-all">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-[#092347] flex items-center justify-center shrink-0">
                  <Calendar size={16} strokeWidth={2.2} />
                </div>
                <select
                  value={passedOutYear}
                  onChange={(e) => setPassedOutYear(e.target.value)}
                  required
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#07182e] outline-none cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select Passed Out / Graduation Year</option>
                  <option value="2028 (Pursuing)">2028 (Pursuing)</option>
                  <option value="2027 (Pursuing)">2027 (Pursuing)</option>
                  <option value="2026 (Final Year)">2026 (Final Year)</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022 or Earlier">2022 or Earlier</option>
                </select>
              </div>
              <ChevronDown size={14} className="text-slate-400 shrink-0 pointer-events-none" />
            </div>

            {/* PRIMARY SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0d315d] hover:brightness-110 active:scale-[0.98] text-white font-black text-sm tracking-wide border-t border-white/20 border-b border-black/40 shadow-[0_8px_25px_rgba(9,35,71,0.32)] flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-50 group"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#F8D77A]" />
                    <span>Creating Account...</span>
                  </>
                ) : success ? (
                  <span>Account Created!</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight size={14} strokeWidth={2.6} className="text-white" />
                    </div>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* DIVIDER: — or — */}
        <div className="flex items-center justify-center gap-3 my-3 text-slate-400 text-xs select-none">
          <span className="w-14 h-px bg-slate-200" />
          <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">or</span>
          <span className="w-14 h-px bg-slate-200" />
        </div>

        {/* GOOGLE SIGN UP BUTTON */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full py-3 rounded-full bg-white hover:bg-slate-50 text-[#07182e] font-bold text-xs sm:text-sm border border-[#092347]/30 hover:border-[#092347] shadow-[0_2px_10px_rgba(9,35,71,0.04)] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
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
        <div className="text-center pt-3 pb-5">
          <span className="text-xs text-slate-500 font-medium">
            Already have an account?{' '}
          </span>
          <Link
            href="/sign-in"
            className="text-xs font-black text-[#092347] underline decoration-2 decoration-[#dfa32b] underline-offset-4 hover:text-[#dfa32b] transition-colors"
          >
            Sign In
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
