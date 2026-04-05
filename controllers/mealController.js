const Meal = require('../models/Meal');

// @desc    Get meals
// @route   GET /api/meals
// @access  Private
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set meal
// @route   POST /api/meals
// @access  Private
const setMeal = async (req, res) => {
  if (!req.body.name || !req.body.calories) {
    return res.status(400).json({ message: 'Please add required fields' });
  }

  try {
    const meal = await Meal.create({
      name: req.body.name,
      label: req.body.label,
      labelColor: req.body.labelColor,
      calories: req.body.calories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fat: req.body.fat,
      image: req.body.image,
      user: req.user.id,
    });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update meal
// @route   PUT /api/meals/:id
// @access  Private
const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the meal user
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
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
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the meal user
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Meal.findByIdAndDelete(req.params.id);

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
