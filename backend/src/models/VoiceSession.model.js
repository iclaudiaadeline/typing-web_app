import mongoose from 'mongoose';

const voiceSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    expected: { type: String, required: true },
    spoken: { type: String, required: true }
  },
  audioUrl: String,
  analysis: {
    pronunciationScore: { type: Number, min: 0, max: 100 },
    accuracyScore: { type: Number, min: 0, max: 100 },
    fluencyScore: { type: Number, min: 0, max: 100 },
    completenessScore: { type: Number, min: 0, max: 100 },
    overallScore: { type: Number, min: 0, max: 100 }
  },
  errors: [{
    word: String,
    expected: String,
    spoken: String,
    confidence: Number
  }],
  duration: Number, // in seconds
  language: {
    type: String,
    default: 'en-US'
  }
}, {
  timestamps: true
});

const VoiceSession = mongoose.model('VoiceSession', voiceSessionSchema);

export default VoiceSession;
