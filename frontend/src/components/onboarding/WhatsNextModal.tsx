'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useOnboardingStore } from '@/lib/onboarding.store'

interface WhatsNextModalProps {
  isOpen: boolean
  username: string
}

export default function WhatsNextModal({ isOpen, username }: WhatsNextModalProps) {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)
  const { startOnboarding } = useOnboardingStore()

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation
      setShowConfetti(true)
      // Mark basic registration as complete but start gamification onboarding
      localStorage.setItem('tickr-registration-complete', 'true')
      // Start the gamification onboarding flow
      startOnboarding()
    }
  }, [isOpen, startOnboarding])

  if (!isOpen) return null

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm animate-fade-in" />

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#f97316', '#14b8a6', '#eab308', '#fb7185', '#a78bfa'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-navy-800 rounded-3xl border border-white/10 shadow-2xl animate-scale-in overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />

        <div className="relative p-8">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30 animate-bounce-once">
            <svg className="w-10 h-10 text-navy-950" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-display font-bold text-center mb-2">
            You&apos;re all set, <span className="text-orange-400">{username}</span>!
          </h2>

          <p className="text-slate-400 text-center mb-8">
            Your portfolio is ready with <span className="text-teal-400 font-semibold">$10,000</span> to invest.
            <br />
            What do you want to do first?
          </p>

          {/* Options */}
          <div className="space-y-3">
            {/* Option 1: Explore Stocks */}
            <button
              onClick={() => handleNavigate('/dashboard/stocks')}
              className="w-full p-4 rounded-xl bg-navy-700/50 border border-white/10 hover:border-orange-500/30 hover:bg-navy-700 transition-all duration-200 group text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-white group-hover:text-orange-400 transition-colors">
                  Explore Stocks
                </div>
                <div className="text-sm text-slate-400">
                  Browse 500+ real companies
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Option 2: See Portfolio */}
            <button
              onClick={() => handleNavigate('/dashboard/portfolio')}
              className="w-full p-4 rounded-xl bg-navy-700/50 border border-white/10 hover:border-teal-500/30 hover:bg-navy-700 transition-all duration-200 group text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-white group-hover:text-teal-400 transition-colors">
                  See How It Works
                </div>
                <div className="text-sm text-slate-400">
                  Check out your $10K portfolio
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Option 3: Learn (Recommended) */}
            <button
              onClick={() => handleNavigate('/dashboard/learn')}
              className="w-full p-4 rounded-xl bg-gradient-to-r from-gold-500/10 to-orange-500/10 border-2 border-gold-500/30 hover:border-gold-400 hover:shadow-lg hover:shadow-gold-500/10 transition-all duration-200 group text-left flex items-center gap-4 relative overflow-hidden"
            >
              {/* Recommended badge */}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gold-500 text-navy-950 text-xs font-display font-bold flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Recommended
              </div>

              <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-gold-400 group-hover:text-gold-300 transition-colors">
                  Get Started Learning
                </div>
                <div className="text-sm text-slate-400">
                  Learn investing basics first
                </div>
              </div>
              <svg className="w-5 h-5 text-gold-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
