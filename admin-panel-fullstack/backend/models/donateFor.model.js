// models/DonationCategoryModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone_no: { type: String, required: true },
  pan_no: { type: String, required: true },
  aadhar_no: { type: String, required: true },
  address: { type: String, required: true },
  amount:{ type: String},
});

const donationCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    raised: { type: String, required: true },
    goal: { type: String, required: true },
    donor: [userSchema], // Embedded array of donors
  },
  {
    timestamps: true,
  }
);

const DonationCategoryModel = mongoose.model('DonationCategoryModel', donationCategorySchema);

module.exports = DonationCategoryModel;
