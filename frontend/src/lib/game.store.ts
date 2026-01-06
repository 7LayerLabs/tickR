'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================
// TYPES
// ============================================

export interface Position {
  ticker: string
  companyName: string
  shares: number
  avgCost: number
  purchaseDate: string
}

export interface Trade {
  id: string
  ticker: string
  companyName: string
  type: 'buy' | 'sell'
  shares: number
  price: number
  total: number
  timestamp: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface DailyChallenge {
  id: string
  title: string
  description: string
  type: 'trade' | 'learn' | 'quiz' | 'explore'
  target: number
  progress: number
  xpReward: number
  completed: boolean
  expiresAt: string
}

export interface LessonProgress {
  lessonId: string
  pathId: string
  completed: boolean
  completedAt?: string
  quizScore?: number
  quizAttempts: number
}

export interface GameState {
  // User Profile
  username: string
  level: number
  xp: number
  xpToNextLevel: number

  // Finances
  cashBalance: number
  startingBalance: number

  // Portfolio
  positions: Position[]
  tradeHistory: Trade[]

  // Learning
  lessonProgress: LessonProgress[]
  completedPaths: string[]

  // Gamification
  achievements: Achievement[]
  dailyChallenges: DailyChallenge[]
  currentStreak: number
  longestStreak: number
  lastLoginDate: string
  totalTrades: number
  totalLessonsCompleted: number
  totalQuizzesPassed: number

