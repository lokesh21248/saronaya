import React from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
}

export function Input({ label, error, icon: Icon, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-navy">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border border-line bg-cream py-2.5 pl-9 pr-3 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}
