const { default: mongoose } = require('mongoose');
const logger = require('../logger');
const upcomingEvents = require('../models/upcoming-events.model');

// Helper Function: Validate ID format
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);



// CREATE POST
const createEventPost = async (req, res) => {
  try {
    const { title, description, date, location, time } = req.body;
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


    // Validate image (if applicable)
    if (req?.file?.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Image is required ',
      });
    }

  
    const filename = req.file.filename;


    // Save post to database
    const post = new upcomingEvents({
      title,
      description,
      date,
      location,
      image: filename || '',
      time
    });
    await post.save();
    res
      .status(201)
      .json({ success: true, message: 'Upcoming events Post created successfully', post });
  } catch (error) {
    logger.error("Something went wrong while creating post'.", error)
    res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while creating  upcoming events post',
        error
      });
  }
};

// GET ALL POSTS
const getEventPosts = async (req, res) => {
  try {
    const posts = await upcomingEvents
      .find({})
      .populate({
        path: "registeredUsers",
        select: "username email",
      });
    console.log("posts", posts);

    const baseURL = process.env.BASE_URL;
    if (posts.length > 0) {
      for (let index = 0; index < posts.length; index++) {
        const post = posts[index];
        post.image =
          process.env.BASE_URL + '/uploads/upcoming-events/' + post.image;
      }
    }
      res.status(200).json({
        success: true,
        message: 'Successfully fetched all upcoming events posts',
        posts,
      });
  } catch (error) {
    logger.error("Something went wrong while fetching upcoming events posts.")
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching upcoming events posts',
    });
  }
};



//! GET SPECIFIC POST BY ID
const getEventPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }
    // Find post by ID
    const post = await upcomingEvents.findById(id)
      .populate('registeredUsers', 'username email');;
    if (!post) {
      return res.status(404).json({ success: false, message: 'Upcoming events posts not found' });
    }
    const baseURL = process.env.BASE_URL;
    // Format images and videos URLs
    if (Array.isArray(post.images)) {
      post.images = post.images.map((image) =>
        image ? `${baseURL}/uploads/upcoming-events/${image}` : image
      );
    }
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all the upcoming events post.',
      post,
    });
  } catch (error) {
    logger.error("Something went wrong while fetching the upcoming events post'.")
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the upcoming events post',
    });
  }
};



// UPDATE POST BASED ON ID
const updateEventPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    // Fetch the existing post
    const existingPost = await upcomingEvents.findById(id);
    if (!existingPost) {
      return res.status(404).json({ success: false, message: 'Upcoming events Post not found' });
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
      title: title || existingPost.small_description,
      description: description || existingPost.description,
      images: existingPost.images,
      date: date || existingPost.date,
      location: title || existingPost.location,
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
    // Update the post
    const updatedPost = await upcomingEvents.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Upcoming-events Post not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Upcoming-events Post updated successfully',
      updatedPost,
    });
  } catch (error) {
    logger.error("Something went wrong while updating the post.")
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the post'
    });
  }
};

// DELETE POST BASED ON ID
const deleteEventPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    // Delete the post
    const post = await upcomingEvents.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Upcoming events Post not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Upcoming events Post deleted successfully' });
  } catch (error) {
    logger.error("Something went wrong while deleting Upcoming-events Post .")
    res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while deleting Upcoming-events Post '
      });
  }
};

module.exports = {
  getEventPosts,
  getEventPostById,
  createEventPost,
  updateEventPost,
  deleteEventPost
};
