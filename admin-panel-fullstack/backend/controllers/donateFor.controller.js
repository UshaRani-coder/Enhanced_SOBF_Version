const { logger } = require("../middleware/nodemailer");
const DonationCategoryModel = require("../models/donateFor.model");
const crypto = require('crypto');
const razorpayInstance = require("../middleware/razorpayinstance")

// Create Razorpay order
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
      amount: amount ,
      currency: currency || 'INR',
      receipt: receipt || `donation_${Date.now()}`,
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
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment order',
      details: error.error?.description || error.message
    });
  }
};

// Verify payment and add donor to category
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationData, donationId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !donationData || !donationId) {
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

    // Add donor to donation category
    const { fullname, email, phone_no, pan_no, aadhar_no, address, amount, message } = donationData;

    const donor = {
      fullname,
      email,
      phone_no,
      pan_no,
      aadhar_no,
      address,
      amount: parseFloat(amount),
      message,
      paymentId: razorpay_payment_id,
      status: 'completed',
      date: new Date()
    };

    // Update donation category with new donor and increment raised amount
    const updatedCategory = await DonationCategoryModel.findByIdAndUpdate(
      donationId,
      {
        $push: { donor: donor },
        $inc: { 'category.raised': parseFloat(amount) }
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        error: 'Donation category not found'
      });
    }

    // Format response
  const responseCategory = updatedCategory.toObject();
    res.json({
      success: true,
      message: 'Payment verified and donor added successfully',
      paymentId: razorpay_payment_id,
      category: responseCategory
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment',
      details: error.message
    });
  }
};

// Add donation category (unchanged)
const addDonationCategory = async (req, res) => {
  try {
    const { title, description, raised, goal } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const newCategory = new DonationCategoryModel({
      title,
      description,
      image: req.file.path,
      raised: raised || 0,
      goal,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: 'Post has been created successfully',
      category: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all donation categories (unchanged)
const getAllDonationCategories = async (req, res) => {
  try {
    const categories = await DonationCategoryModel.find({});

    res.status(200).json({
      success: true,
      message: 'Donation categories retrieved successfully',
      categories,
    });
  } catch (error) {
    logger.error('Error retrieving donation categories:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve donation categories',
      error: error.message,
    });
  }
};

// Get donation category by ID (unchanged)
const getDonationCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await DonationCategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Donation category not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation category retrieved successfully',
      category,
    });
  } catch (error) {
    logger.error('Error retrieving donation category:', error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update donation category (unchanged)
const updateDonationCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, raised, goal } = req.body;

    const updatedFields = {
      title,
      description,
      raised,
      goal,
    };

    if (req.file) {
      updatedFields.image = req.file.path; // Cloudinary URL
    }

    const updatedCategory = await DonationCategoryModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Donation category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Donation category updated successfully',
      category: updatedCategory,
    });
  } catch (error) {
    logger.error('Error updating donation category:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update donation category',
      error: error.message,
    });
  }
};

// Delete donation category (unchanged)
const deleteDonationCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await DonationCategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Donation category not found",
      });
    }

    await DonationCategoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Donation category deleted successfully",
    });
  } catch (error) {
    logger.error("Error deleting donation category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete donation category",
      error: error.message,
    });
  }
}

module.exports = {
  createOrder,
  verifyPayment,
  addDonationCategory,
  getAllDonationCategories,
  getDonationCategoryById,
  updateDonationCategory,
  deleteDonationCategory
};