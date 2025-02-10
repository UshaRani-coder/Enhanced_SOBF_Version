const { default: mongoose } = require('mongoose');
const PostModel = require('../models/post.model');

// Helper Function: Validate ID format
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    const baseURL = process.env.BASE_URL;

    if (posts.length > 0) {
      for (let index = 0; index < posts.length; index++) {
        const post = posts[index];

        if (post.images && Array.isArray(post.images)) {
          post.images = post.images.map((image) =>
            image ? `${baseURL}/uploads/recent-activities/${image}` : image,
          );
        }

        // Check and update the videos array with full URLs
        if (post.videos && Array.isArray(post.videos)) {
          post.videos = post.videos.map((video) =>
            video ? `${baseURL}/uploads/recent-activities/${video}` : video,
          );
        }
      }
    }
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all posts',
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching posts',
    });
  }
};

// CREATE POST
const createPost = async (req, res) => {
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
    const post = new PostModel({
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

// UPDATE POST BASED ON ID
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    // Fetch the existing post
    const existingPost = await PostModel.findById(id);
    if (!existingPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const { title, description, date } = req.body;

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
          success: false, message: 'Description must be a string with at least 5 characters',
        });
    }

    // Initialize updated data with existing values
    const updates = {
      title: title || existingPost.title,
      description: description || existingPost.description,
      images: existingPost.images,
      videos: existingPost.videos,
      date: date || existingPost.date
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
    const updatedPost = await PostModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the post'
    });
  }
};

// DELETE POST BASED ON ID
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    // Delete the post
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while deleting post'
      });
  }
};

module.exports = { deletePost, updatePost, getPosts, createPost };
