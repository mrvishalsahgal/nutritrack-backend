const MealLog = require('../models/MealLog');

// @desc    Get meals
// @route   GET /api/meals
// @access  Private
const getMeals = async (req, res) => {
  try {
    const dateQuery = req.query.date;
    let query = { user: req.user.id };
    
    // Filter by specific date if provided
    if (dateQuery) {
      const startOfDay = new Date(dateQuery);
      startOfDay.setUTCHours(0,0,0,0);
      const endOfDay = new Date(dateQuery);
      endOfDay.setUTCHours(23,59,59,999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }
    
    const meals = await MealLog.find(query).populate('foods.food');
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set meal
// @route   POST /api/meals
// @access  Private
const setMeal = async (req, res) => {
  try {
    const { mealType, foods, totalNutrients, name, image } = req.body;
    
    if (!mealType) {
      return res.status(400).json({ message: 'mealType is required' });
    }

    const mealLog = await MealLog.create({
      user: req.user.id,
      mealType,
      name,
      image,
      foods: foods || [],
      totalNutrients: totalNutrients || { calories: 0, protein: 0, carbs: 0, fat: 0 }
    });

    res.status(201).json(mealLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update meal
// @route   PUT /api/meals/:id
// @access  Private
const updateMeal = async (req, res) => {
  try {
    const meal = await MealLog.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedMeal = await MealLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete meal
// @route   DELETE /api/meals/:id
// @access  Private
const deleteMeal = async (req, res) => {
  try {
    const meal = await MealLog.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await MealLog.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMeals,
  setMeal,
  updateMeal,
  deleteMeal,
};
