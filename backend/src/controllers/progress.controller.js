import Progress from '../models/Progress.model.js';

export const getUserProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      status: 'success',
      data: { progress }
    });
  } catch (error) {
    next(error);
  }
};
