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
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'

export function Navbar() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { signOut } = useClerk()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut({ redirectUrl: '/' })
      }
    } catch (e) {
      // fallback
    }
    // Also clear any demo session
    try {
      localStorage.removeItem('saryonaya_demo_session')
    } catch (e) {}
    router.push('/')
  }

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard' },
    { label: 'My Courses', href: '/student/courses' },
    { label: 'Progress', href: '/student/progress' },
    { label: 'Certificates', href: '/student/certificates' },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(9,35,71,0.04)] sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-8 h-16 sm:h-20">
        
        {/* Left Side: Brand Logo & Desktop Navigation */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 shrink-0">
          {/* Official SARVONAYA Logo */}
          <SaryonayaLogo size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all tracking-wide ${
                    isActive
                      ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/40 shadow-xs'
                      : 'text-[#092347]/80 hover:text-[#092347] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Side: Search, Actions, Login & Logout Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Desktop Quick Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 bg-[#f6f9fd] border border-slate-200/90 rounded-full focus-within:border-[#dfa32b] focus-within:bg-white shadow-xs transition-all"
          >
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, AI, VLSI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-[#092347] placeholder-slate-400 outline-none w-36 lg:w-44 font-medium"
            />
          </form>

          {/* Go Premium Golden Badge Button (Desktop/Tablet) */}
          <Link
            href="/pricing"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0f3460] text-[#f5cb68] border border-[#dfa32b]/40 text-xs font-black shadow-xs hover:border-[#dfa32b] hover:scale-[1.02] active:scale-[0.98] transition-all tracking-wide"
          >
            <Crown size={13} className="text-[#f5cb68]" />
            <span>Go Premium</span>
          </Link>

          {/* Notification Bell */}
          <Link
            href="/student/progress"
            className="relative p-2 sm:p-2.5 rounded-full text-[#092347] hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={19} strokeWidth={2.2} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Link>

          {/* AUTHENTICATION CONTROLS: Login & Logout */}
          {isLoaded && (
            <>
              {isSignedIn ? (
                /* SIGNED IN STATE: User Profile + Dedicated Log Out Button */
                <div className="flex items-center gap-2">
                  {/* User Profile Avatar Pill */}
                  <Link
                    href="/student/profile"
                    className="flex items-center gap-2 p-1 sm:pr-3 rounded-full hover:bg-slate-100/80 transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-[#dfa32b] p-0.5 overflow-hidden bg-white shadow-xs">
                      <img
                        src={
                          user?.imageUrl ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                        }
                        alt={user?.fullName || 'Student'}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="hidden md:inline-block text-xs font-black text-[#092347] max-w-[100px] truncate">
                      {user?.firstName || 'Student'}
                    </span>
                  </Link>

                  {/* Dedicated Logout Button */}
                  <button
                    onClick={handleSignOut}
                    className="hidden sm:inline-flex px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-600 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/80 hover:border-rose-300 transition-all items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                    title="Log Out of Saryonaya"
                  >
                    <LogOut size={14} strokeWidth={2.2} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                /* SIGNED OUT STATE: Perfectly Sized & Aligned Buttons */
                <>
                  {/* Mobile Screen (< 640px): 1 Sleek Luxury Button */}
                  <Link
                    href="/sign-in"
                    className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#07182e] border-t border-[#ffe8a3]/80 shadow-[0_2px_10px_rgba(223,163,43,0.3)] active:scale-95 flex items-center gap-1 tracking-wide"
                  >
                    <LogIn size={13} strokeWidth={2.5} />
                    <span>Sign In</span>
                  </Link>

                  {/* Tablet & Desktop (>= 640px): Both Login & Register Buttons */}
                  <div className="hidden sm:flex items-center gap-2">
                    <Link
                      href="/sign-in"
                      className="px-4 py-2 rounded-full text-xs font-bold text-[#092347] bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#dfa32b] shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <LogIn size={13} className="text-[#b87e1a]" />
                      <span>Login</span>
                    </Link>

                    <Link
                      href="/sign-up"
                      className="px-4 sm:px-5 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#07182e] border-t border-[#ffe8a3]/80 shadow-[0_3px_14px_rgba(223,163,43,0.35)] hover:shadow-[0_5px_20px_rgba(223,163,43,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all tracking-wide flex items-center gap-1.5"
                    >
                      <UserPlus size={13} />
                      <span>Register</span>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}

          {/* Mobile hamburger menu toggle (far right) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 lg:hidden rounded-xl text-[#092347] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs text-[#092347] border border-slate-200 outline-none font-medium"
            />
          </form>

          {/* Mobile Auth Actions */}
          <div className="p-3 bg-gradient-to-r from-[#f7fafd] to-[#f0f5fc] rounded-2xl border border-slate-200/80">
            {isSignedIn ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full ring-2 ring-[#dfa32b] p-0.5 overflow-hidden bg-white shadow-xs">
                    <img
                      src={
                        user?.imageUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                      }
                      alt="Student"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#092347] block">
                      {user?.fullName || 'Student'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/student/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-full text-center text-xs font-bold text-[#092347] bg-white border border-slate-200 shadow-xs"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="py-2 px-3 rounded-full text-center text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <LogOut size={13} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#092347]">
                  <Sparkles size={14} className="text-[#dfa32b]" />
                  <span>Welcome to SARVONAYA</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-full text-center text-xs font-bold text-[#092347] border border-slate-200 bg-white shadow-xs active:scale-95 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-full text-center text-xs font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#07182e] border-t border-[#ffe8a3]/80 shadow-[0_2px_10px_rgba(223,163,43,0.3)] active:scale-95 transition-all"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-50 text-[#b87e1a] border border-[#dfa32b]/30'
                      : 'text-[#092347] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              )
            })}
          </div>

          {/* Go Premium in Drawer */}
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#07182e] to-[#092347] text-[#f5cb68] border border-[#dfa32b]/40 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Crown size={18} className="text-[#f5cb68]" />
              <div>
                <span className="text-xs font-black block">Go Premium</span>
                <span className="text-[10px] text-slate-300">Unlock all engineering courses</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#dfa32b]">Explore →</span>
          </Link>
        </div>
      )}
    </header>
  )
}
