import express from 'express';
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getStudentStats
} from '../controllers/assignment.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('teacher', 'admin', 'school_admin'), createAssignment);
router.get('/', getAssignments);
router.get('/:id', getAssignmentById);
router.put('/:id', authorize('teacher', 'admin', 'school_admin'), updateAssignment);
router.delete('/:id', authorize('teacher', 'admin', 'school_admin'), deleteAssignment);
router.get('/:id/student-stats', authorize('teacher', 'admin', 'school_admin'), getStudentStats);

export default router;
