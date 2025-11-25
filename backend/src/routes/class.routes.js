import express from 'express';
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  addStudentsToClass,
  removeStudentFromClass,
  deleteClass
} from '../controllers/class.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('teacher', 'admin', 'school_admin'), createClass);
router.get('/', getClasses);
router.get('/:id', getClassById);
router.put('/:id', authorize('teacher', 'admin', 'school_admin'), updateClass);
router.post('/:id/students', authorize('teacher', 'admin', 'school_admin'), addStudentsToClass);
router.delete('/:id/students/:studentId', authorize('teacher', 'admin', 'school_admin'), removeStudentFromClass);
router.delete('/:id', authorize('teacher', 'admin', 'school_admin'), deleteClass);

export default router;
