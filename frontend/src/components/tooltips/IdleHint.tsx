'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Lightbulb, ChevronRight } from 'lucide-react'
import { useTooltipStore, IDLE_HINTS, type IdleHint as IdleHintType } from '@/lib/tooltip.store'
import { useGameStore } from '@/lib/game.store'
import { useIsGuidedMode } from '@/lib/onboarding.store'

interface IdleHintProps {
  // Optional: force a specific hint for testing
  forceHint?: IdleHintType
}

// How long to wait before showing idle hint (60 seconds)
const IDLE_THRESHOLD = 60 * 1000

export function IdleHint({ forceHint }: IdleHintProps) {
  const router = useRouter()
  const [activeHint, setActiveHint] = useState<IdleHintType | null>(forceHint || null)
  const [isVisible, setIsVisible] = useState(false)

  const { lastActivityTime, idleHintDismissed, dismissIdleHint, updateActivity } = useTooltipStore()
  const { positions, lessonProgress, totalTrades } = useGameStore()
  const isGuidedMode = useIsGuidedMode()

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      updateActivity()
      setActiveHint(null)
      setIsVisible(false)
    }

    // Update activity on user interactions
    window.addEventListener('click', handleActivity)
    window.addEventListener('keydown', handleActivity)
    window.addEventListener('scroll', handleActivity)

    return () => {
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('scroll', handleActivity)
    }
  }, [updateActivity])

  // Check for idle and show appropriate hint
  useEffect(() => {
    if (forceHint) {
      setActiveHint(forceHint)
      setIsVisible(true)
      return
    }

    // Only show hints in guided mode
    if (!isGuidedMode || idleHintDismissed) return

    const checkIdle = () => {
      const now = Date.now()
      const isIdle = now - lastActivityTime > IDLE_THRESHOLD

      if (isIdle && !activeHint) {
        // Determine which hint to show based on user state
        let hint: IdleHintType | null = null

        // Empty portfolio
        if (positions.length === 0 && totalTrades === 0) {
          hint = IDLE_HINTS.find((h) => h.condition === 'empty_portfolio') || null
        }
        // No lessons completed in a while (simplified check)
        else if (lessonProgress.length < 3) {
          hint = IDLE_HINTS.find((h) => h.condition === 'no_lessons') || null
        }
        // Default idle hint
        else {
          hint = IDLE_HINTS.find((h) => h.condition === 'idle') || null
        }

        if (hint) {
          setActiveHint(hint)
          setTimeout(() => setIsVisible(true), 100)
        }
      }
    }

    const interval = setInterval(checkIdle, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [isGuidedMode, idleHintDismissed, lastActivityTime, activeHint, positions, totalTrades, lessonProgress, forceHint])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      setActiveHint(null)
      dismissIdleHint()
    }, 300)
  }

  const handleAction = () => {
    if (!activeHint) return

    if (activeHint.actionUrl.startsWith('#')) {
      // Special action (like opening quest hub)
      // The parent component should handle this
      handleDismiss()
    } else {
      router.push(activeHint.actionUrl)
      handleDismiss()
    }
  }

  if (!activeHint) return null

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-40
        w-full max-w-md px-4
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className="p-4 rounded-2xl bg-navy-800 border border-teal-500/30 shadow-xl shadow-teal-500/10">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-teal-400" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-display font-bold text-cream-100">
                {activeHint.title}
              </h4>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-lg text-slate-400 hover:text-cream-100 hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              {activeHint.message}
            </p>
            <button
              onClick={handleAction}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-display font-semibold text-sm text-navy-900 bg-teal-400 hover:bg-teal-300 transition-colors"
            >
              {activeHint.actionLabel}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
