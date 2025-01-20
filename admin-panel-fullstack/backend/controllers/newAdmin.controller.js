const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

// Admin Registration
const registerAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingAdmin = await Admin.findOne({ email });
		if (existingAdmin) {
			return res.status(400).json({ message: "Admin already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newAdmin = new Admin({ email, password: hashedPassword });
		await newAdmin.save();

		res
			.status(201)
			.json({ message: "Admin registered successfully", newAdmin });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

// Admin Login
const loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body; // Directly destructure from req.body

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const admin = await Admin.findOne({ email });
		if (!admin) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, admin.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ message: "Login successful", token });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

// Protected Route
const protectedRoute = async (req, res) => {
	const authHeader = req.header("Authorization");
	if (!authHeader) {
		return res.status(401).json({ message: "Access Denied" });
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Access Denied" });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.admin = verified;
		res.status(200).json({ message: "Access granted" });
	} catch (err) {
		res.status(400).json({ message: "Invalid token" });
	}
};

module.exports = { registerAdmin, loginAdmin, protectedRoute };
