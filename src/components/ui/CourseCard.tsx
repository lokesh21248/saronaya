'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, BookOpen, User, ArrowRight } from 'lucide-react'
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
  imageType?: 'python' | 'datascience' | 'design' | 'business' | 'web' | 'ai' | 'general'
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

  // Badge gradient based on badge text
  const getBadgeStyle = (b?: string) => {
    switch (b?.toLowerCase()) {
      case 'bestseller':
        return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30'
      case 'new':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
      case 'popular':
        return 'bg-gradient-to-r from-amber-500 to-[#e5a93b] text-white shadow-amber-500/30'
      case 'top rated':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30'
      default:
        return 'bg-gradient-to-r from-[#092347] to-[#12365e] text-white shadow-navy/30'
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

    if (imageType === 'python') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#061527] via-[#0b284e] to-[#040e1a] relative flex items-center justify-center overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px]" />
          {/* 3D Python Logo */}
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6]/20 to-[#e5a93b]/20 p-2 border border-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center">
            <svg viewBox="0 0 128 128" className="w-14 h-14 drop-shadow-[0_4px_12px_rgba(229,169,59,0.5)]">
              <path fill="#387eb8" d="M63.5 12.8c-26 0-24.4 11.3-24.4 11.3l.1 11.7h24.8v3.5H30.4S15 37.5 15 63.6s13.5 24 13.5 24h8.1v-11.4s-.4-13.6 13.4-13.6h23.2s12.8.2 12.8-12.6V26.2s1.8-13.4-22.5-13.4zm-13.2 7.3c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4-4.4-2-4.4-4.4 2-4.4 4.4-4.4z"/>
              <path fill="#ffe052" d="M64.5 115.2c26 0 24.4-11.3 24.4-11.3l-.1-11.7H64v-3.5h33.6s15.4 1.8 15.4-24.3-13.5-24-13.5-24h-8.1v11.4s.4 13.6-13.4 13.6H49.3s-12.8-.2-12.8 12.6v23.8s-1.8 13.5 22.5 13.5h5.5zm13.2-7.3c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4z"/>
            </svg>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e5a93b]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#3b82f6]/20 rounded-full blur-2xl pointer-events-none" />
        </div>
      )
    }

    if (imageType === 'datascience') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#06182c] via-[#0e3b66] to-[#040e1b] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          {/* 3D Glowing Data Chart visualization */}
          <div className="relative z-10 flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="w-3.5 h-8 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-md shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            <div className="w-3.5 h-14 bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-md shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
            <div className="w-3.5 h-11 bg-gradient-to-t from-indigo-500 to-[#e5a93b] rounded-t-md shadow-[0_0_12px_rgba(229,169,59,0.5)]" />
            <div className="w-3.5 h-18 bg-gradient-to-t from-[#e5a93b] to-amber-300 rounded-t-md shadow-[0_0_14px_rgba(245,203,104,0.6)]" />
          </div>
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-cyan-300/70">AI / ML Model</div>
        </div>
      )
    }

    if (imageType === 'design') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#121c2d] via-[#1c2c44] to-[#0a121e] relative flex items-center justify-center overflow-hidden">
          {/* UI Screen Layers */}
          <div className="relative z-10 flex items-center justify-center -space-x-4">
            <div className="w-16 h-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl border border-white/20 transform -rotate-12 scale-90 opacity-80" />
            <div className="w-20 h-28 rounded-xl bg-gradient-to-br from-blue-600 via-[#e5a93b] to-pink-500 shadow-2xl border border-white/30 transform scale-100 z-10 flex flex-col p-2 justify-between">
              <div className="w-6 h-2 bg-white/40 rounded-full" />
              <div className="w-full h-10 bg-white/20 rounded-lg backdrop-blur-sm" />
              <div className="w-10 h-2 bg-white/40 rounded-full" />
            </div>
            <div className="w-16 h-24 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 shadow-xl border border-white/20 transform rotate-12 scale-90 opacity-80" />
          </div>
        </div>
      )
    }

    if (imageType === 'business') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#07192e] via-[#0d2e53] to-[#040f1c] relative flex items-center justify-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-16 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-[#d99222] border border-amber-300/40 shadow-2xl flex items-center justify-center">
              <div className="w-6 h-1.5 bg-[#07182e] rounded-sm" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
              <span>Financial Analytics</span>
            </div>
          </div>
        </div>
      )
    }

    // Default general course thumbnail
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#06182c] via-[#0b2b4e] to-[#030d17] relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-xl">
          <BookOpen className="w-7 h-7 text-[#e5a93b]" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden
        border border-slate-200/90 border-b-[3px] border-b-slate-300/70
        shadow-[0_4px_20px_rgba(9,35,71,0.06)]
        hover:shadow-[0_14px_34px_rgba(9,35,71,0.14),0_2px_8px_rgba(223,163,43,0.15)]
        hover:border-[#e5a93b]/40
        flex flex-col transition-all ${className}`}
    >
      {/* 16:9 Thumbnail Container */}
      <Link href={`/courses/${slug}`} className="relative block aspect-[16/9] w-full overflow-hidden">
        {renderThumbnailVisual()}

        {/* Badge (Bestseller, New, Popular, Top Rated) */}
        {badge && (
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-md backdrop-blur-sm ${getBadgeStyle(
              badge
            )}`}
          >
            ★ {badge}
          </div>
        )}

        {/* Subtle bottom gradient on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        {/* Course Title */}
        <div>
          <Link href={`/courses/${slug}`}>
            <h3 className="font-extrabold text-sm sm:text-base text-[#07182e] group-hover:text-[#092347] line-clamp-1 transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          {/* Instructor & Rating row */}
          <div className="mt-2 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium truncate">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-[#092347] flex items-center justify-center shrink-0 font-bold text-[10px]">
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
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{rating}</span>
              <span className="text-slate-400 font-normal">({reviews})</span>
            </div>
          </div>
        </div>

        {/* Duration & Lessons */}
        <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 border-t border-slate-100 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{duration}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>{lessonsCount} Lessons</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-[#07182e]">
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

          <Link href={`/courses/${slug}`}>
            <EnrollButton size="sm">Enroll Now</EnrollButton>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
