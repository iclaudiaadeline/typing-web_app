import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide school name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide school email'],
    unique: true,
    lowercase: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  phone: String,
  website: String,
  logo: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  subscription: {
    plan: {
      type: String,
      enum: ['basic', 'standard', 'premium'],
      default: 'basic'
    },
    startDate: Date,
    endDate: Date,
    maxStudents: { type: Number, default: 50 },
    maxTeachers: { type: Number, default: 5 }
  },
  settings: {
    allowStudentSignup: { type: Boolean, default: false },
    requireEmailVerification: { type: Boolean, default: true },
    enableVoiceTyping: { type: Boolean, default: false }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const School = mongoose.model('School', schoolSchema);

export default School;
