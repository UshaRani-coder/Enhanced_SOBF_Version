const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  linkedIn: { type: String, required: false },
  instagram: { type: String, required: false },
  image: { type: String, required: false }
});

const Team = mongoose.model('TeamMember', teamMemberSchema);
module.exports = Team