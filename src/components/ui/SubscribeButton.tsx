'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Crown, ArrowRight, Loader2 } from 'lucide-react'
import { Primary3DButton } from './Primary3DButton'

interface SubscribeButtonProps {
  children?: React.ReactNode
  highlight?: boolean
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
}

type MotionProps = SubscribeButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof SubscribeButtonProps>

export function SubscribeButton({
  children = 'Subscribe Now',
  highlight = false,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}: MotionProps) {
  if (highlight) {
    return (
      <motion.button
        whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.02 }}
        whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        disabled={disabled || isLoading}
        className={`relative w-full py-3.5 px-6 rounded-full font-black text-xs sm:text-sm md:text-base
          bg-gradient-to-r from-[#E9AC32] via-[#F8D77A] to-[#d4941e] text-[#061B3A]
          border-t border-white/60 border-b-[3px] border-[#9c6a0c]
          shadow-[0_6px_22px_rgba(233,172,50,0.4)]
          hover:shadow-[0_10px_30px_rgba(233,172,50,0.6)]
          cursor-pointer flex items-center justify-center gap-2 group ${className}`}
        {...props}
      >
        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-full" />
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-[#061B3A]" />
        ) : (
          <>
            <Crown className="w-4 h-4 text-[#061B3A]" />
            <span>{children}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>
    )
  }

  return (
    <Primary3DButton className={`w-full ${className}`} {...props}>
      {children}
    </Primary3DButton>
  )
}
