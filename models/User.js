const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  calorieGoal: {
    type: Number,
    default: 2000
  },
  proteinGoal: {
    type: Number,
    default: 150
  },
  carbsGoal: {
    type: Number,
    default: 250
  },
  fatGoal: {
    type: Number,
    default: 60
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
