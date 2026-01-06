'use client'

import { useGameStore, ACHIEVEMENT_DEFINITIONS } from '@/lib/game.store'
import {
  Trophy,
  Lock,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  BookOpen,
  Flame,
  Star,
  Zap
} from 'lucide-react'

export default function AchievementsPage() {
  const {
    achievements,
    getUnlockedAchievements,
    totalTrades,
    totalLessonsCompleted,
    currentStreak,
  } = useGameStore()

  const unlockedAchievements = getUnlockedAchievements()

  // Group achievements by category
  const tradingAchievements = achievements.filter(a =>
    ['first_trade', 'trader_10', 'trader_50', 'diversified', 'big_spender', 'profit_100', 'profit_1000'].includes(a.id)
  )
  const learningAchievements = achievements.filter(a =>
    ['first_lesson', 'lessons_10', 'lessons_25', 'quiz_master', 'path_complete'].includes(a.id)
  )
  const streakAchievements = achievements.filter(a =>
    ['streak_3', 'streak_7', 'streak_30'].includes(a.id)
  )
  const levelAchievements = achievements.filter(a =>
    ['level_5', 'level_10', 'explorer'].includes(a.id)
  )

  const AchievementCard = ({ achievement }: { achievement: typeof achievements[0] }) => {
    const isUnlocked = !!achievement.unlockedAt
    const progress = achievement.progress || 0
    const maxProgress = achievement.maxProgress
    const progressPercent = maxProgress ? Math.min(100, (progress / maxProgress) * 100) : 0

    return (
      <div
        className={`relative p-5 rounded-2xl border-2 transition-all ${
          isUnlocked
            ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-lg'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Unlocked indicator */}
        {isUnlocked && (
          <div className="absolute -top-2 -right-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
              isUnlocked
                ? 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg'
                : 'bg-slate-200'
            }`}
          >
            {isUnlocked ? (
              achievement.icon
            ) : (
              <Lock className="w-8 h-8 text-slate-400" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${isUnlocked ? 'text-amber-800' : 'text-slate-800'}`}>
              {achievement.name}
            </h3>
            <p className={`text-sm ${isUnlocked ? 'text-amber-700' : 'text-slate-500'}`}>
              {achievement.description}
            </p>

            {/* Progress bar for locked achievements with progress */}
            {!isUnlocked && maxProgress && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-700">{progress}/{maxProgress}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Unlock date */}
            {isUnlocked && achievement.unlockedAt && (
              <p className="text-xs text-amber-600 mt-2">
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const AchievementSection = ({
    title,
    icon,
    color,
    achievements,
  }: {
    title: string
    icon: React.ReactNode
    color: string
    achievements: typeof ACHIEVEMENT_DEFINITIONS
  }) => {
    const unlocked = achievements.filter(a => a.unlockedAt).length

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-600">
            {unlocked}/{achievements.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 p-8 text-white border border-black/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">Your Achievements</h1>
              <p className="text-amber-100">Collect badges and prove your skills!</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold">{unlockedAchievements.length}</div>
              <div className="text-sm text-amber-100">Badges Earned</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold">{totalTrades}</div>
              <div className="text-sm text-amber-100">Total Trades</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold">{totalLessonsCompleted}</div>
              <div className="text-sm text-amber-100">Lessons Done</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold">{currentStreak}</div>
              <div className="text-sm text-amber-100">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Unlocked */}
      {unlockedAchievements.length > 0 && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-emerald-800">Recently Unlocked</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {unlockedAchievements.slice(0, 6).map(achievement => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border-2 border-emerald-200 shadow-sm"
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <div className="font-bold text-slate-800">{achievement.name}</div>
                  <div className="text-xs text-slate-500">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievement Sections */}
      <AchievementSection
        title="Trading Badges"
        icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        color="#10b981"
        achievements={tradingAchievements}
      />

      <AchievementSection
        title="Learning Badges"
        icon={<BookOpen className="w-5 h-5 text-amber-600" />}
        color="#f59e0b"
        achievements={learningAchievements}
      />

      <AchievementSection
        title="Streak Badges"
        icon={<Flame className="w-5 h-5 text-orange-600" />}
        color="#f97316"
        achievements={streakAchievements}
      />

      <AchievementSection
        title="Level Badges"
        icon={<Star className="w-5 h-5 text-purple-600" />}
        color="#8b5cf6"
        achievements={levelAchievements}
      />

      {/* XP Rewards Info */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-blue-800">How to Earn XP</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-blue-200 text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="font-bold text-blue-700">+25 XP</div>
            <div className="text-sm text-slate-600">Buy a Stock</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-blue-200 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-bold text-blue-700">+50 XP</div>
            <div className="text-sm text-slate-600">Complete a Lesson</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-blue-200 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-bold text-blue-700">+75 XP</div>
            <div className="text-sm text-slate-600">Pass a Quiz</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-blue-200 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-bold text-blue-700">+200 XP</div>
            <div className="text-sm text-slate-600">Unlock a Badge</div>
          </div>
        </div>
      </div>
    </div>
  )
}
