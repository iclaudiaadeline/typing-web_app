import express from 'express';
import { getAchievements, checkUserAchievements } from '../controllers/achievement.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getAchievements);
router.post('/check', checkUserAchievements);

export default router;
