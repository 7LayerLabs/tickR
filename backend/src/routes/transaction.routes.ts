import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  buyStock,
  sellStock,
  getTransactionHistory,
  getCooldownStatus
} from '../controllers/transaction.controller';

const router = Router();

router.use(authenticate);

router.post('/buy', buyStock);
router.post('/sell', sellStock);
router.get('/history', getTransactionHistory);
router.get('/cooldown/:ticker', getCooldownStatus);

export default router;
