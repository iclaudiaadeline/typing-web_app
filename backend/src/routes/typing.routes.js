import express from 'express';
import {
  startSession,
  submitSession,
  getTexts,
  getProgressHistory
} from '../controllers/typing.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/start', startSession);
router.post('/submit', submitSession);
router.get('/texts', getTexts);
router.get('/progress', getProgressHistory);

export default router;
