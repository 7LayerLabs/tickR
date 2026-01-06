'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/game.store'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  X,
  Building2,
  Lightbulb,
  PieChart,
  BarChart3,
  Calendar,
  Users,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Loader2
} from 'lucide-react'

// Collapsible Stat Card Component
function StatCard({
  emoji,
  label,
  value,
  color,
  explanation,
  indicator
}: {
  emoji: string
  label: string
  value: string
  color: string
  explanation: string
  indicator: { type: 'good' | 'warning' | 'neutral'; text: string }
}) {
  const [isOpen, setIsOpen] = useState(false)

  const colorStyles: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', text: 'text-blue-600' },
    purple: { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', text: 'text-purple-600' },
    emerald: { bg: 'from-emerald-50 to-green-50', border: 'border-emerald-200', text: 'text-emerald-600' },
    red: { bg: 'from-red-50 to-rose-50', border: 'border-red-200', text: 'text-red-600' },
    orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', text: 'text-orange-600' },
    slate: { bg: 'from-slate-50 to-gray-50', border: 'border-slate-200', text: 'text-slate-600' },
    green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-600' },
    indigo: { bg: 'from-indigo-50 to-blue-50', border: 'border-indigo-200', text: 'text-indigo-600' },
  }

  const indicatorStyles = {
    good: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    neutral: 'bg-slate-100 text-slate-600',
  }

  const style = colorStyles[color] || colorStyles.blue

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} overflow-hidden cursor-pointer transition-all hover:shadow-md`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{emoji}</span>
            <span className="font-semibold text-slate-700 text-sm">{label}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <div className={`text-xl font-bold ${style.text}`}>{value}</div>
      </div>

      {/* Dropdown Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
        <div className="px-4 pb-4 space-y-2 border-t border-slate-200/50 pt-3">
          <p className="text-xs text-slate-600 leading-relaxed">{explanation}</p>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${indicatorStyles[indicator.type]}`}>
            {indicator.type === 'good' && '✅ '}
            {indicator.type === 'warning' && '⚠️ '}
            {indicator.type === 'neutral' && '📊 '}
            {indicator.text}
          </span>
        </div>
      </div>
    </div>
  )
}

