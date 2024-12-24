const { default: mongoose } = require("mongoose");
const PostModel = require("../models/post.model");



// CREATE 
const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'All fields including files are required' });
    }
    const images = req.images
    const videos = req.videos
    const post = new PostModel({ title, description, images, videos });
    await post.save();
    res.status(201).json({ success: true, message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while creating post", error: error.message });
  }
};



// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({})
    res.status(200).json({ success: true,message:"successfully fetched all the data from backend .", posts});
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching  post from backend side .", error: error.message });
  }
};


//  UPDATE  POST BASED ON ID 
const updatePost = async (req, res) => {
  try { 
    const { id } = req.params;
    const updates = { ...req.body };
    if (req.files === undefined || !req.files) {
      return res.status(404).json({ error: "file not found " });
    }
    const images = req.images
    const videos = req.videos
    if (images) updates.images = images
    if (videos) updates.videos = videos
    const updatedPost = await PostModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating post", error: error.message });
  }
};




// DELETE POST BASED ON ID
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ success: true , message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting post", error: error.message });
  }
};


module.exports = { deletePost, updatePost, getPosts, createPost }