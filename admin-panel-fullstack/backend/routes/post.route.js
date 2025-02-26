const express = require('express');
const {
  deletePost,
  updatePost,
  getPosts,
  createPost,
  getPostById,
} = require('../controllers/post.controller');
const {
  createNewsBulletine,
  getNewsBulletine,
  updateNewsBulletine,
  deleteNewsBulletine,
  getNewsBulletineById,
} = require('../controllers/newspost.controller');
const {
  createHeroBanner,
  getHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
} = require('../controllers/hero-banner.controller');
const {
  createOurImpacts,
  getOurImpacts,
  updateOurImpacts,
  deleteOurImpacts,
} = require('../controllers/our-impacts.controller');
const {
  createTeamMember,
  getTeamMembers,
  updateTeam,
  deleteTeam,
} = require('../controllers/team.controller');
const {
  createGalleryController,
  getAllGalleryImagesController,
  updateGalleryController,
  deleteGalleryController,
} = require('../controllers/gallery.controller');
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/ourservices.controller');

//? UPLOADING MIDDLEWARES  TO LOCAL UPLOADS FOLDER .....
const {
  uploadRecentActivities,
  uploadTeamMember,
  uploadHeroBanner,
  uploadlegalDocuments,
  uploadOurServices,
  uploadNewsBulletine,
  uploadGallery,
  uploadOurImpacts,
} = require('../middleware/multer');
const {
  createLegalDocument,
  updateLegalDocument,
  deleteLegalDocument,
  getLegalDocument,
} = require('../controllers/legaldoc.controller');
const {
  createFeaturedVideo,
  getFeaturedVideo,
  updateFeaturedVideo,
  deleteFeaturedVideo,
} = require('../controllers/featuredvideos.controller');

const router = express.Router();

// ! Our Team Members  # DONE
router.post('/create-team', uploadTeamMember.single('image'), createTeamMember);
router.get('/get-team', getTeamMembers);
router.put('/update-team/:id', uploadTeamMember.single('image'), updateTeam);
router.delete('/delete-team/:id', deleteTeam);

//! FOR RECENT ACTIVITIES.....    # DONE
router.post(
  '/create-post',
  uploadRecentActivities.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 },
  ]),
  createPost,
);
router.get('/get-posts', getPosts);
router.get('/get-post/:id', getPostById);
router.put(
  '/update/:id',
  uploadRecentActivities.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 },
  ]),
  updatePost,
);
router.delete('/delete/:id', deletePost);

// ! Legal documents  ... #DONE
router.post(
  '/create-legal-doc',
  uploadlegalDocuments.single('file'),
  createLegalDocument,
);
router.get('/get-legal-doc', getLegalDocument);
router.put(
  '/update-legal-doc/:id',
  uploadlegalDocuments.single('file'),
  updateLegalDocument,
);
router.delete('/delete-legal-doc/:id', deleteLegalDocument);

// ! Our Services endpoint   ... #DONE
router.get('/get-services', getAllServices);
router.post(
  '/create-services',
  uploadOurServices.fields([
    { name: 'images', maxCount: 5 },
    { name: 'logo', maxCount: 1 },
  ]),
  createService,
);
router.put(
  '/update-services/:id',
  uploadOurServices.fields([
    { name: 'images', maxCount: 5 },
    { name: 'logo', maxCount: 1 },
  ]),
  updateService,
);
router.delete('/delete-services/:id', deleteService);

// ! Hero banner
router.post(
  '/create-banner',
  uploadHeroBanner.single('image'),
  createHeroBanner,
);
router.get('/get-hero-banner', getHeroBanner);
router.put(
  '/update-hero-banner/:id',
  uploadHeroBanner.single('image'),
  updateHeroBanner,
);
router.delete('/delete-hero-banner/:id', deleteHeroBanner);

//! FOR NEWS BULLETINE POST ....
router.post(
  '/create-newspost',
  uploadNewsBulletine.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 },
  ]),
  createNewsBulletine,
);
router.get('/get-newspost', getNewsBulletine);
router.get('/news-bulletine/:id', getNewsBulletineById);
router.put(
  '/update-news-post/:id',
  uploadNewsBulletine.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 },
  ]),
  updateNewsBulletine,
);
router.delete('/delete-news-post/:id', deleteNewsBulletine);

// ! Our Gallery
router.post(
  '/create-gallery-image',
  uploadGallery.single('image'),
  createGalleryController,
);
router.get('/get-gallery-image', getAllGalleryImagesController);
router.put(
  '/update-gallery-image/:id',
  uploadGallery.single('image'),
  updateGalleryController,
);
router.delete('/delete-gallery-image/:id', deleteGalleryController);

// ! Our impacts
router.post(
  '/create-impacts',
  uploadOurImpacts.single('image'),
  createOurImpacts,
);
router.get('/get-impacts', getOurImpacts);
router.put(
  '/update-impacts/:id',
  uploadOurImpacts.single('image'),
  updateOurImpacts,
);
router.delete('/delete-impacts/:id', deleteOurImpacts);

// ! Featured Videos
router.post('/create-featured-video', createFeaturedVideo);
router.get('/get-featured-video', getFeaturedVideo);
router.put('/update-featured-video/:id', updateFeaturedVideo);
router.delete('/delete-featured-video/:id', deleteFeaturedVideo);

module.exports = router;
