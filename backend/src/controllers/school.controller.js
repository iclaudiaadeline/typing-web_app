import School from '../models/School.model.js';
import { AppError } from '../middleware/error.middleware.js';

export const createSchool = async (req, res, next) => {
  try {
    const school = await School.create({
      ...req.body,
      admin: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: { school }
    });
  } catch (error) {
    next(error);
  }
};

export const getSchools = async (req, res, next) => {
  try {
    const schools = await School.find()
      .populate('admin', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: { schools }
    });
  } catch (error) {
    next(error);
  }
};

export const getSchoolById = async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id)
      .populate('admin', 'name email')
      .populate('teachers', 'name email')
      .populate('students', 'name email');

    if (!school) {
      return next(new AppError('School not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { school }
    });
  } catch (error) {
    next(error);
  }
};
