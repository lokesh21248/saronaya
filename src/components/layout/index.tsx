import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function StudentLayout({ children, className = '' }: Props) {
  return (
    <div className={`min-h-screen bg-navy-deep text-cream ${className}`}>
      {children}
    </div>
  )
}

export function AdminLayout({ children, className = '' }: Props) {
  return (
    <div className={`min-h-screen bg-navy-deep text-cream ${className}`}>
      {children}
    </div>
  )
}
