'use client'

import { useEffect, useState, useCallback } from 'react'
import { useCelebrationStore } from '@/lib/celebration.store'
import { LevelUpScreen } from './LevelUpScreen'
import { AchievementPopup } from './AchievementPopup'
import { QuestCompleteModal } from './QuestCompleteModal'
import { StreakMilestone } from './StreakMilestone'
import { FirstTradePopup } from './FirstTradePopup'
import { XPToastContainer } from './XPToast'

// =====================================================
//   CELEBRATION PROVIDER
//   Wraps the app and shows celebrations based on queue
// =====================================================

interface XPToastItem {
  id: string
  xp: number
  reason?: string
}

export function CelebrationProvider({ children }: { children: React.ReactNode }) {
  const { currentCelebration, dismissCurrent } = useCelebrationStore()
  const [xpToasts, setXpToasts] = useState<XPToastItem[]>([])

  // Handle XP gain celebrations separately (they're non-blocking toasts)
  useEffect(() => {
    if (currentCelebration?.type === 'xp_gain') {
      // Add to toast stack instead of showing as modal
      setXpToasts((prev) => [
        ...prev,
        {
          id: currentCelebration.id,
          xp: currentCelebration.data.xp || 0,
          reason: currentCelebration.data.description,
        },
      ])
      // Immediately dismiss to process next in queue
      dismissCurrent()
    }
  }, [currentCelebration, dismissCurrent])

  // Remove XP toast when it completes
  const handleXPToastDismiss = useCallback((id: string) => {
    setXpToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Handle dismiss for modal celebrations
  const handleDismiss = useCallback(() => {
    dismissCurrent()
  }, [dismissCurrent])

  // Render the appropriate celebration component
  const renderCelebration = () => {
    if (!currentCelebration || currentCelebration.type === 'xp_gain') {
      return null
    }

    switch (currentCelebration.type) {
      case 'level_up':
        return (
          <LevelUpScreen
            level={currentCelebration.data.level || 1}
            levelTitle={currentCelebration.data.levelTitle || 'Rookie Investor'}
            previousLevel={currentCelebration.data.previousLevel || 0}
            onDismiss={handleDismiss}
          />
        )

      case 'achievement':
        return (
          <AchievementPopup
            title={currentCelebration.data.title || 'Achievement Unlocked!'}
            description={currentCelebration.data.description || ''}
            icon={currentCelebration.data.badgeIcon || '🏆'}
            xp={currentCelebration.data.xp || 0}
            onDismiss={handleDismiss}
          />
        )

      case 'quest_complete':
        return (
          <QuestCompleteModal
            questTitle={currentCelebration.data.questTitle || 'Quest Complete!'}
            xp={currentCelebration.data.xp || 0}
            badge={currentCelebration.data.badge}
            onDismiss={handleDismiss}
          />
        )

      case 'streak_milestone':
        return (
          <StreakMilestone
            days={currentCelebration.data.streakDays || 1}
            xp={currentCelebration.data.xp || 0}
            onDismiss={handleDismiss}
          />
        )

      case 'first_trade':
        return (
          <FirstTradePopup
            ticker={currentCelebration.data.ticker || 'AAPL'}
            shares={currentCelebration.data.shares || 1}
            xp={currentCelebration.data.xp || 25}
            onDismiss={handleDismiss}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      {children}

      {/* XP Toasts (non-blocking, can stack) */}
      <XPToastContainer toasts={xpToasts} onDismiss={handleXPToastDismiss} />

      {/* Modal celebrations (blocking, one at a time) */}
      {renderCelebration()}
    </>
  )
}

// =====================================================
//   CELEBRATION DEMO COMPONENT
//   For testing celebrations during development
// =====================================================

export function CelebrationDemo() {
  const {
    celebrateLevelUp,
    celebrateAchievement,
    celebrateQuestComplete,
    celebrateStreakMilestone,
    celebrateFirstTrade,
    celebrateXPGain,
  } = useCelebrationStore()

  return (
    <div className="fixed bottom-4 left-4 z-[200] flex flex-col gap-2 p-4 bg-navy-800 rounded-xl border border-white/10">
      <div className="text-xs font-display font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Celebration Demo
      </div>

      <button
        onClick={() => celebrateLevelUp(2, 'Stock Picker', 1)}
        className="px-3 py-2 text-sm bg-gold-500/20 hover:bg-gold-500/30 text-gold-400 rounded-lg transition-colors"
      >
        Level Up
      </button>

      <button
        onClick={() => celebrateAchievement('First Steps', 'Made your first trade!', '🚀', 50)}
        className="px-3 py-2 text-sm bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors"
      >
        Achievement
      </button>

      <button
        onClick={() => celebrateQuestComplete('Stock Market Starter', 250, 'starter_badge')}
        className="px-3 py-2 text-sm bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg transition-colors"
      >
        Quest Complete
      </button>

      <button
        onClick={() => celebrateStreakMilestone(7, 100)}
        className="px-3 py-2 text-sm bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors"
      >
        7-Day Streak
      </button>

      <button
        onClick={() => celebrateStreakMilestone(30, 500)}
        className="px-3 py-2 text-sm bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors"
      >
        30-Day Streak
      </button>

      <button
        onClick={() => celebrateFirstTrade('AAPL', 5)}
        className="px-3 py-2 text-sm bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg transition-colors"
      >
        First Trade
      </button>

      <button
        onClick={() => celebrateXPGain(25, 'Completed a lesson')}
        className="px-3 py-2 text-sm bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-colors"
      >
        +25 XP Toast
      </button>

      <button
        onClick={() => {
          // Test queue - add multiple at once
          celebrateXPGain(10, 'Bonus XP')
          celebrateXPGain(15, 'Streak bonus')
          celebrateAchievement('Quick Learner', 'Complete 5 lessons in one day', '📚', 75)
        }}
        className="px-3 py-2 text-sm bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors"
      >
        Test Queue
      </button>
    </div>
  )
}
