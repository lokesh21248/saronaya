'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, BookOpen, User, Heart } from 'lucide-react'
import { EnrollButton } from '@/components/ui/Buttons'

export interface CourseCardData {
  id: string
  slug: string
  title: string
  subtitle?: string
  instructor: {
    name: string
    avatar?: string
    title?: string
  }
  rating: number | string
  reviews: string | number
  duration: string
  lessonsCount?: number
  price: number | string
  originalPrice?: number | string
  badge?: 'Bestseller' | 'New' | 'Popular' | 'Top Rated' | string
  badgeColor?: string
  thumbnail?: string
  imageType?:
    | 'python'
    | 'java'
    | 'fullstack'
    | 'react'
    | 'datascience'
    | 'ai'
    | 'machinelearning'
    | 'uiux'
    | 'design'
    | 'business'
    | 'marketing'
    | 'web'
    | 'general'
}

interface CourseCardProps {
  course: CourseCardData
  className?: string
  viewMode?: 'grid' | 'list'
}

export function CourseCard({
  course,
  className = '',
  viewMode = 'grid',
}: CourseCardProps) {
  const {
    id,
    slug,
    title,
    instructor,
    rating,
    reviews,
    duration,
    lessonsCount = 45,
    price,
    originalPrice,
    badge = 'Bestseller',
    thumbnail,
    imageType = 'general',
  } = course

  const [isFavorite, setIsFavorite] = useState(false)

  // Badge gradient based on badge text
  const getBadgeStyle = (b?: string) => {
    switch (b?.toLowerCase()) {
      case 'bestseller':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30'
      case 'new':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
      case 'popular':
        return 'bg-gradient-to-r from-amber-500 to-[#E9AC32] text-white shadow-amber-500/30'
      case 'top rated':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30'
      default:
        return 'bg-gradient-to-r from-[#092653] to-[#1456A0] text-white shadow-navy/30'
    }
  }

  // Render 3D artwork for thumbnail based on category / imageType
  const renderThumbnailVisual = () => {
    if (thumbnail && thumbnail.startsWith('http')) {
      return (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )
    }

    // Direct high-res 16:9 branded SVGs
    const svgMap: Record<string, string> = {
      python: '/images/courses/python.svg',
      java: '/images/courses/java.svg',
      fullstack: '/images/courses/fullstack.svg',
      react: '/images/courses/react.svg',
      datascience: '/images/courses/datascience.svg',
      ai: '/images/courses/ai.svg',
      machinelearning: '/images/courses/machinelearning.svg',
      uiux: '/images/courses/uiux.svg',
      design: '/images/courses/uiux.svg',
      business: '/images/courses/businessanalytics.svg',
      marketing: '/images/courses/digitalmarketing.svg',
      web: '/images/courses/fullstack.svg',
      general: '/images/courses/python.svg',
    }

    const matchedSvg = svgMap[imageType] || '/images/courses/python.svg'

    return (
      <div className="w-full h-full bg-[#061B3A] relative overflow-hidden flex items-center justify-center">
        <img
          src={matchedSvg}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group relative bg-white rounded-2xl overflow-hidden
        border border-slate-200/90 border-b-[3px] border-b-slate-300/80
        shadow-[0_4px_16px_rgba(9,38,83,0.06)]
        hover:shadow-[0_12px_30px_rgba(9,38,83,0.14),0_2px_8px_rgba(233,172,50,0.18)]
        hover:border-[#E9AC32]/60
        flex flex-col h-full justify-between transition-all ${className}`}
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-900 shrink-0">
        <Link href={`/courses/${slug}`} className="block w-full h-full">
          {renderThumbnailVisual()}
        </Link>

        {/* Badge (Bestseller, New, Popular, Top Rated) */}
        {badge && (
          <div
            className={`absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-md backdrop-blur-sm z-10 pointer-events-none ${getBadgeStyle(
              badge
            )}`}
          >
            ★ {badge}
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
          aria-label="Add to favorites"
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 active:scale-90 transition-all z-10 cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </button>

        {/* Subtle bottom gradient on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Content Container - 12-16px internal padding */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        {/* Course Title (14-16px, readable, line-clamp-2) */}
        <div>
          <Link href={`/courses/${slug}`}>
            <h3 className="font-bold text-sm sm:text-base text-[#102B50] group-hover:text-[#092653] line-clamp-2 transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          {/* Instructor & Rating row */}
          <div className="mt-2 flex items-center justify-between gap-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium truncate">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-[#092653] flex items-center justify-center shrink-0 font-bold text-[10px]">
                {instructor?.avatar ? (
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-3 h-3" />
                )}
              </div>
              <span className="truncate">{instructor.name}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 font-bold text-slate-800 shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span>{rating}</span>
              <span className="text-slate-400 font-normal hidden sm:inline">({reviews})</span>
            </div>
          </div>
        </div>

        {/* Duration & Lessons */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{lessonsCount} Lessons</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 leading-tight">
            <span className="text-sm sm:text-base md:text-lg font-black text-[#102B50]">
              {typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : price}
            </span>
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                {typeof originalPrice === 'number'
                  ? `₹${originalPrice.toLocaleString('en-IN')}`
                  : originalPrice}
              </span>
            )}
          </div>

          <Link href={`/courses/${slug}`} className="shrink-0">
            <EnrollButton size="sm">Enroll Now</EnrollButton>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}