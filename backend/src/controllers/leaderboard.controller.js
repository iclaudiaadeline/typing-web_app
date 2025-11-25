import User from '../models/User.model.js';

export const getLeaderboard = async (req, res, next) => {
  try {
    const { type = 'wpm', limit = 10, scope = 'global' } = req.query;

    let sortField = 'typingStats.averageWPM';
    if (type === 'accuracy') sortField = 'typingStats.averageAccuracy';
    if (type === 'sessions') sortField = 'typingStats.totalSessions';

    const query = { isActive: true };
    if (scope === 'school' && req.user.school) {
      query.school = req.user.school;
    }

    const leaderboard = await User.find(query)
      .select('name avatar typingStats school')
      .populate('school', 'name')
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      status: 'success',
      data: { leaderboard }
    });
  } catch (error) {
    next(error);
  }
};
