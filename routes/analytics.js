const express = require('express');
const router = express.Router();
const { getTrends } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/trends', protect, getTrends);

module.exports = router;
