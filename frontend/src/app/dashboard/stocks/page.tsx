'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSector, setSelectedSector] = useState<string | null>(null)

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: () => apiClient.getAllSectors(),
  })

  const { data: stocks, isLoading } = useQuery({
    queryKey: ['stocks', selectedSector],
    queryFn: () => {
      if (selectedSector) {
        return apiClient.getStocksBySector(selectedSector)
      }
      return { stocks: [] }
    },
  })

  const { data: searchResults } = useQuery({
    queryKey: ['search-stocks', searchQuery],
    queryFn: () => {
      if (searchQuery.trim()) {
        return apiClient.searchStocks(searchQuery)
      }
      return { stocks: [] }
    },
  })

  const displayStocks = searchQuery.trim() ? (searchResults?.stocks || []) : (stocks?.stocks || [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Explore Stocks</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ticker or company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sector Filter */}
        {!searchQuery.trim() && (
          <div>
            <h2 className="font-bold text-gray-900 mb-3">Sectors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              <button
                onClick={() => setSelectedSector(null)}
                className={`p-3 rounded-lg text-center font-medium transition ${
                  selectedSector === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
                }`}
              >
                All
              </button>
              {sectors?.sectors?.map((sector: any) => (
                <button
                  key={sector.name}
                  onClick={() => setSelectedSector(sector.name)}
                  className={`p-3 rounded-lg text-center font-medium transition ${
                    selectedSector === sector.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {sector.icon} {sector.displayName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stock List */}
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-gray-600">Loading stocks...</p>
        ) : displayStocks.length === 0 ? (
          <p className="text-gray-600">No stocks found</p>
        ) : (
          displayStocks.map((stock: any) => (
            <Link
              key={stock.ticker}
              href={`/dashboard/stock/${stock.ticker}`}
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-600 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-lg text-gray-900">{stock.ticker}</div>
                  <div className="text-gray-600">{stock.companyName}</div>
                  <div className="text-sm text-gray-500 mt-1">{stock.sector}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 text-lg">${stock.price.toFixed(2)}</div>
                  <div className={`font-bold text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
