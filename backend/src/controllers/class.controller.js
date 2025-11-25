import Class from '../models/Class.model.js';
import School from '../models/School.model.js';
import { AppError } from '../middleware/error.middleware.js';

// @desc    Create class
// @route   POST /api/classes
// @access  Private/Teacher
export const createClass = async (req, res, next) => {
  try {
    const { name, description, schoolId, schedule, grade } = req.body;

    // Verify school exists
    const school = await School.findById(schoolId);
    if (!school) {
      return next(new AppError('School not found', 404));
    }

    const classDoc = await Class.create({
      name,
      description,
      school: schoolId,
      teacher: req.user.id,
      schedule,
      grade
    });

    // Add class to school
    school.classes.push(classDoc._id);
    await school.save();

    res.status(201).json({
      status: 'success',
      data: { class: classDoc }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
export const getClasses = async (req, res, next) => {
  try {
    const { schoolId, page = 1, limit = 10 } = req.query;

    let query = {};

    if (req.user.role === 'student') {
      query.students = req.user.id;
    } else if (req.user.role === 'teacher') {
      query.teacher = req.user.id;
    }

    if (schoolId) {
      query.school = schoolId;
    }

    const classes = await Class.find(query)
      .populate('school', 'name logo')
      .populate('teacher', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Class.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        classes,
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

// @desc    Get class by ID
// @route   GET /api/classes/:id
// @access  Private
export const getClassById = async (req, res, next) => {
  try {
    const classDoc = await Class.findById(req.params.id)
      .populate('school', 'name logo')
      .populate('teacher', 'name email')
      .populate('students', 'name email avatar typingStats')
      .populate('assignments', 'title dueDate');

    if (!classDoc) {
      return next(new AppError('Class not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { class: classDoc }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private/Teacher
export const updateClass = async (req, res, next) => {
  try {
    let classDoc = await Class.findById(req.params.id);

    if (!classDoc) {
      return next(new AppError('Class not found', 404));
    }

    // Check authorization
    if (classDoc.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this class', 403));
    }

    classDoc = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { class: classDoc }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add students to class
// @route   POST /api/classes/:id/students
// @access  Private/Teacher
export const addStudentsToClass = async (req, res, next) => {
  try {
    const { studentIds } = req.body;

    const classDoc = await Class.findById(req.params.id);

    if (!classDoc) {
      return next(new AppError('Class not found', 404));
    }

    // Check authorization
    if (classDoc.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to modify this class', 403));
    }

    // Add unique students
    studentIds.forEach(id => {
      if (!classDoc.students.includes(id)) {
        classDoc.students.push(id);
      }
    });

    await classDoc.save();

    res.status(200).json({
      status: 'success',
      data: { class: classDoc }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove student from class
// @route   DELETE /api/classes/:id/students/:studentId
// @access  Private/Teacher
export const removeStudentFromClass = async (req, res, next) => {
  try {
    const classDoc = await Class.findById(req.params.id);

    if (!classDoc) {
      return next(new AppError('Class not found', 404));
    }

    // Check authorization
    if (classDoc.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to modify this class', 403));
    }

    classDoc.students = classDoc.students.filter(
      id => id.toString() !== req.params.studentId
    );

    await classDoc.save();

    res.status(200).json({
      status: 'success',
      message: 'Student removed from class'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private/Teacher
export const deleteClass = async (req, res, next) => {
  try {
    const classDoc = await Class.findById(req.params.id);

    if (!classDoc) {
      return next(new AppError('Class not found', 404));
    }

    // Check authorization
    if (classDoc.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this class', 403));
    }

    await classDoc.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Class deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
