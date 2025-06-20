const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: "587",
  auth: {
    user: "soulofbraj@gmail.com",
    pass: "gkvg zzpp ksnk zsiv"
  }
})


module.exports = transporter