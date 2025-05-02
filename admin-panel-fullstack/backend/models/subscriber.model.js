const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: { type: String,  trim: true },
  place: { type: String, trim: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  pan: { type: String, required: true, unique: true },
  aadhaar: { type: String, },
  duration: { type: String},
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subscriber', subscriberSchema);