const donationModel = require('../models/donation.model');
const crypto = require('crypto');
const razorpayInstance = require("../middleware/razorpayinstance")



const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
    }
    const options = {
      amount: amount, 
      currency: currency || 'INR',
      receipt: receipt || `donation_${Date.now()}`,
      notes: notes || {},
      payment_capture: 1
    };

    // Use the razorpayInstance to create order
    const order = await razorpayInstance.orders.create(options);
    res.json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment order',
      details: error || error.description,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      razorpayInstance
    });
  }
};

// save donation amount 
const saveDonation = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      donationFor,
      donationAmount,
      paymentMethod,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      address,
      panNumber
    } = req.body;

    // Verify Razorpay payment signature
    if (paymentMethod === 'razorpay') {
      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({
          success: false,
          error: 'Missing Razorpay payment details'
        });
      }

      const generatedSignature = crypto
        .createHmac('sha256', razorpayInstance.key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          error: 'Invalid payment signature'
        });
      }
    }

    // Create donation record
    const donation = new donationModel({
      donorName: fullName,
      donorEmail: email,
      donorPhone: phone,
      purpose: donationFor,
      otherPurposeNote: req.body.otherPurposeNote,
      amount: donationAmount,
      paymentMethod:"razorpay",
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      address: address,
      panNumber: panNumber,
      status: 'completed',
      date: new Date()
    });

    await donation.save();
    res.json({
      success: true,
      donationId: donation._id,
      message: 'Donation recorded successfully'
    });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save donation',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};



// get donor information
const getDonorInfo = async (req, res) => {
  try {
    const donor = await donationModel.find({});
    res.status(200).json({
      success: true,
      count: donor.length,
      data: donor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

module.exports = { createOrder, saveDonation, getDonorInfo };