const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
