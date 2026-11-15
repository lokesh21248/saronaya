'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Crown,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Zap,
} from 'lucide-react'
import { PrimaryButton, Gold3DButton } from '@/components/ui/Buttons'
import { supabase } from '@/lib/supabase/client'

interface BannerItem {
  id: string
  tag: string
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  gradient: string
  accentColor: string
  icon: React.ReactNode
  badge: string
}

function getBannerIcon(title: string, badge?: string) {
  const text = `${title} ${badge || ''}`.toLowerCase()
  if (text.includes('pass') || text.includes('unlimited') || text.includes('premium')) {
    return <Crown className="w-10 h-10 text-[#E9AC32]" />
  }
  if (text.includes('gate') || text.includes('placement') || text.includes('career') || text.includes('exam')) {
    return <Zap className="w-10 h-10 text-[#F8D77A]" />
  }
  if (text.includes('course') || text.includes('masterclass') || text.includes('foundations')) {
    return <GraduationCap className="w-10 h-10 text-[#F8D77A]" />
  }
  return <Sparkles className="w-10 h-10 text-[#E9AC32]" />
}

function mapApiBannerToItem(b: any, index: number): BannerItem {
  const gradients = [
    'from-[#092653] via-[#0c2f66] to-[#1a5fb4]',
    'from-[#061B3A] via-[#092653] to-[#1456A0]',
    'from-[#041328] via-[#092653] to-[#0e3b6e]',
  ]

  return {
    id: b.id || `dyn-banner-${index}`,
    tag: b.badge_text || 'ALL-ACCESS PASS',
    title: b.title,
    subtitle: b.description || 'Get full access to all premium engineering courses and verified certificates.',
    ctaText: b.cta_text || 'Explore Passes',
    ctaHref: b.cta_url || '/subscriptions',
    gradient: gradients[index % gradients.length],
    accentColor: '#F8D77A',
    badge: b.callout_text ? (b.callout_text.includes('👑') ? b.callout_text : `👑 ${b.callout_text}`) : 'Save 45% This Month',
    icon: getBannerIcon(b.title, b.badge_text),
  }
}

const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: 'banner-premium',
    tag: 'ALL-ACCESS PASS',
    title: 'Unlock Unlimited Learning',
    subtitle: 'Get full access to all 500+ premium courses, live mentor doubt clearing, and verified certificates.',
    ctaText: 'Go Premium',
    ctaHref: '/subscriptions',
    gradient: 'from-[#092653] via-[#0c2f66] to-[#1a5fb4]',
    accentColor: '#F8D77A',
    badge: '👑 Save 45% This Month',
    icon: <Crown className="w-10 h-10 text-[#E9AC32]" />,
  },
  {
    id: 'banner-skills',
    tag: 'FEATURED PROGRAM',
    title: 'Upgrade Your Skills Today',
    subtitle: 'Explore industry-ready courses taught by expert instructors with real-world engineering projects.',
    ctaText: 'Explore Courses',
    ctaHref: '/courses',
    gradient: 'from-[#061B3A] via-[#092653] to-[#1456A0]',
    accentColor: '#E9AC32',
    badge: '500+ Industry Modules',
    icon: <GraduationCap className="w-10 h-10 text-[#F8D77A]" />,
  },
  {
    id: 'banner-career',
    tag: 'CAREER ACCELERATION',
    title: 'Learn Today. Build Your Future.',
    subtitle: 'Develop in-demand tech skills that prepare you for top hiring partners and multinational corporations.',
    ctaText: 'Start Learning',
    ctaHref: '/courses?sort=bestseller',
    gradient: 'from-[#041328] via-[#092653] to-[#0e3b6e]',
    accentColor: '#E9AC32',
    badge: 'Recognized Credentials',
    icon: <Zap className="w-10 h-10 text-[#F8D77A]" />,
  },
]

