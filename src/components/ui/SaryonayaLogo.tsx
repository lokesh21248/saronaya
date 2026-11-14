import React from 'react'
import Link from 'next/link'

interface SaryonayaLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SaryonayaLogo({ className = '', size = 'md' }: SaryonayaLogoProps) {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 54 : 44

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Golden Crest Seal */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-full shadow-md group-hover:scale-105 transition-transform"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Outer Gold Ring */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dual Gold Rings */}
          <circle cx="50" cy="50" r="47" stroke="url(#goldGradient)" strokeWidth="3" />
          <circle cx="50" cy="50" r="42" stroke="url(#goldGradientLight)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="38" fill="#ffffff" />

          {/* Graduation Cap on top */}
          <path
            d="M50 24 L68 31 L50 38 L32 31 Z"
            fill="#102b46"
          />
          <path
            d="M38 34.5 L38 42 Q50 48 62 42 L62 34.5"
            fill="none"
            stroke="#102b46"
            strokeWidth="2.5"
          />
          {/* Tassel */}
          <path d="M64 32 L68 40 L66 43" stroke="#e5a93b" strokeWidth="1.5" fill="none" />

          {/* Interlocking Monogram SN */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontFamily="serif"
            fontWeight="900"
            fontSize="32"
            fill="#102b46"
            letterSpacing="-1"
          >
            SN
          </text>

          {/* Laurel stars / arc at bottom */}
          <circle cx="43" cy="74" r="1.5" fill="#e5a93b" />
          <circle cx="50" cy="75" r="2" fill="#e5a93b" />
          <circle cx="57" cy="74" r="1.5" fill="#e5a93b" />

          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d89b2b" />
              <stop offset="50%" stopColor="#f5cb68" />
              <stop offset="100%" stopColor="#b37c1d" />
            </linearGradient>
            <linearGradient id="goldGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7dc8c" />
              <stop offset="100%" stopColor="#d89b2b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <span className="text-[#102b46] font-extrabold text-xl sm:text-2xl tracking-[0.14em] uppercase leading-none font-serif">
          SARYONAYA
        </span>
        {/* Subtle gold line & star divider */}
        <div className="flex items-center gap-1 my-1">
          <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#e5a93b]" />
          <span className="text-[#e5a93b] text-[8px]">★</span>
          <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#e5a93b]" />
        </div>
        <span className="text-[#5a7184] text-[10px] sm:text-[11px] font-medium tracking-normal leading-tight">
          A New Beginning for Every Learner
        </span>
      </div>
    </Link>
  )
}

