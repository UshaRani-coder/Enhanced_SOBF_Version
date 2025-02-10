const { default: mongoose } = require("mongoose");
const { LegalDoc } = require("../models/other.model");

//? Get all legal documents
const getLegalDocument = async (req, res) => {
  try {
    // Fetch all legal documents from the database
    const docs = await LegalDoc.find({});

    // Append full file URL to each document
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
      message: 'Something went wrong while fetching legal documents.'
    });
  }
};

//? Create a new legal document
const createLegalDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("req.file", req.file);

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    // Validate if a file is uploaded
    if (!req.file || !req.file.filename) {
      return res.status(400).json({
        success: false,
        message: 'PDF is required.'
      });
    }
    const filename = req.file.filename;

    // Create a new legal document instance
    const newLegalDoc = new LegalDoc({
      title: title.trim(),
      description: description.trim(),
      fileName: filename
    });

    // Save the document to the database
    await newLegalDoc.save();

    // Append full file URL
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
      message: "Something went wrong while creating the legal document."
    });
  }
};

//? Update an existing legal document
const updateLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate document ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID."
      });
    }

    // Fetch the existing document from the database
    const existingDoc = await LegalDoc.findById(id);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Legal document not found.",
      });
    }

    // Extract updated fields from request body
    const { title, description } = req.body;

    // Prepare updated document fields
    const updates = {
      title: title?.trim() || existingDoc.title,
      description: description?.trim() || existingDoc.description,
      fileName: req.file ? req.file.filename : existingDoc.fileName,
    };

    // Update the document in the database
    const updatedDoc = await LegalDoc.findByIdAndUpdate(id, updates, { new: true });

    // Append full file URL
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
      message: "Something went wrong while updating the legal document."
    });
  }
};

//? Delete a legal document by ID
const deleteLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate document ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid document ID.' });
    }

    // Find and delete the document from the database
    const post = await LegalDoc.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Legal document deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the legal document.'
    });
  }
};

//? Export all controller functions
module.exports = {
  createLegalDocument,
  getLegalDocument,
  updateLegalDocument,
  deleteLegalDocument,
};
