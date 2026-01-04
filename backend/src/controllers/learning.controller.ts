import { Request, Response } from 'express';
import learningService from '../services/learning.service';

export const getUserLearning = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const learning = await learningService.getUserLearning(userId);
    return res.json(learning);
  } catch (error) {
    console.error('Error getting user learning:', error);
    return res.status(500).json({ error: 'Failed to get learning data' });
  }
};

export const getLessonsByLevel = async (req: Request, res: Response) => {
  try {
    const { level } = req.params;

    if (!level || isNaN(parseInt(level))) {
      return res.status(400).json({ error: 'Invalid level' });
    }

    const lessons = await learningService.getLessonsByLevel(parseInt(level));
    return res.json({ lessons });
  } catch (error) {
    console.error('Error getting lessons:', error);
    return res.status(500).json({ error: 'Failed to get lessons' });
  }
};

export const getLesson = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;

    if (!lessonId) {
      return res.status(400).json({ error: 'Missing lesson ID' });
    }

    const lesson = await learningService.getLesson(lessonId);
    return res.json(lesson);
  } catch (error) {
    console.error('Error getting lesson:', error);
    return res.status(404).json({ error: 'Lesson not found' });
  }
};

export const completeLesson = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { lessonId } = req.params;

    if (!lessonId) {
      return res.status(400).json({ error: 'Missing lesson ID' });
    }

    const result = await learningService.completeLesson(userId, lessonId);
    return res.json(result);
  } catch (error: any) {
    console.error('Error completing lesson:', error);
    return res.status(400).json({ error: error.message || 'Failed to complete lesson' });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { lessonId } = req.params;
    const { answers } = req.body;

    if (!lessonId || !answers) {
      return res.status(400).json({ error: 'Missing lesson ID or answers' });
    }

    const result = await learningService.submitQuiz(userId, lessonId, answers);
    return res.json(result);
  } catch (error: any) {
    console.error('Error submitting quiz:', error);
    return res.status(400).json({ error: error.message || 'Failed to submit quiz' });
  }
};

export const getAvailableLessons = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const lessons = await learningService.getAvailableLessons(userId);
    return res.json({ lessons });
  } catch (error) {
    console.error('Error getting available lessons:', error);
    return res.status(500).json({ error: 'Failed to get available lessons' });
  }
};
