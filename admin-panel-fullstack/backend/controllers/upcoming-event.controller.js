const { default: mongoose } = require('mongoose');
const logger = require('../logger');
const upcomingEvents = require('../models/upcoming-events.model');
const fs = require('fs');

// Helper Function: Validate ID format
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE POST
const createEventPost = async (req, res) => {
  try {
    const { title, description, date, location, time, status = 'upcoming' } = req.body;

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

    // Validate status
    const validStatuses = ['upcoming', 'happening', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: upcoming, happening, completed',
      });
    }

    // Validate image (if applicable)
    if (req?.file?.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
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
      time,
      status
    });

    await post.save();

    // Format the image URL before sending response
    const formattedPost = post.toObject();
    formattedPost.image = "https://backend.sobf.in" + '/uploads/upcoming-events/' + formattedPost.image;
    // formattedPost.image = "http://localhost:5000" + '/uploads/upcoming-events/' + formattedPost.image;

    res.status(201).json({
      success: true,
      message: 'Upcoming events Post created successfully',
      post: formattedPost
    });
  } catch (error) {
    logger.error("Something went wrong while creating post", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating upcoming events post',
      error: error.message
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
      })
      .sort({ date: 1 }); // Sort by date ascending

    const baseURL = "https://backend.sobf.in";
    // const baseURL = "http://localhost:5000";

    // Format image URLs
    const formattedPosts = posts.map(post => {
      const postObj = post.toObject();
      postObj.image = baseURL + '/uploads/upcoming-events/' + postObj.image;
      return postObj;
    });

    res.status(200).json({
      success: true,
      message: 'Successfully fetched all upcoming events posts',
      posts: formattedPosts,
    });
  } catch (error) {
    logger.error("Something went wrong while fetching upcoming events posts", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching upcoming events posts',
      error: error.message
    });
  }
};

// GET SPECIFIC POST BY ID
const getEventPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const post = await upcomingEvents.findById(id)
      .populate('registeredUsers', 'username email');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Upcoming events post not found' });
    }

    // const baseURL = "https://backend.sobf.in";
    const baseURL = "http://localhost:5000";
    const formattedPost = post.toObject();
    formattedPost.image = baseURL + '/uploads/upcoming-events/' + formattedPost.image;

    res.status(200).json({
      success: true,
      message: 'Successfully fetched the upcoming events post',
      post: formattedPost,
    });
  } catch (error) {
    logger.error("Something went wrong while fetching the upcoming events post", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the upcoming events post',
      error: error.message
    });
  }
};

// UPDATE POST BASED ON ID
const updateEventPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const existingPost = await upcomingEvents.findById(id);
    if (!existingPost) {
      return res.status(404).json({ success: false, message: 'Upcoming event post not found' });
    }

    const { title, description, date, time, location, status } = req.body;
    const image = req.file ? req.file.filename : existingPost.image;

    // Validate status if provided
    if (status) {
      const validStatuses = ['upcoming', 'happening', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be one of: upcoming, happening, completed',
        });
      }
    }

    const updates = {
      title: title || existingPost.title,
      description: description || existingPost.description,
      image,
      date: date || existingPost.date,
      location: location || existingPost.location,
      time: time || existingPost.time,
      status: status || existingPost.status
    };

    const updatedPost = await upcomingEvents.findByIdAndUpdate(id, updates, { new: true });

    // Format the image URL before sending response
    const formattedPost = updatedPost.toObject();
    // formattedPost.image = "https://backend.sobf.in" + '/uploads/upcoming-events/' + formattedPost.image;
    formattedPost.image = "http://localhost:5000" + '/uploads/upcoming-events/' + formattedPost.image;

    res.status(200).json({
      success: true,
      message: 'Upcoming-events post updated successfully',
      updatedPost: formattedPost,
    });
  } catch (error) {
    logger.error("Error updating post:", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating the post',
      error: error.message
    });
  }
};

// UPDATE EVENT STATUS
const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const validStatuses = ['upcoming', 'happening', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: upcoming, happening, completed',
      });
    }

    const updatedPost = await upcomingEvents.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Upcoming event post not found' });
    }

    // Format the image URL before sending response
    const formattedPost = updatedPost.toObject();
    // formattedPost.image = "https://backend.sobf.in" + '/uploads/upcoming-events/' + formattedPost.image;
    formattedPost.image = "http://localhost:5000" + '/uploads/upcoming-events/' + formattedPost.image;

    res.status(200).json({
      success: true,
      message: 'Event status updated successfully',
      updatedPost: formattedPost,
    });
  } catch (error) {
    logger.error("Error updating event status:", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating event status',
      error: error.message
    });
  }
};

// DELETE POST BASED ON ID
const deleteEventPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const post = await upcomingEvents.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Upcoming events Post not found' });
    }

    // Optionally delete the associated image file
    if (post.image) {
      const imagePath = `./uploads/upcoming-events/${post.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) logger.error(`Error deleting image file: ${imagePath}`, err);
      });
    }

    res.status(200).json({
      success: true,
      message: 'Upcoming events Post deleted successfully'
    });
  } catch (error) {
    logger.error("Something went wrong while deleting Upcoming-events Post", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting Upcoming-events Post',
      error: error.message
    });
  }
};

module.exports = {
  getEventPosts,
  getEventPostById,
  createEventPost,
  updateEventPost,
  deleteEventPost,
  updateEventStatus
};