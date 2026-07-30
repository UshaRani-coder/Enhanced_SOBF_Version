const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// sanitize filename
const sanitizeFileName = (file) => {
  return file.originalname
    .split(".")[0]
    .replace(/[^a-zA-Z0-9]/g, "_");
};

// reusable storage creator

const createStorage = (folderName) =>
  new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => {
      const isPdf = file.mimetype === "application/pdf";

      return {
        folder: folderName,

        resource_type: isPdf ? "raw" : "image",

        public_id: `${Date.now()}-${sanitizeFileName(file)}`,
      };
    },
  });
// upload instances
const teamUpload = multer({ storage: createStorage("sobf_uploads/team") });

const heroUpload = multer({ storage: createStorage("sobf_uploads/hero-banner") });

const galleryUpload = multer({ storage: createStorage("sobf_uploads/gallery") });

const impactsUpload = multer({ storage: createStorage("sobf_uploads/our-impacts") });

const eventsUpload = multer({ storage: createStorage("sobf_uploads/upcoming-events") });

const legalDocsUpload = multer({ storage: createStorage("sobf_uploads/legal-documents") });

const recentActivitiesUpload = multer({ storage: createStorage("sobf_uploads/recent-activities") });

const newsUpload = multer({ storage: createStorage("sobf_uploads/news") });

const servicesUpload = multer({ storage: createStorage("sobf_uploads/services") });

const donationsUpload = multer({ storage: createStorage("sobf_uploads/donations") });

module.exports = {
  teamUpload,
  heroUpload,
  galleryUpload,
  impactsUpload,
  eventsUpload,
  legalDocsUpload,
  recentActivitiesUpload,
  newsUpload,
  servicesUpload,
  donationsUpload
};