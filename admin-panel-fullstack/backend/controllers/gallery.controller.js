const logger = require('../logger');
const GalleryModel = require('../models/gallery.model');

// Create gallery image
const createGalleryController = async (req, res) => {
  try {
    const { tag } = req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    // This is Cloudinary URL
    const imageUrl = req.file.path;

    const post = new GalleryModel({
      image: imageUrl,
      tag,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Gallery post created successfully',
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

// Fetch all gallery images from the database
const getAllGalleryImagesController = async (req, res) => {
  try {
    const posts = await GalleryModel.find({});

    res.status(200).json({
      success: true,
      message: 'Gallery posts retrieved successfully',
      posts,
    });
  } catch (error) {
    logger.error('Something went wrong while retrieving gallery posts.');
    res.status(500).json({
      success: false,
      message: 'Something went wrong while retrieving gallery posts',
    });
  }
};
// Update Gallery post validation
const updateGalleryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;

    const existingPost = await GalleryModel.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Gallery post not found',
      });
    }

    const updates = {
      tag: tag || existingPost.tag,
      image: req.file ? req.file.path : existingPost.image,
    };

    const updatedPost = await GalleryModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'Gallery post updated successfully',
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating',
    });
  }
};

// Delete Gallery post validation
const deleteGalleryController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await GalleryModel.findByIdAndDelete(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    logger.error('Something went wrong while deleting the Gallery post.');
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the Gallery post',
    });
  }
};

module.exports = {
  createGalleryController,
  getAllGalleryImagesController,
  updateGalleryController,
  deleteGalleryController,
};
