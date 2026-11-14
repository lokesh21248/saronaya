'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Crown, Loader2 } from 'lucide-react'

interface Premium3DButtonProps {
  children?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

type MotionProps = Premium3DButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof Premium3DButtonProps>

export function Premium3DButton({
  children = 'Go Premium',
  isLoading = false,
  disabled = false,
  className = '',
  size = 'md',
  ...props
}: MotionProps) {
  const sizeClasses = {
    sm: 'h-9 px-3.5 text-xs font-black gap-1.5 rounded-full',
    md: 'h-11 sm:h-12 px-5 text-xs sm:text-sm font-black gap-2 rounded-full',
    lg: 'h-12 sm:h-13 px-7 text-sm sm:text-base font-black gap-2.5 rounded-full',
    xl: 'h-14 px-9 text-base sm:text-lg font-black gap-3 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden
        bg-gradient-to-r from-[#061B3A] via-[#092653] to-[#061B3A]
        text-[#F8D77A] font-sans tracking-wide
        border border-[#E9AC32]/70 border-b-[3px] border-b-[#9c6a0c]
        shadow-[0_4px_18px_rgba(233,172,50,0.35),0_2px_4px_rgba(6,27,58,0.4)]
        hover:shadow-[0_8px_28px_rgba(233,172,50,0.55)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        transition-colors cursor-pointer group ${sizeClasses} ${className}`}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-full" />
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#E9AC32]" />
      ) : (
        <>
          <Crown className="w-4 h-4 text-[#E9AC32] fill-[#E9AC32] shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="bg-gradient-to-r from-[#F8D77A] via-[#E9AC32] to-[#d4941e] bg-clip-text text-transparent font-black">
            {children}
          </span>
        </>
      )}
    </motion.button>
  )
}

