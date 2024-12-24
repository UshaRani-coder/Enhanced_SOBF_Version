const mongoose = require('mongoose');

const heroBannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  quotes: { type: String, required: true }
});

const HeroBannerModel = new mongoose.model("HeroBannerModel" , heroBannerSchema);

module.exports = HeroBannerModel;