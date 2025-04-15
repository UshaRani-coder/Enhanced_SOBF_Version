const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  pan: {
    type: String,
    required: true,
    unique: true
  },
  aadhar: {
    type: String,
    unique: true,
    sparse: true
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  donationCount: {
    type: Number,
    default: 0
  },
  lastDonationDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);