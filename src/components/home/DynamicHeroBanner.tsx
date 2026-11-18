'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowRight, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons'
import type { HeroBanner } from '@/types/database'

interface DynamicHeroBannerProps {
  initialBanners?: HeroBanner[]
}

const DEFAULT_HERO_BANNER: HeroBanner = {
  id: 'b0000000-0000-0000-0000-000000000001',
  title: 'Learn Anytime, Anywhere',
  subtitle: 'Upgrade your skills with expert-led online courses and take your career to the next level.',
  image_url: '/images/mockup/hero-student-3d.png',
  mobile_image_url: '/images/mockup/hero-mobile-banner-2x.png',
  button_text: 'Explore Courses',
  button_link: '/courses',
  is_active: true,
  display_order: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export function DynamicHeroBanner({ initialBanners }: DynamicHeroBannerProps) {
  const [banners, setBanners] = useState<HeroBanner[]>(
    initialBanners && initialBanners.length > 0 ? initialBanners : [DEFAULT_HERO_BANNER]
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(!initialBanners || initialBanners.length === 0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  // Fetch active hero banners from Supabase API
  useEffect(() => {
    let isMounted = true

    async function fetchHeroBanners() {
      try {
        const res = await fetch('/api/banners', {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        })
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const json = await res.json()

        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Sort by display order
          const sorted = [...json.data].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
          setBanners(sorted)
        }
      } catch (err) {
        console.warn('DynamicHeroBanner fetch notice (using fallback):', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchHeroBanners()

    return () => {
      isMounted = false
    }
  }, [])

  // Auto-play carousel when multiple active banners exist
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [banners.length, isPaused])

  const currentBanner = banners[currentIndex] || DEFAULT_HERO_BANNER

  // Touch swipe support for mobile
  function handleTouchStart(e: React.TouchEvent) {
    setTouchStartX(e.touches[0].clientX)
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        setCurrentIndex((prev) => (prev + 1) % banners.length)
      } else {
        // Swiped right -> prev
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : banners.length - 1))
      }
    }
    setTouchStartX(null)
  }

  // Helper to split title into primary + gold gradient accent
  const titleParts = (currentBanner.title || 'Learn Anytime, Anywhere').split(',')
  const mainTitlePart = titleParts[0]
  const accentTitlePart = titleParts.slice(1).join(',').trim()

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative"
    >
      {/* ========================================================================= */}
      {/* MOBILE HERO BANNER (< lg) — Responsive & Dynamically Admin-Managed        */}
      {/* ========================================================================= */}
      <section
        className="lg:hidden px-3 pt-3 pb-2 bg-gradient-to-b from-[#eef3f9] to-[#f4f7fb]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="w-full aspect-[16/9] rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse border border-slate-200" />
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner.id || currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(9,38,83,0.14)] border border-slate-200/90 active:scale-[0.99] transition-transform"
              >
                <Link
                  href={currentBanner.button_link || '/courses'}
                  className="block relative group"
                  aria-label={currentBanner.title}
                >
                  {currentBanner.mobile_image_url ? (
                    <div className="relative w-full aspect-[16/9] sm:aspect-[944/484] bg-slate-900">
                      <Image
                        src={currentBanner.mobile_image_url}
                        alt={currentBanner.title}
                        fill
                        unoptimized
                        priority={currentIndex === 0}
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    /* Mobile Fallback Card when only desktop creative exists */
                    <div className="w-full bg-gradient-to-br from-[#102B50] via-[#143663] to-[#0A1F3B] p-5 text-white flex flex-col justify-between min-h-[190px]">
                      <div className="space-y-1.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
                          Featured
                        </span>
                        <h2 className="text-xl font-bold leading-tight drop-shadow-sm">
                          {currentBanner.title}
                        </h2>
                        {currentBanner.subtitle && (
                          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                            {currentBanner.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="pt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                          {currentBanner.button_text || 'Explore Courses'}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        {currentBanner.image_url && (
                          <div className="relative w-16 h-16 shrink-0">
                            <Image
                              src={currentBanner.image_url}
                              alt=""
                              fill
                              unoptimized
                              sizes="64px"
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <span className="sr-only">{currentBanner.title} - {currentBanner.button_text || 'Explore Courses'}</span>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Carousel Indicators */}
            {banners.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIndex ? 'w-5 bg-[#0B3473]' : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* DESKTOP HERO SECTION (>= lg) — 4K Premium UI & Dynamically Connected      */}
      {/* ========================================================================= */}
      <section className="hidden lg:block relative overflow-hidden bg-gradient-to-b from-[#eef3f9] via-white to-[#f4f7fb] pt-6 sm:pt-10 pb-8 sm:pb-14">
        {/* Sweeping 3D Royal Navy & Molten Gold Ribbon Waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 right-0 w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] bg-gradient-to-bl from-[#E9AC32]/20 via-[#092653]/10 to-transparent rounded-full blur-3xl" />

          <svg
            className="absolute right-0 top-0 w-full lg:w-[65%] h-full object-cover opacity-90 hidden sm:block"
            viewBox="0 0 900 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroNavyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#061B3A" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#092653" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1456A0" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="heroGoldRibbon" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E9AC32" />
                <stop offset="50%" stopColor="#F8D77A" />
                <stop offset="100%" stopColor="#d4941e" />
              </linearGradient>
            </defs>
            <path
              d="M300 0 C450 150 550 200 900 120 L900 600 L200 600 C350 400 200 250 300 0 Z"
              fill="url(#heroNavyGrad)"
            />
            <path
              d="M200 600 C380 380 480 280 900 200"
              stroke="url(#heroGoldRibbon)"
              strokeWidth="5"
              strokeLinecap="round"
              className="drop-shadow-md"
            />
            <path
              d="M160 600 C350 400 450 300 900 220"
              stroke="#092653"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner.id || currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[460px]"
            >
              {/* HEADLINES, CTAS & SOCIAL PROOF */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                {/* Hero Title */}
                <div className="space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B50] tracking-tight leading-[1.12]"
                  >
                    {mainTitlePart}
                    {accentTitlePart && (
                      <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#d4941e] via-[#E9AC32] to-[#F8D77A] bg-clip-text text-transparent drop-shadow-xs">
                        {accentTitlePart}
                      </span>
                    )}
                  </motion.h1>

                  {/* Subtitle */}
                  {currentBanner.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-xl leading-relaxed pt-1"
                    >
                      {currentBanner.subtitle}
                    </motion.p>
                  )}
                </div>

                {/* 3D Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
                >
                  <Link href={currentBanner.button_link || '/courses'}>
                    <PrimaryButton
                      size="lg"
                      icon={<Play className="w-4 h-4 text-white fill-white shrink-0 mr-1" />}
                      rightIcon={<ArrowRight className="w-4 h-4 text-[#F8D77A] shrink-0" />}
                    >
                      {currentBanner.button_text || 'Explore Courses'}
                    </PrimaryButton>
                  </Link>

                  <Link href="/courses">
                    <SecondaryButton
                      size="lg"
                      icon={<Play className="w-4 h-4 text-[#092653] fill-[#092653] shrink-0 mr-1" />}
                    >
                      Watch Demo
                    </SecondaryButton>
                  </Link>
                </motion.div>

                {/* Trust Indicators (Learner Avatars + Rating) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6"
                >
                  {/* Overlapping Avatars */}
                  <div className="flex items-center -space-x-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-tr from-[#061B3A] to-[#092653] text-[#F8D77A] text-xs font-black flex items-center justify-center shadow-sm">
                      +10K
                    </div>
                  </div>

                  {/* Rating Stars & Text */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="font-extrabold text-sm text-[#102B50]">4.8/5</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Trusted by 10,000+ Learners
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* DESKTOP RIGHT COLUMN: 3D Student / Banner Creative */}
              <div className="hidden lg:flex lg:col-span-5 relative items-center justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full max-w-lg aspect-square flex items-center justify-center"
                >
                  {currentBanner.image_url ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={currentBanner.image_url}
                        alt={currentBanner.title}
                        fill
                        unoptimized
                        priority={currentIndex === 0}
                        sizes="(max-width: 1280px) 450px, 512px"
                        className="object-contain drop-shadow-[0_18px_40px_rgba(9,38,83,0.18)]"
                      />
                    </div>
                  ) : (
                    <img
                      src="/images/mockup/hero-student-3d.png"
                      alt="SARYONAYA Student & 3D Interactive Elements"
                      className="w-full h-auto object-contain drop-shadow-[0_18px_40px_rgba(9,38,83,0.18)]"
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Carousel Navigation & Indicators */}
          {banners.length > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-2">
              <div className="flex items-center gap-2">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentIndex ? 'w-8 bg-[#092653]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : banners.length - 1))
                  }
                  className="p-2 rounded-full border border-slate-300 bg-white/80 hover:bg-white text-slate-700 shadow-sm transition-all"
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
                  className="p-2 rounded-full border border-slate-300 bg-white/80 hover:bg-white text-slate-700 shadow-sm transition-all"
                  aria-label="Next banner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
