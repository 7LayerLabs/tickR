import { Request, Response } from 'express';
import portfolioService from '../services/portfolio.service';

export const getPortfolio = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const portfolio = await portfolioService.getPortfolioSnapshot(userId);
    return res.json(portfolio);
  } catch (error) {
    console.error('Error getting portfolio:', error);
    return res.status(500).json({ error: 'Failed to get portfolio' });
  }
};

export const getPortfolioHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const days = parseInt(req.query.days as string) || 30;

    if (days < 1 || days > 365) {
      return res.status(400).json({ error: 'Days must be between 1 and 365' });
    }

    const history = await portfolioService.getPortfolioHistory(userId, days);
    return res.json({ history, days });
  } catch (error) {
    console.error('Error getting portfolio history:', error);
    return res.status(500).json({ error: 'Failed to get portfolio history' });
  }
};

export const getDiversification = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const portfolio = await portfolioService.getUserPortfolio(userId);
    const diversification = await portfolioService.getDiversification(portfolio.id);
    return res.json(diversification);
  } catch (error) {
    console.error('Error getting diversification:', error);
    return res.status(500).json({ error: 'Failed to get diversification' });
  }
};
