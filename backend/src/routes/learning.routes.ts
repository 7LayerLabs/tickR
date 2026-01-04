import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  getUserLearning,
  getLessonsByLevel,
  getLesson,
  completeLesson,
  submitQuiz,
  getAvailableLessons
} from '../controllers/learning.controller';

const router = Router();

router.use(authenticate);

router.get('/learning', getUserLearning);
router.get('/available', getAvailableLessons);
router.get('/level/:level', getLessonsByLevel);
router.get('/lessons/:lessonId', getLesson);
router.post('/lessons/:lessonId/complete', completeLesson);
router.post('/quiz/:lessonId/submit', submitQuiz);

export default router;
