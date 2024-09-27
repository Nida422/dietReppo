const mongoose = require('mongoose');
const Schema=mongoose.Schema;
// Define Meal Plan Schema
const mealPlanSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  foodType: {
    type: [String],  // Array of food types
    required: true,
  },
  foodItems: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Diet = mongoose.model('Diet', mealPlanSchema);
module.exports = Diet;
