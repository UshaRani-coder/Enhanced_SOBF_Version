const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    registeredEvents: [
      {
        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'upcomingEvents',
        },
        registeredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const EventUser = mongoose.model('EventUser', userSchema);

module.exports = EventUser;
