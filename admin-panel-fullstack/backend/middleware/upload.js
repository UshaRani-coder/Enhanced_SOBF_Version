const cloudinary = require('cloudinary').v2;
const asyncHandler = require('express-async-handler');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dgua57bwf',
  api_key: '575246365656966',
  api_secret: 'oshbw_mwIoK6Cl8pJCXaRnDEZ8o',
});

//? Middleware to upload  files (images or videos) like recent activites or  news bulletines
const uploadMultipleFile = asyncHandler(async (req, res, next) => {
  try {
    console.log('req.files', req.files);
    if (!req.files) return next();
    const images = req.files.images || req.files['images'] || [];
    const videos = req.files.videos || req.files['videos'] || [];

    //? Upload images to Cloudinary
    if (images.length > 0) {
      const imageURLs = [];
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: 'image',
        });
        imageURLs.push(result.secure_url);
      }
      req.images = imageURLs;
    }

    //? Upload videos to Cloudinary
    if (videos.length > 0) {
      const videoURLs = [];
      for (const video of videos) {
        const result = await cloudinary.uploader.upload(video.path, {
          resource_type: 'video',
        });
        videoURLs.push(result.secure_url);
      }
      req.videos = videoURLs;
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Error uploading files ',
      error: error.message,
    });
  }
});

//? This is only single images like in hero banner , our team and our impacts ...
const uploadSingleFile = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) return next();
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });
    req.image = result.secure_url;
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Internal error in uploadSingleFile middleware',
      error: error.message,
    });
  }
});

//? this is only for legal document pdf files
const uploadSinglePDFfile = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) return next();

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw',
      folder: 'legal_documents',
    });

    // Attach Cloudinary URL and public ID to the request object
    req.fileUrl = result.secure_url;
    req.publicId = result.public_id;

    // Clean up the local file after upload
    fs.unlinkSync(file.path);
    next();
  } catch (error) {
    console.error('Error in uploadSinglePDFfile middleware:', error);
    res.status(500).json({
      message: 'Internal error during file upload',
      error: error.message,
    });
  }
});

// ? this is for our services ..
const uploadOurServicesFile = asyncHandler(async (req, res, next) => {
  try {
    const { images, logo } = req.files || {};
    if (!req.files) return next();
    // Check if more than 5 images are uploaded
    if (images?.length > 5) {
      return res
        .status(400)
        .json({ msg: 'You can upload a maximum of 5 images.' });
    }
    const imageURLs = [];
    // Upload images to Cloudinary
    if (images) {
      for (const image of images) {
        const uploadResult = await cloudinary.uploader.upload(image.path, {
          resource_type: 'image',
        });
        imageURLs.push(uploadResult.secure_url);
      }
    }
    // Upload logo to Cloudinary (if provided)
    let logoURL = null;
    if (logo && logo[0]) {
      const logoUploadResult = await cloudinary.uploader.upload(logo[0].path, {
        resource_type: 'image',
      });
      logoURL = logoUploadResult.secure_url;
    }
    // Attach uploaded URLs to the request object
    req.images = imageURLs;
    req.logo = logoURL;
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Internal error during file upload.',
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
