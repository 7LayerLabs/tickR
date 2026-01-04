import { PrismaClient, PointsReason } from '@prisma/client';

const prisma = new PrismaClient();

class PointsService {
  async awardPoints(userId: string, points: number, reason: PointsReason, description?: string) {
    try {
      // Create points history record
      await prisma.pointsHistory.create({
        data: {
          userId,
          pointsEarned: points,
          reason,
          description
        }
      });

      // Update user points
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const newPoints = Math.max(0, user.points + points); // Never go below 0

      await prisma.user.update({
        where: { id: userId },
        data: { points: newPoints }
      });

      return {
        pointsEarned: points,
        totalPoints: newPoints
      };
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }

  async getUserPoints(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const history = await prisma.pointsHistory.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: 50
      });

      // Get points earned today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const pointsToday = await prisma.pointsHistory.aggregate({
        where: {
          userId,
          timestamp: { gte: today }
        },
        _sum: { pointsEarned: true }
      });

      // Get points earned this week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const pointsThisWeek = await prisma.pointsHistory.aggregate({
        where: {
          userId,
          timestamp: { gte: weekAgo }
        },
        _sum: { pointsEarned: true }
      });

      return {
        totalPoints: user.points,
        earnedToday: pointsToday._sum.pointsEarned || 0,
        earnedThisWeek: pointsThisWeek._sum.pointsEarned || 0,
        history: history.map(h => ({
          id: h.id,
          pointsEarned: h.pointsEarned,
          reason: h.reason,
          description: h.description,
          timestamp: h.timestamp
        }))
      };
    } catch (error) {
      console.error('Error getting user points:', error);
      throw error;
    }
  }

  async getPointsHistory(userId: string, limit: number = 50, offset: number = 0) {
    try {
      const history = await prisma.pointsHistory.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset
      });

      const total = await prisma.pointsHistory.count({
        where: { userId }
      });

      return {
        history,
        total,
        limit,
        offset
      };
    } catch (error) {
      console.error('Error getting points history:', error);
      throw error;
    }
  }

  async getBreakdown(userId: string) {
    try {
      const history = await prisma.pointsHistory.findMany({
        where: { userId }
      });

      const breakdown: Record<string, number> = {
        LESSON_COMPLETED: 0,
        QUIZ_CORRECT: 0,
        PORTFOLIO_GREEN: 0,
        PORTFOLIO_RED: 0,
        REFLECTION: 0,
        MILESTONE: 0
      };

      for (const entry of history) {
        breakdown[entry.reason] = (breakdown[entry.reason] || 0) + entry.pointsEarned;
      }

      return breakdown;
    } catch (error) {
      console.error('Error getting points breakdown:', error);
      throw error;
    }
  }

  async checkMilestones(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const milestones = [
        { threshold: 100, label: 'All starter sectors' },
        { threshold: 250, label: 'Bonus sectors unlocked' },
        { threshold: 500, label: 'P/E ratio on all stock pages' },
        { threshold: 750, label: 'PEG ratio + growth % unlocked' },
        { threshold: 1000, label: 'Qualify for tournaments' }
      ];

      const unlockedMilestones = milestones.filter(m => user.points >= m.threshold);
      const nextMilestone = milestones.find(m => user.points < m.threshold);

      return {
        unlockedMilestones,
        nextMilestone,
        pointsToNextMilestone: nextMilestone ? nextMilestone.threshold - user.points : 0
      };
    } catch (error) {
      console.error('Error checking milestones:', error);
      throw error;
    }
  }
}

export default new PointsService();
