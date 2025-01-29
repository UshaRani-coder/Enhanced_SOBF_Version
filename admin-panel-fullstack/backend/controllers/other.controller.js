
const { default: mongoose } = require("mongoose");
const { FeaturedVideomodel, LegalDoc } = require("../models/other.model");

//? create a new featured video
const createFeaturedVideo = async (req, res) => {
  try {
    const { URL } = req.body;

    // Validation: Check if URL is provided
    if (!URL) return res.status(400).json({ success: false, message: "Please enter URL." });

    // Validation: Check if URL is a valid YouTube URL
    const regex = /^(https?:\/\/)?(www\.)?(youtube|vimeo)\.(com|tv|in)\/.+$/;
    if (!regex.test(URL)) return res.status(400).json({ success: false, message: "Invalid video URL." });

    const post = new FeaturedVideomodel({ URL });
    await post.save();

    res.status(201).json({
      success: true,
      message: "Featured video post has been created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Featured video post",
      error: error.message,
    });
  }
};

// Update featured video based on its ID
const updateFeaturedVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Validation: Check if URL is provided
    if (!updates.URL) return res.status(400).json({ success: false, message: "Please provide a URL." });

    // Validation: Check if URL is valid
    const regex = /^(https?:\/\/)?(www\.)?(youtube|vimeo)\.(com|tv|in)\/.+$/;
    if (!regex.test(updates.URL)) return res.status(400).json({ success: false, message: "Invalid video URL." });

    const updatedPost = await FeaturedVideomodel.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Featured video post updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating Featured video post",
      error: error.message,
    });
  }
};


//? get a new featured video
const getFeaturedVideo = async (req, res) => {
  try {
    const posts = await FeaturedVideomodel.find({});
    res.status(200).json({ success: true, message: "Successfully fetched all the data of our featured videos from backend.", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching featured videos data from backend.", error: error.message });
  }
}


//? delete featured video based on its ID
const deleteFeaturedVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }

    const post = await FeaturedVideomodel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, message: 'Featured video post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting the featured video post", error: error.message });
  }
}



// Helper function to validate fields
const validateFields = ({ title, description }) => {
  const errors = {};

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    errors.title = 'Title is required and must be at least 3 characters long.';
  }

  if (!description) {
    errors.description = 'Description is required .';
  }
  return errors;
};




// //////////////////////////////////////////////////////////////////////////////////////
// Get all legal documents
const getLegalDocument = async (req, res) => {
  try {
    const docs = await LegalDoc.find({});
    if (docs.length > 0) {
      for (let index = 0; index < docs.length; index++) {
        const doc = docs[index];
        doc.fileName = process.env.BASE_URL + "/uploads/legal-documents/" + doc.fileName;
      }
    }
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all legal documents.',
      docs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching legal documents.',
      error: error.message,
    });
  }
};


// Create a new legal document
const createLegalDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("req.file", req.file)
    // Validate fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    if (req.file.filename === undefined) {
      return res.status(400).json({
        success: false,
        message: 'pdf is required '
      });
    }
    const filename = req.file.filename;

    // Create a new legal document
    const newLegalDoc = new LegalDoc({
      title: title.trim(),
      description: description.trim(),
      fileName: filename
    });

    await newLegalDoc.save();
    newLegalDoc.fileName = process.env.BASE_URL + "/uploads/legal-documents/" + newLegalDoc.fileName;
    res.status(201).json({
      success: true,
      message: "Legal document created successfully.",
      legalDoc: newLegalDoc,
    });
  } catch (error) {
    console.error("Error in createLegalDocument:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the legal document.",
      error: error.message,
    });
  }
};


// Update an existing legal document
const updateLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the document ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID."
      });
    }

    // Find the existing legal document by ID
    const existingDoc = await LegalDoc.findById(id);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Legal document not found.",
      });
    }

    // Extract fields from request body
    const { title, description } = req.body

    // Prepare updated fields
    const updates = {
      title: title?.trim() || existingDoc.title,
      description: description?.trim() || existingDoc.description,
      fileName: req.file ? req.file.filename : existingDoc.fileName,
    };

    // Update the document
    const updatedDoc = await LegalDoc.findByIdAndUpdate(id, updates, { new: true });

    // Append the full file URL
    updatedDoc.fileName = process.env.BASE_URL + "/uploads/legal-documents/" + updatedDoc.fileName;

    return res.status(200).json({
      success: true,
      message: "Legal document updated successfully.",
      updatedDoc,
    });
  } catch (error) {
    console.error("Error in updateLegalDocument:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the legal document.",
      error: error.message,
    });
  }
};





// Delete legal document by ID
const deleteLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid document ID.' });
    }
    const post = await LegalDoc.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ success: false, error: 'Document not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Legal document deleted successfully.',

    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the legal document.',
      error: error.message,
    });
  }
};





module.exports = {
  createFeaturedVideo, getFeaturedVideo, updateFeaturedVideo, deleteFeaturedVideo,
  createLegalDocument, getLegalDocument, updateLegalDocument, deleteLegalDocument,

}