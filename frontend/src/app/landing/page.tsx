'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Demo stocks data for "Try Before You Sign Up"
const DEMO_STOCKS = [
  { ticker: 'AAPL', name: 'Apple', emoji: '🍎', price: 178.50, weekChange: 3.2, color: '#0ea5e9' },
  { ticker: 'TSLA', name: 'Tesla', emoji: '🚗', price: 248.20, weekChange: -2.1, color: '#ef4444' },
  { ticker: 'NFLX', name: 'Netflix', emoji: '🎬', price: 485.30, weekChange: 5.8, color: '#ec4899' },
  { ticker: 'NKE', name: 'Nike', emoji: '👟', price: 98.40, weekChange: 1.5, color: '#f97316' },
  { ticker: 'DIS', name: 'Disney', emoji: '🏰', price: 112.80, weekChange: -0.8, color: '#8b5cf6' },
  { ticker: 'RBLX', name: 'Roblox', emoji: '🎮', price: 45.60, weekChange: 8.2, color: '#10b981' },
]

// Beat the Market game data
const GAME_ROUNDS = [
  {
    question: "Which stock went UP this week?",
    stocks: [
      { ticker: 'AAPL', name: 'Apple', change: 3.2, isUp: true },
      { ticker: 'TSLA', name: 'Tesla', change: -2.1, isUp: false },
      { ticker: 'DIS', name: 'Disney', change: -0.8, isUp: false },
    ],
    hint: "Think about the new iPhone launch..."
  },
  {
    question: "Which company beat earnings?",
    stocks: [
      { ticker: 'META', name: 'Meta', change: -4.5, isUp: false },
      { ticker: 'NFLX', name: 'Netflix', change: 5.8, isUp: true },
      { ticker: 'SNAP', name: 'Snapchat', change: -8.2, isUp: false },
    ],
    hint: "Streaming is making a comeback..."
  },
  {
    question: "Gaming stocks are hot! Which rose most?",
    stocks: [
      { ticker: 'EA', name: 'EA Sports', change: 2.1, isUp: true },
      { ticker: 'RBLX', name: 'Roblox', change: 8.2, isUp: true },
      { ticker: 'TTWO', name: 'Take-Two', change: 1.5, isUp: true },
    ],
    hint: "Kids are playing more than ever...",
    correctTicker: 'RBLX'
  },
]

// Tick FAQ questions and answers
const TICK_FAQ = [
  {
    question: "Is this real money?",
    answer: "Nope! You get $10,000 in play money to practice with. No real money, no risk - just learning! 💰"
  },
  {
    question: "How do I make money?",
    answer: "Buy stocks low, sell high! When a company does well, their stock price usually goes up. You profit from the difference! 📈"
  },
  {
    question: "What stocks can I buy?",
    answer: "Brands you know! Apple, Nike, Disney, Tesla, Roblox, Netflix and 500+ more real companies. No sketchy stuff! 🎯"
  },
  {
    question: "Is this safe for kids?",
    answer: "100% safe! No real money, no credit cards, no personal info shared. Parents can monitor everything too. 🔒"
  },
  {
    question: "How do I level up?",
    answer: "Complete lessons, make smart trades, and keep a daily streak! There are 7 levels from Rookie to Legend. 🏆"
  },
  {
    question: "Can I compete with friends?",
    answer: "Yes! Create private leagues, challenge friends 1v1, and climb the weekly leaderboard. Bragging rights included! ⚔️"
  },
  {
    question: "What if I lose all my money?",
    answer: "It's play money, so no stress! You can reset and try again. Losing is part of learning - even pros lose sometimes! 💪"
  },
  {
    question: "How old do I need to be?",
    answer: "TickR is designed for ages 12-16, but anyone curious about investing can learn here! 🎓"
  },
]

