import express from 'express';
import { 
  generateCertificate, 
  getUserCertificates, 
  verifyCertificate 
} from '../controllers/certificate.controller.js';
import { protect, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, generateCertificate);
router.get('/my-certificates', protect, getUserCertificates);
router.get('/verify/:certificateId', optionalAuth, verifyCertificate);

export default router;
