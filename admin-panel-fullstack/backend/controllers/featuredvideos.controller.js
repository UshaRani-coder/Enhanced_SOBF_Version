const { default: mongoose } = require("mongoose");
const { FeaturedVideomodel } = require("../models/other.model");

//? Create a new featured video
const createFeaturedVideo = async (req, res) => {
  try {
    const { URL } = req.body;
    if (!URL) return res.status(400).json({ success: false, message: "Please enter URL." });

    // Create a new featured video document
    const post = new FeaturedVideomodel({ URL });
    await post.save();

    res.status(201).json({
      success: true,
      message: "Featured video post has been created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Featured video post"
    });
  }
};

//? Update a featured video based on its ID
const updateFeaturedVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Validation: Check if URL is provided
    if (!updates.URL) return res.status(400).json({ success: false, message: "Please provide a URL." });

    // Find and update the video post
    const updatedPost = await FeaturedVideomodel.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Featured video post updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating Featured video post"
    });
  }
};

//? Get all featured videos
const getFeaturedVideo = async (req, res) => {
  try {
    // Fetch all featured videos from the database
    const posts = await FeaturedVideomodel.find({});
    res.status(200).json({ success: true, message: "Successfully fetched all featured videos.", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching featured videos." });
  }
}

//? Delete a featured video based on its ID
const deleteFeaturedVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation: Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    // Find and delete the video post
    const post = await FeaturedVideomodel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, message: 'Featured video post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting the featured video post" });
  }
}



module.exports = {
  createFeaturedVideo,
  getFeaturedVideo,
  updateFeaturedVideo,
  deleteFeaturedVideo
}
