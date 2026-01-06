'use client'

import { useEffect, ReactNode, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth.store'
import { useGameStore, useLevelInfo } from '@/lib/game.store'
import { CelebrationProvider } from '@/components/celebrations'
import { OnboardingProvider } from '@/components/onboarding'
import { QuestHub, QuestButton } from '@/components/quests'
import { IdleHint } from '@/components/tooltips'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react'
import {
  PortfolioIcon,
  LearnIcon,
  TrophyIcon,
  StockIcon,
  LeaderboardIcon,
  RocketIcon,
  WalletIcon,
} from '@/components/icons/TickRIcons'

const NAV_ITEMS = [
  { href: '/dashboard/portfolio', label: 'Portfolio', Icon: PortfolioIcon },
  { href: '/dashboard/learn', label: 'Learn', Icon: LearnIcon },
  { href: '/dashboard/stocks', label: 'Explore', Icon: StockIcon },
  { href: '/dashboard/achievements', label: 'Badges', Icon: TrophyIcon },
  { href: '/dashboard/leaderboard', label: 'Compete', Icon: LeaderboardIcon },
  { href: '/dashboard/profile', label: 'Profile', Icon: RocketIcon },
]

const LEVEL_COLORS = [
  '#94a3b8', // Level 1 - gray
  '#10b981', // Level 2 - green
  '#0ea5e9', // Level 3 - blue
  '#8b5cf6', // Level 4 - purple
  '#f59e0b', // Level 5 - amber
  '#ec4899', // Level 6 - pink
  '#ef4444', // Level 7 - red
  '#f97316', // Level 8 - orange
  '#14b8a6', // Level 9 - teal
  '#eab308', // Level 10 - yellow (gold)
  '#6366f1', // Level 11+
  '#a855f7',
  '#06b6d4',
  '#84cc16',
  '#f43f5e',
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, checkAuth, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [questHubOpen, setQuestHubOpen] = useState(false)

  // Game store state
  const {
    username,
    cashBalance,
    currentStreak,
    xp,
    checkDailyLogin,
    getUnlockedAchievements,
  } = useGameStore()

  const { level, progressPercent, title } = useLevelInfo()
  const unlockedAchievements = getUnlockedAchievements()

  // Check daily login on mount
  useEffect(() => {
    checkDailyLogin()
  }, [checkDailyLogin])

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth()
    }
  }, [])

  const levelColor = LEVEL_COLORS[Math.min(level - 1, LEVEL_COLORS.length - 1)]

  return (
    <OnboardingProvider>
    <CelebrationProvider>
    <div className="min-h-screen flex bg-navy-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-navy-800 shadow-lg border border-white/10"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-cream-100" />
        ) : (
          <Menu className="w-6 h-6 text-cream-100" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 flex flex-col bg-navy-800 border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          lg:transform-none shadow-xl lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard/portfolio" className="flex items-center">
            <Image
              src="/images/tickR_altword.jpg"
              alt="TickR"
              width={200}
              height={60}
              className="h-14 w-auto rounded-lg"
              priority
            />
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4">
          <Link href="/dashboard/profile" className="block p-4 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-orange-500/30 hover:shadow-glow-orange transition-all group">
            <span className="flex items-center gap-3 mb-4">
              <span
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform"
                style={{ background: `linear-gradient(135deg, ${levelColor}, ${levelColor}dd)` }}
              >
                {username?.charAt(0).toUpperCase()}
              </span>
              <span className="flex-1 min-w-0 block">
                <span className="font-display font-bold text-cream-100 truncate text-lg group-hover:text-orange-400 transition-colors block">{username}</span>
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: levelColor }}>
                  <Zap className="w-4 h-4" />
                  Level {level} · {title}
                </span>
              </span>
            </span>

            {/* XP Progress Bar */}
            <span className="space-y-2 block">
              <span className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">XP Progress</span>
                <span className="font-bold text-orange-400">{xp.toLocaleString()} XP</span>
              </span>
              <span className="h-3 rounded-full overflow-hidden bg-navy-900 block">
                <span
                  className="h-full rounded-full transition-all duration-500 relative overflow-hidden block"
                  style={{
                    width: `${progressPercent}%`,
                    background: `linear-gradient(90deg, #fb923c, #f97316, #ea580c)`
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </span>
              </span>
              <span className="text-xs text-slate-500 text-right block">
                {(100 - progressPercent).toFixed(0)}% to Level {level + 1}
              </span>
            </span>

            {/* Badges preview */}
            {unlockedAchievements.length > 0 && (
              <span className="mt-3 pt-3 border-t border-white/10 block">
                <span className="flex items-center gap-1 flex-wrap">
                  {unlockedAchievements.slice(0, 4).map(a => (
                    <span key={a.id} className="text-lg" title={a.name}>{a.icon}</span>
                  ))}
                  {unlockedAchievements.length > 4 && (
                    <span className="text-xs text-slate-500 font-medium">+{unlockedAchievements.length - 4} more</span>
                  )}
                </span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              const IconComponent = item.Icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-orange-500/20 to-transparent border border-orange-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                    }
                  `}
                >
                  <span className={`transition-transform ${isActive ? 'scale-100' : 'group-hover:scale-110'}`}>
                    <IconComponent size={40} />
                  </span>
                  <span className={`font-display font-semibold ${isActive ? 'text-orange-400' : 'text-slate-300 group-hover:text-cream-100'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <ChevronRight className="w-5 h-5 ml-auto text-orange-400" />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Mascot & Streak */}
        <div className="p-4 space-y-4">
          {/* Daily Streak Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-gold-500/10 border border-orange-500/30">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div>
                <div className="font-display font-bold text-orange-400">
                  {currentStreak > 0 ? `${currentStreak} Day Streak!` : 'Start Your Streak!'}
                </div>
                <div className="text-sm text-orange-300/70">
                  {currentStreak > 0 ? 'Keep it going!' : 'Log in daily to build your streak'}
                </div>
              </div>
            </div>
          </div>

          {/* Mascot */}
          <div className="flex justify-center">
            <Image
              src="/images/tickr_mascot.jpg"
              alt="TickR Mascot"
              width={100}
              height={100}
              className="hover:scale-110 transition-transform cursor-pointer rounded-2xl border-2 border-orange-500/30"
            />
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout()
              router.push('/')
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-400 hover:text-coral-400 hover:bg-coral-500/10 transition-all border border-transparent hover:border-coral-500/30"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 px-6 py-4 bg-navy-900/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between max-w-6xl mx-auto pl-12 lg:pl-0">
            <div>
              <h1 className="text-2xl font-display font-bold text-cream-100">
                {NAV_ITEMS.find(item => pathname?.startsWith(item.href))?.label || 'Dashboard'}
              </h1>
            </div>

            {/* Cash Balance */}
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-navy-800 border border-white/10">
              <WalletIcon size={40} />
              <div>
                <div className="text-xs text-slate-400 font-medium">Cash Balance</div>
                <div className="font-display font-bold text-teal-400 text-lg">
                  ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Quest Hub Modal */}
      <QuestHub isOpen={questHubOpen} onClose={() => setQuestHubOpen(false)} />

      {/* Floating Quest Button */}
      <QuestButton onClick={() => setQuestHubOpen(true)} />

      {/* Idle Hint */}
      <IdleHint />
    </div>
    </CelebrationProvider>
    </OnboardingProvider>
  )
}
