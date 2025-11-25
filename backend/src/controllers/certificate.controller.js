import Certificate from '../models/Certificate.model.js';
import User from '../models/User.model.js';
import PDFDocument from 'pdfkit';
import { AppError } from '../middleware/error.middleware.js';

export const generateCertificate = async (req, res, next) => {
  try {
    const { type, title, description } = req.body;
    const user = await User.findById(req.user.id);

    const certificate = await Certificate.create({
      user: req.user.id,
      type,
      title,
      description,
      metrics: user.typingStats
    });

    res.status(201).json({
      status: 'success',
      data: { certificate }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ user: req.user.id })
      .sort({ issuedDate: -1 });

    res.status(200).json({
      status: 'success',
      data: { certificates }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({ 
      certificateId: req.params.certificateId 
    }).populate('user', 'name email');

    if (!certificate) {
      return next(new AppError('Certificate not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { certificate, isValid: certificate.isVerified }
    });
  } catch (error) {
    next(error);
  }
};
