import express from 'express';
import {
  getUsers,
  getUserById,
  updateSettings,
  getUserStats,
  deleteUser
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin', 'school_admin', 'teacher'), getUsers);
router.get('/:id', getUserById);
router.put('/settings', updateSettings);
router.get('/:id/stats', getUserStats);
router.delete('/:id', authorize('admin', 'school_admin'), deleteUser);

export default router;
