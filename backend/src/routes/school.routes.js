import express from 'express';
import { createSchool, getSchools, getSchoolById } from '../controllers/school.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('admin'), createSchool);
router.get('/', getSchools);
router.get('/:id', getSchoolById);

export default router;
