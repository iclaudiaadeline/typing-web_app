import Assignment from '../models/Assignment.model.js';
import Class from '../models/Class.model.js';
import { AppError } from '../middleware/error.middleware.js';

// @desc    Create assignment
// @route   POST /api/assignments
// @access  Private/Teacher
export const createAssignment = async (req, res, next) => {
  try {
    const {
      title,
      description,
      classId,
      typingText,
      targetWPM,
      targetAccuracy,
      minPracticeTime,
      dueDate,
      difficulty
    } = req.body;

    // Verify class exists and user is the teacher
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return next(new AppError('Class not found', 404));
    }

    if (classDoc.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to create assignments for this class', 403));
    }

    const assignment = await Assignment.create({
      title,
      description,
      class: classId,
      teacher: req.user.id,
      typingText,
      goals: {
        targetWPM,
        targetAccuracy,
        minPracticeTime
      },
      dueDate,
      difficulty,
      assignedStudents: classDoc.students.map(student => ({
        student,
        status: 'pending'
      })),
      isPublished: true
    });

    // Add assignment to class
    classDoc.assignments.push(assignment._id);
    await classDoc.save();

    res.status(201).json({
      status: 'success',
      data: { assignment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private
export const getAssignments = async (req, res, next) => {
  try {
    const { classId, status, page = 1, limit = 10 } = req.query;

    let query = {};

    if (req.user.role === 'student') {
      query['assignedStudents.student'] = req.user.id;
      if (status) {
        query['assignedStudents.status'] = status;
      }
    } else if (req.user.role === 'teacher') {
      query.teacher = req.user.id;
    }

    if (classId) {
      query.class = classId;
    }

    const assignments = await Assignment.find(query)
      .populate('class', 'name')
      .populate('teacher', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ dueDate: 1 });

    const total = await Assignment.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        assignments,
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

// @desc    Get assignment by ID
// @route   GET /api/assignments/:id
// @access  Private
export const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('class', 'name')
      .populate('teacher', 'name email')
      .populate('assignedStudents.student', 'name email avatar');

    if (!assignment) {
      return next(new AppError('Assignment not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { assignment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update assignment
// @route   PUT /api/assignments/:id
// @access  Private/Teacher
export const updateAssignment = async (req, res, next) => {
  try {
    let assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return next(new AppError('Assignment not found', 404));
    }

    // Check authorization
    if (assignment.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this assignment', 403));
    }

    assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { assignment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private/Teacher
export const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return next(new AppError('Assignment not found', 404));
    }

    // Check authorization
    if (assignment.teacher.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this assignment', 403));
    }

    await assignment.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student assignment statistics
// @route   GET /api/assignments/:id/student-stats
// @access  Private/Teacher
export const getStudentStats = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('assignedStudents.student', 'name email avatar');

    if (!assignment) {
      return next(new AppError('Assignment not found', 404));
    }

    const stats = assignment.assignedStudents.map(student => ({
      student: student.student,
      status: student.status,
      attempts: student.attempts.length,
      bestAttempt: student.bestAttempt,
      completedAt: student.completedAt
    }));

    res.status(200).json({
      status: 'success',
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
};
