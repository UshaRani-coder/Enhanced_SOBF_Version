const mongoose = require('mongoose');
const { LegalDoc } = require('../models/other.model');
const logger = require('../logger');


// ================= GET =================
const getLegalDocument = async (req, res) => {
  try {
    const docs = await LegalDoc.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      docs,
    });
  } catch (error) {
    logger.error(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch legal documents',
    });
  }
};


// ================= CREATE =================
const createLegalDocument = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    // correct cloudinary multer check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required',
      });
    }

    const newLegalDoc = await LegalDoc.create({
      title: title.trim(),
      description: description.trim(),

      // Cloudinary storage output
      fileName: req.file.path,
      public_id: req.file.filename,
    });

    return res.status(201).json({
      success: true,
      message: 'Legal document created successfully',
      legalDoc: newLegalDoc,
    });

  } catch (error) {
    console.log("CREATE LEGAL DOC ERROR:", error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating legal document',
    });
  }
};


// ================= UPDATE =================
const updateLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document ID',
      });
    }

    const existingDoc = await LegalDoc.findById(id);

    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Legal document not found',
      });
    }

    const updatedFields = {
      title: req.body.title?.trim() || existingDoc.title,
      description:
        req.body.description?.trim() || existingDoc.description,
    };

    // IF NEW FILE UPLOADED
    if (req.fileUrl) {
      updatedFields.fileName = req.fileUrl;
      updatedFields.public_id = req.publicId;
    }

    const updatedDoc = await LegalDoc.findByIdAndUpdate(
  req.params.id,
  {
    title: req.body.title,
    description: req.body.description,
    ...(req.file && { fileName: req.file.path }),
  },
  { new: true } 
);

    return res.status(200).json({
      success: true,
      message: 'Legal document updated successfully',
      updatedDoc,
    });
  } catch (error) {
    console.log(error);

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update legal document',
    });
  }
};


// ================= DELETE =================
const deleteLegalDocument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document ID',
      });
    }

    const deletedDoc = await LegalDoc.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({
        success: false,
        message: 'Document not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Legal document deleted successfully',
    });
  } catch (error) {
    console.log(error);

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete legal document',
    });
  }
};

module.exports = {
  createLegalDocument,
  getLegalDocument,
  updateLegalDocument,
  deleteLegalDocument,
};