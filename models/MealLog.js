const mongoose = require('mongoose');

const mealLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] },
  foods: [{
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
    quantity: Number
  }],
  name: String, // Specifically for quick-capturing from AI or custom titles
  image: String,
  totalNutrients: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  }
});

module.exports = mongoose.model('MealLog', mealLogSchema);
