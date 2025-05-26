const { logger } = require("../middleware/nodemailer");
const DonationCategoryModel = require("../models/donateFor.model");

const addDonationCategory = async (req, res) => {
  try {
    // Get text fields from body
    const { title, description, raised, goal } = req.body;
    // Get file details
    const filename = req?.file?.filename;
    if (req.file.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Image is required ',
      });
    }
    // Create new category with file path
    const newCategory = new DonationCategoryModel({
      title,
      description,
      image: filename, // Use the stored filename
      raised,
      goal,
    });

    const savedCategory = await newCategory.save();
    savedCategory.image = "https://backend.sobf.in" + '/uploads/gallery/' + savedCategory.image;
    // savedCategory.image = "http://localhost:5000" + '/uploads/donateFor/' + savedCategory.image;
    res.status(201).json({
      success: true,
      message: 'Post has been created successfully',
      savedCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all donation categories
const getAllDonationCategories = async (req, res) => {
  try {
    const categories = await DonationCategoryModel.find({});

    if (categories.length > 0) {
      // Process each category to update image URLs
      const processedCategories = categories.map(category => {
        // Create a new object with the updated image URL
        return {
          ...category.toObject(),
          image: "https://backend.sobf.in" + '/uploads/donateFor/' + category.image
          // For local testing:
          // image: "http://localhost:5000" + '/uploads/donateFor/' + category.image
        };
      });

      res.status(200).json({
        success: true,
        message: 'Donation categories retrieved successfully',
        categories: processedCategories,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'No donation categories found',
        categories: [],
      });
    }
  } catch (error) {
    logger.error("Something went wrong while retrieving donation categories.");
    res.status(500).json({
      success: false,
      message: 'Something went wrong while retrieving donation categories',
      error: error.message
    });
  }
};

// Get a single donation category by ID
const getDonationCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await DonationCategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Donation category not found."
      });
    }

    // Update the image URL
    const processedCategory = {
      ...category.toObject(),
      image: "https://backend.sobf.in" + '/uploads/donateFor/' + category.image
      // For local testing:
      // image: "http://localhost:5000" + '/uploads/donateFor/' + category.image
    };

    res.status(200).json({
      success: true,
      message: 'Donation category retrieved successfully',
      category: processedCategory,
    });
  } catch (error) {
    logger.error("Error retrieving donation category:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add a user (donor) to a donation category
const addUserToCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, phone_no, pan_no, aadhar_no, address } = req.body;

    // Manual validation
    if (!fullname || !email || !phone_no || !pan_no || !aadhar_no || !address) {
      return res.status(400).json({
        success: false,
        error: "All fields are required."
      });
    }

    // Simple format validation
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format."
      });
    }

    if (phone_no.length !== 10 || isNaN(phone_no)) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number."
      });
    }

    if (aadhar_no.length !== 12 || isNaN(aadhar_no)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Aadhar number."
      });
    }

    if (pan_no.length !== 10) {
      return res.status(400).json({
        success: false,
        error: "Invalid PAN number format."
      });
    }

    const user = { fullname, email, phone_no, pan_no, aadhar_no, address };
    logger.info("User details:", user);

    const updatedCategory = await DonationCategoryModel.findByIdAndUpdate(
      id,
      { $push: { donor: user } },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Update the image URL in the response
    const processedCategory = {
      ...updatedCategory.toObject(),
      image: "https://backend.sobf.in" + '/uploads/donate/' + updatedCategory.image
      // For local testing:
      // image: "http://localhost:5000" + '/uploads/donate/' + updatedCategory.image
    };

    res.status(200).json({
      success: true,
      message: 'User added to category successfully',
      category: processedCategory,
    });
  } catch (error) {
    logger.error("Error adding user to category:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateDonationCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, raised, goal } = req.body;
    const updatedFields = { title, description, raised, goal };

    // If a new image is uploaded
    if (req.file && req.file.filename) {
      updatedFields.image = req.file.filename;
    }

    const updatedCategory = await DonationCategoryModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Donation category not found",
      });
    }

    // Append full image path in response
    updatedCategory.image = "https://backend.sobf.in" + '/uploads/donateFor/' + updatedCategory.image;

    res.status(200).json({
      success: true,
      message: "Donation category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    logger.error("Error updating donation category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update donation category",
      error: error.message,
    });
  }
};


const deleteDonationCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await DonationCategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Donation category not found",
      });
    }

    // Remove the category from database
    await DonationCategoryModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Donation category deleted successfully",
    });
  } catch (error) {
    logger.error("Error deleting donation category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete donation category",
      error: error.message,
    });
  }
}


module.exports = {
  addDonationCategory,
  getAllDonationCategories,
  addUserToCategory,
  getDonationCategoryById,
  updateDonationCategory,
  deleteDonationCategory
}