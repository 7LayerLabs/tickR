'use client'

import { useState } from 'react'
import { useGameStore } from '@/lib/game.store'
import {
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  Star,
  Zap,
  TrendingUp,
  PiggyBank,
  Target,
  Shield,
  BarChart3,
  DollarSign,
  Lightbulb,
  ChevronRight,
  Award,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react'

// Learning paths with real financial education content
const LEARNING_PATHS = [
  {
    id: 'basics',
    title: 'Stock Market Basics',
    description: 'Learn what stocks are and how the market works',
    icon: BookOpen,
    color: '#10b981',
    bgGradient: 'from-emerald-400 to-teal-500',
    lessons: [
      {
        id: 'what-is-stock',
        title: 'What is a Stock?',
        duration: '5 min',
        xp: 50,
        completed: true,
        content: {
          definition: 'A stock is a tiny piece of ownership in a company. When you buy a stock, you become a part-owner (shareholder) of that business.',
          realExample: {
            company: 'Apple (AAPL)',
            explanation: 'If Apple has about 15 billion shares and you buy 1 share for ~$185, you own 0.0000000067% of Apple. Sounds tiny, but you now get a vote in company decisions and share in their profits!',
          },
          kidBreakdown: 'Imagine your favorite pizza place needs $1,000 to buy a new oven. They sell 100 "pizza shares" for $10 each. You buy 1 share. Now you own 1% of the pizza place! If they make more money with the new oven, your share becomes worth more.',
          keyTakeaway: 'Buying stock = buying a piece of a real company',
        }
      },
      {
        id: 'how-prices-move',
        title: 'Why Stock Prices Go Up and Down',
        duration: '7 min',
        xp: 75,
        completed: true,
        content: {
          definition: 'Stock prices change based on supply and demand. If more people want to buy (demand) than sell (supply), the price goes up. If more want to sell, it goes down.',
          realExample: {
            company: 'Tesla (TSLA)',
            explanation: 'When Tesla announced record car deliveries in Q3 2023, demand for the stock surged. More buyers than sellers = price jumped 6% in one day. When they cut prices on cars (lower profit per car), more sellers than buyers = price dropped.',
          },
          kidBreakdown: 'Think of rare trading cards. If everyone wants the same card and only 10 exist, the price shoots up. If a new pack comes out with tons of that card, suddenly its not rare and price drops. Stocks work the same way!',
          keyTakeaway: 'More buyers than sellers = price up. More sellers than buyers = price down.',
        }
      },
      {
        id: 'stock-exchange',
        title: 'The Stock Exchange: Where Trading Happens',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'A stock exchange is a marketplace where buyers and sellers trade stocks. The two biggest in the US are NYSE (New York Stock Exchange) and NASDAQ.',
          realExample: {
            company: 'NYSE vs NASDAQ',
            explanation: 'Traditional companies like Coca-Cola (KO), Disney (DIS), and Nike (NKE) trade on NYSE. Tech companies like Apple (AAPL), Google (GOOGL), and Microsoft (MSFT) trade on NASDAQ. Both are open 9:30 AM - 4:00 PM Eastern, Monday-Friday.',
          },
          kidBreakdown: 'Its like a massive online game marketplace, but for company shares. Instead of trading Fortnite skins, people trade pieces of real businesses. The exchange makes sure trades are fair and everyone pays/receives the right amount.',
          keyTakeaway: 'Stock exchanges = organized marketplaces that keep trading fair and secure',
        }
      },
      {
        id: 'market-hours',
        title: 'Market Hours and Trading Days',
        duration: '4 min',
        xp: 40,
        completed: false,
        content: {
          definition: 'US stock markets are open Monday through Friday, 9:30 AM to 4:00 PM Eastern Time. They are closed on weekends and major holidays.',
          realExample: {
            company: 'Pre-market & After-hours',
            explanation: 'Some brokers let you trade from 4 AM - 8 PM. When Netflix (NFLX) reports earnings at 4:05 PM after the market closes, you might see the stock jump or drop in after-hours trading before the next regular session.',
          },
          kidBreakdown: 'Think of it like school hours. The market "school" runs 9:30-4:00. Before and after those hours, some trading can happen (like early drop-off or after-school programs), but the main action is during regular hours.',
          keyTakeaway: 'Regular market hours: 9:30 AM - 4:00 PM ET, Monday-Friday',
        }
      },
      {
        id: 'bull-bear-markets',
        title: 'Bull vs Bear Markets',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'A bull market means stock prices are rising and investors are optimistic. A bear market means prices are falling 20%+ and investors are pessimistic. The names come from how each animal attacks: bulls thrust UP, bears swipe DOWN.',
          realExample: {
            company: 'Recent History',
            explanation: 'March 2020: COVID crashed stocks 34% in weeks = bear market. Then from March 2020 to Dec 2021, the S&P 500 gained 114% = massive bull market. In 2022, stocks dropped 25% = bear market again. In 2023-2024, stocks recovered = new bull market.',
          },
          kidBreakdown: 'Think of market moods like weather seasons. Bull market = summer, everyone is happy and prices keep climbing. Bear market = winter, things look gloomy and prices fall. Just like seasons, both are temporary. Winter always becomes summer again eventually.',
          keyTakeaway: 'Bull = prices going up, optimism. Bear = prices falling 20%+, fear. Both are normal cycles.',
        }
      },
      {
        id: 'sp500-explained',
        title: 'The S&P 500: The Most Important Number',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'The S&P 500 is an index tracking 500 of the largest US companies. When news says "the market is up 1%," they usually mean the S&P 500. Its the benchmark everyone compares their investments against.',
          realExample: {
            company: 'S&P 500 Companies',
            explanation: 'The top 10 S&P 500 companies include Apple, Microsoft, Amazon, Nvidia, Google, Meta, Tesla, Berkshire Hathaway, JPMorgan, and Johnson & Johnson. Together these 10 companies make up about 30% of the entire index. Since 1957, the S&P 500 has averaged about 10% annual returns.',
          },
          kidBreakdown: 'Imagine tracking the grades of the 500 best students at school. Their average GPA tells you how the "top students" are doing overall. The S&P 500 is like a report card for Americas biggest companies. If you beat the S&P 500, youre beating most professional investors!',
          keyTakeaway: 'S&P 500 = scoreboard for the 500 biggest US companies. ~10% average annual return.',
        }
      },
    ]
  },
  {
    id: 'reading-stocks',
    title: 'Reading Stock Info',
    description: 'Understand tickers, charts, and key numbers',
    icon: BarChart3,
    color: '#0ea5e9',
    bgGradient: 'from-cyan-400 to-blue-500',
    lessons: [
      {
        id: 'ticker-symbols',
        title: 'Ticker Symbols Explained',
        duration: '4 min',
        xp: 40,
        completed: false,
        content: {
          definition: 'A ticker symbol is a unique abbreviation that identifies a publicly traded company. Its like a username for stocks.',
          realExample: {
            company: 'Famous Tickers',
            explanation: 'AAPL = Apple, GOOGL = Google, AMZN = Amazon, NFLX = Netflix, DIS = Disney, NKE = Nike, SBUX = Starbucks. Some are obvious (DIS = Disney), others are creative (GOOGL sounds like Google).',
          },
          kidBreakdown: 'Tickers are like gamertags for companies. Instead of typing "The Walt Disney Company" every time, traders just type "DIS". Quick, easy, and everyone knows what you mean!',
          keyTakeaway: 'Ticker = short code name for a company on the stock market',
        }
      },
      {
        id: 'price-chart-basics',
        title: 'How to Read a Stock Chart',
        duration: '8 min',
        xp: 80,
        completed: false,
        content: {
          definition: 'A stock chart shows how a stocks price has changed over time. The x-axis shows time, the y-axis shows price. Green usually means the price went up, red means it went down.',
          realExample: {
            company: 'Nvidia (NVDA) 2023',
            explanation: 'If you look at NVDAs chart from Jan 2023 ($140) to Dec 2023 ($480), youll see mostly green with some red dips. The overall trend was strongly UP because of AI hype. Thats a 240% gain in one year!',
          },
          kidBreakdown: 'A stock chart is like tracking your high score over time. Sometimes you have good days (line goes up), sometimes bad days (line goes down). The important thing is the overall trend - is your average score getting better?',
          keyTakeaway: 'Charts show price history. Look for the overall trend, not just daily moves.',
        }
      },
      {
        id: 'market-cap',
        title: 'Market Cap: How Big is This Company?',
        duration: '5 min',
        xp: 50,
        completed: false,
        content: {
          definition: 'Market capitalization (market cap) = stock price × total number of shares. It tells you the total value of a company according to the stock market.',
          realExample: {
            company: 'Apple vs GameStop',
            explanation: 'Apple: $185 × 15.5 billion shares = $2.87 trillion market cap (largest company!). GameStop: $15 × 305 million shares = $4.6 billion. Apple is worth about 620x more than GameStop according to the market.',
          },
          kidBreakdown: 'Market cap is like the total price tag on a company. If you wanted to buy EVERY share and own the whole company, thats what youd pay. A $3 trillion market cap means thats the total value of all the shares combined.',
          keyTakeaway: 'Market Cap = Company Total Value. Bigger cap = bigger, more established company.',
        }
      },
      {
        id: 'pe-ratio',
        title: 'P/E Ratio: Is This Stock Expensive?',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'P/E (Price-to-Earnings) ratio = stock price ÷ earnings per share. It shows how much investors pay for each dollar of profit. Lower P/E might mean cheaper, higher P/E means investors expect big growth.',
          realExample: {
            company: 'Walmart vs Amazon',
            explanation: 'Walmart P/E: ~25 (investors pay $25 for every $1 of profit). Amazon P/E: ~60 (investors pay $60 for every $1 of profit). Amazon is "more expensive" but investors believe its profits will grow faster.',
          },
          kidBreakdown: 'Imagine two lemonade stands both making $10/day profit. Stand A costs $100 to buy (P/E = 10). Stand B costs $500 (P/E = 50). Stand B is more expensive, but maybe its in a better location and will make $50/day soon!',
          keyTakeaway: 'P/E ratio helps compare if stocks are cheap or expensive relative to their profits.',
        }
      },
      {
        id: 'dividends',
        title: 'Dividends: Getting Paid to Own Stocks',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'Dividends are cash payments companies make to shareholders, usually every 3 months (quarterly). Not all companies pay dividends - some prefer to reinvest profits into growing the business.',
          realExample: {
            company: 'Coca-Cola (KO)',
            explanation: 'Coca-Cola pays about $1.84 per share per year in dividends. Own 100 shares? You get $184/year just for holding the stock - thats about $46 every 3 months deposited into your account. Coca-Cola has increased its dividend for 61 consecutive years!',
          },
          kidBreakdown: 'Dividends are like getting an allowance for owning a company. You dont have to sell your stock - the company just sends you cash regularly, like "thanks for being an owner!" Some stocks pay you every 3 months just for holding them.',
          keyTakeaway: 'Dividends = cash payments to shareholders. Great for passive income over time.',
        }
      },
      {
        id: 'earnings-reports',
        title: 'Earnings Reports: A Companys Report Card',
        duration: '8 min',
        xp: 80,
        completed: false,
        content: {
          definition: 'Every 3 months, public companies release earnings reports showing revenue (money coming in), profit/loss, and future guidance. These reports often cause big stock price moves.',
          realExample: {
            company: 'Netflix (NFLX) Earnings',
            explanation: 'In Q3 2023, Netflix reported 8.8 million new subscribers when analysts expected only 6 million. The stock jumped 16% the next day! But in Q1 2022, they reported losing 200,000 subscribers - stock crashed 35% overnight. Earnings surprises = big moves.',
          },
          kidBreakdown: 'Earnings reports are like report cards for companies. Every 3 months, they show their "grades": How much money did they make? Did they beat expectations? Stocks move BIG when the report card is way better or worse than expected.',
          keyTakeaway: 'Earnings reports come every quarter. Surprises (good or bad) cause major price swings.',
        }
      },
      {
        id: 'stock-splits',
        title: 'Stock Splits: More Shares, Same Value',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'A stock split divides each share into multiple shares, lowering the price per share but keeping your total value the same. A 4-for-1 split means 1 share at $400 becomes 4 shares at $100.',
          realExample: {
            company: 'Tesla & Apple Splits',
            explanation: 'Tesla did a 5-for-1 split in Aug 2020 (1 share at $2,000 became 5 shares at $400) and a 3-for-1 in Aug 2022. Apple did a 4-for-1 in 2020. Before splits, Apple would cost ~$500/share today instead of ~$185. Splits make stocks more affordable for regular investors.',
          },
          kidBreakdown: 'Imagine you have a $20 bill. A 4-for-1 split is like exchanging it for four $5 bills. You still have $20 total, just in more pieces. Companies split stocks to make them cheaper to buy - a $2,000 stock feels expensive, but $100 feels accessible!',
          keyTakeaway: 'Stock splits = more shares at lower price. Total value stays the same.',
        }
      },
      {
        id: 'order-types',
        title: 'Market Orders vs Limit Orders',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'A market order buys/sells immediately at whatever the current price is. A limit order only executes if the stock hits YOUR specified price.',
          realExample: {
            company: 'Buying Apple Stock',
            explanation: 'Apple is at $185. Market order: you buy right now at ~$185 (might be $185.02 by the time it executes). Limit order at $180: your order waits. If Apple drops to $180, it automatically buys. If it never drops that low, the order doesnt execute.',
          },
          kidBreakdown: 'Market order = "I want it NOW, whatever the price." Limit order = "I only want it IF it reaches my price." Like buying concert tickets: market order pays whatever scalpers charge, limit order says "I will only pay $50, Ill wait and see."',
          keyTakeaway: 'Market orders execute instantly. Limit orders wait for your target price.',
        }
      },
    ]
  },
  {
    id: 'investing-strategies',
    title: 'Smart Investing Strategies',
    description: 'Learn how successful investors think',
    icon: Target,
    color: '#8b5cf6',
    bgGradient: 'from-violet-400 to-purple-500',
    lessons: [
      {
        id: 'diversification',
        title: 'Dont Put All Eggs in One Basket',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'Diversification means spreading your money across different stocks, sectors, and asset types so one bad investment doesnt ruin everything.',
          realExample: {
            company: 'Portfolio Example',
            explanation: 'Instead of putting $1,000 all in Tesla, you could put $200 each in: Apple (tech), Disney (entertainment), Nike (retail), Coca-Cola (beverages), JPMorgan (banking). If Tesla crashes 50%, you lose $500. If one of five stocks crashes 50%, you only lose $100.',
          },
          kidBreakdown: 'If you only collect one type of Pokemon card and that type becomes worthless, youve lost everything. But if you collect different types, some might go down but others go up. Your total collection stays safer!',
          keyTakeaway: 'Spread your investments across different companies and industries.',
        }
      },
      {
        id: 'buy-and-hold',
        title: 'Buy and Hold: The Patient Strategy',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'Buy and hold means purchasing stocks and keeping them for years, ignoring short-term ups and downs. Time in the market beats timing the market.',
          realExample: {
            company: 'Amazon (AMZN) Long-term',
            explanation: 'If you bought $1,000 of Amazon in 2010 at ~$130/share and held until 2024 (~$175/share after splits), youd have about $13,500. But during that time, the stock dropped 30%+ multiple times. Patient holders won big!',
          },
          kidBreakdown: 'Its like planting a tree. You dont dig it up every week to check the roots. You plant it, water it, and let it grow for years. Some seasons are bad, but over time, the tree gets huge. Stocks work the same way.',
          keyTakeaway: 'Long-term investing (5+ years) historically beats trying to time short-term moves.',
        }
      },
      {
        id: 'dollar-cost-averaging',
        title: 'Dollar-Cost Averaging (DCA)',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'Dollar-cost averaging means investing the same amount of money at regular intervals (like $50 every month) regardless of price. You buy more shares when cheap, fewer when expensive.',
          realExample: {
            company: 'Monthly S&P 500 Investment',
            explanation: 'Invest $100/month in an S&P 500 fund. Month 1: price $400, you get 0.25 shares. Month 2: price drops to $380, you get 0.26 shares. Month 3: price rises to $420, you get 0.24 shares. You automatically buy more when cheap!',
          },
          kidBreakdown: 'Imagine buying Pokemon packs every week with your $5 allowance. Some weeks packs cost $5 (you get 1), some weeks theyre on sale for $2.50 (you get 2!). Over time, you average a good price without stressing about when to buy.',
          keyTakeaway: 'Invest regularly, same amount each time. Takes emotion out of investing.',
        }
      },
      {
        id: 'compound-growth',
        title: 'The Magic of Compound Growth',
        duration: '8 min',
        xp: 100,
        completed: false,
        content: {
          definition: 'Compound growth is when your investment gains earn their own gains. Your money makes money, then that money makes more money. Its like a snowball rolling downhill.',
          realExample: {
            company: '10% Annual Return Example',
            explanation: 'Start with $1,000 earning 10%/year. Year 1: $1,100. Year 2: $1,210 (10% of $1,100). Year 10: $2,594. Year 30: $17,449. Year 40: $45,259! Same $1,000, but time turns it into 45x more through compounding.',
          },
          kidBreakdown: 'You get $100 and earn 10% ($10). Next year you earn 10% on $110 ($11). Then 10% on $121 ($12.10). Each year, your "earnings on earnings" get bigger. Start young and this snowball effect is MASSIVE by the time youre older.',
          keyTakeaway: 'Start investing early! Time is the biggest factor in compound growth.',
        }
      },
    ]
  },
  {
    id: 'risk-management',
    title: 'Understanding Risk',
    description: 'Learn to protect your money while growing it',
    icon: Shield,
    color: '#f59e0b',
    bgGradient: 'from-amber-400 to-orange-500',
    lessons: [
      {
        id: 'what-is-risk',
        title: 'Good Risk vs Bad Risk',
        duration: '5 min',
        xp: 50,
        completed: false,
        content: {
          definition: 'Risk in investing means the chance your investment could lose value. Higher potential reward usually means higher risk. The key is taking smart risks, not avoiding all risk.',
          realExample: {
            company: 'Bonds vs Stocks vs Crypto',
            explanation: 'US Government Bonds: ~4% return, very low risk (government almost never defaults). S&P 500 Stocks: ~10% avg return, medium risk (can drop 30% in bad years). Crypto: potentially 100%+ returns, but can also drop 80%+. Higher reward = higher risk.',
          },
          kidBreakdown: 'Risk is like choosing what video game difficulty to play. Easy mode (bonds) = safe but boring rewards. Normal mode (stocks) = better rewards, some challenge. Nightmare mode (crypto) = huge potential rewards but you might lose everything!',
          keyTakeaway: 'All investing has risk. Match your risk level to your goals and timeline.',
        }
      },
      {
        id: 'volatility',
        title: 'Volatility: The Stocks Mood Swings',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'Volatility measures how much a stock price swings up and down. High volatility = big price swings. Low volatility = steadier prices. Its not the same as risk, but theyre related.',
          realExample: {
            company: 'Coca-Cola vs GameStop',
            explanation: 'Coca-Cola (KO): moves maybe 1-2% on a normal day. Very stable, low volatility. GameStop (GME) during the meme stock era: moved 100%+ in single days! Extremely volatile. Your heart rate matches the volatility.',
          },
          kidBreakdown: 'Volatility is like a roller coaster. Some stocks are the kiddie coaster (Coca-Cola) - small ups and downs, pretty chill. Others are the extreme coaster (GameStop) - massive drops and climbs that make you scream. Both can be fun, but know what youre getting into!',
          keyTakeaway: 'Volatility = price swings. High volatility stocks arent for nervous investors.',
        }
      },
      {
        id: 'stop-loss',
        title: 'Stop-Loss: Your Safety Net',
        duration: '5 min',
        xp: 50,
        completed: false,
        content: {
          definition: 'A stop-loss is an automatic order to sell a stock if it drops to a certain price. It limits how much you can lose on a single investment.',
          realExample: {
            company: 'Setting a Stop-Loss',
            explanation: 'You buy Netflix at $450. You set a stop-loss at $400 (about 11% below). If Netflix crashes to $350 on bad news, your shares automatically sell at ~$400. You lose $50/share instead of $100/share. The stop-loss protected you!',
          },
          kidBreakdown: 'A stop-loss is like telling your friend "If I start losing too badly at this game, make me stop playing." You decide IN ADVANCE when to quit so emotions dont make you keep losing more and more.',
          keyTakeaway: 'Stop-losses automate selling to prevent huge losses. Decide your exit BEFORE you buy.',
        }
      },
      {
        id: 'only-invest-what-you-can-lose',
        title: 'The Golden Rule of Investing',
        duration: '4 min',
        xp: 40,
        completed: false,
        content: {
          definition: 'Never invest money you cant afford to lose or will need soon. Emergency savings, rent money, and tuition should NEVER go into stocks.',
          realExample: {
            company: '2022 Market Crash',
            explanation: 'In 2022, the S&P 500 dropped 20%. If you invested $10,000 you needed for college that year, it became $8,000. You had to sell at a loss when you needed the money. But if it was money you didnt need for 10 years, you could wait for recovery.',
          },
          kidBreakdown: 'Only put money in stocks that you could literally lose and still be OK. If losing $100 would mean you cant buy lunch next week, dont invest it. But if its $100 you were just going to let sit there for years anyway? That can be invested.',
          keyTakeaway: 'Investing rule #1: Only use money you wont need for 5+ years.',
        }
      },
    ]
  },
  {
    id: 'investment-types',
    title: 'Types of Investments',
    description: 'Beyond stocks: ETFs, index funds, bonds, and more',
    icon: PiggyBank,
    color: '#06b6d4',
    bgGradient: 'from-cyan-400 to-teal-500',
    lessons: [
      {
        id: 'etfs-explained',
        title: 'ETFs: Instant Diversification',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'An ETF (Exchange-Traded Fund) is a basket of stocks bundled together that trades like a single stock. Instead of buying 500 individual stocks, you buy 1 ETF that holds all 500.',
          realExample: {
            company: 'SPY (S&P 500 ETF)',
            explanation: 'SPY holds all 500 companies in the S&P 500. Price: ~$475. One share of SPY = tiny pieces of Apple, Microsoft, Amazon, Google, etc. If any single company crashes, your ETF barely moves because the other 499 companies balance it out.',
          },
          kidBreakdown: 'An ETF is like buying a variety pack instead of single items. Instead of choosing just Doritos or just Cheetos, you get a pack with small bags of 10 different snacks. If one snack is stale, you still have 9 good ones. ETFs = variety packs for stocks!',
          keyTakeaway: 'ETFs = bundles of stocks. Easy diversification in one purchase.',
        }
      },
      {
        id: 'index-funds',
        title: 'Index Funds: The Easy Button',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'An index fund tracks a market index like the S&P 500. Instead of trying to pick winning stocks, you just buy "the whole market." Warren Buffett recommends index funds for most people!',
          realExample: {
            company: 'VTI vs Stock Pickers',
            explanation: 'VTI (Vanguard Total Stock Market) holds 4,000+ US stocks for just 0.03% annual fee. Studies show 90% of professional stock pickers LOSE to simple index funds over 15 years. Even the "experts" usually cant beat just buying the whole market.',
          },
          kidBreakdown: 'Imagine trying to guess which of 500 runners will win a race. Hard, right? Index funds say "forget guessing, I will just bet on the AVERAGE time improving." Over time, the overall market almost always goes up, so you win by being lazy!',
          keyTakeaway: 'Index funds beat most professionals. Low fees + total market exposure = winning strategy.',
        }
      },
      {
        id: 'bonds-basics',
        title: 'Bonds: Lending Money to Companies/Government',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'A bond is a loan you give to a company or government. They promise to pay you back with interest. Bonds are safer than stocks but offer lower returns. Think of it as being the bank instead of the owner.',
          realExample: {
            company: 'US Treasury Bonds',
            explanation: 'A 10-year US Treasury bond pays about 4.5% per year. Invest $1,000, get ~$45/year for 10 years, then get your $1,000 back. The US government has never failed to pay in 200+ years - extremely safe, but stocks average 10%, so youre trading safety for lower returns.',
          },
          kidBreakdown: 'Stocks = owning a piece of the pizza shop (could make a lot or lose a lot). Bonds = lending the pizza shop $100, they pay you $105 back next year guaranteed. Less exciting, but you know exactly what youll get. As you get older, people add more bonds for safety.',
          keyTakeaway: 'Bonds = lending money for steady interest. Safer than stocks, lower returns.',
        }
      },
      {
        id: 'mutual-funds',
        title: 'Mutual Funds: Professionally Managed Bundles',
        duration: '5 min',
        xp: 50,
        completed: false,
        content: {
          definition: 'Mutual funds pool money from many investors and hire a manager to pick stocks. Unlike ETFs, they only trade once per day after markets close. They often charge higher fees.',
          realExample: {
            company: 'Fidelity Contrafund (FCNTX)',
            explanation: 'FCNTX is a famous mutual fund that has beaten the S&P 500 over 30+ years. But it charges 0.39% per year vs 0.03% for an index ETF. Thats $39 vs $3 on a $10,000 investment. Most mutual funds DONT beat the index, so you pay more for usually worse performance.',
          },
          kidBreakdown: 'Mutual funds are like hiring a personal shopper to pick your stocks. Sounds fancy, but you pay them extra, and most personal shoppers actually pick WORSE than if you just bought everything yourself (index fund). The fees add up over time!',
          keyTakeaway: 'Mutual funds have managers picking stocks. Usually higher fees, usually worse returns than index funds.',
        }
      },
      {
        id: 'inflation-enemy',
        title: 'Inflation: Why Cash Loses Value',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'Inflation means prices increase over time, making each dollar worth less. If inflation is 3%, something that costs $100 today will cost $103 next year. Cash in a savings account loses buying power over time.',
          realExample: {
            company: 'Movie Tickets Over Time',
            explanation: 'In 2000, average movie ticket was $5.39. In 2023, it was $11.75. Same movie experience, but 118% more expensive! If you hid $100 cash under your bed in 2000, it could buy 18 tickets. That same $100 today buys only 8 tickets. Investing beats inflation.',
          },
          kidBreakdown: 'Inflation is like a slow leak in your money balloon. Every year, your dollars can buy a little less. A savings account paying 0.5% while inflation is 3% means youre LOSING 2.5% buying power yearly. Investing in stocks (avg 10%) beats inflation and actually grows your wealth.',
          keyTakeaway: 'Cash loses value to inflation over time. Investing helps your money grow faster than prices rise.',
        }
      },
    ]
  },
  {
    id: 'common-mistakes',
    title: 'Avoiding Costly Mistakes',
    description: 'Learn from others errors so you dont repeat them',
    icon: Shield,
    color: '#ef4444',
    bgGradient: 'from-red-400 to-rose-500',
    lessons: [
      {
        id: 'fomo-investing',
        title: 'FOMO: Fear of Missing Out',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'FOMO is buying a stock just because its going up and you dont want to miss the gains. This often leads to buying at the peak right before a crash.',
          realExample: {
            company: 'GameStop (GME) 2021',
            explanation: 'GameStop went from $20 to $483 in January 2021. Everyone was posting gains on social media. People who bought at $300-$400 out of FOMO watched it crash to $40 within weeks. Those who bought late lost 80-90% chasing hype they saw online.',
          },
          kidBreakdown: 'FOMO is like seeing everyone rush to one side of the playground and running over without knowing why. By the time you get there, the fun thing might be over. In investing, chasing what already went up usually means buying expensive and watching it fall.',
          keyTakeaway: 'If you only want a stock because everyone else is buying, youre probably too late.',
        }
      },
      {
        id: 'panic-selling',
        title: 'Panic Selling: The Worst Time to Sell',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'Panic selling is selling stocks when prices are crashing because youre scared of losing more. This locks in losses and misses the recovery that usually follows.',
          realExample: {
            company: 'March 2020 COVID Crash',
            explanation: 'The S&P 500 dropped 34% in March 2020. Millions of people panic-sold near the bottom. From that bottom, the market gained 114% over the next 21 months. Panic sellers locked in 34% losses while patient holders gained 114%. Same stocks, opposite results based on behavior.',
          },
          kidBreakdown: 'Panic selling is like rage-quitting a game when youre losing, then watching your team come back and win without you. Markets drop sometimes - thats normal. But they always recovered eventually. Selling at the bottom guarantees you miss the comeback.',
          keyTakeaway: 'Markets always recovered from crashes historically. Panic selling locks in losses.',
        }
      },
      {
        id: 'following-hype',
        title: 'Meme Stocks and Social Media Hype',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'Meme stocks are companies that become popular on social media not because of business fundamentals, but because of viral hype. They can make some people rich and many people poor very quickly.',
          realExample: {
            company: 'AMC Entertainment (AMC)',
            explanation: 'AMC went from $2 to $72 in early 2021 driven by Reddit/Twitter hype. Influencers said "hold forever, this is going to $1,000!" Today its around $4. People who bought at $50+ and "held forever" lost 90%+. The influencers who told them to hold often sold at the top.',
          },
          kidBreakdown: 'Some TikTokers or YouTubers make money by getting YOU to buy something, not by the thing actually being good. They buy first, hype it up, you buy and push the price higher, then they sell to you at the top. You hold the bag when it crashes.',
          keyTakeaway: 'Social media influencers often sell while telling you to buy. Do your own research.',
        }
      },
      {
        id: 'checking-too-often',
        title: 'Why Checking Prices Hourly Hurts You',
        duration: '5 min',
        xp: 50,
        completed: false,
        content: {
          definition: 'Checking your portfolio too frequently causes anxiety and leads to emotional trading decisions. On any given day, theres nearly a 50/50 chance the market is down - but zoom out and it almost always goes up.',
          realExample: {
            company: 'S&P 500 Statistics',
            explanation: 'The S&P 500 is positive only 53% of days. But its positive 75% of years and 95% of 20-year periods. Check daily? Youll see red almost half the time. Check yearly? Almost always green. Check after 20 years? Basically guaranteed gains.',
          },
          kidBreakdown: 'Imagine weighing yourself every hour and getting stressed about small changes. Youd go crazy! Your weight fluctuates normally. Stocks work the same way - daily ups and downs are noise. What matters is the long-term trend, so check less often and stress less.',
          keyTakeaway: 'Check your portfolio monthly, not daily. Daily moves are noise, not signal.',
        }
      },
      {
        id: 'timing-the-market',
        title: 'Timing the Market: Why It Fails',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'Timing the market means trying to predict when stocks will go up or down and trading based on that. Studies prove this fails - even professionals cant do it consistently.',
          realExample: {
            company: 'Missing the Best Days',
            explanation: 'From 2003-2022, S&P 500 averaged 9.8% annual returns. But if you missed just the 10 best days (trying to time the market), your return dropped to 5.6%. Miss the 20 best days: 2.9%. The biggest gains happen suddenly and unexpectedly. Being out of the market at the wrong moment is devastating.',
          },
          kidBreakdown: 'Timing the market is like trying to leave a party at the exact moment before it gets boring. You might leave too early and miss the best part. Or you stay too long and its awkward. Just staying at good parties (good investments) the whole time works better.',
          keyTakeaway: 'Time IN the market beats timing THE market. Stay invested through ups and downs.',
        }
      },
    ]
  },
  {
    id: 'real-world',
    title: 'Real-World Investing',
    description: 'From practice to real money (when youre ready)',
    icon: DollarSign,
    color: '#ec4899',
    bgGradient: 'from-pink-400 to-rose-500',
    lessons: [
      {
        id: 'brokerage-accounts',
        title: 'What is a Brokerage Account?',
        duration: '5 min',
        xp: 50,
        completed: false,
        content: {
          definition: 'A brokerage account is where you hold and trade stocks. Its like a bank account, but for investments. Major brokers include Fidelity, Charles Schwab, and Robinhood.',
          realExample: {
            company: 'Opening an Account',
            explanation: 'At 18, you can open your own account at Fidelity (no minimum, no fees). Under 18, a parent opens a custodial account for you. You deposit money (via bank transfer), then use it to buy stocks like AAPL or MSFT.',
          },
          kidBreakdown: 'A brokerage is like the App Store but for stocks. You need an account, you add money to it, then you can browse and "buy" pieces of companies. When you want money back, you sell stocks and transfer it to your bank.',
          keyTakeaway: 'Need a brokerage account to invest real money. Most are free to open at 18.',
        }
      },
      {
        id: 'custodial-accounts',
        title: 'Investing Before 18',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'Custodial accounts (UGMA/UTMA) let parents invest money that belongs to you. The money is yours, but a parent manages it until you turn 18-21 (depends on state).',
          realExample: {
            company: 'Fidelity Youth Account',
            explanation: 'Fidelity offers accounts for teens 13-17 with parental approval. You get a debit card and can buy stocks yourself (with parent oversight). At 18, it becomes fully yours. Some teens have built $10,000+ portfolios before graduating high school!',
          },
          kidBreakdown: 'Since youre not 18 yet, your parent has to be the "official" account holder. But the money is YOURS. Think of your parent as a co-pilot - theyre there to help, but youre building your investment future.',
          keyTakeaway: 'You can start investing before 18 with a custodial or youth account.',
        }
      },
      {
        id: 'taxes-basics',
        title: 'Taxes on Stock Profits',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'When you sell a stock for more than you paid, you owe taxes on the profit. Hold over 1 year = lower tax rate (long-term). Sell within 1 year = higher rate (short-term).',
          realExample: {
            company: 'Short-term vs Long-term',
            explanation: 'You buy Apple at $150, sell at $200 = $50 profit. If you held < 1 year: taxed at your income rate (maybe 22%). If held > 1 year: taxed at 15%. On $50 profit: $11 tax vs $7.50 tax. Holding longer = keeping more!',
          },
          kidBreakdown: 'The government wants a cut of your profits (taxes). But they reward patience! If you hold a stock for over a year before selling, you pay less tax. Its another reason why long-term investing wins.',
          keyTakeaway: 'Hold stocks over 1 year to pay lower taxes on your profits.',
        }
      },
      {
        id: 'practice-vs-real',
        title: 'From Paper Trading to Real Money',
        duration: '5 min',
        xp: 50,
        completed: false,
        content: {
          definition: 'Paper trading (like TickR!) lets you practice with fake money. The skills transfer to real investing, but emotions are different when real money is involved.',
          realExample: {
            company: 'The Emotion Factor',
            explanation: 'In paper trading, watching a stock drop 20% is interesting. With real money, that same drop feels like a punch in the stomach. Many people panic-sell at the worst time. Practice helps you build discipline BEFORE real money is on the line.',
          },
          kidBreakdown: 'TickR is like a flight simulator for investing. Pilots practice for hundreds of hours before flying real planes. Youre doing the same thing! Learn the controls, make mistakes safely, build good habits. When youre ready for real money, youll be prepared.',
          keyTakeaway: 'Paper trading builds skills. Real money adds emotions. Practice now, invest smarter later.',
        }
      },
    ]
  },
  {
    id: 'famous-investors',
    title: 'Learn From the Legends',
    description: 'Wisdom from the most successful investors ever',
    icon: Award,
    color: '#eab308',
    bgGradient: 'from-yellow-400 to-amber-500',
    lessons: [
      {
        id: 'warren-buffett',
        title: 'Warren Buffett: The Oracle of Omaha',
        duration: '8 min',
        xp: 80,
        completed: false,
        content: {
          definition: 'Warren Buffett is the worlds most famous investor, worth ~$130 billion. He started investing at age 11 and built his fortune through patient, long-term value investing. His company Berkshire Hathaway owns brands like GEICO, Dairy Queen, and Duracell.',
          realExample: {
            company: 'Berkshire Hathaway (BRK.A)',
            explanation: 'If you invested $10,000 in Berkshire in 1965, itd be worth over $300 million today. Buffett buys companies he understands, holds forever, and ignores short-term market noise. He still lives in the same house he bought in 1958 for $31,500.',
          },
          kidBreakdown: 'Buffett is 93 years old and has been investing since he was YOUR age. He didnt get rich quick - he got rich SLOW, letting compound growth work for 80+ years. He says "the stock market transfers money from the impatient to the patient."',
          keyTakeaway: 'Buffetts secret: Buy great companies, hold forever, stay patient, ignore the noise.',
        }
      },
      {
        id: 'buffett-quotes',
        title: 'Buffetts Most Important Rules',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'Warren Buffett has shared countless investing lessons. His two most famous rules: Rule #1: Never lose money. Rule #2: Never forget Rule #1. (This means: avoid dumb risks, not that losses never happen.)',
          realExample: {
            company: 'Key Buffett Quotes',
            explanation: '"Be fearful when others are greedy, and greedy when others are fearful." (Buy when everyone is panic selling). "Our favorite holding period is forever." "Price is what you pay, value is what you get." "Risk comes from not knowing what youre doing."',
          },
          kidBreakdown: 'Buffett says only invest in what you understand. He avoided tech stocks for years because he didnt get how they made money. He said its better to miss opportunities than to invest in things you dont understand. Stick to what makes sense to YOU.',
          keyTakeaway: 'Invest in what you understand. Buy when others are scared. Hold for the long term.',
        }
      },
      {
        id: 'peter-lynch',
        title: 'Peter Lynch: Invest in What You Know',
        duration: '7 min',
        xp: 70,
        completed: false,
        content: {
          definition: 'Peter Lynch managed the Magellan Fund from 1977-1990, averaging 29.2% annual returns (the best mutual fund ever). He believed regular people could beat Wall Street by paying attention to products they use.',
          realExample: {
            company: 'Finding Winners at the Mall',
            explanation: 'Lynch bought Dunkin Donuts stock after noticing long lines every morning. He invested in Hanes after his wife loved their products. He bought The Gap after seeing teens flock to stores. His edge wasnt fancy analysis - it was paying attention to real life.',
          },
          kidBreakdown: 'You might notice trends before Wall Street does! If every kid at school is obsessed with a new app, game, or brand, thats investing research. Lynch says use your daily life as a stock research lab. What are YOU and your friends spending money on?',
          keyTakeaway: 'Pay attention to products you love. Everyday observations = investing opportunities.',
        }
      },
      {
        id: 'jack-bogle',
        title: 'Jack Bogle: The Index Fund Inventor',
        duration: '6 min',
        xp: 60,
        completed: false,
        content: {
          definition: 'Jack Bogle founded Vanguard and created the first index fund in 1976. Wall Street mocked him, calling it "Bogles folly." He believed most investors should just buy low-cost index funds and hold forever.',
          realExample: {
            company: 'Vanguard S&P 500 (VOO)',
            explanation: 'Bogles idea was simple: Why pay fund managers 1-2% when they usually LOSE to the market anyway? His S&P 500 index fund charges 0.03% and beats 90% of professionals. Vanguard now manages $8 trillion. He was right, Wall Street was wrong.',
          },
          kidBreakdown: 'Bogle proved that trying to be clever usually backfires. Most "expert" stock pickers lose to just buying everything and chilling. His index funds are the "just buy the whole market" option. Simple, cheap, and beats almost everyone trying to be smart.',
          keyTakeaway: 'Jack Bogles lesson: Low-cost index funds beat most "experts." Keep it simple.',
        }
      },
    ]
  },
]

