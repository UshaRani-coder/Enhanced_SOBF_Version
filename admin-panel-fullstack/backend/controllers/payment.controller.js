const Razorpay = require("razorpay");
const DonationCategoryModel = require("../models/donateFor.model");
// const Donation = require("../models/Donation");
require("dotenv").config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// Create Razorpay Order
exports.createOrder = async (req, res) => {
  const { donationAmount } = req.body;
  const amount = donationAmount * 100; // in paisa

  const options = {
    amount,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Save Donation after Payment
exports.saveDonation = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    donationFor,
    donationAmount,
    paymentId,
    orderId,
  } = req.body;

  try {
    const donation = new DonationCategoryModel({
      fullName,
      email,
      phone,
      donationFor,
      donationAmount,
      paymentId,
      orderId,
    });

    await donation.save();
    res.status(201).json({ message: "Donation saved successfully" });
  } catch (error) {
    console.error("Save Donation Error:", error);
    res.status(500).json({ error: "Failed to save donation" });
  }
};
