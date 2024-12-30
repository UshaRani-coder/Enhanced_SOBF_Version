const mongoose = require('mongoose');

const ourImpactsSchema = new mongoose.Schema({
  image: { type: String, required: true },
  total_services: { type: Number, required: true },
  description: { type: String, required: true }
});

const OurImpactsModel = new mongoose.model("OurImpactsModel", ourImpactsSchema);

module.exports = OurImpactsModel;