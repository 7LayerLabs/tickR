'use client'

import Image from 'next/image'

interface WelcomeStepProps {
  onNext: () => void
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center animate-fade-in">
      {/* Tick Mascot */}
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg shadow-orange-500/20 mb-6 border-2 border-orange-500/30">
          <Image
            src="/images/tickr_mascot.jpg"
            alt="Tick the TickR mascot"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
        Welcome to <span className="display-accent">TickR!</span>
      </h1>

      {/* Subheadline */}
      <p className="text-xl text-slate-300 mb-8 max-w-md mx-auto">
        Learn to invest with <span className="text-teal-400 font-semibold">$10,000</span> in play money
      </p>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
        <div className="card-glass p-4 rounded-xl">
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-sm text-slate-300 font-medium">Trade real stocks</p>
        </div>

        <div className="card-glass p-4 rounded-xl">
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-teal-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-sm text-slate-300 font-medium">Learn at your pace</p>
        </div>

        <div className="card-glass p-4 rounded-xl">
          <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gold-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-sm text-slate-300 font-medium">No real money risk</p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onNext}
        className="btn-primary text-lg px-10 py-4"
      >
        Let&apos;s Get Started
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  )
}