// Landing page copy preview - no redirects
export default function LandingPage() {
  // Demo portfolio state
  const [selectedDemoStocks, setSelectedDemoStocks] = useState<string[]>([])
  const [showDemoResults, setShowDemoResults] = useState(false)

  // Beat the Market game state
  const [gameStarted, setGameStarted] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)
  const [gameScore, setGameScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ type: 'bot' | 'user'; text: string }[]>([
    { type: 'bot', text: "Hey there! 👋 I'm Tick, your investing buddy! Tap a question below to learn more about TickR!" }
  ])

  // Demo portfolio handlers
  const toggleDemoStock = (ticker: string) => {
    if (selectedDemoStocks.includes(ticker)) {
      setSelectedDemoStocks(selectedDemoStocks.filter(t => t !== ticker))
    } else if (selectedDemoStocks.length < 3) {
      setSelectedDemoStocks([...selectedDemoStocks, ticker])
    }
  }

  const calculateDemoReturn = () => {
    const selected = DEMO_STOCKS.filter(s => selectedDemoStocks.includes(s.ticker))
    const avgChange = selected.reduce((sum, s) => sum + s.weekChange, 0) / selected.length
    return avgChange
  }

  // Game handlers
  const handleGameAnswer = (ticker: string) => {
    setSelectedAnswer(ticker)
    setShowResult(true)

    const round = GAME_ROUNDS[currentRound]
    const isCorrect = round.correctTicker
      ? ticker === round.correctTicker
      : round.stocks.find(s => s.ticker === ticker)?.isUp

    if (isCorrect) {
      setGameScore(gameScore + 1)
    }

    setTimeout(() => {
      if (currentRound < GAME_ROUNDS.length - 1) {
        setCurrentRound(currentRound + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameComplete(true)
      }
    }, 1500)
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentRound(0)
    setGameScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameComplete(false)
  }

  // Chatbot handlers
  const handleFaqClick = (faq: typeof TICK_FAQ[0]) => {
    setChatMessages([
      ...chatMessages,
      { type: 'user', text: faq.question },
      { type: 'bot', text: faq.answer }
    ])
  }

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 lg:px-12 py-4 border-b" style={{ borderColor: '#1f3a5f' }}>
        <div className="h-12 lg:h-14 w-auto relative">
          <Image
            src="/images/tickr_wordmark.jpg"
            alt="TickR"
            width={160}
            height={48}
            priority
            className="h-12 lg:h-14 w-auto brightness-110"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="/dashboard/portfolio"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Log In
          </Link>
          <Link
            href="/dashboard/portfolio"
            className="px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-200"
            style={{ backgroundColor: '#0ea5e9' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section - PUNCHED UP for kids! */}
      <section className="relative z-10 py-16 md:py-24 lg:py-32 px-6 lg:px-12">
        {/* Super vibrant background gradients for kids section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main colorful orbs - much more prominent */}
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-400/30 via-green-500/20 to-transparent rounded-full blur-3xl -ml-48 -mb-48 animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/25 via-orange-400/15 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '6s' }}></div>
          {/* Extra pop - purple accent */}
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>

          {/* Animated floating particles - larger and more visible */}
          <div className="absolute top-20 left-20 w-3 h-3 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-40 right-32 w-4 h-4 rounded-full bg-emerald-400/60 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 rounded-full bg-yellow-400/60 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full bg-pink-400/60 animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 rounded-full bg-purple-400/60 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }}></div>
          <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-orange-400/50 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}></div>

          {/* Subtle grid overlay for tech feel */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div>
              {/* Trust badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <svg className="w-4 h-4" fill="#10b981" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium" style={{ color: '#10b981' }}>Safe for ages 12–16 · No real money</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-center">
                <span className="text-white">Stop </span>
                <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">Watching</span>
                <br />
                <span style={{ color: '#facc15' }}>Start </span>
                <span className="text-white">Playing</span>
              </h1>

              {/* Subheadline - inverted triangle centered layout */}
              <div className="text-xl mb-8 leading-relaxed space-y-1 text-center">
                <p>
                  <span style={{ color: '#00d4ff' }}>Trade real stocks.</span>
                  <span className="text-slate-500"> · </span>
                  <span style={{ color: '#00ff88' }}>Battle your friends.</span>
                </p>
                <p>
                  <span style={{ color: '#facc15' }}>Flex your portfolio.</span>
                  <span className="text-slate-500"> · </span>
                  <span className="text-slate-300">Level up IRL.</span>
                </p>
                <p>
                  <span className="text-slate-300">Main character energy for your money.</span>
                </p>
              </div>

              {/* Stock logos kids recognize - more vibrant */}
              <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
                <span className="text-slate-400 text-sm font-medium">Trade stocks you know:</span>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default" style={{ backgroundColor: 'rgba(14, 165, 233, 0.25)', color: '#38bdf8', border: '1px solid rgba(14, 165, 233, 0.4)' }}>Apple</span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default" style={{ backgroundColor: 'rgba(239, 68, 68, 0.25)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)' }}>Tesla</span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default" style={{ backgroundColor: 'rgba(139, 92, 246, 0.25)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.4)' }}>Roblox</span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default" style={{ backgroundColor: 'rgba(16, 185, 129, 0.25)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>Nike</span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default" style={{ backgroundColor: 'rgba(236, 72, 153, 0.25)', color: '#f472b6', border: '1px solid rgba(236, 72, 153, 0.4)' }}>Netflix</span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default" style={{ backgroundColor: 'rgba(99, 102, 241, 0.25)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.4)' }}>Disney</span>
                </div>
              </div>

              {/* CTA - Punched up with glow */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
                <Link
                  href="/dashboard/portfolio"
                  className="px-8 py-4 rounded-xl font-bold text-white text-center transition-all duration-300 text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                    boxShadow: '0 0 30px rgba(14, 165, 233, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(14, 165, 233, 0.6), 0 0 80px rgba(16, 185, 129, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  Start Learning Free 🚀
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-4 rounded-xl font-semibold text-white text-center transition-all duration-200"
                  style={{ backgroundColor: '#1a2847', border: '2px solid #1f3a5f' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#141e2f'
                    e.currentTarget.style.borderColor = '#0ea5e9'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a2847'
                    e.currentTarget.style.borderColor = '#1f3a5f'
                  }}
                >
                  See How It Works
                </Link>
              </div>

              <p className="text-sm text-slate-500 text-center">Free · No credit card required</p>
            </div>

            {/* Image Side - with vibrant glow */}
            <div className="relative h-72 sm:h-80 lg:h-[450px] rounded-2xl overflow-hidden" style={{ border: '2px solid rgba(14, 165, 233, 0.5)', boxShadow: '0 0 40px rgba(14, 165, 233, 0.2), 0 0 80px rgba(16, 185, 129, 0.1)' }}>
              <Image
                src="/images/header.jpg"
                alt="Learn investing with TickR"
                fill
                priority
                className="object-cover"
                quality={85}
              />
              {/* Subtle gradient overlay on image for brand feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Stats - first two - with glow */}
          <div className="mt-16 grid grid-cols-2 gap-8 max-w-md mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <div className="text-3xl lg:text-4xl font-display font-bold" style={{ color: '#10b981', textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>$10K</div>
              <div className="text-sm text-slate-400 mt-1">Practice funds</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl lg:text-4xl font-display font-bold" style={{ color: '#0ea5e9', textShadow: '0 0 20px rgba(14, 165, 233, 0.5)' }}>500+</div>
              <div className="text-sm text-slate-400 mt-1">Real stocks</div>
            </div>
          </div>

          {/* Level Progression Path - Rookie to Legend */}
          <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(139, 92, 246, 0.3)', boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)' }}>
            <div className="text-center mb-4">
              <span className="text-sm font-semibold text-slate-400">YOUR JOURNEY</span>
            </div>
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
              {/* Level 1 - Rookie */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-transform hover:scale-110" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)', border: '2px solid #64748b' }}>
                  🥉
                </div>
                <span className="text-xs font-medium text-slate-400">Rookie</span>
              </div>

              {/* Connector */}
              <div className="flex-1 h-0.5 min-w-[20px]" style={{ background: 'linear-gradient(90deg, #64748b, #0ea5e9)' }}></div>

              {/* Level 2 - Starter */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-transform hover:scale-110" style={{ backgroundColor: 'rgba(14, 165, 233, 0.2)', border: '2px solid #0ea5e9' }}>
                  📈
                </div>
                <span className="text-xs font-medium" style={{ color: '#0ea5e9' }}>Starter</span>
              </div>

              {/* Connector */}
              <div className="flex-1 h-0.5 min-w-[20px]" style={{ background: 'linear-gradient(90deg, #0ea5e9, #10b981)' }}></div>

              {/* Level 3 - Trader */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-transform hover:scale-110" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981' }}>
                  💹
                </div>
                <span className="text-xs font-medium" style={{ color: '#10b981' }}>Trader</span>
              </div>

              {/* Connector */}
              <div className="flex-1 h-0.5 min-w-[20px]" style={{ background: 'linear-gradient(90deg, #10b981, #facc15)' }}></div>

              {/* Level 4 - Investor */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-transform hover:scale-110" style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', border: '2px solid #facc15' }}>
                  💰
                </div>
                <span className="text-xs font-medium" style={{ color: '#facc15' }}>Investor</span>
              </div>

              {/* Connector */}
              <div className="flex-1 h-0.5 min-w-[20px]" style={{ background: 'linear-gradient(90deg, #facc15, #f97316)' }}></div>

              {/* Level 5 - Pro */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-transform hover:scale-110" style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)', border: '2px solid #f97316' }}>
                  🏆
                </div>
                <span className="text-xs font-medium" style={{ color: '#f97316' }}>Pro</span>
              </div>

              {/* Connector */}
              <div className="flex-1 h-0.5 min-w-[20px]" style={{ background: 'linear-gradient(90deg, #f97316, #ec4899)' }}></div>

              {/* Level 6 - Expert */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 transition-transform hover:scale-110" style={{ backgroundColor: 'rgba(236, 72, 153, 0.2)', border: '2px solid #ec4899' }}>
                  👑
                </div>
                <span className="text-xs font-medium" style={{ color: '#ec4899' }}>Expert</span>
              </div>

              {/* Connector */}
              <div className="flex-1 h-0.5 min-w-[20px]" style={{ background: 'linear-gradient(90deg, #ec4899, #a855f7)' }}></div>

              {/* Level 7 - Legend */}
              <div className="flex flex-col items-center min-w-[60px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 animate-pulse transition-transform hover:scale-110" style={{ backgroundColor: 'rgba(168, 85, 247, 0.3)', border: '2px solid #a855f7', boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
                  💎
                </div>
                <span className="text-xs font-bold" style={{ color: '#a855f7' }}>Legend</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="text-xs text-slate-500">Level up by learning & making smart trades</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Punched up for kids */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 lg:px-12 border-t" style={{ borderColor: '#1f3a5f' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">How It Works</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Get started in minutes with a simple, safe process.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(14, 165, 233, 0.2)', border: '2px solid #0ea5e9', color: '#0ea5e9', boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' }}>
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Create Account</h3>
              <p className="text-slate-400 text-sm">Sign up free in 30 seconds. No credit card needed.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', color: '#10b981', boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Get $10K Practice Money</h3>
              <p className="text-slate-400 text-sm">Receive virtual funds instantly to start learning.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', border: '2px solid #facc15', color: '#facc15', boxShadow: '0 0 20px rgba(250, 204, 21, 0.3)' }}>
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Trade & Learn</h3>
              <p className="text-slate-400 text-sm">Buy real stocks, track your portfolio, understand markets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your First Stock - Interactive Teaser - Vibrant! */}
      <section className="relative z-10 py-16 px-6 lg:px-12 border-t overflow-hidden" style={{ borderColor: '#1f3a5f' }}>
        {/* Punched up animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-400/20 via-green-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-yellow-400/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <span className="text-lg">🎯</span>
              <span className="text-sm font-semibold" style={{ color: '#10b981' }}>QUICK START</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Which Company Would You Invest In First?</h2>
            <p className="text-slate-400">Pick a brand you love. Tap to sign up and start building your portfolio.</p>
          </div>

          {/* Interactive Stock Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Apple */}
            <Link
              href="/dashboard/portfolio"
              className="group p-5 rounded-xl text-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0ea5e9'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f3a5f'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)' }}>
                🍎
              </div>
              <div className="font-semibold text-white text-sm mb-1">Apple</div>
              <div className="text-xs text-slate-500">AAPL</div>
            </Link>

            {/* Nike */}
            <Link
              href="/dashboard/portfolio"
              className="group p-5 rounded-xl text-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f97316'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f3a5f'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)' }}>
                👟
              </div>
              <div className="font-semibold text-white text-sm mb-1">Nike</div>
              <div className="text-xs text-slate-500">NKE</div>
            </Link>

            {/* Disney */}
            <Link
              href="/dashboard/portfolio"
              className="group p-5 rounded-xl text-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f3a5f'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                🏰
              </div>
              <div className="font-semibold text-white text-sm mb-1">Disney</div>
              <div className="text-xs text-slate-500">DIS</div>
            </Link>

            {/* Tesla */}
            <Link
              href="/dashboard/portfolio"
              className="group p-5 rounded-xl text-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ef4444'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f3a5f'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}>
                🚗
              </div>
              <div className="font-semibold text-white text-sm mb-1">Tesla</div>
              <div className="text-xs text-slate-500">TSLA</div>
            </Link>

            {/* Roblox */}
            <Link
              href="/dashboard/portfolio"
              className="group p-5 rounded-xl text-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f3a5f'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                🎮
              </div>
              <div className="font-semibold text-white text-sm mb-1">Roblox</div>
              <div className="text-xs text-slate-500">RBLX</div>
            </Link>

            {/* McDonald's */}
            <Link
              href="/dashboard/portfolio"
              className="group p-5 rounded-xl text-center transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#facc15'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(250, 204, 21, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f3a5f'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(250, 204, 21, 0.15)' }}>
                🍟
              </div>
              <div className="font-semibold text-white text-sm mb-1">McDonald's</div>
              <div className="text-xs text-slate-500">MCD</div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">+ 500 more stocks to explore after you sign up</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 border-t" style={{ borderColor: '#1f3a5f' }}>
        {/* Feature 1 */}
        <div className="py-20 px-6 lg:px-12 border-b" style={{ borderColor: '#1f3a5f' }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-80 lg:h-[350px] order-2 lg:order-1">
              <Image src="/images/stockup.png" alt="Daily practice" fill className="object-contain" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Daily Practice
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Build consistent habits with daily challenges that reinforce key concepts. Small steps lead to real understanding.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="py-20 px-6 lg:px-12 border-b" style={{ borderColor: '#1f3a5f' }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-80 lg:h-[350px]">
              <Image src="/images/levelup.png" alt="Progressive learning" fill className="object-contain" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Progressive Learning
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Advance through 7 levels as you master new concepts. Each level unlocks deeper market insights and tools.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-80 lg:h-[350px] order-2 lg:order-1">
              <Image src="/images/leader.jpg" alt="Track progress" fill className="object-contain" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Track Your Progress
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                See how your portfolio performs over time. Compare with friends in a friendly, educational environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Friends Are Playing - Battle/Competition Section */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-t overflow-hidden" style={{ borderColor: '#1f3a5f' }}>
        {/* Vibrant background for this section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <span className="text-lg">⚔️</span>
              <span className="text-sm font-semibold" style={{ color: '#a78bfa' }}>MULTIPLAYER MODE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Your Friends Are Already Playing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Challenge your squad to beat your returns. Create private leagues, talk trash, and prove who's the real investing genius.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Leaderboard Mockup */}
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#0a1628', border: '1px solid #1f3a5f' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏆</span>
                  <span className="font-bold text-white">Weekly Leaderboard</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>LIVE</span>
              </div>

              {/* Leaderboard entries */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(250, 204, 21, 0.1)', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥇</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(139, 92, 246, 0.3)' }}>🎮</div>
                    <div>
                      <div className="font-semibold text-white text-sm">xX_StockLord_Xx</div>
                      <div className="text-xs text-slate-500">Level 6 · 🔥 12 day streak</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: '#10b981' }}>+18.4%</div>
                    <div className="text-xs text-slate-500">$11,840</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(192, 192, 192, 0.05)', border: '1px solid rgba(192, 192, 192, 0.2)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥈</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(236, 72, 153, 0.3)' }}>💅</div>
                    <div>
                      <div className="font-semibold text-white text-sm">TeslaQueen2012</div>
                      <div className="text-xs text-slate-500">Level 5 · TSLA fan</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: '#10b981' }}>+15.2%</div>
                    <div className="text-xs text-slate-500">$11,520</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'rgba(205, 127, 50, 0.05)', border: '1px solid rgba(205, 127, 50, 0.2)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥉</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(14, 165, 233, 0.3)' }}>🏀</div>
                    <div>
                      <div className="font-semibold text-white text-sm">BallIsLife_Trader</div>
                      <div className="text-xs text-slate-500">Level 4 · Sports stocks</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: '#10b981' }}>+12.8%</div>
                    <div className="text-xs text-slate-500">$11,280</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#141e2f' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-slate-500">4</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(16, 185, 129, 0.3)' }}>🎯</div>
                    <div>
                      <div className="font-semibold text-white text-sm">DiamondHands_Kid</div>
                      <div className="text-xs text-slate-500">Level 3 · New challenger</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: '#10b981' }}>+9.5%</div>
                    <div className="text-xs text-slate-500">$10,950</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#141e2f' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-slate-500">5</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(250, 204, 21, 0.3)' }}>🍕</div>
                    <div>
                      <div className="font-semibold text-white text-sm">PizzaStocks4Life</div>
                      <div className="text-xs text-slate-500">Level 2 · DPZ investor</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold" style={{ color: '#10b981' }}>+7.2%</div>
                    <div className="text-xs text-slate-500">$10,720</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Updates every hour</span>
                <span className="text-xs" style={{ color: '#0ea5e9' }}>View full leaderboard →</span>
              </div>
            </div>

            {/* Battle Features */}
            <div className="space-y-6">
              <div className="p-5 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>⚔️</div>
                  <div>
                    <h3 className="font-bold text-white mb-1">1v1 Portfolio Battles</h3>
                    <p className="text-slate-400 text-sm">Challenge a friend head-to-head. Best returns over 7 days wins bragging rights.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>👥</div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Private Leagues</h3>
                    <p className="text-slate-400 text-sm">Create a league with your squad. Invite up to 20 friends and compete all semester.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)' }}>🏅</div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Weekly Tournaments</h3>
                    <p className="text-slate-400 text-sm">Global competitions every week. Top performers earn exclusive badges and rewards.</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(14, 165, 233, 0.2)' }}>💬</div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Friendly Trash Talk</h3>
                    <p className="text-slate-400 text-sm">React to your friends' trades. Send GIFs when they're down. Celebrate their wins too.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA for battle mode */}
          <div className="mt-12 text-center">
            <Link
              href="/dashboard/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200"
              style={{ backgroundColor: '#8b5cf6' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
            >
              <span>Start a Battle</span>
              <span>⚔️</span>
            </Link>
            <p className="text-xs text-slate-500 mt-3">Invite friends after you sign up</p>
          </div>
        </div>
      </section>

      {/* Try Before You Sign Up - Demo Portfolio Simulator */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-t overflow-hidden" style={{ borderColor: '#1f3a5f' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-cyan-500/15 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
              <span className="text-lg">🎯</span>
              <span className="text-sm font-semibold" style={{ color: '#0ea5e9' }}>NO SIGNUP REQUIRED</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Try Before You Sign Up</h2>
            <p className="text-slate-400">Pick 3 stocks below and see what would&apos;ve happened this week. No signup needed!</p>
          </div>

          {!showDemoResults ? (
            <>
              {/* Stock Selection Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {DEMO_STOCKS.map((stock) => {
                  const isSelected = selectedDemoStocks.includes(stock.ticker)
                  return (
                    <button
                      key={stock.ticker}
                      onClick={() => toggleDemoStock(stock.ticker)}
                      className={`p-5 rounded-2xl text-left transition-all duration-300 ${
                        isSelected ? 'scale-105' : 'hover:scale-102'
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${stock.color}20` : '#141e2f',
                        border: isSelected ? `2px solid ${stock.color}` : '1px solid #1f3a5f',
                        boxShadow: isSelected ? `0 0 30px ${stock.color}30` : 'none'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{stock.emoji}</span>
                        <div>
                          <div className="font-bold text-white">{stock.ticker}</div>
                          <div className="text-sm text-slate-400">{stock.name}</div>
                        </div>
                        {isSelected && (
                          <div className="ml-auto w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: stock.color }}>
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-slate-500">${stock.price.toFixed(2)}</div>
                    </button>
                  )
                })}
              </div>

              {/* Selection Status */}
              <div className="text-center">
                <p className="text-slate-400 mb-4">
                  {selectedDemoStocks.length === 0 && "Select 3 stocks to build your demo portfolio"}
                  {selectedDemoStocks.length === 1 && "Great pick! Select 2 more stocks"}
                  {selectedDemoStocks.length === 2 && "Almost there! Select 1 more stock"}
                  {selectedDemoStocks.length === 3 && "Perfect! Ready to see your results?"}
                </p>
                <button
                  onClick={() => setShowDemoResults(true)}
                  disabled={selectedDemoStocks.length !== 3}
                  className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: selectedDemoStocks.length === 3 ? 'linear-gradient(135deg, #10b981, #0ea5e9)' : '#1f3a5f',
                    boxShadow: selectedDemoStocks.length === 3 ? '0 0 30px rgba(16, 185, 129, 0.4)' : 'none'
                  }}
                >
                  See My Results 📊
                </button>
              </div>
            </>
          ) : (
            /* Results View */
            <div className="text-center">
              <div className="p-8 rounded-3xl mb-6" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
                <div className="text-6xl mb-4">{calculateDemoReturn() >= 0 ? '📈' : '📉'}</div>
                <div className="text-5xl font-display font-bold mb-2" style={{ color: calculateDemoReturn() >= 0 ? '#10b981' : '#ef4444' }}>
                  {calculateDemoReturn() >= 0 ? '+' : ''}{calculateDemoReturn().toFixed(1)}%
                </div>
                <p className="text-slate-400 mb-6">Your demo portfolio this week</p>

                <div className="flex justify-center gap-4 mb-6">
                  {selectedDemoStocks.map(ticker => {
                    const stock = DEMO_STOCKS.find(s => s.ticker === ticker)!
                    return (
                      <div key={ticker} className="px-4 py-2 rounded-xl" style={{ backgroundColor: `${stock.color}20`, border: `1px solid ${stock.color}40` }}>
                        <span className="mr-2">{stock.emoji}</span>
                        <span className="font-semibold">{stock.ticker}</span>
                        <span className={`ml-2 ${stock.weekChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stock.weekChange >= 0 ? '+' : ''}{stock.weekChange}%
                        </span>
                      </div>
                    )
                  })}
                </div>

                <p className="text-slate-300">
                  {calculateDemoReturn() >= 3 && "🔥 You've got great instincts! Imagine what you could do with $10K..."}
                  {calculateDemoReturn() >= 0 && calculateDemoReturn() < 3 && "👍 Solid picks! Ready to learn more strategies?"}
                  {calculateDemoReturn() < 0 && "💡 Markets go up and down - that's why learning matters!"}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => { setShowDemoResults(false); setSelectedDemoStocks([]) }}
                  className="px-6 py-3 rounded-xl font-semibold transition-all"
                  style={{ backgroundColor: '#1f3a5f', border: '1px solid #2d4a6f' }}
                >
                  Try Again
                </button>
                <Link
                  href="/dashboard/portfolio"
                  className="px-6 py-3 rounded-xl font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}
                >
                  Start With Real $10K →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Beat the Market Mini-Game */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-t overflow-hidden" style={{ borderColor: '#1f3a5f' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-yellow-500/15 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-l from-purple-500/15 to-transparent rounded-full blur-3xl -translate-y-1/2"></div>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(250, 204, 21, 0.15)', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
              <span className="text-lg">🎮</span>
              <span className="text-sm font-semibold" style={{ color: '#facc15' }}>30-SECOND CHALLENGE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Beat the Market</h2>
            <p className="text-slate-400">Can you pick the winning stocks? Test your instincts!</p>
          </div>

          <div className="p-8 rounded-3xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
            {!gameStarted && !gameComplete ? (
              /* Game Start */
              <div className="text-center">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Play?</h3>
                <p className="text-slate-400 mb-6">3 quick rounds. Pick the stock that went up. No luck - just smarts!</p>
                <button
                  onClick={() => setGameStarted(true)}
                  className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #facc15, #f59e0b)', color: '#000' }}
                >
                  Start Game 🚀
                </button>
              </div>
            ) : gameComplete ? (
              /* Game Complete */
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {gameScore === 3 ? '🏆' : gameScore === 2 ? '🥈' : gameScore === 1 ? '🥉' : '📚'}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {gameScore === 3 ? 'Perfect Score!' : gameScore === 2 ? 'Great Job!' : gameScore === 1 ? 'Good Try!' : 'Keep Learning!'}
                </h3>
                <p className="text-5xl font-display font-bold mb-4" style={{ color: '#facc15' }}>
                  {gameScore}/3
                </p>
                <p className="text-slate-400 mb-6">
                  {gameScore === 3 && "You're a natural! Ready to put those skills to work?"}
                  {gameScore === 2 && "Solid instincts! With practice, you'll be a pro."}
                  {gameScore <= 1 && "Investing is about learning, not luck. Let's get you started!"}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 rounded-xl font-semibold transition-all"
                    style={{ backgroundColor: '#1f3a5f', border: '1px solid #2d4a6f' }}
                  >
                    Play Again
                  </button>
                  <Link
                    href="/dashboard/portfolio"
                    className="px-6 py-3 rounded-xl font-bold transition-all"
                    style={{ background: 'linear-gradient(135deg, #facc15, #f59e0b)', color: '#000' }}
                  >
                    Start Learning →
                  </Link>
                </div>
              </div>
            ) : (
              /* Game Round */
              <div>
                {/* Progress */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400">Round {currentRound + 1}/3</span>
                  <span className="font-bold" style={{ color: '#facc15' }}>Score: {gameScore}</span>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold text-white text-center mb-2">{GAME_ROUNDS[currentRound].question}</h3>
                <p className="text-slate-500 text-sm text-center mb-6">💡 Hint: {GAME_ROUNDS[currentRound].hint}</p>

                {/* Stock Options */}
                <div className="space-y-3">
                  {GAME_ROUNDS[currentRound].stocks.map((stock) => {
                    const isSelected = selectedAnswer === stock.ticker
                    const showCorrect = showResult && (GAME_ROUNDS[currentRound].correctTicker ? stock.ticker === GAME_ROUNDS[currentRound].correctTicker : stock.isUp)
                    const showWrong = showResult && isSelected && !showCorrect

                    return (
                      <button
                        key={stock.ticker}
                        onClick={() => !showResult && handleGameAnswer(stock.ticker)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          showCorrect ? 'bg-emerald-500/20 border-emerald-500' :
                          showWrong ? 'bg-red-500/20 border-red-500' :
                          isSelected ? 'border-yellow-500' : 'border-slate-600 hover:border-slate-400'
                        }`}
                        style={{ border: '2px solid' }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-white">{stock.ticker}</span>
                            <span className="text-slate-400 ml-2">{stock.name}</span>
                          </div>
                          {showResult && (
                            <span className={stock.change >= 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                              {stock.change >= 0 ? '+' : ''}{stock.change}%
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* For Parents - kept more muted */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-t" style={{ borderColor: '#1f3a5f' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">Built for Safety & Real Learning</h2>
          <p className="text-slate-400 text-center mb-12">Designed with parents and educators in mind.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                <svg className="w-6 h-6" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">100% Safe</h3>
              <p className="text-slate-400 text-sm">No real money involved. Kids never link a bank account or credit card.</p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)' }}>
                <svg className="w-6 h-6" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Real Learning</h3>
              <p className="text-slate-400 text-sm">Real companies, real prices, real market concepts. Practical financial literacy.</p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <svg className="w-6 h-6" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Parent Visibility</h3>
              <p className="text-slate-400 text-sm">Dashboard to monitor progress, activity, and what your child is learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-t" style={{ borderColor: '#1f3a5f' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">Real Students, Real Gains</h2>
          <p className="text-slate-400 text-center mb-12">See what other teens are saying about TickR</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Jake - Gamer */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                  <span>🎮</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Jake</div>
                  <div className="text-xs text-slate-500">15 · Gamer · Level 4</div>
                </div>
              </div>
              <p className="text-slate-300 mb-3">"Bought RBLX and EA stocks because I actually know what those companies do. Up 12% in my first month no cap 🚀"</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>+$1,247</span>
                <span className="text-xs text-slate-500">portfolio gain</span>
              </div>
            </div>

            {/* Maya - Creator */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(236, 72, 153, 0.2)' }}>
                  <span>🎨</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Maya</div>
                  <div className="text-xs text-slate-500">13 · Artist · Level 3</div>
                </div>
              </div>
              <p className="text-slate-300 mb-3">"Finally understand why adults talk about the stock market. Invested in Adobe and Spotify because I use them every day!"</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9' }}>Level 3</span>
                <span className="text-xs text-slate-500">in 2 weeks</span>
              </div>
            </div>

            {/* Casey - Athlete */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <span>⚽</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Casey</div>
                  <div className="text-xs text-slate-500">14 · Soccer · Level 5</div>
                </div>
              </div>
              <p className="text-slate-300 mb-3">"My dad was shook when I explained P/E ratios to him. Now we talk stocks at dinner. Lowkey bonding moment fr"</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(250, 204, 21, 0.15)', color: '#facc15' }}>Top 10%</span>
                <span className="text-xs text-slate-500">leaderboard</span>
              </div>
            </div>
          </div>

          {/* Additional social proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span style={{ color: '#10b981' }}>★★★★★</span>
              <span>4.9/5 from 2,400+ students</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📈</span>
              <span>87% improve financial literacy</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏆</span>
              <span>Used in 150+ schools</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-t" style={{ borderColor: '#1f3a5f' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to build your empire?</h2>
          <p className="text-slate-400 mb-8">Your $10K is waiting. Start making moves today.</p>
          <Link
            href="/dashboard/portfolio"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 text-lg"
            style={{ backgroundColor: '#0ea5e9' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
          >
            Claim Your $10K 🚀
          </Link>
          <p className="text-sm text-slate-500 mt-4">Free forever · No credit card · Takes 30 seconds</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 lg:px-12 border-t" style={{ borderColor: '#1f3a5f' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">© 2026 TickR. A safe learning environment for ages 12–16.</div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Tick Chatbot Greeter - Floating Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {chatOpen && (
          <div
            className="absolute bottom-20 right-0 w-80 rounded-2xl overflow-hidden shadow-2xl mb-2"
            style={{
              backgroundColor: '#0a1628',
              border: '1px solid #1f3a5f',
              boxShadow: '0 0 40px rgba(14, 165, 233, 0.2)'
            }}
          >
            {/* Chat Header */}
            <div className="p-4 flex items-center gap-3" style={{ backgroundColor: '#141e2f', borderBottom: '1px solid #1f3a5f' }}>
              <Image
                src="/images/tickr_mascot.jpg"
                alt="Tick"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="font-bold text-white">Tick</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Your investing buddy
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-full hover:bg-slate-700 transition-colors"
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 max-h-48 overflow-y-auto space-y-3">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/tickr_mascot.jpg"
                        alt="Tick"
                        width={32}
                        height={32}
                      />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                      message.type === 'user'
                        ? 'rounded-tr-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'rounded-tl-sm text-white'
                    }`}
                    style={message.type === 'bot' ? { backgroundColor: '#1a2847' } : {}}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Questions */}
            <div className="p-3 space-y-2 max-h-40 overflow-y-auto" style={{ backgroundColor: '#141e2f', borderTop: '1px solid #1f3a5f' }}>
              <div className="text-xs text-slate-500 mb-2 font-medium">Tap a question:</div>
              <div className="flex flex-wrap gap-2">
                {TICK_FAQ.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFaqClick(faq)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(14, 165, 233, 0.15)',
                      border: '1px solid rgba(14, 165, 233, 0.3)',
                      color: '#38bdf8'
                    }}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:scale-110"
          style={{
            border: '3px solid #0ea5e9',
            boxShadow: chatOpen ? '0 0 20px rgba(14, 165, 233, 0.5)' : '0 0 30px rgba(14, 165, 233, 0.3), 0 4px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Image
            src="/images/tickr_mascot.jpg"
            alt="Chat with Tick"
            fill
            className="object-cover"
          />
          {/* Notification Badge */}
          {!chatOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white animate-bounce">
              1
            </div>
          )}
        </button>

        {/* Greeting tooltip */}
        {!chatOpen && (
          <div
            className="absolute bottom-20 right-0 px-4 py-2 rounded-xl text-sm whitespace-nowrap animate-pulse"
            style={{
              backgroundColor: '#141e2f',
              border: '1px solid #0ea5e9',
              boxShadow: '0 0 20px rgba(14, 165, 233, 0.2)'
            }}
          >
            <span className="text-white">Hey! Got questions?</span>
            <span className="ml-1">👋</span>
            {/* Arrow */}
            <div
              className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
              style={{ backgroundColor: '#141e2f', borderRight: '1px solid #0ea5e9', borderBottom: '1px solid #0ea5e9' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
