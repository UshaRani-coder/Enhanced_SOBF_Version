const { default: mongoose } = require("mongoose");
const HeroBannerModel = require("../models/hero-banner.model");

//! Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);



//! Get all hero banners
const getHeroBanner = async (req, res) => {
  try {
    const banners = await HeroBannerModel.find({});
    if (banners.length > 0) {
      for (let index = 0; index < banners.length; index++) {
        const banner = banners[index];
        banner.image = process.env.BASE_URL + "/uploads/hero-banner/" + banner.image;
      }
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched all the data from backend.",
      banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching posts from backend.",
      error: error.message,
    });
  }
};




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
    if (req.file.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Image is required '
      });
    }
    const filename = req.file.filename;

    // Create the hero banner
    const post = new HeroBannerModel({ quotes: quotes.trim(), image: filename || "" });
    await post.save();
    post.image = process.env.BASE_URL + "/uploads/hero-banner/" + post.image;
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

//! Update hero banner based on ID
const updateHeroBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the existing hero banner
    const existingBanner = await HeroBannerModel.findById(id);
    if (!existingBanner) {
      return res.status(404).json({ success: false, message: "Hero Banner not found" });
    }

    // Prepare updates from request body
    const { quotes } = req.body;

    // Validate quotes if provided
    if (quotes && (typeof quotes !== "string" || quotes.trim().length < 5)) {
      return res.status(400).json({
        success: false,
        message: "Quotes must be at least 5 characters long",
      });
    }

    // Check if a new image is provided; otherwise, keep the existing one
    const image = req.file ? req.file.filename : existingBanner.image;

    // Prepare the updated fields
    const updates = {
      quotes: quotes ? quotes.trim() : existingBanner.quotes,
      image,
    };

    // Update the hero banner
    const updatedBanner = await HeroBannerModel.findByIdAndUpdate(id, updates, { new: true });

    // Append the full image URL
    updatedBanner.image = process.env.BASE_URL + "/uploads/hero-banner/" + updatedBanner.image;

    return res.status(200).json({ success: true, updatedBanner });
  } catch (error) {
    console.log("Error while updating Hero Banner: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update Hero Banner",
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
