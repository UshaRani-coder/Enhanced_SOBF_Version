const adminModel = require("../models/admin.model");

// Create admin
const createAdmin = async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    // Plain validation
    if (!username || username.length < 5 || username.length > 30) {
      return res.status(400).json({ error: 'Username must be between 3 and 30 characters long.' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone must be a 10-digit number.' });
    }
    const admin = new adminModel({ username, email, phone });
    await admin.save();
    res.status(201).json({ success: true, message: 'Admin created', data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while creating post .", error: error.message });
  }
};

// get admin
const getAdmin = async (req, res) => {
  try {
    const admins = await adminModel.find({});
    res.status(200).json({ success: true, message: "admin fetched successfully...", data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went while fetching the admin data ", error: error.message });
  }
}

// upadate admin
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await adminModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAdmin) return res.status(404).json({ error: 'Admin not found' });
    res.status(200).json({ success: true, message: 'Admin updated', updatedAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Admin data didn't updated ",  error :  error.message });
  }
};

// delete admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Admin ID is required.' });
    }
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    if (!deletedAdmin) return res.status(404).json({ error: 'Admin not found' });
    res.status(200).json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Admin data didn't deleted ", error: error.message });
  }
};


module.exports = { createAdmin, getAdmin, updateAdmin, deleteAdmin }