import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// Blocklist for penny stocks and known pump-and-dump stocks
const BLOCKLIST = [
  'SHIB', 'DOGE', // Crypto-like
  'AMC', 'GME', // Meme stocks (prevent hype behavior)
];

export class TradeGuardrails {
  static async validateTicker(ticker: string): Promise<{ valid: boolean; reason?: string }> {
    const upperTicker = ticker.toUpperCase();

    // Check blocklist
    if (BLOCKLIST.includes(upperTicker)) {
      return { valid: false, reason: 'This ticker is not available for trading' };
    }

    // Check market data exists
    const marketData = await prisma.marketData.findUnique({
      where: { ticker: upperTicker }
    });

    if (!marketData || !marketData.isAvailable) {
      return { valid: false, reason: 'Stock data not available' };
    }

    // Check price >= $1
    if (marketData.price.toNumber() < 1) {
      return { valid: false, reason: 'Penny stocks (under $1) are not allowed' };
    }

    return { valid: true };
  }

  static async checkCooldown(userId: string, ticker: string): Promise<{ canTrade: boolean; nextAvailableAt?: Date }> {
    const cooldown = await prisma.tradeCooldown.findUnique({
      where: {
        userId_ticker: { userId, ticker: ticker.toUpperCase() }
      }
    });

    if (!cooldown) {
      return { canTrade: true };
    }

    const now = new Date();
    const lastTrade = new Date(cooldown.lastTrade);
    const hoursSinceLastTrade = (now.getTime() - lastTrade.getTime()) / (1000 * 60 * 60);

    // 24-hour cooldown
    if (hoursSinceLastTrade < 24) {
      const nextAvailable = new Date(lastTrade.getTime() + 24 * 60 * 60 * 1000);
      return { canTrade: false, nextAvailableAt: nextAvailable };
    }

    return { canTrade: true };
  }

  static async validateBuy(
    userId: string,
    ticker: string,
    shares: number
  ): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Validate ticker
    const tickerCheck = await this.validateTicker(ticker);
    if (!tickerCheck.valid) {
      errors.push(tickerCheck.reason!);
    }

    // Check cooldown
    const cooldownCheck = await this.checkCooldown(userId, ticker);
    if (!cooldownCheck.canTrade) {
      errors.push(
        `You can trade ${ticker} again at ${cooldownCheck.nextAvailableAt!.toLocaleString()}`
      );
    }

    // Check shares > 0
    if (shares <= 0 || !Number.isInteger(shares)) {
      errors.push('Shares must be a positive whole number');
    }

    if (shares > 10000) {
      errors.push('Cannot buy more than 10,000 shares at once');
    }

    // Check cash balance
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId }
    });

    const marketData = await prisma.marketData.findUnique({
      where: { ticker: ticker.toUpperCase() }
    });

    if (!portfolio || !marketData) {
      errors.push('Portfolio or market data not found');
      return { valid: false, errors };
    }

    const totalCost = marketData.price.times(new Decimal(shares));

    if (portfolio.cashBalance.lessThan(totalCost)) {
      errors.push(
        `Insufficient funds. Need $${totalCost.toFixed(2)}, have $${portfolio.cashBalance.toFixed(2)}`
      );
    }

    return { valid: errors.length === 0, errors };
  }

  static async validateSell(
    userId: string,
    ticker: string,
    shares: number
  ): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Check cooldown
    const cooldownCheck = await this.checkCooldown(userId, ticker);
    if (!cooldownCheck.canTrade) {
      errors.push(
        `You can trade ${ticker} again at ${cooldownCheck.nextAvailableAt!.toLocaleString()}`
      );
    }

    // Check shares > 0
    if (shares <= 0 || !Number.isInteger(shares)) {
      errors.push('Shares must be a positive whole number');
    }

    // Check owns sufficient shares
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId },
      include: { positions: true }
    });

    if (!portfolio) {
      errors.push('Portfolio not found');
      return { valid: false, errors };
    }

    const position = portfolio.positions.find(p => p.ticker === ticker.toUpperCase());

    if (!position) {
      errors.push(`You don't own any shares of ${ticker}`);
    } else if (position.shares < shares) {
      errors.push(`You only own ${position.shares} shares of ${ticker}`);
    }

    return { valid: errors.length === 0, errors };
  }

  static async updateCooldown(userId: string, ticker: string): Promise<void> {
    await prisma.tradeCooldown.upsert({
      where: {
        userId_ticker: { userId, ticker: ticker.toUpperCase() }
      },
      update: { lastTrade: new Date() },
      create: { userId, ticker: ticker.toUpperCase(), lastTrade: new Date() }
    });
  }

  static getAvailableStockers(): string[] {
    // Return list of tickers that are available for trading
    // This will be expanded as more stocks are added to market_data
    return [];
  }
}
