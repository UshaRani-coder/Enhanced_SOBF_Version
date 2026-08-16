const nodemailer = require('nodemailer');
const { logger } = require('../middleware/nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '587',
  auth: {
    user: 'soulofbraj@gmail.com',
    pass: 'mawb relb avot cukn',
  },
});

async function sendTestEmail(req, res) {
  try {
    const info = await transporter.sendMail({
      from: 'soulofbraj@gmail.com',
      to: 'yranjana757@gmail.com',
      subject: 'SMTP Test from Ubuntu VPS',
      text: 'Hello, this is a test email from your Ubuntu server!',
    });

    return res.status(200).json({ message: 'sent successfully email ' });
  } catch (error) {
    console.error('SMTP Error:', error);
    logger.error('Something went wrong in testing.js', error);
    return res.status(500).json({ message: error });
  }
}

module.exports = sendTestEmail;
