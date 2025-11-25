import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide class name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  schedule: {
    days: [String], // ['Monday', 'Wednesday', 'Friday']
    startTime: String,
    endTime: String
  },
  grade: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Class = mongoose.model('Class', classSchema);

export default Class;
