const cloudinary = require("cloudinary").v2
const asyncHandler = require("express-async-handler")


cloudinary.config({
  cloud_name: "backend-with-ranjana",
  api_key: "869167873969793",
  api_secret: "5BwtPJIvYhDpuNDYNiN1eZtmFhc"
})

const uploadMultipleFile = asyncHandler(async (req, res, next) => {
  try {
    if (req.files === undefined) {
      return res.status(404).json({ msg: "file not found" })
    }

    const images = req.files.images || [];
    const videos = req.files.videos || [];

    // For images upload...
    if (images.length > 0) {
      const imageURL = [];
      for (const image of images) {
        const res = await cloudinary.uploader.upload(image.path, { resource_type: "auto" })
        imageURL.push(res.secure_url)
      }
      req.images = imageURL
    }

    // for videos upload ...
    if (videos.length > 0) {
      const videoURL = [];
      for (const video of videos) {
        const res = await cloudinary.uploader.upload(video.path, { resource_type: "auto" })
        videoURL.push(res.secure_url)
      }
      req.videos = videoURL
    }
    next();
  }
  catch (error) {
    res.status(500).json({ message: "internal error in uploadMultipleFile.js" })
  }
})


// ! Middleware to upload a single file (image or video)
const uploadSingleFile = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    const file = req.file; 
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    })
    req.image = result.secure_url;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal error in uploadSingleFile middleware",
      error: error.message,
    });
  }
});
module.exports = { uploadMultipleFile, uploadSingleFile };