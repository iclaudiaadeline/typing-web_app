import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide assignment title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  typingText: {
    type: String,
    required: [true, 'Please provide typing text']
  },
  goals: {
    targetWPM: { type: Number, required: true },
    targetAccuracy: { type: Number, required: true },
    minPracticeTime: { type: Number, default: 0 } // in minutes
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide due date']
  },
  assignedStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'failed'],
      default: 'pending'
    },
    completedAt: Date,
    attempts: [{
      wpm: Number,
      accuracy: Number,
      errors: Number,
      duration: Number, // in seconds
      completedAt: Date
    }],
    bestAttempt: {
      wpm: Number,
      accuracy: Number,
      errors: Number,
      isPassed: Boolean
    }
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
