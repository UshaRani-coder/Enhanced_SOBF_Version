// module.exports = transporter

const nodemailer = require('nodemailer');
console.log("SMTP USER:", process.env.SMTP_USER);
console.log("SMTP PASS LENGTH:", process.env.SMTP_PASS?.length);
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  //remove this for production
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;
