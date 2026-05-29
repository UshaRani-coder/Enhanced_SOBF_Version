const { default: mongoose } = require("mongoose");
const bulletineModal = require("../models/newspost.model");
const logger = require("../logger");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// ===============================
// CREATE NEWS BULLETIN
// ===============================
const createNewsBulletine = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters",
      });
    }

    if (!description || description.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 5 characters",
      });
    }

    const images = req.files?.images || [];
    let imageArr = [];

    for (let file of images) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "sobf_uploads/news-bulletine",
        resource_type: "image",
      });

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      imageArr.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const post = new bulletineModal({
      title,
      description,
      date,
      images: imageArr,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error creating post",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL POSTS
// ===============================
const getNewsBulletine = async (req, res) => {
  try {
    const posts = await bulletineModal.find({});

    res.status(200).json({
      success: true,
      message: "Fetched successfully",
      posts,
    });
  } catch (error) {
    logger.error("FETCH ERROR");
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
    });
  }
};

// ===============================
// GET BY ID
// ===============================
const getNewsBulletineById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const post = await bulletineModal.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetch error",
    });
  }
};

// ===============================
// UPDATE POST 
// ===============================
const updateNewsBulletine = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPost = await bulletineModal.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const { title, description, date } = req.body;

    let imageArr = existingPost.images || [];
    const images = req.files?.images || [];

    // ===============================
    // IF NEW IMAGES UPLOADED
    // ===============================
    if (images.length > 0) {
      // delete old images from cloudinary safely
      for (let img of imageArr) {
        if (typeof img === "object" && img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

      imageArr = [];

      // upload new images
      for (let file of images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "sobf_uploads/news-bulletine",
          resource_type: "image",
        });

        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }

        imageArr.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const updatedPost = await bulletineModal.findByIdAndUpdate(
      id,
      {
        title: title || existingPost.title,
        description: description || existingPost.description,
        date: date || existingPost.date,
        images: imageArr,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error updating post",
      error: error.message,
    });
  }
};

// ===============================
// DELETE POST 
// ===============================
const deleteNewsBulletine = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await bulletineModal.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // safely delete cloudinary images
    if (Array.isArray(post.images)) {
      for (let img of post.images) {
        if (typeof img === "object" && img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting post",
      error: error.message,
    });
  }
};

module.exports = {
  createNewsBulletine,
  getNewsBulletine,
  getNewsBulletineById,
  updateNewsBulletine,
  deleteNewsBulletine,
};
