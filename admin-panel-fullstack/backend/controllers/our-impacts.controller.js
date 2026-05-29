const mongoose = require('mongoose');
const OurImpactsModel = require('../models/our-impacts.model');
const logger = require('../logger');

// Helper function to validate string fields
const isValidString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

// Helper function to validate numeric fields
const isValidNumber = (value) =>
  typeof value === 'number' && value >= 0 && value <= 100000;

//! GET ALL
const getOurImpacts = async (req, res) => {
  console.log('REQ', req.file);
  try {
    const posts = await OurImpactsModel.find({});
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched Our Impacts',
      posts,
    });
  } catch (error) {
    logger.error('Error fetching Our Impacts');
    return res.status(500).json({
      success: false,
      message: 'Error fetching Our Impacts',
    });
  }
};

//! CREATE
const createOurImpacts = async (req, res) => {
  try {
    const { total_services, description } = req.body;

    if (!total_services) {
      return res.status(400).json({
        success: false,
        message: 'total_services is required',
      });
    }

    if (!description || !isValidString(description)) {
      return res.status(400).json({
        success: false,
        message: 'Valid description is required',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const post = new OurImpactsModel({
      total_services,
      description,
      image: req.file.path, 
    });

    await post.save();

    return res.status(201).json({
      success: true,
      message: 'Our Impacts created successfully',
      post,
    });
  } catch (error) {
    logger.error('Error creating Our Impacts');
    return res.status(500).json({
      success: false,
      message: 'Error creating Our Impacts',
    });
  }
};

//! UPDATE
const updateOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID',
      });
    }

    const existing = await OurImpactsModel.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Our Impacts post not found',
      });
    }

    const updates = {
      total_services: req.body.total_services ?? existing.total_services,

      description: req.body.description ?? existing.description,

      image: req.file ? req.file.path : existing.image,
    };

    const updatedPost = await OurImpactsModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Our Impacts updated successfully',
      updatedPost,
    });
  } catch (error) {
    logger.error('Error updating Our Impacts');
    return res.status(500).json({
      success: false,
      message: 'Error updating Our Impacts',
    });
  }
};

//! DELETE
const deleteOurImpacts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID',
      });
    }

    const post = await OurImpactsModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }


    return res.status(200).json({
      success: true,
      message: 'Our Impacts deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting Our Impacts');
    return res.status(500).json({
      success: false,
      message: 'Error deleting Our Impacts',
    });
  }
};

module.exports = {
  createOurImpacts,
  getOurImpacts,
  updateOurImpacts,
  deleteOurImpacts,
};
