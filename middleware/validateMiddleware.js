const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: result.error.format()
      });
    }
    req.body = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const mealLogSchema = z.object({
  mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snacks']),
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  foods: z.array(
    z.object({
      food: z.string(), // Represents ObjectId
      quantity: z.number().positive()
    })
  ).optional(),
  totalNutrients: z.object({
    calories: z.number().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0)
  }).optional()
});

module.exports = { validate, registerSchema, loginSchema, mealLogSchema };
