import React from 'react'
import { LucideIcon } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  options: { value: string; label: string }[]
}

export function Select({
  label,
  error,
  icon: Icon,
  className = '',
  options,
  ...props
}: SelectProps) {
  const inputId = props.id || label?.toLowerCase().replace(/\s+/g, '-')

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
        <select
          id={inputId}
          className={`w-full appearance-none rounded-lg border border-line bg-cream py-2.5 pl-9 pr-8 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}
