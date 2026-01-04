import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getPortfolio, getPortfolioHistory, getDiversification } from '../controllers/portfolio.controller';

const router = Router();

router.use(authenticate);

router.get('/', getPortfolio);
router.get('/history', getPortfolioHistory);
router.get('/diversification', getDiversification);

export default router;
