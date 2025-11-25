import VoiceSession from '../models/VoiceSession.model.js';
import { AppError } from '../middleware/error.middleware.js';

// This is a placeholder for Google Speech-to-Text integration
export const processVoiceTyping = async (req, res, next) => {
  try {
    const { expectedText, audioData } = req.body;

    // Check if user has premium subscription
    const user = req.user;
    if (user.subscription.type !== 'premium') {
      return next(new AppError('Voice typing requires premium subscription', 403));
    }

    // TODO: Implement Google Speech-to-Text API integration
    // For now, return mock data
    const mockAnalysis = {
      pronunciationScore: 85,
      accuracyScore: 90,
      fluencyScore: 88,
      completenessScore: 92,
      overallScore: 89
    };

    const session = await VoiceSession.create({
      user: req.user.id,
      text: {
        expected: expectedText,
        spoken: 'Transcribed text will appear here'
      },
      analysis: mockAnalysis,
      duration: 30,
      language: 'en-US'
    });

    res.status(201).json({
      status: 'success',
      data: { session }
    });
  } catch (error) {
    next(error);
  }
};

export const getVoiceSessions = async (req, res, next) => {
  try {
    const sessions = await VoiceSession.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      status: 'success',
      data: { sessions }
    });
  } catch (error) {
    next(error);
  }
};
