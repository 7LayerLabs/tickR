'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Minus, Plus, ShoppingCart, Sparkles } from 'lucide-react'
import { FIRST_TRADE_STOCKS } from '@/lib/onboarding.store'
import { useGameStore, BASE_STOCK_PRICES } from '@/lib/game.store'

interface FirstTradeWalkthroughProps {
  onComplete: (ticker: string, shares: number) => void
}

type Step = 'pick_stock' | 'pick_shares' | 'confirm'

export function FirstTradeWalkthrough({ onComplete }: FirstTradeWalkthroughProps) {
  const [step, setStep] = useState<Step>('pick_stock')
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null)
  const [shares, setShares] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { buyStock, cashBalance } = useGameStore()

  const selectedStock = FIRST_TRADE_STOCKS.find((s) => s.ticker === selectedTicker)
  const stockPrice = selectedTicker ? BASE_STOCK_PRICES[selectedTicker]?.price || 0 : 0
  const totalCost = stockPrice * shares
  const maxShares = stockPrice > 0 ? Math.floor(cashBalance / stockPrice) : 0

  const handleSelectStock = (ticker: string) => {
    setSelectedTicker(ticker)
    setShares(1)
  }

  const handleContinueToShares = () => {
    if (selectedTicker) {
      setStep('pick_shares')
    }
  }

  const handleContinueToConfirm = () => {
    setStep('confirm')
  }

  const handleConfirmPurchase = async () => {
    if (!selectedTicker) return

    setIsSubmitting(true)

    // Execute the trade
    const result = buyStock(selectedTicker, shares, stockPrice)

    if (result.success) {
      // Small delay for effect
      await new Promise((resolve) => setTimeout(resolve, 500))
      onComplete(selectedTicker, shares)
    }

    setIsSubmitting(false)
  }

  const handleBack = () => {
    if (step === 'pick_shares') {
      setStep('pick_stock')
    } else if (step === 'confirm') {
      setStep('pick_shares')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-navy-900 flex flex-col">
      {/* Progress indicator */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2">
            {['pick_stock', 'pick_shares', 'confirm'].map((s, index) => (
              <div
                key={s}
                className={`
                  flex-1 h-2 rounded-full transition-all duration-300
                  ${step === s || index < ['pick_stock', 'pick_shares', 'confirm'].indexOf(step)
                    ? 'bg-gradient-to-r from-teal-400 to-teal-500'
                    : 'bg-navy-700'
                  }
                `}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 font-display">
            <span className={step === 'pick_stock' ? 'text-teal-400' : ''}>Pick a stock</span>
            <span className={step === 'pick_shares' ? 'text-teal-400' : ''}>Choose amount</span>
            <span className={step === 'confirm' ? 'text-teal-400' : ''}>Confirm</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        {/* Step 1: Pick Stock */}
        {step === 'pick_stock' && (
          <div className="w-full max-w-lg text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-400 text-sm font-display font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Your First Trade
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-cream-100 mb-3">
              Pick a stock to invest in!
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              Choose a company you know and love. This is just the beginning!
            </p>

            {/* Stock options */}
            <div className="grid gap-3 mb-8">
              {FIRST_TRADE_STOCKS.map((stock) => {
                const price = BASE_STOCK_PRICES[stock.ticker]?.price || 0
                const isSelected = selectedTicker === stock.ticker

                return (
                  <button
                    key={stock.ticker}
                    onClick={() => handleSelectStock(stock.ticker)}
                    className={`
                      flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200
                      border-2
                      ${isSelected
                        ? 'border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/20'
                        : 'border-white/10 bg-navy-800 hover:border-white/20 hover:bg-navy-700'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className="text-4xl">{stock.icon}</div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-display font-bold ${isSelected ? 'text-teal-400' : 'text-cream-100'}`}>
                          {stock.name}
                        </span>
                        <span className="text-xs text-slate-500 bg-navy-900 px-2 py-0.5 rounded">
                          {stock.ticker}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{stock.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className={`font-display font-bold ${isSelected ? 'text-teal-400' : 'text-cream-100'}`}>
                        ${price.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-500">per share</div>
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-navy-900" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <button
              onClick={handleContinueToShares}
              disabled={!selectedTicker}
              className={`
                inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                font-display font-bold text-lg
                transition-all duration-300
                ${selectedTicker
                  ? 'text-navy-900 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 shadow-lg shadow-teal-500/30'
                  : 'text-slate-500 bg-navy-800 border border-white/10 cursor-not-allowed'
                }
              `}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Pick Shares */}
        {step === 'pick_shares' && selectedStock && (
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-display font-bold text-cream-100 mb-2">
              How many shares?
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              You have ${cashBalance.toLocaleString()} to invest
            </p>

            {/* Selected stock card */}
            <div className="p-6 rounded-2xl bg-navy-800 border border-white/10 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">{selectedStock.icon}</span>
                <div>
                  <div className="font-display font-bold text-cream-100">{selectedStock.name}</div>
                  <div className="text-sm text-slate-400">${stockPrice.toFixed(2)} per share</div>
                </div>
              </div>

              {/* Shares selector */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <button
                  onClick={() => setShares(Math.max(1, shares - 1))}
                  disabled={shares <= 1}
                  className="w-14 h-14 rounded-2xl bg-navy-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cream-100 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-teal-400">{shares}</div>
                  <div className="text-sm text-slate-500">share{shares > 1 ? 's' : ''}</div>
                </div>

                <button
                  onClick={() => setShares(Math.min(maxShares, shares + 1))}
                  disabled={shares >= maxShares}
                  className="w-14 h-14 rounded-2xl bg-navy-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cream-100 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              {/* Quick buttons */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 5, 10].filter((n) => n <= maxShares).map((n) => (
                  <button
                    key={n}
                    onClick={() => setShares(n)}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all
                      ${shares === n
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                        : 'bg-navy-900 text-slate-400 border border-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    {n} share{n > 1 ? 's' : ''}
                  </button>
                ))}
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-sm text-slate-400 mb-1">Total cost</div>
                <div className="text-3xl font-display font-bold text-cream-100">
                  ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-slate-300 bg-navy-800 border border-white/10 hover:border-white/20 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleContinueToConfirm}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-display font-bold text-navy-900 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 shadow-lg shadow-teal-500/30 transition-all"
              >
                Review Order
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && selectedStock && (
          <div className="w-full max-w-md text-center">
            <h1 className="text-3xl font-display font-bold text-cream-100 mb-2">
              Confirm your trade
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              Review your order before buying
            </p>

            {/* Order summary */}
            <div className="p-6 rounded-2xl bg-navy-800 border border-teal-500/30 mb-8">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-slate-400">Stock</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedStock.icon}</span>
                  <span className="font-display font-bold text-cream-100">{selectedStock.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <span className="text-slate-400">Shares</span>
                <span className="font-display font-bold text-cream-100">{shares}</span>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <span className="text-slate-400">Price per share</span>
                <span className="font-display font-bold text-cream-100">${stockPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-lg text-slate-300">Total</span>
                <span className="text-2xl font-display font-bold text-teal-400">
                  ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-slate-300 bg-navy-800 border border-white/10 hover:border-white/20 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Edit
              </button>

              <button
                onClick={handleConfirmPurchase}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-lg text-navy-900 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 shadow-lg shadow-teal-500/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                    Buying...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Buy {shares} share{shares > 1 ? 's' : ''}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
