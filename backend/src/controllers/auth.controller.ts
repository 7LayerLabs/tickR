import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient, AgeBand } from '@prisma/client';
import { generateToken } from '../middleware/auth.middleware';
import portfolioService from '../services/portfolio.service';
import learningService from '../services/learning.service';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, ageBand } = req.body;

    // Validation
    if (!username || !password || !ageBand) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'Username must be 3-20 characters' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Validate age band
    if (!['TWEEN', 'EARLY_TEEN', 'LATE_TEEN'].includes(ageBand)) {
      return res.status(400).json({ error: 'Invalid age band' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        passwordHash,
        ageBand: ageBand as AgeBand
      }
    });

    // Initialize portfolio
    await portfolioService.initializePortfolio(user.id);

    // Initialize learning
    await learningService.initializeLearning(user.id);

    // Generate token
    const token = generateToken(user.id);

    return res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        ageBand: user.ageBand,
        learningLevel: user.learningLevel,
        points: user.points,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing username or password' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generate token
    const token = generateToken(user.id);

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        ageBand: user.ageBand,
        learningLevel: user.learningLevel,
        points: user.points,
        createdAt: user.createdAt,
        lastLogin: new Date()
      },
      token
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'No user ID in request' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      id: user.id,
      username: user.username,
      ageBand: user.ageBand,
      learningLevel: user.learningLevel,
      points: user.points,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
