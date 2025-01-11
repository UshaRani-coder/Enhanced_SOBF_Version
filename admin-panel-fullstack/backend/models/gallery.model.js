const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  image: { type: String, required: true }
});

const GalleryModel = new mongoose.model("GalleryModel", gallerySchema);

module.exports = GalleryModel;