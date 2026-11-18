'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Terminal,
  Coffee,
  Layers,
  Component,
  Globe,
  BarChart3,
  Cpu,
  Brain,
  Cloud,
  Server,
  GitMerge,
  CircuitBoard,
  Zap,
  Activity,
  Settings,
  Building,
  Shield,
  Briefcase,
  Folder,
} from 'lucide-react'

export interface CategoryData {
  id: string
  name: string
  subtitle?: string
  description?: string
  slug: string
  icon?: string
  iconType?: string
  thumbnail_url?: string | null
  image_url?: string | null
  display_order?: number
}

interface CategoryCardProps {
  category: CategoryData
  className?: string
}

// Map Lucide icons by category name or icon string
function getCategoryIcon(iconName?: string, catName?: string) {
  const key = (iconName || catName || '').toLowerCase()

  if (key.includes('cyber') || key.includes('hack') || key.includes('shield') || key.includes('security')) {
    return <Shield className="w-6 h-6 text-red-500" />
  }
  if (key.includes('python') || key.includes('terminal')) {
    return <Terminal className="w-6 h-6 text-emerald-500" />
  }
  if (key.includes('java') || key.includes('coffee')) {
    return <Coffee className="w-6 h-6 text-amber-600" />
  }
  if (key.includes('full stack') || key.includes('layers')) {
    return <Layers className="w-6 h-6 text-blue-500" />
  }
  if (key.includes('react') || key.includes('component')) {
    return <Component className="w-6 h-6 text-cyan-500" />
  }
  if (key.includes('next') || key.includes('globe')) {
    return <Globe className="w-6 h-6 text-slate-800" />
  }
  if (key.includes('data') || key.includes('analytics') || key.includes('barchart')) {
    return <BarChart3 className="w-6 h-6 text-indigo-500" />
  }
  if (key.includes('ai') || key.includes('artificial') || key.includes('cpu')) {
    return <Cpu className="w-6 h-6 text-purple-500" />
  }
  if (key.includes('machine') || key.includes('learning') || key.includes('brain')) {
    return <Brain className="w-6 h-6 text-pink-500" />
  }
  if (key.includes('aws') || key.includes('cloud') || key.includes('server')) {
    return <Cloud className="w-6 h-6 text-amber-500" />
  }
  if (key.includes('devops') || key.includes('git')) {
    return <GitMerge className="w-6 h-6 text-orange-500" />
  }
  if (key.includes('embedded') || key.includes('iot') || key.includes('circuit')) {
    return <CircuitBoard className="w-6 h-6 text-emerald-600" />
  }
  if (key.includes('vlsi') || key.includes('electrical') || key.includes('zap') || key.includes('power')) {
    return <Zap className="w-6 h-6 text-yellow-500" />
  }
  if (key.includes('mechanical') || key.includes('settings')) {
    return <Settings className="w-6 h-6 text-slate-600" />
  }
  if (key.includes('civil') || key.includes('building')) {
    return <Building className="w-6 h-6 text-teal-600" />
  }
  if (key.includes('business') || key.includes('briefcase')) {
    return <Briefcase className="w-6 h-6 text-blue-600" />
  }
  if (key.includes('activity')) {
    return <Activity className="w-6 h-6 text-rose-500" />
  }

  return <Code2 className="w-6 h-6 text-[#0B3473]" />
}

export function CategoryCard({ category, className = '' }: CategoryCardProps) {
  const { name, subtitle, description, slug, icon, iconType } = category

  // 1. Check if a custom image was uploaded by admin
  const uploadedImage = category.thumbnail_url || category.image_url

  // 2. Check for dedicated 3D PNG mockups
  const lowerName = name.toLowerCase()
  let pngSrc: string | null = null

  if (iconType === 'programming' || lowerName === 'programming') {
    pngSrc = '/images/mockup/icon-programming.png'
  } else if (iconType === 'datascience' || lowerName.includes('data science')) {
    pngSrc = '/images/mockup/icon-datascience.png'
  } else if (iconType === 'design' || lowerName.includes('design') || lowerName.includes('ui')) {
    pngSrc = '/images/mockup/icon-design.png'
  } else if (iconType === 'business' || lowerName.includes('business')) {
    pngSrc = '/images/mockup/icon-business.png'
  }

  const displaySubtitle = subtitle || description || 'Master skills • Build projects'

  return (
    <Link href={`/courses?category=${encodeURIComponent(name)}`} className="block w-full">
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className={`group bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4
          border border-slate-200/90 border-b-[2px] sm:border-b-[3px] border-b-slate-300/80
          shadow-[0_2px_10px_rgba(9,35,71,0.05)] sm:shadow-[0_4px_16px_rgba(9,35,71,0.06)]
          hover:shadow-[0_12px_28px_rgba(9,35,71,0.12),0_2px_6px_rgba(223,163,43,0.15)]
          hover:border-[#e5a93b]/40
          flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1.5 sm:gap-3 transition-all cursor-pointer ${className}`}
      >
        {/* 3D Icon & Text */}
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3.5 min-w-0 w-full sm:w-auto">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#f8fafc] p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-xs border border-slate-100">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt={name}
                className="w-full h-full object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : pngSrc ? (
              <img
                src={pngSrc}
                alt={name}
                className="w-full h-full object-contain drop-shadow-sm"
              />
            ) : (
              getCategoryIcon(icon, name)
            )}
          </div>
          <div className="min-w-0 w-full sm:w-auto">
            <h4 className="font-extrabold text-[11px] sm:text-sm text-[#07182e] group-hover:text-[#092347] transition-colors truncate leading-tight">
              {name}
            </h4>
            <p className="hidden sm:block text-[10px] sm:text-[11px] text-slate-500 font-medium truncate mt-0.5 max-w-[140px]">
              {displaySubtitle}
            </p>
          </div>
        </div>

        {/* Right: Round 3D Arrow Action Button (Visible on sm+ screens) */}
        <div className="hidden sm:flex w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-slate-50 border border-slate-200/90 group-hover:bg-[#07182e] group-hover:border-[#07182e] items-center justify-center shrink-0 shadow-xs transition-all duration-200">
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#e5a93b] group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </motion.div>
    </Link>
  )
}
