const mongoose = require('mongoose');

const upcomingEventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, default: "" },
  date: { type: Date, required: true },
  location: { type: String },

  startTime: { type: String, required: true },
  endTime: { type: String, required: true },

  registeredUsers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'EventUser' }
  ]
}, {
  timestamps: true
});

const upcomingEvents = mongoose.model('upcomingEvents', upcomingEventsSchema);

module.exports = upcomingEvents;