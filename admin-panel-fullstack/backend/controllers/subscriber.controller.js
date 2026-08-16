const { logger } = require("../middleware/nodemailer");
const SubscriberModel = require("../models/subscriber.model");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { calculateSubscriptionEndDate } = require("../helper/calculateSubscriptionEndDate");
const razorpayInstance = require("../middleware/razorpayinstance");


// Create Razorpay order
const createSubscriptionOrder = async (req, res) => {
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
      receipt: receipt || `subscription_${Date.now()}`,
      notes: notes || {},
      payment_capture: 1 
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });
  } catch (error) {
    logger.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment order',
      details: error.error?.description || error.message
    });
  }
};

// Verify payment and create subscription
const verifySubscriptionPayment = async (req, res) => {
  try {
    const {  razorpay_order_id,  razorpay_payment_id, razorpay_signature,  subscriptionData } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !subscriptionData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Create signature
    const generatedSignature = crypto
      .createHmac('sha256', razorpayInstance.key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Verify signature
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed'
      });
    }

    // Create subscription
    const subscriptionEndDate = calculateSubscriptionEndDate(subscriptionData.duration);
    const subscriber = new SubscriberModel({
      ...subscriptionData,
      paymentDetails: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        amount: subscriptionData.amount,
        status: 'completed'
      },
      subscriptionStart: new Date(),
      subscriptionEnd: subscriptionEndDate
    });
    await subscriber.save();
    res.json({
      success: true,
      message: 'Payment verified and subscription created successfully',
      subscription: {
        id: subscriber._id,
        email: subscriber.email,
        duration: subscriber.duration,
        paymentId: razorpay_payment_id
      }
    });

  } catch (error) {
    logger.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment',
      details: error.message
    });
  }
};


// Get all subscribers
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await SubscriberModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers
    });
  } catch (error) {
    logger.error("Error retrieving subscribers:", error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve subscribers'
    });
  }
};

// Get subscriber by ID
const getSubscriberById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await SubscriberModel.findById(id);
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: "Subscriber not found"
      });
    }

    res.status(200).json({
      success: true,
      subscriber
    });
  } catch (error) {
    logger.error("Error retrieving subscriber:", error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve subscriber'
    });
  }
};

// Update subscriber
const updateSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const filename = req?.file?.filename;
    const updateData = { ...req.body };

    if (filename) {
      // updateData.image = "http://localhost:5000" + '/uploads/subscribers/' + filename;
      updateData.image = "https://backend.sobf.in" + '/uploads/subscribers/' + filename;
    }

    const subscriber = await SubscriberModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: "Subscriber not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscriber updated successfully",
      subscriber
    });
  } catch (error) {
    logger.error("Error updating subscriber:", error);
    res.status(500).json({
      success: false,
      error: 'Failed to update subscriber'
    });
  }
};

// Delete subscriber
const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await SubscriberModel.findByIdAndDelete(id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        error: "Subscriber not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully"
    });
  } catch (error) {
    logger.error("Error deleting subscriber:", error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete subscriber'
    });
  }
};



module.exports = {
  createSubscriptionOrder,
  verifySubscriptionPayment,
  getAllSubscribers,
  getSubscriberById,
  updateSubscriber,
  deleteSubscriber
};