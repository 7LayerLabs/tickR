'use client'

import { useState } from 'react'
import { useGameStore, useLevelInfo, usePortfolioStats, LEVEL_TITLES } from '@/lib/game.store'
import {
  Crown,
  TrendingUp,
  Flame,
  Star,
  ChevronUp,
  ChevronDown,
  Minus,
  Globe,
} from 'lucide-react'
import {
  LeaderboardIcon,
  TrophyIcon,
  GoalIcon,
  RocketIcon,
} from '@/components/icons/TickRIcons'

// Mock leaderboard data - in a real app this would come from an API
const MOCK_PLAYERS = [
  { id: '1', username: 'StockKing99', level: 8, xp: 4850, portfolioValue: 15420, streak: 14, badges: 12, change: 2 },
  { id: '2', username: 'TradeMaster', level: 7, xp: 3920, portfolioValue: 14100, streak: 21, badges: 10, change: -1 },
  { id: '3', username: 'WallStreetWiz', level: 7, xp: 3650, portfolioValue: 13800, streak: 8, badges: 9, change: 1 },
  { id: '4', username: 'BullRunner', level: 6, xp: 2980, portfolioValue: 12950, streak: 5, badges: 8, change: 0 },
  { id: '5', username: 'MoneyMoves', level: 6, xp: 2750, portfolioValue: 12400, streak: 12, badges: 7, change: 3 },
  { id: '6', username: 'InvestorPro', level: 5, xp: 2100, portfolioValue: 11800, streak: 3, badges: 6, change: -2 },
  { id: '7', username: 'ChartChamp', level: 5, xp: 1950, portfolioValue: 11200, streak: 7, badges: 6, change: 1 },
  { id: '8', username: 'GainsGuru', level: 4, xp: 1400, portfolioValue: 10900, streak: 4, badges: 5, change: 0 },
  { id: '9', username: 'TickerTeen', level: 4, xp: 1250, portfolioValue: 10600, streak: 2, badges: 4, change: -1 },
  { id: '10', username: 'StockStar', level: 3, xp: 850, portfolioValue: 10300, streak: 1, badges: 3, change: 2 },
  { id: '11', username: 'TradeNinja', level: 3, xp: 720, portfolioValue: 10100, streak: 6, badges: 3, change: -3 },
  { id: '12', username: 'MarketMaven', level: 2, xp: 450, portfolioValue: 9800, streak: 0, badges: 2, change: 1 },
]

type LeaderboardTab = 'xp' | 'portfolio' | 'streak'

