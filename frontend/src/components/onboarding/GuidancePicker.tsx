'use client'

import { useState } from 'react'
import { Compass, Map, ChevronRight, HelpCircle, Lightbulb } from 'lucide-react'
import type { GuidanceLevel } from '@/lib/onboarding.store'

interface GuidancePickerProps {
  onSelect: (level: GuidanceLevel) => void
}

export function GuidancePicker({ onSelect }: GuidancePickerProps) {
  const [selected, setSelected] = useState<GuidanceLevel | null>(null)
  const [isHovering, setIsHovering] = useState<GuidanceLevel | null>(null)

  const handleContinue = () => {
    if (selected) {
      onSelect(selected)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-navy-900 flex flex-col items-center justify-center p-8">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-400 text-sm font-display font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            One quick question
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-cream-100 mb-3">
            How do you like to learn?
          </h1>
          <p className="text-lg text-slate-400">
            Choose your experience style — you can change this anytime in settings
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Explorer Mode */}
          <button
            onClick={() => setSelected('explorer')}
            onMouseEnter={() => setIsHovering('explorer')}
            onMouseLeave={() => setIsHovering(null)}
            className={`
              relative p-6 rounded-2xl text-left transition-all duration-300
              border-2
              ${selected === 'explorer'
                ? 'border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/20'
                : 'border-white/10 bg-navy-800 hover:border-teal-400/50 hover:bg-navy-700'
              }
            `}
          >
            {/* Selection indicator */}
            {selected === 'explorer' && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-navy-900" />
              </div>
            )}

            {/* Icon */}
            <div
              className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                transition-all duration-300
                ${selected === 'explorer' || isHovering === 'explorer'
                  ? 'bg-teal-500/20'
                  : 'bg-navy-900'
                }
              `}
            >
              <Compass className={`w-8 h-8 ${selected === 'explorer' ? 'text-teal-400' : 'text-slate-400'}`} />
            </div>

            {/* Content */}
            <h3 className={`text-xl font-display font-bold mb-2 ${selected === 'explorer' ? 'text-teal-400' : 'text-cream-100'}`}>
              Explorer Mode
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Minimal guidance, maximum freedom. Perfect if you like to figure things out on your own.
            </p>

            {/* Features */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Help available when you need it
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Fewer pop-ups and tooltips
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Discover features at your own pace
              </li>
            </ul>
          </button>

          {/* Guided Mode */}
          <button
            onClick={() => setSelected('guided')}
            onMouseEnter={() => setIsHovering('guided')}
            onMouseLeave={() => setIsHovering(null)}
            className={`
              relative p-6 rounded-2xl text-left transition-all duration-300
              border-2
              ${selected === 'guided'
                ? 'border-orange-400 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                : 'border-white/10 bg-navy-800 hover:border-orange-400/50 hover:bg-navy-700'
              }
            `}
          >
            {/* Selection indicator */}
            {selected === 'guided' && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-navy-900" />
              </div>
            )}

            {/* Recommended badge */}
            <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-orange-500 text-navy-900 text-xs font-display font-bold">
              Recommended for beginners
            </div>

            {/* Icon */}
            <div
              className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                transition-all duration-300
                ${selected === 'guided' || isHovering === 'guided'
                  ? 'bg-orange-500/20'
                  : 'bg-navy-900'
                }
              `}
            >
              <Map className={`w-8 h-8 ${selected === 'guided' ? 'text-orange-400' : 'text-slate-400'}`} />
            </div>

            {/* Content */}
            <h3 className={`text-xl font-display font-bold mb-2 ${selected === 'guided' ? 'text-orange-400' : 'text-cream-100'}`}>
              Guided Mode
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Step-by-step guidance to help you learn. Great if investing is new to you!
            </p>

            {/* Features */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Helpful tooltips explain features
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Suggestions for what to do next
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Learn investing terms as you go
              </li>
            </ul>
          </button>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`
            inline-flex items-center gap-2 px-8 py-4 rounded-2xl
            font-display font-bold text-lg
            transition-all duration-300
            ${selected
              ? 'text-navy-900 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 shadow-lg shadow-orange-500/30'
              : 'text-slate-500 bg-navy-800 border border-white/10 cursor-not-allowed'
            }
          `}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Helper text */}
        <p className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-2">
          <Lightbulb className="w-4 h-4" />
          You can switch modes anytime in Profile {'>'} Settings
        </p>
      </div>
    </div>
  )
}
