import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

class PortfolioService {
  async calculatePortfolioValue(portfolioId: string) {
    try {
      const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId },
        include: { positions: true }
      });

      if (!portfolio) {
        throw new Error('Portfolio not found');
      }

      let positionsValue = new Decimal(0);

      // Update each position with current price and value
      for (const position of portfolio.positions) {
        const marketData = await prisma.marketData.findUnique({
          where: { ticker: position.ticker }
        });

        if (marketData) {
          const currentPrice = new Decimal(marketData.price.toString());
          const positionValue = currentPrice.times(position.shares);

          await prisma.position.update({
            where: { id: position.id },
            data: {
              currentPrice,
              currentValue: positionValue
            }
          });

          positionsValue = positionsValue.plus(positionValue);
        }
      }

      const totalValue = new Decimal(portfolio.cashBalance.toString()).plus(positionsValue);

      // Update portfolio total value
      await prisma.portfolio.update({
        where: { id: portfolioId },
        data: { totalValue }
      });

      return {
        cashBalance: portfolio.cashBalance,
        totalValue,
        positionsValue
      };
    } catch (error) {
      console.error('Error calculating portfolio value:', error);
      throw error;
    }
  }

  async getDiversification(portfolioId: string) {
    try {
      const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId },
        include: { positions: true }
      });

      if (!portfolio) {
        throw new Error('Portfolio not found');
      }

      const diversification: Record<string, number> = {};
      let totalValue = new Decimal(0);

      for (const position of portfolio.positions) {
        totalValue = totalValue.plus(position.currentValue);
        const sector = position.sector;
        diversification[sector] = (diversification[sector] || 0) + Number(position.currentValue);
      }

      // Convert to percentages
      const percentages: Record<string, number> = {};
      for (const [sector, value] of Object.entries(diversification)) {
        percentages[sector] = totalValue.toNumber() > 0 ? (value / totalValue.toNumber()) * 100 : 0;
      }

      return {
        breakdown: percentages,
        maxSectorPercent: Math.max(...Object.values(percentages), 0),
        isWellDiversified: Math.max(...Object.values(percentages), 0) <= 40
      };
    } catch (error) {
      console.error('Error calculating diversification:', error);
      throw error;
    }
  }

  async getPortfolioSnapshot(userId: string) {
    try {
      const portfolio = await prisma.portfolio.findUnique({
        where: { userId },
        include: {
          positions: {
            include: {
              portfolio: true
            }
          },
          snapshots: {
            orderBy: { snapshotDate: 'desc' },
            take: 1
          }
        }
      });

      if (!portfolio) {
        throw new Error('Portfolio not found');
      }

      await this.calculatePortfolioValue(portfolio.id);

      const updatedPortfolio = await prisma.portfolio.findUnique({
        where: { id: portfolio.id },
        include: { positions: true }
      });

      const previousSnapshot = portfolio.snapshots[0];
      const dailyChange = previousSnapshot
        ? updatedPortfolio!.totalValue.minus(previousSnapshot.totalValue)
        : new Decimal(0);

      const dailyChangePercent = previousSnapshot && previousSnapshot.totalValue.toNumber() > 0
        ? dailyChange.dividedBy(previousSnapshot.totalValue).times(100)
        : new Decimal(0);

      return {
        totalValue: updatedPortfolio!.totalValue,
        cashBalance: updatedPortfolio!.cashBalance,
        dailyChange,
        dailyChangePercent,
        positions: updatedPortfolio!.positions.map(p => ({
          id: p.id,
          ticker: p.ticker,
          shares: p.shares,
          avgCostPerShare: p.avgCostPerShare,
          currentPrice: p.currentPrice,
          currentValue: p.currentValue,
          sector: p.sector,
          percentOfPortfolio: updatedPortfolio!.totalValue.toNumber() > 0
            ? (Number(p.currentValue) / Number(updatedPortfolio!.totalValue)) * 100
            : 0
        }))
      };
    } catch (error) {
      console.error('Error getting portfolio snapshot:', error);
      throw error;
    }
  }

  async getUserPortfolio(userId: string) {
    try {
      const portfolio = await prisma.portfolio.findUnique({
        where: { userId },
        include: { positions: true }
      });

      if (!portfolio) {
        throw new Error('Portfolio not found');
      }

      return portfolio;
    } catch (error) {
      console.error('Error getting user portfolio:', error);
      throw error;
    }
  }

  async initializePortfolio(userId: string) {
    try {
      const portfolio = await prisma.portfolio.create({
        data: {
          userId,
          cashBalance: new Decimal(10000),
          totalValue: new Decimal(10000)
        }
      });

      return portfolio;
    } catch (error) {
      console.error('Error initializing portfolio:', error);
      throw error;
    }
  }

  async getPortfolioHistory(userId: string, days: number = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const snapshots = await prisma.portfolioSnapshot.findMany({
        where: {
          portfolio: { userId },
          snapshotDate: { gte: startDate }
        },
        orderBy: { snapshotDate: 'asc' }
      });

      return snapshots.map(snapshot => ({
        date: snapshot.snapshotDate,
        totalValue: Number(snapshot.totalValue),
        dailyChange: Number(snapshot.dailyChange),
        dailyChangePercent: Number(snapshot.dailyChangePercent)
      }));
    } catch (error) {
      console.error('Error getting portfolio history:', error);
      throw error;
    }
  }
}

export default new PortfolioService();
