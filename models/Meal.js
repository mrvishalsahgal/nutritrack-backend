const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a meal name']
  },
  label: {
    type: String,
  },
  labelColor: {
    type: String,
    default: 'text-primary'
  },
  calories: {
    type: Number,
    required: [true, 'Please add calories']
  },
  protein: {
    type: Number,
    required: [true, 'Please add protein amount']
  },
  carbs: {
    type: Number,
    required: [true, 'Please add carbs amount']
  },
  fat: {
    type: Number,
    required: [true, 'Please add fat amount']
  },
  image: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema);
