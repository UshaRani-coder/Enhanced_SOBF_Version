const cloudinary = require("../config/cloudinary");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// -------------------------------
// Helper: safe delete local file
// -------------------------------
const deleteLocalFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error("File delete error:", err.message);
  });
};

// -------------------------------
// Upload multiple images
// -------------------------------
const uploadMultipleFile = asyncHandler(async (req, res, next) => {
  try {
    const images = req.files?.images;

    if (!images || !Array.isArray(images) || images.length === 0) {
      req.images = [];
      return next();
    }

    const uploadPromises = images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });

      deleteLocalFile(image.path);
      return result.secure_url;
    });

    req.images = await Promise.all(uploadPromises);
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading multiple files",
      error: error.message,
    });
  }
});

// -------------------------------
// Upload single image (image/video optional)
// -------------------------------
const uploadSingleFile = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) return next();

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image", // use "auto" if you want mixed types later
    });

    deleteLocalFile(req.file.path);

    req.fileUrl = result.secure_url;
    req.publicId = result.public_id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading single file",
      error: error.message,
    });
  }
});

// -------------------------------
// Upload single PDF (legal documents)
// -------------------------------
const uploadSinglePDFfile = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) return next();

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "legal-documents",
    });

    deleteLocalFile(req.file.path);

    req.fileUrl = result.secure_url;
    req.publicId = result.public_id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "PDF upload failed",
      error: error.message,
    });
  }
});

// -------------------------------
// Upload services 
// -------------------------------
const uploadOurServicesFile = asyncHandler(async (req, res, next) => {
  try {
    const { images = [], logo = [] } = req.files || {};

    if (images.length > 5) {
      return res.status(400).json({
        message: "You can upload a maximum of 5 images.",
      });
    }

    // Upload images
    const imageURLs = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });

        deleteLocalFile(image.path);
        return result.secure_url;
      })
    );

    // Upload logo (optional)
    let logoURL = null;

    if (logo.length > 0) {
      const result = await cloudinary.uploader.upload(logo[0].path, {
        resource_type: "image",
      });

      deleteLocalFile(logo[0].path);
      logoURL = result.secure_url;
    }

    req.fileUrls = imageURLs;
    req.logoUrl = logoURL;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading service files",
      error: error.message,
    });
  }
});

module.exports = {
  uploadMultipleFile,
  uploadSingleFile,
  uploadSinglePDFfile,
  uploadOurServicesFile,
};