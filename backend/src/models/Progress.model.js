import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionType: {
    type: String,
    enum: ['practice', 'assignment', 'challenge'],
    required: true
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    default: null
  },
  text: {
    type: String,
    required: true
  },
  metrics: {
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    totalCharacters: { type: Number, required: true },
    correctCharacters: { type: Number, required: true },
    incorrectCharacters: { type: Number, required: true },
    duration: { type: Number, required: true }, // in seconds
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  },
  errorAnalysis: {
    commonErrors: [{
      character: String,
      count: Number
    }],
    problemKeys: [String]
  },
  isPassed: {
    type: Boolean,
    default: null
  },
  feedback: String
}, {
  timestamps: true
});

// Index for faster queries
progressSchema.index({ user: 1, createdAt: -1 });
progressSchema.index({ user: 1, sessionType: 1 });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
