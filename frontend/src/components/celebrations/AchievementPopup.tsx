'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface AchievementPopupProps {
  title: string
  description: string
  icon: string
  xp: number
  onDismiss: () => void
}

// Simple confetti particle
function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        left: `${Math.random() * 100}%`,
        top: '-10px',
        animation: `confetti-fall 2s ease-out ${delay}ms forwards`,
      }}
    />
  )
}

export function AchievementPopup({ title, description, icon, xp, onDismiss }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger animations
    requestAnimationFrame(() => {
      setIsVisible(true)
      setShowConfetti(true)
    })

    // Auto dismiss after 5 seconds
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const confettiColors = ['#fb923c', '#f97316', '#facc15', '#2dd4bf', '#a78bfa', '#f472b6']

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
            w-full max-w-sm p-6 rounded-3xl
            bg-navy-800 border border-gold-500/30
            shadow-2xl
            transition-all duration-500 ease-out
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'}
          `}
          style={{
            boxShadow: '0 0 60px rgba(250, 204, 21, 0.2), 0 0 100px rgba(249, 115, 22, 0.1)',
          }}
        >
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <ConfettiParticle
                  key={i}
                  delay={i * 50}
                  color={confettiColors[i % confettiColors.length]}
                />
              ))}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-cream-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative text-center">
            {/* Badge icon */}
            <div
              className={`
                w-24 h-24 mx-auto mb-4 rounded-2xl
                flex items-center justify-center text-5xl
                transition-transform duration-700 ease-out
                ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
              `}
              style={{
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(249, 115, 22, 0.2))',
                boxShadow: '0 0 30px rgba(250, 204, 21, 0.3)',
              }}
            >
              {icon}
            </div>

            {/* Title */}
            <div className="mb-1">
              <span className="text-xs font-display font-semibold text-gold-400 uppercase tracking-wider">
                Achievement Unlocked
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-cream-100 mb-2">
              {title}
            </h2>
            <p className="text-slate-400 mb-4">
              {description}
            </p>

            {/* XP Reward */}
            <div
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-orange-500/20 border border-orange-500/30
                transition-all duration-500 delay-300
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <span className="text-orange-400 font-display font-bold">+{xp} XP</span>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className="w-full mt-6 px-6 py-3 rounded-xl font-display font-bold text-navy-900 bg-gradient-to-r from-gold-400 to-orange-400 hover:from-gold-300 hover:to-orange-300 transition-all"
          >
            Awesome!
          </button>
        </div>
      </div>

      {/* Confetti animation keyframes */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(400px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
