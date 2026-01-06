import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// =====================================================
//   CELEBRATION STORE - Makes TickR feel like a game!
// =====================================================

export type CelebrationType =
  | 'level_up'
  | 'achievement'
  | 'quest_complete'
  | 'streak_milestone'
  | 'first_trade'
  | 'xp_gain'

export interface CelebrationEvent {
  id: string
  type: CelebrationType
  data: {
    title?: string
    description?: string
    xp?: number
    level?: number
    levelTitle?: string
    previousLevel?: number
    badge?: string
    badgeIcon?: string
    streakDays?: number
    questTitle?: string
    ticker?: string
    shares?: number
  }
  priority: number // Lower = higher priority (shown first)
  createdAt: number
}

interface CelebrationState {
  // Queue of pending celebrations
  queue: CelebrationEvent[]

  // Currently showing celebration (null if none)
  currentCelebration: CelebrationEvent | null

  // Is a celebration currently being displayed
  isPlaying: boolean

  // User preferences
  soundEnabled: boolean
  reducedMotion: boolean
}

interface CelebrationActions {
  // Add a celebration to the queue
  addCelebration: (event: Omit<CelebrationEvent, 'id' | 'createdAt' | 'priority'> & { priority?: number }) => void

  // Start showing the next celebration
  playNext: () => void

  // Dismiss current celebration and show next
  dismissCurrent: () => void

  // Clear all pending celebrations
  clearQueue: () => void

  // Preferences
  setSoundEnabled: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void

  // Helper to add specific celebration types
  celebrateLevelUp: (level: number, levelTitle: string, previousLevel: number) => void
  celebrateAchievement: (title: string, description: string, icon: string, xp: number) => void
  celebrateQuestComplete: (questTitle: string, xp: number, badge?: string) => void
  celebrateStreakMilestone: (days: number, xp: number) => void
  celebrateFirstTrade: (ticker: string, shares: number) => void
  celebrateXPGain: (xp: number, reason: string) => void
}

// Priority values (lower = shown first)
const PRIORITY = {
  level_up: 1,        // Most important - full screen
  quest_complete: 2,  // Modal
  achievement: 3,     // Popup
  first_trade: 4,     // Special popup
  streak_milestone: 5, // Toast or modal
  xp_gain: 10,        // Toast - non-blocking, can stack
}

export const useCelebrationStore = create<CelebrationState & CelebrationActions>()(
  persist(
    (set, get) => ({
      // Initial state
      queue: [],
      currentCelebration: null,
      isPlaying: false,
      soundEnabled: true,
      reducedMotion: false,

      // Add celebration to queue
      addCelebration: (event) => {
        const celebration: CelebrationEvent = {
          ...event,
          id: `${event.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          priority: event.priority ?? PRIORITY[event.type],
          createdAt: Date.now(),
        }

        set((state) => {
          // Add to queue and sort by priority
          const newQueue = [...state.queue, celebration].sort((a, b) => a.priority - b.priority)

          // If nothing is playing, start immediately
          if (!state.isPlaying && !state.currentCelebration) {
            return {
              queue: newQueue.slice(1),
              currentCelebration: newQueue[0],
              isPlaying: true,
            }
          }

          return { queue: newQueue }
        })
      },

      // Play next celebration in queue
      playNext: () => {
        set((state) => {
          if (state.queue.length === 0) {
            return {
              currentCelebration: null,
              isPlaying: false,
            }
          }

          const [next, ...rest] = state.queue
          return {
            queue: rest,
            currentCelebration: next,
            isPlaying: true,
          }
        })
      },

      // Dismiss current and play next
      dismissCurrent: () => {
        const { playNext } = get()
        playNext()
      },

      // Clear all
      clearQueue: () => {
        set({
          queue: [],
          currentCelebration: null,
          isPlaying: false,
        })
      },

      // Preferences
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setReducedMotion: (enabled) => set({ reducedMotion: enabled }),

      // =====================================================
      //   HELPER METHODS FOR SPECIFIC CELEBRATION TYPES
      // =====================================================

      celebrateLevelUp: (level, levelTitle, previousLevel) => {
        get().addCelebration({
          type: 'level_up',
          data: {
            level,
            levelTitle,
            previousLevel,
            title: 'Level Up!',
            description: `You've reached Level ${level}`,
          },
        })
      },

      celebrateAchievement: (title, description, icon, xp) => {
        get().addCelebration({
          type: 'achievement',
          data: {
            title,
            description,
            badgeIcon: icon,
            xp,
          },
        })
      },

      celebrateQuestComplete: (questTitle, xp, badge) => {
        get().addCelebration({
          type: 'quest_complete',
          data: {
            questTitle,
            title: 'Quest Complete!',
            xp,
            badge,
          },
        })
      },

      celebrateStreakMilestone: (days, xp) => {
        get().addCelebration({
          type: 'streak_milestone',
          data: {
            streakDays: days,
            xp,
            title: `${days}-Day Streak!`,
            description: days >= 30
              ? "You're a legend! 30 days of consistency!"
              : days >= 7
              ? "A whole week! You're on fire!"
              : "Great start! Keep it going!",
          },
        })
      },

      celebrateFirstTrade: (ticker, shares) => {
        get().addCelebration({
          type: 'first_trade',
          data: {
            ticker,
            shares,
            title: 'First Trade!',
            description: `You now own ${shares} share${shares > 1 ? 's' : ''} of ${ticker}!`,
            xp: 25,
          },
        })
      },

      celebrateXPGain: (xp, reason) => {
        get().addCelebration({
          type: 'xp_gain',
          data: {
            xp,
            description: reason,
          },
        })
      },
    }),
    {
      name: 'tickr-celebrations',
      // Only persist preferences, not the queue
      partialize: (state) => ({
        soundEnabled: state.soundEnabled,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
)
