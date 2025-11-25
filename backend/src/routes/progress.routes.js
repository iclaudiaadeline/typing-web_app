import express from 'express';
import { getUserProgress } from '../controllers/progress.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/:userId', getUserProgress);

export default router;
