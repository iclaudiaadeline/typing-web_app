import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: String,
  category: {
    type: String,
    enum: ['speed', 'accuracy', 'consistency', 'milestone', 'special'],
    required: true
  },
  criteria: {
    type: {
      type: String,
      enum: ['wpm', 'accuracy', 'sessions', 'streak', 'custom']
    },
    value: Number,
    comparison: {
      type: String,
      enum: ['>=', '<=', '='],
      default: '>='
    }
  },
  points: {
    type: Number,
    default: 10
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
