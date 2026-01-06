'use client'

import { useEffect, useState } from 'react'
import { Rocket, TrendingUp, X } from 'lucide-react'

interface FirstTradePopupProps {
  ticker: string
  shares: number
  xp: number
  onDismiss: () => void
}

export function FirstTradePopup({ ticker, shares, xp, onDismiss }: FirstTradePopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onDismiss}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`
            relative pointer-events-auto
            w-full max-w-sm p-6 rounded-3xl text-center
            bg-navy-800 border border-teal-500/30
            shadow-2xl
            transition-all duration-500 ease-out
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'}
          `}
          style={{
            boxShadow: '0 0 60px rgba(45, 212, 191, 0.3), 0 0 100px rgba(20, 184, 166, 0.15)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-cream-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Rocket icon */}
          <div
            className={`
              w-24 h-24 mx-auto mb-4 rounded-2xl
              flex items-center justify-center
              transition-all duration-700 ease-out
              ${isVisible ? 'scale-100 translate-y-0' : 'scale-0 translate-y-8'}
            `}
            style={{
              background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.3), rgba(20, 184, 166, 0.3))',
              boxShadow: '0 0 30px rgba(45, 212, 191, 0.4)',
            }}
          >
            <Rocket className="w-12 h-12 text-teal-400" />
          </div>

          {/* Title */}
          <div className="text-xs font-display font-semibold text-teal-400 uppercase tracking-wider mb-1">
            Congratulations!
          </div>
          <h2 className="text-3xl font-display font-bold text-cream-100 mb-2">
            First Trade!
          </h2>

          {/* Trade details */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <span className="text-lg text-slate-300">
              You now own <span className="font-bold text-cream-100">{shares}</span> share{shares > 1 ? 's' : ''} of{' '}
              <span className="font-bold text-teal-400">{ticker}</span>!
            </span>
          </div>

          <p className="text-slate-400 mb-6">
            Your investing journey has officially begun. Keep learning and trading to build your portfolio!
          </p>

          {/* XP Reward */}
          <div
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
              bg-orange-500/20 border border-orange-500/30
              transition-all duration-500 delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <span className="text-orange-400 font-display font-bold">+{xp} XP</span>
          </div>

          {/* Button */}
          <button
            onClick={onDismiss}
            className="w-full px-6 py-3 rounded-xl font-display font-bold text-navy-900 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 transition-all"
          >
            Let's Go!
          </button>
        </div>
      </div>
    </>
  )
}
