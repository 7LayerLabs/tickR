'use client'

import { useEffect, useState } from 'react'
import { Star, Sparkles, ChevronRight } from 'lucide-react'

interface LevelUpScreenProps {
  level: number
  levelTitle: string
  previousLevel: number
  onDismiss: () => void
}

export function LevelUpScreen({ level, levelTitle, previousLevel, onDismiss }: LevelUpScreenProps) {
  const [stage, setStage] = useState(0) // 0: entering, 1: showing old, 2: transitioning, 3: showing new, 4: complete

  useEffect(() => {
    // Animation sequence
    const timers = [
      setTimeout(() => setStage(1), 100),    // Show old level
      setTimeout(() => setStage(2), 1000),   // Start transition
      setTimeout(() => setStage(3), 1500),   // Show new level
      setTimeout(() => setStage(4), 2500),   // Show complete state
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  // Generate floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    size: 4 + Math.random() * 8,
  }))

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Animated background */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500
          ${stage >= 1 ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(250, 204, 21, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 20%, rgba(45, 212, 191, 0.1) 0%, transparent 40%),
            linear-gradient(180deg, #0a0f1a 0%, #0d1321 100%)
          `,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gold-400/30"
            style={{
              left: `${p.left}%`,
              bottom: '-20px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-up ${p.duration}s ease-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        {/* Stars decoration */}
        <div
          className={`
            flex justify-center gap-4 mb-6
            transition-all duration-500 delay-200
            ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
        >
          <Star className="w-8 h-8 text-gold-400" fill="#facc15" />
          <Sparkles className="w-10 h-10 text-orange-400" />
          <Star className="w-8 h-8 text-gold-400" fill="#facc15" />
        </div>

        {/* LEVEL UP text */}
        <div
          className={`
            mb-8 transition-all duration-700
            ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}
        >
          <h1
            className="text-5xl md:text-7xl font-display font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #facc15, #fb923c, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(250, 204, 21, 0.5))',
            }}
          >
            LEVEL UP!
          </h1>
        </div>

        {/* Level number transition */}
        <div className="relative h-40 mb-6">
          {/* Old level (fading out) */}
          <div
            className={`
              absolute inset-0 flex items-center justify-center
              transition-all duration-500
              ${stage >= 2 ? 'opacity-0 scale-75 blur-sm' : 'opacity-100 scale-100'}
            `}
          >
            <div
              className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl font-display font-black text-slate-400"
              style={{
                background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.2), rgba(71, 85, 105, 0.2))',
                border: '2px solid rgba(100, 116, 139, 0.3)',
              }}
            >
              {previousLevel}
            </div>
          </div>

          {/* New level (scaling in) */}
          <div
            className={`
              absolute inset-0 flex items-center justify-center
              transition-all duration-700 ease-out
              ${stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}
            `}
          >
            <div
              className="w-36 h-36 rounded-3xl flex items-center justify-center text-7xl font-display font-black"
              style={{
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.3), rgba(249, 115, 22, 0.3))',
                border: '3px solid rgba(250, 204, 21, 0.6)',
                boxShadow: '0 0 40px rgba(250, 204, 21, 0.4), 0 0 80px rgba(249, 115, 22, 0.2)',
                color: '#facc15',
              }}
            >
              {level}
            </div>
          </div>
        </div>

        {/* Level title */}
        <div
          className={`
            transition-all duration-500 delay-500
            ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="text-2xl md:text-3xl font-display font-bold text-cream-100 mb-2">
            {levelTitle}
          </div>
          <p className="text-slate-400 mb-8">
            You're making amazing progress!
          </p>
        </div>

        {/* Continue button */}
        <button
          onClick={onDismiss}
          className={`
            inline-flex items-center gap-2 px-8 py-4 rounded-2xl
            font-display font-bold text-lg text-navy-900
            bg-gradient-to-r from-gold-400 to-orange-400
            hover:from-gold-300 hover:to-orange-300
            shadow-lg shadow-orange-500/30
            transition-all duration-500 delay-700
            ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Float up animation */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
