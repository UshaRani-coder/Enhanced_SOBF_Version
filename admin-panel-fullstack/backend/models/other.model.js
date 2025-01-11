const mongoose = require("mongoose")

// ! Featured Videos
const featuredVideoSchema = mongoose.Schema({
  URL: { type: String, required: true }
})
const FeaturedVideomodel = mongoose.model("FeaturedVideomodel", featuredVideoSchema)


//! Adding new legal documents
const legelDocSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
})
const LegalDoc = mongoose.model("LegalDoc", legelDocSchema)





module.exports = { FeaturedVideomodel, LegalDoc }