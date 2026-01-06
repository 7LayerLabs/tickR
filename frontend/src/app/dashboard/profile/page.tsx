'use client'

import { useState, useEffect } from 'react'
import { useGameStore, useLevelInfo, usePortfolioStats, LEVEL_TITLES, LEVEL_THRESHOLDS } from '@/lib/game.store'
import {
  Edit3,
  Check,
  X,
  Trophy,
  TrendingUp,
  BookOpen,
  Flame,
  Calendar,
  Zap,
  ChevronRight,
  Crown,
  Rocket,
  Clock,
  BarChart3,
  Wallet
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Level tier colors - progressing from cool to warm to legendary
const LEVEL_TIER_COLORS = {
  rookie: { primary: '#64748b', secondary: '#94a3b8', bg: 'from-slate-500 to-slate-600' },
  beginner: { primary: '#10b981', secondary: '#34d399', bg: 'from-emerald-500 to-teal-500' },
  apprentice: { primary: '#0ea5e9', secondary: '#38bdf8', bg: 'from-sky-500 to-cyan-500' },
  trader: { primary: '#8b5cf6', secondary: '#a78bfa', bg: 'from-violet-500 to-purple-500' },
  investor: { primary: '#f59e0b', secondary: '#fbbf24', bg: 'from-amber-500 to-yellow-500' },
  strategist: { primary: '#ec4899', secondary: '#f472b6', bg: 'from-pink-500 to-rose-500' },
  expert: { primary: '#ef4444', secondary: '#f87171', bg: 'from-red-500 to-orange-500' },
  master: { primary: '#6366f1', secondary: '#818cf8', bg: 'from-indigo-500 to-blue-500' },
  legend: { primary: '#eab308', secondary: '#facc15', bg: 'from-yellow-400 to-amber-500' },
  wolf: { primary: '#14b8a6', secondary: '#2dd4bf', bg: 'from-teal-400 to-emerald-500' },
}

function getLevelTier(level: number) {
  const tierKeys = Object.keys(LEVEL_TIER_COLORS)
  const tierIndex = Math.min(level - 1, tierKeys.length - 1)
  return LEVEL_TIER_COLORS[tierKeys[tierIndex] as keyof typeof LEVEL_TIER_COLORS]
}

// Avatar backgrounds based on level
const AVATAR_PATTERNS = [
  'bg-gradient-to-br from-slate-400 to-slate-600',
  'bg-gradient-to-br from-emerald-400 to-teal-600',
  'bg-gradient-to-br from-sky-400 to-cyan-600',
  'bg-gradient-to-br from-violet-400 to-purple-600',
  'bg-gradient-to-br from-amber-400 to-yellow-600',
  'bg-gradient-to-br from-pink-400 to-rose-600',
  'bg-gradient-to-br from-red-400 to-orange-600',
  'bg-gradient-to-br from-indigo-400 to-blue-600',
  'bg-gradient-to-br from-yellow-300 to-amber-500',
  'bg-gradient-to-br from-teal-300 to-emerald-500',
]

export default function ProfilePage() {
  const {
    username,
    setUsername,
    xp,
    currentStreak,
    longestStreak,
    totalTrades,
    totalLessonsCompleted,
    totalQuizzesPassed,
    accountCreatedAt,
    positions,
    tradeHistory,
    getUnlockedAchievements,
    achievements,
  } = useGameStore()

  const { level, progressPercent, title, xpToNextLevel } = useLevelInfo()
  const { portfolioValue, totalGainLoss, totalGainLossPercent } = usePortfolioStats()

  const [isEditingName, setIsEditingName] = useState(false)
  const [newUsername, setNewUsername] = useState(username)
  const [showLevelAnimation, setShowLevelAnimation] = useState(false)

  const unlockedAchievements = getUnlockedAchievements()
  const tierColors = getLevelTier(level)
  const avatarPattern = AVATAR_PATTERNS[Math.min(level - 1, AVATAR_PATTERNS.length - 1)]

  // Calculate stats
  const daysSinceJoined = Math.floor(
    (new Date().getTime() - new Date(accountCreatedAt).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1

  const avgTradeSize = tradeHistory.length > 0
    ? tradeHistory.reduce((sum, t) => sum + t.total, 0) / tradeHistory.length
    : 0

  // Current XP in level
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 5000
  const xpInCurrentLevel = xp - currentThreshold
  const xpNeededForLevel = nextThreshold - currentThreshold

  const handleSaveUsername = () => {
    if (newUsername.trim().length >= 2) {
      setUsername(newUsername.trim())
      setIsEditingName(false)
    }
  }

  const handleCancelEdit = () => {
    setNewUsername(username)
    setIsEditingName(false)
  }

  // Trigger level animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowLevelAnimation(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6 pb-8">
      {/* Profile Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-black/10">
        {/* Background gradient based on level */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tierColors.bg} opacity-90`} />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
          <div className="w-full h-full rounded-full border-[40px] border-white/20" />
        </div>

        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar & Level Ring */}
            <div className="relative">
              {/* Level progress ring */}
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${showLevelAnimation ? progressPercent * 2.83 : 0} 283`}
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
                  />
                </svg>

                {/* Avatar in center */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                  <div className={`w-full h-full ${avatarPattern} flex items-center justify-center`}>
                    <span className="text-5xl font-black text-white drop-shadow-lg">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Level badge */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white shadow-lg flex items-center gap-1.5"
                  style={{ color: tierColors.primary }}
                >
                  <Zap className="w-4 h-4" />
                  <span className="font-black text-sm">LVL {level}</span>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left text-white">
              {/* Username */}
              <div className="mb-2">
                {isEditingName ? (
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/50 font-bold text-2xl w-64 focus:outline-none focus:border-white/60"
                      placeholder="Enter username"
                      maxLength={20}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveUsername}
                      className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition-colors"
                    >
                      <Check className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <h1 className="text-4xl font-black">{username}</h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Title with icon */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Crown className="w-5 h-5 text-yellow-300" />
                <span className="text-xl font-bold text-white/90">{title}</span>
              </div>

              {/* XP Progress */}
              <div className="max-w-md mx-auto lg:mx-0 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">Progress to Level {level + 1}</span>
                  <span className="font-bold">{xpInCurrentLevel.toLocaleString()} / {xpNeededForLevel.toLocaleString()} XP</span>
                </div>
                <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ width: showLevelAnimation ? `${progressPercent}%` : '0%' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />
                  </div>
                </div>
                <div className="text-right text-sm text-white/70 mt-1">
                  {xpToNextLevel.toLocaleString()} XP to go
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link href="/dashboard/achievements" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <Flame className="w-5 h-5 text-orange-300" />
                  <span className="font-bold">{currentStreak} Day Streak</span>
                </Link>
                <Link href="/dashboard/achievements" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold">{unlockedAchievements.length} Badges</span>
                </Link>
                <Link href="/dashboard/portfolio" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <Calendar className="w-5 h-5 text-cyan-300" />
                  <span className="font-bold">{daysSinceJoined} Days</span>
                </Link>
              </div>
            </div>

            {/* Mascot */}
            <div className="hidden xl:block">
              <Image
                src="/images/tickr_mascot.jpg"
                alt="Tick"
                width={120}
                height={120}
                className="rounded-2xl shadow-xl opacity-90 hover:opacity-100 hover:scale-105 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP */}
        <Link href="/dashboard/achievements" className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 group hover:shadow-lg hover:shadow-amber-100 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-amber-700">Total XP</span>
          </div>
          <div className="text-3xl font-black text-amber-900">{xp.toLocaleString()}</div>
          <div className="text-sm text-amber-600 mt-1">Experience Points</div>
        </Link>

        {/* Portfolio Value */}
        <Link href="/dashboard/portfolio" className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 group hover:shadow-lg hover:shadow-emerald-100 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-emerald-700">Portfolio</span>
          </div>
          <div className="text-3xl font-black text-emerald-900">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
          <div className={`text-sm mt-1 font-semibold ${totalGainLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(1)}% all time
          </div>
        </Link>

        {/* Trades */}
        <Link href="/dashboard/stocks" className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 group hover:shadow-lg hover:shadow-blue-100 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-700">Trades</span>
          </div>
          <div className="text-3xl font-black text-blue-900">{totalTrades}</div>
          <div className="text-sm text-blue-600 mt-1">{positions.length} stocks owned</div>
        </Link>

        {/* Lessons */}
        <Link href="/dashboard/learn" className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 group hover:shadow-lg hover:shadow-purple-100 transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 shadow-lg group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-purple-700">Learning</span>
          </div>
          <div className="text-3xl font-black text-purple-900">{totalLessonsCompleted}</div>
          <div className="text-sm text-purple-600 mt-1">{totalQuizzesPassed} quizzes passed</div>
        </Link>
      </div>

      {/* Level Journey */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Your Journey</h2>
          </div>
          <span className="text-sm text-slate-500">Level {level} of 15</span>
        </div>

        {/* Level progression visualization */}
        <div className="relative">
          {/* Progress bar background */}
          <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 via-violet-400 via-pink-400 to-amber-400 transition-all duration-1000"
              style={{ width: `${Math.min(100, (level / 15) * 100)}%` }}
            />
          </div>

          {/* Level markers */}
          <div className="flex justify-between mt-4">
            {LEVEL_TITLES.slice(0, 10).map((titleName, index) => {
              const isReached = level > index
              const isCurrent = level === index + 1
              const tierColor = getLevelTier(index + 1)

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'ring-4 ring-offset-2 scale-125 shadow-lg'
                        : isReached
                        ? 'shadow-md'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                    style={{
                      backgroundColor: isReached || isCurrent ? tierColor.primary : undefined,
                      color: isReached || isCurrent ? 'white' : undefined,
                      boxShadow: isCurrent ? `0 0 0 3px ${tierColor.secondary}` : undefined,
                    }}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-slate-800' : 'text-slate-400'}`}>
                    {titleName.slice(0, 4)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Next level preview */}
        {level < 15 && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: getLevelTier(level + 1).primary }}
                >
                  {level + 1}
                </div>
                <div>
                  <div className="font-bold text-slate-800">Next: {LEVEL_TITLES[level]}</div>
                  <div className="text-sm text-slate-500">{xpToNextLevel.toLocaleString()} XP needed</div>
                </div>
              </div>
              <Link
                href="/dashboard/learn"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Earn XP
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Achievements Preview & Streaks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements Preview */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-amber-900">Badges Earned</h2>
            </div>
            <Link
              href="/dashboard/achievements"
              className="flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {unlockedAchievements.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {unlockedAchievements.slice(0, 8).map((achievement) => (
                <Link
                  key={achievement.id}
                  href="/dashboard/achievements"
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-md hover:scale-110 transition-transform cursor-pointer"
                  title={achievement.name}
                >
                  {achievement.icon}
                </Link>
              ))}
              {unlockedAchievements.length > 8 && (
                <Link
                  href="/dashboard/achievements"
                  className="w-14 h-14 rounded-2xl bg-amber-200 border-2 border-amber-300 flex items-center justify-center text-amber-700 font-bold hover:bg-amber-300 transition-colors"
                >
                  +{unlockedAchievements.length - 8}
                </Link>
              )}
            </div>
          ) : (
            <Link href="/dashboard/stocks" className="block text-center py-6 hover:bg-amber-100/50 rounded-xl transition-colors">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-amber-700 font-medium">Start trading and learning to earn badges!</p>
            </Link>
          )}

          <Link href="/dashboard/achievements" className="block mt-4 pt-4 border-t border-amber-200 hover:bg-amber-100/50 -mx-2 px-2 py-2 rounded-xl transition-colors">
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-700">Progress</span>
              <span className="font-bold text-amber-900">{unlockedAchievements.length} / {achievements.length}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-amber-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
              />
            </div>
          </Link>
        </div>

        {/* Streak Stats */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-orange-900">Streaks & Consistency</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Link href="/dashboard/achievements" className="p-4 rounded-2xl bg-white border border-orange-200 text-center hover:bg-orange-50 hover:border-orange-300 transition-all">
              <div className="text-4xl mb-1">🔥</div>
              <div className="text-3xl font-black text-orange-600">{currentStreak}</div>
              <div className="text-sm text-orange-700 font-medium">Current Streak</div>
            </Link>
            <Link href="/dashboard/achievements" className="p-4 rounded-2xl bg-white border border-orange-200 text-center hover:bg-orange-50 hover:border-orange-300 transition-all">
              <div className="text-4xl mb-1">🏆</div>
              <div className="text-3xl font-black text-orange-600">{longestStreak}</div>
              <div className="text-sm text-orange-700 font-medium">Best Streak</div>
            </Link>
          </div>

          {/* Streak motivation */}
          <div className="p-4 rounded-2xl bg-white border border-orange-200">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className="font-semibold text-orange-800">
                  {currentStreak === 0
                    ? "Log in daily to start your streak!"
                    : currentStreak < 3
                    ? "Keep going! 3 days unlocks a badge."
                    : currentStreak < 7
                    ? "Amazing! Reach 7 days for Week Warrior badge!"
                    : currentStreak < 30
                    ? "You're on fire! 30 days = Monthly Master badge!"
                    : "Incredible dedication! You're a true master!"}
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  Streaks earn you bonus XP every day!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Detailed Stats</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/portfolio" className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:bg-slate-100 hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-2xl font-bold text-slate-800">{positions.length}</div>
            <div className="text-sm text-slate-500">Stocks Owned</div>
          </Link>
          <Link href="/dashboard/portfolio" className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:bg-slate-100 hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">💸</div>
            <div className="text-2xl font-bold text-slate-800">${avgTradeSize.toFixed(0)}</div>
            <div className="text-sm text-slate-500">Avg Trade Size</div>
          </Link>
          <Link href="/dashboard/leaderboard" className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:bg-slate-100 hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-2xl font-bold text-slate-800">{daysSinceJoined}</div>
            <div className="text-sm text-slate-500">Days Active</div>
          </Link>
          <Link href="/dashboard/learn" className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:bg-slate-100 hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-slate-800">{totalQuizzesPassed}</div>
            <div className="text-sm text-slate-500">Quizzes Passed</div>
          </Link>
        </div>

        {/* Member since */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-slate-600">Member since</span>
          </div>
          <span className="font-semibold text-slate-800">
            {new Date(accountCreatedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/stocks"
          className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white group hover:shadow-xl hover:shadow-emerald-200 transition-all border border-black/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-lg">Explore Stocks</div>
                <div className="text-emerald-100 text-sm">Find your next investment</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/dashboard/learn"
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white group hover:shadow-xl hover:shadow-amber-200 transition-all border border-black/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-lg">Learn & Earn</div>
                <div className="text-amber-100 text-sm">Complete lessons for XP</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/dashboard/leaderboard"
          className="p-5 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white group hover:shadow-xl hover:shadow-violet-200 transition-all border border-black/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-lg">Leaderboard</div>
                <div className="text-violet-100 text-sm">See how you rank</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  )
}
