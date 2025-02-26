const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    tag: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const GalleryModel = new mongoose.model('GalleryModel', gallerySchema);

module.exports = GalleryModel;
