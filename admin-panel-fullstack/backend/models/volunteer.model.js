// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String,required: true},
  mobile: { type: String, required: true},
  occupation: String,
  gender: {type: String, required: true,enum: ['Male', 'Female', 'Other']},
  age: Number,
  state: {type: String, required: true},
  city: { type: String,required: true},
  message: String,
  purpose: String
}, {
  timestamps: true 
});

module.exports = mongoose.model('Volunteer', volunteerSchema);