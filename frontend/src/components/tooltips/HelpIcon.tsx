'use client'

import { useState } from 'react'
import { HelpCircle, X } from 'lucide-react'
import { useTooltipStore, TOOLTIP_DEFINITIONS, type TooltipId } from '@/lib/tooltip.store'
import { useIsGuidedMode } from '@/lib/onboarding.store'

interface HelpIconProps {
  tooltipId: TooltipId
  size?: 'sm' | 'md'
  className?: string
}

export function HelpIcon({ tooltipId, size = 'sm', className = '' }: HelpIconProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { markSeen, hasSeen } = useTooltipStore()
  const isGuidedMode = useIsGuidedMode()

  const tooltip = TOOLTIP_DEFINITIONS[tooltipId]
  const hasSeenTooltip = hasSeen(tooltipId)

  // Show pulsing indicator in guided mode for unseen tooltips
  const showPulse = isGuidedMode && !hasSeenTooltip

  const handleOpen = () => {
    setIsOpen(true)
    markSeen(tooltipId)
  }

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <div className={`relative inline-flex ${className}`}>
      {/* Help icon button */}
      <button
        onClick={handleOpen}
        className={`
          p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/10
          transition-colors relative
          ${showPulse ? 'text-teal-400' : ''}
        `}
        aria-label={`Help: ${tooltip.title}`}
      >
        <HelpCircle className={iconSize} />
        {showPulse && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        )}
      </button>

      {/* Tooltip popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Tooltip */}
          <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-4 rounded-2xl bg-navy-800 border border-white/20 shadow-xl">
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-navy-800 border-l border-t border-white/20" />

            {/* Content */}
            <div className="relative">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-display font-bold text-cream-100">
                  {tooltip.title}
                </h4>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-cream-100 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {tooltip.content}
              </p>
              {tooltip.learnMoreUrl && (
                <a
                  href={tooltip.learnMoreUrl}
                  className="inline-block mt-3 text-sm text-teal-400 hover:text-teal-300 font-medium"
                >
                  Learn more →
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// =====================================================
//   INLINE TOOLTIP
//   For explaining terms inline in text
// =====================================================

interface InlineTooltipProps {
  term: string
  children: React.ReactNode
  className?: string
}

export function InlineTooltip({ term, children, className = '' }: InlineTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="border-b border-dashed border-teal-400/50 cursor-help text-teal-400">
        {term}
      </span>

      {isOpen && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-navy-800 border border-white/20 shadow-xl text-sm text-slate-300 text-left">
          {children}
          {/* Arrow */}
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-navy-800 border-r border-b border-white/20" />
        </span>
      )}
    </span>
  )
}
