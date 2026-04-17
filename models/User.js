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
  avatar: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80' 
  },
  bio: { 
    type: String, 
    default: 'Nutritional explorer and fitness enthusiast.' 
  },
  preferences: {
    darkMode: { type: Boolean, default: false },
    emailNotifications: { type: Boolean, default: true },
    appleHealthSync: { type: Boolean, default: false },
    language: { type: String, default: 'English (US)' }
  },
  goals: {
    calories: { type: Number, default: 2000 },
    protein: { type: Number, default: 150 },
    carbs: { type: Number, default: 250 },
    fat: { type: Number, default: 60 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
