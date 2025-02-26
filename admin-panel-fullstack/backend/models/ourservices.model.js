const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    logo: { type: String, required: true },
    title: { type: String, required: true },
    small_description: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
