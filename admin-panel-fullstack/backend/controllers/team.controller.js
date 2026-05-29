const logger = require('../logger');
const Team = require('../models/team.model');

//! Get all team members
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find({});

    return res.status(200).json({
      success: true,
      teamMembers,
    });
  } catch (error) {
    logger.error('Something went wrong while retrieving data.');
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while retrieving data.',
    });
  }
};

//! Create a new team member (CLOUDINARY VERSION)
const createTeamMember = async (req, res) => {
  try {
    const { name, role, linkedIn, instagram } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const teamMember = new Team({
      name,
      role,
      linkedIn,
      instagram,
      image: req.file.path, 
    });

    await teamMember.save();

    return res.status(201).json({
      success: true,
      teamMember,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//! Update team member (CLOUDINARY VERSION)
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTeamMember = await Team.findById(id);
    if (!existingTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    const { name, role, linkedIn, instagram } = req.body;

    const updates = {
      name: name || existingTeamMember.name,
      role: role || existingTeamMember.role,
      linkedIn: linkedIn || existingTeamMember.linkedIn,
      instagram: instagram || existingTeamMember.instagram,
      image: req.file ? req.file.path : existingTeamMember.image,
    };

    const updatedTeam = await Team.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      updatedTeam,
    });
  } catch (error) {
    logger.error('Something went wrong while updating team member.');
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating team member',
    });
  }
};

//! Delete team member
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Team.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error) {
    logger.error('Something went wrong while deleting team member.');
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting team member',
    });
  }
};

module.exports = {
  createTeamMember,
  getTeamMembers,
  updateTeam,
  deleteTeam,
};
