const express = require('express');
const {
  heroUpload,
  teamUpload,
  galleryUpload,
  impactsUpload,
  eventsUpload,
  legalDocsUpload,
  recentActivitiesUpload,
  newsUpload,
  servicesUpload,
  donationsUpload
} = require('../middleware/uploadCloudinary');
const router = express.Router();

// Controllers
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

const {
  createEventPost,
  getEventPostById,
  getEventPosts,
  updateEventPost,
  deleteEventPost,
 
} = require('../controllers/upcoming-event.controller');

const {
  registerUserForEvent,
  getUsersWithRegisteredEvents,
  sendingEmailToSelectedUsers,
} = require('../controllers/event-users.controller');

const {
  createVolunteer,
  getAllVolunteers,
  deleteVolunteer,
} = require('../controllers/volunteer.controller');

const {
  createOrder,
  verifyPayment,
  addDonationCategory,
  getAllDonationCategories,
  getDonationCategoryById,
  updateDonationCategory,
  deleteDonationCategory,
} = require('../controllers/donateFor.controller');

const {
  createSubscriptionOrder,
  verifySubscriptionPayment,
  getAllSubscribers,
} = require('../controllers/subscriber.controller');

/* =========================
   TEAM MEMBERS
========================= */
router.post('/create-team', teamUpload.single('image'), createTeamMember);
router.get('/get-team', getTeamMembers);
router.put('/update-team/:id', teamUpload.single('image'), updateTeam);
router.delete('/delete-team/:id', deleteTeam);

/* =========================
   RECENT ACTIVITIES
========================= */
router.post(
  '/create-post',
  recentActivitiesUpload.fields([{ name: 'images', maxCount: 5 }]),
  createPost,
);

router.get('/get-posts', getPosts);
router.get('/get-post/:id', getPostById);

router.put(
  '/update/:id',
  recentActivitiesUpload.fields([{ name: 'images', maxCount: 5 }]),
  updatePost,
);

router.delete('/delete/:id', deletePost);

/* =========================
   LEGAL DOCUMENTS
========================= */
router.post(
  '/create-legal-doc',
  legalDocsUpload.single('file'),
  createLegalDocument,
);
router.get('/get-legal-doc', getLegalDocument);
router.put(
  '/update-legal-doc/:id',
  legalDocsUpload.single('file'),
  updateLegalDocument,
);
router.delete('/delete-legal-doc/:id', deleteLegalDocument);

/* =========================
   SERVICES
========================= */
router.get('/get-services', getAllServices);

router.post(
  '/create-services',
  servicesUpload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'logo', maxCount: 1 },
  ]),
  createService,
);

router.put(
  '/update-services/:id',
  servicesUpload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'logo', maxCount: 1 },
  ]),
  updateService,
);

router.delete('/delete-services/:id', deleteService);

/* =========================
   HERO BANNER
========================= */
router.post('/create-banner', heroUpload.single('image'), createHeroBanner);
router.get('/get-hero-banner', getHeroBanner);
router.put(
  '/update-hero-banner/:id',
  heroUpload.single('image'),
  updateHeroBanner,
);
router.delete('/delete-hero-banner/:id', deleteHeroBanner);

/* =========================
   NEWS BULLETINE
========================= */
router.post(
  '/create-newspost',
  newsUpload.fields([{ name: 'images', maxCount: 5 }]),
  createNewsBulletine,
);

router.get('/get-newspost', getNewsBulletine);
router.get('/news-bulletine/:id', getNewsBulletineById);

router.put(
  '/update-news-post/:id',
  newsUpload.fields([{ name: 'images', maxCount: 5 }]),
  updateNewsBulletine,
);

router.delete('/delete-news-post/:id', deleteNewsBulletine);

/* =========================
   GALLERY
========================= */
router.post(
  '/create-gallery-image',
  galleryUpload.single('image'),
  createGalleryController,
);
router.get('/get-gallery-image', getAllGalleryImagesController);
router.put(
  '/update-gallery-image/:id',
  galleryUpload.single('image'),
  updateGalleryController,
);
router.delete('/delete-gallery-image/:id', deleteGalleryController);

/* =========================
   IMPACTS
========================= */
router.post('/create-impacts', impactsUpload.single('image'), createOurImpacts);
router.get('/get-impacts', getOurImpacts);
router.put(
  '/update-impacts/:id',
  impactsUpload.single('image'),
  updateOurImpacts,
);
router.delete('/delete-impacts/:id', deleteOurImpacts);

/* =========================
   FEATURED VIDEOS
========================= */
router.post('/create-featured-video', createFeaturedVideo);
router.get('/get-featured-video', getFeaturedVideo);
router.put('/update-featured-video/:id', updateFeaturedVideo);
router.delete('/delete-featured-video/:id', deleteFeaturedVideo);

/* =========================
   UPCOMING EVENTS
========================= */
router.post(
  '/create-upcoming-events',
  eventsUpload.single('image'),
  createEventPost,
);
router.get('/get-upcoming-events', getEventPosts);
router.get('/upcoming-events/:id', getEventPostById);
router.put(
  '/update-upcoming-events/:id',
  eventsUpload.single('image'),
  updateEventPost,
);

router.delete('/delete-upcoming-events/:id', deleteEventPost);

/* =========================
   EVENT USERS
========================= */
router.post('/register-event/:eventId', registerUserForEvent);
router.get('/users-with-events', getUsersWithRegisteredEvents);
router.post('/send-emails-to-selected-users', sendingEmailToSelectedUsers);

/* =========================
   DONATIONS
========================= */
router.post('/donatefor', createOrder);
router.post('/verifydonatefor', verifyPayment);

router.post('/create', donationsUpload.single('image'), addDonationCategory);

router.get('/get-donation', getAllDonationCategories);

router.get('/get-donation-by-id/:id', getDonationCategoryById);

router.put(
  '/update-donation-category/:id',
  donationsUpload.single('image'),
  updateDonationCategory,
);

router.delete('/category/:id', deleteDonationCategory);

/* =========================
   SUBSCRIPTIONS
========================= */
router.post('/donateforsubscription', createSubscriptionOrder);
router.post('/verifydonateforsubscription', verifySubscriptionPayment);
router.get('/get-donors', getAllSubscribers);

/* =========================
   VOLUNTEERS
========================= */
router.post('/create-volunteer', createVolunteer);
router.get('/get-volunteers', getAllVolunteers);
// router.delete('/:id', deleteVolunteer);
router.delete('/delete-volunteer/:id', deleteVolunteer);

module.exports = router;
