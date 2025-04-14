const mongoose = require('mongoose');

const upcomingEventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, default: "" },
  date: { type: Date, default: Date.now },
  location: { type: String },
  status: {
    type: String,
    enum: ['upcoming', 'happening', 'completed'],
    default: 'upcoming'
  },
  time: { type: String },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventUser' }]
}, {
  timestamps: true
});

const upcomingEvents = mongoose.model('upcomingEvents', upcomingEventsSchema);

module.exports = upcomingEvents;