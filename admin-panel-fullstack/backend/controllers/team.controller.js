const logger = require('../logger');
const Team = require('../models/team.model');

//! Get all team members
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find({});
    if (teamMembers.length > 0) {
      for (let index = 0; index < teamMembers.length; index++) {
        const teamMember = teamMembers[index];
        teamMember.image = process.env.BASE_URL + '/uploads/team-member/' + teamMember.image;
      }
    }
    return res.status(200).json({ success: true, teamMembers });
  } catch (error) {
    logger.error("Something went wrong while retriving data .")
    return res.status(500).json({ success: false, message: "Something went wrong while retriving data ." });
  }
};

// ! Create a new team member
const createTeamMember = async (req, res) => {
  try {
    const { name, role, linkedIn, instagram } = req.body;
    if (req.file.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Image is required ',
      });
    }
    const filename = req.file.filename;
    // Check if the required fields are provided
    if (!name || !role || !linkedIn || !instagram) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    // Proceed with creating the team member
    const teamMember = new Team({
      name,
      role,
      linkedIn,
      instagram,
      image: filename || '',
    });
    await teamMember.save();
    teamMember.image = process.env.BASE_URL + '/uploads/team-member/' + teamMember.image;
    return res.status(201).json({
      success: true,
      teamMember,
    });
  } catch (error) {
    logger.error("Something went wrong while create team member.")
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while create team member.'
    });
  }
};

//! Update a team member
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the existing team member
    const existingTeamMember = await Team.findById(id);
    if (!existingTeamMember) {
      return res
        .status(404)
        .json({ success: false, message: 'Team member not found' });
    }

    // Prepare updates from request body
    const { name, role, linkedIn, instagram } = req.body;

    // Check if a new image is provided; otherwise, keep the existing one
    const image = req.file ? req.file.filename : existingTeamMember.image;

    // Prepare the updated fields
    const updates = {
      name: name || existingTeamMember.name,
      role: role || existingTeamMember.role,
      linkedIn: linkedIn || existingTeamMember.linkedIn,
      instagram: instagram || existingTeamMember.instagram,
      image,
    };

    // Update the team member
    const updatedTeam = await Team.findByIdAndUpdate(id, updates, {
      new: true,
    });

    // Append the full image URL
    updatedTeam.image =  process.env.BASE_URL + '/uploads/team-member/' + updatedTeam.image;

    return res.status(200).json({ success: true, updatedTeam });
  } catch (error) {
    logger.error("Something went wrong while update team member.")
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while update team member'
    });
  }
};

//! Delete a team member
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error("Something went wrong while delete team member.")
    return res
      .status(500)
      .json({
        success: false,
        message: 'Something went wrong while delete team member'
      });
  }
};

module.exports = { createTeamMember, getTeamMembers, updateTeam, deleteTeam };