const LEVEL_COLORS = [
  '#94a3b8', '#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b',
  '#ec4899', '#ef4444', '#f97316', '#14b8a6', '#eab308',
]

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('xp')
  const { username, xp, currentStreak, getUnlockedAchievements } = useGameStore()
  const { level } = useLevelInfo()
  const { portfolioValue } = usePortfolioStats()
  const unlockedBadges = getUnlockedAchievements().length

  // Create current user entry
  const currentUser = {
    id: 'current',
    username: username,
    level: level,
    xp: xp,
    portfolioValue: portfolioValue,
    streak: currentStreak,
    badges: unlockedBadges,
    change: 0,
    isCurrentUser: true,
  }

  // Combine with mock players and sort based on active tab
  const allPlayers = [...MOCK_PLAYERS, currentUser].map(p => ({
    ...p,
    isCurrentUser: p.id === 'current'
  }))

  const getSortedPlayers = () => {
    switch (activeTab) {
      case 'xp':
        return [...allPlayers].sort((a, b) => b.xp - a.xp)
      case 'portfolio':
        return [...allPlayers].sort((a, b) => b.portfolioValue - a.portfolioValue)
      case 'streak':
        return [...allPlayers].sort((a, b) => b.streak - a.streak)
      default:
        return allPlayers
    }
  }

  const sortedPlayers = getSortedPlayers()
  const currentUserRank = sortedPlayers.findIndex(p => p.isCurrentUser) + 1

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />
    return <span className="text-lg font-bold text-slate-400">#{rank}</span>
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) return <ChevronUp className="w-4 h-4 text-emerald-500" />
    if (change < 0) return <ChevronDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-slate-400" />
  }

  const getStatValue = (player: typeof currentUser) => {
    switch (activeTab) {
      case 'xp':
        return `${player.xp.toLocaleString()} XP`
      case 'portfolio':
        return `$${player.portfolioValue.toLocaleString()}`
      case 'streak':
        return `${player.streak} days`
      default:
        return ''
    }
  }

  const tabs = [
    { id: 'xp' as LeaderboardTab, label: 'XP Leaders', icon: Star, color: '#f59e0b' },
    { id: 'portfolio' as LeaderboardTab, label: 'Top Portfolios', icon: TrendingUp, color: '#10b981' },
    { id: 'streak' as LeaderboardTab, label: 'Longest Streaks', icon: Flame, color: '#f97316' },
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-500/20 via-navy-800 to-navy-900 p-8 text-cream-100 border border-gold-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <LeaderboardIcon size={64} />
            <div>
              <h1 className="text-3xl font-display font-bold">Leaderboard</h1>
              <p className="text-slate-400">See how you stack up against other traders!</p>
            </div>
          </div>

          {/* Your Ranking Card */}
          <div className="mt-6 p-5 rounded-2xl bg-navy-900/50 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${LEVEL_COLORS[Math.min(level - 1, 9)]}, ${LEVEL_COLORS[Math.min(level - 1, 9)]}dd)` }}
                  >
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold-400 flex items-center justify-center text-sm font-bold text-navy-900">
                    #{currentUserRank}
                  </div>
                </div>
                <div>
                  <div className="font-display font-bold text-xl">{username}</div>
                  <div className="text-slate-400">Level {level} · {LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-display font-bold gradient-text">{getStatValue(currentUser)}</div>
                <div className="text-slate-500 text-sm">
                  {activeTab === 'xp' && 'Total XP'}
                  {activeTab === 'portfolio' && 'Portfolio Value'}
                  {activeTab === 'streak' && 'Current Streak'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-navy-800 border border-white/10">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? 'bg-navy-900 shadow-md text-cream-100 border border-white/10'
                  : 'text-slate-400 hover:text-cream-100'
              }`}
            >
              <Icon className="w-5 h-5" style={{ color: isActive ? tab.color : undefined }} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {/* 2nd Place */}
        <div className={`relative p-4 rounded-2xl border ${
          sortedPlayers[1]?.isCurrentUser
            ? 'bg-navy-800 border-orange-500/30'
            : 'bg-navy-800 border-white/10'
        }`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center shadow">
              <span className="text-lg">🥈</span>
            </div>
          </div>
          <div className="text-center pt-4">
            <div
              className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-xl font-bold text-white mb-2"
              style={{ background: `linear-gradient(135deg, ${LEVEL_COLORS[Math.min((sortedPlayers[1]?.level || 1) - 1, 9)]}, ${LEVEL_COLORS[Math.min((sortedPlayers[1]?.level || 1) - 1, 9)]}dd)` }}
            >
              {sortedPlayers[1]?.username.charAt(0).toUpperCase()}
            </div>
            <div className="font-display font-bold text-cream-100 truncate">{sortedPlayers[1]?.username}</div>
            <div className="text-sm text-slate-500">Level {sortedPlayers[1]?.level}</div>
            <div className="mt-2 font-display font-bold text-slate-300">{sortedPlayers[1] && getStatValue(sortedPlayers[1])}</div>
          </div>
        </div>

        {/* 1st Place */}
        <div className={`relative p-4 rounded-2xl border -mt-4 ${
          sortedPlayers[0]?.isCurrentUser
            ? 'bg-gradient-to-br from-orange-500/20 to-navy-800 border-orange-500/30'
            : 'bg-gradient-to-br from-gold-500/20 to-navy-800 border-gold-500/30'
        }`}>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
              <span className="text-xl">👑</span>
            </div>
          </div>
          <div className="text-center pt-6">
            <div
              className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-2 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${LEVEL_COLORS[Math.min((sortedPlayers[0]?.level || 1) - 1, 9)]}, ${LEVEL_COLORS[Math.min((sortedPlayers[0]?.level || 1) - 1, 9)]}dd)` }}
            >
              {sortedPlayers[0]?.username.charAt(0).toUpperCase()}
            </div>
            <div className="font-display font-bold text-lg text-cream-100 truncate">{sortedPlayers[0]?.username}</div>
            <div className="text-sm text-gold-400">Level {sortedPlayers[0]?.level}</div>
            <div className="mt-2 font-display font-bold text-lg text-gold-400">{sortedPlayers[0] && getStatValue(sortedPlayers[0])}</div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className={`relative p-4 rounded-2xl border ${
          sortedPlayers[2]?.isCurrentUser
            ? 'bg-navy-800 border-orange-500/30'
            : 'bg-navy-800 border-white/10'
        }`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center shadow">
              <span className="text-lg">🥉</span>
            </div>
          </div>
          <div className="text-center pt-4">
            <div
              className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-xl font-bold text-white mb-2"
              style={{ background: `linear-gradient(135deg, ${LEVEL_COLORS[Math.min((sortedPlayers[2]?.level || 1) - 1, 9)]}, ${LEVEL_COLORS[Math.min((sortedPlayers[2]?.level || 1) - 1, 9)]}dd)` }}
            >
              {sortedPlayers[2]?.username.charAt(0).toUpperCase()}
            </div>
            <div className="font-display font-bold text-cream-100 truncate">{sortedPlayers[2]?.username}</div>
            <div className="text-sm text-slate-500">Level {sortedPlayers[2]?.level}</div>
            <div className="mt-2 font-display font-bold text-slate-300">{sortedPlayers[2] && getStatValue(sortedPlayers[2])}</div>
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-navy-800">
        <div className="p-4 border-b border-white/10 bg-navy-900/50">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-400" />
            <h2 className="font-display font-bold text-cream-100">Global Rankings</h2>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {sortedPlayers.slice(3).map((player, index) => {
            const rank = index + 4
            return (
              <div
                key={player.id}
                className={`flex items-center gap-4 p-4 transition-colors ${
                  player.isCurrentUser
                    ? 'bg-gradient-to-r from-orange-500/20 to-transparent border-l-4 border-orange-500'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Rank */}
                <div className="w-10 text-center">
                  <span className="text-lg font-display font-bold text-slate-500">#{rank}</span>
                </div>

                {/* Change indicator */}
                <div className="w-6">
                  {getChangeIndicator(player.change)}
                </div>

                {/* Player info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${LEVEL_COLORS[Math.min(player.level - 1, 9)]}, ${LEVEL_COLORS[Math.min(player.level - 1, 9)]}dd)` }}
                  >
                    {player.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className={`font-display font-semibold truncate ${player.isCurrentUser ? 'text-orange-400' : 'text-cream-100'}`}>
                      {player.username}
                      {player.isCurrentUser && <span className="ml-2 text-xs text-orange-400/70">(You)</span>}
                    </div>
                    <div className="text-sm text-slate-500">
                      Level {player.level} · {player.badges} badges
                    </div>
                  </div>
                </div>

                {/* Stat */}
                <div className="text-right">
                  <div className={`font-display font-bold ${player.isCurrentUser ? 'text-orange-400' : 'text-slate-300'}`}>
                    {getStatValue(player)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Motivational Card */}
      <div className="p-6 rounded-2xl bg-navy-800 border border-teal-500/30">
        <div className="flex items-start gap-4">
          <GoalIcon size={56} />
          <div>
            <h3 className="font-display font-bold text-teal-400 text-lg">Keep Climbing!</h3>
            <p className="text-slate-300 mt-1">
              {currentUserRank <= 3
                ? "Amazing! You're in the top 3! Keep trading and learning to stay on top!"
                : currentUserRank <= 6
                ? `You're #${currentUserRank}! Just ${sortedPlayers[2] ? (activeTab === 'xp' ? sortedPlayers[2].xp - xp : activeTab === 'portfolio' ? sortedPlayers[2].portfolioValue - portfolioValue : sortedPlayers[2].streak - currentStreak) : 0} ${activeTab === 'streak' ? 'days' : activeTab === 'xp' ? 'XP' : 'dollars'} away from the podium!`
                : `Every trade and lesson gets you closer to the top. You've got this!`
              }
            </p>
            <div className="flex gap-3 mt-3">
              <div className="px-3 py-1.5 rounded-full bg-teal-500/20 text-sm font-medium text-teal-400 border border-teal-500/30">
                +25 XP per trade
              </div>
              <div className="px-3 py-1.5 rounded-full bg-orange-500/20 text-sm font-medium text-orange-400 border border-orange-500/30">
                +50 XP per lesson
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
