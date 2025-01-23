const { default: mongoose } = require("mongoose");
const PostModel = require("../models/post.model");

// Helper Function: Validate ID format
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE
const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required fields
    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return res.status(400).json({ error: "Title must be a string with at least 3 characters" });
    }

    if (!description || typeof description !== "string" || description.trim().length < 5) {
      return res.status(400).json({ error: "Description must be a string with at least 5 characters" });
    }

    // Validate files
    const images = req.images;
    const videos = req.videos;

    if (!images || !Array.isArray(images) || images.some(img => typeof img !== "string")) {
      return res.status(400).json({ error: "Images must be an array of valid strings" });
    }

    // if (!videos || !Array.isArray(videos) || videos.some(video => typeof video !== "string")) {
    //   return res.status(400).json({ error: "Videos must be an array of valid strings" });
    // }

    // Save the post
    const post = new PostModel({ title, description, images, videos });
    await post.save();
    res.status(201).json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while creating post", error: error.message });
  }
};

// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({ success: true, message: "Successfully fetched all posts", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching posts", error: error.message });
  }
};

// UPDATE POST BASED ON ID
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const updates = { ...req.body };
    const { title, description } = updates;

    // Validate fields
    if (title && (typeof title !== "string" || title.trim().length < 3)) {
      return res.status(400).json({ error: "Title must be a string with at least 3 characters" });
    }

    if (description && (typeof description !== "string" || description.trim().length < 5)) {
      return res.status(400).json({ error: "Description must be a string with at least 5 characters" });
    }

    // Validate files
    const images = req.images;
    const videos = req.videos;

    if (images && (!Array.isArray(images) || images.some(img => typeof img !== "string"))) {
      return res.status(400).json({ error: "Images must be an array of valid strings" });
    }


    if (images) updates.images = images;
    if (videos) updates.videos = videos;

    // Update the post
    const updatedPost = await PostModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Post updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating post", error: error.message });
  }
};

// DELETE POST BASED ON ID
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Delete the post
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting post", error: error.message });
  }
};

module.exports = { deletePost, updatePost, getPosts, createPost };
