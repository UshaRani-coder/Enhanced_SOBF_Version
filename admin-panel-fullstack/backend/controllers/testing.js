const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Temporary for debugging
  },
});

console.log("Test email sent successfully:");

async function sendTestEmail(req,res) {
  try {
    const info = await transporter.sendMail({
      from: "ry648133@gmail.com",
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
  }
}

module.exports = sendTestEmail