  // Timestamps
  accountCreatedAt: string
  lastUpdated: string
}

// ============================================
// STOCK PRICES (Simulated with slight fluctuation)
// ============================================

export const BASE_STOCK_PRICES: Record<string, { price: number; name: string }> = {
  AAPL: { price: 277.18, name: 'Apple Inc.' },
  NVDA: { price: 184.90, name: 'NVIDIA Corporation' },
  TSLA: { price: 446.07, name: 'Tesla, Inc.' },
  GOOGL: { price: 195.75, name: 'Alphabet Inc.' },
  NFLX: { price: 918.00, name: 'Netflix, Inc.' },
  DIS: { price: 114.50, name: 'Walt Disney Company' },
  NKE: { price: 77.50, name: 'Nike, Inc.' },
  RBLX: { price: 62.25, name: 'Roblox Corporation' },
  MSFT: { price: 491.51, name: 'Microsoft Corporation' },
  META: { price: 612.77, name: 'Meta Platforms' },
  AMZN: { price: 225.94, name: 'Amazon.com' },
  AMD: { price: 125.40, name: 'AMD' },
  SPOT: { price: 295.80, name: 'Spotify' },
  UBER: { price: 68.25, name: 'Uber Technologies' },
  SNAP: { price: 12.45, name: 'Snap Inc.' },
  EA: { price: 145.30, name: 'Electronic Arts' },
  TTWO: { price: 185.30, name: 'Take-Two Interactive' },
  SBUX: { price: 98.50, name: 'Starbucks' },
  MCD: { price: 295.20, name: "McDonald's" },
  KO: { price: 62.80, name: 'Coca-Cola' },
}

// ============================================
// ACHIEVEMENTS DEFINITIONS
// ============================================

export const ACHIEVEMENT_DEFINITIONS: Achievement[] = [
  { id: 'first_trade', name: 'First Trade!', description: 'Make your first stock purchase', icon: '🎯' },
  { id: 'trader_10', name: 'Active Trader', description: 'Complete 10 trades', icon: '📈', maxProgress: 10 },
  { id: 'trader_50', name: 'Trading Pro', description: 'Complete 50 trades', icon: '🏆', maxProgress: 50 },
  { id: 'diversified', name: 'Diversified', description: 'Own 5 different stocks', icon: '🌈', maxProgress: 5 },
  { id: 'big_spender', name: 'Big Spender', description: 'Make a single trade worth $1,000+', icon: '💰' },
  { id: 'profit_100', name: 'In The Green', description: 'Earn $100 in profit', icon: '💵', maxProgress: 100 },
  { id: 'profit_1000', name: 'Money Maker', description: 'Earn $1,000 in profit', icon: '🤑', maxProgress: 1000 },
  { id: 'first_lesson', name: 'Student', description: 'Complete your first lesson', icon: '📚' },
  { id: 'lessons_10', name: 'Bookworm', description: 'Complete 10 lessons', icon: '🎓', maxProgress: 10 },
  { id: 'lessons_25', name: 'Scholar', description: 'Complete 25 lessons', icon: '🧠', maxProgress: 25 },
  { id: 'quiz_master', name: 'Quiz Master', description: 'Score 100% on 5 quizzes', icon: '⭐', maxProgress: 5 },
  { id: 'streak_3', name: 'Getting Started', description: 'Maintain a 3-day streak', icon: '🔥', maxProgress: 3 },
  { id: 'streak_7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', maxProgress: 7 },
  { id: 'streak_30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '👑', maxProgress: 30 },
  { id: 'level_5', name: 'Rising Star', description: 'Reach Level 5', icon: '⭐', maxProgress: 5 },
  { id: 'level_10', name: 'Expert Trader', description: 'Reach Level 10', icon: '🌟', maxProgress: 10 },
  { id: 'path_complete', name: 'Path Finder', description: 'Complete an entire learning path', icon: '🛤️' },
  { id: 'explorer', name: 'Explorer', description: 'View 20 different stock pages', icon: '🔍', maxProgress: 20 },
]

// ============================================
// XP REWARDS
// ============================================

export const XP_REWARDS = {
  TRADE_BUY: 25,
  TRADE_SELL: 15,
  LESSON_COMPLETE: 50,
  QUIZ_PASS: 75,
  QUIZ_PERFECT: 150,
  DAILY_CHALLENGE: 100,
  DAILY_LOGIN: 10,
  ACHIEVEMENT_UNLOCK: 200,
  PATH_COMPLETE: 500,
}

// ============================================
// LEVEL THRESHOLDS
// ============================================

export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  500,    // Level 2
  1200,   // Level 3
  2100,   // Level 4
  3300,   // Level 5
  4800,   // Level 6
  6600,   // Level 7
  8700,   // Level 8
  11100,  // Level 9
  14000,  // Level 10
  17500,  // Level 11
  21500,  // Level 12
  26000,  // Level 13
  31000,  // Level 14
  37000,  // Level 15
]

export const LEVEL_TITLES = [
  'Rookie',
  'Beginner',
  'Apprentice',
  'Trader',
  'Investor',
  'Strategist',
  'Expert',
  'Master',
  'Legend',
  'Wall Street Wolf',
  'Market Genius',
  'Trading Titan',
  'Finance Guru',
  'Money Master',
  'Ultimate Investor',
]

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

function calculateLevel(totalXp: number): { level: number; xpToNext: number } {
  let level = 1
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1
      break
    }
  }
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 5000
  return { level, xpToNext: nextThreshold - totalXp }
}

function generateDailyChallenges(): DailyChallenge[] {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  const expiresAt = tomorrow.toISOString()

  const challenges: DailyChallenge[] = [
    {
      id: generateId(),
      title: 'Make a Trade',
      description: 'Buy or sell any stock today',
      type: 'trade',
      target: 1,
      progress: 0,
      xpReward: 50,
      completed: false,
      expiresAt,
    },
    {
      id: generateId(),
      title: 'Learn Something New',
      description: 'Complete 2 lessons',
      type: 'learn',
      target: 2,
      progress: 0,
      xpReward: 75,
      completed: false,
      expiresAt,
    },
    {
      id: generateId(),
      title: 'Quiz Time',
      description: 'Pass a quiz with 80% or higher',
      type: 'quiz',
      target: 1,
      progress: 0,
      xpReward: 100,
      completed: false,
      expiresAt,
    },
  ]

  return challenges
}

// ============================================
// INITIAL STATE
// ============================================

