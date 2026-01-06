'use client'

import { useState } from 'react'
import Image from 'next/image'

interface WelcomeSlidesProps {
  onComplete: () => void
}

interface Slide {
  title: string
  highlight?: string
  subtitle: string
  description: string
  iconBg: string
  iconShadow: string
  icon: React.ReactNode
}

const slides: Slide[] = [
  {
    title: 'Welcome to',
    highlight: 'TickR!',
    subtitle: 'Your investing adventure starts here',
    description: 'Learn how the stock market works using real stock prices — no real money needed!',
    iconBg: 'bg-gradient-to-br from-orange-400 to-orange-500',
    iconShadow: 'shadow-orange-500/30',
    icon: (
      <svg className="w-10 h-10 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Trade Like a',
    highlight: 'Pro',
    subtitle: 'Practice with $10,000 in play money',
    description: 'Buy and sell real stocks like Apple, Netflix, and Nike. Watch your portfolio grow — all risk-free!',
    iconBg: 'bg-gradient-to-br from-teal-400 to-teal-500',
    iconShadow: 'shadow-teal-500/30',
    icon: (
      <svg className="w-10 h-10 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Learn as',
    highlight: 'You Go',
    subtitle: 'Fun lessons that actually stick',
    description: 'Short, interactive lessons teach you investing basics. Complete quizzes and earn XP along the way!',
    iconBg: 'bg-gradient-to-br from-gold-400 to-gold-500',
    iconShadow: 'shadow-gold-500/30',
    icon: (
      <svg className="w-10 h-10 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Level',
    highlight: 'Up!',
    subtitle: 'The more you learn, the more you earn',
    description: 'Earn XP for every trade and lesson. Complete daily challenges and compete on the leaderboard!',
    iconBg: 'bg-gradient-to-br from-coral-400 to-coral-500',
    iconShadow: 'shadow-coral-500/30',
    icon: (
      <svg className="w-10 h-10 text-navy-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

export function WelcomeSlides({ onComplete }: WelcomeSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete()
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const slide = slides[currentSlide]
  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="fixed inset-0 z-[100] bg-navy-950 flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Skip button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={onComplete}
          className="px-4 py-2 text-sm text-slate-500 hover:text-slate-300 transition-colors font-medium"
        >
          Skip intro
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div
          className="w-full max-w-lg text-center animate-fade-in"
          key={currentSlide}
        >
          {/* Icon */}
          <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl ${slide.iconBg} flex items-center justify-center shadow-lg ${slide.iconShadow}`}>
            {slide.icon}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4 text-white">
            {slide.title} <span className="display-accent">{slide.highlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-300 font-medium mb-4">
            {slide.subtitle}
          </p>

          {/* Description */}
          <p className="text-base text-slate-400 leading-relaxed max-w-md mx-auto">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-8 relative">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${index === currentSlide
                  ? 'w-8 bg-orange-400'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
                }
              `}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4">
          {currentSlide > 0 && (
            <button
              onClick={goPrev}
              className="btn-ghost"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}

          <button
            onClick={goNext}
            className="btn-primary"
          >
            {isLastSlide ? "Let's Go!" : 'Next'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mascot in corner */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <Image
          src="/images/tickr_mascot.jpg"
          alt="TickR Mascot"
          width={80}
          height={80}
          className="rounded-2xl border-2 border-orange-500/30 opacity-40 hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  )
}
