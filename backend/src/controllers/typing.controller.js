import Progress from '../models/Progress.model.js';
import User from '../models/User.model.js';
import Assignment from '../models/Assignment.model.js';
import { AppError } from '../middleware/error.middleware.js';

// @desc    Start typing session
// @route   POST /api/typing/start
// @access  Private
export const startSession = async (req, res, next) => {
  try {
    const { text, sessionType, assignmentId } = req.body;

    const sessionData = {
      user: req.user.id,
      text,
      sessionType,
      assignment: assignmentId || null,
      startTime: new Date()
    };

    res.status(200).json({
      status: 'success',
      data: { 
        message: 'Session started',
        sessionData 
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit typing session
// @route   POST /api/typing/submit
// @access  Private
export const submitSession = async (req, res, next) => {
  try {
    const {
      text,
      sessionType,
      assignmentId,
      wpm,
      accuracy,
      totalCharacters,
      correctCharacters,
      incorrectCharacters,
      duration,
      startTime,
      errorAnalysis
    } = req.body;

    // Create progress record
    const progress = await Progress.create({
      user: req.user.id,
      sessionType,
      assignment: assignmentId || null,
      text,
      metrics: {
        wpm,
        accuracy,
        totalCharacters,
        correctCharacters,
        incorrectCharacters,
        duration,
        startTime,
        endTime: new Date()
      },
      errorAnalysis: errorAnalysis || {}
    });

    // Update user stats
    const user = await User.findById(req.user.id);
    const totalSessions = user.typingStats.totalSessions + 1;
    const newAvgWPM = ((user.typingStats.averageWPM * user.typingStats.totalSessions) + wpm) / totalSessions;
    const newAvgAccuracy = ((user.typingStats.averageAccuracy * user.typingStats.totalSessions) + accuracy) / totalSessions;

    user.typingStats = {
      ...user.typingStats,
      averageWPM: Math.round(newAvgWPM),
      averageAccuracy: Math.round(newAvgAccuracy * 100) / 100,
      totalPracticeTime: user.typingStats.totalPracticeTime + Math.round(duration / 60),
      totalSessions,
      bestWPM: Math.max(user.typingStats.bestWPM, wpm),
      bestAccuracy: Math.max(user.typingStats.bestAccuracy, accuracy)
    };

    await user.save();

    // If assignment, update assignment progress
    if (assignmentId) {
      const assignment = await Assignment.findById(assignmentId);
      if (assignment) {
        const studentIndex = assignment.assignedStudents.findIndex(
          s => s.student.toString() === req.user.id.toString()
        );

        if (studentIndex !== -1) {
          const isPassed = wpm >= assignment.goals.targetWPM && 
                          accuracy >= assignment.goals.targetAccuracy;

          assignment.assignedStudents[studentIndex].attempts.push({
            wpm,
            accuracy,
            errors: incorrectCharacters,
            duration,
            completedAt: new Date()
          });

          if (isPassed) {
            assignment.assignedStudents[studentIndex].status = 'completed';
            assignment.assignedStudents[studentIndex].completedAt = new Date();
          } else {
            assignment.assignedStudents[studentIndex].status = 'in-progress';
          }

          // Update best attempt
          const currentBest = assignment.assignedStudents[studentIndex].bestAttempt;
          if (!currentBest || wpm > currentBest.wpm) {
            assignment.assignedStudents[studentIndex].bestAttempt = {
              wpm,
              accuracy,
              errors: incorrectCharacters,
              isPassed
            };
          }

          await assignment.save();
        }
      }
    }

    res.status(201).json({
      status: 'success',
      data: { 
        progress,
        updatedStats: user.typingStats
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get typing texts
// @route   GET /api/typing/texts
// @access  Private
export const getTexts = async (req, res, next) => {
  try {
    const { difficulty, category } = req.query;

    // Sample typing texts (in production, store in database)
    const texts = [
      {
        id: 1,
        title: "The Quick Brown Fox",
        text: "The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the alphabet.",
        difficulty: "beginner",
        category: "pangram"
      },
      {
        id: 2,
        title: "Programming Quote",
        text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        difficulty: "intermediate",
        category: "technology"
      },
      {
        id: 3,
        title: "Rwanda's Progress",
        text: "Rwanda has made remarkable progress in technology and innovation. The country is becoming a hub for startups and digital transformation in Africa.",
        difficulty: "intermediate",
        category: "general"
      },
      {
        id: 4,
        title: "Advanced Typing",
        text: "Mastering touch typing requires consistent practice, proper finger placement, and maintaining a steady rhythm. Focus on accuracy first, then gradually increase your speed.",
        difficulty: "advanced",
        category: "education"
      }
    ];

    let filteredTexts = texts;
    if (difficulty) {
      filteredTexts = filteredTexts.filter(t => t.difficulty === difficulty);
    }
    if (category) {
      filteredTexts = filteredTexts.filter(t => t.category === category);
    }

    res.status(200).json({
      status: 'success',
      data: { texts: filteredTexts }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user progress history
// @route   GET /api/typing/progress
// @access  Private
export const getProgressHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sessionType } = req.query;

    const query = { user: req.user.id };
    if (sessionType) query.sessionType = sessionType;

    const progress = await Progress.find(query)
      .populate('assignment', 'title')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Progress.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        progress,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
