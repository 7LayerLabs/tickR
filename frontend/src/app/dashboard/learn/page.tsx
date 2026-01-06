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
  Lightbulb,
  ChevronRight,
  Clock,
  ArrowRight,
  Sparkles,
  BarChart3,
  Target,
  Shield,
  PiggyBank,
  DollarSign,
  Award,
} from 'lucide-react'
import {
  LearnIcon,
  TrophyIcon,
  GoalIcon,
  StrategyIcon,
  RocketIcon,
} from '@/components/icons/TickRIcons'

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
          kidBreakdown: 'Buffett is 94 years old and has been investing since he was YOUR age. He didnt get rich quick - he got rich SLOW, letting compound growth work for 80+ years. He says "the stock market transfers money from the impatient to the patient."',
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

// Path-level quizzes - comprehensive quiz at end of each learning path
const PATH_QUIZZES: { [pathId: string]: { question: string; options: string[]; correct: number; explanation: string }[] } = {
  'basics': [
    {
      question: 'What do you actually own when you buy a stock?',
      options: ['A loan to the company', 'A small piece of ownership in the company', 'A product the company makes', 'A guaranteed profit'],
      correct: 1,
      explanation: 'When you buy stock, you become a partial owner (shareholder) of that company. You own a tiny piece of the business!'
    },
    {
      question: 'What causes a stock price to go UP?',
      options: ['The CEO makes a speech', 'More people want to sell than buy', 'More people want to buy than sell', 'The company changes its logo'],
      correct: 2,
      explanation: 'Supply and demand! When more people want to buy (demand) than sell (supply), the price increases.'
    },
    {
      question: 'A "bear market" means stock prices have fallen by at least...',
      options: ['5%', '10%', '20%', '50%'],
      correct: 2,
      explanation: 'A bear market is officially defined as a 20% or more decline from recent highs. Bears swipe DOWN!'
    },
    {
      question: 'The S&P 500 tracks how many of the largest US companies?',
      options: ['50 companies', '100 companies', '500 companies', '5,000 companies'],
      correct: 2,
      explanation: 'The S&P 500 tracks the 500 largest US companies. The number is right in the name! Its the most-watched market index.'
    },
    {
      question: 'US stock markets are open from...',
      options: ['24 hours a day', '9:30 AM - 4:00 PM Eastern, Monday-Friday', '8:00 AM - 6:00 PM, every day', 'Only on weekends'],
      correct: 1,
      explanation: 'Regular market hours are 9:30 AM to 4:00 PM Eastern Time, Monday through Friday (excluding holidays).'
    },
    {
      question: 'Which statement about bull and bear markets is TRUE?',
      options: ['Bear markets last forever', 'Bull markets mean prices are falling', 'Both bull and bear markets are normal cycles', 'You should only invest during bull markets'],
      correct: 2,
      explanation: 'Bull (rising) and bear (falling) markets are both normal parts of the market cycle. Historically, markets always recover from bear markets.'
    }
  ],
  'reading-stocks': [
    {
      question: 'What is a ticker symbol?',
      options: ['The companys phone number', 'A unique abbreviation identifying a stock', 'The stock price', 'The CEOs name'],
      correct: 1,
      explanation: 'Ticker symbols are short codes that identify stocks - like AAPL for Apple, GOOGL for Google, DIS for Disney.'
    },
    {
      question: 'Market capitalization (market cap) equals...',
      options: ['Stock price × number of shares', 'Total company revenue', 'Profit divided by shares', 'The CEOs salary'],
      correct: 0,
      explanation: 'Market cap = stock price × total shares outstanding. It represents the total market value of a company.'
    },
    {
      question: 'A company with a P/E ratio of 50 vs one with P/E of 15 means...',
      options: ['The first company is definitely better', 'Investors expect more growth from the first company', 'The second company will go bankrupt', 'P/E doesnt matter at all'],
      correct: 1,
      explanation: 'Higher P/E means investors pay more per dollar of profit, betting the company will grow faster. Its not always "better" - just different expectations.'
    },
    {
      question: 'What are dividends?',
      options: ['Fees you pay to own stocks', 'Cash payments companies make to shareholders', 'Taxes on your profits', 'The price of one share'],
      correct: 1,
      explanation: 'Dividends are cash payments (usually quarterly) that some companies pay to shareholders. You get paid just for owning the stock!'
    },
    {
      question: 'When a company does a 4-for-1 stock split, what happens to your shares?',
      options: ['You lose 75% of your shares', 'You get 4x the shares at 1/4 the price each', 'Nothing changes', 'You must sell immediately'],
      correct: 1,
      explanation: 'In a 4-for-1 split, each share becomes 4 shares at 1/4 the price. Your total value stays the same - just more pieces!'
    },
    {
      question: 'Earnings reports come out...',
      options: ['Every day', 'Every week', 'Every 3 months (quarterly)', 'Once per year'],
      correct: 2,
      explanation: 'Public companies report earnings quarterly (every 3 months). These reports often cause big stock price moves based on whether results beat or miss expectations.'
    },
    {
      question: 'A "limit order" lets you...',
      options: ['Buy unlimited shares', 'Set the exact maximum price youll pay', 'Skip all trading fees', 'Trade after hours only'],
      correct: 1,
      explanation: 'Limit orders only execute at your specified price or better. You control exactly what you pay instead of accepting whatever the current price is.'
    },
    {
      question: 'If a stocks chart shows mostly green over the past year, it means...',
      options: ['The company is environmentally friendly', 'The stock price has generally gone up', 'The company is new', 'You should definitely buy it'],
      correct: 1,
      explanation: 'Green typically indicates price increases on stock charts (red = decreases). A year of green suggests an upward trend, but past performance doesnt guarantee future results!'
    }
  ],
  'investing-strategies': [
    {
      question: 'Diversification means...',
      options: ['Buying only one stock you really believe in', 'Spreading money across different investments', 'Changing your strategy every day', 'Only buying tech stocks'],
      correct: 1,
      explanation: 'Diversification spreads your money across different stocks, sectors, and asset types so one bad investment doesnt ruin everything.'
    },
    {
      question: 'The "buy and hold" strategy means...',
      options: ['Buy stocks and sell them the next day', 'Hold onto cash and never invest', 'Buy quality stocks and keep them for years', 'Only hold stocks during bull markets'],
      correct: 2,
      explanation: 'Buy and hold means purchasing stocks and keeping them for years, ignoring short-term ups and downs. Time in the market beats timing the market!'
    },
    {
      question: 'Dollar-cost averaging (DCA) involves...',
      options: ['Investing all your money at once', 'Investing the same amount at regular intervals', 'Only buying when prices are low', 'Converting dollars to other currencies'],
      correct: 1,
      explanation: 'DCA means investing a fixed amount regularly (like $100/month) regardless of price. You automatically buy more shares when cheap, fewer when expensive.'
    },
    {
      question: 'Compound growth is powerful because...',
      options: ['You pay less taxes', 'Your earnings earn their own earnings over time', 'Stocks always go up', 'Brokers give you bonuses'],
      correct: 1,
      explanation: 'Compound growth means your gains generate their own gains. $1,000 at 10% becomes $1,100, then that earns 10% ($110), and it snowballs over time!'
    },
    {
      question: 'If you invest $1,000 at age 15 vs age 35 (both earning 10% annually until 65)...',
      options: ['Theyd be worth the same', 'Starting at 15 would be worth about 5-6x more', 'Starting at 35 would be worth more', 'Neither would grow much'],
      correct: 1,
      explanation: 'Starting at 15 gives you 50 years of compounding vs 30 years. That extra 20 years makes a MASSIVE difference - potentially 5-6x more money!'
    }
  ],
  'risk-management': [
    {
      question: 'Which investment typically has the HIGHEST risk AND highest potential return?',
      options: ['US Government Bonds', 'Savings account', 'Individual stocks or crypto', 'CDs (Certificates of Deposit)'],
      correct: 2,
      explanation: 'Individual stocks and crypto can have huge gains but also huge losses. Bonds and savings accounts are safer but return less. Higher potential reward = higher risk.'
    },
    {
      question: 'Volatility in stocks refers to...',
      options: ['How much a stocks price swings up and down', 'The companys electricity usage', 'How loud the trading floor is', 'The number of shares available'],
      correct: 0,
      explanation: 'Volatility measures price swings. High volatility = big moves (exciting but stressful). Low volatility = steadier prices (calmer but less dramatic gains).'
    },
    {
      question: 'A stop-loss order is designed to...',
      options: ['Guarantee you never lose money', 'Automatically sell if a stock drops to a certain price', 'Stop you from buying more', 'Eliminate all risk'],
      correct: 1,
      explanation: 'Stop-losses automatically sell your shares if they drop to your specified price, limiting potential losses. They dont guarantee anything but help manage risk.'
    },
    {
      question: 'The "golden rule" of investing is...',
      options: ['Buy low, sell high every time', 'Never invest in anything', 'Only invest money you can afford to lose', 'Always follow social media tips'],
      correct: 2,
      explanation: 'Never invest money you need soon (rent, tuition, emergencies). Only invest money you wont need for 5+ years and could lose without ruining your life.'
    },
    {
      question: 'If you need money for college in 2 years, you should probably...',
      options: ['Put it all in high-risk stocks for maximum growth', 'Keep it in a safe savings account or short-term bonds', 'Invest in crypto for quick gains', 'Give it to a friend to invest'],
      correct: 1,
      explanation: 'Money needed soon should be kept safe. Stocks can drop 30%+ in a year - you cant risk having less than you need when college bills are due!'
    }
  ],
  'investment-types': [
    {
      question: 'An ETF (Exchange-Traded Fund) is best described as...',
      options: ['A single companys stock', 'A bundle of many stocks that trades like one stock', 'A government bond', 'A type of savings account'],
      correct: 1,
      explanation: 'ETFs bundle many stocks together. Buy one share of SPY and you own tiny pieces of 500 companies! Instant diversification.'
    },
    {
      question: 'Index funds are popular because...',
      options: ['They guarantee profits', 'They beat 90% of professional stock pickers over 15+ years', 'They have the highest fees', 'Warren Buffett invented them'],
      correct: 1,
      explanation: 'Studies show about 90% of professional fund managers fail to beat simple index funds over 15 years. Low fees + market returns = winning formula!'
    },
    {
      question: 'When you buy a bond, you are essentially...',
      options: ['Buying ownership in a company', 'Lending money in exchange for interest payments', 'Gambling on price movements', 'Buying real estate'],
      correct: 1,
      explanation: 'Bonds are loans you make to companies or governments. They promise to pay you back with interest. Safer than stocks but lower returns.'
    },
    {
      question: 'Inflation is a problem for savers because...',
      options: ['It makes money grow faster', 'Each dollar buys less over time', 'Banks charge more fees', 'It only affects rich people'],
      correct: 1,
      explanation: 'Inflation means prices rise over time. If your savings earn 1% but inflation is 3%, youre actually losing 2% buying power each year!'
    },
    {
      question: 'Mutual funds differ from ETFs mainly because...',
      options: ['Mutual funds have professional managers and usually higher fees', 'ETFs never hold stocks', 'Mutual funds are always better', 'Theres no difference'],
      correct: 0,
      explanation: 'Mutual funds hire managers to pick stocks (active management) with higher fees. Most still lose to simple index ETFs that just track the market passively.'
    },
    {
      question: 'To beat inflation over time, you generally need investments that return more than...',
      options: ['0% per year', 'The inflation rate (historically ~2-3%)', '50% per year', 'Whatever your friend earns'],
      correct: 1,
      explanation: 'Your investments need to outpace inflation (~2-3% historically) just to maintain buying power. Stocks (~10% average) beat inflation; savings accounts often dont.'
    }
  ],
  'common-mistakes': [
    {
      question: 'FOMO (Fear Of Missing Out) in investing typically leads to...',
      options: ['Buying low and selling high', 'Making patient, well-researched decisions', 'Buying at the top after a stock has already surged', 'Guaranteed profits'],
      correct: 2,
      explanation: 'FOMO makes people chase stocks that already went up. By the time everyone is talking about it, the best gains are usually over. Youre often buying the top.'
    },
    {
      question: 'Panic selling during a market crash is bad because...',
      options: ['It locks in your losses right before a potential recovery', 'You have to pay a penalty fee', 'Its illegal', 'Panic selling is actually smart'],
      correct: 0,
      explanation: 'Every market crash in history has been followed by a recovery. Panic selling locks in losses and means you miss the rebound. Patience beats panic.'
    },
    {
      question: 'When influencers on social media hype a stock, you should...',
      options: ['Buy immediately before you miss out', 'Remember they often sell while telling others to buy', 'Invest your entire savings', 'Trust them completely'],
      correct: 1,
      explanation: 'Many influencers profit by hyping stocks they already own, then selling to their followers at higher prices. Always do your own research!'
    },
    {
      question: 'Checking your portfolio multiple times per day is...',
      options: ['Necessary for success', 'Likely to cause anxiety and bad decisions', 'Required by law', 'The only way to make money'],
      correct: 1,
      explanation: 'The market is up only 53% of DAYS but 95% of 20-YEAR periods. Checking constantly creates stress and tempts you to make emotional trades. Check monthly, not hourly.'
    },
    {
      question: '"Time in the market" beats "timing the market" because...',
      options: ['You can perfectly predict market movements', 'Missing just the 10 best days can cut returns nearly in half', 'Day trading always works', 'The market never goes up'],
      correct: 1,
      explanation: 'The biggest gains happen suddenly and unexpectedly. Missing just the 10 best days over 20 years can cut your returns from 9.8% to 5.6% annually!'
    },
    {
      question: 'Following a "hot tip" from someone who "guarantees" profits is...',
      options: ['A great strategy', 'Usually a scam or very risky', 'How Warren Buffett got rich', 'Required for new investors'],
      correct: 1,
      explanation: 'No one can guarantee profits in the stock market. If someone claims to, theyre either lying or dont understand investing. Do your own research always!'
    }
  ],
  'real-world': [
    {
      question: 'A brokerage account is...',
      options: ['A type of loan', 'Where you hold and trade stocks', 'Only for professional traders', 'Illegal for beginners'],
      correct: 1,
      explanation: 'A brokerage account is like a bank account but for investments. You deposit money, then use it to buy stocks, ETFs, bonds, etc.'
    },
    {
      question: 'Before age 18, you can invest through...',
      options: ['Your own regular brokerage account', 'A custodial account with a parent/guardian', 'You cannot invest at all until 18', 'Only cryptocurrency apps'],
      correct: 1,
      explanation: 'Custodial accounts (UGMA/UTMA) or teen accounts like Fidelity Youth let minors invest with parent oversight. The money is yours, but parents manage it until you turn 18-21.'
    },
    {
      question: 'Holding a stock for MORE than 1 year before selling means you pay...',
      options: ['Higher taxes (short-term rate)', 'Lower taxes (long-term rate)', 'No taxes at all', 'A penalty fee'],
      correct: 1,
      explanation: 'Long-term capital gains (held >1 year) are taxed at a lower rate than short-term gains. Another reason patience pays in investing!'
    },
    {
      question: 'Paper trading (like TickR) is valuable because...',
      options: ['You make real money without risk', 'It builds skills before real money is on the line', 'Its more exciting than real trading', 'Professionals dont use it'],
      correct: 1,
      explanation: 'Paper trading lets you practice with fake money, learn from mistakes safely, and build good habits before real money adds emotional pressure.'
    },
    {
      question: 'When youre ready to invest real money, the FIRST thing you should have is...',
      options: ['A hot stock tip', 'An emergency fund and money you wont need for years', 'At least $10,000', 'A guarantee from your broker'],
      correct: 1,
      explanation: 'Before investing, make sure you have an emergency fund and only invest money you truly wont need for 5+ years. Never invest rent or tuition money!'
    }
  ],
  'famous-investors': [
    {
      question: 'Warren Buffetts famous investing approach is called...',
      options: ['Day trading', 'Value investing - buying great companies and holding forever', 'Crypto speculation', 'Timing the market perfectly'],
      correct: 1,
      explanation: 'Buffett is known for value investing: buying wonderful companies at fair prices and holding them forever. His favorite holding period is "forever."'
    },
    {
      question: 'Warren Buffett started investing at age...',
      options: ['5', '11', '21', '35'],
      correct: 1,
      explanation: 'Buffett bought his first stock at 11 years old. He says starting young and letting compound growth work for decades was key to his success.'
    },
    {
      question: 'Peter Lynchs famous advice is to "invest in what you..."',
      options: ['Hear about on TV', 'Know and understand from daily life', 'Can trade the fastest', 'Your friends recommend'],
      correct: 1,
      explanation: 'Lynch found winners like Dunkin Donuts by noticing long lines. He says regular people can spot trends in products they use before Wall Street does.'
    },
    {
      question: 'Jack Bogles biggest contribution to investing was...',
      options: ['Inventing day trading', 'Creating the first index fund', 'Starting a hedge fund', 'Discovering Bitcoin'],
      correct: 1,
      explanation: 'Bogle founded Vanguard and created the first index fund in 1976. Wall Street mocked him, but his simple, low-cost approach now beats 90% of professionals.'
    },
    {
      question: 'The common lesson from ALL legendary investors is...',
      options: ['Get rich quick with hot tips', 'Be patient, think long-term, and dont let emotions drive decisions', 'Check prices every minute', 'Follow the crowd'],
      correct: 1,
      explanation: 'Buffett, Lynch, and Bogle all emphasize patience, long-term thinking, and keeping emotions in check. Success comes from discipline, not excitement.'
    }
  ]
}

