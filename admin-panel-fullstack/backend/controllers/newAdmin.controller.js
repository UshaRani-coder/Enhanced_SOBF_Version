const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const logger = require('../logger');

const JWT_SECRET = 'fgdsgsdfty4362365fhfg';
// Admin Registration (Only for first-time setup)
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res
      .status(201)
      .json({ success: true, message: 'Admin registered successfully', newAdmin });
  } catch (err) {
    logger.error("Server error while registering.")
    res.status(500).json({ success: false, message: 'Server error while registering' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    // Decrypt the incoming data
    const bytes = CryptoJS.AES.decrypt(req.body.data, 'fgdsgsdfty4362365fhfg');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const { email, password } = decryptedData;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'User not found with this email ID Pls register yourself.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    logger.error("Server error while login.")
    res.status(500).json({ message: 'Server error while login ' });
  }
};

module.exports = { registerAdmin, loginAdmin };
