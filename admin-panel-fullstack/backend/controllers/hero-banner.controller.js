
const { default: mongoose } = require('mongoose');
const HeroBannerModel = require('../models/hero-banner.model');
const logger = require('../logger');

//! Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//! Get all hero banners
const getHeroBanner = async (req, res) => {
  try {
    const banners = await HeroBannerModel.find({});

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched all the data from backend.',
      banners,
    });
  } catch (error) {
    console.log(error);

    logger.error(
      'Something went wrong while fetching posts from backend.'
    );

    return res.status(500).json({
      success: false,
      message:
        'Something went wrong while fetching posts from backend.',
    });
  }
};

//! Create a new hero banner
const createHeroBanner = async (req, res) => {
  try {
    const { quotes } = req.body;

    // Validate quotes
    if (!quotes || typeof quotes !== 'string' || quotes.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message:
          'Quotes are required and must be at least 5 characters long',
      });
    }

    // Validate image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    // Create hero banner
    const post = new HeroBannerModel({
      quotes: quotes.trim(),
      image: req.file.path, 
    });

    await post.save();

    return res.status(201).json({
      success: true,
      message: 'HeroBanner post has been created successfully',
      post,
    });
  } catch (error) {
    console.log(error);

    logger.error(
      'Something went wrong while creating hero banner post.'
    );

    return res.status(500).json({
      success: false,
      message:
        'Something went wrong while creating hero banner post',
    });
  }
};

//! Update hero banner based on ID
const updateHeroBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'A valid ID is required',
      });
    }

    // Fetch existing banner
    const existingBanner = await HeroBannerModel.findById(id);

    if (!existingBanner) {
      return res.status(404).json({
        success: false,
        message: 'Hero Banner not found',
      });
    }

    const { quotes } = req.body;

    // Validate quotes if provided
    if (
      quotes &&
      (typeof quotes !== 'string' || quotes.trim().length < 5)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Quotes must be at least 5 characters long',
      });
    }

    // Use Cloudinary image if uploaded
    const image = req.file
      ? req.file.path
      : existingBanner.image;

    // Prepare updates
    const updates = {
      quotes: quotes
        ? quotes.trim()
        : existingBanner.quotes,
      image,
    };

    // Update banner
    const updatedBanner =
      await HeroBannerModel.findByIdAndUpdate(id, updates, {
        new: true,
      });

    return res.status(200).json({
      success: true,
      updatedBanner,
    });
  } catch (error) {
    console.log(error);

    logger.error('Failed to update Hero Banner.');

    return res.status(500).json({
      success: false,
      message: 'Failed to update Hero Banner',
    });
  }
};

//! Delete hero banner based on ID
const deleteHeroBanner = async (req, res) => {
  console.log("DELETE CONTROLLER HIT");
  try {
    const { id } = req.params;

    // Validate Mongo ID
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'A valid ID is required',
      });
    }

    // Delete Hero Banner
    const heroBanner =
      await HeroBannerModel.findByIdAndDelete(id);

    if (!heroBanner) {
      return res.status(404).json({
        success: false,
        message: 'Hero banner not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Hero banner deleted successfully',
    });
  } catch (error) {
    console.log(error);

    logger.error(
      'Something went wrong while deleting hero banner.'
    );

    return res.status(500).json({
      success: false,
      message:
        'Something went wrong while deleting hero banner',
    });
  }
};

module.exports = {
  createHeroBanner,
  getHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
};
