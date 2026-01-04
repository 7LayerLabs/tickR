import { Request, Response } from 'express';
import transactionService from '../services/transaction.service';

export const buyStock = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { ticker, shares } = req.body;

    if (!ticker || !shares) {
      return res.status(400).json({ error: 'Missing ticker or shares' });
    }

    const result = await transactionService.executeBuy(userId, ticker, shares);
    return res.status(201).json(result);
  } catch (error: any) {
    console.error('Error buying stock:', error);
    return res.status(400).json({ error: error.message || 'Failed to buy stock' });
  }
};

export const sellStock = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { ticker, shares } = req.body;

    if (!ticker || !shares) {
      return res.status(400).json({ error: 'Missing ticker or shares' });
    }

    const result = await transactionService.executeSell(userId, ticker, shares);
    return res.status(201).json(result);
  } catch (error: any) {
    console.error('Error selling stock:', error);
    return res.status(400).json({ error: error.message || 'Failed to sell stock' });
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const result = await transactionService.getTransactionHistory(userId, limit, offset);
    return res.json(result);
  } catch (error) {
    console.error('Error getting transaction history:', error);
    return res.status(500).json({ error: 'Failed to get transaction history' });
  }
};

export const getCooldownStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { ticker } = req.params;

    if (!ticker) {
      return res.status(400).json({ error: 'Missing ticker' });
    }

    const status = await transactionService.getCooldownStatus(userId, ticker);
    return res.json(status);
  } catch (error) {
    console.error('Error getting cooldown status:', error);
    return res.status(500).json({ error: 'Failed to get cooldown status' });
  }
};
