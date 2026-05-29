const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); 

// Single Cloudinary storage for ALL uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sobf_uploads",
    resource_type: "auto", // supports images + videos + docs/files
    // resource_type: "raw",
  },
});
const upload = multer({ storage });

module.exports = upload;