export function PromotionalBanners() {
  const [banners, setBanners] = useState<BannerItem[]>(DEFAULT_BANNERS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch live banners from Admin Portal API or Supabase
  useEffect(() => {
    let cancelled = false

    async function loadLiveBanners() {
      // 1. Try local customer API route (/api/banners)
      try {
        const localRes = await fetch('/api/banners', { cache: 'no-store' })
        if (localRes.ok) {
          const json = await localRes.json()
          if (!cancelled && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setBanners(json.data.map(mapApiBannerToItem))
            return
          }
        }
      } catch (err) {
        // Continue to next source
      }

      // 2. Try direct Admin Portal API (https://admin-saronya.vercel.app/api/banners)
      try {
        const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin-saronya.vercel.app'
        const adminRes = await fetch(`${adminUrl}/api/banners`, {
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        })
        if (adminRes.ok) {
          const json = await adminRes.json()
          if (!cancelled && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setBanners(json.data.map(mapApiBannerToItem))
            return
          }
        }
      } catch (err) {
        // Continue to Supabase direct
      }

      // 3. Try direct client-side Supabase query
      try {
        const { data, error } = await supabase
          .from('promotional_banners')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (!cancelled && !error && data && data.length > 0) {
          setBanners(data.map(mapApiBannerToItem))
        }
      } catch (err) {
        console.warn('Supabase direct banner fetch fallback:', err)
      }
    }

    loadLiveBanners()
    return () => {
      cancelled = true
    }
  }, [])

  // Auto-slide every 6 seconds on desktop if not paused
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, banners.length])

  return (
    <section className="py-6 sm:py-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Mobile Horizontal Snap Carousel */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          {banners.map((b) => (
            <div
              key={b.id}
              className={`snap-center shrink-0 w-[88vw] max-w-[340px] rounded-3xl p-5 bg-gradient-to-br ${b.gradient} text-white shadow-[0_8px_24px_rgba(9,38,83,0.22)] border border-[#E9AC32]/30 flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Background ambient glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#E9AC32]/20 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#1456A0]/30 blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-[#F8D77A] border border-[#F8D77A]/30">
                    <Sparkles className="w-3 h-3 text-[#E9AC32]" />
                    {b.tag}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300">
                    {b.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white leading-tight tracking-tight">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-200/90 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                  {b.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <Link href={b.ctaHref} className="w-full">
                  <button className="w-full h-11 px-4 rounded-full text-xs font-black text-[#061B3A] bg-gradient-to-r from-[#E9AC32] via-[#F8D77A] to-[#d99222] border-t border-white/60 border-b-2 border-b-[#9b680f] shadow-[0_3px_12px_rgba(233,172,50,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span>{b.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#061B3A]" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop / Tablet Featured Hero Banner Slider */}
      <div
        className="hidden md:block relative rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(9,38,83,0.18)] border border-[#E9AC32]/35"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`p-8 lg:p-10 bg-gradient-to-r ${banners[currentIndex].gradient} text-white relative transition-all duration-500 min-h-[220px] flex items-center`}>
          {/* Subtle 3D wave background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-[#E9AC32]/20 via-[#1456A0]/15 to-transparent rounded-full blur-3xl" />
            <svg
              className="absolute right-0 bottom-0 h-full w-[45%] opacity-20"
              viewBox="0 0 400 200"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 200 C150 150 250 80 400 0 L400 200 Z"
                fill="#E9AC32"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-12 gap-8 items-center w-full">
            {/* Text & CTAs */}
            <div className="col-span-8 lg:col-span-9 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-[#F8D77A] border border-[#F8D77A]/40 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#E9AC32]" />
                  {banners[currentIndex].tag}
                </span>
                <span className="text-xs font-extrabold text-[#F8D77A]/90">
                  {banners[currentIndex].badge}
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                {banners[currentIndex].title}
              </h3>

              <p className="text-sm lg:text-base text-slate-200 max-w-2xl font-medium leading-relaxed">
                {banners[currentIndex].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <Link href={banners[currentIndex].ctaHref}>
                  <Gold3DButton size="md" className="h-11">
                    <span className="flex items-center gap-2">
                      <span>{banners[currentIndex].ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[#061B3A]" />
                    </span>
                  </Gold3DButton>
                </Link>

                <div className="flex items-center gap-1.5 ml-4">
                  {banners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === i
                          ? 'w-7 bg-[#E9AC32]'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Graphic Emblem */}
            <div className="col-span-4 lg:col-span-3 flex justify-end">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform">
                {banners[currentIndex].icon}
              </div>
            </div>
          </div>

          {/* Left / Right arrows */}
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
