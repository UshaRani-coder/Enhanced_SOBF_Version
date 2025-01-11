const { default: mongoose } = require("mongoose");
const HeroBannerModel = require("../models/hero-banner.model");

//!  Create a new hero banner
const createHeroBanner = async (req, res) => {
  try {
    const { quotes } = req.body;
    if (!quotes) {
      return res.status(400).json({
        error: 'All fields including the quotes are required',
      });
    }
    const image = req.image;
    const post = new HeroBannerModel({ quotes, image });
    await post.save();
    res.status(201).json({
      success: true,
      message: 'HeroBanner post has been created successfully',
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

//!  get all hero banner
const getHeroBanner = async (req, res) => {
  try {
    const posts = await HeroBannerModel.find({})
    res.status(200).json({ success: true, message: "successfully fetched all the data from backend .", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching  post from backend side .", error: error.message });
  }
}

//!  update hero banner based  on ID 
const updateHeroBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    const image = req.image;
    if (image) updates.image = image
    const updatedPost = await HeroBannerModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Hero Banner post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating Hero Banner post", error: error.message });
  }
}


//!  delete hero banner based  on ID 
const deleteHeroBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await HeroBannerModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting post", error: error.message });
  }
}


module.exports = { createHeroBanner, getHeroBanner, updateHeroBanner, deleteHeroBanner }