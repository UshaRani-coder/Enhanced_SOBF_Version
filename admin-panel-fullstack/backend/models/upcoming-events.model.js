const mongoose = require('mongoose');

const upcomingEventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  small_description: { type: String, required: true },
  description: { type: String },
  images: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
  location: { type: String },
},
  {
    timestamps: true
  }
);

const upcomingEvents = mongoose.model('upcomingEvents', upcomingEventsSchema);

module.exports = upcomingEvents;
