import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'navy'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  variant = 'gold',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-black transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full tracking-wide'

  const variantClasses = {
    gold: 'bg-gradient-to-r from-[#dfa32b] via-[#f5cb68] to-[#d4941e] text-[#092347] border-t border-[#ffe8a3]/60 shadow-[0_4px_16px_rgba(223,163,43,0.32)] hover:shadow-[0_6px_24px_rgba(223,163,43,0.48)] hover:scale-[1.02] active:scale-[0.98]',
    navy: 'bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0f3460] text-[#f5cb68] border border-[#dfa32b]/50 shadow-[0_4px_16px_rgba(7,24,46,0.3)] hover:shadow-[0_6px_22px_rgba(223,163,43,0.3)] hover:border-[#dfa32b] hover:scale-[1.02] active:scale-[0.98]',
    primary:
      'bg-gradient-to-r from-[#07182e] via-[#092347] to-[#0f3460] text-white border border-slate-700/60 shadow-md hover:brightness-110 active:scale-[0.98]',
    outline:
      'bg-white border border-slate-200 text-[#092347] hover:border-[#dfa32b] hover:bg-amber-50/50 shadow-sm active:scale-[0.98]',
    ghost: 'text-[#5a7184] hover:text-[#092347] hover:bg-slate-100/70',
  }

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export * from './Buttons'
