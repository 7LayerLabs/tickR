'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { Portfolio } from '@/types'
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      try {
        return await apiClient.getPortfolio()
      } catch (err) {
        console.error('Failed to fetch portfolio:', err)
        throw err
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  useEffect(() => {
    if (data) {
      setPortfolio(data)
    }
  }, [data])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading portfolio...</p>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-600">Failed to load portfolio</p>
      </div>
    )
  }

  const dailyChangeColor = portfolio.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
  const dailyChangeIcon = portfolio.dailyChange >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-gray-600 text-sm font-medium mb-2">Total Portfolio Value</h1>
        <div className="flex items-end gap-4">
          <h2 className="text-4xl font-bold text-gray-900">
            ${portfolio.totalValue.toFixed(2)}
          </h2>
          <div className={`flex items-center gap-2 text-lg font-bold ${dailyChangeColor}`}>
            {dailyChangeIcon}
            <span>
              {portfolio.dailyChange >= 0 ? '+' : ''}
              ${Math.abs(portfolio.dailyChange).toFixed(2)} ({portfolio.dailyChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4">Cash balance: ${portfolio.cashBalance.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard/stocks"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Buy More Stocks
        </Link>
        <Link
          href="/dashboard/learn"
          className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition"
        >
          Learn
        </Link>
      </div>

      {/* Holdings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Holdings</h2>

        {portfolio.positions.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't bought any stocks yet</p>
            <Link
              href="/dashboard/stocks"
              className="text-blue-600 font-bold hover:underline"
            >
              Start by buying your first stock →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {portfolio.positions.map((position) => (
              <Link
                key={position.id}
                href={`/dashboard/stock/${position.ticker}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{position.ticker}</div>
                    <div className="text-sm text-gray-600">
                      {position.shares} shares @ ${position.currentPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{position.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${position.currentValue.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">
                      {position.percentOfPortfolio.toFixed(1)}% of portfolio
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Diversification */}
      {portfolio.positions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sector Diversification</h2>
          <div className="space-y-2">
            {Object.entries(portfolio.positions.reduce((sectors: Record<string, number>, pos) => {
              sectors[pos.sector] = (sectors[pos.sector] || 0) + pos.percentOfPortfolio
              return sectors
            }, {})).map(([sector, percentage]) => (
              <div key={sector} className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{sector}</span>
                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-900 min-w-12 text-right">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
