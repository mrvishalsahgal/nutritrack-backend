const express = require('express');
const router = express.Router();
const { searchFoods, createFood } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', protect, searchFoods);
router.post('/', protect, createFood);

module.exports = router;