// Mock stock data with REAL January 2026 data for portfolio stocks
const MOCK_STOCKS: Record<string, any> = {
  AAPL: {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    price: 277.18,
    changePercent: 0.85,
    changeAmount: 2.34,
    sector: 'Technology',
    color: '#10b981',
    stats: {
      marketCap: 4010000000000, // $4.01T
      peRatio: 36.23,
      forwardPE: 32.77,
      fiftyTwoWeekHigh: 288.62,
      fiftyTwoWeekLow: 169.21,
      sharesOutstanding: 14780000000,
      dividendYield: 0.44,
      beta: 1.24,
      volume: 45200000,
      avgVolume: 52100000,
    },
    whatCompanyDoes: 'Apple designs, manufactures, and sells smartphones (iPhone), computers (Mac), tablets (iPad), wearables (Apple Watch, AirPods), and services (App Store, Apple Music, iCloud). They are known for premium design and a seamless ecosystem that connects all their devices.',
    whyPeopleKnowIt: [
      'iPhone - the world\'s most popular smartphone',
      'Mac computers used by creators and professionals',
      'AirPods and Apple Watch dominate the wearables market',
      'App Store is the largest mobile app marketplace',
      'One of the world\'s most valuable companies'
    ],
    revenueBreakdown: [
      { source: 'iPhone', percent: 52, icon: '📱' },
      { source: 'Services', percent: 22, icon: '☁️' },
      { source: 'Mac', percent: 10, icon: '💻' },
      { source: 'iPad', percent: 7, icon: '📲' },
      { source: 'Wearables', percent: 9, icon: '⌚' },
    ],
    funFacts: [
      'Apple was founded in a garage in 1976',
      'The company has over $160 billion in cash reserves',
      'Apple Pay processes more transactions than all other mobile payments combined'
    ],
    nextEarnings: 'January 29, 2026',
  },
  NVDA: {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    price: 184.90,
    changePercent: -1.83,
    changeAmount: -3.45,
    sector: 'Technology',
    color: '#8b5cf6',
    stats: {
      marketCap: 4590000000000, // $4.59T
      peRatio: 48.44,
      forwardPE: 35.20,
      fiftyTwoWeekHigh: 152.89,
      fiftyTwoWeekLow: 75.61,
      sharesOutstanding: 24500000000,
      dividendYield: 0.03,
      beta: 1.67,
      volume: 312000000,
      avgVolume: 285000000,
    },
    whatCompanyDoes: 'NVIDIA makes graphics processing units (GPUs) that power everything from video games to artificial intelligence. Their chips are essential for training AI models like ChatGPT, making them the backbone of the AI revolution.',
    whyPeopleKnowIt: [
      'GeForce GPUs power most gaming PCs worldwide',
      'Their chips train almost every major AI model',
      'Stock price increased over 200% in 2023 due to AI boom',
      'Powers data centers for companies like Microsoft, Google, Amazon',
      'Leader in autonomous vehicle technology'
    ],
    revenueBreakdown: [
      { source: 'Data Center (AI)', percent: 83, icon: '🤖' },
      { source: 'Gaming', percent: 13, icon: '🎮' },
      { source: 'Auto & Other', percent: 4, icon: '🚗' },
    ],
    funFacts: [
      'NVIDIA\'s GPUs are required to train ChatGPT and other AI models',
      'The company started as a gaming graphics company in 1993',
      'Their CEO Jensen Huang is famous for wearing leather jackets'
    ],
    nextEarnings: 'February 26, 2026',
  },
  TSLA: {
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    price: 446.07,
    changePercent: 1.48,
    changeAmount: 6.48,
    sector: 'Automotive',
    color: '#ef4444',
    stats: {
      marketCap: 1456000000000, // $1.46T
      peRatio: 292.05,
      forwardPE: 216.79,
      fiftyTwoWeekHigh: 488.54,
      fiftyTwoWeekLow: 214.25,
      sharesOutstanding: 3330000000,
      dividendYield: 0,
      beta: 1.83,
      volume: 89500000,
      avgVolume: 95200000,
    },
    whatCompanyDoes: 'Tesla designs and manufactures electric vehicles (EVs), battery energy storage systems, and solar products. They are leading the transition from gas-powered to electric transportation and pioneering autonomous driving technology.',
    whyPeopleKnowIt: [
      'Model 3 and Model Y are the best-selling EVs in the world',
      'CEO Elon Musk is one of the most famous entrepreneurs',
      'Cybertruck has a unique futuristic design',
      'Supercharger network is the largest EV charging network',
      'Full Self-Driving (FSD) technology is industry-leading'
    ],
    revenueBreakdown: [
      { source: 'Vehicle Sales', percent: 82, icon: '🚗' },
      { source: 'Energy & Storage', percent: 8, icon: '🔋' },
      { source: 'Services', percent: 10, icon: '🔧' },
    ],
    funFacts: [
      'Tesla is named after inventor Nikola Tesla',
      'The company was founded in 2003 but Elon Musk joined in 2004',
      'Tesla stock is one of the most traded stocks in the world'
    ],
    nextEarnings: 'January 28, 2026',
  },
  GOOGL: {
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    price: 315.09,
    changePercent: 1.33,
    changeAmount: 4.12,
    sector: 'Technology',
    color: '#0ea5e9',
    stats: {
      marketCap: 3806000000000, // $3.81T
      peRatio: 30.81,
      forwardPE: 29.66,
      fiftyTwoWeekHigh: 328.83,
      fiftyTwoWeekLow: 140.53,
      sharesOutstanding: 12070000000,
      dividendYield: 0.27,
      beta: 1.08,
      volume: 22100000,
      avgVolume: 25800000,
    },
    whatCompanyDoes: 'Alphabet is Google\'s parent company. They run the world\'s largest search engine, YouTube (biggest video platform), Android (most popular mobile OS), and Google Cloud. They also invest in "moonshot" projects like self-driving cars (Waymo).',
    whyPeopleKnowIt: [
      'Google Search handles 8.5 billion searches per day',
      'YouTube has over 2 billion monthly users',
      'Android powers 70%+ of smartphones worldwide',
      'Google Maps is the most used navigation app',
      'Gmail has over 1.8 billion users'
    ],
    revenueBreakdown: [
      { source: 'Google Search Ads', percent: 57, icon: '🔍' },
      { source: 'YouTube Ads', percent: 10, icon: '📺' },
      { source: 'Google Cloud', percent: 11, icon: '☁️' },
      { source: 'Network Ads', percent: 10, icon: '📊' },
      { source: 'Other (Play, Devices)', percent: 12, icon: '📱' },
    ],
    funFacts: [
      'Google was started in a Stanford dorm room in 1998',
      'The name "Google" comes from "googol" (1 followed by 100 zeros)',
      'Alphabet owns Waymo, the leading self-driving car company'
    ],
    nextEarnings: 'February 4, 2026',
  },
  NFLX: {
    ticker: 'NFLX',
    companyName: 'Netflix, Inc.',
    price: 94.00,
    changePercent: -2.85,
    changeAmount: -2.76,
    sector: 'Entertainment',
    color: '#ec4899',
    stats: {
      marketCap: 410000000000,
      peRatio: 48.50,
      forwardPE: 35.20,
      fiftyTwoWeekHigh: 941.75,
      fiftyTwoWeekLow: 542.01,
      sharesOutstanding: 428000000,
      dividendYield: 0,
      beta: 1.35,
      volume: 5800000,
      avgVolume: 6200000,
    },
    whatCompanyDoes: 'Netflix is the world\'s largest streaming entertainment service with over 280 million subscribers. They produce original movies and TV shows (Netflix Originals) and license content from other studios.',
    whyPeopleKnowIt: [
      'Stranger Things, Squid Game, and Wednesday are massive hits',
      'Pioneered the "binge-watching" model for TV',
      'Available in over 190 countries',
      'Revolutionized how people consume entertainment',
      'Now producing live events and gaming content'
    ],
    revenueBreakdown: [
      { source: 'Subscriptions', percent: 97, icon: '📺' },
      { source: 'Advertising', percent: 3, icon: '📢' },
    ],
    funFacts: [
      'Netflix started as a DVD-by-mail service in 1997',
      'The company spends over $17 billion per year on content',
      'Squid Game is the most-watched Netflix show ever'
    ],
    nextEarnings: 'January 21, 2026',
  },
  DIS: {
    ticker: 'DIS',
    companyName: 'The Walt Disney Company',
    price: 111.85,
    changePercent: -1.69,
    changeAmount: -1.92,
    sector: 'Entertainment',
    color: '#6366f1',
    stats: {
      marketCap: 203000000000,
      peRatio: 38.50,
      forwardPE: 22.10,
      fiftyTwoWeekHigh: 123.74,
      fiftyTwoWeekLow: 83.91,
      sharesOutstanding: 1820000000,
      dividendYield: 0.89,
      beta: 1.42,
      volume: 8900000,
      avgVolume: 10200000,
    },
    whatCompanyDoes: 'Disney is the world\'s largest entertainment company. They own theme parks, movie studios (Disney, Pixar, Marvel, Star Wars), streaming services (Disney+, Hulu, ESPN+), TV networks (ABC, ESPN), and cruise ships.',
    whyPeopleKnowIt: [
      'Disney World and Disneyland are the most visited theme parks',
      'Marvel movies are the highest-grossing film franchise ever',
      'Star Wars is a cultural phenomenon owned by Disney',
      'Mickey Mouse is one of the most recognizable characters',
      'Disney+ has over 150 million subscribers'
    ],
    revenueBreakdown: [
      { source: 'Media Networks', percent: 35, icon: '📺' },
      { source: 'Parks & Experiences', percent: 37, icon: '🎢' },
      { source: 'Streaming (D+, Hulu)', percent: 20, icon: '🎬' },
      { source: 'Content Sales', percent: 8, icon: '🎥' },
    ],
    funFacts: [
      'Disney was founded in 1923 by Walt Disney',
      'The company owns 12 theme parks across 3 continents',
      'Disney paid $4 billion for Marvel and $4 billion for Lucasfilm (Star Wars)'
    ],
    nextEarnings: 'February 5, 2026',
  },
  NKE: {
    ticker: 'NKE',
    companyName: 'Nike, Inc.',
    price: 63.28,
    changePercent: -0.67,
    changeAmount: -0.43,
    sector: 'Consumer',
    color: '#f59e0b',
    stats: {
      marketCap: 93680000000,
      peRatio: 37.11,
      forwardPE: 28.50,
      fiftyTwoWeekHigh: 82.44,
      fiftyTwoWeekLow: 52.28,
      sharesOutstanding: 1480000000,
      dividendYield: 2.50,
      beta: 0.95,
      volume: 12500000,
      avgVolume: 11800000,
    },
    whatCompanyDoes: 'Nike is the world\'s largest athletic footwear and apparel company. They design, manufacture, and sell shoes, clothing, and equipment for sports and fitness. Nike also owns Converse and Jordan Brand.',
    whyPeopleKnowIt: [
      '"Just Do It" is one of the most famous slogans ever',
      'Air Jordan sneakers are a cultural icon',
      'Sponsors top athletes like LeBron James and Serena Williams',
      'The Nike Swoosh is one of the most recognized logos',
      'Dominates basketball, running, and soccer markets'
    ],
    revenueBreakdown: [
      { source: 'Footwear', percent: 68, icon: '👟' },
      { source: 'Apparel', percent: 27, icon: '👕' },
      { source: 'Equipment', percent: 5, icon: '⚽' },
    ],
    funFacts: [
      'Nike was originally called "Blue Ribbon Sports"',
      'The Swoosh logo was designed for just $35 in 1971',
      'Michael Jordan\'s deal with Nike created the Jordan Brand worth $5+ billion'
    ],
    nextEarnings: 'March 20, 2026',
  },
  RBLX: {
    ticker: 'RBLX',
    companyName: 'Roblox Corporation',
    price: 80.95,
    changePercent: -1.54,
    changeAmount: -1.27,
    sector: 'Gaming',
    color: '#14b8a6',
    stats: {
      marketCap: 56820000000,
      peRatio: -56.79, // Negative because not profitable yet
      forwardPE: -42.30,
      fiftyTwoWeekHigh: 150.59,
      fiftyTwoWeekLow: 50.10,
      sharesOutstanding: 702000000,
      dividendYield: 0,
      beta: 1.85,
      volume: 8200000,
      avgVolume: 9100000,
    },
    whatCompanyDoes: 'Roblox is an online platform where millions of people create and play games together. Users can build their own games, play games made by others, and socialize with friends. It\'s especially popular with kids and teens.',
    whyPeopleKnowIt: [
      'Over 70 million daily active users, mostly ages 9-15',
      'Users create their own games and experiences',
      'Virtual currency (Robux) is used to buy items',
      'Hosted virtual concerts by artists like Lil Nas X',
      'Platform for brands to create interactive experiences'
    ],
    revenueBreakdown: [
      { source: 'Robux Purchases', percent: 85, icon: '💎' },
      { source: 'Subscriptions', percent: 10, icon: '⭐' },
      { source: 'Advertising', percent: 5, icon: '📢' },
    ],
    funFacts: [
      'Roblox has over 40 million games created by users',
      'Some Roblox game developers earn over $1 million per year',
      'The platform has its own virtual economy larger than some countries'
    ],
    nextEarnings: 'February 12, 2026',
  },
}

