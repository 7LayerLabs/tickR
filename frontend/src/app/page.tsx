'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen text-white overflow-hidden bg-navy-900">
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 lg:px-12 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center font-display font-bold text-navy-950 text-lg">
            T
          </div>
          <span className="font-display font-bold text-xl tracking-tight">TickR</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="/auth/login"
            className="btn-ghost"
          >
            Log In
          </Link>
          <Link
            href="/auth/register"
            className="btn-primary"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24 lg:py-32 px-6 lg:px-12">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse-soft"></div>
          <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[80px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Trust badge - NEON PILL */}
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-display text-base font-extrabold tracking-wide overflow-hidden cursor-default transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.2) 50%, rgba(139, 92, 246, 0.15) 100%)',
                    boxShadow: '0 0 25px rgba(16, 185, 129, 0.4), 0 0 50px rgba(6, 182, 212, 0.25), inset 0 0 20px rgba(6, 182, 212, 0.1)',
                  }}
                >
                  {/* Gradient border using pseudo-element trick */}
                  <div className="absolute inset-0 rounded-full p-[2px]"
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMaskComposite: 'xor',
                    }}
                  />
                  {/* Animated glow pulse */}
                  <div className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.35) 50%, rgba(139, 92, 246, 0.25) 100%)',
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    }}
                  />
                  {/* Content */}
                  <div className="relative flex items-center gap-3">
                    {/* Glowing checkmark - also rounded */}
                    <div className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                        boxShadow: '0 0 15px rgba(16, 185, 129, 0.7), 0 0 30px rgba(6, 182, 212, 0.4)',
                      }}
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {/* Ages text */}
                    <span className="text-base italic"
                      style={{
                        background: 'linear-gradient(135deg, #4ade80, #22d3ee, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.6))',
                      }}
                    >
                      Ages 12–16
                    </span>
                    <span className="text-cyan-400/80">·</span>
                    <span className="text-base"
                      style={{
                        background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.5))',
                      }}
                    >
                      No real money
                    </span>
                  </div>
                </div>
              </div>

              {/* Headline - Reference style with italic accent */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight text-center lg:text-left">
                <span className="text-cream-100">Learn Investing</span>
                <br />
                <span className="text-cream-100">The </span>
                <span className="display-accent">Smart Way</span>
              </h1>

              {/* Subheadline */}
              <div className="text-xl mb-8 leading-relaxed space-y-2 text-center lg:text-left">
                <p className="text-slate-300">
                  <span className="text-orange-400 font-semibold">Trade real stocks.</span>
                  <span className="text-slate-500 mx-2">·</span>
                  <span className="text-teal-400 font-semibold">Battle your friends.</span>
                </p>
                <p className="text-slate-400">
                  Master the market with $10K in practice funds.
                  <br className="hidden sm:block" />
                  No risk. Real learning.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
                <Link href="/auth/register" className="btn-primary text-center">
                  Start Learning Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="#how-it-works" className="btn-secondary text-center">
                  See How It Works
                </Link>
              </div>

              <p className="text-sm text-slate-500 text-center lg:text-left">Free forever · No credit card required</p>
            </div>

            {/* Image/Visual Side */}
            <div className={`relative transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative h-72 sm:h-80 lg:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                {/* Glow effect behind image */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-transparent to-teal-500/20 blur-2xl -z-10"></div>
                <Image
                  src="/images/header.jpg"
                  alt="Learn investing with TickR"
                  fill
                  priority
                  className="object-cover"
                  quality={85}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-4 card-glass p-4 animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Portfolio</div>
                    <div className="font-display font-bold text-teal-400">+12.4%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 card-glass p-4 animate-float hidden lg:block" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Level</div>
                    <div className="font-display font-bold text-gold-400">Trader</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <div className="stat-large gradient-text">$10K</div>
              <div className="text-sm text-slate-400 mt-2">Practice funds</div>
            </div>
            <div className="text-center">
              <div className="stat-large text-teal-400">500+</div>
              <div className="text-sm text-slate-400 mt-2">Real stocks</div>
            </div>
            <div className="text-center">
              <div className="stat-large text-cream-100">7</div>
              <div className="text-sm text-slate-400 mt-2">Learning levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It <span className="display-accent">Works</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Get started in minutes with a simple, safe process.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card-elevated text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-2xl font-display font-bold text-navy-950 shadow-glow-orange group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Create Account</h3>
              <p className="text-slate-400">Sign up free in 30 seconds. No credit card needed.</p>
            </div>

            {/* Step 2 */}
            <div className="card-elevated text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-2xl font-display font-bold text-navy-950 shadow-glow-teal group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Get $10K Practice Money</h3>
              <p className="text-slate-400">Receive virtual funds instantly to start learning.</p>
            </div>

            {/* Step 3 */}
            <div className="card-elevated text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-2xl font-display font-bold text-navy-950 shadow-glow-gold group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Trade & Learn</h3>
              <p className="text-slate-400">Buy real stocks, track your portfolio, understand markets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10">
        {/* Feature 1 */}
        <div className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-80 lg:h-[400px] order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl"></div>
              <Image src="/images/stockup.png" alt="Daily practice" fill className="object-contain" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="badge-accent mb-4">Daily Challenges</div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Build <span className="display-accent">Consistent</span> Habits
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Daily challenges reinforce key concepts and build lasting investment knowledge. Small steps lead to real understanding.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-400">
                  <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  New challenge every day
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Earn points and badges
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Track your streak
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-warning mb-4">7 Levels</div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="display-accent">Level Up</span> Your Skills
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Progress through 7 levels as you master new concepts. Each level unlocks deeper market insights and more powerful tools.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-sm">Rookie</span>
                <span className="px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-sm">Learner</span>
                <span className="px-3 py-1.5 rounded-lg bg-navy-800 border border-orange-500/30 text-orange-400 text-sm">Trader</span>
                <span className="px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-sm">Analyst</span>
                <span className="px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-sm">Strategist</span>
                <span className="px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-sm">Expert</span>
                <span className="px-3 py-1.5 rounded-lg bg-navy-800 border border-gold-500/30 text-gold-400 text-sm">Legend</span>
              </div>
            </div>
            <div className="relative h-64 md:h-80 lg:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-bl from-gold-500/10 to-transparent rounded-3xl"></div>
              <Image src="/images/levelup.png" alt="Progressive learning" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-80 lg:h-[400px] order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-3xl"></div>
              <Image src="/images/leader.jpg" alt="Track progress" fill className="object-contain" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="badge-success mb-4">Compete</div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Track & <span className="display-accent">Compare</span>
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                See how your portfolio performs over time. Compete with friends on leaderboards in a friendly, educational environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Parents */}
      <section className="relative z-10 py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Built for <span className="display-accent">Safety</span>
            </h2>
            <p className="text-slate-400">Designed with parents and educators in mind.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-elevated">
              <div className="w-14 h-14 rounded-xl bg-teal-500/15 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3">100% Safe</h3>
              <p className="text-slate-400">No real money involved. Kids never link a bank account or credit card.</p>
            </div>

            <div className="card-elevated">
              <div className="w-14 h-14 rounded-xl bg-orange-500/15 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Real Learning</h3>
              <p className="text-slate-400">Real companies, real prices, real market concepts. Practical financial literacy.</p>
            </div>

            <div className="card-elevated">
              <div className="w-14 h-14 rounded-xl bg-gold-500/15 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-gold-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Parent Visibility</h3>
              <p className="text-slate-400">Dashboard to monitor progress, activity, and what your child is learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              What Students <span className="display-accent">Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-4">"I learned more about stocks in 2 weeks than a whole semester at school."</p>
              <div className="text-sm text-slate-500">— Jake, 15</div>
            </div>

            <div className="card p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-4">"It made investing actually make sense. Now I understand the news better."</p>
              <div className="text-sm text-slate-500">— Maya, 13</div>
            </div>

            <div className="card p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-4">"My parents are impressed with what I've learned. They ask me about stocks now."</p>
              <div className="text-sm text-slate-500">— Casey, 14</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          {/* Glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[300px] bg-orange-500/10 rounded-full blur-[100px]"></div>
          </div>

          <h2 className="relative text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to <span className="display-accent">Start?</span>
          </h2>
          <p className="relative text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of students building real investment knowledge. Start your journey today.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg px-10 py-4">
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <p className="relative text-sm text-slate-500 mt-6">Free forever · No credit card · 30-second signup</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center font-display font-bold text-navy-950 text-sm">
              T
            </div>
            <span className="text-sm text-slate-500">© 2026 TickR. Safe learning for ages 12–16.</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
