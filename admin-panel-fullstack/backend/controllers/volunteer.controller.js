const logger = require("../logger");
const transporter = require("../middleware/nodemailer");
const volunteerModel = require("../models/volunteer.model");

// controllers/volunteerController.js
const createVolunteer = async (req, res) => {
  try {
    const newVolunteer = new volunteerModel(req.body);

    // Basic validation
    if (!newVolunteer.email || !newVolunteer.name) {
      return res.status(400).json({
        success: false,
        message: 'Email and name are required fields'
      });
    }
    const savedVolunteer = await newVolunteer.save();
    // Send confirmation email
    await sendVolunteerConfirmationEmail(savedVolunteer);
    res.status(201).json({
      success: true,
      message: 'Thank you for volunteering! We will contact you soon.',
      data: savedVolunteer
    });
  } catch (error) {
    console.error('Error creating volunteer:', error);

    // Handle duplicate email errors if you want unique emails
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered',
        error: 'Duplicate email'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit form. Please try again.',
      error: error.message
    });
  }
};


// Email sending function
async function sendVolunteerConfirmationEmail(volunteer) {
  try {
    const mailOptions = {
      from: "ry648133@gmail.com",
      to: volunteer.email,
      subject: `🎉 Thank You for Volunteering with Us!`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 10px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
  
  <!-- Header Banner -->
  <div style="text-align: center;">
    <img src="https://cdn.shopify.com/s/files/1/0679/2560/6720/files/The_Protector_and_the_Protected_1024x1024.jpg?v=1724419317" alt="Volunteer Banner"
      style="width: 100%; max-height: 200px; object-fit: cover; border-top-left-radius: 10px; border-top-right-radius: 10px;">
  </div>

  <!-- Welcome Section -->
  <div style="padding: 20px; text-align: center;">
    <h1 style="color: #4CAF50; font-size: 26px; margin-bottom: 5px;">Welcome, ${volunteer.name}! 🎉</h1>
    <p style="font-size: 16px; color: #555;">Thank you for signing up as a volunteer!</p>
    <p style="font-size: 16px; color: #777;">We truly appreciate your willingness to contribute to our cause. 🙏</p>
  </div>

  <!-- Animated GIF (Optional) -->
  <div style="text-align: center; margin: 10px 0;">
    <img src="https://media.giphy.com/media/l0HlG3aRe4NUPe/giphy.gif" 
      alt="Thank You" 
      style="width: 100px; border-radius: 10px;">
  </div>

  <!-- Volunteer Details Section -->
  <div style="padding: 15px 25px; text-align: center;">
    <p style="font-size: 16px; color: #444;"><strong>Location:</strong> ${volunteer.city}, ${volunteer.state}</p>
    ${volunteer.occupation ? `<p style="font-size: 16px; color: #444;"><strong>Occupation:</strong> ${volunteer.occupation}</p>` : ''}
  </div>

  <!-- Next Steps -->
  <div style="padding: 15px 25px; background: #f8f9fa; margin: 15px; border-radius: 8px;">
    <h3 style="color: #333; font-size: 18px; text-align: center;">What Happens Next?</h3>
    <ul style="text-align: left; padding-left: 20px;">
      <li>Our team will review your application</li>
      <li>We'll contact you within 3-5 business days</li>
      <li>You'll receive information about upcoming volunteer opportunities</li>
    </ul>
  </div>

  <!-- CTA Button -->
  <div style="text-align: center; margin: 20px 0;">
    <a href="https://sobf.in/" target="_blank" rel="noopener noreferrer"
      style="text-decoration: none; background: #4CAF50; color: white; padding: 15px 30px; font-size: 18px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: 0.3s;">
      🌟 Learn More About Our Work
    </a>
  </div>

  <!-- Footer -->
  <div style="background: #f8f8f8; padding: 15px; text-align: center; font-size: 14px; color: #555; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
    <p>Need help? <a href="mailto:support@sobf.in" style="color: #4CAF50; text-decoration: none;">Contact Our Support Team</a></p>
    <p>© ${new Date().getFullYear()} SOBF Team | All rights reserved.</p>
  </div>
</div>
`
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Confirmation email sent to ${volunteer.email}`);
  } catch (error) {
    logger.error('Error sending volunteer confirmation email:', error);
    throw error;
  }
}

// Get all volunteers
const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await volunteerModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers',
      error: error.message
    });
  }
};

// Get a single volunteer by ID
const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await volunteerModel.findOne({ volunteerId: req?.params?.id });
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    console.error('Error fetching volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteer',
      error: error.message
    });
  }
};


// Delete a volunteer
const deleteVolunteer = async (req, res) => {
  try {
    const deletedVolunteer = await volunteerModel.findOneAndDelete({ volunteerId: req.params.id });
    if (!deletedVolunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Volunteer deleted successfully',
      data: deletedVolunteer
    });
  } catch (error) {
    console.error('Error deleting volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete volunteer',
      error: error.message
    });
  }
};

module.exports = {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  deleteVolunteer
}