// Related stocks by sector
const RELATED_STOCKS: Record<string, { ticker: string; name: string; price: number; change: number }[]> = {
  Technology: [
    { ticker: 'MSFT', name: 'Microsoft', price: 491.51, change: 0.10 },
    { ticker: 'META', name: 'Meta Platforms', price: 612.77, change: 2.15 },
    { ticker: 'AMZN', name: 'Amazon', price: 225.94, change: 0.85 },
    { ticker: 'CRM', name: 'Salesforce', price: 342.18, change: -0.45 },
  ],
  Entertainment: [
    { ticker: 'WBD', name: 'Warner Bros Discovery', price: 12.45, change: -1.23 },
    { ticker: 'PARA', name: 'Paramount', price: 11.82, change: 0.67 },
    { ticker: 'CMCSA', name: 'Comcast', price: 42.15, change: 0.34 },
    { ticker: 'SPOT', name: 'Spotify', price: 295.80, change: 2.45 },
  ],
  Automotive: [
    { ticker: 'F', name: 'Ford', price: 10.25, change: -0.85 },
    { ticker: 'GM', name: 'General Motors', price: 54.30, change: 1.12 },
    { ticker: 'RIVN', name: 'Rivian', price: 14.85, change: -2.34 },
    { ticker: 'LCID', name: 'Lucid Motors', price: 3.42, change: -1.56 },
  ],
  Consumer: [
    { ticker: 'LULU', name: 'Lululemon', price: 385.20, change: 1.45 },
    { ticker: 'UA', name: 'Under Armour', price: 8.95, change: -0.67 },
    { ticker: 'ADDYY', name: 'Adidas', price: 118.50, change: 0.89 },
    { ticker: 'VFC', name: 'VF Corporation', price: 18.75, change: -1.12 },
  ],
  Gaming: [
    { ticker: 'EA', name: 'Electronic Arts', price: 204.41, change: 0.03 },
    { ticker: 'TTWO', name: 'Take-Two', price: 185.30, change: 1.25 },
    { ticker: 'ATVI', name: 'Activision', price: 95.12, change: 0.45 },
    { ticker: 'U', name: 'Unity Software', price: 22.85, change: -2.10 },
  ],
}

