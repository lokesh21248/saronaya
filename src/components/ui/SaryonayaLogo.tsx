import React from 'react'
import Link from 'next/link'

interface SaryonayaLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'seal'
  href?: string
}

export function SaryonayaLogo({
  className = '',
  size = 'md',
  variant = 'full',
  href = '/',
}: SaryonayaLogoProps) {
  // Height sizing for horizontal logo
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-13',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28',
  }[size]

  // Seal dimensions
  const sealSize = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }[size]

  const content =
    variant === 'seal' ? (
      <div
        className={`relative rounded-full overflow-hidden shrink-0 shadow-md ring-2 ring-[#dfa32b]/50 group-hover:scale-105 transition-transform bg-white ${sealSize} ${className}`}
      >
        <svg viewBox="20 110 320 355" className="w-full h-full">
          <image href="/images/sarvonaya-logo.jpg" width="1024" height="576" />
        </svg>
      </div>
    ) : (
      <div className={`relative flex items-center shrink-0 group-hover:opacity-95 transition-opacity ${className}`}>
        <img
          src="/images/sarvonaya-logo.jpg"
          alt="SARVONAYA - A New Beginning for Every Learner"
          className={`${heightClass} w-auto max-w-[280px] sm:max-w-xs md:max-w-sm object-contain mix-blend-multiply`}
        />
      </div>
    )

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center group">
        {content}
      </Link>
    )
  }

  return content
}
