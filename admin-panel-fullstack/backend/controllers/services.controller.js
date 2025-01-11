const { ImpactModel, Services, Team, SuppportedBy } = require("../models/services.model");


//! CRUD Operations for Impact

// Create
const createImpact = async (req, res) => {
  try {
    try {
      const { title, stat_number } = req.body
      if (!(title, stat_number)) {
        return res.status(404).json({ success: false, mesasge: "all fields are required " })
      }
      const images = req.images
      const videos = req.videos
      const post = new PostModel({ title, description, images, videos });
      await post.save();
      res.status(201).json({ success: true, message: 'Post created successfully', post });
    } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong while creating post", error: error.message });
    }
    const impact = new ImpactModel(req.body);
    await impact.save();
    res.status(201).send(impact);
  } catch (err) {
    res.status(500).send(err.message);
  }
};




// Get All Impacts
const getImpacts = async (req, res) => {
  try {
    const impacts = await ImpactModel.find({});
    res.send(impacts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update Impacts
const updateImpact = async (req, res) => {
  try {
    const impact = await ImpactModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!impact) return res.status(404).send("Impact not found");
    res.send(impact);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete Impacts
const deleteImpact = async (req, res) => {
  try {
    const impact = await ImpactModel.findByIdAndDelete(req.params.id);
    if (!impact) return res.status(404).send("Impact not found");
    res.send(impact);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ! CRUD Operations for Services 

//! Create
const createServices = async (req, res) => {
  try {
    const service = new Services(req.body);
    await service.save();
    res.status(201).send(service);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Read All
const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.send(services);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update
const updateServices = async (req, res) => {
  try {
    const service = await Services.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).send("Service not found");
    res.send(service);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete
const deleteServices = async (req, res) => {
  try {
    const service = await Services.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).send("Service not found");
    res.send(service);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//! CRUD Operations for Team 

// Create
const createTeam = async (req, res) => {
  try {
    const teamMember = new Team(req.body);
    await teamMember.save();
    res.status(201).send(teamMember);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Read All
const getTeam = async (req, res) => {
  try {
    const team = await Team.find({});
    res.send(team);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update
const updateTeam = async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teamMember) return res.status(404).send("Team member not found");
    res.send(teamMember);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete
const deleteTeam = async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndDelete(req.params.id);
    if (!teamMember) return res.status(404).send("Team member not found");
    res.send(teamMember);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//!  CRUD Operations for SupportedBy

// Create
const createSupportBy = async (req, res) => {
  try {
    const supported = new SuppportedBy(req.body);
    await supported.save();
    res.status(201).send(supported);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Read All
const getSupportedBy = async (req, res) => {
  try {
    const supported = await SuppportedBy.find();
    res.send(supported);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update
const updateSupportedBy = async (req, res) => {
  try {
    const supported = await SuppportedBy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!supported) return res.status(404).send("Supported entry not found");
    res.send(supported);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete
const deleteSupportedBy = async (req, res) => {
  try {
    const supported = await SuppportedBy.findByIdAndDelete(req.params.id);
    if (!supported) return res.status(404).send("Supported entry not found");
    res.send(supported);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports = {
  createImpact,
  getImpacts,
  updateImpact,
  deleteImpact,
  createServices,
  getServices,
  updateServices,
  deleteServices,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
  createSupportBy,
  getSupportedBy,
  updateSupportedBy,
  deleteSupportedBy
}