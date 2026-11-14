import React from 'react'
import { AlertCircle, CheckCircle, Info, XCircle, AlertTriangle } from 'lucide-react'

type AlertVariant = 'error' | 'success' | 'warning' | 'info'

interface AlertProps {
  variant?: AlertVariant
  title: string
  children?: React.ReactNode
  className?: string
}

const variantStyles = {
  error: {
    icon: XCircle,
    container: 'bg-red-50/40 border-red-500/30 text-red-600',
    bg: 'rgba(197, 48, 48, 0.1)',
    border: 'rgba(197, 48, 48, 0.3)',
  },
  success: {
    icon: CheckCircle,
    container: 'bg-green-50/40 border-green-500/30 text-green-600',
    bg: 'rgba(89, 121, 105, 0.1)',
    border: 'rgba(89, 121, 105, 0.3)',
  },
  warning: {
    icon: AlertTriangle,
    container: 'bg-amber-50/40 border-amber-500/30 text-amber-600',
    bg: 'rgba(214, 158, 46, 0.1)',
    border: 'rgba(214, 158, 46, 0.3)',
  },
  info: {
    icon: Info,
    container: 'bg-blue-50/40 border-blue-500/30 text-blue-600',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
  },
}

export function Alert({ variant = 'info', title, children, className = '' }: AlertProps) {
  const styles = variantStyles[variant]
  const Icon = styles.icon

  return (
    <div className={`flex items-center gap-3 border rounded-lg p-4 ${styles.container} ${className}`}>
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{title}</p>
        {children && <p className="text-sm opacity-90 mt-0.5">{children}</p>}
      </div>
    </div>
  )
}
