const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    logo: mediaSchema,

    title: { type: String, required: true },
    small_description: { type: String, required: true },
    description: { type: String, required: true },

    images: {
      type: [mediaSchema],
      default: [],
    },

    color: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);