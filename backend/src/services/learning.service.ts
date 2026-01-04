import { PrismaClient } from '@prisma/client';
import pointsService from './points.service';

const prisma = new PrismaClient();

class LearningService {
  async getUserLearning(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      const learning = await prisma.learning.findUnique({
        where: { userId }
      });

      if (!learning) {
        throw new Error('Learning record not found');
      }

      return {
        level: learning.level,
        lessonsCompleted: learning.lessonsCompleted,
        unlockedMetrics: learning.unlockedMetrics,
        progressionScore: learning.progressionScore,
        points: user?.points || 0
      };
    } catch (error) {
      console.error('Error getting user learning:', error);
      throw error;
    }
  }

  async getLessonsByLevel(level: number) {
    try {
      const lessons = await prisma.lessonContent.findMany({
        where: { learningLevel: level },
        select: {
          id: true,
          title: true,
          description: true,
          estimatedMinutes: true,
          learningLevel: true,
          pointsOnCompletion: true
        }
      });

      return lessons;
    } catch (error) {
      console.error('Error getting lessons by level:', error);
      throw error;
    }
  }

  async getLesson(lessonId: string) {
    try {
      const lesson = await prisma.lessonContent.findUnique({
        where: { id: lessonId }
      });

      if (!lesson) {
        throw new Error('Lesson not found');
      }

      return lesson;
    } catch (error) {
      console.error('Error getting lesson:', error);
      throw error;
    }
  }

  async completeLesson(userId: string, lessonId: string) {
    try {
      const lesson = await prisma.lessonContent.findUnique({
        where: { id: lessonId }
      });

      if (!lesson) {
        throw new Error('Lesson not found');
      }

      const learning = await prisma.learning.findUnique({
        where: { userId }
      });

      if (!learning) {
        throw new Error('Learning record not found');
      }

      // Check if lesson already completed
      if (learning.lessonsCompleted.includes(lessonId)) {
        return {
          message: 'Lesson already completed',
          pointsEarned: 0,
          newLevel: learning.level,
          unlockedMetrics: []
        };
      }

      // Add lesson to completed
      const updatedLessons = [...learning.lessonsCompleted, lessonId];

      // Award points
      const pointsEarned = lesson.pointsOnCompletion;
      await pointsService.awardPoints(userId, pointsEarned, 'LESSON_COMPLETED', lesson.title);

      // Check if should advance level
      let newLevel = learning.level;
      const lessonsCompletedThisLevel = updatedLessons.filter(id => {
        // This is a simplified check - in production you'd check lesson levels
        return true;
      }).length;

      if (lessonsCompletedThisLevel >= 2 && learning.level < 7) {
        newLevel = learning.level + 1;
      }

      // Update learning record
      const updatedLearning = await prisma.learning.update({
        where: { userId },
        data: {
          lessonsCompleted: updatedLessons,
          level: newLevel,
          unlockedMetrics: [...new Set([...learning.unlockedMetrics, ...lesson.metricsUnlocked])]
        }
      });

      // Update user level
      await prisma.user.update({
        where: { id: userId },
        data: { learningLevel: newLevel }
      });

      return {
        pointsEarned,
        newLevel,
        unlockedMetrics: updatedLearning.unlockedMetrics,
        lessonsCompleted: updatedLearning.lessonsCompleted
      };
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw error;
    }
  }

  async submitQuiz(userId: string, lessonId: string, answers: Record<number, number>) {
    try {
      const lesson = await prisma.lessonContent.findUnique({
        where: { id: lessonId }
      });

      if (!lesson) {
        throw new Error('Lesson not found');
      }

      const quiz = lesson.quiz as any[];
      const results = [];
      let totalPointsEarned = 0;

      for (let i = 0; i < quiz.length; i++) {
        const question = quiz[i];
        const userAnswer = answers[i];
        const isCorrect = userAnswer === question.correct_answer;

        results.push({
          questionIndex: i,
          question: question.question,
          userAnswerIndex: userAnswer,
          correct: isCorrect,
          explanation: isCorrect ? question.explanation_correct : question.explanation_wrong,
          pointsEarned: isCorrect ? question.points_for_correct : 0
        });

        if (isCorrect) {
          totalPointsEarned += question.points_for_correct;
        }
      }

      // Award points for quiz completion
      await pointsService.awardPoints(userId, totalPointsEarned, 'QUIZ_CORRECT', `Quiz for ${lesson.title}`);

      // Update learning record
      const learning = await prisma.learning.findUnique({
        where: { userId }
      });

      if (learning) {
        await prisma.learning.update({
          where: { userId },
          data: { quizzesTaken: learning.quizzesTaken + 1 }
        });
      }

      return {
        results,
        totalPointsEarned,
        completionPercentage: (results.filter(r => r.correct).length / results.length) * 100
      };
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  }

  async initializeLearning(userId: string) {
    try {
      const learning = await prisma.learning.create({
        data: {
          userId,
          level: 1,
          lessonsCompleted: [],
          unlockedMetrics: []
        }
      });

      return learning;
    } catch (error) {
      console.error('Error initializing learning:', error);
      throw error;
    }
  }

  async getAvailableLessons(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const lessons = await prisma.lessonContent.findMany({
        where: {
          learningLevel: { lte: user.learningLevel + 1 }
        },
        select: {
          id: true,
          title: true,
          description: true,
          learningLevel: true,
          estimatedMinutes: true,
          pointsOnCompletion: true
        }
      });

      // Get completed lessons
      const learning = await prisma.learning.findUnique({
        where: { userId }
      });

      return lessons.map(lesson => ({
        ...lesson,
        isCompleted: learning?.lessonsCompleted.includes(lesson.id) || false,
        isLocked: lesson.learningLevel > user.learningLevel
      }));
    } catch (error) {
      console.error('Error getting available lessons:', error);
      throw error;
    }
  }
}

export default new LearningService();