const getInitialState = (): GameState => ({
  // User Profile
  username: 'DemoTrader',
  level: 1,
  xp: 0,
  xpToNextLevel: 500,

  // Finances
  cashBalance: 10000,
  startingBalance: 10000,

  // Portfolio
  positions: [],
  tradeHistory: [],

  // Learning
  lessonProgress: [],
  completedPaths: [],

  // Gamification
  achievements: ACHIEVEMENT_DEFINITIONS.map(a => ({ ...a, progress: 0 })),
  dailyChallenges: generateDailyChallenges(),
  currentStreak: 0,
  longestStreak: 0,
  lastLoginDate: '',
  totalTrades: 0,
  totalLessonsCompleted: 0,
  totalQuizzesPassed: 0,

  // Timestamps
  accountCreatedAt: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
})

// ============================================
// STORE ACTIONS INTERFACE
// ============================================

interface GameActions {
  // Trading
  buyStock: (ticker: string, shares: number, price: number) => { success: boolean; message: string }
  sellStock: (ticker: string, shares: number, price: number) => { success: boolean; message: string }
  getPosition: (ticker: string) => Position | undefined
  getPortfolioValue: (prices: Record<string, number>) => number
  getTotalGainLoss: (prices: Record<string, number>) => number

  // Learning
  completeLesson: (lessonId: string, pathId: string) => void
  submitQuiz: (lessonId: string, pathId: string, score: number, totalQuestions: number) => { passed: boolean; xpEarned: number }
  getLessonProgress: (lessonId: string) => LessonProgress | undefined
  getPathProgress: (pathId: string, totalLessons: number) => number

  // XP & Leveling
  addXp: (amount: number, reason: string) => void

  // Achievements
  checkAndUnlockAchievements: () => void
  getUnlockedAchievements: () => Achievement[]
  getLockedAchievements: () => Achievement[]

  // Daily Challenges
  updateChallengeProgress: (type: 'trade' | 'learn' | 'quiz' | 'explore', amount?: number) => void
  refreshDailyChallenges: () => void

  // Streak
  checkDailyLogin: () => void

  // User
  setUsername: (name: string) => void
  resetGame: () => void

  // Price simulation
  getSimulatedPrice: (ticker: string) => number
}