// Quiz questions for testing knowledge
const QUIZZES: { [key: string]: { question: string; options: string[]; correct: number; explanation: string }[] } = {
  'what-is-stock': [
    {
      question: 'What do you own when you buy a stock?',
      options: ['A loan to the company', 'A small piece of the company', 'A product from the company', 'A job at the company'],
      correct: 1,
      explanation: 'When you buy stock, you become a partial owner (shareholder) of that company!'
    }
  ],
  'how-prices-move': [
    {
      question: 'What makes a stock price go UP?',
      options: ['More sellers than buyers', 'More buyers than sellers', 'The company releases a new product', 'The CEO tweets'],
      correct: 1,
      explanation: 'When more people want to buy (demand) than sell (supply), the price increases.'
    }
  ],
  'bull-bear-markets': [
    {
      question: 'A bear market means stock prices are...',
      options: ['Rising quickly', 'Falling 20% or more', 'Staying flat', 'At all-time highs'],
      correct: 1,
      explanation: 'A bear market is defined as a decline of 20% or more from recent highs. Bears swipe DOWN!'
    }
  ],
  'sp500-explained': [
    {
      question: 'The S&P 500 tracks how many of the largest US companies?',
      options: ['50', '100', '500', '5000'],
      correct: 2,
      explanation: 'The S&P 500 tracks the 500 largest US companies. The number is right in the name!'
    }
  ],
  'dividends': [
    {
      question: 'What are dividends?',
      options: ['Fees you pay to own stocks', 'Cash payments from companies to shareholders', 'Taxes on stock profits', 'Stock splits'],
      correct: 1,
      explanation: 'Dividends are cash payments companies make to shareholders - you get paid just for owning the stock!'
    }
  ],
  'pe-ratio': [
    {
      question: 'A higher P/E ratio usually means investors expect...',
      options: ['The company will go bankrupt', 'Big future growth', 'Lower stock prices', 'No dividends'],
      correct: 1,
      explanation: 'A high P/E means investors are paying more per dollar of profit, betting on future growth.'
    }
  ],
  'market-cap': [
    {
      question: 'Market cap equals...',
      options: ['Stock price times shares outstanding', 'Total revenue', 'CEO salary', 'Building value'],
      correct: 0,
      explanation: 'Market cap = stock price × total shares. Its the total value of all shares combined.'
    }
  ],
  'diversification': [
    {
      question: 'Why should you diversify your investments?',
      options: ['To show off how many stocks you own', 'So one bad stock doesnt ruin everything', 'Because its required by law', 'To confuse your friends'],
      correct: 1,
      explanation: 'Diversification protects you - if one investment fails, others can balance it out.'
    }
  ],
  'compound-growth': [
    {
      question: 'Why does Warren Buffett say starting young is so powerful?',
      options: ['Young people are smarter', 'More time for compound growth', 'Stocks are cheaper for kids', 'No taxes for teens'],
      correct: 1,
      explanation: 'Time is the biggest factor in compound growth. Starting at 15 vs 35 can mean 5-10x more money!'
    }
  ],
  'etfs-explained': [
    {
      question: 'An ETF is best described as...',
      options: ['A single stock', 'A bundle of many stocks in one', 'A type of bond', 'A savings account'],
      correct: 1,
      explanation: 'ETFs bundle many stocks together so you can buy diversification in one purchase.'
    }
  ],
  'index-funds': [
    {
      question: 'What percentage of professional stock pickers LOSE to simple index funds over 15 years?',
      options: ['About 10%', 'About 50%', 'About 90%', 'About 100%'],
      correct: 2,
      explanation: 'Studies show about 90% of professionals fail to beat index funds over 15 years. Keeping it simple wins!'
    }
  ],
  'inflation-enemy': [
    {
      question: 'If inflation is 3% and your savings account pays 1%, youre actually...',
      options: ['Gaining 4%', 'Gaining 2%', 'Losing 2% buying power', 'Breaking even'],
      correct: 2,
      explanation: 'If prices rise 3% but your money grows only 1%, you can buy 2% less stuff each year.'
    }
  ],
  'fomo-investing': [
    {
      question: 'If you only want to buy a stock because everyone on social media is buying it, you should probably...',
      options: ['Buy immediately before you miss out', 'Be cautious - youre probably late', 'Buy twice as much', 'Tell all your friends to buy too'],
      correct: 1,
      explanation: 'FOMO usually means youre late to the party. The best gains already happened.'
    }
  ],
  'panic-selling': [
    {
      question: 'Historically, after major market crashes, what has ALWAYS happened?',
      options: ['Markets stayed down forever', 'Markets eventually recovered', 'All companies went bankrupt', 'Trading was banned'],
      correct: 1,
      explanation: 'Every single market crash in history has been followed by a recovery. Patience wins.'
    }
  ],
  'timing-the-market': [
    {
      question: 'Missing just the 10 best days in the market over 20 years could cut your returns by...',
      options: ['About 5%', 'About 20%', 'About 40%', 'About 70%'],
      correct: 2,
      explanation: 'Missing the 10 best days dropped returns from 9.8% to 5.6% annually - about 40% less wealth over time!'
    }
  ],
  'warren-buffett': [
    {
      question: 'At what age did Warren Buffett start investing?',
      options: ['5 years old', '11 years old', '18 years old', '30 years old'],
      correct: 1,
      explanation: 'Buffett bought his first stock at 11. He says starting young was key to his success!'
    }
  ],
  'taxes-basics': [
    {
      question: 'To get the lower long-term capital gains tax rate, you must hold a stock for...',
      options: ['At least 1 day', 'At least 1 month', 'At least 1 year', 'At least 5 years'],
      correct: 2,
      explanation: 'Hold over 1 year = long-term rate (15% for most people) vs higher short-term rate.'
    }
  ],
  'order-types': [
    {
      question: 'A limit order lets you...',
      options: ['Buy at any price immediately', 'Set the exact price you want to pay', 'Buy unlimited shares', 'Skip paying fees'],
      correct: 1,
      explanation: 'Limit orders only execute at YOUR price or better. You control what you pay.'
    }
  ],
}

