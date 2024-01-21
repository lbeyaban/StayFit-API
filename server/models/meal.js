const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  calori: {
    type: Double,
    required: true
  }
  
});

const Meal = mongoose.model('Meals', MealSchema);

module.exports = Meal;
