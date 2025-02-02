const mongoose = require('mongoose');

const ourImpactsSchema = new mongoose.Schema({
  image: { type: String, required: true },
  total_services: { type: String, required: true },
  description: { type: String, required: true },
},
  {
    timestamps: true
  }
);

const OurImpactsModel = new mongoose.model('OurImpactsModel', ourImpactsSchema);

module.exports = OurImpactsModel;
