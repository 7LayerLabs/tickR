'use client'

import { useEffect, ReactNode, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth.store'
import { useGameStore, useLevelInfo } from '@/lib/game.store'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  TrendingUp,
  BookOpen,
  Trophy,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Zap,
  Award,
  User
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: LayoutDashboard, color: '#10b981' },
  { href: '/dashboard/learn', label: 'Learn', icon: BookOpen, color: '#f59e0b' },
  { href: '/dashboard/stocks', label: 'Explore', icon: TrendingUp, color: '#0ea5e9' },
  { href: '/dashboard/achievements', label: 'Badges', icon: Award, color: '#8b5cf6' },
  { href: '/dashboard/leaderboard', label: 'Compete', icon: Trophy, color: '#ec4899' },
  { href: '/dashboard/profile', label: 'Profile', icon: User, color: '#6366f1' },
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
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-lg border border-slate-200"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-slate-700" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 flex flex-col bg-white border-r border-slate-200
          transform transition-transform duration-300 ease-in-out
          lg:transform-none shadow-xl lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-100">
          <Link href="/dashboard/portfolio" className="flex items-center">
            <Image
              src="/images/tickR_altword.jpg"
              alt="TickR"
              width={200}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4">
          <Link href="/dashboard/profile" className="block p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform"
                style={{ background: `linear-gradient(135deg, ${levelColor}, ${levelColor}dd)` }}
              >
                {username?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800 truncate text-lg group-hover:text-indigo-600 transition-colors">{username}</div>
                <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: levelColor }}>
                  <Zap className="w-4 h-4" />
                  Level {level} · {title}
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">XP Progress</span>
                <span className="font-bold text-amber-500">{xp.toLocaleString()} XP</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{
                    width: `${progressPercent}%`,
                    background: `linear-gradient(90deg, #10b981, #0ea5e9, #8b5cf6)`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>
              </div>
              <div className="text-xs text-slate-400 text-right">
                {(100 - progressPercent).toFixed(0)}% to Level {level + 1}
              </div>
            </div>

            {/* Badges preview */}
            {unlockedAchievements.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1 flex-wrap">
                  {unlockedAchievements.slice(0, 4).map(a => (
                    <span key={a.id} className="text-lg" title={a.name}>{a.icon}</span>
                  ))}
                  {unlockedAchievements.length > 4 && (
                    <span className="text-xs text-slate-400 font-medium">+{unlockedAchievements.length - 4} more</span>
                  )}
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-slate-100 to-transparent shadow-sm'
                      : 'hover:bg-slate-50'
                    }
                  `}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'shadow-md' : 'group-hover:scale-110'
                    }`}
                    style={{
                      backgroundColor: isActive ? item.color : `${item.color}15`,
                    }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? 'white' : item.color }} />
                  </div>
                  <span className={`font-semibold ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <ChevronRight className="w-5 h-5 ml-auto" style={{ color: item.color }} />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Mascot & Streak */}
        <div className="p-4 space-y-4">
          {/* Daily Streak Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 border-black/10">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🔥</div>
              <div>
                <div className="font-bold text-amber-700">
                  {currentStreak > 0 ? `${currentStreak} Day Streak!` : 'Start Your Streak!'}
                </div>
                <div className="text-sm text-amber-600">
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
              className="hover:scale-110 transition-transform cursor-pointer"
              style={{ borderRadius: '20px' }}
            />
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout()
              router.push('/')
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between max-w-6xl mx-auto pl-12 lg:pl-0">
            <div>
              <h1 className="text-2xl font-display font-bold text-slate-800">
                {NAV_ITEMS.find(item => pathname?.startsWith(item.href))?.label || 'Dashboard'}
              </h1>
            </div>

            {/* Cash Balance */}
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 border-black/10">
              <span className="text-2xl">💰</span>
              <div>
                <div className="text-xs text-slate-500 font-medium">Cash Balance</div>
                <div className="font-bold text-emerald-600 text-lg">
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
    </div>
  )
}
