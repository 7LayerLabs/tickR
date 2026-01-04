import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import portfolioService from '../services/portfolio.service';
import pointsService from '../services/points.service';

const prisma = new PrismaClient();

// Run every weekday at 4:00 PM ET (market close)
// Cron format: minute hour * * day-of-week
// 0 16 * * 1-5 = every weekday at 4:00 PM ET (but this assumes server is in ET)
// We'll use 0 20 * * 1-5 for UTC (4 PM ET = 8/9 PM UTC depending on DST)
export const dailySnapshotJob = cron.schedule('0 20 * * 1-5', async () => {
  console.log('[CRON] Running daily portfolio snapshot at market close...');

  try {
    // Get all portfolios with their user and positions
    const portfolios = await prisma.portfolio.findMany({
      include: {
        user: true,
        positions: true,
        snapshots: {
          orderBy: { snapshotDate: 'desc' },
          take: 1
        }
      }
    });

    console.log(`[CRON] Processing ${portfolios.length} portfolios`);

    for (const portfolio of portfolios) {
      try {
        // Recalculate current portfolio value
        await portfolioService.calculatePortfolioValue(portfolio.id);

        // Get updated portfolio
        const updatedPortfolio = await prisma.portfolio.findUnique({
          where: { id: portfolio.id },
          include: { positions: true }
        });

        if (!updatedPortfolio) {
          console.log(`[CRON] Portfolio ${portfolio.id} not found after update`);
          continue;
        }

        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if snapshot already exists for today
        const existingSnapshot = await prisma.portfolioSnapshot.findFirst({
          where: {
            portfolioId: portfolio.id,
            snapshotDate: today
          }
        });

        if (existingSnapshot) {
          console.log(`[CRON] Snapshot already exists for portfolio ${portfolio.id} today`);
          continue;
        }

        // Get previous snapshot for comparison
        const previousSnapshot = portfolio.snapshots[0];
        const previousValue = previousSnapshot?.totalValue || new Decimal(10000);

        const dailyChange = updatedPortfolio.totalValue.minus(previousValue);
        const dailyChangePercent = previousValue.toNumber() > 0
          ? dailyChange.dividedBy(previousValue).times(100)
          : new Decimal(0);

        // Create new snapshot
        const snapshot = await prisma.portfolioSnapshot.create({
          data: {
            portfolioId: portfolio.id,
            totalValue: updatedPortfolio.totalValue,
            cashBalance: updatedPortfolio.cashBalance,
            dailyChange,
            dailyChangePercent,
            positionsSnapshot: updatedPortfolio.positions.map(p => ({
              ticker: p.ticker,
              shares: p.shares,
              price: p.currentPrice.toString(),
              value: p.currentValue.toString()
            })),
            snapshotDate: today
          }
        });

        // Award points based on performance
        if (dailyChange.greaterThan(0)) {
          await pointsService.awardPoints(
            portfolio.userId,
            25,
            'PORTFOLIO_GREEN',
            `Portfolio gained ${dailyChangePercent.toFixed(2)}%`
          );
          console.log(`[CRON] ${portfolio.user.username}: +25 points (green day +${dailyChangePercent.toFixed(2)}%)`);
        } else if (dailyChange.lessThan(0)) {
          // Only award negative points if loss > 10% in a day (emergency only)
          if (dailyChangePercent.lessThan(-10)) {
            await pointsService.awardPoints(
              portfolio.userId,
              -5,
              'PORTFOLIO_RED',
              `Portfolio lost ${Math.abs(dailyChangePercent.toNumber()).toFixed(2)}%`
            );
            console.log(`[CRON] ${portfolio.user.username}: -5 points (large loss ${dailyChangePercent.toFixed(2)}%)`);
          }
        }

        console.log(`[CRON] Snapshot created for ${portfolio.user.username}: $${updatedPortfolio.totalValue} (${dailyChangePercent.toFixed(2)}%)`);
      } catch (error) {
        console.error(`[CRON] Error processing portfolio ${portfolio.id}:`, error);
      }
    }

    console.log('[CRON] Daily snapshot job completed successfully');
  } catch (error) {
    console.error('[CRON] Daily snapshot job failed:', error);
  }
});

// Start the job
export const startDailySnapshotJob = () => {
  console.log('[CRON] Daily snapshot job started (runs at 4:00 PM ET weekdays)');
  dailySnapshotJob.start();
};

// Stop the job (for cleanup)
export const stopDailySnapshotJob = () => {
  dailySnapshotJob.stop();
  console.log('[CRON] Daily snapshot job stopped');
};
