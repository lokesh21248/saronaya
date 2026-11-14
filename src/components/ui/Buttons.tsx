'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { ArrowRight, Crown, Play, Loader2 } from 'lucide-react'

interface BaseButtonProps {
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

type MotionButtonProps = BaseButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof BaseButtonProps>

// 1. PRIMARY BUTTON: Deep navy-to-royal-blue gradient with 3D bottom extrusion & light sheen
export function PrimaryButton({
  children,
  isLoading = false,
  disabled = false,
  className = '',
  size = 'md',
  icon,
  rightIcon,
  ...props
}: MotionButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-bold gap-1.5 rounded-full',
    md: 'px-6 py-3 text-xs sm:text-sm font-extrabold gap-2 rounded-full',
    lg: 'px-8 py-3.5 text-sm sm:text-base font-extrabold gap-2.5 rounded-full',
    xl: 'px-10 py-4 text-base sm:text-lg font-black gap-3 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.01 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden
        bg-gradient-to-r from-[#07182e] via-[#092347] to-[#123963]
        text-white font-sans tracking-wide
        border-t border-white/20 border-b-[3px] border-[#040e1b]
        shadow-[0_6px_20px_rgba(7,24,46,0.32),0_2px_4px_rgba(223,163,43,0.15)]
        hover:shadow-[0_10px_26px_rgba(7,24,46,0.42),0_3px_8px_rgba(223,163,43,0.3)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        transition-colors cursor-pointer group ${sizeClasses} ${className}`}
      {...props}
    >
      {/* Subtle top reflection sheen */}
      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-full" />

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#e5a93b]" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {rightIcon ? (
            <span className="shrink-0 group-hover:translate-x-1 transition-transform">
              {rightIcon}
            </span>
          ) : (
            <ArrowRight className="w-4 h-4 shrink-0 text-[#e5a93b] group-hover:translate-x-1 transition-transform" />
          )}
        </>
      )}
    </motion.button>
  )
}

// 2. SECONDARY BUTTON: White surface, navy border, soft 3D depth shadow
export function SecondaryButton({
  children,
  isLoading = false,
  disabled = false,
  className = '',
  size = 'md',
  icon,
  rightIcon,
  ...props
}: MotionButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-bold gap-1.5 rounded-full',
    md: 'px-6 py-3 text-xs sm:text-sm font-bold gap-2 rounded-full',
    lg: 'px-8 py-3.5 text-sm sm:text-base font-extrabold gap-2.5 rounded-full',
    xl: 'px-10 py-4 text-base sm:text-lg font-black gap-3 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.01 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none
        bg-white text-[#092347] font-sans tracking-wide
        border border-[#092347]/15 border-b-[2px] border-b-[#092347]/25
        shadow-[0_4px_14px_rgba(9,35,71,0.06)]
        hover:border-[#092347]/30 hover:bg-[#f8fafc] hover:shadow-[0_8px_20px_rgba(9,35,71,0.1)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        transition-colors cursor-pointer group ${sizeClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#092347]" />
      ) : (
        <>
          {icon && <span className="shrink-0 text-[#092347]">{icon}</span>}
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

// 3. PREMIUM BUTTON: Royal navy with 24k molten gold crown & gold gradient border
export function PremiumButton({
  children = 'Go Premium',
  isLoading = false,
  disabled = false,
  className = '',
  size = 'md',
  ...props
}: MotionButtonProps) {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-bold gap-1.5 rounded-full',
    md: 'px-5 py-2.5 text-xs sm:text-sm font-extrabold gap-2 rounded-full',
    lg: 'px-7 py-3.5 text-sm sm:text-base font-black gap-2.5 rounded-full',
    xl: 'px-9 py-4 text-base sm:text-lg font-black gap-3 rounded-full',
  }[size]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden
        bg-gradient-to-r from-[#061527] via-[#0b2545] to-[#061527]
        text-[#fced9f] font-sans tracking-wide
        border border-[#e5a93b]/70 border-b-[3px] border-b-[#b37a18]
        shadow-[0_4px_18px_rgba(223,163,43,0.35),0_2px_4px_rgba(6,21,39,0.4)]
        hover:shadow-[0_8px_26px_rgba(223,163,43,0.55)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        transition-colors cursor-pointer group ${sizeClasses} ${className}`}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-full" />
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-[#dfa32b]" />
      ) : (
        <>
          <Crown className="w-4 h-4 text-[#e5a93b] fill-[#e5a93b] shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="bg-gradient-to-r from-[#fced9f] via-[#e5a93b] to-[#d99222] bg-clip-text text-transparent font-black">
            {children}
          </span>
        </>
      )}
    </motion.button>
  )
}

// 4. ICON BUTTON: 3D tactile circular/square button
export function IconButton({
  children,
  isLoading = false,
  disabled = false,
  className = '',
  variant = 'white',
  size = 'md',
  ...props
}: MotionButtonProps & { variant?: 'white' | 'navy' | 'gold' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-full',
    md: 'w-10 h-10 rounded-full',
    lg: 'w-12 h-12 rounded-full',
    xl: 'w-14 h-14 rounded-2xl',
  }[size]

  const variantClasses = {
    white:
      'bg-white text-[#092347] border border-slate-200 border-b-[2px] border-b-slate-300 shadow-sm hover:border-[#092347]/30 hover:bg-slate-50',
    navy:
      'bg-gradient-to-r from-[#07182e] to-[#0e2d53] text-white border-t border-white/20 border-b-[2px] border-b-[#030b14] shadow-md hover:brightness-110',
    gold:
      'bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d99222] text-[#07182e] border-t border-white/40 border-b-[2px] border-b-[#b37a18] shadow-md hover:brightness-105',
  }[variant]

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -2, scale: 1.05 }}
      whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center select-none cursor-pointer transition-colors ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </motion.button>
  )
}

