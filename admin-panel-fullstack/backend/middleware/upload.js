const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");
const fs = require("fs");

cloudinary.config({
	cloud_name: "dgua57bwf",
	api_key: "575246365656966",
	api_secret: "oshbw_mwIoK6Cl8pJCXaRnDEZ8o",
});





// ! Middleware to upload  file (image or video) like recent activites or  news bulletines
const uploadMultipleFile = asyncHandler(async (req, res, next) => {
	try {
		if (!req.files || !req.files.images) {
			return next();
		}

		const images = req.files.images;

		// Check if more than 5 images are uploaded
		if (images.length > 5) {
			return res.status(400).json({ msg: "You can upload a maximum of 5 images." });
		}

		// Upload images to Cloudinary
		const imageURLs = [];
		for (const image of images) {
			const uploadResult = await cloudinary.uploader.upload(image.path, {
				resource_type: "image",
			});
			imageURLs.push(uploadResult.secure_url);
		}

		// Attach image URLs to the request object
		req.images = imageURLs;
		next();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal error during file upload.", error: error.message });
	}
});


// This is only single images like in hero banner , our team and our impacts ...
const uploadSingleFile = asyncHandler(async (req, res, next) => {
	try {
		if (!req.file) {
			return next();
		}
		const file = req.file;
		const result = await cloudinary.uploader.upload(file.path, {
			resource_type: "auto",
		});
		req.image = result.secure_url;
		next();
	} catch (error) {
		console.log(">>>> error check in upload single file", error)
		res.status(500).json({
			message: "Internal error in uploadSingleFile middleware",
			error: error.message,
		});
	}
});


// this is only for legal document pdf files 
const uploadSinglePDFfile = asyncHandler(async (req, res, next) => {
	try {
		if (!req.file) {
			return next();
		}

		const file = req.file;

		// Upload file to Cloudinary
		const result = await cloudinary.uploader.upload(file.path, {
			resource_type: "raw", // Use "raw" for non-image files like PDFs
			folder: "legal_documents", // Optional folder for organization
		});

		// Attach Cloudinary URL and public ID to the request object
		req.fileUrl = result.secure_url;
		req.publicId = result.public_id;

		// Clean up the local file after upload
		fs.unlinkSync(file.path);

		next();
	} catch (error) {
		console.error("Error in uploadSinglePDFfile middleware:", error);
		res.status(500).json({
			message: "Internal error during file upload",
			error: error.message,
		});
	}
});



// ? this is for our services ..
const uploadOurServicesFile = asyncHandler(async (req, res, next) => {
	try {
		// Check for both logo and images
		const { images, logo } = req.files || {};

		if (!req.file) {
			return next();
		}

		// Check if more than 5 images are uploaded
		if (images.length > 5) {
			return res.status(400).json({ msg: "You can upload a maximum of 5 images." });
		}

		// Upload images to Cloudinary
		const imageURLs = [];
		for (const image of images) {
			const uploadResult = await cloudinary.uploader.upload(image.path, {
				resource_type: "image",
			});
			imageURLs.push(uploadResult.secure_url);
		}

		// Upload logo to Cloudinary
		const logoUploadResult = await cloudinary.uploader.upload(logo[0].path, {
			resource_type: "image",
		});

		// Attach uploaded URLs to the request object
		req.images = imageURLs;
		req.logo = logoUploadResult.secure_url;

		next();
	} catch (error) {
		res.status(500).json({
			message: "Internal error during file upload.",
			error: error.message,
		});
	}
});



module.exports = { uploadMultipleFile, uploadSingleFile, uploadSinglePDFfile, uploadOurServicesFile };
