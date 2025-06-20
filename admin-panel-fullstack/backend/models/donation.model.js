const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String },
  donorEmail: { type: String },
  donorPhone: { type: String },
  purpose: { type: String },
  otherPurposeNote: String,
  amount: { type: Number },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'upi', 'bank_transfer']
  },
  transactionId: { type: String },
  razorpayOrderId: { type: String },
  razorpaySignature: { type: String },
  address: { type: String },
  panNumber: { type: String },
  status: {
    type: String,
    default: 'completed',
    enum: ['pending', 'completed', 'failed']
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);