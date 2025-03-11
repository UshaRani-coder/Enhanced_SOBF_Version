const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: "587",
  auth: {
    user: "ry648133@gmail.com",
    pass: "mawb relb avot cukn"
  }
})


module.exports = transporter