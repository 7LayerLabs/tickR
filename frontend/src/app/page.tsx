'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/lib/auth.store'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/portfolio')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Navigation - BOLD & Clean */}
      <nav className="relative z-20 flex justify-between items-center px-8 lg:px-12 py-4 border-b" style={{ backgroundColor: '#000000', borderColor: '#0ea5e9' }}>
        <div className="h-16 w-auto relative">
          <Image
            src="/images/tickr_wordmark.jpg"
            alt="TickR Logo"
            width={200}
            height={64}
            priority
            className="h-16 w-auto brightness-110"
          />
        </div>
        <div className="flex gap-5 items-center">
          <Link href="/auth/login" className="text-white hover:text-accent-sapphire transition-colors font-bold text-lg">
            Log In
          </Link>
          <Link href="/auth/register" className="btn-primary font-bold px-8 py-3 text-lg">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section - GAME FOCUSED */}
      <section className="relative z-10 pt-16 pb-12 px-6 lg:px-12" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Side */}
          <div className="order-2 lg:order-1">
            {/* Age & Safety Badge */}
            <div className="inline-block mb-6">
              <div className="px-5 py-2 rounded-full border-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981' }}>
                <span className="text-sm font-bold" style={{ color: '#10b981' }}>✓ Ages 12-16 • 100% Safe • No Real Money</span>
              </div>
            </div>

            {/* Headlines - GAME LANGUAGE */}
            <h1 className="text-7xl lg:text-8xl font-display font-black mb-2" style={{ lineHeight: '0.95' }}>
              <span className="text-white">Stop</span><br />
              <span style={{ background: 'linear-gradient(to right, #0ea5e9, #10b981, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Watching</span>
            </h1>
            <h2 className="text-7xl lg:text-8xl font-display font-black mb-6" style={{ lineHeight: '0.95' }}>
              <span style={{ color: '#fbbf24' }}>Start</span> <span className="text-white">Playing</span>
            </h2>

            {/* Subheading - Excitement & Social */}
            <p className="text-lg mb-10 max-w-sm leading-relaxed font-medium text-gray-300">
              <span className="font-bold" style={{ color: '#0ea5e9' }}>Trade real stocks.</span> <span className="font-bold" style={{ color: '#10b981' }}>Battle your friends.</span> <span className="font-bold" style={{ color: '#fbbf24' }}>Dominate leaderboards.</span> Level up from rookie to legend.
            </p>

            {/* CTAs - Join Friends Theme */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/auth/register" className="btn-primary font-black px-8 py-4 text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                Join Your Friends →
              </Link>
              <Link href="#how-it-works" className="btn-secondary font-black px-8 py-4 text-lg hover:border-accent-sapphire/80 transition-all">
                See How It Works
              </Link>
            </div>
          </div>

          {/* Image Side - Hero */}
          <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4" style={{ borderColor: '#0ea5e9' }}>
            <Image
              src="/images/header.jpg"
              alt="Tick celebrating on growing chart"
              fill
              priority
              className="object-cover"
              quality={85}
            />
          </div>
        </div>

        {/* Game Features - Real Numbers Only */}
        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-3 gap-4 lg:gap-6">
          <div className="rounded-xl p-6 border-2 text-center hover:shadow-lg transition-all" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' }}>
            <div className="text-5xl font-black" style={{ color: '#10b981' }}>$10K</div>
            <div className="text-sm text-white font-bold mt-2">Play Money Start</div>
          </div>
          <div className="rounded-xl p-6 border-2 text-center hover:shadow-lg transition-all" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: '#fbbf24' }}>
            <div className="text-5xl font-black" style={{ color: '#fbbf24' }}>7</div>
            <div className="text-sm text-white font-bold mt-2">Levels to Unlock</div>
          </div>
          <div className="rounded-xl p-6 border-2 text-center hover:shadow-lg transition-all" style={{ backgroundColor: 'rgba(14, 165, 233, 0.1)', borderColor: '#0ea5e9' }}>
            <div className="text-5xl font-black" style={{ color: '#0ea5e9' }}>500+</div>
            <div className="text-sm text-white font-bold mt-2">Real Stocks</div>
          </div>
        </div>
      </section>

      {/* Game Mechanics Section */}
      <section id="how-it-works" className="relative z-10 border-t" style={{ backgroundColor: '#000000', borderColor: '#1a1a1a' }}>

        {/* Feature 1: Daily Challenges */}
        <div className="py-20 px-6 lg:px-12 border-b" style={{ borderColor: '#1a1a1a' }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 lg:h-[500px] order-2 lg:order-1 group">
              <Image
                src="/images/stockup.png"
                alt="Daily Challenges - Complete missions and earn rewards"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Text - Game Language */}
            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <h3 className="text-5xl lg:text-6xl font-display font-bold mb-2">
                  Complete Daily
                </h3>
                <h3 className="text-5xl lg:text-6xl font-display font-bold mb-2" style={{ color: '#0ea5e9' }}>
                  Challenges
                </h3>
              </div>
              <p className="text-gray-300 text-lg max-w-sm">
                Earn XP for every trade. Unlock badges. Climb the daily leaderboard. Show your friends who's the best trader.
              </p>
              <div className="pt-4">
                <Link href="/auth/register" className="btn-primary inline-block">
                  Start Grinding →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Level Up System */}
        <div className="py-20 px-6 lg:px-12 border-b" style={{ backgroundColor: '#000000', borderColor: '#1a1a1a' }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 lg:h-[500px] group">
              <Image
                src="/images/levelup.png"
                alt="Level Up - Progress from Rookie to Legend"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Text - Game Language */}
            <div className="space-y-6">
              <div>
                <h3 className="text-5xl lg:text-6xl font-display font-bold mb-2">
                  Level Up to
                </h3>
                <h3 className="text-5xl lg:text-6xl font-display font-bold mb-2" style={{ color: '#10b981' }}>
                  Legend
                </h3>
              </div>
              <p className="text-gray-300 text-lg max-w-sm">
                Progress through 7 levels from Rookie → Expert → Legend. Unlock new features at each level. Earn exclusive badges and rewards for your grind.
              </p>
              <div className="pt-4">
                <Link href="/auth/register" className="btn-primary inline-block">
                  Start Your Journey →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Battle Your Friends */}
        <div className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 lg:h-[550px] order-2 lg:order-1 group">
              <Image
                src="/images/leader.jpg"
                alt="Battle Friends - Compete and dominate leaderboards"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Text - Game Language */}
            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <h3 className="text-5xl lg:text-6xl font-display font-bold mb-2">
                  Battle Your
                </h3>
                <h3 className="text-5xl lg:text-6xl font-display font-bold mb-2" style={{ color: '#fbbf24' }}>
                  Friends
                </h3>
              </div>
              <p className="text-gray-300 text-lg max-w-sm">
                Create private tournaments. Battle classmates and friend groups. Dominate global and friend leaderboards. Bragging rights are REAL.
              </p>
              <div className="pt-4">
                <Link href="/auth/register" className="btn-primary inline-block">
                  Challenge Your Squad →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Teen Testimonials Section - Excitement Focus */}
      <section className="relative z-10 py-20 px-6 lg:px-12" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-display font-bold mb-12 text-center">What Teens Are Saying 🔥</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="card p-8 space-y-4 border-2" style={{ borderColor: '#0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.08)' }}>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-sapphire to-accent-emerald flex items-center justify-center font-display font-bold text-lg">J</div>
                <div>
                  <div className="font-semibold text-lg">Jake, 15</div>
                  <div className="text-sm text-gray-400">Level 6 • 3-time leaderboard winner</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                "This is SO addictive. I'm literally checking trades between classes. Already crushed my friends in the last tournament 💪"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="card p-8 space-y-4 border-2" style={{ borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-emerald to-accent-gold flex items-center justify-center font-display font-bold text-lg">M</div>
                <div>
                  <div className="font-semibold text-lg">Maya, 13</div>
                  <div className="text-sm text-gray-400">Level 4 • Daily challenge grinder</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                "I didn't think I'd like investing, but the game part made it actually FUN. My whole squad is playing now."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="card p-8 space-y-4 border-2" style={{ borderColor: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.08)' }}>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold to-accent-rose flex items-center justify-center font-display font-bold text-lg">C</div>
                <div>
                  <div className="font-semibold text-lg">Casey, 14</div>
                  <div className="text-sm text-gray-400">Level 5 • Portfolio +18%</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                "Beating the market is INSANE. Can't wait to show my parents what I learned. They're actually impressed lol"
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="card p-8 space-y-4 border-2" style={{ borderColor: '#0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.08)' }}>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-sapphire to-accent-rose flex items-center justify-center font-display font-bold text-lg">R</div>
                <div>
                  <div className="font-semibold text-lg">Riley, 12</div>
                  <div className="text-sm text-gray-400">New to investing • Rank #847 global</div>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                "I'm literally a BEGINNER and I'm already getting wins. The game explains everything. It's not confusing at all."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Reassurance Section */}
      <section className="relative z-10 py-16 px-6 lg:px-12 border-b" style={{ backgroundColor: '#000000', borderColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-8 text-center">For Parents & Teachers 👨‍👩‍👧‍👦</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="font-bold text-lg mb-2">100% Safe</h3>
              <p className="text-gray-400">Zero real money. No credit card. Kid-safe environment with moderation.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="font-bold text-lg mb-2">Real Learning</h3>
              <p className="text-gray-400">Teaches real market mechanics, financial literacy, and decision-making.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="font-bold text-lg mb-2">Parental Oversight</h3>
              <p className="text-gray-400">Parent dashboard to monitor progress, activity, and learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-20 px-6 lg:px-12 border-y" style={{ backgroundColor: '#000000', borderColor: '#1a1a1a' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-display font-bold mb-6">Your Squad Is Waiting ⚡</h2>
          <p className="text-xl text-gray-300 mb-10">
            Stop watching the sidelines. Start playing. Start dominating.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg font-black px-8 py-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
              Join Your Friends NOW →
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Free. No credit card. Takes 30 seconds. Get your $10K play money instantly.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 lg:px-12 text-gray-400 text-sm border-t" style={{ backgroundColor: '#000000', borderColor: '#1a1a1a' }}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>© 2026 TickR. Built for ages 12–16.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}