'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useGameStore, BASE_STOCK_PRICES, usePortfolioStats, useLevelInfo } from '@/lib/game.store'
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Zap,
  ChevronRight,
  Target,
  ArrowRight,
  Clock,
  CheckCircle2,
  Star,
  X,
  Minus,
  Plus,
  AlertCircle
} from 'lucide-react'
import {
  PortfolioIcon,
  WalletIcon,
  TrophyIcon,
  LearnIcon,
  StockIcon,
  GoalIcon,
  RocketIcon,
} from '@/components/icons/TickRIcons'

const SECTOR_COLORS: Record<string, string> = {
  Technology: '#10b981',
  Entertainment: '#ec4899',
  Automotive: '#ef4444',
  Consumer: '#f59e0b',
  Gaming: '#14b8a6',
  'Food & Beverage': '#8b5cf6',
}

const STOCK_SECTORS: Record<string, string> = {
  AAPL: 'Technology',
  NVDA: 'Technology',
  TSLA: 'Automotive',
  GOOGL: 'Technology',
  NFLX: 'Entertainment',
  DIS: 'Entertainment',
  NKE: 'Consumer',
  RBLX: 'Gaming',
  MSFT: 'Technology',
  META: 'Technology',
  AMZN: 'Technology',
  AMD: 'Technology',
  SPOT: 'Entertainment',
  UBER: 'Technology',
  SNAP: 'Technology',
  EA: 'Gaming',
  TTWO: 'Gaming',
  SBUX: 'Food & Beverage',
  MCD: 'Food & Beverage',
  KO: 'Food & Beverage',
}

const STOCK_COLORS: Record<string, string> = {
  AAPL: '#10b981',
  NVDA: '#8b5cf6',
  TSLA: '#ef4444',
  GOOGL: '#0ea5e9',
  NFLX: '#ec4899',
  DIS: '#6366f1',
  NKE: '#f59e0b',
  RBLX: '#14b8a6',
  MSFT: '#0ea5e9',
  META: '#3b82f6',
  AMZN: '#f97316',
  AMD: '#ef4444',
}

interface SellModalProps {
  position: {
    ticker: string
    companyName: string
    shares: number
    currentPrice: number
    avgCost: number
    totalGain: number
    totalGainPercent: number
    color: string
  }
  onClose: () => void
  onSell: (shares: number) => void
}

