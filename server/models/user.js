const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  lenght: {
    type: Number,
    required: true
  },
  goals: {
    type: [String],
    default: []
  },
  workouts: {
    type: [{
      programId: String,
      startdate: Date,
      finishdate: Date,
    }],
    default: []
  },
  mealPlan: {
    type: [{
      planid: String,
      startdate: Date,
      finishdate: Date
    }],
    default: []
  }
  
});


const User = mongoose.model('Users', UserSchema);

module.exports = User;
