'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// =====================================================
//   ONBOARDING STORE
//   Manages post-registration onboarding flow
// =====================================================

export type GuidanceLevel = 'explorer' | 'guided'

export type OnboardingStep =
  | 'welcome_slides'      // 3-4 intro slides introducing TickR
  | 'guidance_picker'     // Choose Explorer vs Guided mode
  | 'first_trade'         // Interactive first purchase walkthrough
  | 'completed'           // Onboarding finished

export interface OnboardingState {
  // Current step in onboarding
  currentStep: OnboardingStep

  // User's chosen guidance level
  guidanceLevel: GuidanceLevel | null

  // Tracks which slides user has seen
  welcomeSlidesCompleted: boolean
  slidesSeen: number

  // First trade walkthrough state
  firstTradeCompleted: boolean
  selectedTicker: string | null
  selectedShares: number | null

  // Overall completion status
  isComplete: boolean

  // Timestamps
  startedAt: string | null
  completedAt: string | null
}

interface OnboardingActions {
  // Start the onboarding flow
  startOnboarding: () => void

  // Welcome slides navigation
  nextSlide: () => void
  completeWelcomeSlides: () => void

  // Guidance selection
  selectGuidanceLevel: (level: GuidanceLevel) => void

  // First trade walkthrough
  selectFirstTradeTicker: (ticker: string) => void
  selectFirstTradeShares: (shares: number) => void
  completeFirstTrade: () => void

  // Complete onboarding
  completeOnboarding: () => void

  // Skip onboarding (for returning users)
  skipOnboarding: () => void

  // Reset (for testing or re-onboarding)
  resetOnboarding: () => void

  // Check if user should see onboarding
  shouldShowOnboarding: () => boolean

  // Navigate to specific step
  goToStep: (step: OnboardingStep) => void
}

const getInitialState = (): OnboardingState => ({
  currentStep: 'welcome_slides',
  guidanceLevel: null,
  welcomeSlidesCompleted: false,
  slidesSeen: 0,
  firstTradeCompleted: false,
  selectedTicker: null,
  selectedShares: null,
  isComplete: false,
  startedAt: null,
  completedAt: null,
})

// Suggested stocks for first trade (kid-friendly, well-known companies)
export const FIRST_TRADE_STOCKS = [
  { ticker: 'AAPL', name: 'Apple', icon: '🍎', description: 'Makes iPhones, Macs & more' },
  { ticker: 'NFLX', name: 'Netflix', icon: '🎬', description: 'Your favorite shows & movies' },
  { ticker: 'NKE', name: 'Nike', icon: '👟', description: 'Just Do It - sports & shoes' },
  { ticker: 'RBLX', name: 'Roblox', icon: '🎮', description: 'Games you know and love' },
  { ticker: 'DIS', name: 'Disney', icon: '🏰', description: 'Movies, parks & streaming' },
]

// Total number of welcome slides
export const TOTAL_WELCOME_SLIDES = 4

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      // Start the onboarding flow
      startOnboarding: () => {
        set({
          currentStep: 'welcome_slides',
          startedAt: new Date().toISOString(),
          isComplete: false,
        })
      },

      // Navigate through welcome slides
      nextSlide: () => {
        const state = get()
        const newSlidesSeen = state.slidesSeen + 1

        if (newSlidesSeen >= TOTAL_WELCOME_SLIDES) {
          // All slides seen, move to guidance picker
          set({
            slidesSeen: newSlidesSeen,
            welcomeSlidesCompleted: true,
            currentStep: 'guidance_picker',
          })
        } else {
          set({ slidesSeen: newSlidesSeen })
        }
      },

      completeWelcomeSlides: () => {
        set({
          welcomeSlidesCompleted: true,
          currentStep: 'guidance_picker',
        })
      },

      // Select guidance level
      selectGuidanceLevel: (level) => {
        set({
          guidanceLevel: level,
          currentStep: 'first_trade',
        })
      },

      // First trade walkthrough
      selectFirstTradeTicker: (ticker) => {
        set({ selectedTicker: ticker })
      },

      selectFirstTradeShares: (shares) => {
        set({ selectedShares: shares })
      },

      completeFirstTrade: () => {
        set({
          firstTradeCompleted: true,
          currentStep: 'completed',
        })
        // Complete onboarding after first trade
        get().completeOnboarding()
      },

      // Complete the entire onboarding
      completeOnboarding: () => {
        set({
          isComplete: true,
          currentStep: 'completed',
          completedAt: new Date().toISOString(),
        })
      },

      // Skip onboarding entirely
      skipOnboarding: () => {
        set({
          isComplete: true,
          currentStep: 'completed',
          completedAt: new Date().toISOString(),
          // Default to explorer mode if skipped
          guidanceLevel: 'explorer',
        })
      },

      // Reset for testing
      resetOnboarding: () => {
        set(getInitialState())
      },

      // Check if onboarding should be shown
      shouldShowOnboarding: () => {
        const state = get()
        return !state.isComplete
      },

      // Navigate to specific step
      goToStep: (step) => {
        set({ currentStep: step })
      },
    }),
    {
      name: 'tickr-onboarding',
      version: 1,
    }
  )
)

// =====================================================
//   HOOKS FOR GUIDANCE-AWARE FEATURES
// =====================================================

/**
 * Returns true if user is in guided mode and should see more tooltips/hints
 */
export function useIsGuidedMode(): boolean {
  const guidanceLevel = useOnboardingStore((s) => s.guidanceLevel)
  return guidanceLevel === 'guided'
}

/**
 * Returns true if onboarding is complete
 */
export function useOnboardingComplete(): boolean {
  return useOnboardingStore((s) => s.isComplete)
}
