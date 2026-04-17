const FoodItem = require('../models/FoodItem');

const searchFoods = async (req, res) => {
  try {
    const { query } = req.query;
    // Find items that are EITHER global (no user) OR belongs to the current user
    let findQuery = {
      $or: [
        { user: { $exists: false } },
        { user: null },
        { user: req.user.id }
      ]
    };
    
    if (query) {
      findQuery.name = { $regex: query, $options: 'i' };
    }
    
    const foods = await FoodItem.find(findQuery).sort({ _id: -1 }).limit(50);
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const foodData = {
      ...req.body,
      user: req.user.id // Associate with current user
    };
    const food = await FoodItem.create(foodData);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchFoods, createFood };
