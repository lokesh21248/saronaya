'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlayCircle, BarChart2, Settings } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'My Courses', href: '/student/courses', icon: PlayCircle },
    { label: 'Progress', href: '/student/progress', icon: BarChart2 },
    { label: 'Profile', href: '/student/profile', icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] py-2 px-6">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 py-1 transition-all group relative"
            >
              <div
                className={`transition-colors ${
                  isActive ? 'text-[#102b46]' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.4 : 1.8} />
              </div>
              <span
                className={`text-[11px] mt-1 font-semibold transition-colors ${
                  isActive ? 'text-[#102b46]' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Golden Underline Pill */}
              {isActive && (
                <span className="w-8 h-[3px] bg-gradient-to-r from-[#d89b2b] to-[#f5cb68] rounded-full mt-1 animate-in fade-in zoom-in-50 duration-200" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

