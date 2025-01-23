const Team = require("../models/team.model");

// ! Create a new team member
const createTeamMember = async (req, res) => {
  try {
    const { name, role, linkedIn, instagram } = req.body;
    const image = req.image;

    // Check if the required fields are provided
    if (!name || !role || !linkedIn || !instagram || !image) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate URL format for LinkedIn and Instagram
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(\/[a-zA-Z0-9_-]+)*\/?$/;
    if (!urlRegex.test(linkedIn)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid LinkedIn URL format'
      });
    }

    if (!urlRegex.test(instagram)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Instagram URL format'
      });
    }


    // Proceed with creating the team member
    const teamMember = new Team({ name, role, linkedIn, instagram, image });
    await teamMember.save();

    return res.status(201).json({
      success: true,
      teamMember
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create team member',
      error: error
    });
  }
};


//! Get all team members
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    return res.status(200).json({ success: true, teamMembers });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch team members', error: error.message });
  }
};

//! Update a team member
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the existing team member
    const existingTeamMember = await Team.findById(id);
    if (!existingTeamMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    // Prepare updates
    const updates = { ...req.body };
    const image = req.image;

    // Retain the existing image if no new image is uploaded
    updates.image = image || existingTeamMember.image;

    // Update the team member
    const updatedTeam = await Team.findByIdAndUpdate(id, updates, { new: true });
    return res.status(200).json({ success: true, updatedTeam });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update team member', error: error.message });
  }
};


//! Delete a team member
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete team member', error: error.message });
  }
};

module.exports = { createTeamMember, getTeamMembers, updateTeam, deleteTeam, };
