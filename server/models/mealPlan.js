const { Double, Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealPlanSchema = new Schema({

  breakfast: {
    type: [{
        mealId: String
    }],
    required: true
  },
  lunch: {
    type: [{
        mealId: String
    }],
    required: true
  },
  dinner: {
    type: [{
        mealId: String
    }],
    required: true
  },
  isActive: {
    typeof: Int32,
    required: true
  },
  startDay: {
    typeof: Date,
    required: true
  },
  finishDay: {
    typeof: Date,
    required: true
  },
  totalCalori: {
    typeof: Double
  }
  
});

const MealPlan = mongoose.model('MealPlans', MealPlanSchema);

module.exports = MealPlan;
