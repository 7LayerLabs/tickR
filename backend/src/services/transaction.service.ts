import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { TradeGuardrails } from '../utils/guardrails';
import portfolioService from './portfolio.service';

const prisma = new PrismaClient();

class TransactionService {
  async executeBuy(userId: string, ticker: string, shares: number) {
    try {
      // Validate transaction
      const validation = await TradeGuardrails.validateBuy(userId, ticker, shares);
      if (!validation.valid) {
        throw new Error(validation.errors.join('; '));
      }

      // Get market data and portfolio
      const marketData = await prisma.marketData.findUnique({
        where: { ticker: ticker.toUpperCase() }
      });

      const portfolio = await prisma.portfolio.findUnique({
        where: { userId },
        include: { positions: true }
      });

      if (!marketData || !portfolio) {
        throw new Error('Market data or portfolio not found');
      }

      const pricePerShare = new Decimal(marketData.price.toString());
      const totalCost = pricePerShare.times(new Decimal(shares));

      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          ticker: ticker.toUpperCase(),
          type: 'BUY',
          shares,
          pricePerShare,
          totalAmount: totalCost
        }
      });

      // Update or create position
      const existingPosition = portfolio.positions.find(p => p.ticker === ticker.toUpperCase());

      if (existingPosition) {
        const newTotalCost = existingPosition.avgCostPerShare
          .times(new Decimal(existingPosition.shares))
          .plus(totalCost);
        const newTotalShares = existingPosition.shares + shares;
        const newAvgCost = newTotalCost.dividedBy(new Decimal(newTotalShares));

        await prisma.position.update({
          where: { id: existingPosition.id },
          data: {
            shares: newTotalShares,
            avgCostPerShare: newAvgCost,
            currentValue: newAvgCost.times(new Decimal(newTotalShares))
          }
        });
      } else {
        await prisma.position.create({
          data: {
            portfolioId: portfolio.id,
            ticker: ticker.toUpperCase(),
            shares,
            avgCostPerShare: pricePerShare,
            currentPrice: pricePerShare,
            currentValue: totalCost,
            sector: marketData.sector
          }
        });
      }

      // Update portfolio cash balance
      const newCashBalance = new Decimal(portfolio.cashBalance.toString()).minus(totalCost);
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cashBalance: newCashBalance }
      });

      // Update trade cooldown
      await TradeGuardrails.updateCooldown(userId, ticker);

      // Recalculate portfolio value
      await portfolioService.calculatePortfolioValue(portfolio.id);

      return {
        transaction,
        portfolio: await portfolioService.getPortfolioSnapshot(userId)
      };
    } catch (error) {
      console.error('Error executing buy transaction:', error);
      throw error;
    }
  }

  async executeSell(userId: string, ticker: string, shares: number) {
    try {
      // Validate transaction
      const validation = await TradeGuardrails.validateSell(userId, ticker, shares);
      if (!validation.valid) {
        throw new Error(validation.errors.join('; '));
      }

      // Get market data and portfolio
      const marketData = await prisma.marketData.findUnique({
        where: { ticker: ticker.toUpperCase() }
      });

      const portfolio = await prisma.portfolio.findUnique({
        where: { userId },
        include: { positions: true }
      });

      if (!marketData || !portfolio) {
        throw new Error('Market data or portfolio not found');
      }

      const pricePerShare = new Decimal(marketData.price.toString());
      const totalProceeds = pricePerShare.times(new Decimal(shares));

      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          ticker: ticker.toUpperCase(),
          type: 'SELL',
          shares,
          pricePerShare,
          totalAmount: totalProceeds
        }
      });

      // Update position
      const position = portfolio.positions.find(p => p.ticker === ticker.toUpperCase());
      if (!position) {
        throw new Error('Position not found');
      }

      if (position.shares === shares) {
        // Delete position if selling all shares
        await prisma.position.delete({
          where: { id: position.id }
        });
      } else {
        // Update position with remaining shares
        const newShares = position.shares - shares;
        await prisma.position.update({
          where: { id: position.id },
          data: {
            shares: newShares,
            currentValue: pricePerShare.times(new Decimal(newShares))
          }
        });
      }

      // Update portfolio cash balance
      const newCashBalance = new Decimal(portfolio.cashBalance.toString()).plus(totalProceeds);
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { cashBalance: newCashBalance }
      });

      // Update trade cooldown
      await TradeGuardrails.updateCooldown(userId, ticker);

      // Recalculate portfolio value
      await portfolioService.calculatePortfolioValue(portfolio.id);

      return {
        transaction,
        portfolio: await portfolioService.getPortfolioSnapshot(userId)
      };
    } catch (error) {
      console.error('Error executing sell transaction:', error);
      throw error;
    }
  }

  async getTransactionHistory(userId: string, limit: number = 50, offset: number = 0) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset
      });

      const total = await prisma.transaction.count({
        where: { userId }
      });

      return {
        transactions,
        total,
        limit,
        offset
      };
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw error;
    }
  }

  async getCooldownStatus(userId: string, ticker: string) {
    try {
      const cooldownCheck = await TradeGuardrails.checkCooldown(userId, ticker);
      return cooldownCheck;
    } catch (error) {
      console.error('Error getting cooldown status:', error);
      throw error;
    }
  }
}

export default new TransactionService();
