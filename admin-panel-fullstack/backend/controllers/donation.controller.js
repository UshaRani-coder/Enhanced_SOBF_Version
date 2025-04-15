const mongoose = require("mongoose");
const logger = require("../logger");
const { isValidObjectId } = require("mongoose");
const Donation = require("../models/donation.model");
const Donor = require("../models/donor.model");
const transporter = require("../middleware/nodemailer");

const createDonation = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      email,
      phone,
      pan,
      aadhar,
      pin,
      donationFor,
      donationAmount,
      transactionId,
      paymentMethod,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !pan || !pin || !donationFor || !donationAmount || !transactionId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Validate PAN format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PAN format (e.g., ABCDE1234F)"
      });
    }

    // Validate Aadhar if provided
    if (aadhar && !/^\d{12}$/.test(aadhar)) {
      return res.status(400).json({
        success: false,
        message: "Aadhaar must be 12 digits if provided"
      });
    }

    // Validate PIN code
    if (!/^\d{6}$/.test(pin)) {
      return res.status(400).json({
        success: false,
        message: "PIN code must be 6 digits"
      });
    }

    // Validate donation amount
    if (isNaN(donationAmount) || donationAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Donation amount must be a positive number"
      });
    }

    // Check if transaction ID already exists
    const existingDonation = await Donation.findOne({ transactionId });
    if (existingDonation) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID already exists"
      });
    }

    // Find or create donor
    let donor = await Donor.findOne({ email });
    if (!donor) {
      donor = new Donor({
        fullName,
        email,
        phone,
        pan,
        aadhar: aadhar || null,
        totalDonations: 0,
        donationCount: 0,
      });
    }

    // Create new donation
    const newDonation = new Donation({
      donor: donor._id,
      fullName,
      dob: new Date(dob),
      email,
      phone,
      pan,
      aadhar: aadhar || null,
      pin,
      donationFor,
      donationAmount,
      transactionId,
      paymentMethod,
      paymentDetails: req.body.paymentDetails || {},
    });

    // Update donor stats
    donor.totalDonations += parseFloat(donationAmount);
    donor.donationCount += 1;

    // Save both records in transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await donor.save({ session });
      await newDonation.save({ session });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

    // Send confirmation email
    await sendDonationConfirmationEmail(newDonation, donor);

    // Populate donor details for response
    const populatedDonation = await Donation.findById(newDonation._id).populate('donor', 'fullName email phone');

    return res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      donation: populatedDonation,
    });
  } catch (error) {
    logger.error("Error creating donation", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while processing your donation",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

const sendDonationConfirmationEmail = async (donation, donor) => {
  try {
    const formattedDate = new Date(donation.createdAt).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || "donations@sobf.in",
      to: donor.email,
      subject: `🎉 Thank You for Your Donation to ${donation.donationFor}`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 10px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
  
  <!-- Header Banner -->
  <div style="background: #4CAF50; padding: 20px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 24px;">Thank You for Your Generosity!</h1>
  </div>

  <!-- Content Section -->
  <div style="padding: 20px;">
    <p style="font-size: 16px; color: #555;">Dear ${donor.fullName},</p>
    <p style="font-size: 16px; color: #555;">We sincerely appreciate your donation of ₹${donation.donationAmount} towards our ${donation.donationFor} initiative.</p>
    
    <div style="background: #f8f8f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #4CAF50; margin-top: 0;">Donation Details</h3>
      <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${donation.transactionId}</p>
      <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
      <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${donation.paymentMethod === 'qr' ? 'QR Code' : 'PayPal'}</p>
      <p style="margin: 5px 0;"><strong>Purpose:</strong> ${donation.donationFor}</p>
    </div>

    <p style="font-size: 16px; color: #555;">Your contribution will help us continue our work in the community.</p>
  </div>

  <!-- CTA Button -->
  <div style="text-align: center; margin: 20px 0;">
    <a href="https://sobf.in/donate-us" target="_blank" rel="noopener noreferrer"
      style="text-decoration: none; background: #4CAF50; color: white; padding: 12px 25px; font-size: 16px; border-radius: 8px; display: inline-block;">
      💖 Make Another Donation
    </a>
  </div>

  <!-- Footer -->
  <div style="background: #f8f8f8; padding: 15px; text-align: center; font-size: 14px; color: #555; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
    <p>Need help? <a href="mailto:support@sobf.in" style="color: #4CAF50; text-decoration: none;">Contact Support</a></p>
    <p>© ${new Date().getFullYear()} SOBF | All rights reserved.</p>
  </div>
</div>
`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error("Error sending donation confirmation email", error);
    // Don't fail the request if email fails
  }
};

const getAllDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = '-createdAt', search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { transactionId: { $regex: search, $options: 'i' } },
        { donationFor: { $regex: search, $options: 'i' } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortBy,
      populate: {
        path: 'donor',
        select: 'fullName email phone'
      }
    };

    const donations = await Donation.paginate(query, options);

    res.status(200).json({
      success: true,
      message: "Donations retrieved successfully",
      donations,
    });
  } catch (error) {
    logger.error("Error fetching donations", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching donations",
    });
  }
};

const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation ID"
      });
    }

    const donation = await Donation.findById(id).populate('donor', 'fullName email phone');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Donation retrieved successfully",
      donation,
    });
  } catch (error) {
    logger.error("Error fetching donation", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the donation",
    });
  }
};

const getDonationsByDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(donorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donor ID"
      });
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: '-createdAt',
    };

    const donations = await Donation.paginate(
      { donor: donorId },
      options
    );

    res.status(200).json({
      success: true,
      message: "Donor's donations retrieved successfully",
      donations,
    });
  } catch (error) {
    logger.error("Error fetching donor's donations", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching donor's donations",
    });
  }
};

const sendTaxCertificate = async (req, res) => {
  try {
    const { donationId } = req.params;

    if (!isValidObjectId(donationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donation ID"
      });
    }

    const donation = await Donation.findById(donationId).populate('donor');
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    // In a real implementation, you would generate a PDF certificate here
    // For now, we'll just send an email with a thank you message

    const mailOptions = {
      from: process.env.EMAIL_FROM || "donations@sobf.in",
      to: donation.donor.email,
      subject: `Your Tax Certificate for Donation #${donation.transactionId}`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 10px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
  
  <!-- Header Banner -->
  <div style="background: #4CAF50; padding: 20px; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 24px;">Your Tax Certificate</h1>
  </div>

  <!-- Content Section -->
  <div style="padding: 20px;">
    <p style="font-size: 16px; color: #555;">Dear ${donation.donor.fullName},</p>
    <p style="font-size: 16px; color: #555;">Thank you for your generous donation of ₹${donation.donationAmount} on ${new Date(donation.createdAt).toLocaleDateString()}.</p>
    
    <p style="font-size: 16px; color: #555;">Attached is your tax exemption certificate for your records.</p>
    
    <div style="background: #f8f8f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #4CAF50; margin-top: 0;">Donation Details</h3>
      <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${donation.transactionId}</p>
      <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(donation.createdAt).toLocaleDateString()}</p>
      <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${donation.donationAmount}</p>
      <p style="margin: 5px 0;"><strong>Purpose:</strong> ${donation.donationFor}</p>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #f8f8f8; padding: 15px; text-align: center; font-size: 14px; color: #555; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
    <p>This certificate can be used for tax exemption under Section 80G of the Income Tax Act.</p>
    <p>© ${new Date().getFullYear()} SOBF | All rights reserved.</p>
  </div>
</div>
`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Tax certificate email sent successfully",
    });
  } catch (error) {
    logger.error("Error sending tax certificate", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending the tax certificate",
    });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByDonor,
  sendTaxCertificate,
};