// Dynamic stock data type for API-fetched stocks
interface DynamicStockData {
  ticker: string
  companyName: string
  price: number
  changePercent: number
  changeAmount: number
  sector: string
  color: string
  description: string
  whyKidsKnow: string
  marketCap: number | null
  hasFullData: boolean
  previousClose?: number
  high?: number
  low?: number
  open?: number
}

export default function StockDetailPage() {
  const params = useParams()
  const router = useRouter()
  const ticker = (params.ticker as string).toUpperCase()

  const [showBuyModal, setShowBuyModal] = useState(false)
  const [showSellModal, setShowSellModal] = useState(false)
  const [shares, setShares] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dynamicStock, setDynamicStock] = useState<DynamicStockData | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Use game store for real trading
  const {
    cashBalance,
    buyStock,
    sellStock,
    getPosition,
  } = useGameStore()

  // Check if we have mock data for this ticker
  const mockStock = MOCK_STOCKS[ticker]

  // Fetch dynamic data if not in mock stocks
  useEffect(() => {
    if (!mockStock && !dynamicStock && !isLoading) {
      setIsLoading(true)
      setFetchError(null)

      fetch(`/api/stocks/${ticker}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setFetchError(data.error)
          } else {
            setDynamicStock(data)
          }
          setIsLoading(false)
        })
        .catch(() => {
          setFetchError('Failed to load stock data')
          setIsLoading(false)
        })
    }
  }, [ticker, mockStock, dynamicStock, isLoading])

  // Use either mock or dynamic stock data
  const stock = mockStock || (dynamicStock ? {
    ...dynamicStock,
    stats: dynamicStock.marketCap ? {
      marketCap: dynamicStock.marketCap,
      peRatio: 0,
      forwardPE: 0,
      fiftyTwoWeekHigh: dynamicStock.high || dynamicStock.price,
      fiftyTwoWeekLow: dynamicStock.low || dynamicStock.price,
      sharesOutstanding: 0,
      dividendYield: 0,
      beta: 1,
      volume: 0,
      avgVolume: 0,
    } : null,
    whatCompanyDoes: dynamicStock.description,
    whyPeopleKnowIt: dynamicStock.whyKidsKnow ? [dynamicStock.whyKidsKnow] : [],
    revenueBreakdown: [],
    funFacts: [],
    nextEarnings: 'N/A',
  } : null)

  const relatedStocks = RELATED_STOCKS[stock?.sector] || []

  // Get user position from game store
  const gamePosition = getPosition(ticker)
  const userPosition = gamePosition && stock ? {
    shares: gamePosition.shares,
    avgCost: gamePosition.avgCost,
    currentValue: gamePosition.shares * (stock?.price || 0),
    totalGain: gamePosition.shares * ((stock?.price || 0) - gamePosition.avgCost),
  } : null

  // Handle buy
  const handleBuy = () => {
    if (!stock) return
    setIsProcessing(true)
    setError(null)

    const result = buyStock(ticker, shares, stock.price)

    if (result.success) {
      setSuccessMessage(result.message)
      setShowBuyModal(false)
      setShares(1)
      setTimeout(() => setSuccessMessage(null), 3000)
    } else {
      setError(result.message)
    }
    setIsProcessing(false)
  }

  // Handle sell
  const handleSell = () => {
    if (!stock) return
    setIsProcessing(true)
    setError(null)

    const result = sellStock(ticker, shares, stock.price)

    if (result.success) {
      setSuccessMessage(result.message)
      setShowSellModal(false)
      setShares(1)
      setTimeout(() => setSuccessMessage(null), 3000)
    } else {
      setError(result.message)
    }
    setIsProcessing(false)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Loading {ticker}...</h2>
        <p className="text-slate-500">Fetching real-time stock data</p>
      </div>
    )
  }

  // Error or not found state
  if (!stock || fetchError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Stock Not Found</h2>
        <p className="text-slate-500 mb-6">We couldn't find data for ticker "{ticker}"</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    )
  }

  const isPositive = stock.changePercent >= 0
  const totalCost = shares * stock.price

  const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`
    return `$${(cap / 1e6).toFixed(0)}M`
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500 text-white shadow-lg">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold">Trade Successful!</div>
              <div className="text-sm text-emerald-100">{successMessage}</div>
            </div>
            <div className="text-emerald-200 font-bold">+25 XP</div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Stock Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white" style={{ background: `linear-gradient(135deg, ${stock.color}, ${stock.color}cc)` }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">{stock.sector}</span>
              </div>
              <h1 className="text-4xl font-display font-bold mb-1">{stock.ticker}</h1>
              <p className="text-white/80 text-lg">{stock.companyName}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">${stock.price.toFixed(2)}</div>
              <div className={`flex items-center justify-end gap-1 text-lg font-semibold ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}% (${Math.abs(stock.changeAmount).toFixed(2)})
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowBuyModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-slate-800 font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              <DollarSign className="w-5 h-5 text-green-600" />
              Buy {stock.ticker}
            </button>
            {userPosition && (
              <button
                onClick={() => setShowSellModal(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white/30 transition-colors"
              >
                <TrendingUp className="w-5 h-5" />
                Sell
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Your Position */}
      {userPosition && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-blue-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Your Position</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-500">Shares Owned</div>
              <div className="text-2xl font-bold text-slate-800">{userPosition.shares}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Avg Cost</div>
              <div className="text-2xl font-bold text-slate-800">${userPosition.avgCost.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Current Value</div>
              <div className="text-2xl font-bold text-slate-800">${userPosition.currentValue.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Total Return</div>
              <div className={`text-2xl font-bold ${userPosition.totalGain >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {userPosition.totalGain >= 0 ? '+' : ''}${userPosition.totalGain.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* What This Company Does */}
      <div className="p-6 rounded-2xl bg-white border-2 border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">What They Do</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">{stock.whatCompanyDoes}</p>
      </div>

      {/* Why People Know It - only show if we have data */}
      {stock.whyPeopleKnowIt && stock.whyPeopleKnowIt.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Why People Know Them</h2>
          </div>
          <ul className="space-y-3">
            {stock.whyPeopleKnowIt.map((reason: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-slate-600">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Revenue Breakdown - only show if we have data */}
      {stock.revenueBreakdown && stock.revenueBreakdown.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">How They Make Money</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stock.revenueBreakdown.map((item: any, index: number) => (
              <div key={index} className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-2xl font-bold text-slate-800">{item.percent}%</div>
                <div className="text-sm text-slate-500">{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Stats - Collapsible Kid Friendly Explanations - only show if we have stats */}
      {stock.stats && (
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Key Statistics</h2>
            <span className="text-sm text-slate-400 ml-2">(tap to learn more!)</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              emoji="🏢"
              label="Market Cap"
              value={formatMarketCap(stock.stats.marketCap)}
              color="blue"
              explanation="The total value of the company if you bought ALL the shares. Like the price tag on the whole company."
              indicator={{ type: 'neutral', text: 'Bigger = stable, Smaller = more growth potential' }}
            />
            <StatCard
              emoji="📈"
              label="P/E Ratio"
              value={stock.stats.peRatio > 0 ? stock.stats.peRatio.toFixed(1) : 'N/A'}
              color="purple"
              explanation="Price ÷ Earnings. How many years of profits to equal the stock price. Like paying $30 for a lemonade stand that makes $1/year = P/E of 30."
              indicator={stock.stats.peRatio > 30
                ? { type: 'warning', text: 'High P/E = expensive' }
                : { type: 'good', text: 'Lower P/E = better value' }
              }
            />
            <StatCard
              emoji="🚀"
              label="52-Week High"
              value={`$${stock.stats.fiftyTwoWeekHigh.toFixed(2)}`}
              color="emerald"
              explanation="The highest price this stock hit in the last year. Like the high score!"
              indicator={stock.price >= stock.stats.fiftyTwoWeekHigh * 0.95
                ? { type: 'good', text: 'Near high = Strong momentum' }
                : { type: 'neutral', text: 'Below high = Possible opportunity?' }
              }
            />
            <StatCard
              emoji="📉"
              label="52-Week Low"
              value={`$${stock.stats.fiftyTwoWeekLow.toFixed(2)}`}
              color="red"
              explanation="The lowest price this stock hit in the last year. The 'on sale' price!"
              indicator={stock.price <= stock.stats.fiftyTwoWeekLow * 1.1
                ? { type: 'warning', text: 'Near low = Be careful' }
                : { type: 'good', text: 'Above low = Recovered' }
              }
            />
            {stock.stats.volume > 0 && (
              <StatCard
                emoji="📊"
                label="Volume"
                value={`${(stock.stats.volume / 1e6).toFixed(1)}M`}
                color="orange"
                explanation="How many shares were bought/sold today. Like counting how many people visited a store."
                indicator={stock.stats.volume > stock.stats.avgVolume
                  ? { type: 'good', text: 'Above avg = Hot today!' }
                  : { type: 'neutral', text: 'Below avg = Quiet day' }
                }
              />
            )}
            {stock.stats.avgVolume > 0 && (
              <StatCard
                emoji="📅"
                label="Avg Volume"
                value={`${(stock.stats.avgVolume / 1e6).toFixed(1)}M`}
                color="slate"
                explanation="The normal amount of shares traded per day. This is the baseline to compare today's activity."
                indicator={{ type: 'neutral', text: 'Higher = easier to trade' }}
              />
            )}
            <StatCard
              emoji="💰"
              label="Dividend"
              value={`${stock.stats.dividendYield.toFixed(2)}%`}
              color="green"
              explanation="Free money the company pays you just for owning the stock! Like getting $2/year for every $100 invested."
              indicator={stock.stats.dividendYield > 0
                ? { type: 'good', text: stock.stats.dividendYield >= 2 ? 'Great income!' : 'Some income' }
                : { type: 'neutral', text: 'Growth stock (no dividend)' }
              }
            />
            <StatCard
              emoji="🎢"
              label="Beta"
              value={stock.stats.beta.toFixed(2)}
              color="indigo"
              explanation="How wild the ride is! Beta of 1 = moves like the market. Beta of 2 = moves TWICE as much (more risk & reward)."
              indicator={stock.stats.beta > 1.5
                ? { type: 'warning', text: 'Roller coaster ride!' }
                : stock.stats.beta > 1
                ? { type: 'neutral', text: 'Slightly bumpy' }
                : { type: 'good', text: 'Smooth & calm' }
              }
            />
          </div>
        </div>
      )}

      {/* Fun Facts - only show if we have data */}
      {stock.funFacts && stock.funFacts.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-bold text-amber-800">Fun Facts</h2>
          </div>
          <ul className="space-y-2">
            {stock.funFacts.map((fact: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-amber-800">
                <span className="text-amber-500">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Earnings - only show if we have a valid date */}
      {stock.nextEarnings && stock.nextEarnings !== 'N/A' && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-200">
            <Calendar className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <div className="text-sm text-slate-500">Next Earnings Report</div>
            <div className="text-lg font-bold text-slate-800">{stock.nextEarnings}</div>
          </div>
        </div>
      )}

      {/* Related Stocks */}
      {relatedStocks.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border-2 border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">More in {stock.sector}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedStocks.filter(s => s.ticker !== ticker).slice(0, 4).map((related) => (
              <Link
                key={related.ticker}
                href={`/dashboard/stock/${related.ticker}`}
                className="p-4 rounded-xl border-2 border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800">{related.ticker}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="text-sm text-slate-500 truncate mb-2">{related.name}</div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">${related.price.toFixed(2)}</span>
                  <span className={`text-sm font-bold ${related.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {related.change >= 0 ? '+' : ''}{related.change.toFixed(2)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Buy {stock.ticker}</h3>
              <button onClick={() => { setShowBuyModal(false); setError(null); }} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Shares</label>
                <input
                  type="number"
                  min="1"
                  value={shares}
                  onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Price per share</span>
                  <span className="font-semibold text-slate-800">${stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-slate-800">Total Cost</span>
                  <span className="font-bold text-slate-800">${totalCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Cash Available</span>
                    <span className={`font-semibold ${cashBalance >= totalCost ? 'text-emerald-600' : 'text-red-600'}`}>
                      ${cashBalance.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleBuy}
                disabled={isProcessing || totalCost > cashBalance}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-black/20"
              >
                {isProcessing ? 'Processing...' : `Buy ${shares} Share${shares > 1 ? 's' : ''} for $${totalCost.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && userPosition && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Sell {stock.ticker}</h3>
              <button onClick={() => { setShowSellModal(false); setError(null); }} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Shares</label>
                <input
                  type="number"
                  min="1"
                  max={userPosition.shares}
                  value={shares}
                  onChange={(e) => setShares(Math.min(userPosition.shares, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                />
                <p className="text-sm text-slate-500 mt-2">You own {userPosition.shares} shares</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Price per share</span>
                  <span className="font-semibold text-slate-800">${stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-slate-800">You'll Receive</span>
                  <span className="font-bold text-emerald-600">${totalCost.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSell}
                disabled={isProcessing || shares > userPosition.shares}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-black/20"
              >
                {isProcessing ? 'Processing...' : `Sell ${shares} Share${shares > 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
