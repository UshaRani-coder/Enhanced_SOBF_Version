const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Store hashed password
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "upcomingEvents" }]
},
  { timestamps: true });

const EventUser = mongoose.model('EventUser', userSchema);

module.exports = EventUser;
