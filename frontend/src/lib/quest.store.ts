'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useCelebrationStore } from './celebration.store'

// =====================================================
//   QUEST STORE
//   Multi-step missions that give kids goals beyond daily challenges
// =====================================================

export type QuestStatus = 'locked' | 'active' | 'completed'

export interface QuestStep {
  id: string
  title: string
  description: string
  target: number
  progress: number
  completed: boolean
}

export interface Quest {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  badgeReward?: string
  status: QuestStatus
  steps: QuestStep[]
  completedAt?: string
  unlockedAt?: string
}

interface QuestState {
  quests: Quest[]
  activeQuestId: string | null
}

interface QuestActions {
  // Start a quest
  activateQuest: (questId: string) => void

  // Update progress on a step
  updateStepProgress: (questId: string, stepId: string, progress: number) => void

  // Complete a step
  completeStep: (questId: string, stepId: string) => void

  // Check and complete quest if all steps done
  checkQuestCompletion: (questId: string) => void

  // Progress tracking helpers (called by game actions)
  trackTrade: () => void
  trackLesson: () => void
  trackQuiz: (isPerfect: boolean) => void
  trackStockView: () => void
  trackDailyChallenge: () => void
  trackStreak: (days: number) => void
  trackLevel: (level: number) => void
  trackSectorDiversity: (sectorCount: number) => void
  trackStockDiversity: (stockCount: number) => void
  trackProfitableSell: () => void

  // Reset
  resetQuests: () => void
}

// =====================================================
//   QUEST DEFINITIONS
// =====================================================

const createQuestDefinitions = (): Quest[] => [
  {
    id: 'stock_market_starter',
    title: 'Stock Market Starter',
    description: 'Complete the basics and make your first trades',
    icon: '🚀',
    xpReward: 250,
    badgeReward: 'Starter',
    status: 'active', // First quest starts unlocked
    steps: [
      { id: 'buy_first', title: 'Make Your First Purchase', description: 'Buy any stock', target: 1, progress: 0, completed: false },
      { id: 'check_portfolio', title: 'Check Your Portfolio', description: 'View your portfolio page', target: 1, progress: 0, completed: false },
      { id: 'complete_lesson', title: 'Learn Something New', description: 'Complete any lesson', target: 1, progress: 0, completed: false },
      { id: 'explore_stocks', title: 'Explore the Market', description: 'View 3 different stock pages', target: 3, progress: 0, completed: false },
      { id: 'second_trade', title: 'Trade Again', description: 'Make a second trade', target: 2, progress: 0, completed: false },
    ],
  },
  {
    id: 'diversification_master',
    title: 'Diversification Master',
    description: 'Learn why not putting all eggs in one basket matters',
    icon: '🌈',
    xpReward: 400,
    badgeReward: 'Diversifier',
    status: 'locked',
    steps: [
      { id: 'own_3_sectors', title: 'Sector Spread', description: 'Own stocks from 3 different sectors', target: 3, progress: 0, completed: false },
      { id: 'own_5_stocks', title: 'Five Strong', description: 'Own 5 different stocks', target: 5, progress: 0, completed: false },
      { id: 'diversification_lesson', title: 'Learn About Diversification', description: 'Complete the diversification lesson', target: 1, progress: 0, completed: false },
    ],
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Prove your investing knowledge',
    icon: '📚',
    xpReward: 500,
    badgeReward: 'Scholar',
    status: 'locked',
    steps: [
      { id: 'complete_5_lessons', title: 'Bookworm', description: 'Complete 5 lessons', target: 5, progress: 0, completed: false },
      { id: 'pass_3_quizzes', title: 'Quiz Whiz', description: 'Pass 3 quizzes', target: 3, progress: 0, completed: false },
      { id: 'perfect_quiz', title: 'Perfect Score', description: 'Get 100% on any quiz', target: 1, progress: 0, completed: false },
      { id: 'complete_10_lessons', title: 'Dedicated Learner', description: 'Complete 10 lessons total', target: 10, progress: 0, completed: false },
    ],
  },
  {
    id: 'streak_builder',
    title: 'Streak Builder',
    description: 'Build the habit of checking in daily',
    icon: '🔥',
    xpReward: 350,
    badgeReward: 'Consistent',
    status: 'locked',
    steps: [
      { id: 'streak_3', title: 'Getting Started', description: 'Build a 3-day streak', target: 3, progress: 0, completed: false },
      { id: 'streak_7', title: 'Week Warrior', description: 'Build a 7-day streak', target: 7, progress: 0, completed: false },
      { id: 'daily_challenges', title: 'Challenge Accepted', description: 'Complete daily challenges 3 days in a row', target: 3, progress: 0, completed: false },
    ],
  },
  {
    id: 'become_trader',
    title: 'Become a Trader',
    description: 'The ultimate trading journey',
    icon: '🏆',
    xpReward: 1000,
    badgeReward: 'Trader',
    status: 'locked',
    steps: [
      { id: 'trade_10', title: 'Active Trader', description: 'Complete 10 trades', target: 10, progress: 0, completed: false },
      { id: 'own_5', title: 'Portfolio Builder', description: 'Own 5 different stocks', target: 5, progress: 0, completed: false },
      { id: 'sell_profit', title: 'Green Day', description: 'Sell a stock for profit', target: 1, progress: 0, completed: false },
      { id: 'complete_5_lessons', title: 'Educated', description: 'Complete 5 lessons', target: 5, progress: 0, completed: false },
      { id: 'pass_3_quizzes', title: 'Tested', description: 'Pass 3 quizzes', target: 3, progress: 0, completed: false },
      { id: 'streak_7', title: 'Committed', description: 'Build a 7-day streak', target: 7, progress: 0, completed: false },
      { id: 'reach_level_3', title: 'Level Up', description: 'Reach level 3', target: 3, progress: 0, completed: false },
    ],
  },
]

