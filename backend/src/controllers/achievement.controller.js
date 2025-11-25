import Achievement from '../models/Achievement.model.js';

export const getAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find({ isActive: true })
      .sort({ rarity: 1, points: -1 });

    res.status(200).json({
      status: 'success',
      data: { achievements }
    });
  } catch (error) {
    next(error);
  }
};

export const checkUserAchievements = async (req, res, next) => {
  try {
    // Logic to check and award achievements based on user progress
    res.status(200).json({
      status: 'success',
      data: { message: 'Achievements checked' }
    });
  } catch (error) {
    next(error);
  }
};
