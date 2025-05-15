const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: "587",
  auth: {
    user: "soulofbraj@gmail.com",
    pass: "slxh rtyy vzgq read"
  }
})


module.exports = transporter