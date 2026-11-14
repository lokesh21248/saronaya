'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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

  const iconSrc = {
    programming: '/images/mockup/icon-programming.png',
    datascience: '/images/mockup/icon-datascience.png',
    design: '/images/mockup/icon-design.png',
    business: '/images/mockup/icon-business.png',
  }[iconType]

  return (
    <Link href={`/courses?category=${encodeURIComponent(name)}`}>
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className={`group bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4
          border border-slate-200/90 border-b-[3px] border-b-slate-300/80
          shadow-[0_4px_16px_rgba(9,35,71,0.06)]
          hover:shadow-[0_12px_28px_rgba(9,35,71,0.12),0_2px_6px_rgba(223,163,43,0.15)]
          hover:border-[#e5a93b]/40
          flex items-center justify-between gap-3 transition-all cursor-pointer ${className}`}
      >
        {/* Left: Exact 3D Icon from Mockup & Text */}
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f8fafc] p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-xs border border-slate-100">
            <img
              src={iconSrc}
              alt={name}
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-sm sm:text-base text-[#07182e] group-hover:text-[#092347] transition-colors truncate leading-tight">
              {name}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Round 3D Arrow Action Button */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 border border-slate-200/90 group-hover:bg-[#07182e] group-hover:border-[#07182e] flex items-center justify-center shrink-0 shadow-xs transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#e5a93b] group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </motion.div>
    </Link>
  )
}
