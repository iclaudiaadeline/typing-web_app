import express from 'express';
import { processVoiceTyping, getVoiceSessions } from '../controllers/voice.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.post('/process', processVoiceTyping);
router.get('/sessions', getVoiceSessions);

export default router;
