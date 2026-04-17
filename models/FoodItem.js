const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for global foods, set for user foods
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  servingSize: String,
  image: String,
  barcode: String // Optional for lookup
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
