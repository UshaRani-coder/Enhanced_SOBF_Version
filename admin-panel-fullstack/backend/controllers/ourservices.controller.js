const { default: mongoose } = require("mongoose");
const Service = require("../models/ourservices.model");

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageArr = [];
    let logo = req?.files?.logo[0]?.filename || ""
    // Basic validation
    if (!title || !description) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }
    // for images 
    const images = req.files.images || [];
    if (images.length > 0) {
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        imageArr.push(image.filename)
      }
    }
    const newService = new Service({ title, description, images: imageArr, logo });
    await newService.save();
    newService.logo = process.env.BASE_URL + "/uploads/our-services/" + newService.logo;
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
};


//! Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    let imageArr = [];

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    // Validate title and description
    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        error: "Title must be a string with at least 3 characters",
      });
    }

    if (!description || description.trim().length < 5) {
      return res.status(400).json({
        error: "Description must be a string with at least 5 characters",
      });
    }

    // Fetch the existing service from the database
    const existingService = await Service.findById(id);

    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Handle images (preserve existing images and add new ones)
    const images = req.files.images || [];
    if (images.length > 0) {
      // Add the new images to the array
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        imageArr.push(image.filename);
      }
    } else {
      // If no new images, keep the existing ones
      imageArr = existingService.images;
    }

    // Handle logo (if provided)
    const logo = req.files.logo ? req.files.logo[0].filename : existingService.logo;

    // Prepare updates object
    const updates = { title, description, images: imageArr, logo };

    // Update the service in the database
    const updatedService = await Service.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ message: "Service updated successfully", service: updatedService });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};





// ! Get all services
const getAllServices = async (req, res) => {
  const baseURL = process.env.BASE_URL;
  try {
    const services = await Service.find();
    if (services.length > 0) {
      for (let index = 0; index < services.length; index++) {
        const service = services[index];
        service.logo = process.env.BASE_URL + "/uploads/our-services/" + service.logo ||"";
        if (service.images && Array.isArray(service.images)) {
          service.images = service.images.map((image) =>
            image ? `${baseURL}/uploads/our-services/${image}` : image
          );
        }
      }
    }
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};



//! Delete a service
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
