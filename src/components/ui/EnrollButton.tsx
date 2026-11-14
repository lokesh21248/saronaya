'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'

interface EnrollButtonProps {
  children?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
}

type MotionProps = EnrollButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof EnrollButtonProps>

export function EnrollButton({
  children = 'Enroll Now',
  isLoading = false,
  disabled = false,
  className = '',
  size = 'md',
  ...props
}: MotionProps) {
  const sizeClasses = {
    sm: 'px-2.5 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-black gap-1 rounded-full',
    md: 'px-3 sm:px-4.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold gap-1 sm:gap-1.5 rounded-full',
    lg: 'px-5 py-2.5 text-xs sm:text-sm font-black gap-2 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -2, scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { y: 1.5, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden shrink-0
        bg-gradient-to-r from-[#061B3A] via-[#092653] to-[#1456A0] text-white font-sans
        border-t border-[#F8D77A]/30 border-b-[2px] border-[#040f21]
        shadow-[0_3px_10px_rgba(9,38,83,0.28)]
        hover:shadow-[0_5px_16px_rgba(9,38,83,0.4)]
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer group whitespace-nowrap ${sizeClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin text-[#E9AC32]" />
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E9AC32] group-hover:translate-x-0.5 transition-transform" />
        </>
      )}
    </motion.button>
  )
}
