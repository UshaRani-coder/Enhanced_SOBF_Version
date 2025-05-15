const nodemailer = require("nodemailer");
const { logger } = require("../middleware/nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  auth: {
    user: "soulofbraj@gmail.com",
    pass: "mawb relb avot cukn"
  },
  tls: {
    rejectUnauthorized: false, // Temporary for debugging
  },
});

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: process.env.SMTP_PORT == 465, // Auto-detect
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });


console.log("Test email sent successfully:");

async function sendTestEmail(req,res) {
  try {
    const info = await transporter.sendMail({
      from: "soulofbraj@gmail.com",
      to: "yranjana757@gmail.com",
      subject: "SMTP Test from Ubuntu VPS",
      text: "Hello, this is a test email from your Ubuntu server!",
    });

    console.log("Test email sent successfully:", info.messageId);
    console.log("🚀 Debugging SMTP Configuration:");
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);

    return res.status(200).json({message:"sent successfully email "})
  } catch (error) {
    console.error("SMTP Error:", error);
    logger.error("Something went wrong in testing.js" , error)
    return res.status(500).json({ message: error })
  }
}

module.exports = sendTestEmail