export const useQuestStore = create<QuestState & QuestActions>()(
  persist(
    (set, get) => ({
      quests: createQuestDefinitions(),
      activeQuestId: 'stock_market_starter',

      // Activate a quest
      activateQuest: (questId) => {
        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === questId && q.status === 'locked'
              ? { ...q, status: 'active' as QuestStatus, unlockedAt: new Date().toISOString() }
              : q
          ),
          activeQuestId: questId,
        }))
      },

      // Update progress
      updateStepProgress: (questId, stepId, progress) => {
        set((state) => ({
          quests: state.quests.map((quest) => {
            if (quest.id !== questId) return quest

            return {
              ...quest,
              steps: quest.steps.map((step) => {
                if (step.id !== stepId) return step

                const newProgress = Math.min(progress, step.target)
                const completed = newProgress >= step.target

                return { ...step, progress: newProgress, completed }
              }),
            }
          }),
        }))

        // Check if quest is now complete
        get().checkQuestCompletion(questId)
      },

      // Complete a step
      completeStep: (questId, stepId) => {
        const quest = get().quests.find((q) => q.id === questId)
        if (!quest) return

        const step = quest.steps.find((s) => s.id === stepId)
        if (!step) return

        get().updateStepProgress(questId, stepId, step.target)
      },

      // Check if all steps complete
      checkQuestCompletion: (questId) => {
        const state = get()
        const quest = state.quests.find((q) => q.id === questId)

        if (!quest || quest.status === 'completed') return

        const allStepsComplete = quest.steps.every((s) => s.completed)

        if (allStepsComplete) {
          // Complete the quest
          set((state) => ({
            quests: state.quests.map((q) =>
              q.id === questId
                ? { ...q, status: 'completed' as QuestStatus, completedAt: new Date().toISOString() }
                : q
            ),
          }))

          // Trigger celebration
          const celebrationStore = useCelebrationStore.getState()
          celebrationStore.celebrateQuestComplete(quest.title, quest.xpReward, quest.badgeReward)

          // Unlock next quest
          const questOrder = ['stock_market_starter', 'diversification_master', 'knowledge_seeker', 'streak_builder', 'become_trader']
          const currentIndex = questOrder.indexOf(questId)
          if (currentIndex < questOrder.length - 1) {
            const nextQuestId = questOrder[currentIndex + 1]
            get().activateQuest(nextQuestId)
          }
        }
      },

      // =====================================================
      //   PROGRESS TRACKING HELPERS
      //   Called by game actions to update quest progress
      // =====================================================

      trackTrade: () => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            // First trade steps
            if (step.id === 'buy_first' || step.id === 'second_trade' || step.id === 'trade_10') {
              get().updateStepProgress(quest.id, step.id, step.progress + 1)
            }
          })
        })
      },

      trackLesson: () => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'complete_lesson' || step.id === 'complete_5_lessons' || step.id === 'complete_10_lessons' || step.id === 'diversification_lesson') {
              get().updateStepProgress(quest.id, step.id, step.progress + 1)
            }
          })
        })
      },

      trackQuiz: (isPerfect) => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'pass_3_quizzes') {
              get().updateStepProgress(quest.id, step.id, step.progress + 1)
            }
            if (isPerfect && step.id === 'perfect_quiz') {
              get().updateStepProgress(quest.id, step.id, 1)
            }
          })
        })
      },

      trackStockView: () => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'explore_stocks' || step.id === 'check_portfolio') {
              get().updateStepProgress(quest.id, step.id, step.progress + 1)
            }
          })
        })
      },

      trackDailyChallenge: () => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'daily_challenges') {
              get().updateStepProgress(quest.id, step.id, step.progress + 1)
            }
          })
        })
      },

      trackStreak: (days) => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'streak_3' || step.id === 'streak_7') {
              get().updateStepProgress(quest.id, step.id, days)
            }
          })
        })
      },

      trackLevel: (level) => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'reach_level_3') {
              get().updateStepProgress(quest.id, step.id, level)
            }
          })
        })
      },

      trackSectorDiversity: (sectorCount) => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'own_3_sectors') {
              get().updateStepProgress(quest.id, step.id, sectorCount)
            }
          })
        })
      },

      trackStockDiversity: (stockCount) => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'own_5_stocks' || step.id === 'own_5') {
              get().updateStepProgress(quest.id, step.id, stockCount)
            }
          })
        })
      },

      trackProfitableSell: () => {
        const state = get()

        state.quests.forEach((quest) => {
          if (quest.status !== 'active') return

          quest.steps.forEach((step) => {
            if (step.completed) return

            if (step.id === 'sell_profit') {
              get().updateStepProgress(quest.id, step.id, 1)
            }
          })
        })
      },

      resetQuests: () => {
        set({
          quests: createQuestDefinitions(),
          activeQuestId: 'stock_market_starter',
        })
      },
    }),
    {
      name: 'tickr-quests',
      version: 1,
    }
  )
)

// =====================================================
//   HOOKS
// =====================================================

export function useActiveQuest(): Quest | undefined {
  const quests = useQuestStore((s) => s.quests)
  const activeQuestId = useQuestStore((s) => s.activeQuestId)
  return quests.find((q) => q.id === activeQuestId)
}

export function useQuestProgress(questId: string): number {
  const quests = useQuestStore((s) => s.quests)
  const quest = quests.find((q) => q.id === questId)
  if (!quest) return 0

  const completedSteps = quest.steps.filter((s) => s.completed).length
  return (completedSteps / quest.steps.length) * 100
}
