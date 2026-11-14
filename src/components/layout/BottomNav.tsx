'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, BookOpen, BarChart3, User } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'My Courses', href: '/courses', icon: BookOpen },
    { label: 'Progress', href: '/progress', icon: BarChart3 },
    { label: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(9,38,83,0.08)] pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-4 md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive =
            pathname === tab.href ||
            (tab.href !== '/' && pathname.startsWith(tab.href))

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 py-1 transition-all group relative"
            >
              <div
                className={`transition-colors p-1.5 rounded-xl ${
                  isActive
                    ? 'text-[#092653] bg-amber-50/80 shadow-xs'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span
                className={`text-[11px] mt-0.5 font-bold transition-colors ${
                  isActive ? 'text-[#092653]' : 'text-slate-500 group-hover:text-slate-700'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Golden Indicator Bar */}
              {isActive && (
                <span className="w-4 h-0.5 bg-[#E9AC32] rounded-full mt-1" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}