import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-navy">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`w-full rounded-lg border border-line bg-cream p-3 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y ${
          error ? 'border-red-500 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}
