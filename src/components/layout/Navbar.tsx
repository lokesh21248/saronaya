'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'
import {
  Search,
  Bell,
  Menu,
  X,
  Crown,
  LogOut,
  LogIn,
  UserPlus,
  User,
  LayoutGrid,
  ChevronDown,
  Sparkles,
  BookOpen,
  Award,
  BarChart3,
  CreditCard,
  GraduationCap,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { PremiumButton, SecondaryButton } from '@/components/ui/Buttons'

export function Navbar() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { signOut } = useClerk()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut({ redirectUrl: '/' })
      }
    } catch (e) {}
    try {
      localStorage.removeItem('saryonaya_demo_session')
    } catch (e) {}
    router.push('/')
  }

  const navLinks = [
    { label: 'Subscriptions', href: '/subscriptions' },
    { label: 'My Learning', href: '/my-learning' },
    { label: 'My Courses', href: '/my-courses' },
    { label: 'Progress', href: '/progress' },
    { label: 'Certificates', href: '/certificates' },
  ]

  const exploreCategories = [
    { name: 'Computer Science & Engineering (CSE)', href: '/courses?category=CSE', icon: '💻' },
    { name: 'Artificial Intelligence & ML (AI/ML)', href: '/courses?category=AI_ML', icon: '🤖' },
    { name: 'Electronics & Communication (ECE)', href: '/courses?category=ECE', icon: '⚡' },
    { name: 'Electrical & Electronics (EEE)', href: '/courses?category=EEE', icon: '🔋' },
    { name: 'Mechanical Engineering (MECH)', href: '/courses?category=MECH', icon: '⚙️' },
    { name: 'Civil & Structural (CIVIL)', href: '/courses?category=CIVIL', icon: '🏗️' },
    { name: 'Full-Stack Web & Cloud', href: '/courses?category=Web', icon: '🌐' },
    { name: 'Business & Management Analytics', href: '/courses?category=Business', icon: '📊' },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-[0_2px_16px_rgba(9,35,71,0.05)] transition-all">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-8 xl:px-12 h-16 sm:h-20 gap-3">
        
        {/* Left Side: Brand Logo, Explore Button, Navigation Links */}
        <div className="flex items-center gap-3 lg:gap-5 xl:gap-7 shrink-0">
          
          {/* Logo with Seal + Brand Text */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            {/* 3D Gold Seal Emblem */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-[#e5a93b]/70 bg-white group-hover:scale-105 transition-transform flex items-center justify-center">
              <svg viewBox="20 110 320 355" className="w-full h-full">
                <image href="/images/sarvonaya-logo.jpg" width="1024" height="576" />
              </svg>
            </div>
            
            {/* Typography */}
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-xl tracking-tight text-[#07182e] group-hover:text-[#092347] transition-colors leading-none">
                SARYONAYA
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#b87e1a] mt-0.5 leading-none">
                Learn • Grow • Excel
              </span>
            </div>
          </Link>

          {/* Explore Dropdown Button (matching the mockup) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#07182e] to-[#0e2a4d] text-white text-xs font-extrabold shadow-sm border border-slate-700/50 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#e5a93b]" />
              <span>Explore</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform ${exploreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {exploreDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setExploreDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#07182e] uppercase tracking-wider">
                    Academic Branches
                  </span>
                  <Link
                    href="/courses"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="text-[11px] font-bold text-[#b87e1a] hover:underline"
                  >
                    All Courses →
                  </Link>
                </div>
                <div className="max-h-80 overflow-y-auto py-1">
                  {exploreCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setExploreDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-xs font-bold text-[#07182e] hover:text-[#b87e1a] transition-colors"
                    >
                      <span className="text-base shrink-0">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all tracking-wide ${
                    isActive
                      ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/40 shadow-xs'
                      : 'text-[#07182e]/80 hover:text-[#07182e] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Center / Right: Search Bar & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* ========================================================= */}
          {/* MOBILE & TABLET (< lg): Clean Bell + Circular Student Avatar */}
          {/* Matches saryonaya-mobile-design.jpg pixel-for-pixel       */}
          {/* ========================================================= */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
            <Link
              href="/notifications"
              className="relative p-2 rounded-full bg-slate-50 border border-slate-200 text-[#07182e] hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                2
              </span>
            </Link>

            {isSignedIn ? (
              <Link href="/profile" className="relative group shrink-0" aria-label="Profile">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-[#e5a93b] overflow-hidden bg-slate-100 shadow-sm flex items-center justify-center font-black text-xs text-[#07182e]">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{user?.firstName?.[0] || 'U'}</span>
                  )}
                </div>
              </Link>
            ) : (
              <Link href="/login" className="relative group shrink-0" aria-label="Sign In">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-[#e5a93b] overflow-hidden bg-white shadow-sm flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Student Account"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            )}
          </div>

          {/* ========================================================= */}
          {/* DESKTOP (>= lg): Full Actions & Auth Controls             */}
          {/* ========================================================= */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3">
            {/* Search Bar (matching the mockup) */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#f6f9fd] border border-slate-200/90 rounded-full focus-within:border-[#dfa32b] focus-within:bg-white focus-within:shadow-md shadow-xs transition-all w-48 xl:w-64"
            >
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search courses, AI, VLSI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-[#07182e] placeholder-slate-400 outline-none w-full font-medium"
              />
            </form>

            {/* Go Premium Luxury Button */}
            <Link href="/subscriptions">
              <PremiumButton size="sm">Go Premium</PremiumButton>
            </Link>

            {/* Notification Bell with Badge */}
            <Link
              href="/notifications"
              className="relative p-2 sm:p-2.5 rounded-full bg-slate-50 border border-slate-200 text-[#07182e] hover:bg-slate-100 hover:text-[#b87e1a] transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                2
              </span>
            </Link>

            {/* Authentication Actions: Login / Register OR User Profile / Logout */}
            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-[#dfa32b] transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#dfa32b] to-[#07182e] text-white flex items-center justify-center font-bold text-xs">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <span className="text-xs font-extrabold text-[#07182e]">
                    {user?.firstName || 'Student'}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Login Button (White pill with subtle shadow) */}
                <Link href="/login">
                  <button className="px-4 py-2 rounded-full text-xs font-black text-[#07182e] bg-white border border-slate-300/90 shadow-sm hover:border-[#07182e] hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                    <User size={13} className="text-[#07182e]" />
                    <span>Login</span>
                  </button>
                </Link>

                {/* Register Button (Golden 3D pill button matching mockup) */}
                <Link href="/register">
                  <button className="px-4 sm:px-5 py-2 rounded-full text-xs font-black text-[#07182e] bg-gradient-to-r from-[#dfa32b] via-[#f7d685] to-[#d99222] border-t border-white/60 border-b-[2px] border-b-[#a66d0e] shadow-[0_3px_12px_rgba(223,163,43,0.35)] hover:shadow-[0_5px_18px_rgba(223,163,43,0.5)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                    <UserPlus size={13} className="text-[#07182e]" />
                    <span>Register</span>
                  </button>
                </Link>
              </div>
            )}

            {/* Tablet Menu Toggle (Between lg and xl only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-[#07182e] hover:bg-slate-100 transition-colors ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet Drawer Menu (Hidden on mobile < md where bottom nav is active) */}
      {mobileMenuOpen && (
        <div className="hidden md:block xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <Search size={15} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-[#07182e] outline-none w-full font-medium"
            />
          </form>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-xs font-bold text-[#07182e] hover:bg-amber-50 hover:text-[#b87e1a] flex items-center gap-2"
            >
              <LayoutGrid size={15} className="text-[#b87e1a]" />
              <span>Explore Courses</span>
            </Link>
            <Link
              href="/subscriptions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-xs font-bold text-[#07182e] hover:bg-amber-50 hover:text-[#b87e1a] flex items-center gap-2"
            >
              <CreditCard size={15} className="text-[#b87e1a]" />
              <span>Subscriptions</span>
            </Link>
            <Link
              href="/my-learning"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-xs font-bold text-[#07182e] hover:bg-amber-50 hover:text-[#b87e1a] flex items-center gap-2"
            >
              <BookOpen size={15} className="text-[#b87e1a]" />
              <span>My Learning</span>
            </Link>
            <Link
              href="/progress"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-xs font-bold text-[#07182e] hover:bg-amber-50 hover:text-[#b87e1a] flex items-center gap-2"
            >
              <BarChart3 size={15} className="text-[#b87e1a]" />
              <span>Progress</span>
            </Link>
            <Link
              href="/certificates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-xs font-bold text-[#07182e] hover:bg-amber-50 hover:text-[#b87e1a] flex items-center gap-2"
            >
              <Award size={15} className="text-[#b87e1a]" />
              <span>Certificates</span>
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-xs font-bold text-[#07182e] hover:bg-amber-50 hover:text-[#b87e1a] flex items-center gap-2"
            >
              <User size={15} className="text-[#b87e1a]" />
              <span>Profile</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/subscriptions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#07182e] to-[#0f2d57] text-[#fced9f] text-xs font-extrabold border border-[#dfa32b]/50 shadow-sm"
            >
              <Crown size={14} className="text-[#e5a93b]" />
              <span>Upgrade to Premium Membership</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
