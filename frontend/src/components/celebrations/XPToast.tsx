'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

interface XPToastProps {
  xp: number
  reason?: string
  onComplete: () => void
}

export function XPToast({ xp, reason, onComplete }: XPToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Enter animation
    requestAnimationFrame(() => setIsVisible(true))

    // Auto dismiss after 2.5 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 2500)

    // Complete after exit animation
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2800)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-xl
        bg-navy-800 border border-orange-500/30
        shadow-lg shadow-orange-500/20
        transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
    >
      {/* XP Icon with glow */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #fb923c, #f97316)',
          boxShadow: '0 0 12px rgba(249, 115, 22, 0.5)',
        }}
      >
        <Zap className="w-4 h-4 text-white" fill="white" />
      </div>

      {/* XP Amount */}
      <div>
        <div className="font-display font-bold text-orange-400">
          +{xp} XP
        </div>
        {reason && (
          <div className="text-xs text-slate-400">{reason}</div>
        )}
      </div>
    </div>
  )
}

// Container to stack multiple toasts
interface XPToastContainerProps {
  toasts: Array<{ id: string; xp: number; reason?: string }>
  onDismiss: (id: string) => void
}

export function XPToastContainer({ toasts, onDismiss }: XPToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <XPToast
          key={toast.id}
          xp={toast.xp}
          reason={toast.reason}
          onComplete={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  )
}
