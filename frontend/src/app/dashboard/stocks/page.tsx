'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, TrendingUp, TrendingDown, Sparkles, Star, Flame, ArrowRight, Zap, Loader2 } from 'lucide-react'

// Mock data for preview
const MOCK_SECTORS = [
  { name: 'Technology', displayName: 'Tech', icon: '💻', color: '#0ea5e9' },
  { name: 'Entertainment', displayName: 'Movies & TV', icon: '🎬', color: '#ec4899' },
  { name: 'Consumer', displayName: 'Shopping', icon: '🛍️', color: '#f59e0b' },
  { name: 'Gaming', displayName: 'Gaming', icon: '🎮', color: '#8b5cf6' },
  { name: 'Food', displayName: 'Food', icon: '🍔', color: '#ef4444' },
  { name: 'Sports', displayName: 'Sports', icon: '⚽', color: '#10b981' },
  { name: 'Finance', displayName: 'Banks', icon: '🏦', color: '#6366f1' },
  { name: 'Automotive', displayName: 'Cars', icon: '🚗', color: '#14b8a6' },
]

const MOCK_STOCKS = [
  // ============ TECHNOLOGY (15) ============
  { ticker: 'AAPL', companyName: 'Apple Inc.', sector: 'Technology', price: 187.44, changePercent: 2.34, popular: true, description: 'Makes the iPhone, iPad, Mac, and Apple Watch.', whyKidsKnow: 'You probably have an iPhone or use AirPods!' },
  { ticker: 'MSFT', companyName: 'Microsoft Corporation', sector: 'Technology', price: 378.91, changePercent: 1.12, popular: true, description: 'Owns Xbox, Minecraft, and makes Windows computers.', whyKidsKnow: 'They make Xbox, Minecraft, and the computers at school!' },
  { ticker: 'GOOGL', companyName: 'Alphabet Inc.', sector: 'Technology', price: 141.80, changePercent: -0.45, description: 'Owns Google, YouTube, and Android phones.', whyKidsKnow: 'You use Google Search and watch YouTube every day!' },
  { ticker: 'NVDA', companyName: 'NVIDIA Corporation', sector: 'Technology', price: 495.22, changePercent: 4.21, hot: true, description: 'Makes powerful graphics cards for gaming and AI.', whyKidsKnow: 'Their GPUs power the best gaming PCs and AI like ChatGPT!' },
  { ticker: 'META', companyName: 'Meta Platforms', sector: 'Technology', price: 612.77, changePercent: 2.15, description: 'Owns Facebook, Instagram, WhatsApp, and makes VR headsets.', whyKidsKnow: 'They own Instagram and make the Quest VR headset!' },
  { ticker: 'AMD', companyName: 'Advanced Micro Devices', sector: 'Technology', price: 178.50, changePercent: 3.45, description: 'Makes processors and graphics cards for computers and consoles.', whyKidsKnow: 'Powers PlayStation 5 and Xbox Series X!' },
  { ticker: 'INTC', companyName: 'Intel Corporation', sector: 'Technology', price: 42.30, changePercent: -1.23, description: 'Makes computer processors and chips.', whyKidsKnow: 'Intel Inside - the chips in many laptops!' },
  { ticker: 'CRM', companyName: 'Salesforce', sector: 'Technology', price: 342.18, changePercent: 0.89, description: 'Business software for companies.', whyKidsKnow: 'Helps businesses manage customers!' },
  { ticker: 'ORCL', companyName: 'Oracle Corporation', sector: 'Technology', price: 125.60, changePercent: 0.56, description: 'Database and cloud software for businesses.', whyKidsKnow: 'Runs many apps and websites behind the scenes!' },
  { ticker: 'CSCO', companyName: 'Cisco Systems', sector: 'Technology', price: 52.40, changePercent: 0.34, description: 'Makes internet networking equipment.', whyKidsKnow: 'Helps connect the internet together!' },
  { ticker: 'IBM', companyName: 'IBM', sector: 'Technology', price: 168.90, changePercent: 0.67, description: 'Enterprise computing and AI technology.', whyKidsKnow: 'Made Watson, the AI that won Jeopardy!' },
  { ticker: 'ADBE', companyName: 'Adobe Inc.', sector: 'Technology', price: 485.20, changePercent: 1.45, description: 'Makes Photoshop, Premiere, and creative software.', whyKidsKnow: 'Photoshop - where all the memes are made!' },
  { ticker: 'PLTR', companyName: 'Palantir Technologies', sector: 'Technology', price: 24.50, changePercent: 5.67, hot: true, description: 'AI and data analytics software.', whyKidsKnow: 'AI company named after Lord of the Rings!' },
  { ticker: 'SNOW', companyName: 'Snowflake', sector: 'Technology', price: 185.30, changePercent: 2.34, description: 'Cloud data platform.', whyKidsKnow: 'Stores data in the cloud!' },
  { ticker: 'NET', companyName: 'Cloudflare', sector: 'Technology', price: 98.70, changePercent: 1.89, description: 'Internet security and performance.', whyKidsKnow: 'Keeps websites fast and safe!' },

  // ============ ENTERTAINMENT (12) ============
  { ticker: 'NFLX', companyName: 'Netflix, Inc.', sector: 'Entertainment', price: 485.20, changePercent: 3.15, hot: true, description: 'Streaming service with movies, shows, and originals.', whyKidsKnow: 'Where you binge Stranger Things and One Piece!' },
  { ticker: 'DIS', companyName: 'The Walt Disney Company', sector: 'Entertainment', price: 112.30, changePercent: 0.89, description: 'Theme parks, Marvel, Star Wars, Pixar, and Disney+.', whyKidsKnow: 'Marvel movies, Star Wars, and Disney World!' },
  { ticker: 'SPOT', companyName: 'Spotify Technology', sector: 'Entertainment', price: 295.80, changePercent: 2.45, popular: true, description: 'Music streaming with millions of songs and podcasts.', whyKidsKnow: 'Where you make playlists and discover new music!' },
  { ticker: 'PARA', companyName: 'Paramount Global', sector: 'Entertainment', price: 11.82, changePercent: 0.67, description: 'Movies, Paramount+, Nickelodeon, MTV.', whyKidsKnow: 'SpongeBob and Nickelodeon are theirs!' },
  { ticker: 'WBD', companyName: 'Warner Bros. Discovery', sector: 'Entertainment', price: 12.45, changePercent: -1.23, description: 'HBO Max, DC movies, Cartoon Network.', whyKidsKnow: 'Batman, Superman, and Cartoon Network!' },
  { ticker: 'CMCSA', companyName: 'Comcast Corporation', sector: 'Entertainment', price: 42.15, changePercent: 0.34, description: 'Universal Studios, NBC, Peacock streaming.', whyKidsKnow: 'Universal Studios theme parks and movies!' },
  { ticker: 'LYV', companyName: 'Live Nation Entertainment', sector: 'Entertainment', price: 105.80, changePercent: 1.56, description: 'Concert tickets and live events.', whyKidsKnow: 'Where you buy concert tickets!' },
  { ticker: 'ROKU', companyName: 'Roku, Inc.', sector: 'Entertainment', price: 68.90, changePercent: 2.12, description: 'Streaming devices and smart TVs.', whyKidsKnow: 'The streaming stick on your TV!' },
  { ticker: 'SNAP', companyName: 'Snap Inc.', sector: 'Entertainment', price: 15.40, changePercent: -0.89, description: 'Snapchat - photos, stories, and AR filters.', whyKidsKnow: 'Snapchat streaks and funny filters!' },
  { ticker: 'PINS', companyName: 'Pinterest', sector: 'Entertainment', price: 32.50, changePercent: 1.23, description: 'Visual discovery and idea sharing platform.', whyKidsKnow: 'Where you find DIY ideas and aesthetic boards!' },
  { ticker: 'RDDT', companyName: 'Reddit', sector: 'Entertainment', price: 78.30, changePercent: 4.56, hot: true, description: 'Community forums and discussions.', whyKidsKnow: 'Where memes are born and communities thrive!' },
  { ticker: 'TME', companyName: 'Tencent Music', sector: 'Entertainment', price: 12.80, changePercent: 0.45, description: 'Music streaming in China.', whyKidsKnow: 'The Spotify of China!' },

  // ============ GAMING (10) ============
  { ticker: 'RBLX', companyName: 'Roblox Corporation', sector: 'Gaming', price: 45.20, changePercent: -2.11, popular: true, description: 'Gaming platform where you play and create games.', whyKidsKnow: 'Roblox! Play millions of games and earn Robux!' },
  { ticker: 'EA', companyName: 'Electronic Arts Inc.', sector: 'Gaming', price: 142.15, changePercent: 1.89, description: 'Video game company behind FIFA, Madden, and Apex.', whyKidsKnow: 'Makes EA Sports FC, Madden, and Apex Legends!' },
  { ticker: 'TTWO', companyName: 'Take-Two Interactive', sector: 'Gaming', price: 185.30, changePercent: 1.25, description: 'Makes GTA, NBA 2K, and Red Dead Redemption.', whyKidsKnow: 'GTA and NBA 2K are theirs!' },
  { ticker: 'NTDOY', companyName: 'Nintendo', sector: 'Gaming', price: 14.50, changePercent: 0.85, description: 'Mario, Zelda, Pokemon, and Switch console.', whyKidsKnow: 'Mario, Pokemon, and the Nintendo Switch!' },
  { ticker: 'SONY', companyName: 'Sony Group', sector: 'Gaming', price: 92.30, changePercent: 1.45, description: 'PlayStation, movies, music, and electronics.', whyKidsKnow: 'PlayStation and Spider-Man movies!' },
  { ticker: 'GME', companyName: 'GameStop', sector: 'Gaming', price: 15.80, changePercent: 3.45, description: 'Video game retail stores.', whyKidsKnow: 'The gaming store at the mall!' },
  { ticker: 'U', companyName: 'Unity Software', sector: 'Gaming', price: 22.85, changePercent: -2.10, description: 'Game development engine and tools.', whyKidsKnow: 'Many mobile games are made with Unity!' },
  { ticker: 'ATVI', companyName: 'Activision Blizzard', sector: 'Gaming', price: 95.12, changePercent: 0.45, description: 'Call of Duty, World of Warcraft, Candy Crush.', whyKidsKnow: 'Call of Duty and Candy Crush!' },
  { ticker: 'DKNG', companyName: 'DraftKings', sector: 'Gaming', price: 42.15, changePercent: 2.34, hot: true, description: 'Sports betting and fantasy sports.', whyKidsKnow: 'Fantasy sports and betting ads everywhere!' },
  { ticker: 'SKLZ', companyName: 'Skillz', sector: 'Gaming', price: 8.50, changePercent: -1.23, description: 'Mobile esports and gaming competitions.', whyKidsKnow: 'Win real prizes playing mobile games!' },

  // ============ CONSUMER/SHOPPING (12) ============
  { ticker: 'NKE', companyName: 'Nike, Inc.', sector: 'Consumer', price: 98.45, changePercent: 1.67, description: 'World\'s biggest sports brand for shoes and gear.', whyKidsKnow: 'Makes the sneakers your favorite athletes wear!' },
  { ticker: 'LULU', companyName: 'Lululemon', sector: 'Consumer', price: 385.20, changePercent: 1.45, description: 'Athletic apparel and yoga wear.', whyKidsKnow: 'The leggings everyone wears!' },
  { ticker: 'TGT', companyName: 'Target Corporation', sector: 'Consumer', price: 142.50, changePercent: 0.32, description: 'Retail stores with everything you need.', whyKidsKnow: 'Target runs with mom!' },
  { ticker: 'AMZN', companyName: 'Amazon.com', sector: 'Consumer', price: 225.94, changePercent: 0.85, popular: true, description: 'Online shopping giant with fast delivery.', whyKidsKnow: 'Two-day shipping on everything!' },
  { ticker: 'WMT', companyName: 'Walmart', sector: 'Consumer', price: 165.30, changePercent: 0.45, description: 'Biggest retail store chain in the world.', whyKidsKnow: 'Walmart has everything!' },
  { ticker: 'COST', companyName: 'Costco Wholesale', sector: 'Consumer', price: 745.80, changePercent: 0.89, description: 'Membership warehouse with bulk items.', whyKidsKnow: 'Giant store with free samples!' },
  { ticker: 'ETSY', companyName: 'Etsy', sector: 'Consumer', price: 78.40, changePercent: 1.23, description: 'Marketplace for handmade and vintage items.', whyKidsKnow: 'Unique handmade stuff and custom gifts!' },
  { ticker: 'ADDYY', companyName: 'Adidas', sector: 'Consumer', price: 118.50, changePercent: 0.89, description: 'Sports shoes, clothing, and accessories.', whyKidsKnow: 'Three stripes - Yeezys and soccer cleats!' },
  { ticker: 'HD', companyName: 'Home Depot', sector: 'Consumer', price: 345.60, changePercent: 0.56, description: 'Home improvement retail stores.', whyKidsKnow: 'Where parents buy stuff for the house!' },
  { ticker: 'LOW', companyName: "Lowe's Companies", sector: 'Consumer', price: 225.40, changePercent: 0.34, description: 'Home improvement retail chain.', whyKidsKnow: 'Another big home store!' },
  { ticker: 'EBAY', companyName: 'eBay Inc.', sector: 'Consumer', price: 45.60, changePercent: 0.67, description: 'Online marketplace and auctions.', whyKidsKnow: 'Buy and sell stuff online!' },
  { ticker: 'BURL', companyName: 'Burlington Stores', sector: 'Consumer', price: 185.30, changePercent: 1.12, description: 'Off-price retail stores.', whyKidsKnow: 'Deals on clothes and home stuff!' },

  // ============ FOOD (12) ============
  { ticker: 'SBUX', companyName: 'Starbucks Corporation', sector: 'Food', price: 95.40, changePercent: 0.34, description: 'Global coffee chain with drinks and snacks.', whyKidsKnow: 'Pink drinks, Frappuccinos, and cake pops!' },
  { ticker: 'MCD', companyName: "McDonald's Corporation", sector: 'Food', price: 295.80, changePercent: 0.45, popular: true, description: 'Fast food restaurants worldwide.', whyKidsKnow: "Happy Meals and Big Macs - I'm lovin' it!" },
  { ticker: 'CMG', companyName: 'Chipotle Mexican Grill', sector: 'Food', price: 62.50, changePercent: 1.23, description: 'Fast-casual Mexican food.', whyKidsKnow: 'Burritos and bowls!' },
  { ticker: 'DPZ', companyName: "Domino's Pizza", sector: 'Food', price: 435.20, changePercent: 0.67, description: 'Pizza delivery chain.', whyKidsKnow: 'Pizza delivered to your door!' },
  { ticker: 'KO', companyName: 'Coca-Cola Company', sector: 'Food', price: 62.30, changePercent: 0.23, description: 'Soft drinks including Coke, Sprite, and Fanta.', whyKidsKnow: 'Coca-Cola, Sprite, and Fanta!' },
  { ticker: 'PEP', companyName: 'PepsiCo', sector: 'Food', price: 172.40, changePercent: 0.45, description: 'Pepsi, Mountain Dew, Lay\'s chips, Gatorade.', whyKidsKnow: 'Pepsi, Doritos, and Gatorade!' },
  { ticker: 'MNST', companyName: 'Monster Beverage', sector: 'Food', price: 52.80, changePercent: 1.56, description: 'Energy drinks.', whyKidsKnow: 'Monster Energy drinks!' },
  { ticker: 'YUM', companyName: 'Yum! Brands', sector: 'Food', price: 138.50, changePercent: 0.34, description: 'Owns Taco Bell, KFC, and Pizza Hut.', whyKidsKnow: 'Taco Bell, KFC, and Pizza Hut!' },
  { ticker: 'QSR', companyName: 'Restaurant Brands', sector: 'Food', price: 72.30, changePercent: 0.56, description: 'Owns Burger King, Popeyes, Tim Hortons.', whyKidsKnow: 'Burger King and Popeyes chicken!' },
  { ticker: 'WEN', companyName: "Wendy's Company", sector: 'Food', price: 18.90, changePercent: 0.89, description: 'Fast food known for fresh beef burgers.', whyKidsKnow: "Wendy's Frosty and spicy nuggets!" },
  { ticker: 'DASH', companyName: 'DoorDash', sector: 'Food', price: 142.30, changePercent: 2.34, description: 'Food delivery service.', whyKidsKnow: 'Get food delivered from anywhere!' },
  { ticker: 'UBER', companyName: 'Uber Technologies', sector: 'Food', price: 78.50, changePercent: 1.45, description: 'Ride-sharing and food delivery.', whyKidsKnow: 'Uber rides and Uber Eats delivery!' },

  // ============ SPORTS (10) ============
  { ticker: 'DKS', companyName: "Dick's Sporting Goods", sector: 'Sports', price: 215.30, changePercent: 0.89, description: 'Sporting goods retail stores.', whyKidsKnow: 'Where you buy sports equipment!' },
  { ticker: 'PTON', companyName: 'Peloton Interactive', sector: 'Sports', price: 5.20, changePercent: -1.45, description: 'Connected fitness bikes and workouts.', whyKidsKnow: 'The exercise bike with classes!' },
  { ticker: 'UAA', companyName: 'Under Armour', sector: 'Sports', price: 8.95, changePercent: 0.67, description: 'Sports clothing and gear.', whyKidsKnow: 'Sports gear with the cool logo!' },
  { ticker: 'LULU', companyName: 'Lululemon', sector: 'Sports', price: 385.20, changePercent: 1.45, description: 'Athletic apparel and yoga wear.', whyKidsKnow: 'The leggings everyone wears!' },
  { ticker: 'FL', companyName: 'Foot Locker', sector: 'Sports', price: 28.50, changePercent: -0.67, description: 'Athletic footwear and apparel retail.', whyKidsKnow: 'The sneaker store at the mall!' },
  { ticker: 'PLNT', companyName: 'Planet Fitness', sector: 'Sports', price: 72.40, changePercent: 1.23, description: 'Low-cost gym franchise.', whyKidsKnow: 'The purple and yellow gym!' },
  { ticker: 'GOLF', companyName: 'Acushnet Holdings', sector: 'Sports', price: 68.90, changePercent: 0.45, description: 'Titleist golf balls and equipment.', whyKidsKnow: 'Makes golf balls and clubs!' },
  { ticker: 'BC', companyName: 'Brunswick Corporation', sector: 'Sports', price: 85.30, changePercent: 0.78, description: 'Boats, fitness equipment, and bowling.', whyKidsKnow: 'Makes boats and bowling stuff!' },
  { ticker: 'XPOF', companyName: 'Xponential Fitness', sector: 'Sports', price: 18.50, changePercent: 2.34, description: 'Boutique fitness studios.', whyKidsKnow: 'Trendy workout classes!' },
  { ticker: 'ASO', companyName: 'Academy Sports', sector: 'Sports', price: 58.40, changePercent: 0.56, description: 'Sports and outdoors retail chain.', whyKidsKnow: 'Another big sports store!' },

  // ============ FINANCE/BANKS (12) ============
  { ticker: 'V', companyName: 'Visa Inc.', sector: 'Finance', price: 275.40, changePercent: 0.56, description: 'Payment card network used worldwide.', whyKidsKnow: 'The card your parents use everywhere!' },
  { ticker: 'MA', companyName: 'Mastercard', sector: 'Finance', price: 458.90, changePercent: 0.78, description: 'Global payment network.', whyKidsKnow: 'Another card everyone uses!' },
  { ticker: 'JPM', companyName: 'JPMorgan Chase', sector: 'Finance', price: 195.60, changePercent: 0.45, description: 'Largest bank in the United States.', whyKidsKnow: 'The big bank with Chase cards!' },
  { ticker: 'SQ', companyName: 'Block, Inc.', sector: 'Finance', price: 78.30, changePercent: 1.89, description: 'Cash App and Square payment systems.', whyKidsKnow: 'Cash App for sending money to friends!' },
  { ticker: 'BAC', companyName: 'Bank of America', sector: 'Finance', price: 35.80, changePercent: 0.34, description: 'Major US bank.', whyKidsKnow: 'Bank of America ATMs everywhere!' },
  { ticker: 'WFC', companyName: 'Wells Fargo', sector: 'Finance', price: 52.40, changePercent: 0.45, description: 'Major US bank.', whyKidsKnow: 'The bank with the stagecoach logo!' },
  { ticker: 'GS', companyName: 'Goldman Sachs', sector: 'Finance', price: 385.60, changePercent: 0.67, description: 'Investment bank and financial services.', whyKidsKnow: 'A famous Wall Street bank!' },
  { ticker: 'PYPL', companyName: 'PayPal Holdings', sector: 'Finance', price: 68.90, changePercent: 1.23, description: 'Online payments and money transfers.', whyKidsKnow: 'Send money online and pay on websites!' },
  { ticker: 'COIN', companyName: 'Coinbase Global', sector: 'Finance', price: 185.40, changePercent: 4.56, hot: true, description: 'Cryptocurrency exchange platform.', whyKidsKnow: 'Where people buy Bitcoin and crypto!' },
  { ticker: 'SOFI', companyName: 'SoFi Technologies', sector: 'Finance', price: 9.80, changePercent: 2.34, description: 'Digital banking and investing app.', whyKidsKnow: 'The stadium where the Rams play!' },
  { ticker: 'AXP', companyName: 'American Express', sector: 'Finance', price: 215.30, changePercent: 0.56, description: 'Credit cards and travel services.', whyKidsKnow: 'The fancy credit card!' },
  { ticker: 'C', companyName: 'Citigroup', sector: 'Finance', price: 58.40, changePercent: 0.34, description: 'Global banking corporation.', whyKidsKnow: 'Citi Bank - another big bank!' },

  // ============ AUTOMOTIVE/CARS (10) ============
  { ticker: 'TSLA', companyName: 'Tesla, Inc.', sector: 'Automotive', price: 248.50, changePercent: -1.23, hot: true, description: 'Electric cars and self-driving technology.', whyKidsKnow: 'Cool electric cars that can drive themselves!' },
  { ticker: 'F', companyName: 'Ford Motor Company', sector: 'Automotive', price: 10.25, changePercent: -0.85, description: 'Cars and trucks including the Mustang and F-150.', whyKidsKnow: 'Mustangs and F-150 trucks everywhere!' },
  { ticker: 'GM', companyName: 'General Motors', sector: 'Automotive', price: 54.30, changePercent: 1.12, description: 'Chevrolet, GMC, Cadillac, and electric vehicles.', whyKidsKnow: 'Chevy trucks and the Corvette!' },
  { ticker: 'RIVN', companyName: 'Rivian Automotive', sector: 'Automotive', price: 14.85, changePercent: -2.34, description: 'Electric trucks and SUVs.', whyKidsKnow: 'Cool electric adventure trucks!' },
  { ticker: 'LCID', companyName: 'Lucid Group', sector: 'Automotive', price: 3.42, changePercent: -1.56, description: 'Luxury electric vehicles.', whyKidsKnow: 'Super fast luxury electric cars!' },
  { ticker: 'TM', companyName: 'Toyota Motor', sector: 'Automotive', price: 185.60, changePercent: 0.45, description: 'Cars, trucks, and hybrid vehicles.', whyKidsKnow: 'Camry, Corolla - cars everyone drives!' },
  { ticker: 'HMC', companyName: 'Honda Motor', sector: 'Automotive', price: 32.80, changePercent: 0.34, description: 'Cars, motorcycles, and power equipment.', whyKidsKnow: 'Civics and cool motorcycles!' },
  { ticker: 'STLA', companyName: 'Stellantis', sector: 'Automotive', price: 18.50, changePercent: -0.67, description: 'Jeep, Dodge, Ram, and Chrysler.', whyKidsKnow: 'Jeeps and Dodge Challengers!' },
  { ticker: 'NIO', companyName: 'NIO Inc.', sector: 'Automotive', price: 7.80, changePercent: 2.34, description: 'Chinese electric vehicle company.', whyKidsKnow: 'Tesla of China!' },
  { ticker: 'XPEV', companyName: 'XPeng Inc.', sector: 'Automotive', price: 12.50, changePercent: 1.89, description: 'Chinese smart electric vehicles.', whyKidsKnow: 'Another cool EV company from China!' },
]

