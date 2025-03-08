const mongoose = require("mongoose");
const logger = require("../logger");
const { isValidObjectId } = require("mongoose");
const upcomingEvents = require("../models/upcoming-events.model");
const EventUser = require("../models/event-user.controller");
const transporter = require("../middleware/nodemailer");




const registerUserForEvent = async (req, res) => {
  try {
    let { userId, username, email } = req.body;
    const { eventId } = req.params;
    // Validate event ID
    if (!isValidObjectId(eventId)) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }
    let user;
    // Check if userId exists
    if (userId && isValidObjectId(userId)) {
      user = await EventUser.findById(userId);

      // If userId exists but details don't match, return an error
      if (user && (user.username !== username || user.email !== email)) {
        return res.status(400).json({
          success: false,
          message: "User ID exists but provided username or email does not match",
        });
      }
    }

    // If user does not exist, check if the email is already registered
    if (!user) {
      if (!username || !email) {
        return res.status(400).json({ success: false, message: "New user must provide username and email" });
      }

      // Check if email already exists
      const existingUser = await EventUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "This email is already registered" });
      }

      // Create a new user
      user = new EventUser({ username, email, registeredEvents: [] });
      await user.save();
      userId = user._id; // Assign newly created user ID
    }

    // Find the event
    const event = await upcomingEvents.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if the user is already registered for this event
    if (event.registeredUsers.includes(userId)) {
      return res.status(400).json({ success: false, message: "User already registered for this event" });
    }

    // Register the user
    event.registeredUsers.push(userId);
    await event.save();

    // Also add the event to the user's registeredEvents list
    if (!user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
      await user.save();
    }

    // Populate registered users for response
    const updatedEvent = await upcomingEvents.findById(eventId).populate("registeredUsers", "username email");

    const eventDate = new Date(event.date);

    // Format Date & Time in Local Timezone
    const formattedDate = eventDate.toLocaleString("en-US", {
      weekday: "long",  // "Monday"
      year: "numeric",  // "2025"
      month: "long",    // "March"
      day: "numeric",   // "15"
      hour: "2-digit",  // "08"
      minute: "2-digit", // "30"
      hour12: true,     // AM/PM format
      timeZoneName: "short", // Show timezone abbreviation
    });

    // Email content
    const mailOptions = {
      from: "ry648133@gmail.com",
      to: email,
      subject: `🎉 Welcome to ${event.title} - Get Ready!`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 10px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    
    <!-- Header Banner -->
    <div style="text-align: center;">
      <img src="https://cdn.shopify.com/s/files/1/0679/2560/6720/files/The_Protector_and_the_Protected_1024x1024.jpg?v=1724419317" alt="Event Banner"
        style="width: 100%; max-height: 200px; object-fit: cover; border-top-left-radius: 10px; border-top-right-radius: 10px;">
    </div>

    <!-- Welcome Section -->
    <div style="padding: 20px; text-align: center;">
      <h1 style="color: #4CAF50; font-size: 26px; margin-bottom: 5px;">Welcome, ${username}! 🎉</h1>
      <p style="font-size: 16px; color: #555;">You're successfully registered for:</p>
      <h2 style="color: #333; font-size: 22px;">${event?.title}</h2>
      <p style="font-size: 16px; color: #777;">We can't wait to see you there! 🎊</p>
    </div>

    <!-- Animated GIF (Optional) -->
    <div style="text-align: center; margin: 10px 0;">
      <img src="https://media.giphy.com/media/l0HlG3cK7aRe4NUPe/giphy.gif" 
        alt="Excited for Event" 
        style="width: 100px; border-radius: 10px;">
    </div>

    <!-- Event Details Section -->
    <div style="padding: 15px 25px; text-align: center;">
      <p style="font-size: 16px; color: #444;"><strong>Date & Time:</strong> ${formattedDate}</p>
      <p style="font-size: 16px; color: #444;"><strong>Location:</strong> ${event.location}</p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 20px 0;">
      <a href="https://sobf.in/" target="_blank" rel="noopener noreferrer"
        style="text-decoration: none; background: #4CAF50; color: white; padding: 15px 30px; font-size: 18px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: 0.3s;">
        🔍 View Event Details
      </a>
    </div>

    <!-- Footer -->
    <div style="background: #f8f8f8; padding: 15px; text-align: center; font-size: 14px; color: #555; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
      <p>Need help? <a href="mailto:support@yourevent.com" style="color: #4CAF50; text-decoration: none;">Contact Support</a></p>
      <p>© 2025 Event Team | All rights reserved.</p>
    </div>
  </div>
  `,
    };


    // Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "User successfully registered for the event",
      event: updatedEvent,
    });
  } catch (error) {
    logger.error("Error registering user for the event", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while registering for the event",
    });
  }
};



const getUsersWithRegisteredEvents = async (req, res) => {
  try {
    // Find all users and populate their registered events with full details
    const users = await EventUser.find().populate({
      path: "registeredEvents",
      model: "upcomingEvents",
    });
    // const users = await EventUser.find().populate({ path:"registeredUsers"})
    res.status(200).json({
      success: true,
      message: "Users with their registered events retrieved successfully",
      users,
    });
  } catch (error) {
    logger.error("Error fetching users with registered events", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching users with registered events",
    });
  }
};

const sendingEmailToSelectedUsers = async (req ,res) => {
  const { emails, subject, message } = req.body;
  console.log("req.body", req.body);
  
  if (!emails || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    for (const email of emails) {
      await transporter.sendMail({
        from: "ry648133@gmail.com", // Sender address
        to: email, // Recipient address
        subject: subject, // Email subject
        text: message, // Email body (plain text)
      });
    }
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
}




module.exports = {
  registerUserForEvent,
  getUsersWithRegisteredEvents,
  sendingEmailToSelectedUsers
};
