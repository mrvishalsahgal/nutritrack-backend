const express = require('express');
const router = express.Router();
const {
  getMeals,
  setMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/mealController');
const { protect } = require('../middleware/authMiddleware');
const { validate, mealLogSchema } = require('../middleware/validateMiddleware');

router.route('/').get(protect, getMeals).post(protect, validate(mealLogSchema), setMeal);
router.route('/:id').put(protect, validate(mealLogSchema), updateMeal).delete(protect, deleteMeal);

module.exports = router;
