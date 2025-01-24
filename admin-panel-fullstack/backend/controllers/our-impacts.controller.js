const { default: mongoose } = require("mongoose");
const OurImpactsModel = require("../models/our-impacts.model");

// Helper function to validate string fields
const isValidString = (value) => typeof value === "string" && value.trim().length > 0;

// Helper function to validate numeric fields
const isValidNumber = (value) => typeof value === "number" && value >= 0;

//! Create a new "Our Impacts" post
const createOurImpacts = async (req, res) => {
  try {
    const { total_services, description } = req.body;

    // Validate total_services
    if (!total_services || !isValidNumber(Number(total_services))) {
      return res.status(400).json({ error: "Invalid 'total_services'. It must be a non-negative number." });
    }

    // Validate description
    if (!description || !isValidString(description)) {
      return res.status(400).json({ error: "Invalid 'description'. It must be a non-empty string." });
    }

    // Validate image (if applicable)
    const image = req.image;
    if (!image || !isValidString(image)) {
      return res.status(400).json({ error: "Invalid 'image'. It must be a valid string (file path or URL)." });
    }

    const post = new OurImpactsModel({ total_services, description, image });
    await post.save();

    res.status(201).json({
      success: true,
      message: "Our impacts post has been created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Our Impacts post",
      error: error.message,
    });
  }
};

//! Get all "Our Impacts" posts
const getOurImpacts = async (req, res) => {
  try {
    const posts = await OurImpactsModel.find({});
    res.status(200).json({
      success: true,
      message: "Successfully fetched all the data of Our Impacts from backend.",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching Our Impacts data from the backend.",
      error: error.message,
    });
  }
};

//! Update an "Our Impacts" post based on ID
const updateOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    // Validate total_services (if provided)
    if (updates.total_services && !isValidNumber(Number(updates.total_services))) {
      return res.status(400).json({ error: "Invalid 'total_services'. It must be a non-negative number." });
    }

    // Validate image (if provided)
    const image = req.image;
    if (image && !isValidString(image)) {
      return res.status(400).json({ error: "Invalid 'image'. It must be a valid string (file path or URL)." });
    }
    if (image) updates.image = image;

    const updatedPost = await OurImpactsModel.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Our Impacts post updated successfully",
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating Our Impacts post",
      error: error.message,
    });
  }
};

//! Delete an "Our Impacts" post based on ID
const deleteOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await OurImpactsModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Our Impacts post has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting Our Impacts post",
      error: error.message,
    });
  }
};

module.exports = { createOurImpacts, getOurImpacts, updateOurImpacts, deleteOurImpacts };
