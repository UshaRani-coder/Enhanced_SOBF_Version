const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const logger = require('../logger');

const JWT_SECRET = process.env.JWT_SECRET;
// Admin Registration (Only for first-time setup)
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      newAdmin,
    });
  } catch (err) {
    logger.error('Server error while registering.');
    res
      .status(500)
      .json({ success: false, message: 'Server error while registering' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'User not found with this email ID. Please register yourself.',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    logger.error(err.stack || err.message);

    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

module.exports = { registerAdmin, loginAdmin };
