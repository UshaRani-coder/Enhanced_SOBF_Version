const { default: mongoose } = require("mongoose");
const OurImpactsModel = require("../models/our-impacts.model");

//!  Create a new hero banner
const createOurImpacts = async (req, res) => {
  try {
    const { total_services, description } = req.body;
    if (!(total_services || description)) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }
    const image = req.image;
    const post = new OurImpactsModel({ total_services, description, image });
    await post.save();
    res.status(201).json({
      success: true,
      message: 'Our impacts post has been created successfully',
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Our impacts  post",
      error: error.message,
    });
  }
};

//!  get all hero banner
const getOurImpacts = async (req, res) => {
  try {
    const posts = await OurImpactsModel.find({})
    res.status(200).json({ success: true, message: "successfully fetched all the data of our impacts from backend .", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching our impacts data from backend side .", error: error.message });
  }
}

//!  update hero banner based  on ID 
const updateOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    const image = req.image;
    if (image) updates.image = image
    const updatedPost = await OurImpactsModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: ' our impacts  post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating our impacts post", error: error.message });
  }
}


//!  delete hero banner based  on ID 
const deleteOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    const post = await OurImpactsModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Our impacts post has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting our impacts  post", error: error.message });
  }
}


module.exports = { createOurImpacts, getOurImpacts, updateOurImpacts, deleteOurImpacts }