export default function LearnPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [, setLessonCompleted] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)

  // Game store
  const {
    lessonProgress,
    currentStreak,
    totalLessonsCompleted,
    completeLesson,
    submitQuiz,
  } = useGameStore()

  // Helper to check if a lesson is completed
  const isLessonCompleted = (lessonId: string, pathId: string) => {
    return lessonProgress.some(l => l.lessonId === lessonId && l.pathId === pathId && l.completed)
  }

  const totalLessons = LEARNING_PATHS.reduce((acc, path) => acc + path.lessons.length, 0)
  const completedLessonsCount = totalLessonsCompleted
  const earnedXp = lessonProgress.filter(l => l.completed).reduce((acc, l) => {
    const path = LEARNING_PATHS.find(p => p.id === l.pathId)
    const lesson = path?.lessons.find(les => les.id === l.lessonId)
    return acc + (lesson?.xp || 0)
  }, 0)

  const selectedPathData = LEARNING_PATHS.find(p => p.id === selectedPath)

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)

    // Check if answer is correct and award XP
    if (selectedLesson && selectedPath) {
      const quiz = QUIZZES[selectedLesson.id]
      const isCorrect = quiz && quizAnswer === quiz[0].correct
      if (isCorrect) {
        submitQuiz(selectedLesson.id, selectedPath, 1, 1)
        setXpEarned(prev => prev + 75) // Quiz XP bonus
      }
    }
  }

  const handleLessonComplete = () => {
    if (selectedLesson && selectedPath && !isLessonCompleted(selectedLesson.id, selectedPath)) {
      completeLesson(selectedLesson.id, selectedPath)
      setLessonCompleted(true)
      setXpEarned(prev => prev + selectedLesson.xp) // Lesson XP
    }
  }

  const resetQuiz = () => {
    setQuizAnswer(null)
    setQuizSubmitted(false)
    setLessonCompleted(false)
    setXpEarned(0)
  }

  // Lesson Detail View
  if (selectedLesson) {
    const quiz = QUIZZES[selectedLesson.id]
    const isCompleted = selectedPath ? isLessonCompleted(selectedLesson.id, selectedPath) : false

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* XP Earned Toast */}
        {xpEarned > 0 && (
          <div className="fixed top-4 right-4 z-50 animate-pulse">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl">
              <Zap className="w-6 h-6" />
              <div>
                <div className="font-bold">XP Earned!</div>
                <div className="text-amber-100 font-bold">+{xpEarned} XP</div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedLesson(null)
            resetQuiz()
            setShowQuiz(false)
          }}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back to {selectedPathData?.title}
        </button>

        {/* Lesson Header */}
        <div className="p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-600">
                  +{selectedLesson.xp} XP
                </span>
                <span className="flex items-center gap-1 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  {selectedLesson.duration}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-800">{selectedLesson.title}</h1>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Completed</span>
              </div>
            )}
          </div>

          {/* Definition */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-3">
              <BookOpen className="w-5 h-5 text-blue-500" />
              The Definition
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
              {selectedLesson.content.definition}
            </p>
          </div>

          {/* Real Example */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-3">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Real-World Example: {selectedLesson.content.realExample.company}
            </h2>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200">
              <p className="text-slate-700 leading-relaxed">
                {selectedLesson.content.realExample.explanation}
              </p>
            </div>
          </div>

          {/* Kid Breakdown */}
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Lets Break It Down
            </h2>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <p className="text-slate-700 leading-relaxed">
                {selectedLesson.content.kidBreakdown}
              </p>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-2">
              <Star className="w-5 h-5 text-yellow-300" />
              Key Takeaway
            </h2>
            <p className="text-lg font-medium text-white/90">
              {selectedLesson.content.keyTakeaway}
            </p>
          </div>

          {/* Complete Lesson Button */}
          {!isCompleted && !quiz && (
            <button
              onClick={handleLessonComplete}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-emerald-200 transition-all"
            >
              Complete Lesson (+{selectedLesson.xp} XP)
            </button>
          )}
        </div>

        {/* Quiz Section */}
        {quiz && (
          <div className="p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-sm">
            {!showQuiz ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Test Your Knowledge!</h2>
                <p className="text-slate-500 mb-6">Take a quick quiz to lock in what you learned</p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-200 transition-all"
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6">{quiz[0].question}</h2>
                <div className="space-y-3 mb-6">
                  {quiz[0].options.map((option, index) => {
                    let buttonClass = "w-full p-4 rounded-xl border-2 text-left font-medium transition-all "
                    if (quizSubmitted) {
                      if (index === quiz[0].correct) {
                        buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700"
                      } else if (index === quizAnswer) {
                        buttonClass += "border-red-500 bg-red-50 text-red-700"
                      } else {
                        buttonClass += "border-slate-200 text-slate-400"
                      }
                    } else {
                      buttonClass += quizAnswer === index
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 hover:border-blue-300 text-slate-700"
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !quizSubmitted && setQuizAnswer(index)}
                        className={buttonClass}
                        disabled={quizSubmitted}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </button>
                    )
                  })}
                </div>

                {quizSubmitted && (
                  <div className={`p-4 rounded-xl mb-6 ${
                    quizAnswer === quiz[0].correct
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    <p className="font-bold mb-1">
                      {quizAnswer === quiz[0].correct ? 'Correct!' : 'Not quite!'}
                    </p>
                    <p>{quiz[0].explanation}</p>
                  </div>
                )}

                {!quizSubmitted ? (
                  <button
                    onClick={() => {
                      handleQuizSubmit()
                      // Complete lesson when quiz is submitted
                      if (!isCompleted) {
                        handleLessonComplete()
                      }
                    }}
                    disabled={quizAnswer === null}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedLesson(null)
                      resetQuiz()
                      setShowQuiz(false)
                    }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold text-lg hover:shadow-lg transition-all"
                  >
                    Continue Learning
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Path Detail View
  if (selectedPathData) {
    const pathCompletedLessons = selectedPathData.lessons.filter(l => isLessonCompleted(l.id, selectedPathData.id)).length
    const pathTotalXp = selectedPathData.lessons.reduce((a, l) => a + l.xp, 0)
    const pathEarnedXp = selectedPathData.lessons.filter(l => isLessonCompleted(l.id, selectedPathData.id)).reduce((a, l) => a + l.xp, 0)

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPath(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back to Learning Paths
        </button>

        {/* Path Header */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${selectedPathData.bgGradient} p-8 text-white border border-black/20`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <selectedPathData.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{selectedPathData.title}</h1>
                <p className="text-white/80">{selectedPathData.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-white/70" />
                <span>{pathCompletedLessons}/{selectedPathData.lessons.length} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span>{pathEarnedXp}/{pathTotalXp} XP</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-3 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${(pathCompletedLessons / selectedPathData.lessons.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          {selectedPathData.lessons.map((lesson, index) => {
            const prevLesson = selectedPathData.lessons[index - 1]
            const prevLessonCompleted = prevLesson ? isLessonCompleted(prevLesson.id, selectedPathData.id) : true
            const isLocked = index > 0 && !prevLessonCompleted
            const completed = isLessonCompleted(lesson.id, selectedPathData.id)

            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && setSelectedLesson(lesson)}
                disabled={isLocked}
                className={`w-full flex items-center gap-5 p-5 rounded-2xl border-2 transition-all text-left ${
                  isLocked
                    ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed'
                    : completed
                    ? 'bg-white border-emerald-200 hover:border-emerald-300 hover:shadow-md'
                    : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* Lesson Number */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    isLocked
                      ? 'bg-slate-200 text-slate-400'
                      : completed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-br text-white'
                  }`}
                  style={!isLocked && !completed ? {
                    background: `linear-gradient(135deg, ${selectedPathData.color}, ${selectedPathData.color}cc)`
                  } : {}}
                >
                  {isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : completed ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                      <Zap className="w-4 h-4" />
                      +{lesson.xp} XP
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div>
                  {isLocked ? (
                    <span className="text-sm text-slate-400">Complete previous lesson</span>
                  ) : completed ? (
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Review
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold" style={{
                      background: `linear-gradient(135deg, ${selectedPathData.color}, ${selectedPathData.color}cc)`
                    }}>
                      <Play className="w-4 h-4" />
                      Start
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Main Learning Hub View
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-8 text-white border border-black/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Learning Hub</span>
            </div>
            <h1 className="text-4xl font-display font-bold mb-3">Level Up Your Money Skills</h1>
            <p className="text-white/80 mb-6 max-w-lg">
              Real lessons. Real examples. Learn what the pros know, explained simply.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">{completedLessonsCount}/{totalLessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{earnedXp} XP Earned</span>
              </div>
            </div>
          </div>

          {/* Mascot or illustration */}
          <div className="hidden lg:block">
            <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-6xl">📚</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-emerald-500">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-600">Progress</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600">{totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0}%</div>
          <div className="mt-2 h-2 rounded-full bg-emerald-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-amber-500">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-600">Total XP</span>
          </div>
          <div className="text-3xl font-bold text-amber-600">{earnedXp}</div>
          <p className="text-sm text-slate-500 mt-1">Keep learning to earn more!</p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-violet-500">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-600">Current Streak</span>
          </div>
          <div className="text-3xl font-bold text-violet-600">{currentStreak} Days</div>
          <p className="text-sm text-slate-500 mt-1">{currentStreak > 0 ? "You're on fire! 🔥" : "Start your streak today!"}</p>
        </div>
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Learning Paths</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING_PATHS.map((path) => {
            const pathCompleted = path.lessons.filter(l => isLessonCompleted(l.id, path.id)).length
            const pathProgress = (pathCompleted / path.lessons.length) * 100
            const Icon = path.icon

            return (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className="group text-left p-6 rounded-2xl bg-white border-2 border-slate-100 border-black/10 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${path.color}10, ${path.color}05)` }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${path.color}, ${path.color}cc)` }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-1">{path.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{path.description}</p>

                  {/* Progress */}
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500">{pathCompleted}/{path.lessons.length} lessons</span>
                    <span className="font-bold" style={{ color: path.color }}>{Math.round(pathProgress)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pathProgress}%`,
                        background: `linear-gradient(90deg, ${path.color}, ${path.color}cc)`
                      }}
                    />
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center gap-2 font-semibold" style={{ color: path.color }}>
                    {pathProgress === 100 ? 'Review' : pathProgress > 0 ? 'Continue' : 'Start'} Learning
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Why Learn Section */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-100 border-black/10">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          Why Learn Investing Young?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-bold text-slate-800 mb-2">Compound Growth</h3>
            <p className="text-sm text-slate-500">
              $1,000 invested at 15 could become $88,000 by 65. Same money at 35 = only $17,000. Time is your superpower!
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-bold text-slate-800 mb-2">Build Good Habits</h3>
            <p className="text-sm text-slate-500">
              Learn to research, be patient, and think long-term. These skills help in school, careers, and life.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💪</div>
            <h3 className="font-bold text-slate-800 mb-2">Financial Freedom</h3>
            <p className="text-sm text-slate-500">
              Understanding money = more choices in life. Skip the paycheck-to-paycheck stress that most adults face.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
