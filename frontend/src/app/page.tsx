'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  // DEMO MODE: Always redirect to dashboard for testing
  useEffect(() => {
    router.push('/dashboard/portfolio')
  }, [router])

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#0f1628' }}>
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
            href="/auth/login"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Log In
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-200"
            style={{ backgroundColor: '#0ea5e9' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24 lg:py-32 px-6 lg:px-12">
        {/* Subtle background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-600/8 to-transparent rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/8 to-transparent rounded-full blur-3xl -ml-48 -mb-48"></div>
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
                  <span style={{ color: '#facc15' }}>Dominate leaderboards.</span>
                  <span className="text-slate-500"> · </span>
                  <span className="text-slate-300">Level up.</span>
                </p>
                <p>
                  <span className="text-slate-300">From rookie to legend.</span>
                  <span className="text-slate-500"> · </span>
                  <span className="text-slate-400">From </span>
                  <span style={{ color: '#ef4444' }}>Furu</span>
                  <span className="text-slate-400"> to </span>
                  <span style={{ color: '#10b981' }}>Buffett</span>
                  <span className="text-slate-400">.</span>
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
                <Link
                  href="/auth/register"
                  className="px-8 py-4 rounded-lg font-semibold text-white text-center transition-all duration-200"
                  style={{ backgroundColor: '#0ea5e9' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
                >
                  Start Learning Free
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-4 rounded-lg font-semibold text-white text-center transition-all duration-200"
                  style={{ backgroundColor: '#1a2847', border: '1px solid #1f3a5f' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#141e2f'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a2847'}
                >
                  See How It Works
                </Link>
              </div>

              <p className="text-sm text-slate-500 text-center">Free · No credit card required</p>
            </div>

            {/* Image Side */}
            <div className="relative h-72 sm:h-80 lg:h-[450px] rounded-2xl overflow-hidden" style={{ border: '1px solid #1f3a5f' }}>
              <Image
                src="/images/header.jpg"
                alt="Learn investing with TickR"
                fill
                priority
                className="object-cover"
                quality={85}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <div className="text-3xl lg:text-4xl font-display font-bold" style={{ color: '#10b981' }}>$10K</div>
              <div className="text-sm text-slate-400 mt-1">Practice funds</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl lg:text-4xl font-display font-bold" style={{ color: '#0ea5e9' }}>500+</div>
              <div className="text-sm text-slate-400 mt-1">Real stocks</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl lg:text-4xl font-display font-bold text-white">7</div>
              <div className="text-sm text-slate-400 mt-1">Learning levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 lg:px-12 border-t" style={{ borderColor: '#1f3a5f' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">How It Works</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Get started in minutes with a simple, safe process.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: 'rgba(14, 165, 233, 0.15)', border: '2px solid #0ea5e9', color: '#0ea5e9' }}>
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Create Account</h3>
              <p className="text-slate-400 text-sm">Sign up free in 30 seconds. No credit card needed.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', color: '#10b981' }}>
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Get $10K Practice Money</h3>
              <p className="text-slate-400 text-sm">Receive virtual funds instantly to start learning.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '2px solid #64748b', color: '#94a3b8' }}>
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Trade & Learn</h3>
              <p className="text-slate-400 text-sm">Buy real stocks, track your portfolio, understand markets.</p>
            </div>
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

      {/* For Parents */}
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">What Students Say</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <p className="text-slate-300 mb-4">"I learned more about stocks in 2 weeks than a whole semester at school."</p>
              <div className="text-sm text-slate-500">— Jake, 15</div>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <p className="text-slate-300 mb-4">"It made investing actually make sense. Now I understand the news better."</p>
              <div className="text-sm text-slate-500">— Maya, 13</div>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#141e2f', border: '1px solid #1f3a5f' }}>
              <p className="text-slate-300 mb-4">"My parents are impressed with what I've learned. They ask me about stocks now."</p>
              <div className="text-sm text-slate-500">— Casey, 14</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-t" style={{ borderColor: '#1f3a5f' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to learn?</h2>
          <p className="text-slate-400 mb-8">Start building real investment knowledge today.</p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200"
            style={{ backgroundColor: '#0ea5e9' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
          >
            Get Started Free
          </Link>
          <p className="text-sm text-slate-500 mt-4">Free · No credit card · 30-second signup</p>
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
    </div>
  )
}
