const multer = require('multer');
const path = require('path');
const { createDirectoryIfDoesntExist } = require('../helper/default');

//? this is for common uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/team-member/images`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


//!  1. for team members
const storageTeamMember = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/team-member`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, '-') // replaces all spaces with dashes
      .toLowerCase();
    cb(null, `${file.fieldname}-${Date.now()}-${baseName}${ext}`);
  },
});

const uploadTeamMember = multer({ storage: storageTeamMember });


//! 2. for hero banner activites ..
const heroBannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/hero-banner`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const uploadHeroBanner = multer({ storage: heroBannerStorage });



//! 3.  for recent activites ..
const storageRecentActivities = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/recent-activities`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const uploadRecentActivities = multer({ storage: storageRecentActivities });



//! 4. for news bulletine ..
const storageNewsBulletine = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/news-bulletine`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const uploadNewsBulletine = multer({ storage: storageNewsBulletine });



//!  5.  for legal documents ..
const storageLegalDoc = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/legal-documents`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const uploadlegalDocuments = multer({ storage: storageLegalDoc });



//!  6.  for our services  ..
const storageOurServices = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/our-services`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const uploadOurServices = multer({ storage: storageOurServices });

// ! 7.  for gallery
const storageGallery = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/gallery`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const uploadGallery = multer({ storage: storageGallery });

// ! 8. for our impacts
const storageOurImpacts = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/our-impacts`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const uploadOurImpacts = multer({ storage: storageOurImpacts });


// ! 9. for upcoming events
const storageUpcomingEvent = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/upcoming-events`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const uploadUpcomingEvent = multer({ storage: storageUpcomingEvent });


// ! 9. DonateFor 
const storageDonateFor = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), `./uploads/donateFor`);
    createDirectoryIfDoesntExist(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const uploadDonateFor = multer({ storage: storageDonateFor });



module.exports = {
  upload,
  uploadTeamMember,
  uploadRecentActivities,
  uploadlegalDocuments,
  uploadOurServices,
  uploadHeroBanner,
  uploadNewsBulletine,
  uploadGallery,
  uploadOurImpacts,
  uploadUpcomingEvent,
  uploadDonateFor
};
