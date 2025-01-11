const mongoose = require('mongoose');


//! 1. our impact => title, icon, stats_number
const impactSchema = new mongoose.Schema({
  title: { type: 'string ', required: true },
  icons: [{ type: String }],
  stat_number: { type: Number, required: true }
})
const ImpactModel = mongoose.model("ImpactModel", impactSchema)


//! 2. our services => title, description(short description, long description), icon
const servicesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  icons: { type: String }
})
const Services = new mongoose.model("Services", servicesSchema)

// our team => profileName, status, social links = [{}, {}]
const teamSchema = new mongoose.Schema({
  profileName: { type: String, required: true },
  status: { type: String, required: true },
  social_links: { type: String, required: true }
})
const Team = new mongoose.model("Team", teamSchema)


// Supported by => logo
const supportedBy = new mongoose.Schema({
  logo: { type: String, required: true },
  label: { type: String, required: true }
})
const SuppportedBy = new mongoose.model("Suppported", supportedBy)


module.exports = { ImpactModel, Services, Team, SuppportedBy }