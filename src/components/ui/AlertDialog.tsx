import React from 'react'
import { AlertCircle } from 'lucide-react'

interface AlertDialogProps {
  isOpen: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'warning'
}

export function AlertDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger',
}: AlertDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-cream p-6 shadow-xl">
        <div className="mb-4 flex items-start gap-3">
          <AlertCircle className={`h-5 w-5 mt-0.5 ${
            variant === 'danger' ? 'text-red-500' : 'text-amber-500'
          }`} />
          <div>
            <h3 className="text-lg font-bold text-navy">{title}</h3>
            <p className="mt-1 text-sm text-muted">{description}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-line bg-white/80 px-4 py-2 text-sm font-semibold text-navy transition hover:bg-white"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm()
            }}
            className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition active:scale-[0.98] ${
              variant === 'danger'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-amber-500 text-navy-deep hover:bg-amber-600'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
