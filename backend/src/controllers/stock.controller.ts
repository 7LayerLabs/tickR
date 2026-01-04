import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStock = async (req: Request, res: Response) => {
  try {
    const { ticker } = req.params;
    const userId = req.userId;

    if (!ticker) {
      return res.status(400).json({ error: 'Missing ticker' });
    }

    const stock = await prisma.marketData.findUnique({
      where: { ticker: ticker.toUpperCase() }
    });

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    // Get user's learning level to determine visible metrics
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    const userLearningLevel = user?.learningLevel ?? 1;

    const visibleMetrics = {
      price: stock.price,
      previousClose: stock.previousClose,
      changePercent: stock.changePercent
    };

    if (userLearningLevel >= 3) {
      Object.assign(visibleMetrics, { marketCap: stock.marketCap });
    }

    if (userLearningLevel >= 5) {
      Object.assign(visibleMetrics, { peRatio: stock.peRatio });
    }

    if (userLearningLevel >= 6) {
      Object.assign(visibleMetrics, {
        pegRatio: stock.pegRatio,
        growthPercent: stock.growthPercent
      });
    }

    return res.json({
      ticker: stock.ticker,
      companyName: stock.companyName,
      sector: stock.sector,
      whatCompanyDoes: stock.whatCompanyDoes,
      whyPeopleKnowIt: stock.whyPeopleKnowIt,
      revenueBreakdown: stock.revenueBreakdown,
      stats: visibleMetrics,
      isAvailable: stock.isAvailable,
      updatedAt: stock.updatedAt
    });
  } catch (error) {
    console.error('Error getting stock:', error);
    return res.status(500).json({ error: 'Failed to get stock' });
  }
};

export const searchStocks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const stocks = await prisma.marketData.findMany({
      where: {
        OR: [
          { ticker: { contains: q.toUpperCase(), mode: 'insensitive' } },
          { companyName: { contains: q, mode: 'insensitive' } }
        ],
        isAvailable: true
      },
      select: {
        ticker: true,
        companyName: true,
        sector: true,
        price: true,
        changePercent: true
      },
      take: 10
    });

    return res.json({ stocks });
  } catch (error) {
    console.error('Error searching stocks:', error);
    return res.status(500).json({ error: 'Failed to search stocks' });
  }
};

export const getStocksBySector = async (req: Request, res: Response) => {
  try {
    const { sector } = req.params;

    if (!sector) {
      return res.status(400).json({ error: 'Missing sector' });
    }

    const stocks = await prisma.marketData.findMany({
      where: {
        sector: { contains: sector, mode: 'insensitive' },
        isAvailable: true
      },
      select: {
        ticker: true,
        companyName: true,
        sector: true,
        price: true,
        changePercent: true,
        marketCap: true
      },
      orderBy: { marketCap: 'desc' },
      take: 50
    });

    return res.json({ stocks, sector });
  } catch (error) {
    console.error('Error getting stocks by sector:', error);
    return res.status(500).json({ error: 'Failed to get stocks by sector' });
  }
};

export const getAllSectors = async (req: Request, res: Response) => {
  try {
    const sectors = await prisma.sector.findMany({
      select: {
        name: true,
        displayName: true,
        description: true,
        icon: true,
        isStarter: true,
        unlockLevel: true,
        unlockPoints: true
      }
    });

    return res.json({ sectors });
  } catch (error) {
    console.error('Error getting sectors:', error);
    return res.status(500).json({ error: 'Failed to get sectors' });
  }
};
