'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface Icon3DButtonProps {
  children?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'white' | 'navy' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  title?: string
}

type MotionProps = Icon3DButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof Icon3DButtonProps>

export function Icon3DButton({
  children,
  isLoading = false,
  disabled = false,
  className = '',
  variant = 'white',
  size = 'md',
  ...props
}: MotionProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8 rounded-full',
    md: 'w-9 h-9 sm:w-10 sm:h-10 rounded-full',
    lg: 'w-11 h-11 sm:w-12 sm:h-12 rounded-full',
    xl: 'w-14 h-14 rounded-2xl',
  }[size]

  const variantClasses = {
    white:
      'bg-white text-[#092653] border border-slate-200 border-b-[2px] border-b-slate-300 shadow-xs hover:border-[#092653]/30 hover:bg-[#F4F7FC]',
    navy:
      'bg-gradient-to-r from-[#061B3A] to-[#1456A0] text-white border-t border-white/20 border-b-[2px] border-b-[#040f21] shadow-md hover:brightness-110',
    gold:
      'bg-gradient-to-r from-[#E9AC32] via-[#F8D77A] to-[#d4941e] text-[#061B3A] border-t border-white/40 border-b-[2px] border-b-[#9c6a0c] shadow-md hover:brightness-105',
  }[variant]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -2, scale: 1.05 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center select-none cursor-pointer transition-colors ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </motion.button>
  )
}

