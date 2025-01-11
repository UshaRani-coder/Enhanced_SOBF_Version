const mongoose = require('mongoose');

const bulletineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  videos: [{ type: String }],
  date: { type: Date, default: Date.now },
});

const Bulletine = mongoose.model('Bulletine', bulletineSchema);
module.exports = Bulletine;