// 5. ENROLL BUTTON: Prominent 3D course card button matching the mockup
export function EnrollButton({
  children = 'Enroll Now',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}: MotionButtonProps) {
  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -2, scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { y: 1, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden
        px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold rounded-full
        bg-gradient-to-r from-[#07182e] via-[#092347] to-[#123963] text-white
        border-t border-white/20 border-b-[2px] border-b-[#030b14]
        shadow-[0_4px_12px_rgba(7,24,46,0.3)]
        hover:shadow-[0_6px_18px_rgba(7,24,46,0.45)]
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer group gap-1.5 ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e5a93b]" />
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#e5a93b] group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </motion.button>
  )
}

// 6. COURSE ACTION BUTTON
export function CourseActionButton({
  children,
  variant = 'primary',
  ...props
}: MotionButtonProps & { variant?: 'primary' | 'secondary' }) {
  if (variant === 'secondary') {
    return <SecondaryButton size="sm" {...props}>{children}</SecondaryButton>
  }
  return <PrimaryButton size="sm" {...props}>{children}</PrimaryButton>
}

// 7. SUBSCRIBE BUTTON: High-conversion 3D Gold button for pricing plans
export function SubscribeButton({
  children = 'Subscribe Now',
  highlight = false,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}: MotionButtonProps & { highlight?: boolean }) {
  if (highlight) {
    return (
      <motion.button
        whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.02 }}
        whileTap={disabled || isLoading ? undefined : { y: 2, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        disabled={disabled || isLoading}
        className={`relative w-full py-3.5 px-6 rounded-full font-black text-sm sm:text-base
          bg-gradient-to-r from-[#dfa32b] via-[#f7d685] to-[#d99222] text-[#07182e]
          border-t border-white/50 border-b-[3px] border-b-[#a66d0e]
          shadow-[0_6px_22px_rgba(223,163,43,0.4)]
          hover:shadow-[0_10px_30px_rgba(223,163,43,0.6)]
          cursor-pointer flex items-center justify-center gap-2 group ${className}`}
        {...props}
      >
        <Crown className="w-4 h-4 text-[#07182e]" />
        <span>{children}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    )
  }

  return (
    <PrimaryButton className={`w-full ${className}`} {...props}>
      {children}
    </PrimaryButton>
  )
}

