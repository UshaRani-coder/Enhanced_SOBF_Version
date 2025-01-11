const GalleryModel = require("../models/gallery.model");

//!  Create a new hero banner
const createGallery = async (req, res) => {
  try {
    const image = req.image;
    const post = new GalleryModel({  image });
    await post.save();
    res.status(201).json({
      success: true,
      message: 'gallery post has been created successfully',
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

//!  get all hero banner
const getGallery = async (req, res) => {
  try {
    const posts = await GalleryModel.find({})
    res.status(200).json({ success: true, message: "successfully fetched all the data from backend .", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching Gallery post from backend side .", error: error.message });
  }
}

//!  update hero banner based  on ID 
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    const image = req.image;
    if (image) updates.image = image
    const updatedPost = await GalleryModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Gallery post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating Gallery post", error: error.message });
  }
}


//!  delete hero banner based  on ID 
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await GalleryModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while Gallery post", error: error.message });
  }
}


module.exports = { createGallery, getGallery, updateGallery, deleteGallery }