function SellModal({ position, onClose, onSell }: SellModalProps) {
  const [shares, setShares] = useState(1)
  const [confirmStep, setConfirmStep] = useState(false)

  const total = shares * position.currentPrice
  const maxShares = position.shares
  const profitOnSale = (position.currentPrice - position.avgCost) * shares

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-500 to-rose-500 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${position.color}, ${position.color}cc)` }}
            >
              {position.ticker.slice(0, 2)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Sell {position.ticker}</h2>
              <p className="text-white/80">{position.companyName}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!confirmStep ? (
            <>
              {/* Current Position Info */}
              <div className="p-4 rounded-2xl bg-slate-50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">You Own</span>
                  <span className="font-bold text-slate-800">{position.shares} shares</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Current Price</span>
                  <span className="font-bold text-slate-800">${position.currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Your Avg Cost</span>
                  <span className="font-bold text-slate-800">${position.avgCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Gain/Loss</span>
                  <span className={`font-bold ${position.totalGain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {position.totalGain >= 0 ? '+' : ''}${position.totalGain.toFixed(2)} ({position.totalGainPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              {/* Shares Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  How many shares to sell?
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShares(s => Math.max(1, s - 1))}
                    className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    disabled={shares <= 1}
                  >
                    <Minus className="w-5 h-5 text-slate-600" />
                  </button>

                  <input
                    type="number"
                    value={shares}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1
                      setShares(Math.min(maxShares, Math.max(1, val)))
                    }}
                    className="flex-1 text-center text-3xl font-bold py-3 rounded-xl border-2 border-slate-200 focus:border-red-500 focus:outline-none"
                    min={1}
                    max={maxShares}
                  />

                  <button
                    onClick={() => setShares(s => Math.min(maxShares, s + 1))}
                    className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    disabled={shares >= maxShares}
                  >
                    <Plus className="w-5 h-5 text-slate-600" />
                  </button>
                </div>

                {/* Quick select buttons */}
                <div className="flex gap-2 mt-3">
                  {[
                    { label: '25%', value: Math.ceil(maxShares * 0.25) },
                    { label: '50%', value: Math.ceil(maxShares * 0.5) },
                    { label: '75%', value: Math.ceil(maxShares * 0.75) },
                    { label: 'All', value: maxShares },
                  ].map(option => (
                    <button
                      key={option.label}
                      onClick={() => setShares(option.value)}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                        shares === option.value
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">You&apos;ll Receive</span>
                  <span className="text-2xl font-bold text-slate-800">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Profit/Loss on this sale</span>
                  <span className={`font-semibold ${profitOnSale >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {profitOnSale >= 0 ? '+' : ''}${profitOnSale.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Sell Button */}
              <button
                onClick={() => setConfirmStep(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-red-200 transition-all"
              >
                Review Sale
              </button>
            </>
          ) : (
            <>
              {/* Confirmation Step */}
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Confirm Sale</h3>
                <p className="text-slate-500">
                  You are about to sell <span className="font-bold text-slate-800">{shares} shares</span> of{' '}
                  <span className="font-bold text-slate-800">{position.ticker}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Shares to Sell</span>
                  <span className="font-bold text-slate-800">{shares}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Price per Share</span>
                  <span className="font-bold text-slate-800">${position.currentPrice.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="text-slate-700 font-semibold">Total Cash</span>
                  <span className="text-xl font-bold text-emerald-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmStep(false)}
                  className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
                >
                  Go Back
                </button>
                <button
                  onClick={() => onSell(shares)}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold hover:shadow-lg hover:shadow-red-200 transition-all"
                >
                  Confirm Sale
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const {
    positions,
    cashBalance,
    tradeHistory,
    dailyChallenges,
    currentStreak,
    totalTrades,
    checkDailyLogin,
    sellStock,
  } = useGameStore()

  const { portfolioValue, totalGainLoss, totalGainLossPercent } = usePortfolioStats()
  const { level, title } = useLevelInfo()

  // Sell modal state
  const [sellModalPosition, setSellModalPosition] = useState<any>(null)
  const [successMessage, setSuccessMessage] = useState('')

  // Check daily login on mount
  useEffect(() => {
    checkDailyLogin()
  }, [checkDailyLogin])

  // Handle sell
  const handleSell = (shares: number) => {
    if (sellModalPosition) {
      const result = sellStock(sellModalPosition.ticker, shares, sellModalPosition.currentPrice)
      if (result.success) {
        setSuccessMessage(`Sold ${shares} shares of ${sellModalPosition.ticker} for $${(shares * sellModalPosition.currentPrice).toFixed(2)}`)
        setSellModalPosition(null)
        setTimeout(() => setSuccessMessage(''), 4000)
      }
    }
  }

  // Calculate portfolio metrics with current prices
  const prices = Object.fromEntries(
    Object.entries(BASE_STOCK_PRICES).map(([ticker, data]) => [ticker, data.price])
  )

  const investedValue = positions.reduce((sum, p) => {
    const currentPrice = prices[p.ticker] || p.avgCost
    return sum + (p.shares * currentPrice)
  }, 0)

  // Build positions with current data
  const positionsWithData = positions.map(p => {
    const currentPrice = prices[p.ticker] || p.avgCost
    const currentValue = p.shares * currentPrice
    const totalGain = (currentPrice - p.avgCost) * p.shares
    const totalGainPercent = ((currentPrice - p.avgCost) / p.avgCost) * 100
    const dayChange = currentPrice * 0.01 * (Math.random() - 0.5) // Simulated daily change
    const dayChangePercent = (dayChange / currentPrice) * 100

    return {
      ...p,
      currentPrice,
      currentValue,
      totalGain,
      totalGainPercent,
      dayChange,
      dayChangePercent,
      sector: STOCK_SECTORS[p.ticker] || 'Technology',
      color: STOCK_COLORS[p.ticker] || '#6b7280',
    }
  })

  // Sort positions by value
  const sortedPositions = [...positionsWithData].sort((a, b) => b.currentValue - a.currentValue)

  // Top gainer and loser
  const topGainer = positionsWithData.length > 0
    ? [...positionsWithData].sort((a, b) => b.totalGainPercent - a.totalGainPercent)[0]
    : null
  const topLoser = positionsWithData.length > 0
    ? [...positionsWithData].sort((a, b) => a.totalGainPercent - b.totalGainPercent)[0]
    : null

  // Sector breakdown
  const sectorBreakdown = positionsWithData.reduce((acc: Record<string, number>, pos) => {
    acc[pos.sector] = (acc[pos.sector] || 0) + pos.currentValue
    return acc
  }, {})

  // Active daily challenges
  const activeChallenges = dailyChallenges.filter(c => !c.completed)
  const completedChallenges = dailyChallenges.filter(c => c.completed)

  // Recent trades
  const recentTrades = tradeHistory.slice(0, 3)

  // Empty portfolio state
  if (positions.length === 0) {
    return (
      <div className="space-y-6">
        {/* Welcome Hero for New Users */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/20 via-navy-800 to-navy-900 p-8 text-cream-100 border border-orange-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative text-center py-8">
            <div className="flex justify-center mb-4">
              <RocketIcon size={80} />
            </div>
            <h1 className="text-4xl font-display font-bold mb-2">Welcome to <span className="text-orange-400">TickR!</span></h1>
            <p className="text-xl text-slate-300 mb-6">
              You have <span className="font-bold text-gold-400">${cashBalance.toLocaleString()}</span> to start investing
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/dashboard/stocks"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg hover:shadow-glow-orange transition-all"
              >
                <StockIcon size={32} />
                Buy Your First Stock
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="p-6 rounded-3xl bg-navy-800 border border-white/10">
          <h2 className="text-xl font-display font-bold text-cream-100 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-gold-400" />
            Getting Started
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-teal-500/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <StockIcon size={40} />
                <h3 className="font-display font-bold text-cream-100">Explore Stocks</h3>
              </div>
              <p className="text-sm text-slate-400">Browse companies you know like Apple, Tesla, Netflix, and Roblox.</p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-teal-500/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <WalletIcon size={40} />
                <h3 className="font-display font-bold text-cream-100">Buy Shares</h3>
              </div>
              <p className="text-sm text-slate-400">Use your $10,000 to buy shares of companies you believe in.</p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/50 border border-white/10 hover:border-orange-500/30 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <LearnIcon size={40} />
                <h3 className="font-display font-bold text-cream-100">Learn & Earn</h3>
              </div>
              <p className="text-sm text-slate-400">Complete lessons and quizzes to earn XP and level up!</p>
            </div>
          </div>
        </div>

        {/* Daily Challenges for New Users */}
        {activeChallenges.length > 0 && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-navy-800 border border-orange-500/30">
            <div className="flex items-center gap-3 mb-4">
              <TrophyIcon size={40} />
              <h2 className="text-xl font-display font-bold text-cream-100">Daily Challenges</h2>
              <span className="text-sm text-orange-400 font-semibold">Earn XP!</span>
            </div>

            <div className="space-y-3">
              {activeChallenges.map(challenge => (
                <div key={challenge.id} className="flex items-center justify-between p-4 rounded-2xl bg-navy-900/50 border border-white/10">
                  <div>
                    <div className="font-display font-bold text-cream-100">{challenge.title}</div>
                    <div className="text-sm text-slate-400">{challenge.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-400">+{challenge.xpReward} XP</div>
                    <div className="text-sm text-slate-500">{challenge.progress}/{challenge.target}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl">
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <div className="font-bold">Sale Complete!</div>
              <div className="text-emerald-100 text-sm">{successMessage}</div>
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {sellModalPosition && (
        <SellModal
          position={sellModalPosition}
          onClose={() => setSellModalPosition(null)}
          onSell={handleSell}
        />
      )}

      {/* Portfolio Value Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/20 via-navy-800 to-navy-900 p-8 text-cream-100 border border-teal-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <PortfolioIcon size={48} />
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Portfolio Value</span>
          </div>

          <div className="flex items-end gap-6 mb-6">
            <h1 className="text-5xl font-display font-bold gradient-text">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${totalGainLoss >= 0 ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-coral-500/20 border border-coral-500/30'}`}>
              {totalGainLoss >= 0 ? <ArrowUpRight className="w-5 h-5 text-teal-400" /> : <ArrowDownRight className="w-5 h-5 text-coral-400" />}
              <span className={`font-bold text-lg ${totalGainLoss >= 0 ? 'text-teal-400' : 'text-coral-400'}`}>
                {totalGainLoss >= 0 ? '+' : ''}${Math.abs(totalGainLoss).toFixed(2)} ({totalGainLossPercent.toFixed(2)}%)
              </span>
              <span className="text-slate-500 text-sm">total</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-navy-900/50 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <WalletIcon size={32} />
              </div>
              <div className="text-xs text-slate-400 mb-1">Cash Available</div>
              <div className="text-xl font-display font-bold text-teal-400">${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="p-4 rounded-2xl bg-navy-900/50 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <StockIcon size={32} />
              </div>
              <div className="text-xs text-slate-400 mb-1">Invested</div>
              <div className="text-xl font-display font-bold text-cream-100">${investedValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <div className="p-4 rounded-2xl bg-navy-900/50 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrophyIcon size={32} />
              </div>
              <div className="text-xs text-slate-400 mb-1">Level {level}</div>
              <div className="text-xl font-display font-bold text-gold-400">{title}</div>
            </div>
            <div className="p-4 rounded-2xl bg-navy-900/50 border border-white/10">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <Zap className="w-4 h-4 text-orange-400" />
                Streak
              </div>
              <div className="text-xl font-display font-bold text-orange-400">{currentStreak} 🔥</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Challenges */}
      {(activeChallenges.length > 0 || completedChallenges.length > 0) && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/20 to-navy-800 border border-orange-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrophyIcon size={40} />
              <h2 className="text-xl font-display font-bold text-cream-100">Daily Challenges</h2>
            </div>
            <div className="text-sm text-orange-400 font-semibold">
              {completedChallenges.length}/{dailyChallenges.length} completed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dailyChallenges.map(challenge => (
              <div
                key={challenge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  challenge.completed
                    ? 'bg-teal-500/20 border-teal-500/30'
                    : 'bg-navy-900/50 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-cream-100">{challenge.title}</span>
                  {challenge.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  ) : (
                    <span className="text-xs font-bold text-orange-400">+{challenge.xpReward} XP</span>
                  )}
                </div>
                <p className="text-sm text-slate-400 mb-2">{challenge.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-navy-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        challenge.completed ? 'bg-teal-400' : 'bg-orange-500'
                      }`}
                      style={{ width: `${Math.min(100, (challenge.progress / challenge.target) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    {challenge.progress}/{challenge.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/dashboard/stocks"
          className="flex items-center justify-between p-5 rounded-2xl bg-navy-800 border border-teal-500/30 hover:border-teal-500/50 hover:shadow-glow-teal transition-all group"
        >
          <div className="flex items-center gap-3">
            <StockIcon size={48} />
            <span className="text-lg font-display font-bold text-cream-100">Buy Stocks</span>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/dashboard/learn"
          className="flex items-center justify-between p-5 rounded-2xl bg-navy-800 border border-orange-500/30 hover:border-orange-500/50 hover:shadow-glow-orange transition-all group"
        >
          <div className="flex items-center gap-3">
            <LearnIcon size={48} />
            <span className="text-lg font-display font-bold text-cream-100">Learn & Earn XP</span>
          </div>
          <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Performance Highlights */}
      {topGainer && topLoser && (
        <div className="grid grid-cols-2 gap-4">
          {/* Top Gainer */}
          <div className="p-5 rounded-2xl bg-navy-800 border border-teal-500/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-teal-500/20">
                <TrendingUp className="w-4 h-4 text-teal-400" />
              </div>
              <span className="font-display font-semibold text-teal-400">Top Performer</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-display font-bold text-cream-100">{topGainer.ticker}</div>
                <div className="text-sm text-slate-400">{topGainer.companyName}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold text-teal-400">
                  {topGainer.totalGainPercent >= 0 ? '+' : ''}{topGainer.totalGainPercent.toFixed(2)}%
                </div>
                <div className="text-sm text-teal-400/70">
                  {topGainer.totalGain >= 0 ? '+' : ''}${topGainer.totalGain.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Top Loser */}
          <div className="p-5 rounded-2xl bg-navy-800 border border-coral-500/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-coral-500/20">
                <TrendingDown className="w-4 h-4 text-coral-400" />
              </div>
              <span className="font-display font-semibold text-coral-400">Needs Attention</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-display font-bold text-cream-100">{topLoser.ticker}</div>
                <div className="text-sm text-slate-400">{topLoser.companyName}</div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-display font-bold ${topLoser.totalGainPercent >= 0 ? 'text-teal-400' : 'text-coral-400'}`}>
                  {topLoser.totalGainPercent >= 0 ? '+' : ''}{topLoser.totalGainPercent.toFixed(2)}%
                </div>
                <div className={`text-sm ${topLoser.totalGain >= 0 ? 'text-teal-400/70' : 'text-coral-400/70'}`}>
                  {topLoser.totalGain >= 0 ? '+' : ''}${topLoser.totalGain.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Holdings */}
      <div className="bg-navy-800 rounded-3xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-cream-100 flex items-center gap-3">
              <PortfolioIcon size={40} />
              Your Holdings
            </h2>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-navy-900 text-slate-300 border border-white/10">
              {positions.length} stocks
            </span>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {sortedPositions.map((position) => {
            const isPositive = position.totalGain >= 0

            return (
              <div
                key={position.ticker}
                className="flex items-center gap-5 p-5 hover:bg-white/5 transition-colors group"
              >
                {/* Ticker Badge - Clickable to view details */}
                <Link href={`/dashboard/stock/${position.ticker}`}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${position.color}, ${position.color}cc)` }}
                  >
                    {position.ticker.slice(0, 2)}
                  </div>
                </Link>

                {/* Stock Info - Clickable to view details */}
                <Link href={`/dashboard/stock/${position.ticker}`} className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display font-bold text-lg text-cream-100 hover:text-orange-400 transition-colors">{position.ticker}</span>
                    <span className="text-sm text-slate-500">·</span>
                    <span className="text-sm text-slate-400">{position.shares} shares</span>
                  </div>
                  <div className="text-sm text-slate-500 truncate">{position.companyName}</div>
                </Link>

                {/* Price */}
                <div className="text-right">
                  <div className="text-lg font-display font-bold text-cream-100">${position.currentPrice.toFixed(2)}</div>
                  <div className="text-sm text-slate-500">
                    avg ${position.avgCost.toFixed(2)}
                  </div>
                </div>

                {/* Value & Gain */}
                <div className="text-right min-w-[100px]">
                  <div className="text-lg font-display font-bold text-cream-100">${position.currentValue.toFixed(2)}</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-sm font-bold ${
                    isPositive ? 'bg-teal-500/20 text-teal-400' : 'bg-coral-500/20 text-coral-400'
                  }`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isPositive ? '+' : ''}{position.totalGainPercent.toFixed(2)}%
                  </div>
                </div>

                {/* Sell Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setSellModalPosition(position)
                  }}
                  className="px-4 py-2 rounded-xl bg-coral-500/20 text-coral-400 font-bold text-sm hover:bg-coral-500 hover:text-white transition-all border border-coral-500/30"
                >
                  Sell
                </button>

                {/* Arrow to stock page */}
                <Link href={`/dashboard/stock/${position.ticker}`}>
                  <ChevronRight className="w-5 h-5 text-slate-500 hover:text-orange-400 hover:translate-x-1 transition-all cursor-pointer" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Trades */}
      {recentTrades.length > 0 && (
        <div className="p-6 rounded-3xl bg-navy-800 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-slate-400" />
            <h2 className="text-lg font-display font-bold text-cream-100">Recent Trades</h2>
          </div>
          <div className="space-y-3">
            {recentTrades.map(trade => (
              <div key={trade.id} className="flex items-center justify-between p-3 rounded-xl bg-navy-900/50 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    trade.type === 'buy' ? 'bg-teal-500/20' : 'bg-coral-500/20'
                  }`}>
                    {trade.type === 'buy' ? (
                      <ArrowUpRight className="w-5 h-5 text-teal-400" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-coral-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-cream-100">
                      {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.shares} {trade.ticker}
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(trade.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-display font-bold ${trade.type === 'buy' ? 'text-coral-400' : 'text-teal-400'}`}>
                    {trade.type === 'buy' ? '-' : '+'}${trade.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-slate-500">@${trade.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sector Diversification */}
      {Object.keys(sectorBreakdown).length > 0 && (
        <div className="p-6 rounded-3xl bg-navy-800 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <GoalIcon size={40} />
            <h2 className="text-xl font-display font-bold text-cream-100">Sector Diversification</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(sectorBreakdown)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([sector, value]) => {
                const percentage = investedValue > 0 ? ((value as number) / investedValue) * 100 : 0
                const color = SECTOR_COLORS[sector] || '#6b7280'

                return (
                  <div key={sector}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display font-semibold text-cream-100">{sector}</span>
                      <div className="text-right">
                        <span className="font-display font-bold text-cream-100">{percentage.toFixed(1)}%</span>
                        <span className="text-slate-500 text-sm ml-2">${(value as number).toFixed(0)}</span>
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-navy-900 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}cc)`
                        }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Diversification Tips */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-navy-900 border border-orange-500/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-display font-semibold text-orange-400 mb-1">Diversification Tip</p>
                <p className="text-sm text-slate-300">
                  {Object.keys(sectorBreakdown).length < 3
                    ? "Consider adding stocks from more sectors to reduce risk. Having investments across different industries helps protect your portfolio!"
                    : Object.values(sectorBreakdown).some(v => investedValue > 0 && ((v as number) / investedValue) > 0.5)
                    ? "You're heavily invested in one sector. Consider spreading your investments more evenly to reduce risk."
                    : "Great job! Your portfolio is diversifying nicely. Keep exploring different sectors!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Stats Footer */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-navy-800 border border-white/10 text-center">
          <div className="text-3xl font-display font-bold text-teal-400">{positions.length}</div>
          <div className="text-sm text-slate-400 font-medium">Stocks Owned</div>
        </div>
        <div className="p-5 rounded-2xl bg-navy-800 border border-white/10 text-center">
          <div className="text-3xl font-display font-bold text-cream-100">{totalTrades}</div>
          <div className="text-sm text-slate-400 font-medium">Total Trades</div>
        </div>
        <div className="p-5 rounded-2xl bg-navy-800 border border-white/10 text-center">
          <div className="text-3xl font-display font-bold text-teal-400">
            {positionsWithData.filter(p => p.totalGain > 0).length}
          </div>
          <div className="text-sm text-slate-400 font-medium">Winners</div>
        </div>
        <div className="p-5 rounded-2xl bg-navy-800 border border-white/10 text-center">
          <div className={`text-3xl font-display font-bold ${totalGainLoss >= 0 ? 'text-gold-400' : 'text-coral-400'}`}>
            {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(0)}
          </div>
          <div className="text-sm text-slate-400 font-medium">Total Profit</div>
        </div>
      </div>
    </div>
  )
}
