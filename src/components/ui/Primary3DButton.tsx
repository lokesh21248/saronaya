'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'

interface Primary3DButtonProps {
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

type MotionProps = Primary3DButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof Primary3DButtonProps>

export function Primary3DButton({
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
    sm: 'px-4 py-2 text-xs font-bold gap-1.5 rounded-full',
    md: 'px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold gap-2 rounded-full',
    lg: 'px-8 py-3.5 text-sm sm:text-base font-extrabold gap-2.5 rounded-full',
    xl: 'px-10 py-4 text-base sm:text-lg font-black gap-3 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.01 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden
        bg-gradient-to-r from-[#061B3A] via-[#092653] to-[#1456A0]
        text-white font-sans tracking-wide
        border-t border-[#F8D77A]/40 border-b-[3px] border-[#040f21]
        shadow-[0_4px_16px_rgba(9,38,83,0.32),0_1px_3px_rgba(233,172,50,0.18)]
        hover:shadow-[0_8px_24px_rgba(9,38,83,0.42),0_2px_6px_rgba(233,172,50,0.25)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        transition-colors cursor-pointer group ${sizeClasses} ${className}`}
      {...props}
    >
      {/* Specular Top Reflection Sheen */}
      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-full" />

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#E9AC32]" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {rightIcon ? (
            <span className="shrink-0 group-hover:translate-x-1 transition-transform">
              {rightIcon}
            </span>
          ) : (
            <ArrowRight className="w-4 h-4 shrink-0 text-[#E9AC32] group-hover:translate-x-1 transition-transform" />
          )}
        </>
      )}
    </motion.button>
  )
}
