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

// const loginAdmin = async (req, res) => {
//  try {
//    // Decrypt the incoming data
//    console.log(req.body);
//    const { email, password } = req.body;
//    const bytesEmail = CryptoJS.AES.decrypt(email, " ");
//    const bytesPassword = CryptoJS.AES.decrypt(password, "fgdsgsdfty4362365fhfg");
//    // console.log("bytes", bytes)
//    const decryptedEmailData = JSON.parse(bytesEmail.toString(CryptoJS.enc.Utf8));
//    const decryptedPasswordData = JSON.parse(bytesPassword.toString(CryptoJS.enc.Utf8));

//    // const { email, password } = decryptedData;
//    console.log({ decryptedEmailData, decryptedPasswordData });
//    // Proceed with authentication logic as usual

    
//    const admin = await Admin.findOne({ decryptedEmailData });
//    console.log({ admin });
//    if (!admin) {
//      return res.status(400).json({ message: "User not found " });
//    }

//    const isMatch = await bcrypt.compare(decryptedPasswordData, admin.password);
//    if (!isMatch) {
//      return res.status(400).json({ message: "Invalid  password" });
//    }

//    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
//      expiresIn: "1h",
//    });

//    console.log(">>>>>>>>> JWT_SECRET", process.env.JWT_SECRET);

//    res.status(200).json({
//      message: "Login successful",
//      token,
//    });
//  } catch (err) {
//    console.log("login admin >>>>>>>>>>>> ", err);
//    res.status(500).json({ message: "Server error", error: err.message });
//  }
// };


const loginAdmin = async (req, res) => {
  try {
    // Log incoming data
    console.log("Request body:", req.body);

    // Decrypt the incoming email and password
    const encryptedEmail = req.body.email;
    const encryptedPassword = req.body.password;

    if (!encryptedEmail || !encryptedPassword) {
      return res.status(400).json({ message: "Email or password is missing" });
    }

    const decryptedEmailBytes = CryptoJS.AES.decrypt(
      encryptedEmail,
      "fgdsgsdfty4362365fhfg"
    );
    const decryptedPasswordBytes = CryptoJS.AES.decrypt(
      encryptedPassword,
      "fgdsgsdfty4362365fhfg"
    );

    const email = decryptedEmailBytes.toString(CryptoJS.enc.Utf8);
    const password = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);

    if (!email || !password) {
      return res.status(400).json({ message: "Decryption failed" });
    }

    console.log("Decrypted data:", { email, password });

    // Authentication logic
    const admin = await Admin.findOne({ email });
    console.log("Admin found:", admin);

    if (!admin) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Error in loginAdmin:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};





const protectedRoute = async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;

    console.log(
      ">>>>>>>>> JWT_SECRET in Protected Route",
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "Access granted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
module.exports = { registerAdmin, loginAdmin, protectedRoute };
