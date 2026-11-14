'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, BookOpen, BarChart3, User } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/courses', icon: Compass },
    { label: 'My Learning', href: '/my-learning', icon: BookOpen },
    { label: 'Progress', href: '/progress', icon: BarChart3 },
    { label: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(9,35,71,0.08)] py-1.5 px-2 md:hidden">
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
                className={`transition-colors p-1 rounded-xl ${
                  isActive
                    ? 'text-[#07182e] bg-amber-50/80 shadow-xs'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span
                className={`text-[10px] mt-0.5 font-bold transition-colors ${
                  isActive ? 'text-[#07182e]' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Golden Underline Indicator */}
              {isActive && (
                <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#dfa32b] to-[#f5cb68] rounded-full mt-0.5" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
