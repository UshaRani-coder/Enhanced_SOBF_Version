const { default: mongoose } = require("mongoose");
const Service = require("../models/ourservices.model");

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Basic validation
    if (!title || !description) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }
    let images = req.images
    let logo = req.logo

    const newService = new Service({ title, description, images, logo });
    await newService.save();

    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
};


// Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    // Validate image (if provided)
    let images = req.images
    let logo = req.logo

    if (images) updates.image = images;
    if (logo) updates.logo = logo;
    const updatedService = await Service.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service updated successfully", service: updatedService });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};



// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};



// Delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService
};
