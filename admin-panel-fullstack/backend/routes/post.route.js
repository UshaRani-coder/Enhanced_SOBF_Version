const express = require("express");
const {
  deletePost,
  updatePost,
  getPosts,
  createPost,
} = require("../controllers/post.controller");
const upload = require("../middleware/multer");
const {
	uploadMultipleFile,
	uploadSingleFile,
	uploadSinglePDFfile,
	uploadOurServicesFile,
} = require("../middleware/upload");
const {
  createNewsBulletine,
  getNewsBulletine,
  updateNewsBulletine,
  deleteNewsBulletine,
} = require("../controllers/newspost.controller");
const {
  createHeroBanner,
  getHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
} = require("../controllers/hero-banner.controler");
const {
  createOurImpacts,
  getOurImpacts,
  updateOurImpacts,
  deleteOurImpacts,
} = require("../controllers/our-impacts.controller");
const {
  createFeaturedVideo,
  getFeaturedVideo,
  updateFeaturedVideo,
  deleteFeaturedVideo,
  getLegalDocument,
  createLegalDocument,
  updateLegalDocument,
  deleteLegalDocument,
} = require("../controllers/other.controller");
const {
  createTeamMember,
  getTeamMembers,
  updateTeam,
  deleteTeam,
} = require("../controllers/team.controller");

const { createGalleryController, getAllGalleryImagesController, updateGalleryController, deleteGalleryController } = require("../controllers/gallery.controller");
const { getAllServices, createService, updateService, deleteService } = require("../controllers/ourservices.controller");

const router = express.Router();

//! FOR RECENT ACTIVITIES.....
router.post(
	"/create-post",
	upload.fields([
		{ name: "images", maxCount: 5 },
		{ name: "videos", maxCount: 5 },
	]),
	uploadMultipleFile,
	createPost
);
router.get("/get-posts", getPosts);
router.put(
	"/update/:id",
	upload.fields([
		{ name: "images", maxCount: 5 },
		{ name: "videos", maxCount: 5 },
	]),
	uploadMultipleFile,
	updatePost
);
router.delete("/delete/:id", deletePost);

//! FOR NEWS BULLETINE POST ....
router.post("/create-newspost",
	upload.fields([
		{ name: "images", maxCount: 5 },
		{ name: "videos", maxCount: 5 },
	]),
	uploadMultipleFile,
	createNewsBulletine
);
router.get("/get-newspost", getNewsBulletine);
router.put("/update-news-post/:id",
	upload.fields([
		{ name: "images", maxCount: 5 },
		{ name: "videos", maxCount: 5 },
	]), uploadMultipleFile, updateNewsBulletine);
router.delete("/delete-news-post/:id", deleteNewsBulletine);

// ! Hero banner  
router.post("/create-banner", upload.single("image"), uploadSingleFile, createHeroBanner);
router.get("/get-hero-banner", getHeroBanner);
router.put("/update-hero-banner/:id", upload.single("image"), uploadSingleFile, updateHeroBanner);
router.delete("/delete-hero-banner/:id", deleteHeroBanner);

// ! Our impacts
router.post("/create-impacts", upload.single("image"), uploadSingleFile, createOurImpacts);
router.get("/get-impacts", getOurImpacts);
router.put("/update-impacts/:id", upload.single("image"), uploadSingleFile, updateOurImpacts);
router.delete("/delete-impacts/:id", deleteOurImpacts);

// ! Featured Videos
router.post("/create-featured-video", createFeaturedVideo);
router.get("/get-featured-video", getFeaturedVideo);
router.put("/update-featured-video/:id", updateFeaturedVideo);
router.delete("/delete-featured-video/:id", deleteFeaturedVideo);

// ! Legal documents
router.post("/create-legal-doc", upload.single("file"), uploadSinglePDFfile, createLegalDocument);
router.get("/get-legal-doc", getLegalDocument);
router.put("/update-legal-doc/:id", upload.single("file"), uploadSinglePDFfile, updateLegalDocument);
router.delete("/delete-legal-doc/:id", deleteLegalDocument);

// ! Our Team Members
router.post("/create-team", upload.single("image"), uploadSingleFile, createTeamMember);
router.get("/get-team", getTeamMembers);
router.put("/update-team/:id", upload.single("image"), uploadSingleFile, updateTeam);
router.delete("/delete-team/:id", deleteTeam);

// ! Our Gallery
router.post("/create-gallery-image", upload.single("image"), uploadSingleFile, createGalleryController);
router.get("/get-gallery-image", getAllGalleryImagesController);
router.put("/update-gallery-image/:id", upload.single("image"), uploadSingleFile, updateGalleryController);
router.delete("/delete-gallery-image/:id", deleteGalleryController);


// ! Our Services endpoint
router.get("/get-services", getAllServices)
router.post("/create-services", upload.fields([
	{ name: "images", maxCount: 5 }, // For multiple images
	{ name: "logo", maxCount: 1 }, // For the logo
]), uploadOurServicesFile, createService)
router.put("/update-services/:id", upload.fields([
	{ name: "images", maxCount: 5 }, // For multiple images
	{ name: "logo", maxCount: 1 }, // For the logo
]), uploadOurServicesFile, updateService)
router.delete("/delete-services/:id", deleteService)



module.exports = router;