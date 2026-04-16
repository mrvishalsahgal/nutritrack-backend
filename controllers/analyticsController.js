const MealLog = require('../models/MealLog');

const getTrends = async (req, res) => {
  try {
    const { range } = req.query; 
    
    // Simplistic trend fetch: grab all logs for the user.
    // Real implementation would aggregate data by week/month depending on range.
    const logs = await MealLog.find({ user: req.user.id }).sort('date');
    
    res.status(200).json({
      range,
      data: logs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrends };
