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
  uploadUpcomingEvent,
  uploadDonateFor,
} = require('../middleware/multer');
const { createLegalDocument, updateLegalDocument, deleteLegalDocument, getLegalDocument } = require('../controllers/legaldoc.controller');
const { createFeaturedVideo, getFeaturedVideo, updateFeaturedVideo, deleteFeaturedVideo } = require('../controllers/featuredvideos.controller');
const { createEventPost, getEventPostById, getEventPosts, updateEventPost, deleteEventPost, updateEventStatus } = require('../controllers/upcoming-event.controller');
const { registerUserForEvent, getUsersWithRegisteredEvents, sendingEmailToSelectedUsers } = require('../controllers/event-users.controller');
const { createVolunteer, getAllVolunteers, getVolunteerById, deleteVolunteer } = require('../controllers/volunteer.controller');

const { createOrder, verifyPayment, addDonationCategory, getAllDonationCategories, getDonationCategoryById, updateDonationCategory, deleteDonationCategory } = require('../controllers/donateFor.controller');
const { createSubscriptionOrder, verifySubscriptionPayment, getAllSubscribers } = require('../controllers/subscriber.controller');

const router = express.Router();










// ! Our Team Members  # DONE
router.post('/create-team', uploadTeamMember.single('image'), createTeamMember);
router.get('/get-team', getTeamMembers);
router.put('/update-team/:id', uploadTeamMember.single('image'), updateTeam);
router.delete('/delete-team/:id', deleteTeam);

//! FOR RECENT ACTIVITIES.....    # DONE
router.post('/create-post', uploadRecentActivities.fields([{ name: 'images', maxCount: 5 },]), createPost);
router.get('/get-posts', getPosts);
router.get('/get-post/:id', getPostById);
router.put('/update/:id', uploadRecentActivities.fields([{ name: 'images', maxCount: 5 },]), updatePost,);
router.delete('/delete/:id', deletePost);

// ! Legal documents  ... #DONE
router.post('/create-legal-doc', uploadlegalDocuments.single('file'), createLegalDocument,);
router.get('/get-legal-doc', getLegalDocument);
router.put('/update-legal-doc/:id', uploadlegalDocuments.single('file'), updateLegalDocument,);
router.delete('/delete-legal-doc/:id', deleteLegalDocument);

// ! Our Services endpoint   ... #DONE
router.get('/get-services', getAllServices);
router.post('/create-services',uploadOurServices.fields([
    { name: 'images', maxCount: 5 },
    { name: 'logo', maxCount: 1 },
  ]),
  createService,
);
router.put('/update-services/:id', uploadOurServices.fields([{ name: 'images', maxCount: 5 }, { name: 'logo', maxCount: 1 }]), updateService,);
router.delete('/delete-services/:id', deleteService);

// ! Hero banner
router.post('/create-banner', uploadHeroBanner.single('image'), createHeroBanner,);
router.get('/get-hero-banner', getHeroBanner);
router.put('/update-hero-banner/:id', uploadHeroBanner.single('image'), updateHeroBanner);
router.delete('/delete-hero-banner/:id', deleteHeroBanner);

//! FOR NEWS BULLETINE POST ....
router.post('/create-newspost', uploadNewsBulletine.fields([{ name: 'images', maxCount: 5 }]), createNewsBulletine,);
router.get('/get-newspost', getNewsBulletine);
router.get('/news-bulletine/:id', getNewsBulletineById);
router.put('/update-news-post/:id', uploadNewsBulletine.fields([{ name: 'images', maxCount: 5 }]), updateNewsBulletine);
router.delete('/delete-news-post/:id', deleteNewsBulletine);

// ! Our Gallery
router.post('/create-gallery-image', uploadGallery.single('image'), createGalleryController,);
router.get('/get-gallery-image', getAllGalleryImagesController);
router.put('/update-gallery-image/:id', uploadGallery.single('image'), updateGalleryController,);
router.delete('/delete-gallery-image/:id', deleteGalleryController);

// ! Our impacts
router.post('/create-impacts', uploadOurImpacts.single('image'), createOurImpacts,);
router.get('/get-impacts', getOurImpacts);
router.put('/update-impacts/:id', uploadOurImpacts.single('image'), updateOurImpacts,);
router.delete('/delete-impacts/:id', deleteOurImpacts);

// ! Featured Videos
router.post('/create-featured-video', createFeaturedVideo);
router.get('/get-featured-video', getFeaturedVideo);
router.put('/update-featured-video/:id', updateFeaturedVideo);
router.delete('/delete-featured-video/:id', deleteFeaturedVideo);


//! Upcoming events routes
router.post('/create-upcoming-events', uploadUpcomingEvent.single('image'), createEventPost);
router.get('/get-upcoming-events', getEventPosts);
router.get('/upcoming-events/:id', getEventPostById);
router.put('/update-upcoming-events/:id', uploadUpcomingEvent.single('image'), updateEventPost);
router.put('/update-event-status/:id', updateEventStatus);
router.delete('/delete-upcoming-events/:id', deleteEventPost);

//! registered user for particular events 
router.post('/register-event/:eventId', registerUserForEvent);
router.get("/users-with-events", getUsersWithRegisteredEvents);
router.post("/send-emails-to-selected-users", sendingEmailToSelectedUsers)


//! Volunteer routes
router.post('/create-volunteer', createVolunteer);
router.get('/get-volunteers', getAllVolunteers);
router.delete('/:id', deleteVolunteer);

// !Donate for   # RAZORPAY INTEGRATION 01
router.post('/donatefor', createOrder);
router.post('/verifydonatefor', verifyPayment);
router.post('/create', uploadDonateFor.single('image'), addDonationCategory);
router.get('/', getAllDonationCategories);
router.get("/get-donation-by-id/:id", getDonationCategoryById);
router.put("/update-donation-category/:id", uploadDonateFor.single('image'), updateDonationCategory);
router.delete("/category/:id", deleteDonationCategory);

// ! Subscription routes   # RAZORPAY INTEGRATION 02
router.post('/donateforsubscription', createSubscriptionOrder);
router.post('/verifydonateforsubscription', verifySubscriptionPayment);
router.get('/get-donors', getAllSubscribers);


module.exports = router;



