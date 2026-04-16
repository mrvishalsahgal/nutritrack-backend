const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  servingSize: String,
  image: String,
  barcode: String // Optional for lookup
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
