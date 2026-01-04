import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function seedSectors() {
  console.log('🌱 Seeding sectors...');

  const sectors = [
    {
      id: '1',
      name: 'technology',
      displayName: 'Technology',
      description: 'Companies building software, hardware, and digital services',
      icon: '💻',
      isStarter: true,
      unlockLevel: 1,
      unlockPoints: 0
    },
    {
      id: '2',
      name: 'fashion',
      displayName: 'Fashion & Lifestyle',
      description: 'Clothing, accessories, and lifestyle brands',
      icon: '👗',
      isStarter: true,
      unlockLevel: 1,
      unlockPoints: 0
    },
    {
      id: '3',
      name: 'entertainment',
      displayName: 'Entertainment & Gaming',
      description: 'Movies, music, gaming, and streaming',
      icon: '🎮',
      isStarter: true,
      unlockLevel: 1,
      unlockPoints: 0
    },
    {
      id: '4',
      name: 'brands',
      displayName: 'Everyday Brands',
      description: 'Companies you see every day (fast food, retail)',
      icon: '🏪',
      isStarter: true,
      unlockLevel: 1,
      unlockPoints: 0
    },
    {
      id: '5',
      name: 'healthcare',
      displayName: 'Healthcare',
      description: 'Medical devices, pharmaceuticals, hospitals',
      icon: '🏥',
      isStarter: false,
      unlockLevel: 3,
      unlockPoints: 250
    },
    {
      id: '6',
      name: 'finance',
      displayName: 'Finance',
      description: 'Banks, payment processors, insurance',
      icon: '💰',
      isStarter: false,
      unlockLevel: 3,
      unlockPoints: 250
    },
    {
      id: '7',
      name: 'energy',
      displayName: 'Energy',
      description: 'Oil, gas, renewables, utilities',
      icon: '⚡',
      isStarter: false,
      unlockLevel: 4,
      unlockPoints: 500
    }
  ];

  for (const sector of sectors) {
    await prisma.sector.upsert({
      where: { name: sector.name },
      update: sector,
      create: sector
    });
  }

  console.log('✅ Sectors seeded');
}

