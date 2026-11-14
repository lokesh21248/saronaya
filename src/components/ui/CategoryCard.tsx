'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Laptop, BarChart3, Palette, Briefcase } from 'lucide-react'

export interface CategoryData {
  id: string
  name: string
  subtitle: string
  slug: string
  iconType: 'programming' | 'datascience' | 'design' | 'business'
}

interface CategoryCardProps {
  category: CategoryData
  className?: string
}

export function CategoryCard({ category, className = '' }: CategoryCardProps) {
  const { name, subtitle, slug, iconType } = category

  // 3D tactile icon visuals matching the mockup
  const render3DIcon = () => {
    switch (iconType) {
      case 'programming':
        return (
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-[#07182e] p-2.5 shadow-lg border border-blue-400/20 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-full h-8 rounded-lg bg-[#0e2a4d] flex items-center justify-center border border-cyan-400/30">
              <span className="font-mono font-bold text-cyan-300 text-xs sm:text-sm tracking-wider">
                &lt;/&gt;
              </span>
            </div>
            <div className="w-10 h-1.5 mt-1.5 rounded-full bg-slate-400/40" />
          </div>
        )
      case 'datascience':
        return (
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-blue-50 p-2.5 shadow-md border border-amber-300/30 flex items-end justify-center gap-1.5 shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-2.5 h-6 bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-sm shadow-sm" />
            <div className="w-2.5 h-9 bg-gradient-to-t from-[#dfa32b] to-[#f5cb68] rounded-t-sm shadow-sm" />
            <div className="w-2.5 h-11 bg-gradient-to-t from-blue-900 to-indigo-600 rounded-t-sm shadow-sm" />
          </div>
        )
      case 'design':
        return (
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 p-2 shadow-md border border-rose-200/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {/* Colorful 3D palette illustration */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-rose-400 to-indigo-500 shadow-md flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/90 shadow-inner -translate-x-1 -translate-y-1" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm translate-x-2 -translate-y-1" />
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm translate-x-1.5 translate-y-2" />
            </div>
          </div>
        )
      case 'business':
        return (
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-800 to-amber-950 p-2.5 shadow-lg border border-amber-600/30 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {/* 3D Briefcase */}
            <div className="w-6 h-2 rounded-t-md border-t-2 border-x-2 border-amber-300/80 -mb-0.5" />
            <div className="w-10 h-7 rounded-lg bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-500/40 shadow-inner flex items-center justify-center relative">
              <div className="w-full h-0.5 bg-amber-950/60" />
              <div className="absolute w-2 h-2 rounded-xs bg-[#e5a93b] shadow-sm" />
            </div>
          </div>
        )
      default:
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Laptop className="w-6 h-6 text-[#092347]" />
          </div>
        )
    }
  }

  return (
    <Link href={`/courses?category=${encodeURIComponent(name)}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={`group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5
          border border-slate-200/90 border-b-[3px] border-b-slate-300/70
          shadow-[0_4px_16px_rgba(9,35,71,0.05)]
          hover:shadow-[0_12px_28px_rgba(9,35,71,0.12),0_2px_6px_rgba(223,163,43,0.15)]
          hover:border-[#e5a93b]/40
          flex items-center justify-between gap-3 sm:gap-4 transition-all cursor-pointer ${className}`}
      >
        {/* Left: 3D Icon & Text */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {render3DIcon()}
          <div className="min-w-0">
            <h4 className="font-black text-sm sm:text-base text-[#07182e] group-hover:text-[#092347] transition-colors truncate">
              {name}
            </h4>
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Round 3D Arrow Action Button */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-50 border border-slate-200/80 group-hover:bg-[#07182e] group-hover:border-[#07182e] flex items-center justify-center shrink-0 shadow-sm transition-all duration-200">
          <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-[#e5a93b] group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </motion.div>
    </Link>
  )
}

