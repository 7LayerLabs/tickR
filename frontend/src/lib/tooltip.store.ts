'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// =====================================================
//   TOOLTIP STORE
//   Tracks seen tooltips and manages contextual help
// =====================================================

export type TooltipId =
  // Portfolio page tooltips
  | 'portfolio_value'
  | 'total_return'
  | 'cash_balance'
  | 'position_card'
  // Stock page tooltips
  | 'pe_ratio'
  | 'market_cap'
  | 'beta'
  | 'volume'
  | 'price_chart'
  // Dashboard tooltips
  | 'xp_progress'
  | 'daily_challenges'
  | 'streak'
  // Learn page tooltips
  | 'learning_path'
  | 'quiz'

export interface TooltipDefinition {
  id: TooltipId
  title: string
  content: string
  learnMoreUrl?: string
}

interface TooltipState {
  // Tooltips the user has dismissed/seen
  seenTooltips: TooltipId[]

  // Currently showing tooltip (for sequential tooltips)
  activeTooltipId: TooltipId | null

  // Last activity timestamp for idle hints
  lastActivityTime: number

  // Idle hint state
  idleHintDismissed: boolean
}

interface TooltipActions {
  // Mark a tooltip as seen
  markSeen: (id: TooltipId) => void

  // Check if tooltip was seen
  hasSeen: (id: TooltipId) => boolean

  // Set active tooltip
  setActiveTooltip: (id: TooltipId | null) => void

  // Update activity time
  updateActivity: () => void

  // Dismiss idle hint
  dismissIdleHint: () => void

  // Reset idle hint for next session
  resetIdleHint: () => void

  // Clear all seen tooltips (for testing)
  resetTooltips: () => void
}

// =====================================================
//   TOOLTIP DEFINITIONS
// =====================================================

export const TOOLTIP_DEFINITIONS: Record<TooltipId, TooltipDefinition> = {
  // Portfolio tooltips
  portfolio_value: {
    id: 'portfolio_value',
    title: 'Portfolio Value',
    content: 'This is the total value of all your stocks plus any cash you have. Watch it grow as you make smart investments!',
  },
  total_return: {
    id: 'total_return',
    title: 'Total Return',
    content: 'This shows how much money you\'ve made or lost overall. Green = profit, Red = loss. Don\'t worry - even losses teach valuable lessons!',
  },
  cash_balance: {
    id: 'cash_balance',
    title: 'Cash Balance',
    content: 'This is money available to buy stocks. When you sell stocks, it goes here. When you buy, it comes from here.',
  },
  position_card: {
    id: 'position_card',
    title: 'Your Position',
    content: 'This shows a stock you own. You can see how many shares you have, what you paid, and if you\'re making or losing money.',
  },

  // Stock page tooltips
  pe_ratio: {
    id: 'pe_ratio',
    title: 'P/E Ratio',
    content: 'Price-to-Earnings ratio shows how much investors pay for each dollar of profit. Higher = more expensive, but might mean people expect growth.',
  },
  market_cap: {
    id: 'market_cap',
    title: 'Market Cap',
    content: 'Market Capitalization = total value of the whole company. Big companies like Apple have huge market caps!',
  },
  beta: {
    id: 'beta',
    title: 'Beta',
    content: 'Beta measures how much a stock moves compared to the overall market. Beta > 1 = more volatile, Beta < 1 = more stable.',
  },
  volume: {
    id: 'volume',
    title: 'Volume',
    content: 'Volume is how many shares were traded today. High volume = lots of people buying and selling.',
  },
  price_chart: {
    id: 'price_chart',
    title: 'Price Chart',
    content: 'This shows how the stock price changed over time. Green days = price went up, Red days = price went down.',
  },

  // Dashboard tooltips
  xp_progress: {
    id: 'xp_progress',
    title: 'XP Progress',
    content: 'Earn XP by trading, learning, and completing challenges. Level up to unlock new features and badges!',
  },
  daily_challenges: {
    id: 'daily_challenges',
    title: 'Daily Challenges',
    content: 'Complete these challenges every day for bonus XP. New challenges appear at midnight!',
  },
  streak: {
    id: 'streak',
    title: 'Daily Streak',
    content: 'Log in every day to build your streak! Longer streaks = bigger bonuses. Don\'t break the chain!',
  },

  // Learn page tooltips
  learning_path: {
    id: 'learning_path',
    title: 'Learning Path',
    content: 'Each path teaches you different investing skills. Complete lessons in order to unlock the next one.',
  },
  quiz: {
    id: 'quiz',
    title: 'Quiz',
    content: 'Test what you learned! Score 70% or higher to pass. Perfect scores (100%) earn bonus XP!',
  },
}

// =====================================================
//   IDLE HINT DEFINITIONS
// =====================================================

export interface IdleHint {
  id: string
  condition: 'empty_portfolio' | 'no_lessons' | 'no_quest' | 'idle'
  title: string
  message: string
  actionLabel: string
  actionUrl: string
}

export const IDLE_HINTS: IdleHint[] = [
  {
    id: 'buy_first_stock',
    condition: 'empty_portfolio',
    title: 'Ready to invest?',
    message: 'Your portfolio is empty! Pick a company you know and make your first trade.',
    actionLabel: 'Explore Stocks',
    actionUrl: '/dashboard/stocks',
  },
  {
    id: 'learn_something',
    condition: 'no_lessons',
    title: 'Time to learn!',
    message: 'It\'s been a while since your last lesson. Keep learning to level up faster!',
    actionLabel: 'Start Learning',
    actionUrl: '/dashboard/learn',
  },
  {
    id: 'start_quest',
    condition: 'no_quest',
    title: 'Want a goal?',
    message: 'Start a quest for guided missions and extra rewards!',
    actionLabel: 'View Quests',
    actionUrl: '#quests',
  },
  {
    id: 'explore_more',
    condition: 'idle',
    title: 'What\'s next?',
    message: 'Not sure what to do? Explore the market or complete a daily challenge!',
    actionLabel: 'Explore',
    actionUrl: '/dashboard/stocks',
  },
]

export const useTooltipStore = create<TooltipState & TooltipActions>()(
  persist(
    (set, get) => ({
      seenTooltips: [],
      activeTooltipId: null,
      lastActivityTime: Date.now(),
      idleHintDismissed: false,

      markSeen: (id) => {
        set((state) => ({
          seenTooltips: state.seenTooltips.includes(id)
            ? state.seenTooltips
            : [...state.seenTooltips, id],
        }))
      },

      hasSeen: (id) => {
        return get().seenTooltips.includes(id)
      },

      setActiveTooltip: (id) => {
        set({ activeTooltipId: id })
      },

      updateActivity: () => {
        set({ lastActivityTime: Date.now(), idleHintDismissed: false })
      },

      dismissIdleHint: () => {
        set({ idleHintDismissed: true })
      },

      resetIdleHint: () => {
        set({ idleHintDismissed: false })
      },

      resetTooltips: () => {
        set({
          seenTooltips: [],
          activeTooltipId: null,
          idleHintDismissed: false,
        })
      },
    }),
    {
      name: 'tickr-tooltips',
      version: 1,
    }
  )
)

// =====================================================
//   HOOKS
// =====================================================

/**
 * Returns true if the user should see this tooltip
 * (hasn't seen it yet and is in guided mode)
 */
export function useShouldShowTooltip(id: TooltipId): boolean {
  const hasSeen = useTooltipStore((s) => s.seenTooltips.includes(id))
  // Note: In a real app, would also check guidanceLevel from onboarding store
  return !hasSeen
}
