const mongoose = require('mongoose');
const Service = require('../models/ourservices.model');
const logger = require('../logger');

const cloudinary = require('../config/cloudinary');

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, small_description, color } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled.',
      });
    }

    let imagesArr = [];
    let logoObj = null;

    // LOGO (Cloudinary)
    if (req.files?.logo?.length > 0) {
      const file = req.files.logo[0];
      logoObj = {
        url: file.path,        // Cloudinary URL
        public_id: file.filename,
      };
    }

    // IMAGES (Cloudinary)
    if (req.files?.images?.length > 0) {
      imagesArr = req.files.images.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    const newService = new Service({
      title,
      description,
      small_description,
      color,
      images: imagesArr,
      logo: logoObj,
    });

    await newService.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service: newService,
    });
  } catch (error) {
    logger.error('Error creating service', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating service',
    });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, small_description, color } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID',
      });
    }

    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    let updatedImages = existingService.images || [];
    let updatedLogo = existingService.logo || null;

    // NEW IMAGES (append)
    if (req.files?.images?.length > 0) {
      const newImages = req.files.images.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));

      updatedImages = [...updatedImages, ...newImages];
    }

    // NEW LOGO
    if (req.files?.logo?.length > 0) {
      const file = req.files.logo[0];

      // delete old logo from cloudinary
      if (existingService.logo?.public_id) {
        await cloudinary.uploader.destroy(existingService.logo.public_id);
      }

      updatedLogo = {
        url: file.path,
        public_id: file.filename,
      };
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        title,
        description,
        small_description,
        color,
        images: updatedImages,
        logo: updatedLogo,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      service: updatedService,
    });
  } catch (error) {
    logger.error('Error updating service', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while updating service',
    });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  const test = await Service.findOne();
console.log("TESTT",test);

  try {
    const services = await Service.find({});

  const formatted = services.map((service) => {
  return {
    _id: service._id,
    title: service.title,
    small_description: service.small_description,
    description: service.description,
    color: service.color,
    logo: service.logo?.url || null,
    images: Array.isArray(service.images)
      ? service.images.map((img) => img?.url || img)
      : [],
  };
});

    return res.status(200).json({
      success: true,
      services: formatted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching services',
    });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service ID',
      });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // delete images from cloudinary
    if (service.images?.length) {
      for (const img of service.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    // delete logo
    if (service.logo?.public_id) {
      await cloudinary.uploader.destroy(service.logo.public_id);
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting service', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting service',
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};