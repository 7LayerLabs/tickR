'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Gift, X, ChevronRight } from 'lucide-react'

interface QuestCompleteModalProps {
  questTitle: string
  xp: number
  badge?: string
  onDismiss: () => void
}

export function QuestCompleteModal({ questTitle, xp, badge, onDismiss }: QuestCompleteModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showRewards, setShowRewards] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))

    // Show rewards with delay
    const rewardTimer = setTimeout(() => setShowRewards(true), 800)

    return () => clearTimeout(rewardTimer)
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onDismiss}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`
            relative pointer-events-auto
            w-full max-w-md p-6 rounded-3xl
            bg-navy-800 border border-teal-500/30
            shadow-2xl
            transition-all duration-500 ease-out
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'}
          `}
          style={{
            boxShadow: '0 0 60px rgba(45, 212, 191, 0.2), 0 0 100px rgba(20, 184, 166, 0.1)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-cream-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div
              className={`
                inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4
                transition-all duration-500
                ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
              `}
              style={{
                background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.3), rgba(20, 184, 166, 0.3))',
                boxShadow: '0 0 30px rgba(45, 212, 191, 0.4)',
              }}
            >
              <CheckCircle2 className="w-10 h-10 text-teal-400" />
            </div>

            <div className="text-xs font-display font-semibold text-teal-400 uppercase tracking-wider mb-1">
              Quest Complete!
            </div>
            <h2 className="text-2xl font-display font-bold text-cream-100">
              {questTitle}
            </h2>
          </div>

          {/* Rewards */}
          <div
            className={`
              p-4 rounded-2xl bg-navy-900/50 border border-white/10 mb-6
              transition-all duration-500 delay-300
              ${showRewards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-gold-400" />
              <span className="font-display font-semibold text-cream-100">Rewards</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              {/* XP Reward */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(234, 88, 12, 0.3))',
                  }}
                >
                  <span className="text-2xl">⚡</span>
                </div>
                <span className="text-orange-400 font-display font-bold">+{xp} XP</span>
              </div>

              {/* Badge Reward (if any) */}
              {badge && (
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.3), rgba(234, 179, 8, 0.3))',
                    }}
                  >
                    <span className="text-2xl">🏆</span>
                  </div>
                  <span className="text-gold-400 font-display font-bold text-sm">New Badge</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onDismiss}
              className="flex-1 px-4 py-3 rounded-xl font-display font-semibold text-slate-300 bg-navy-900 border border-white/10 hover:border-white/20 transition-all"
            >
              Continue
            </button>
            <button
              onClick={onDismiss}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-display font-semibold text-navy-900 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 transition-all"
            >
              View Quests
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
