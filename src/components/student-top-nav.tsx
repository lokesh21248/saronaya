'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { Search, Bell, Menu, X, BookOpen, Award, BarChart2, ShieldCheck, Crown } from 'lucide-react'
import { SaryonayaLogo } from '@/components/ui/SaryonayaLogo'
import { usePathname } from 'next/navigation'

interface StudentTopNavProps {
  onMenuClick?: () => void
  isMenuOpen?: boolean
}

export function StudentTopNav({ onMenuClick, isMenuOpen }: StudentTopNavProps) {
  const { isSignedIn, isLoaded } = useUser()
  const [mobileMenu, setMobileMenu] = useState(false)
  const pathname = usePathname()

  const toggleMobile = () => {
    if (onMenuClick) {
      onMenuClick()
    } else {
      setMobileMenu(!mobileMenu)
    }
  }

  const isOpen = isMenuOpen !== undefined ? isMenuOpen : mobileMenu

  const navLinks = [
    { label: 'Explore', href: '/courses' },
    { label: 'Subscriptions', href: '/pricing' },
    { label: 'My Learning', href: '/student/dashboard', authRequired: true },
    { label: 'My Courses', href: '/student/courses', authRequired: true },
    { label: 'Progress', href: '/student/progress', authRequired: true },
    { label: 'Certificates', href: '/student/certificates', authRequired: true },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(16,43,70,0.04)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            className="p-2 md:hidden rounded-lg text-[#102b46] hover:bg-slate-100 transition-colors"
            onClick={toggleMobile}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* SARYONAYA Brand Logo */}
          <SaryonayaLogo size="sm" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {navLinks.map((link) => {
              if (link.authRequired && !isSignedIn) return null
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-50 text-[#c58a23] border border-[#e5a93b]/40'
                      : 'text-[#102b46]/80 hover:text-[#102b46] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-3">
          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-[#f6f9fd] border border-slate-200/90 rounded-full focus-within:border-[#dfa32b] focus-within:bg-white transition-all">
            <Search size={15} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search Python, VLSI, AI..."
              className="bg-transparent text-xs text-[#092347] placeholder-slate-400 outline-none w-36 lg:w-48 font-medium"
            />
          </div>

          {/* Notification Bell */}
          <Link
            href="/student/progress"
            className="relative p-2 rounded-full text-[#092347] hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={19} strokeWidth={2.2} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Link>

          {/* Auth State */}
          {isLoaded && !isSignedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="px-4 py-1.5 rounded-full text-xs font-bold text-[#092347] hover:bg-slate-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-5 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#092347] border-t border-[#ffe8a3]/60 shadow-[0_4px_16px_rgba(223,163,43,0.32)] hover:shadow-[0_6px_22px_rgba(223,163,43,0.48)] hover:scale-[1.02] active:scale-[0.98] transition-all tracking-wide"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0f3460] text-[#f5cb68] border border-[#dfa32b]/40 text-xs font-black shadow-sm hover:scale-[1.02] transition-all tracking-wide"
              >
                <Crown size={13} className="text-[#f5cb68]" />
                <span>Go Premium</span>
              </Link>
              <UserButton />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            if (link.authRequired && !isSignedIn) return null
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className={`block px-3 py-2 rounded-xl text-sm font-bold ${
                  isActive ? 'bg-amber-50 text-[#c58a23]' : 'text-[#102b46] hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenu(false)}
              className="text-xs font-semibold text-slate-500 hover:text-[#102b46]"
            >
              Admin Portal →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
