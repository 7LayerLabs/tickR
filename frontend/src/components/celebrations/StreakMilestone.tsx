'use client'

import { useEffect, useState } from 'react'
import { Flame, X } from 'lucide-react'

interface StreakMilestoneProps {
  days: number
  xp: number
  onDismiss: () => void
}

export function StreakMilestone({ days, xp, onDismiss }: StreakMilestoneProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))

    // Auto dismiss after 4 seconds for small milestones
    if (days < 30) {
      const timer = setTimeout(onDismiss, 4000)
      return () => clearTimeout(timer)
    }
  }, [days, onDismiss])

  const getMessage = () => {
    if (days >= 30) return "You're a LEGEND! 30 days of consistency!"
    if (days >= 7) return "A whole week! You're unstoppable!"
    if (days >= 3) return "Great start! Keep the momentum!"
    return "Nice! You're building a habit!"
  }

  const getEmoji = () => {
    if (days >= 30) return '🏆'
    if (days >= 7) return '⭐'
    return '🔥'
  }

  // Full modal for 30-day milestone
  if (days >= 30) {
    return (
      <>
        <div
          className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onDismiss}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className={`
              relative pointer-events-auto
              w-full max-w-md p-8 rounded-3xl text-center
              bg-gradient-to-br from-orange-500/20 via-navy-800 to-navy-900
              border border-orange-500/40
              shadow-2xl
              transition-all duration-500 ease-out
              ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'}
            `}
            style={{
              boxShadow: '0 0 80px rgba(249, 115, 22, 0.3), 0 0 120px rgba(249, 115, 22, 0.1)',
            }}
          >
            {/* Flames decoration */}
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Flame
                  key={i}
                  className="w-8 h-8 text-orange-400"
                  fill="#fb923c"
                  style={{
                    animation: `flame-dance 0.5s ease-in-out ${i * 0.1}s infinite alternate`,
                  }}
                />
              ))}
            </div>

            <div className="text-6xl mb-4">{getEmoji()}</div>

            <h2
              className="text-4xl font-display font-black mb-2"
              style={{
                background: 'linear-gradient(135deg, #fb923c, #f97316, #ea580c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {days}-DAY STREAK!
            </h2>

            <p className="text-xl text-cream-100 mb-2">{getMessage()}</p>
            <p className="text-slate-400 mb-6">
              Your dedication is truly inspiring.
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500/20 border border-orange-500/30 mb-6">
              <span className="text-2xl font-display font-bold text-orange-400">+{xp} XP</span>
            </div>

            <button
              onClick={onDismiss}
              className="w-full px-6 py-4 rounded-xl font-display font-bold text-lg text-navy-900 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 transition-all"
            >
              Keep It Going!
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes flame-dance {
            0% { transform: scaleY(1) translateY(0); }
            100% { transform: scaleY(1.1) translateY(-2px); }
          }
        `}</style>
      </>
    )
  }

  // Toast style for smaller milestones (3-day, 7-day)
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onDismiss}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`
            relative pointer-events-auto
            w-full max-w-sm p-6 rounded-2xl text-center
            bg-navy-800 border border-orange-500/30
            shadow-xl
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
          `}
        >
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-cream-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: Math.min(days, 7) }).map((_, i) => (
              <Flame key={i} className="w-6 h-6 text-orange-400" fill="#fb923c" />
            ))}
          </div>

          <h3 className="text-2xl font-display font-bold text-orange-400 mb-1">
            {days}-Day Streak!
          </h3>
          <p className="text-slate-300 mb-4">{getMessage()}</p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30">
            <span className="font-display font-bold text-orange-400">+{xp} XP</span>
          </div>
        </div>
      </div>
    </>
  )
}
