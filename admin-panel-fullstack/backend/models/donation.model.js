const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  pan: {
    type: String,
    required: true
  },
  aadhar: {
    type: String
  },
  pin: {
    type: String,
    required: true
  },
  donationFor: {
    type: String,
    required: true
  },
  donationAmount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['qr', 'paypal']
  },
  paymentDetails: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

// Add pagination plugin
DonationSchema.plugin(require('mongoose-paginate-v2'));

module.exports = mongoose.model('Donation', DonationSchema);