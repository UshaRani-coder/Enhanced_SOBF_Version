const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const JWT_SECRET = "fgdsgsdfty4362365fhfg";
// Admin Registration (Only for first-time setup)
const registerAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if admin already exists
		const existingAdmin = await Admin.findOne({ email });
		if (existingAdmin) {
			return res.status(400).json({ message: "Admin already exists" });
		}

		const newAdmin = new Admin({ email, password });
		await newAdmin.save();
		res
			.status(201)
			.json({ message: "Admin registered successfully", newAdmin });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

const loginAdmin = async (req, res) => {
	try {
		// Decrypt the incoming data
		console.log(req.body);
		const bytes = CryptoJS.AES.decrypt(req.body.data, "fgdsgsdfty4362365fhfg");
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

		const { email, password } = decryptedData;
		console.log({ decryptedData });
		// Proceed with authentication logic as usual
		const admin = await Admin.findOne({ email });
		console.log({ admin });
		if (!admin) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, admin.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
			expiresIn: "1h",
		});

		console.log(">>>>>>>>> JWT_SECRET", process.env.JWT_SECRET);

		res.status(200).json({
			message: "Login successful",
			token,
		});
	} catch (err) {
		console.log("login admin >>>>>>>>>>>> ", err);
		res.status(500).json({ message: "Server error", error: err.message });
	}
};


module.exports = { registerAdmin, loginAdmin };
