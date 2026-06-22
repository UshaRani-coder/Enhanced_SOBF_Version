const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const logger = require('../logger');

const JWT_SECRET =
  'bf6b483334db61f67393b8525a0e5d19b52fc21850724d1d3a00bb80cdb4db604abe72668403fa0b96a87b970ffa28ba4d8a7e8a30b9feeb3f0aed1fa5ae0ecb';
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
    // Decrypt the incoming data
    const bytes = CryptoJS.AES.decrypt(
      req.body.data,
      'bf6b483334db61f67393b8525a0e5d19b52fc21850724d1d3a00bb80cdb4db604abe72668403fa0b96a87b970ffa28ba4d8a7e8a30b9feeb3f0aed1fa5ae0ecb',
    );
    // const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    const decryptedData = JSON.parse(decryptedText);

    const { email, password } = decryptedData;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'User not found with this email ID Pls register yourself.',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    logger.error(err.stack || err.message);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { registerAdmin, loginAdmin };
