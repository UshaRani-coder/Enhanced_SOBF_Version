const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  videos: [{ type: String }],
  date: { type: Date, default: Date.now },
});

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