const STOCK_COLORS = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ec4899', '#ef4444', '#6366f1', '#14b8a6']

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const sectors = MOCK_SECTORS
  const isLoading = false

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true)
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(searchQuery)}`)
        const data = await res.json()
        setSearchResults(data.stocks || [])
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      }
      setIsSearching(false)
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  let displayStocks: any[] = []
  if (searchQuery.trim()) {
    // Use API search results, fallback to local filter
    displayStocks = searchResults.length > 0
      ? searchResults
      : MOCK_STOCKS.filter(s =>
          s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        )
  } else if (selectedSector) {
    displayStocks = MOCK_STOCKS.filter(s => s.sector === selectedSector)
  } else {
    displayStocks = MOCK_STOCKS
  }

  const trendingStocks = MOCK_STOCKS.filter(s => s.hot || s.popular).slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 p-8 text-white">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Discover & Invest</span>
          </div>
          <h1 className="text-4xl font-display font-bold mb-3">Find Your Next Investment</h1>
          <p className="text-white/80 mb-6 max-w-lg">Search 500+ real companies. Learn what they do. Build your dream portfolio.</p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            {isSearching ? (
              <Loader2 className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 animate-spin" />
            ) : (
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            )}
            <input
              type="text"
              placeholder="Search Apple, Tesla, Nike, Roblox..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all text-lg font-medium shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Trending Section */}
      {!searchQuery.trim() && !selectedSector && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-400 to-red-500">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Trending Now</h2>
            <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">HOT</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingStocks.map((stock, index) => (
              <Link
                key={stock.ticker}
                href={`/dashboard/stock/${stock.ticker}`}
                className="group relative p-5 rounded-2xl bg-white border-2 border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${STOCK_COLORS[index]}10, ${STOCK_COLORS[index]}05)` }}
                />

                {/* Badge */}
                {stock.hot && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg">
                      🔥 HOT
                    </span>
                  </div>
                )}
                {stock.popular && !stock.hot && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg">
                      ⭐ POPULAR
                    </span>
                  </div>
                )}

                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${STOCK_COLORS[index]}, ${STOCK_COLORS[index]}cc)` }}
                  >
                    {stock.ticker.slice(0, 2)}
                  </div>
                  <div className="text-xl font-bold text-slate-800 mb-0.5">{stock.ticker}</div>
                  <div className="text-sm text-slate-500 mb-2 truncate">{stock.companyName}</div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                    {stock.description}
                  </p>

                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-slate-800">${stock.price.toFixed(2)}</div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold ${
                      stock.changePercent >= 0
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {stock.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sector Filter */}
      {!searchQuery.trim() && (
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 border-black/10 overflow-hidden">
          {/* Decorative gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400 via-cyan-400 via-blue-400 via-purple-400 to-pink-400 opacity-20" style={{ padding: '2px' }}>
            <div className="absolute inset-[2px] rounded-[22px] bg-white" />
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-br-full" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-tr-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-tl-full" />

          <div className="relative">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-200">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Browse by Category
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 via-purple-200 to-transparent" />
            </div>

            <div className="grid grid-cols-4 lg:grid-cols-9 gap-3">
              {/* All Button */}
              <button
                onClick={() => setSelectedSector(null)}
                className={`group p-4 rounded-2xl text-center transition-all duration-200 ${
                  selectedSector === null
                    ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-200 scale-105'
                    : 'bg-white border-2 border-slate-100 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">✨</div>
                <span className={`text-sm font-semibold ${selectedSector === null ? 'text-white' : 'text-slate-600'}`}>
                  All
                </span>
              </button>

              {/* Sector Buttons */}
              {sectors.map((sector: any, index: number) => {
                const isActive = selectedSector === sector.name
                const color = sector.color || STOCK_COLORS[index % STOCK_COLORS.length]

                return (
                  <button
                    key={sector.name}
                    onClick={() => setSelectedSector(sector.name)}
                    className={`group p-4 rounded-2xl text-center transition-all duration-200 ${
                      isActive
                        ? 'text-white shadow-lg scale-105'
                        : 'bg-white border-2 border-slate-100 hover:shadow-md'
                    }`}
                    style={isActive ? {
                      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                      boxShadow: `0 10px 40px ${color}40`
                    } : {
                      borderColor: `${color}30`
                    }}
                  >
                    <div className="text-2xl mb-2">{sector.icon}</div>
                    <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-600'}`}>
                      {sector.displayName}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Search Results Label */}
      {searchQuery.trim() && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
          <Search className="w-5 h-5 text-blue-500" />
          <span className="text-blue-700">
            Showing results for <strong>"{searchQuery}"</strong>
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="ml-auto px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Selected Sector Header */}
      {selectedSector && !searchQuery.trim() && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{sectors.find((s: any) => s.name === selectedSector)?.icon}</span>
            <h2 className="text-xl font-bold text-slate-800">{selectedSector} Stocks</h2>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-600">
              {displayStocks.length} stocks
            </span>
          </div>
          <button
            onClick={() => setSelectedSector(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-semibold"
          >
            ← View All
          </button>
        </div>
      )}

      {/* Stock List */}
      <div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading amazing stocks...</p>
          </div>
        ) : displayStocks.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white border-2 border-dashed border-slate-200">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-bold text-slate-700 mb-2">No stocks found</p>
            <p className="text-slate-500">Try a different search or browse categories above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayStocks.map((stock: any, index: number) => {
              const isPositive = stock.changePercent >= 0
              const color = STOCK_COLORS[index % STOCK_COLORS.length]

              return (
                <Link
                  key={stock.ticker}
                  href={`/dashboard/stock/${stock.ticker}`}
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-white border-2 border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                >
                  {/* Ticker Badge */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                  >
                    {stock.ticker.slice(0, 2)}
                  </div>

                  {/* Stock Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xl text-slate-800">{stock.ticker}</span>
                      {stock.hot && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-red-500 text-white">
                          🔥 HOT
                        </span>
                      )}
                      {stock.popular && !stock.hot && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-white">
                          ⭐ POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm">{stock.companyName}</p>
                    {/* Description */}
                    {stock.description && (
                      <p className="text-slate-600 text-sm mt-1 line-clamp-1">{stock.description}</p>
                    )}
                    {stock.whyKidsKnow && (
                      <p className="text-emerald-600 text-xs mt-1 font-medium">💡 {stock.whyKidsKnow}</p>
                    )}
                  </div>

                  {/* Price & Change */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-slate-800">${stock.price.toFixed(2)}</div>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold ${
                      isPositive
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-1">500+</div>
          <div className="text-slate-600 font-medium">Real Stocks</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 text-center">
          <div className="text-4xl font-bold text-purple-600 mb-1">$0</div>
          <div className="text-slate-600 font-medium">Trading Fees</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-center">
          <div className="flex items-center justify-center gap-2 text-4xl font-bold text-amber-600 mb-1">
            <Zap className="w-8 h-8" /> Live
          </div>
          <div className="text-slate-600 font-medium">Real Prices</div>
        </div>
      </div>
    </div>
  )
}
