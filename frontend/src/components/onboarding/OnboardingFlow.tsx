'use client'

import { useOnboardingStore } from '@/lib/onboarding.store'
import { WelcomeSlides } from './WelcomeSlides'
import { GuidancePicker } from './GuidancePicker'
import { FirstTradeWalkthrough } from './FirstTradeWalkthrough'
import type { GuidanceLevel } from '@/lib/onboarding.store'

// =====================================================
//   ONBOARDING FLOW
//   Orchestrates the post-registration onboarding steps
// =====================================================

export function OnboardingFlow() {
  const {
    currentStep,
    isComplete,
    completeWelcomeSlides,
    selectGuidanceLevel,
    completeFirstTrade,
    selectFirstTradeTicker,
    selectFirstTradeShares,
  } = useOnboardingStore()

  // Don't render if onboarding is complete
  if (isComplete) {
    return null
  }

  // Handle welcome slides completion
  const handleWelcomeComplete = () => {
    completeWelcomeSlides()
  }

  // Handle guidance selection
  const handleGuidanceSelect = (level: GuidanceLevel) => {
    selectGuidanceLevel(level)
  }

  // Handle first trade completion
  const handleFirstTradeComplete = (ticker: string, shares: number) => {
    selectFirstTradeTicker(ticker)
    selectFirstTradeShares(shares)
    completeFirstTrade()
    // The first trade celebration is already triggered by game.store.ts
  }

  // Render based on current step
  switch (currentStep) {
    case 'welcome_slides':
      return <WelcomeSlides onComplete={handleWelcomeComplete} />

    case 'guidance_picker':
      return <GuidancePicker onSelect={handleGuidanceSelect} />

    case 'first_trade':
      return <FirstTradeWalkthrough onComplete={handleFirstTradeComplete} />

    case 'completed':
      return null

    default:
      return null
  }
}

// =====================================================
//   ONBOARDING PROVIDER
//   Wraps the app and shows onboarding when needed
// =====================================================

interface OnboardingProviderProps {
  children: React.ReactNode
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const { isComplete, shouldShowOnboarding } = useOnboardingStore()

  // If onboarding is not complete, show the onboarding flow
  // The children will still be rendered but hidden behind the full-screen onboarding
  if (!isComplete && shouldShowOnboarding()) {
    return (
      <>
        {/* App is hidden but mounted (for state persistence) */}
        <div className="hidden">{children}</div>
        {/* Full-screen onboarding overlay */}
        <OnboardingFlow />
      </>
    )
  }

  // Onboarding complete, show the app
  return <>{children}</>
}
