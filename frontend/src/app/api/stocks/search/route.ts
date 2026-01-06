import { NextRequest, NextResponse } from 'next/server'

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

// Curated list of kid-friendly stocks with descriptions
const STOCK_DATABASE: Record<string, { name: string; sector: string; description: string; whyKidsKnow: string }> = {
  // Technology
  AAPL: { name: 'Apple Inc.', sector: 'Technology', description: 'Makes the iPhone, iPad, Mac, and Apple Watch.', whyKidsKnow: 'You probably have an iPhone or use AirPods!' },
  MSFT: { name: 'Microsoft Corporation', sector: 'Technology', description: 'Owns Xbox, Minecraft, and makes Windows computers.', whyKidsKnow: 'They make Xbox, Minecraft, and the computers at school!' },
  GOOGL: { name: 'Alphabet Inc.', sector: 'Technology', description: 'Owns Google, YouTube, and Android phones.', whyKidsKnow: 'You use Google Search and watch YouTube every day!' },
  GOOG: { name: 'Alphabet Inc. Class C', sector: 'Technology', description: 'Owns Google, YouTube, and Android phones.', whyKidsKnow: 'You use Google Search and watch YouTube every day!' },
  NVDA: { name: 'NVIDIA Corporation', sector: 'Technology', description: 'Makes powerful graphics cards for gaming and AI.', whyKidsKnow: 'Their GPUs power the best gaming PCs and AI like ChatGPT!' },
  META: { name: 'Meta Platforms', sector: 'Technology', description: 'Owns Facebook, Instagram, WhatsApp, and makes VR headsets.', whyKidsKnow: 'They own Instagram and make the Quest VR headset!' },
  AMZN: { name: 'Amazon.com', sector: 'Technology', description: 'Online shopping, Prime Video, Alexa, and cloud computing.', whyKidsKnow: 'Where your family orders everything and watches shows!' },
  AMD: { name: 'Advanced Micro Devices', sector: 'Technology', description: 'Makes processors and graphics cards for computers and consoles.', whyKidsKnow: 'Powers PlayStation 5 and Xbox Series X!' },
  INTC: { name: 'Intel Corporation', sector: 'Technology', description: 'Makes computer processors and chips.', whyKidsKnow: 'Intel Inside - the chips in many laptops!' },
  CRM: { name: 'Salesforce', sector: 'Technology', description: 'Business software for companies.', whyKidsKnow: 'Helps businesses manage customers!' },
  ORCL: { name: 'Oracle Corporation', sector: 'Technology', description: 'Database and cloud software for businesses.', whyKidsKnow: 'Runs many apps and websites behind the scenes!' },
  CSCO: { name: 'Cisco Systems', sector: 'Technology', description: 'Makes internet networking equipment.', whyKidsKnow: 'Helps connect the internet together!' },
  IBM: { name: 'IBM', sector: 'Technology', description: 'Enterprise computing and AI technology.', whyKidsKnow: 'Made Watson, the AI that won Jeopardy!' },
  ADBE: { name: 'Adobe Inc.', sector: 'Technology', description: 'Makes Photoshop, Premiere, and creative software.', whyKidsKnow: 'Photoshop - where all the memes are made!' },

  // Gaming
  RBLX: { name: 'Roblox Corporation', sector: 'Gaming', description: 'Gaming platform where you play and create games.', whyKidsKnow: 'Roblox! Play millions of games and earn Robux!' },
  EA: { name: 'Electronic Arts', sector: 'Gaming', description: 'Video game company behind FIFA, Madden, and Apex.', whyKidsKnow: 'Makes EA Sports FC, Madden, and Apex Legends!' },
  TTWO: { name: 'Take-Two Interactive', sector: 'Gaming', description: 'Makes GTA, NBA 2K, and Red Dead Redemption.', whyKidsKnow: 'GTA and NBA 2K are theirs!' },
  ATVI: { name: 'Activision Blizzard', sector: 'Gaming', description: 'Call of Duty, World of Warcraft, Candy Crush.', whyKidsKnow: 'Call of Duty and Candy Crush!' },
  NTDOY: { name: 'Nintendo', sector: 'Gaming', description: 'Mario, Zelda, Pokemon, and Switch console.', whyKidsKnow: 'Mario, Pokemon, and the Nintendo Switch!' },
  SONY: { name: 'Sony Group', sector: 'Gaming', description: 'PlayStation, movies, music, and electronics.', whyKidsKnow: 'PlayStation and Spider-Man movies!' },
  GME: { name: 'GameStop', sector: 'Gaming', description: 'Video game retail stores.', whyKidsKnow: 'The gaming store at the mall!' },
  U: { name: 'Unity Software', sector: 'Gaming', description: 'Game development engine and tools.', whyKidsKnow: 'Many mobile games are made with Unity!' },

  // Entertainment & Streaming
  NFLX: { name: 'Netflix, Inc.', sector: 'Entertainment', description: 'Streaming service with movies, shows, and originals.', whyKidsKnow: 'Where you binge Stranger Things and One Piece!' },
  DIS: { name: 'The Walt Disney Company', sector: 'Entertainment', description: 'Theme parks, Marvel, Star Wars, Pixar, and Disney+.', whyKidsKnow: 'Marvel movies, Star Wars, and Disney World!' },
  SPOT: { name: 'Spotify Technology', sector: 'Entertainment', description: 'Music streaming with millions of songs and podcasts.', whyKidsKnow: 'Where you make playlists and discover new music!' },
  PARA: { name: 'Paramount Global', sector: 'Entertainment', description: 'Movies, Paramount+, Nickelodeon, MTV.', whyKidsKnow: 'SpongeBob and Nickelodeon are theirs!' },
  WBD: { name: 'Warner Bros. Discovery', sector: 'Entertainment', description: 'HBO Max, DC movies, Cartoon Network.', whyKidsKnow: 'Batman, Superman, and Cartoon Network!' },
  CMCSA: { name: 'Comcast Corporation', sector: 'Entertainment', description: 'Universal Studios, NBC, Peacock streaming.', whyKidsKnow: 'Universal Studios theme parks and movies!' },
  LYV: { name: 'Live Nation Entertainment', sector: 'Entertainment', description: 'Concert tickets and live events.', whyKidsKnow: 'Where you buy concert tickets!' },
  ROKU: { name: 'Roku, Inc.', sector: 'Entertainment', description: 'Streaming devices and smart TVs.', whyKidsKnow: 'The streaming stick on your TV!' },

  // Social Media
  SNAP: { name: 'Snap Inc.', sector: 'Social Media', description: 'Snapchat - photos, stories, and AR filters.', whyKidsKnow: 'Snapchat streaks and funny filters!' },
  PINS: { name: 'Pinterest', sector: 'Social Media', description: 'Visual discovery and idea sharing platform.', whyKidsKnow: 'Where you find DIY ideas and aesthetic boards!' },
  RDDT: { name: 'Reddit', sector: 'Social Media', description: 'Community forums and discussions.', whyKidsKnow: 'Where memes are born and communities thrive!' },

  // Automotive
  TSLA: { name: 'Tesla, Inc.', sector: 'Automotive', description: 'Electric cars and self-driving technology.', whyKidsKnow: 'Cool electric cars that can drive themselves!' },
  F: { name: 'Ford Motor Company', sector: 'Automotive', description: 'Cars and trucks including the Mustang and F-150.', whyKidsKnow: 'Mustangs and F-150 trucks everywhere!' },
  GM: { name: 'General Motors', sector: 'Automotive', description: 'Chevrolet, GMC, Cadillac, and electric vehicles.', whyKidsKnow: 'Chevy trucks and the Corvette!' },
  RIVN: { name: 'Rivian Automotive', sector: 'Automotive', description: 'Electric trucks and SUVs.', whyKidsKnow: 'Cool electric adventure trucks!' },
  LCID: { name: 'Lucid Group', sector: 'Automotive', description: 'Luxury electric vehicles.', whyKidsKnow: 'Super fast luxury electric cars!' },
  TM: { name: 'Toyota Motor', sector: 'Automotive', description: 'Cars, trucks, and hybrid vehicles.', whyKidsKnow: 'Camry, Corolla - cars everyone drives!' },
  HMC: { name: 'Honda Motor', sector: 'Automotive', description: 'Cars, motorcycles, and power equipment.', whyKidsKnow: 'Civics and cool motorcycles!' },

  // Food & Beverage
  SBUX: { name: 'Starbucks Corporation', sector: 'Food', description: 'Global coffee chain with drinks and snacks.', whyKidsKnow: 'Pink drinks, Frappuccinos, and cake pops!' },
  MCD: { name: "McDonald's Corporation", sector: 'Food', description: 'Fast food restaurants worldwide.', whyKidsKnow: "Happy Meals and Big Macs - I'm lovin' it!" },
  KO: { name: 'Coca-Cola Company', sector: 'Food', description: 'Soft drinks including Coke, Sprite, and Fanta.', whyKidsKnow: 'Coca-Cola, Sprite, and Fanta!' },
  PEP: { name: 'PepsiCo', sector: 'Food', description: 'Pepsi, Mountain Dew, Lay\'s chips, Gatorade.', whyKidsKnow: 'Pepsi, Doritos, and Gatorade!' },
  MNST: { name: 'Monster Beverage', sector: 'Food', description: 'Energy drinks.', whyKidsKnow: 'Monster Energy drinks!' },
  DPZ: { name: "Domino's Pizza", sector: 'Food', description: 'Pizza delivery chain.', whyKidsKnow: 'Pizza delivered to your door!' },
  CMG: { name: 'Chipotle Mexican Grill', sector: 'Food', description: 'Fast-casual Mexican food.', whyKidsKnow: 'Burritos and bowls!' },
  YUM: { name: 'Yum! Brands', sector: 'Food', description: 'Owns Taco Bell, KFC, and Pizza Hut.', whyKidsKnow: 'Taco Bell, KFC, and Pizza Hut!' },
  QSR: { name: 'Restaurant Brands', sector: 'Food', description: 'Owns Burger King, Popeyes, Tim Hortons.', whyKidsKnow: 'Burger King and Popeyes chicken!' },
  WEN: { name: "Wendy's Company", sector: 'Food', description: 'Fast food known for fresh beef burgers.', whyKidsKnow: "Wendy's Frosty and spicy nuggets!" },
  CELH: { name: 'Celsius Holdings', sector: 'Food', description: 'Fitness energy drinks.', whyKidsKnow: 'Celsius energy drinks at the gym!' },

  // Consumer & Retail
  NKE: { name: 'Nike, Inc.', sector: 'Consumer', description: "World's biggest sports brand for shoes and gear.", whyKidsKnow: 'Makes the sneakers your favorite athletes wear!' },
  LULU: { name: 'Lululemon', sector: 'Consumer', description: 'Athletic apparel and yoga wear.', whyKidsKnow: 'The leggings everyone wears!' },
  UAA: { name: 'Under Armour', sector: 'Consumer', description: 'Sports clothing and gear.', whyKidsKnow: 'Sports gear with the cool logo!' },
  ADDYY: { name: 'Adidas', sector: 'Consumer', description: 'Sports shoes, clothing, and accessories.', whyKidsKnow: 'Three stripes - Yeezys and soccer cleats!' },
  TGT: { name: 'Target Corporation', sector: 'Consumer', description: 'Retail stores with everything you need.', whyKidsKnow: 'Target runs with mom!' },
  WMT: { name: 'Walmart', sector: 'Consumer', description: 'Biggest retail store chain in the world.', whyKidsKnow: 'Walmart has everything!' },
  COST: { name: 'Costco Wholesale', sector: 'Consumer', description: 'Membership warehouse with bulk items.', whyKidsKnow: 'Giant store with free samples!' },
  ETSY: { name: 'Etsy', sector: 'Consumer', description: 'Marketplace for handmade and vintage items.', whyKidsKnow: 'Unique handmade stuff and custom gifts!' },
  BURL: { name: 'Burlington Stores', sector: 'Consumer', description: 'Off-price retail stores.', whyKidsKnow: 'Deals on clothes and home stuff!' },

  // Finance & Payments
  V: { name: 'Visa Inc.', sector: 'Finance', description: 'Payment card network used worldwide.', whyKidsKnow: 'The card your parents use everywhere!' },
  MA: { name: 'Mastercard', sector: 'Finance', description: 'Global payment network.', whyKidsKnow: 'Another card everyone uses!' },
  PYPL: { name: 'PayPal Holdings', sector: 'Finance', description: 'Online payments and money transfers.', whyKidsKnow: 'Send money online and pay on websites!' },
  SQ: { name: 'Block, Inc.', sector: 'Finance', description: 'Cash App and Square payment systems.', whyKidsKnow: 'Cash App for sending money to friends!' },
  COIN: { name: 'Coinbase Global', sector: 'Finance', description: 'Cryptocurrency exchange platform.', whyKidsKnow: 'Where people buy Bitcoin and crypto!' },
  SOFI: { name: 'SoFi Technologies', sector: 'Finance', description: 'Digital banking and investing app.', whyKidsKnow: 'The stadium where the Rams play!' },
  JPM: { name: 'JPMorgan Chase', sector: 'Finance', description: 'Largest bank in the United States.', whyKidsKnow: 'The big bank with Chase cards!' },
  BAC: { name: 'Bank of America', sector: 'Finance', description: 'Major US bank.', whyKidsKnow: 'Bank of America ATMs everywhere!' },

  // Sports & Fitness
  PTON: { name: 'Peloton Interactive', sector: 'Sports', description: 'Connected fitness bikes and workouts.', whyKidsKnow: 'The exercise bike with classes!' },
  DKS: { name: "Dick's Sporting Goods", sector: 'Sports', description: 'Sporting goods retail stores.', whyKidsKnow: 'Where you buy sports equipment!' },
  DKNG: { name: 'DraftKings', sector: 'Sports', description: 'Sports betting and fantasy sports.', whyKidsKnow: 'Fantasy sports and betting ads everywhere!' },

  // Travel & Transportation
  UBER: { name: 'Uber Technologies', sector: 'Transportation', description: 'Ride-sharing and food delivery.', whyKidsKnow: 'Uber rides and Uber Eats delivery!' },
  LYFT: { name: 'Lyft, Inc.', sector: 'Transportation', description: 'Ride-sharing service.', whyKidsKnow: 'The pink mustache ride app!' },
  ABNB: { name: 'Airbnb', sector: 'Transportation', description: 'Vacation rentals and experiences.', whyKidsKnow: 'Cool vacation homes to rent!' },
  DAL: { name: 'Delta Air Lines', sector: 'Transportation', description: 'Major US airline.', whyKidsKnow: 'Flights to vacation!' },
  UAL: { name: 'United Airlines', sector: 'Transportation', description: 'Major US airline.', whyKidsKnow: 'Another big airline!' },
  AAL: { name: 'American Airlines', sector: 'Transportation', description: 'Largest US airline.', whyKidsKnow: 'Planes with the eagle logo!' },
  BKNG: { name: 'Booking Holdings', sector: 'Transportation', description: 'Travel booking sites like Priceline.', whyKidsKnow: 'Where you book hotels online!' },

  // Health & Wellness
  JNJ: { name: 'Johnson & Johnson', sector: 'Healthcare', description: 'Healthcare products and medicines.', whyKidsKnow: 'Band-Aids and baby products!' },
  PFE: { name: 'Pfizer Inc.', sector: 'Healthcare', description: 'Pharmaceutical company making medicines.', whyKidsKnow: 'Made COVID vaccines!' },
  MRNA: { name: 'Moderna', sector: 'Healthcare', description: 'Biotechnology and mRNA vaccines.', whyKidsKnow: 'COVID vaccine maker!' },
  UNH: { name: 'UnitedHealth Group', sector: 'Healthcare', description: 'Health insurance and healthcare services.', whyKidsKnow: 'Health insurance company!' },
  CVS: { name: 'CVS Health', sector: 'Healthcare', description: 'Pharmacies and healthcare.', whyKidsKnow: 'The pharmacy on every corner!' },
  WBA: { name: 'Walgreens Boots', sector: 'Healthcare', description: 'Pharmacy and retail stores.', whyKidsKnow: 'Walgreens drugstore!' },

  // E-commerce & Delivery
  DASH: { name: 'DoorDash', sector: 'Delivery', description: 'Food delivery service.', whyKidsKnow: 'Get food delivered from anywhere!' },
  SHOP: { name: 'Shopify', sector: 'E-commerce', description: 'E-commerce platform for online stores.', whyKidsKnow: 'Powers many online shops!' },
  EBAY: { name: 'eBay Inc.', sector: 'E-commerce', description: 'Online marketplace and auctions.', whyKidsKnow: 'Buy and sell stuff online!' },
  MELI: { name: 'MercadoLibre', sector: 'E-commerce', description: 'Latin American e-commerce and payments.', whyKidsKnow: 'The Amazon of Latin America!' },

  // AI & Cloud
  PLTR: { name: 'Palantir Technologies', sector: 'Technology', description: 'AI and data analytics software.', whyKidsKnow: 'AI company named after Lord of the Rings!' },
  SNOW: { name: 'Snowflake', sector: 'Technology', description: 'Cloud data platform.', whyKidsKnow: 'Stores data in the cloud!' },
  NET: { name: 'Cloudflare', sector: 'Technology', description: 'Internet security and performance.', whyKidsKnow: 'Keeps websites fast and safe!' },
  CRWD: { name: 'CrowdStrike', sector: 'Technology', description: 'Cybersecurity and endpoint protection.', whyKidsKnow: 'Protects computers from hackers!' },
  ZS: { name: 'Zscaler', sector: 'Technology', description: 'Cloud security platform.', whyKidsKnow: 'Keeps companies safe online!' },
  DDOG: { name: 'Datadog', sector: 'Technology', description: 'Cloud monitoring and analytics.', whyKidsKnow: 'Watches over apps and websites!' },
  MDB: { name: 'MongoDB', sector: 'Technology', description: 'Database software for developers.', whyKidsKnow: 'Where apps store their data!' },

  // Semiconductors
  TSM: { name: 'Taiwan Semiconductor', sector: 'Technology', description: 'Makes chips for Apple, NVIDIA, and more.', whyKidsKnow: 'Makes the chips inside iPhones!' },
  AVGO: { name: 'Broadcom Inc.', sector: 'Technology', description: 'Semiconductor and software company.', whyKidsKnow: 'Chips in phones and WiFi!' },
  QCOM: { name: 'Qualcomm', sector: 'Technology', description: 'Mobile phone chips and 5G technology.', whyKidsKnow: 'Snapdragon chips in Android phones!' },
  MU: { name: 'Micron Technology', sector: 'Technology', description: 'Memory and storage chips.', whyKidsKnow: 'Memory in your computer and phone!' },
  MRVL: { name: 'Marvell Technology', sector: 'Technology', description: 'Data infrastructure semiconductors.', whyKidsKnow: 'Chips for data centers and cloud!' },
  ARM: { name: 'Arm Holdings', sector: 'Technology', description: 'Designs chips used in most phones.', whyKidsKnow: 'Their designs are in almost every phone!' },

  // Communication
  T: { name: 'AT&T Inc.', sector: 'Communication', description: 'Telecom, internet, and HBO Max.', whyKidsKnow: 'Phone and internet service!' },
  VZ: { name: 'Verizon Communications', sector: 'Communication', description: 'Wireless, internet, and media.', whyKidsKnow: 'Can you hear me now?' },
  TMUS: { name: 'T-Mobile US', sector: 'Communication', description: 'Wireless carrier with 5G network.', whyKidsKnow: 'The magenta phone company!' },

  // Space & Defense
  SPCE: { name: 'Virgin Galactic', sector: 'Aerospace', description: 'Space tourism company.', whyKidsKnow: 'Sending tourists to space!' },
  BA: { name: 'Boeing Company', sector: 'Aerospace', description: 'Airplanes and space vehicles.', whyKidsKnow: 'Makes big airplanes!' },
  LMT: { name: 'Lockheed Martin', sector: 'Aerospace', description: 'Defense and aerospace technology.', whyKidsKnow: 'Makes fighter jets!' },
  RTX: { name: 'RTX Corporation', sector: 'Aerospace', description: 'Aerospace and defense systems.', whyKidsKnow: 'Makes jet engines!' },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query || query.length < 1) {
    return NextResponse.json({ stocks: [] })
  }

  try {
    // First, search our curated database
    const localResults = Object.entries(STOCK_DATABASE)
      .filter(([ticker, data]) =>
        ticker.toLowerCase().includes(query) ||
        data.name.toLowerCase().includes(query)
      )
      .map(([ticker, data]) => ({
        ticker,
        companyName: data.name,
        sector: data.sector,
        description: data.description,
        whyKidsKnow: data.whyKidsKnow,
      }))
      .slice(0, 20)

    // If we have enough local results, return them
    if (localResults.length >= 5) {
      // Fetch prices for these stocks from Finnhub
      const stocksWithPrices = await Promise.all(
        localResults.map(async (stock) => {
          try {
            const priceRes = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_API_KEY}`
            )
            const priceData = await priceRes.json()
            return {
              ...stock,
              price: priceData.c || 0,
              changePercent: priceData.dp || 0,
            }
          } catch {
            return { ...stock, price: 0, changePercent: 0 }
          }
        })
      )
      return NextResponse.json({ stocks: stocksWithPrices })
    }

    // If not enough local results, also search Finnhub
    const finnhubRes = await fetch(
      `https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`
    )
    const finnhubData = await finnhubRes.json()

    const finnhubResults = (finnhubData.result || [])
      .filter((item: any) => item.type === 'Common Stock' && !item.symbol.includes('.'))
      .slice(0, 10)
      .map((item: any) => {
        const localData = STOCK_DATABASE[item.symbol]
        return {
          ticker: item.symbol,
          companyName: item.description,
          sector: localData?.sector || 'Other',
          description: localData?.description || `${item.description} stock`,
          whyKidsKnow: localData?.whyKidsKnow || '',
        }
      })

    // Merge results (local first, then Finnhub)
    const seenTickers = new Set(localResults.map(s => s.ticker))
    const mergedResults = [
      ...localResults,
      ...finnhubResults.filter((s: any) => !seenTickers.has(s.ticker))
    ].slice(0, 20)

    // Fetch prices
    const stocksWithPrices = await Promise.all(
      mergedResults.map(async (stock) => {
        try {
          const priceRes = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_API_KEY}`
          )
          const priceData = await priceRes.json()
          return {
            ...stock,
            price: priceData.c || 0,
            changePercent: priceData.dp || 0,
          }
        } catch {
          return { ...stock, price: 0, changePercent: 0 }
        }
      })
    )

    return NextResponse.json({ stocks: stocksWithPrices })
  } catch (error) {
    console.error('Stock search error:', error)
    return NextResponse.json({ stocks: [], error: 'Search failed' }, { status: 500 })
  }
}
