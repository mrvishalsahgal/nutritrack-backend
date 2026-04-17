const MealLog = require('../models/MealLog');
const User = require('../models/User');

const getTrends = async (req, res) => {
  try {
    const { range, date } = req.query; 
    
    let query = { user: req.user.id };

    if (range === 'daily' && date) {
      const searchDate = new Date(date);
      const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
      
      query.date = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }

    const logs = await MealLog.find(query).populate('foods.food').sort('date');
    const user = await User.findById(req.user.id).select('goals');
    
    res.status(200).json({
      range,
      goals: user.goals,
      data: logs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrends };
