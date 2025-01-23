const { default: mongoose } = require("mongoose");
const HeroBannerModel = require("../models/hero-banner.model");

//! Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//! Create a new hero banner
const createHeroBanner = async (req, res) => {
  try {
    const { quotes } = req.body;

    // Validate quotes
    if (!quotes || typeof quotes !== "string" || quotes.trim().length < 5) {
      return res.status(400).json({
        error: "Quotes are required and must be at least 5 characters long",
      });
    }

    // Validate image
    const image = req.image;
    if (!image || typeof image !== "string" || !image.startsWith("http")) {
      return res.status(400).json({
        error: "A valid image URL is required",
      });
    }

    // Create the hero banner
    const post = new HeroBannerModel({ quotes: quotes.trim(), image });
    await post.save();

    res.status(201).json({
      success: true,
      message: "HeroBanner post has been created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating hero banner post",
      error: error.message,
    });
  }
};

//! Get all hero banners
const getHeroBanner = async (req, res) => {
  try {
    const posts = await HeroBannerModel.find({});
    res.status(200).json({
      success: true,
      message: "Successfully fetched all the data from backend.",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching posts from backend.",
      error: error.message,
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
        error: "A valid ID is required",
      });
    }

    const updates = { ...req.body };

    // Validate quotes if present
    if (updates.quotes && (typeof updates.quotes !== "string" || updates.quotes.trim().length < 5)) {
      return res.status(400).json({
        error: "Quotes must be at least 5 characters long",
      });
    }

    // Validate image if present
    const image = req.image;
    if (image && (!image.startsWith("http") || typeof image !== "string")) {
      return res.status(400).json({
        error: "A valid image URL is required",
      });
    }

    if (image) updates.image = image;

    // Update the hero banner
    const updatedPost = await HeroBannerModel.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPost) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero Banner post updated successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating Hero Banner post",
      error: error.message,
    });
  }
};

//! Delete hero banner based on ID
const deleteHeroBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "A valid ID is required",
      });
    }

    // Delete the hero banner
    const post = await HeroBannerModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createHeroBanner,
  getHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
};