async function seedMarketData() {
  console.log('🌱 Seeding market data...');

  const stocks = [
    {
      ticker: 'AAPL',
      companyName: 'Apple Inc',
      sector: 'Technology',
      price: 180.5,
      previousClose: 179.2,
      changePercent: 0.72,
      marketCap: 2800000000000,
      peRatio: 28.5,
      pegRatio: 2.1,
      growthPercent: 8.5,
      whatCompanyDoes: 'Apple designs and sells consumer electronics like iPhones, iPads, Macs, and Apple Watches',
      whyPeopleKnowIt: ['Creator of the iPhone', 'Known for sleek, premium design', 'Apple Stores worldwide', 'Loyal customer base'],
      revenueBreakdown: [
        { source: 'iPhone sales', percent: 52, icon: '📱' },
        { source: 'Services', percent: 20, icon: '☁️' },
        { source: 'Mac computers', percent: 10, icon: '💻' },
        { source: 'iPad & Wearables', percent: 18, icon: '⌚' }
      ],
      isAvailable: true
    },
    {
      ticker: 'MSFT',
      companyName: 'Microsoft Corporation',
      sector: 'Technology',
      price: 370.2,
      previousClose: 369.8,
      changePercent: 0.11,
      marketCap: 2750000000000,
      peRatio: 32.4,
      pegRatio: 2.8,
      growthPercent: 11.2,
      whatCompanyDoes: 'Microsoft creates software and cloud services including Windows, Office, and Azure',
      whyPeopleKnowIt: ['Windows operating system', 'Microsoft Office (Word, Excel)', 'Xbox gaming', 'Cloud services (Azure)'],
      revenueBreakdown: [
        { source: 'Productivity & Business Services', percent: 45, icon: '📊' },
        { source: 'Intelligent Cloud', percent: 35, icon: '☁️' },
        { source: 'More Personal Computing', percent: 20, icon: '💻' }
      ],
      isAvailable: true
    },
    {
      ticker: 'GOOGL',
      companyName: 'Alphabet Inc',
      sector: 'Technology',
      price: 140.3,
      previousClose: 139.1,
      changePercent: 0.86,
      marketCap: 1850000000000,
      peRatio: 24.5,
      pegRatio: 1.9,
      growthPercent: 12.8,
      whatCompanyDoes: 'Google (Alphabet) operates the search engine and advertising platform used by billions',
      whyPeopleKnowIt: ['Google Search', 'Google Maps', 'YouTube', 'Android operating system'],
      revenueBreakdown: [
        { source: 'Google Search Ads', percent: 60, icon: '🔍' },
        { source: 'YouTube Ads', percent: 20, icon: '🎥' },
        { source: 'Google Network', percent: 15, icon: '🌐' },
        { source: 'Other Bets', percent: 5, icon: '🚀' }
      ],
      isAvailable: true
    },
    {
      ticker: 'META',
      companyName: 'Meta Platforms Inc',
      sector: 'Technology',
      price: 450.1,
      previousClose: 448.5,
      changePercent: 0.36,
      marketCap: 1140000000000,
      peRatio: 28.9,
      pegRatio: 1.5,
      growthPercent: 18.3,
      whatCompanyDoes: 'Meta owns Facebook, Instagram, and WhatsApp - the worlds largest social networks',
      whyPeopleKnowIt: ['Facebook social network', 'Instagram photo sharing', 'WhatsApp messaging', 'VR/Metaverse focus'],
      revenueBreakdown: [
        { source: 'Facebook Ads', percent: 50, icon: '📘' },
        { source: 'Instagram Ads', percent: 35, icon: '📸' },
        { source: 'Other Revenue', percent: 15, icon: '💼' }
      ],
      isAvailable: true
    },
    {
      ticker: 'NKE',
      companyName: 'Nike Inc',
      sector: 'Fashion & Lifestyle',
      price: 110.4,
      previousClose: 109.2,
      changePercent: 1.1,
      marketCap: 170000000000,
      peRatio: 35.2,
      pegRatio: 2.5,
      growthPercent: 13.5,
      whatCompanyDoes: 'Nike designs and sells athletic shoes, apparel, and sports equipment worldwide',
      whyPeopleKnowIt: ['Iconic swoosh logo', 'LeBron James & celebrity endorsements', 'Air Jordan brand', 'Just Do It slogan'],
      revenueBreakdown: [
        { source: 'Footwear', percent: 65, icon: '👟' },
        { source: 'Apparel', percent: 30, icon: '👕' },
        { source: 'Equipment', percent: 5, icon: '⚽' }
      ],
      isAvailable: true
    },
    {
      ticker: 'NFLX',
      companyName: 'Netflix Inc',
      sector: 'Entertainment & Gaming',
      price: 425.6,
      previousClose: 420.2,
      changePercent: 1.28,
      marketCap: 185000000000,
      peRatio: 42.1,
      pegRatio: 1.2,
      growthPercent: 35.5,
      whatCompanyDoes: 'Netflix is a streaming service providing movies, TV shows, and documentaries',
      whyPeopleKnowIt: ['Streaming entertainment', 'Original content (Stranger Things, Crown)', 'Binge-watching culture', 'Global reach'],
      revenueBreakdown: [
        { source: 'Advertising', percent: 15, icon: '📺' },
        { source: 'Subscription', percent: 85, icon: '🎬' }
      ],
      isAvailable: true
    },
    {
      ticker: 'DIS',
      companyName: 'The Walt Disney Company',
      sector: 'Entertainment & Gaming',
      price: 92.3,
      previousClose: 90.8,
      changePercent: 1.65,
      marketCap: 168000000000,
      peRatio: 26.4,
      pegRatio: 1.8,
      growthPercent: 14.2,
      whatCompanyDoes: 'Disney creates movies, TV shows, theme parks, and owns ESPN and Marvel',
      whyPeopleKnowIt: ['Disney movies (Lion King, Frozen)', 'Disney Parks & Resorts', 'Marvel superhero movies', 'Disney+ streaming'],
      revenueBreakdown: [
        { source: 'Media & Entertainment Distribution', percent: 55, icon: '🎬' },
        { source: 'Disney Parks & Experiences', percent: 40, icon: '🎢' },
        { source: 'Other', percent: 5, icon: '🏰' }
      ],
      isAvailable: true
    },
    {
      ticker: 'MCD',
      companyName: 'McDonalds Corporation',
      sector: 'Everyday Brands',
      price: 291.5,
      previousClose: 289.2,
      changePercent: 0.8,
      marketCap: 216000000000,
      peRatio: 29.8,
      pegRatio: 2.2,
      growthPercent: 13.5,
      whatCompanyDoes: 'McDonalds operates the worlds largest fast food restaurant chain',
      whyPeopleKnowIt: ['Golden arches logo', 'Hamburgers & fries', 'Global presence', 'Happy Meals'],
      revenueBreakdown: [
        { source: 'Franchised restaurants', percent: 70, icon: '🍔' },
        { source: 'Company-operated restaurants', percent: 25, icon: '🍟' },
        { source: 'Other', percent: 5, icon: '💼' }
      ],
      isAvailable: true
    },
    {
      ticker: 'SBUX',
      companyName: 'Starbucks Corporation',
      sector: 'Everyday Brands',
      price: 96.8,
      previousClose: 95.4,
      changePercent: 1.47,
      marketCap: 110000000000,
      peRatio: 33.5,
      pegRatio: 2.1,
      growthPercent: 15.8,
      whatCompanyDoes: 'Starbucks operates coffee shops serving coffee, tea, and food worldwide',
      whyPeopleKnowIt: ['Green siren logo', 'Specialty coffee drinks', 'Loyalty rewards program', 'Global coffee culture'],
      revenueBreakdown: [
        { source: 'Company-operated stores', percent: 75, icon: '☕' },
        { source: 'Licensed stores', percent: 20, icon: '🛍️' },
        { source: 'Other', percent: 5, icon: '📦' }
      ],
      isAvailable: true
    },
    {
      ticker: 'WMT',
      companyName: 'Walmart Inc',
      sector: 'Everyday Brands',
      price: 82.4,
      previousClose: 81.9,
      changePercent: 0.61,
      marketCap: 220000000000,
      peRatio: 25.3,
      pegRatio: 2.0,
      growthPercent: 12.6,
      whatCompanyDoes: 'Walmart is the largest retailer globally, selling groceries, clothing, and general merchandise',
      whyPeopleKnowIt: ['Low prices/Everyday Low Prices', 'Massive store network', 'Walmart.com online shopping', 'Grocery & household items'],
      revenueBreakdown: [
        { source: 'Walmart US Retail', percent: 50, icon: '🛒' },
        { source: 'Walmart International', percent: 30, icon: '🌍' },
        { source: 'Sam\'s Club', percent: 12, icon: '📦' },
        { source: 'Walmart Connect', percent: 8, icon: '💳' }
      ],
      isAvailable: true
    }
  ];

  for (const stock of stocks) {
    await prisma.marketData.upsert({
      where: { ticker: stock.ticker },
      update: stock,
      create: stock
    });
  }

  console.log('✅ Market data seeded');
}

