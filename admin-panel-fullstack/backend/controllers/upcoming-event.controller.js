const { default: mongoose } = require('mongoose');
const logger = require('../logger');
const upcomingEvents = require('../models/upcoming-events.model');

// Helper Function: Validate ID format
const isValidObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

// CREATE EVENT
const createEventPost = async (req, res) => {
  try {

    const {
      title,
      description,
      date,
      location,
      startTime,
      endTime,
    } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Title must be at least 3 characters',
      });
    }

    if (!description || description.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 5 characters',
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required',
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location is required',
      });
    }

    if (!startTime) {
      return res.status(400).json({
        success: false,
        message: 'Start time is required',
      });
    }

    if (!endTime) {
      return res.status(400).json({
        success: false,
        message: 'End time is required',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const image = req.file.path;

    const post = await upcomingEvents.create({
      title,
      description,
      date,
      location,
      startTime,
      endTime,
      image,
    });

    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      post,
    });
  } catch (error) {
    console.error('CREATE EVENT ERROR:', error);

    logger.error('Error creating event', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL EVENTS
const getEventPosts = async (req, res) => {
  try {
    const posts = await upcomingEvents
      .find({})
      .populate({
        path: 'registeredUsers',
        select: 'username email',
      })
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      message: 'Fetched successfully',
      posts,
    });
  } catch (error) {
    logger.error('Error fetching events', error);

    return res.status(500).json({
      success: false,
      message: 'Error fetching events',
    });
  }
};

// GET EVENT BY ID
const getEventPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID',
      });
    }

    const post = await upcomingEvents
      .findById(id)
      .populate('registeredUsers', 'username email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    logger.error('Error fetching event', error);

    return res.status(500).json({
      success: false,
      message: 'Error fetching event',
    });
  }
};

// UPDATE EVENT
const updateEventPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID',
      });
    }

    const existingPost = await upcomingEvents.findById(id);

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    const {
      title,
      description,
      date,
      location,
      startTime,
      endTime,
    } = req.body;

    const image = req.file
      ? req.file.path
      : existingPost.image;

    const updates = {
      title: title ?? existingPost.title,
      description:
        description ?? existingPost.description,
      date: date ?? existingPost.date,
      location:
        location ?? existingPost.location,
      startTime:
        startTime ?? existingPost.startTime,
      endTime:
        endTime ?? existingPost.endTime,
      image,
    };

    const updatedPost =
      await upcomingEvents.findByIdAndUpdate(
        id,
        updates,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: 'Updated successfully',
      updatedPost,
    });
  } catch (error) {
    console.error('UPDATE EVENT ERROR:', error);

    logger.error('Error updating event', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EVENT
const deleteEventPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID',
      });
    }

    const post =
      await upcomingEvents.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting event', error);

    return res.status(500).json({
      success: false,
      message: 'Error deleting event',
    });
  }
};

module.exports = {
  getEventPosts,
  getEventPostById,
  createEventPost,
  updateEventPost,
  deleteEventPost,
};