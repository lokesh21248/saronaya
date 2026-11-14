'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Layers,
  Users,
  CreditCard,
  Settings,
  ArrowLeft,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'All Courses', href: '/admin/courses', icon: BookOpen },
    { label: 'Course Builder', href: '/admin/courses/new', icon: PlusCircle },
    { label: 'Branch Mapping', href: '/admin/branches', icon: Layers },
    { label: 'Orders & Payments', href: '/admin/orders', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-navy-deep text-cream flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-navy border-r border-line/20 shrink-0">
        <div className="p-5 border-b border-line/20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-navy-deep font-bold text-sm shadow">
              S
            </div>
            <div>
              <span className="text-white font-bold text-base tracking-tight block">
                SARYONAYA
              </span>
              <span className="text-[10px] text-gold tracking-wider uppercase font-semibold">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold text-navy-deep font-bold shadow'
                    : 'text-muted hover:text-cream hover:bg-navy-soft/50'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-line/20 space-y-2">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Student Portal
          </Link>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-navy border-b border-line/20 px-4 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-cream"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <span className="font-bold text-white">Saryonaya Admin</span>
        </div>
        <Link href="/student/dashboard" className="text-xs text-gold font-medium">
          Student Portal →
        </Link>
      </header>

      {/* Mobile Sidebar Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-navy border-b border-line/20 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-gold text-navy-deep font-bold' : 'text-cream hover:bg-navy-soft'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
