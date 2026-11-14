'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface Secondary3DButtonProps {
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

type MotionProps = Secondary3DButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof Secondary3DButtonProps>

export function Secondary3DButton({
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
    sm: 'h-9 px-4 text-xs font-bold gap-1.5 rounded-full',
    md: 'h-11 sm:h-12 px-6 text-sm sm:text-base font-bold gap-2 rounded-full',
    lg: 'h-12 sm:h-13 px-8 text-sm sm:text-base font-extrabold gap-2.5 rounded-full',
    xl: 'h-14 px-10 text-base sm:text-lg font-black gap-3 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.01 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none
        bg-white text-[#092653] font-sans tracking-wide
        border border-[#092653]/15 border-b-[2px] border-b-[#092653]/30
        shadow-[0_4px_14px_rgba(9,38,83,0.06)]
        hover:border-[#092653]/35 hover:bg-[#F4F7FC] hover:shadow-[0_8px_20px_rgba(9,38,83,0.1)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        transition-colors cursor-pointer group ${sizeClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#092653]" />
      ) : (
        <>
          {icon && <span className="shrink-0 text-[#092653]">{icon}</span>}
          <span>{children}</span>
          {rightIcon && (
            <span className="shrink-0 group-hover:translate-x-1 transition-transform">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </motion.button>
  )
}