async function seedLessons() {
  console.log('🌱 Seeding lessons...');

  const lessons = [
    {
      id: 'level-1-companies-brands',
      title: 'Companies & Brands',
      description: 'Learn what companies are and how they make money from selling products and services',
      learningLevel: 1,
      estimatedMinutes: 10,
      unlockRequirement: { previousLevel: null, pointsRequired: 0 },
      cards: [
        {
          type: 'explanation',
          title: 'What is a Company?',
          body: 'A company makes products or services that people buy. Nike makes shoes. Apple makes phones. Netflix streams shows. When someone buys something from them, the company earns money - we call this revenue.',
          image_url: null
        },
        {
          type: 'explanation',
          title: 'How Companies Make Money',
          body: 'The basic formula is simple: Company makes product → People pay money → Company earns revenue. The more products they sell, the more money they make. That\'s where stocks come in.',
          image_url: null
        },
        {
          type: 'question',
          title: 'Quick Check',
          body: 'What does Nike primarily sell?',
          options: ['Phones', 'Shoes and athletic gear', 'Video games', 'Food'],
          correctAnswer: 1
        }
      ],
      quiz: [
        {
          question: 'Which company makes the iPhone?',
          options: ['Samsung', 'Google', 'Apple', 'Microsoft'],
          correct_answer: 2,
          explanation_correct: 'Correct! Apple designs and sells the iPhone, one of their most famous products.',
          explanation_wrong: 'Not quite. Apple is the company that makes iPhones.',
          points_for_correct: 10
        },
        {
          question: 'How do companies make money?',
          options: [
            'By selling products or services',
            'By getting likes on social media',
            'By printing money',
            'By asking people nicely'
          ],
          correct_answer: 0,
          explanation_correct: 'Exactly! Companies make money by selling things people want to buy.',
          explanation_wrong: 'Companies make money by selling products or services to customers.',
          points_for_correct: 10
        }
      ],
      realWorldExample: {
        ticker: 'NKE',
        context: 'Nike is one of the most recognizable brands in the world. Let\'s look at how they make money.',
        metric_to_check: 'revenue_breakdown'
      },
      metricsUnlocked: [],
      pointsOnCompletion: 50
    },
    {
      id: 'level-2-stocks-ownership',
      title: 'Stocks & Ownership',
      description: 'Understand what a stock is and why owning stock means you own a piece of the company',
      learningLevel: 2,
      estimatedMinutes: 12,
      unlockRequirement: { previousLevel: 1, pointsRequired: null },
      cards: [
        {
          type: 'explanation',
          title: 'What is a Stock?',
          body: 'A stock is a small piece of ownership in a company. When you buy a stock, you\'re buying a tiny fraction of that company. Buy 1 share of Apple? You own a tiny piece of Apple!',
          image_url: null
        },
        {
          type: 'explanation',
          title: 'Why Stock Prices Change',
          body: 'Stock prices go up and down based on what people think the company is worth. If Apple releases a great new iPhone, more people want to own Apple stock, so the price goes up. If the company has bad news, the price goes down.',
          image_url: null
        }
      ],
      quiz: [
        {
          question: 'If you own 10 shares of Apple stock, what does that mean?',
          options: [
            'You own 10% of Apple',
            'You own a tiny piece of Apple',
            'You work for Apple',
            'You can visit Apple Stores for free'
          ],
          correct_answer: 1,
          explanation_correct: 'Correct! You own a small fraction of the company, not 10% obviously, but a portion.',
          explanation_wrong: 'When you buy stock, you own a portion of the company.',
          points_for_correct: 10
        },
        {
          question: 'What makes a stock price go up?',
          options: [
            'Random chance',
            'When investors think the company is more valuable',
            'When the stock exchange decides to',
            'When the CEO votes'
          ],
          correct_answer: 1,
          explanation_correct: 'Right! Stock prices reflect what investors think the company is worth.',
          explanation_wrong: 'Stock prices are determined by supply and demand - what people are willing to pay.',
          points_for_correct: 10
        }
      ],
      realWorldExample: null,
      metricsUnlocked: ['transaction_history', 'position_values'],
      pointsOnCompletion: 75
    },
    {
      id: 'level-3-sectors',
      title: 'Understanding Sectors',
      description: 'Learn about industry groups and why it matters for building a balanced portfolio',
      learningLevel: 3,
      estimatedMinutes: 15,
      unlockRequirement: { previousLevel: 2, pointsRequired: null },
      cards: [
        {
          type: 'explanation',
          title: 'What are Sectors?',
          body: 'Sectors are groups of companies that do similar business. Technology sector: Apple, Google, Microsoft. Retail sector: Walmart, Target, Amazon. Finance sector: Banks and insurance companies.',
          image_url: null
        },
        {
          type: 'explanation',
          title: 'Why Sectors Matter',
          body: 'Sometimes all tech stocks go down together. Sometimes retail stocks do well while tech struggles. Professional investors spread their money across different sectors to reduce risk - this is called diversification.',
          image_url: null
        }
      ],
      quiz: [
        {
          question: 'Which of these companies is in the Technology sector?',
          options: ['Nike', 'Starbucks', 'Microsoft', 'McDonalds'],
          correct_answer: 2,
          explanation_correct: 'Correct! Microsoft makes software and cloud services, making it a tech company.',
          explanation_wrong: 'Microsoft is in the Technology sector.',
          points_for_correct: 10
        },
        {
          question: 'Why is diversification across sectors important?',
          options: [
            'It guarantees you\'ll make money',
            'It reduces risk by not putting all your eggs in one basket',
            'It makes your portfolio look impressive',
            'It\'s required by law'
          ],
          correct_answer: 1,
          explanation_correct: 'Exactly! If one sector struggles, your entire portfolio isn\'t affected.',
          explanation_wrong: 'Diversification helps protect you when one industry sector has problems.',
          points_for_correct: 10
        }
      ],
      realWorldExample: null,
      metricsUnlocked: ['all_sectors', 'sector_filtering'],
      pointsOnCompletion: 100
    }
  ];

  for (const lesson of lessons) {
    await prisma.lessonContent.upsert({
      where: { id: lesson.id },
      update: lesson,
      create: lesson
    });
  }

  console.log('✅ Lessons seeded');
}

async function main() {
  try {
    console.log('🌱 Starting database seed...\n');
    await seedSectors();
    await seedMarketData();
    await seedLessons();
    console.log('\n✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
