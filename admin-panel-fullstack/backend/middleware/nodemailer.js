// module.exports = transporter

const nodemailer = require('nodemailer');

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS length:", process.env.SMTP_PASS?.length);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
module.exports = transporter;
