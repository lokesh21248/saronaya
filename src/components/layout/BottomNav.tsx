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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_25px_rgba(16,43,70,0.08)] py-2 px-4 sm:px-6 md:hidden">
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
                  isActive ? 'text-[#092347]' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span
                className={`text-[10px] sm:text-[11px] mt-1 font-bold transition-colors ${
                  isActive ? 'text-[#092347]' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Golden Underline Indicator */}
              {isActive && (
                <span className="w-7 h-[3px] bg-gradient-to-r from-[#dfa32b] to-[#f5cb68] rounded-full mt-1 animate-in fade-in zoom-in-50 duration-200" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
