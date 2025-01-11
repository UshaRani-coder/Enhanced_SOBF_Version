// ! Featured Videos

const { default: mongoose } = require("mongoose");
const { FeaturedVideomodel, LegalDoc } = require("../models/other.model");

//? create a new featured video
const createFeaturedVideo = async (req, res) => {
  try {
    const { URL } = req.body;
    if (!URL) res.status(404).json({ success: false, message: "Please enter URL." });
    const post = new FeaturedVideomodel({ URL });
    await post.save();
    res.status(201).json({
      success: true,
      message: 'Featured video post has been created successfully',
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

//? get a new featured video
const getFeaturedVideo = async (req, res) => {
  try {
    const posts = await FeaturedVideomodel.find({})
    res.status(200).json({ success: true, message: "successfully fetched all the data of our featured videos from backend .", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching featured videos data from backend side .", error: error.message });
  }
}

//? update featured video based on its ID
const updateFeaturedVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    const URL = req.image;
    if (URL) updates.URL = URL
    const updatedPost = await FeaturedVideomodel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: ' our impacts  post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while updating our impacts post", error: error.message });
  }
}

//? delete featured video based on its ID
const deleteFeaturedVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    const post = await FeaturedVideomodel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Featured Video post has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting our impacts  post", error: error.message });
  }
}

//! Adding new legal documents

//? create a new legal documents
const createLegalDocument = async (req, res) => {
  try {
    const { title,description } = req.body;

    // Validate fields
    if (!description, !title) {
      return res.status(400).json({ error: 'Description is required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    // File path from multer
    const filePath = req.file.path; // Path where the file is stored
    const filename = req.file.filename;

    // Create a new legal document
    const post = new LegalDoc({
      title,
      description,
      filePath,
      filename,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Legal document created successfully',
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while creating legal document',
      error: error.message,
    });
  }
};




//? get a new legal documents
const getLegalDocument = async (req, res) => {
  try {
    const posts = await LegalDoc.find({})
    res.status(200).json({ success: true, message: "successfully fetched all the data of our impacts from backend .", posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while fetching our impacts data from backend side .", error: error.message });
  }
}

//? update legal documents based on its ID
const updateLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (req.image) {
      updates.filePath = req.image;
    } else {
      const existingDoc = await LegalDoc.findById(id);
      if (existingDoc) {
        updates.filePath = existingDoc.filePath; // Keep the previous file path
      }
    }

    // Update the document
    const updatedDoc = await LegalDoc.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedDoc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Legal document updated successfully',
      updatedDoc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the legal document",
      error: error.message
    });
  }
};


//? delete legal documents based on its ID
const deleteLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    const post = await LegalDoc.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Our impacts post has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong while deleting our impacts  post", error: error.message });
  }
}



module.exports = {
  createFeaturedVideo ,  getFeaturedVideo , updateFeaturedVideo , deleteFeaturedVideo , 
  createLegalDocument, getLegalDocument, updateLegalDocument, deleteLegalDocument,

}