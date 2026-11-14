import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-cream border border-line rounded-xl shadow-sm transition-all duration-200 ${
        hover ? 'hover:shadow-md hover:border-navy-soft' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
