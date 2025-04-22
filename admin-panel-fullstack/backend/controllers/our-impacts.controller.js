const { default: mongoose } = require('mongoose');
const OurImpactsModel = require('../models/our-impacts.model');
const logger = require('../logger');

// Helper function to validate string fields
const isValidString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

// Helper function to validate numeric fields
const isValidNumber = (value) =>
  typeof value === 'number' && value >= 0 && value <= 100000;

//! Get all "Our Impacts" posts
const getOurImpacts = async (req, res) => {
  try {
    const posts = await OurImpactsModel.find({});
    if (posts.length > 0) {
      for (let index = 0; index < posts.length; index++) {
        const post = posts[index];
        // post.image = "https://backend.sobf.in" + '/uploads/our-impacts/' + post.image;
        post.image = "http://localhost:5000" + '/uploads/our-impacts/' + post.image;
      }
    }
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all the data of Our Impacts from backend.',
      posts,
    });
  } catch (error) {
    logger.error("Something went wrong while fetching Our Impacts data from the backend.")
    res.status(500).json({
      success: false,
      message:
        'Something went wrong while fetching Our Impacts data from the backend.',
    });
  }
};

//! Create a new "Our Impacts" post
const createOurImpacts = async (req, res) => {
  try {
    const { total_services, description } = req.body;
    // Validate total_services
    if (!total_services) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid 'total_services' is required",
        });
    }
    // Validate description
    if (!description || !isValidString(description)) {
      return res.status(400).json({
        success: false,
        message: "Invalid 'description'. It must be a non-empty string.",
      });
    }

    // Validate image (if applicable)
    if (req?.file?.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Image is required ',
      });
    }
    const filename = req.file.filename;
    const post = new OurImpactsModel({
      total_services,
      description,
      image: filename || '',
    });
    await post.save();
    // post.image = "https://backend.sobf.in" + '/uploads/our-impacts/' + post.image;
    post.image = "http://localhost:5000" + '/uploads/our-impacts/' + post.image;
    res.status(201).json({
      success: true,
      message: 'Our impacts post has been created successfully',
      post,
    });
  } catch (error) {
    logger.error("Something went wrong while creating Our Impacts post.")
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating Our Impacts post',
    });
  }
};

//! Update an "Our Impacts" post based on ID
const updateOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the existing "Our Impacts" post
    const existingOurImpacts = await OurImpactsModel.findById(id);
    if (!existingOurImpacts) {
      return res
        .status(404)
        .json({ success: false, message: 'Our Impacts post not found' });
    }

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid post ID' });
    }
    const { total_services, description } = req.body;
    const image = req.file ? req.file.filename : existingOurImpacts.image;
    const updates = {
      total_services: total_services || existingOurImpacts.total_services,
      description: description || existingOurImpacts.description,
      image,
    };

    // Update the "Our Impacts" post
    const updatedPost = await OurImpactsModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    // Append the full image URL
    // updatedPost.image = "https://backend.sobf.in" + '/uploads/our-impacts/' + updatedPost.image;
    updatedPost.image = "http://localhost:5000" + '/uploads/our-impacts/' + updatedPost.image;
    return res.status(200).json({
      success: true,
      message: 'Our Impacts post updated successfully',
      updatedPost,
    });
  } catch (error) {
    logger.error("Failed to update Our Impacts post.")
    return res.status(500).json({
      success: false,
      message: 'Failed to update Our Impacts post',
    });
  }
};

//! Delete an "Our Impacts" post based on ID
const deleteOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid post ID' });
    }
    const post = await OurImpactsModel.findByIdAndDelete(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Our Impacts post has been deleted successfully',
    });
  } catch (error) {
    logger.error("Something went wrong while deleting Our Impacts post.")
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting Our Impacts post',
    });
  }
};

module.exports = {
  createOurImpacts,
  getOurImpacts,
  updateOurImpacts,
  deleteOurImpacts,
};
