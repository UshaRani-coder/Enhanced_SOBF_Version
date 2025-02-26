const logger = require('../logger');
const GalleryModel = require('../models/gallery.model');

const createGalleryController = async (req, res) => {
  try {
    const { tag } = req.body;
    if (req.file.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Image is required ',
      });
    }
    const filename = req.file.filename;
    const post = new GalleryModel({ image: filename || '', tag });
    await post.save();
    post.image = process.env.BASE_URL + '/uploads/gallery/' + post.image;
    res.status(201).json({
      success: true,
      message: 'Gallery post has been created successfully',
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating Gallery post',
    });
  }
};

// Fetch all gallery images from the database
const getAllGalleryImagesController = async (req, res) => {
  try {
    const posts = await GalleryModel.find({});
    if (posts.length > 0) {
      for (let index = 0; index < posts.length; index++) {
        const post = posts[index];
        post.image = process.env.BASE_URL + '/uploads/gallery/' + post.image;
      }
    }
    res.status(200).json({
      success: true,
      message: 'Gallery posts retrieved successfully',
      posts,
    });
  } catch (error) {
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

    // Fetch the existing gallery post
    const existingPost = await GalleryModel.findById(id);
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: 'Gallery post not found' });
    }

    // Prepare the updates from the request body
    const updates = { tag: tag || existingPost.tag };

    // Check if a new image is provided; otherwise, keep the existing one
    const image = req.file ? req.file.filename : existingPost.image;

    // Update the image if a new one is provided
    if (image) {
      updates.image = image;
    }

    // Update the gallery post in the database
    const updatedPost = await GalleryModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: 'Post update failed' });
    }

    // Append the full image URL (like the `updateTeam` controller)
    updatedPost.image =
      process.env.BASE_URL + '/uploads/gallery/' + updatedPost.image;

    res.status(200).json({
      success: true,
      message: 'Gallery post updated successfully',
      updatedPost,
    });
  } catch (error) {
    logger.warning('Error while updating gallery post: ', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating Gallery post',
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
