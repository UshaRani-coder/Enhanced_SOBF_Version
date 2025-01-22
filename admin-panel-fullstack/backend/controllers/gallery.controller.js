const GalleryModel = require("../models/gallery.model");

const createGalleryController = async (req, res) => {
  try {
    const { tag } = req.body; 
    const image = req.image;

    // Validate if image is provided
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required to create a gallery post.",
      });
    }

    const post = new GalleryModel({ image, tag });
    await post.save();

    res.status(201).json({
      success: true,
      message: "Gallery post has been created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Gallery post",
      error: error.message,
    });
  }
};






// Fetch all gallery images from the database
const getAllGalleryImagesController = async (req, res) => {
  try {
    const posts = await GalleryModel.find({});

    res.status(200).json({
      success: true,
      message: "Gallery posts retrieved successfully",
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving gallery posts",
      error: error.message
    });
  }
};



// Update Gallery post validation
const updateGalleryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;
    const updates = { ...req.body };
    const image = req.image;

    // If image is present, validate the image
    if (image) updates.image = image;

    const updatedPost = await GalleryModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ success: true, message: 'Gallery post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating Gallery post", error: error.message });
  }
};

// Delete Gallery post validation
const deleteGalleryController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await GalleryModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting the Gallery post", error: error.message });
  }
};

module.exports = { createGalleryController, getAllGalleryImagesController, updateGalleryController, deleteGalleryController };
