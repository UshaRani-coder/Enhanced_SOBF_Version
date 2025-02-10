const { default: mongoose } = require('mongoose');
const Service = require('../models/ourservices.model');

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, small_description, color } = req.body;
    let imageArr = [];
    let logo = req?.files?.logo[0]?.filename || '';
    // Basic validation
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: 'All required fields must be filled.' });
    }
    // for images
    const images = req.files.images || [];
    if (images.length > 0) {
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        imageArr.push(image.filename);
      }
    }
    const newService = new Service({
      title,
      description,
      small_description,
      color,
      images: imageArr,
      logo,
    });
    await newService.save();
    newService.logo =
      process.env.BASE_URL + '/uploads/our-services/' + newService.logo;
    res
      .status(201)
      .json({ message: 'Service created successfully', service: newService });
  } catch (message) {
    console.log('message', message);
    res
      .status(500)
      .json({ success: false, message: 'message creating service' });
  }
};

//! Update a service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, small_description, color } = req.body;
    let imageArr = [];

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid service ID' });
    }

    // Validate title and description
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

    // Fetch the existing service from the database
    const existingService = await Service.findById(id);

    if (!existingService) {
      return res.status(404).json({ success: false, message: 'Service not found' });
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
    const logo = req.files.logo
      ? req.files.logo[0].filename
      : existingService.logo;

    // Prepare updates object
    const updates = {
      title,
      description,
      small_description,
      color,
      images: imageArr,
      logo,
    };

    // Update the service in the database
    const updatedService = await Service.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res
      .status(200)
      .json({
        success: true,
        message: 'Service updated successfully',
        service: updatedService,
      });
  } catch (message) {
    res
      .status(500)
      .json({ success: false, message: 'message updating service' });
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
        service.logo =
          process.env.BASE_URL + '/uploads/our-services/' + service.logo || '';
        if (service.images && Array.isArray(service.images)) {
          service.images = service.images.map((image) =>
            image ? `${baseURL}/uploads/our-services/${image}` : image,
          );
        }
      }
    }
    res.status(200).json(services);
  } catch (message) {
    res
      .status(500)
      .json({ success: false, message: 'message fetching services' });
  }
};

//! Delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.status(200).json({ success: false, message: 'Service deleted successfully' });
  } catch (message) {
    res
      .status(500)
      .json({ success: false, message: 'message deleting service' });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
