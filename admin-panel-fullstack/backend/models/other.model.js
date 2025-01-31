const mongoose = require('mongoose');

// ! Featured Videos
const featuredVideoSchema = mongoose.Schema({
  URL: { type: String, required: true },
});
const FeaturedVideomodel = mongoose.model(
  'FeaturedVideomodel',
  featuredVideoSchema,
);

//! Adding new legal documents

const legalDocSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  fileName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const LegalDoc = mongoose.model('LegalDoc', legalDocSchema);

module.exports = { FeaturedVideomodel, LegalDoc };
