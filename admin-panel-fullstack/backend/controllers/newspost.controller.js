const { default: mongoose } = require("mongoose");
const bulletineModal = require("../models/newspost.model");


// CREATE 
const createNewsBulletine = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'All fields including files are required' });
    }
    const images = req.images
    const videos = req.videos
    const post = new bulletineModal({ title, description, images, videos });
    await post.save();
    res.status(201).json({ success: true, message: 'News/Bulletine created successfully', post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while creating news/bulletine post", error: error.message });
  }
};

// GET ALL POSTS
const getNewsBulletine = async (req, res) => {
  try {
    const posts = await bulletineModal.find({})
    res.status(200).json({ success: true, message: "Successfully fetched all the new/bulletine posts .", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while getting news/bulletine post", error: error.message });
  }
};


//  UPDATE  POST BASED ON ID 
const updateNewsBulletine = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (req.files === undefined || !req.files) {
      return res.status(404).json({ error: "file not found " });
    }
    // if (req.files) {
    const images = req.images
    const videos = req.videos
    if (images) updates.images = images
    if (videos) updates.videos = videos
    // }
    const updatedPost = await bulletineModal.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'News/Bulletine not found' });
    }

    res.status(200).json({ success: true, message: 'News/Bulletine updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating news/bulletine post", error: error.message });
  }
};


// DELETE POST BASED ON ID
const deleteNewsBulletine = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const post = await bulletineModal.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted ' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting news/bulletine post", error: error.message });
  }
};


module.exports = { getNewsBulletine, createNewsBulletine, updateNewsBulletine, deleteNewsBulletine }