export default function LearnPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null)
  const [, setLessonCompleted] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)

  // Path quiz state
  const [showPathQuiz, setShowPathQuiz] = useState(false)
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([])
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizResults, setQuizResults] = useState<boolean[]>([])
  const [pathQuizScores, setPathQuizScores] = useState<{ [pathId: string]: { score: number; total: number; passed: boolean } }>({})

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

  const handleLessonComplete = () => {
    if (selectedLesson && selectedPath && !isLessonCompleted(selectedLesson.id, selectedPath)) {
      completeLesson(selectedLesson.id, selectedPath)
      setLessonCompleted(true)
      setXpEarned(prev => prev + selectedLesson.xp) // Lesson XP
    }
  }

  // Start path quiz
  const startPathQuiz = (pathId: string) => {
    const quiz = PATH_QUIZZES[pathId]
    if (quiz) {
      setQuizAnswers(new Array(quiz.length).fill(null))
      setQuizResults([])
      setCurrentQuizQuestion(0)
      setQuizSubmitted(false)
      setShowPathQuiz(true)
    }
  }

  // Submit entire path quiz
  const handlePathQuizSubmit = () => {
    if (!selectedPath) return
    const quiz = PATH_QUIZZES[selectedPath]
    if (!quiz) return

    // Calculate results
    const results = quizAnswers.map((answer, index) => answer === quiz[index].correct)
    setQuizResults(results)
    setQuizSubmitted(true)

    const score = results.filter(r => r).length
    const total = quiz.length
    const percentage = (score / total) * 100
    const passed = percentage >= 70

    // Save score
    setPathQuizScores(prev => ({
      ...prev,
      [selectedPath]: { score, total, passed }
    }))

    // Award XP
    if (passed) {
      const baseXp = 200 // PATH_QUIZ_PASS
      const perfectBonus = score === total ? 150 : 0 // QUIZ_PERFECT bonus
      setXpEarned(baseXp + perfectBonus)
      // Also submit to game store
      submitQuiz(selectedPath, selectedPath, score, total)
    }
  }

  // Reset path quiz
  const resetPathQuiz = () => {
    setShowPathQuiz(false)
    setCurrentQuizQuestion(0)
    setQuizAnswers([])
    setQuizResults([])
    setQuizSubmitted(false)
    setXpEarned(0)
  }

  // Check if all lessons in a path are completed
  const isPathComplete = (pathId: string) => {
    const path = LEARNING_PATHS.find(p => p.id === pathId)
    if (!path) return false
    return path.lessons.every(lesson => isLessonCompleted(lesson.id, pathId))
  }

  // Check if path quiz is passed
  const isPathQuizPassed = (pathId: string) => {
    return pathQuizScores[pathId]?.passed || false
  }

  // Lesson Detail View
  if (selectedLesson) {
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
            setXpEarned(0)
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
          {!isCompleted && (
            <button
              onClick={handleLessonComplete}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-emerald-200 transition-all"
            >
              Complete Lesson (+{selectedLesson.xp} XP)
            </button>
          )}
        </div>
      </div>
    )
  }

  // Path Detail View
  if (selectedPathData) {
    const pathCompletedLessons = selectedPathData.lessons.filter(l => isLessonCompleted(l.id, selectedPathData.id)).length
    const pathTotalXp = selectedPathData.lessons.reduce((a, l) => a + l.xp, 0)
    const pathEarnedXp = selectedPathData.lessons.filter(l => isLessonCompleted(l.id, selectedPathData.id)).reduce((a, l) => a + l.xp, 0)
    const allLessonsComplete = pathCompletedLessons === selectedPathData.lessons.length
    const pathQuiz = PATH_QUIZZES[selectedPathData.id]
    const pathQuizScore = pathQuizScores[selectedPathData.id]

    // Show Path Quiz View
    if (showPathQuiz && pathQuiz) {
      const currentQ = pathQuiz[currentQuizQuestion]
      const totalQuestions = pathQuiz.length
      const answeredCount = quizAnswers.filter(a => a !== null).length

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
            onClick={resetPathQuiz}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to {selectedPathData.title}
          </button>

          {/* Quiz Header */}
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${selectedPathData.bgGradient} p-6 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedPathData.title} Quiz</h1>
                  <p className="text-white/80">Test your knowledge - 70% to pass</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentQuizQuestion + 1}/{totalQuestions}</div>
                <div className="text-white/80 text-sm">{answeredCount} answered</div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${((currentQuizQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Quiz Results */}
          {quizSubmitted ? (
            <div className="p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-sm">
              {/* Score Display */}
              <div className="text-center mb-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  pathQuizScore?.passed ? 'bg-emerald-100' : 'bg-amber-100'
                }`}>
                  {pathQuizScore?.passed ? (
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  ) : (
                    <Target className="w-12 h-12 text-amber-500" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  {pathQuizScore?.passed ? 'Congratulations!' : 'Almost There!'}
                </h2>
                <p className="text-xl text-slate-600 mb-4">
                  You scored {pathQuizScore?.score}/{pathQuizScore?.total} ({Math.round((pathQuizScore?.score || 0) / (pathQuizScore?.total || 1) * 100)}%)
                </p>
                {pathQuizScore?.passed ? (
                  <p className="text-emerald-600 font-semibold">You've mastered {selectedPathData.title}!</p>
                ) : (
                  <p className="text-amber-600 font-semibold">You need 70% to pass. Review the lessons and try again!</p>
                )}
              </div>

              {/* Answer Review */}
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-slate-800 text-lg">Review Your Answers</h3>
                {pathQuiz.map((q, index) => (
                  <div key={index} className={`p-4 rounded-xl border-2 ${
                    quizResults[index] ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        quizResults[index] ? 'bg-emerald-500' : 'bg-red-500'
                      }`}>
                        {quizResults[index] ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white text-xs font-bold">✕</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 mb-1">{q.question}</p>
                        <p className="text-sm text-slate-600">
                          <span className="font-semibold">Your answer:</span> {q.options[quizAnswers[index] ?? 0]}
                        </p>
                        {!quizResults[index] && (
                          <p className="text-sm text-emerald-700 mt-1">
                            <span className="font-semibold">Correct:</span> {q.options[q.correct]}
                          </p>
                        )}
                        <p className="text-sm text-slate-500 mt-2 italic">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!pathQuizScore?.passed && (
                  <button
                    onClick={() => startPathQuiz(selectedPathData.id)}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg hover:shadow-lg transition-all"
                  >
                    Try Again
                  </button>
                )}
                <button
                  onClick={() => {
                    resetPathQuiz()
                    if (pathQuizScore?.passed) {
                      setSelectedPath(null)
                    }
                  }}
                  className={`${pathQuizScore?.passed ? 'flex-1' : ''} py-4 px-8 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold text-lg hover:shadow-lg transition-all`}
                >
                  {pathQuizScore?.passed ? 'Continue to Next Path' : 'Back to Lessons'}
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Question */
            <div className="p-8 rounded-3xl bg-white border-2 border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-6">{currentQ.question}</h2>
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newAnswers = [...quizAnswers]
                      newAnswers[currentQuizQuestion] = index
                      setQuizAnswers(newAnswers)
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                      quizAnswers[currentQuizQuestion] === index
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-blue-300 text-slate-700'
                    }`}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {currentQuizQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuizQuestion(prev => prev - 1)}
                    className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 transition-all"
                  >
                    Previous
                  </button>
                )}
                <div className="flex-1" />
                {currentQuizQuestion < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQuizQuestion(prev => prev + 1)}
                    disabled={quizAnswers[currentQuizQuestion] === null}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handlePathQuizSubmit}
                    disabled={quizAnswers.some(a => a === null)}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>

              {/* Question Navigator */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-3">Jump to question:</p>
                <div className="flex flex-wrap gap-2">
                  {pathQuiz.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuizQuestion(index)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        index === currentQuizQuestion
                          ? 'bg-blue-500 text-white'
                          : quizAnswers[index] !== null
                          ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

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

        {/* Path Quiz Section */}
        {pathQuiz && (
          <div className="p-6 rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedPathData.bgGradient} flex items-center justify-center`}>
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Path Quiz</h3>
                  <p className="text-slate-500 text-sm">
                    {pathQuizScore?.passed
                      ? `Passed with ${pathQuizScore.score}/${pathQuizScore.total} (${Math.round(pathQuizScore.score / pathQuizScore.total * 100)}%)`
                      : `${pathQuiz.length} questions • 70% to pass • +200 XP`
                    }
                  </p>
                </div>
              </div>
              <div>
                {pathQuizScore?.passed ? (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    Completed
                  </span>
                ) : allLessonsComplete ? (
                  <button
                    onClick={() => startPathQuiz(selectedPathData.id)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-violet-200 transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    Take Quiz
                  </button>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-400 font-semibold">
                    <Lock className="w-4 h-4" />
                    Complete all lessons first
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Main Learning Hub View
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/20 via-navy-800 to-navy-900 p-8 text-cream-100 border border-orange-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-gold-400" />
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Learning Hub</span>
            </div>
            <h1 className="text-4xl font-display font-bold mb-3">Level Up Your <span className="text-orange-400">Money Skills</span></h1>
            <p className="text-slate-300 mb-6 max-w-lg">
              Real lessons. Real examples. Learn what the pros know, explained simply.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/50 border border-white/10">
                <BookOpen className="w-5 h-5 text-orange-400" />
                <span className="font-semibold">{completedLessonsCount}/{totalLessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/50 border border-white/10">
                <Zap className="w-5 h-5 text-gold-400" />
                <span className="font-semibold">{earnedXp} XP Earned</span>
              </div>
            </div>
          </div>

          {/* Icon */}
          <div className="hidden lg:block">
            <LearnIcon size={100} />
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-navy-800 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <TrophyIcon size={40} />
            <span className="font-display font-semibold text-slate-300">Progress</span>
          </div>
          <div className="text-3xl font-display font-bold text-teal-400">{totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0}%</div>
          <div className="mt-2 h-2 rounded-full bg-navy-900 overflow-hidden">
            <div
              className="h-full rounded-full bg-teal-400 transition-all"
              style={{ width: `${totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-navy-800 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <RocketIcon size={40} />
            <span className="font-display font-semibold text-slate-300">Total XP</span>
          </div>
          <div className="text-3xl font-display font-bold text-orange-400">{earnedXp}</div>
          <p className="text-sm text-slate-500 mt-1">Keep learning to earn more!</p>
        </div>

        <div className="p-6 rounded-2xl bg-navy-800 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <GoalIcon size={40} />
            <span className="font-display font-semibold text-slate-300">Current Streak</span>
          </div>
          <div className="text-3xl font-display font-bold text-gold-400">{currentStreak} Days</div>
          <p className="text-sm text-slate-500 mt-1">{currentStreak > 0 ? "You're on fire! 🔥" : "Start your streak today!"}</p>
        </div>
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-2xl font-display font-bold text-cream-100 mb-5">Learning Paths</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEARNING_PATHS.map((path) => {
            const pathCompleted = path.lessons.filter(l => isLessonCompleted(l.id, path.id)).length
            const pathProgress = (pathCompleted / path.lessons.length) * 100
            const Icon = path.icon

            return (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className="group text-left p-6 rounded-2xl bg-navy-800 border border-white/10 hover:border-orange-500/30 hover:shadow-glow-orange transition-all duration-300 overflow-hidden relative"
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${path.color}15, transparent)` }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${path.color}, ${path.color}cc)` }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-cream-100 mb-1">{path.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{path.description}</p>

                  {/* Progress */}
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500">{pathCompleted}/{path.lessons.length} lessons</span>
                    <span className="font-bold" style={{ color: path.color }}>{Math.round(pathProgress)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-navy-900 overflow-hidden">
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
      <div className="p-6 rounded-3xl bg-navy-800 border border-white/10">
        <h2 className="text-xl font-display font-bold text-cream-100 mb-6 flex items-center gap-3">
          <StrategyIcon size={40} />
          Why Learn Investing Young?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-2xl bg-navy-900/50 border border-white/5">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-display font-bold text-cream-100 mb-2">Compound Growth</h3>
            <p className="text-sm text-slate-400">
              $1,000 invested at 15 could become $88,000 by 65. Same money at 35 = only $17,000. Time is your superpower!
            </p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-navy-900/50 border border-white/5">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-display font-bold text-cream-100 mb-2">Build Good Habits</h3>
            <p className="text-sm text-slate-400">
              Learn to research, be patient, and think long-term. These skills help in school, careers, and life.
            </p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-navy-900/50 border border-white/5">
            <div className="text-4xl mb-3">💪</div>
            <h3 className="font-display font-bold text-cream-100 mb-2">Financial Freedom</h3>
            <p className="text-sm text-slate-400">
              Understanding money = more choices in life. Skip the paycheck-to-paycheck stress that most adults face.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