// ============================================
// ZUSTAND STORE
// ============================================

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      // ========== TRADING ==========

      buyStock: (ticker, shares, price) => {
        const state = get()
        const total = shares * price

        if (total > state.cashBalance) {
          return { success: false, message: 'Not enough cash!' }
        }

        const stockInfo = BASE_STOCK_PRICES[ticker]
        if (!stockInfo) {
          return { success: false, message: 'Stock not found' }
        }

        const existingPosition = state.positions.find(p => p.ticker === ticker)
        let newPositions: Position[]

        if (existingPosition) {
          // Average down/up
          const totalShares = existingPosition.shares + shares
          const totalCost = (existingPosition.shares * existingPosition.avgCost) + (shares * price)
          const newAvgCost = totalCost / totalShares

          newPositions = state.positions.map(p =>
            p.ticker === ticker
              ? { ...p, shares: totalShares, avgCost: newAvgCost }
              : p
          )
        } else {
          newPositions = [
            ...state.positions,
            {
              ticker,
              companyName: stockInfo.name,
              shares,
              avgCost: price,
              purchaseDate: new Date().toISOString(),
            }
          ]
        }

        const trade: Trade = {
          id: generateId(),
          ticker,
          companyName: stockInfo.name,
          type: 'buy',
          shares,
          price,
          total,
          timestamp: new Date().toISOString(),
        }

        set({
          positions: newPositions,
          cashBalance: state.cashBalance - total,
          tradeHistory: [trade, ...state.tradeHistory],
          totalTrades: state.totalTrades + 1,
          lastUpdated: new Date().toISOString(),
        })

        // Add XP and check achievements
        get().addXp(XP_REWARDS.TRADE_BUY, 'Stock purchase')
        get().updateChallengeProgress('trade')
        get().checkAndUnlockAchievements()

        return { success: true, message: `Bought ${shares} shares of ${ticker}!` }
      },

      sellStock: (ticker, shares, price) => {
        const state = get()
        const position = state.positions.find(p => p.ticker === ticker)

        if (!position || position.shares < shares) {
          return { success: false, message: 'Not enough shares to sell!' }
        }

        const total = shares * price
        let newPositions: Position[]

        if (position.shares === shares) {
          newPositions = state.positions.filter(p => p.ticker !== ticker)
        } else {
          newPositions = state.positions.map(p =>
            p.ticker === ticker
              ? { ...p, shares: p.shares - shares }
              : p
          )
        }

        const trade: Trade = {
          id: generateId(),
          ticker,
          companyName: position.companyName,
          type: 'sell',
          shares,
          price,
          total,
          timestamp: new Date().toISOString(),
        }

        set({
          positions: newPositions,
          cashBalance: state.cashBalance + total,
          tradeHistory: [trade, ...state.tradeHistory],
          totalTrades: state.totalTrades + 1,
          lastUpdated: new Date().toISOString(),
        })

        get().addXp(XP_REWARDS.TRADE_SELL, 'Stock sale')
        get().updateChallengeProgress('trade')
        get().checkAndUnlockAchievements()

        return { success: true, message: `Sold ${shares} shares of ${ticker}!` }
      },

      getPosition: (ticker) => {
        return get().positions.find(p => p.ticker === ticker)
      },

      getPortfolioValue: (prices) => {
        const state = get()
        const positionValue = state.positions.reduce((sum, p) => {
          const price = prices[p.ticker] || p.avgCost
          return sum + (p.shares * price)
        }, 0)
        return state.cashBalance + positionValue
      },

      getTotalGainLoss: (prices) => {
        const state = get()
        return state.positions.reduce((sum, p) => {
          const currentPrice = prices[p.ticker] || p.avgCost
          const gain = (currentPrice - p.avgCost) * p.shares
          return sum + gain
        }, 0)
      },

      // ========== LEARNING ==========

      completeLesson: (lessonId, pathId) => {
        const state = get()
        const existing = state.lessonProgress.find(l => l.lessonId === lessonId)

        if (existing?.completed) return // Already completed

        const newProgress: LessonProgress = existing
          ? { ...existing, completed: true, completedAt: new Date().toISOString() }
          : {
              lessonId,
              pathId,
              completed: true,
              completedAt: new Date().toISOString(),
              quizAttempts: 0,
            }

        set({
          lessonProgress: existing
            ? state.lessonProgress.map(l => l.lessonId === lessonId ? newProgress : l)
            : [...state.lessonProgress, newProgress],
          totalLessonsCompleted: state.totalLessonsCompleted + 1,
          lastUpdated: new Date().toISOString(),
        })

        get().addXp(XP_REWARDS.LESSON_COMPLETE, 'Lesson completed')
        get().updateChallengeProgress('learn')
        get().checkAndUnlockAchievements()
      },

      submitQuiz: (lessonId, pathId, score, totalQuestions) => {
        const state = get()
        const percentage = (score / totalQuestions) * 100
        const passed = percentage >= 70

        const existing = state.lessonProgress.find(l => l.lessonId === lessonId)
        const newProgress: LessonProgress = {
          lessonId,
          pathId,
          completed: existing?.completed || false,
          completedAt: existing?.completedAt,
          quizScore: Math.max(score, existing?.quizScore || 0),
          quizAttempts: (existing?.quizAttempts || 0) + 1,
        }

        let xpEarned = 0
        if (passed) {
          xpEarned = percentage === 100 ? XP_REWARDS.QUIZ_PERFECT : XP_REWARDS.QUIZ_PASS

          set({
            lessonProgress: existing
              ? state.lessonProgress.map(l => l.lessonId === lessonId ? newProgress : l)
              : [...state.lessonProgress, newProgress],
            totalQuizzesPassed: state.totalQuizzesPassed + 1,
            lastUpdated: new Date().toISOString(),
          })

          get().addXp(xpEarned, percentage === 100 ? 'Perfect quiz score!' : 'Quiz passed')
          get().updateChallengeProgress('quiz')
          get().checkAndUnlockAchievements()
        } else {
          set({
            lessonProgress: existing
              ? state.lessonProgress.map(l => l.lessonId === lessonId ? newProgress : l)
              : [...state.lessonProgress, newProgress],
          })
        }

        return { passed, xpEarned }
      },

      getLessonProgress: (lessonId) => {
        return get().lessonProgress.find(l => l.lessonId === lessonId)
      },

      getPathProgress: (pathId, totalLessons) => {
        const completed = get().lessonProgress.filter(
          l => l.pathId === pathId && l.completed
        ).length
        return totalLessons > 0 ? (completed / totalLessons) * 100 : 0
      },

      // ========== XP & LEVELING ==========

      addXp: (amount, reason) => {
        const state = get()
        const newXp = state.xp + amount
        const { level, xpToNext } = calculateLevel(newXp)

        const leveledUp = level > state.level

        set({
          xp: newXp,
          level,
          xpToNextLevel: xpToNext,
          lastUpdated: new Date().toISOString(),
        })

        if (leveledUp) {
          get().checkAndUnlockAchievements()
        }
      },

      // ========== ACHIEVEMENTS ==========

      checkAndUnlockAchievements: () => {
        const state = get()
        const now = new Date().toISOString()

        const updatedAchievements = state.achievements.map(achievement => {
          if (achievement.unlockedAt) return achievement // Already unlocked

          let shouldUnlock = false
          let progress = achievement.progress || 0

          switch (achievement.id) {
            case 'first_trade':
              shouldUnlock = state.totalTrades >= 1
              break
            case 'trader_10':
              progress = state.totalTrades
              shouldUnlock = state.totalTrades >= 10
              break
            case 'trader_50':
              progress = state.totalTrades
              shouldUnlock = state.totalTrades >= 50
              break
            case 'diversified':
              progress = state.positions.length
              shouldUnlock = state.positions.length >= 5
              break
            case 'big_spender':
              shouldUnlock = state.tradeHistory.some(t => t.total >= 1000)
              break
            case 'first_lesson':
              shouldUnlock = state.totalLessonsCompleted >= 1
              break
            case 'lessons_10':
              progress = state.totalLessonsCompleted
              shouldUnlock = state.totalLessonsCompleted >= 10
              break
            case 'lessons_25':
              progress = state.totalLessonsCompleted
              shouldUnlock = state.totalLessonsCompleted >= 25
              break
            case 'quiz_master':
              const perfectQuizzes = state.lessonProgress.filter(l => l.quizScore === 5).length
              progress = perfectQuizzes
              shouldUnlock = perfectQuizzes >= 5
              break
            case 'streak_3':
              progress = state.currentStreak
              shouldUnlock = state.currentStreak >= 3
              break
            case 'streak_7':
              progress = state.currentStreak
              shouldUnlock = state.currentStreak >= 7
              break
            case 'streak_30':
              progress = state.currentStreak
              shouldUnlock = state.currentStreak >= 30
              break
            case 'level_5':
              progress = state.level
              shouldUnlock = state.level >= 5
              break
            case 'level_10':
              progress = state.level
              shouldUnlock = state.level >= 10
              break
          }

          if (shouldUnlock && !achievement.unlockedAt) {
            return { ...achievement, unlockedAt: now, progress }
          }

          return { ...achievement, progress }
        })

        const newlyUnlocked = updatedAchievements.filter(
          (a, i) => a.unlockedAt && !state.achievements[i].unlockedAt
        )

        if (newlyUnlocked.length > 0) {
          set({ achievements: updatedAchievements })
          // Award XP for each unlocked achievement
          newlyUnlocked.forEach(() => {
            const currentState = get()
            const newXp = currentState.xp + XP_REWARDS.ACHIEVEMENT_UNLOCK
            const { level, xpToNext } = calculateLevel(newXp)
            set({ xp: newXp, level, xpToNextLevel: xpToNext })
          })
        } else {
          set({ achievements: updatedAchievements })
        }
      },

      getUnlockedAchievements: () => {
        return get().achievements.filter(a => a.unlockedAt)
      },

      getLockedAchievements: () => {
        return get().achievements.filter(a => !a.unlockedAt)
      },

      // ========== DAILY CHALLENGES ==========

      updateChallengeProgress: (type, amount = 1) => {
        const state = get()
        const now = new Date()

        const updatedChallenges = state.dailyChallenges.map(challenge => {
          if (challenge.completed) return challenge
          if (challenge.type !== type) return challenge
          if (new Date(challenge.expiresAt) < now) return challenge

          const newProgress = challenge.progress + amount
          const completed = newProgress >= challenge.target

          if (completed && !challenge.completed) {
            // Award XP for completing challenge
            setTimeout(() => {
              get().addXp(challenge.xpReward, 'Daily challenge completed!')
            }, 0)
          }

          return {
            ...challenge,
            progress: newProgress,
            completed,
          }
        })

        set({ dailyChallenges: updatedChallenges })
      },

      refreshDailyChallenges: () => {
        const state = get()
        const now = new Date()

        // Check if any challenges expired
        const hasExpired = state.dailyChallenges.some(
          c => new Date(c.expiresAt) < now
        )

        if (hasExpired) {
          set({ dailyChallenges: generateDailyChallenges() })
        }
      },

      // ========== STREAK ==========

      checkDailyLogin: () => {
        const state = get()
        const today = getTodayDate()

        if (state.lastLoginDate === today) return // Already logged in today

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        let newStreak = 1
        if (state.lastLoginDate === yesterdayStr) {
          newStreak = state.currentStreak + 1
        }

        const newLongestStreak = Math.max(state.longestStreak, newStreak)

        set({
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastLoginDate: today,
        })

        get().addXp(XP_REWARDS.DAILY_LOGIN, 'Daily login bonus!')
        get().refreshDailyChallenges()
        get().checkAndUnlockAchievements()
      },

      // ========== USER ==========

      setUsername: (name) => {
        set({ username: name })
      },

      resetGame: () => {
        set(getInitialState())
      },

      // ========== PRICE SIMULATION ==========

      getSimulatedPrice: (ticker) => {
        const basePrice = BASE_STOCK_PRICES[ticker]?.price
        if (!basePrice) return 0

        // Add slight random fluctuation (-2% to +2%)
        const fluctuation = (Math.random() - 0.5) * 0.04
        return basePrice * (1 + fluctuation)
      },
    }),
    {
      name: 'tickr-game-state',
      version: 1,
    }
  )
)

// ============================================
// HOOKS FOR COMMON OPERATIONS
// ============================================

export function usePortfolioStats() {
  const state = useGameStore()

  const prices = Object.fromEntries(
    Object.entries(BASE_STOCK_PRICES).map(([ticker, data]) => [ticker, data.price])
  )

  const portfolioValue = state.getPortfolioValue(prices)
  const totalGainLoss = state.getTotalGainLoss(prices)
  const totalGainLossPercent = state.startingBalance > 0
    ? ((portfolioValue - state.startingBalance) / state.startingBalance) * 100
    : 0

  return {
    cashBalance: state.cashBalance,
    portfolioValue,
    totalGainLoss,
    totalGainLossPercent,
    positions: state.positions,
    positionsCount: state.positions.length,
  }
}

export function useLevelInfo() {
  const { level, xp, xpToNextLevel } = useGameStore()

  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 5000
  const xpInCurrentLevel = xp - currentThreshold
  const xpNeededForLevel = nextThreshold - currentThreshold
  const progressPercent = (xpInCurrentLevel / xpNeededForLevel) * 100

  return {
    level,
    xp,
    xpToNextLevel,
    progressPercent,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
  }
}
