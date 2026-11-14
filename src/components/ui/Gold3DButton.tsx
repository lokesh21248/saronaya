'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'

interface Gold3DButtonProps {
  children?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

type MotionProps = Gold3DButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof Gold3DButtonProps>

export function Gold3DButton({
  children,
  isLoading = false,
  disabled = false,
  className = '',
  size = 'md',
  icon,
  rightIcon,
  ...props
}: MotionProps) {
  const sizeClasses = {
    sm: 'h-9 px-4 text-xs font-black gap-1.5 rounded-full',
    md: 'h-11 sm:h-12 px-6 text-sm sm:text-base font-black gap-2 rounded-full',
    lg: 'h-12 sm:h-13 px-8 text-sm sm:text-base font-black gap-2.5 rounded-full',
    xl: 'h-14 px-10 text-base sm:text-lg font-black gap-3 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden
        bg-gradient-to-r from-[#E9AC32] via-[#F8D77A] to-[#d4941e]
        text-[#061B3A] font-sans tracking-wide
        border-t border-white/60 border-b-[3px] border-[#9c6a0c]
        shadow-[0_4px_16px_rgba(233,172,50,0.38),0_2px_4px_rgba(6,27,58,0.25)]
        hover:shadow-[0_8px_26px_rgba(233,172,50,0.55),0_3px_8px_rgba(6,27,58,0.3)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        transition-colors cursor-pointer group ${sizeClasses} ${className}`}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-full" />

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#061B3A]" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {rightIcon ? (
            <span className="shrink-0 group-hover:translate-x-1 transition-transform">
              {rightIcon}
            </span>
          ) : (
            <ArrowRight className="w-4 h-4 shrink-0 text-[#061B3A] group-hover:translate-x-1 transition-transform" />
          )}
        </>
      )}
    </motion.button>
  )
}

