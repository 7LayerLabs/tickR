'use client'

import {
  PortfolioIcon,
  LearnIcon,
  TrophyIcon,
  TradeIcon,
  LeaderboardIcon,
  WalletIcon,
  StockIcon,
  SafetyIcon,
  GoalIcon,
  RocketIcon,
  NewsIcon,
  StrategyIcon,
} from '@/components/icons/TickRIcons'

export default function IconsDemo() {
  const icons = [
    { name: 'Portfolio', Icon: PortfolioIcon, description: 'Track your investments' },
    { name: 'Learn', Icon: LearnIcon, description: 'Educational content' },
    { name: 'Trophy', Icon: TrophyIcon, description: 'Achievements & rewards' },
    { name: 'Trade', Icon: TradeIcon, description: 'Buy & sell stocks' },
    { name: 'Leaderboard', Icon: LeaderboardIcon, description: 'Compete with friends' },
    { name: 'Wallet', Icon: WalletIcon, description: 'Your balance' },
    { name: 'Stock', Icon: StockIcon, description: 'Market data' },
    { name: 'Safety', Icon: SafetyIcon, description: 'Secure & protected' },
    { name: 'Goal', Icon: GoalIcon, description: 'Set targets' },
    { name: 'Rocket', Icon: RocketIcon, description: 'Level up' },
    { name: 'News', Icon: NewsIcon, description: 'Market updates' },
    { name: 'Strategy', Icon: StrategyIcon, description: 'Smart thinking' },
  ]

  return (
    <div className="min-h-screen bg-navy-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            TickR <span className="display-accent">Icon Set</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Glossy 3D icons with warm orange/cream aesthetic
          </p>
        </div>

        {/* Icon Grid - Large */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Large (80px)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {icons.map(({ name, Icon, description }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-navy-800/50 border border-white/5 hover:border-orange-500/30 transition-all hover:-translate-y-1"
              >
                <Icon size={80} />
                <div className="text-center">
                  <div className="font-display font-semibold text-cream-100">{name}</div>
                  <div className="text-xs text-slate-500 mt-1">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Icon Grid - Medium */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Medium (56px)</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {icons.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-3 p-4"
              >
                <Icon size={56} />
                <div className="text-sm text-slate-400">{name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Icon Grid - Small */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Small (40px)</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {icons.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800 border border-white/10"
              >
                <Icon size={40} />
                <span className="text-sm text-slate-300">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Example - Feature Cards */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Usage: Feature Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-elevated p-6">
              <PortfolioIcon size={64} className="mb-4" />
              <h3 className="font-display font-bold text-xl mb-2">Track Portfolio</h3>
              <p className="text-slate-400">Monitor your investments in real-time with live market data.</p>
            </div>
            <div className="card-elevated p-6">
              <LearnIcon size={64} className="mb-4" />
              <h3 className="font-display font-bold text-xl mb-2">Learn & Grow</h3>
              <p className="text-slate-400">Master investing concepts through interactive lessons.</p>
            </div>
            <div className="card-elevated p-6">
              <TrophyIcon size={64} className="mb-4" />
              <h3 className="font-display font-bold text-xl mb-2">Earn Rewards</h3>
              <p className="text-slate-400">Complete challenges and climb the leaderboard.</p>
            </div>
          </div>
        </div>

        {/* Usage Example - Stats Row */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Usage: Stats Row</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-navy-800 border border-white/10">
              <WalletIcon size={48} />
              <div>
                <div className="text-2xl font-display font-bold gradient-text">$10,000</div>
                <div className="text-sm text-slate-500">Available Cash</div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-navy-800 border border-white/10">
              <StockIcon size={48} />
              <div>
                <div className="text-2xl font-display font-bold text-teal-400">12</div>
                <div className="text-sm text-slate-500">Positions</div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-navy-800 border border-white/10">
              <RocketIcon size={48} />
              <div>
                <div className="text-2xl font-display font-bold text-gold-400">Level 3</div>
                <div className="text-sm text-slate-500">Trader</div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Example - Navigation */}
        <div>
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Usage: Navigation</h2>
          <div className="max-w-md mx-auto">
            <div className="flex justify-around p-4 rounded-2xl bg-navy-800 border border-white/10">
              <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <PortfolioIcon size={32} />
                <span className="text-xs text-orange-400">Portfolio</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <TradeIcon size={32} />
                <span className="text-xs text-slate-400">Trade</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <LearnIcon size={32} />
                <span className="text-xs text-slate-400">Learn</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <LeaderboardIcon size={32} />
                <span className="text-xs text-slate-400">Compete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
