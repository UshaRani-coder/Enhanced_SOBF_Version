const express = require('express');
const { deletePost, updatePost, getPosts, createPost } = require('../controllers/post.controller');
const upload = require('../middleware/multer');
const { uploadMultipleFile, uploadSingleFile } = require('../middleware/upload');
const { createNewsBulletine, getNewsBulletine, updateNewsBulletine, deleteNewsBulletine } = require('../controllers/newspost.controller');
const { createHeroBanner, getHeroBanner, updateHeroBanner, deleteHeroBanner } = require('../controllers/hero-banner.controler');
const { createOurImpacts, getOurImpacts, updateOurImpacts, deleteOurImpacts } = require('../controllers/our-impacts.controller');
const { createFeaturedVideo, getFeaturedVideo, updateFeaturedVideo, deleteFeaturedVideo, getLegalDocument, createLegalDocument, updateLegalDocument, deleteLegalDocument } = require('../controllers/other.controller');
const { createTeamMember, getTeamMembers, updateTeam, deleteTeam } = require('../controllers/team.controller');
const { createGallery, getGallery, updateGallery, deleteGallery } = require('../controllers/gallery.controller');
const protectedRoute = require('../middleware/auth');
const router = express.Router();



//! FOR RECENT ACTIVITIES..... 
router.post('/create-post', protectedRoute, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), uploadMultipleFile, createPost); 
router.get('/get-posts', getPosts); 
router.put('/update/:id', protectedRoute, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), uploadMultipleFile, updatePost); 
router.delete('/delete/:id', protectedRoute, deletePost);



//! FOR NEWS BULLETINE POST .... 
router.post('/create-newspost', protectedRoute, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), uploadMultipleFile, createNewsBulletine);
router.get('/get-newspost', getNewsBulletine);
router.put('/update-news-post/:id', protectedRoute, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), uploadMultipleFile, updateNewsBulletine);
router.delete('/delete-news-post/:id', protectedRoute, deleteNewsBulletine);



// ! Hero banner 
router.post("/create-banner", protectedRoute, upload.single('image'), uploadSingleFile, createHeroBanner)
router.get("/get-hero-banner",  getHeroBanner)
router.put("/update-hero-banner/:id", upload.single('image'), uploadSingleFile, updateHeroBanner)
router.delete("/delete-hero-banner/:id", protectedRoute, deleteHeroBanner)



// ! Our impacts 
router.post("/create-impacts", protectedRoute, upload.single('image'), uploadSingleFile, createOurImpacts)
router.get("/get-impacts", getOurImpacts)
router.put("/update-impacts/:id", protectedRoute, upload.single('image'), uploadSingleFile, updateOurImpacts)
router.delete("/delete-impacts/:id", protectedRoute, deleteOurImpacts)


// ! Featured Videos
router.post("/create-featured-video", protectedRoute, createFeaturedVideo)
router.get("/get-featured-video", getFeaturedVideo)
router.put("/update-featured-video/:id", protectedRoute, updateFeaturedVideo)
router.delete("/delete-featured-video/:id", protectedRoute, deleteFeaturedVideo)



// ! Legal documents 
router.post("/create-legal-doc", protectedRoute, upload.single('file'), uploadSingleFile, createLegalDocument)
router.get("/get-legal-doc", getLegalDocument)
router.put("/update-legal-doc/:id", protectedRoute, upload.single('file'), uploadSingleFile, updateLegalDocument)
router.delete("/delete-legal-doc/:id", protectedRoute, deleteLegalDocument)



// ! Our Team Members 
router.post("/create-team", protectedRoute, upload.single('image'), uploadSingleFile, createTeamMember)
router.get("/get-team", getTeamMembers)
router.put("/update-team/:id", protectedRoute, upload.single('image'), uploadSingleFile, updateTeam)
router.delete("/delete-team/:id", protectedRoute, deleteTeam)


// ! Our Gallery  
router.post("/create-gallery-image", protectedRoute, upload.single('image'), uploadSingleFile, createGallery)
router.get("/get-gallery-image", getGallery)
router.put("/update-gallery-image/:id", protectedRoute, upload.single('image'), uploadSingleFile, updateGallery)
router.delete("/delete-gallery-image/:id", protectedRoute, deleteGallery)

module.exports = router;
