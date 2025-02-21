const { default: mongoose } = require('mongoose');
const bulletineModal = require('../models/newspost.model');

//! CREATE
const createNewsBulletine = async (req, res) => {
  try {
    let videosArr = [];
    let imageArr = [];
    const { title, description, date } = req.body;
    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Title must be a string with at least 3 characters',
      });
    }

    if (!description || description.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Description must be a string with at least 5 characters',
      });
    }
    // for images
    const images = req.files.images || [];
    if (images.length > 0) {
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        imageArr.push(image.filename);
      }
    }
    // for videos
    const videos = req.files.videos || [];
    if (videos.length > 0) {
      for (let index = 0; index < videos.length; index++) {
        const video = videos[index];
        videosArr.push(video.filename);
      }
    }
    // Save post to database
    const post = new bulletineModal({
      title,
      description,
      date,
      images: imageArr,
      videos: videosArr,
    });
    await post.save();
    res
      .status(201)
      .json({ success: true, message: 'Post created successfully', post });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Error creating post'
      });
  }
};

//! GET ALL POSTS
const getNewsBulletine = async (req, res) => {
  try {
    const posts = await bulletineModal.find({});
    const baseURL = process.env.BASE_URL || 'http://localhost:5000';
    // const baseURL = process.env.BASE_URL || "https://backend.sobf.in";
    if (posts.length > 0) {
      posts.forEach((post) => {
        // Format images and videos URLs
        if (Array.isArray(post.images)) {
          post.images = post.images.map((image) =>
            image ? `${baseURL}/uploads/news-bulletine/${image}` : image,
          );
        }

        if (Array.isArray(post.videos)) {
          post.videos = post.videos.map((video) =>
            video ? `${baseURL}/uploads/news-bulletine/${video}` : video,
          );
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully fetched all the news/bulletin posts.',
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while getting news/bulletin post'
    });
  }
};

//! GET SPECIFIC POST BY ID
const getNewsBulletineById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    // Find post by ID
    const post = await bulletineModal.findById(id);    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const baseURL = process.env.BASE_URL;
    // Format images and videos URLs
    if (Array.isArray(post.images)) {
      post.images = post.images.map((image) =>
        image ? `${baseURL}/uploads/news-bulletine/${image}` : image
      );
    }

    if (Array.isArray(post.videos)) {
      post.videos = post.videos.map((video) =>
        video ? `${baseURL}/uploads/news-bulletine/${video}` : video
      );
    }
    res.status(200).json({
      success: true,
      message: 'Successfully fetched the news/bulletin post.',
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the news/bulletin post',
    });
  }
};


//!  UPDATE  POST BASED ON ID
const updateNewsBulletine = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the existing post
    const existingPost = await bulletineModal.findById(id);
    if (!existingPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    const { title, description } = req.body;
    // Validate fields
    if (title && (typeof title !== 'string' || title.trim().length < 3)) {
      return res
        .status(400)
        .json({ success: false, message: 'Title must be a string with at least 3 characters' });
    }
    if (
      description &&
      (typeof description !== 'string' || description.trim().length < 5)
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Description must be a string with at least 5 characters',
        });
    }

    // Initialize updated data with existing values
    const updates = {
      title: title || existingPost.title,
      description: description || existingPost.description,
      images: existingPost.images,
      videos: existingPost.videos,
    };

    // Handle updated images if provided
    const images = req.files?.images || [];
    if (images.length > 0) {
      const updatedImages = [];
      for (let index = 0; index < images.length; index++) {
        updatedImages.push(images[index].filename);
      }
      updates.images = updatedImages;
    }

    // Handle updated videos if provided
    const videos = req.files?.videos || [];
    if (videos.length > 0) {
      const updatedVideos = [];
      for (let index = 0; index < videos.length; index++) {
        updatedVideos.push(videos[index].filename);
      }
      updates.videos = updatedVideos;
    }

    // Update the post
    const updatedPost = await bulletineModal.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Bulletine Post not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Bulletine Post updated successfully',
      updatedPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while updating news/bulletine post'
      });
  }
};

//! DELETE POST BASED ON ID
const deleteNewsBulletine = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const post = await bulletineModal.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted ' });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while deleting news/bulletine post'
      });
  }
};

module.exports = {
  getNewsBulletine,
  createNewsBulletine,
  updateNewsBulletine,
  deleteNewsBulletine,
  getNewsBulletineById
};
