import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert', 'master'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  metrics: {
    averageWPM: { type: Number, required: true },
    averageAccuracy: { type: Number, required: true },
    totalPracticeHours: { type: Number, required: true },
    totalSessions: { type: Number, required: true }
  },
  issuedDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: null
  },
  pdfUrl: String,
  verificationUrl: String,
  isVerified: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate certificate ID before saving
certificateSchema.pre('save', async function(next) {
  if (!this.certificateId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    this.certificateId = `JFFT-${timestamp}-${random}`;
  }
  next();
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
