'use client'

import React, { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { Search, ShoppingCart, BookOpen, LogOut, Menu, X, Shield, Award, BarChart2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NavLink } from '@/components/layout/NavLink'

interface StudentTopNavProps {
  onMenuClick?: () => void
  isMenuOpen?: boolean
}

export function StudentTopNav({ onMenuClick, isMenuOpen }: StudentTopNavProps) {
  const { isSignedIn, user, isLoaded } = useUser()
  const [mobileMenu, setMobileMenu] = useState(false)

  const toggleMobile = () => {
    if (onMenuClick) {
      onMenuClick()
    } else {
      setMobileMenu(!mobileMenu)
    }
  }

  const isOpen = isMenuOpen !== undefined ? isMenuOpen : mobileMenu

  return (
    <header className="bg-navy border-b border-line sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            className="p-2 lg:hidden text-cream hover:bg-navy-soft"
            onClick={toggleMobile}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-navy-deep font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-tight leading-tight">
                SARYONAYA
              </span>
              <span className="text-[10px] text-gold tracking-widest uppercase font-semibold">
                Online Learning
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2 ml-4">
            <NavLink href="/courses">All Courses</NavLink>
            <NavLink href="/pricing">Subscriptions</NavLink>
            {isSignedIn && (
              <>
                <NavLink href="/student/dashboard">My Learning</NavLink>
                <NavLink href="/student/progress">Progress</NavLink>
                <NavLink href="/student/certificates">Certificates</NavLink>
              </>
            )}
            <NavLink href="/admin">Admin Portal</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-navy-soft/60 border border-line/20 rounded-lg focus-within:border-gold transition-colors">
            <Search size={16} className="text-muted" />
            <input
              type="text"
              placeholder="Search CSE, AI, Web..."
              className="bg-transparent text-sm text-cream placeholder-muted outline-none w-36 lg:w-48"
            />
          </div>

          {/* Auth buttons */}
          {isLoaded && !isSignedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="outline" size="sm" className="border-white/20 text-cream hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="gold" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8 border-2 border-gold/40',
                  },
                  variables: {
                    colorPrimary: '#d9ad61',
                    colorBackground: '#102b46',
                    colorNeutral: '#fbf8f1',
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation drop-down */}
      {isOpen && (
        <div className="lg:hidden border-t border-line/10 bg-navy px-4 py-4 space-y-2">
          <Link
            href="/courses"
            className="block px-3 py-2 rounded-lg text-sm text-cream hover:bg-navy-soft font-medium"
            onClick={() => setMobileMenu(false)}
          >
            Browse Courses
          </Link>
          <Link
            href="/pricing"
            className="block px-3 py-2 rounded-lg text-sm text-cream hover:bg-navy-soft font-medium"
            onClick={() => setMobileMenu(false)}
          >
            Subscription Plans
          </Link>
          {isSignedIn && (
            <>
              <Link
                href="/student/dashboard"
                className="block px-3 py-2 rounded-lg text-sm text-cream hover:bg-navy-soft font-medium"
                onClick={() => setMobileMenu(false)}
              >
                My Dashboard
              </Link>
              <Link
                href="/student/progress"
                className="block px-3 py-2 rounded-lg text-sm text-cream hover:bg-navy-soft font-medium"
                onClick={() => setMobileMenu(false)}
              >
                My Progress
              </Link>
              <Link
                href="/student/certificates"
                className="block px-3 py-2 rounded-lg text-sm text-cream hover:bg-navy-soft font-medium"
                onClick={() => setMobileMenu(false)}
              >
                My Certificates
              </Link>
            </>
          )}
          <Link
            href="/admin"
            className="block px-3 py-2 rounded-lg text-sm text-gold hover:bg-navy-soft font-medium"
            onClick={() => setMobileMenu(false)}
          >
            Admin Management
          </Link>
        </div>
      )}
    </header>
  )
}

interface StudentLayoutProps {
  children: ReactNode
  heroTitle?: string
  heroDescription?: string
  heroImage?: React.ReactNode
  className?: string
}

export function StudentLayoutWithHeader({
  children,
  heroTitle,
  heroDescription,
  heroImage,
  className = '',
}: StudentLayoutProps) {
  return (
    <div className={`min-h-screen bg-navy-deep text-cream ${className}`}>
      <StudentTopNav />
      <main className="pb-24">
        {(heroImage || (heroTitle && heroDescription)) && (
          <section className="relative py-10 md:py-16 px-4 bg-navy-glow/30 border-b border-line/10">
            {heroImage}
            {heroTitle && heroDescription && (
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="heading-1 text-white">{heroTitle}</h1>
                <p className="body-large text-muted mt-3 max-w-2xl mx-auto">{heroDescription}</p>
              </div>
            )}
          </section>
        )}
        {children}
      </main>
    </div>
  )
}
