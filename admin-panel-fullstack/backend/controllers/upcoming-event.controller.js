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
      time,
      status = 'upcoming',
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

    const validStatuses = ['upcoming', 'happening', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const image = req.file.path; 

    const post = new upcomingEvents({
      title,
      description,
      date,
      location,
      time,
      status,
      image,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      post,
    });
  } catch (error) {
    logger.error('Error creating event', error);
    res.status(500).json({
      success: false,
      message: 'Error creating event',
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

    res.status(200).json({
      success: true,
      message: 'Fetched successfully',
      posts, 
    });
  } catch (error) {
    logger.error('Error fetching events', error);
    res.status(500).json({
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

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    logger.error('Error fetching event', error);
    res.status(500).json({
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
      time,
      status,
    } = req.body;

    const image = req.file
      ? req.file.path
      : existingPost.image;

    const updates = {
      title: title ?? existingPost.title,
      description: description ?? existingPost.description,
      date: date ?? existingPost.date,
      location: location ?? existingPost.location,
      time: time ?? existingPost.time,
      status: status ?? existingPost.status,
      image,
    };

    const updatedPost = await upcomingEvents.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      updatedPost,
    });
  } catch (error) {
    logger.error('Error updating event', error);
    res.status(500).json({
      success: false,
      message: 'Error updating event',
    });
  }
};

// UPDATE STATUS
const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID',
      });
    }

    const validStatuses = ['upcoming', 'happening', 'completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const updatedPost = await upcomingEvents.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated',
      updatedPost,
    });
  } catch (error) {
    logger.error('Error updating status', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status',
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

    const post = await upcomingEvents.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting event', error);
    res.status(500).json({
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
  updateEventStatus,
};