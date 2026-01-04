import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  getStock,
  searchStocks,
  getStocksBySector,
  getAllSectors
} from '../controllers/stock.controller';

const router = Router();

router.get('/sectors', getAllSectors);
router.get('/search', authenticate, searchStocks);
router.get('/sector/:sector', authenticate, getStocksBySector);
router.get('/:ticker', authenticate, getStock);

export default router;
