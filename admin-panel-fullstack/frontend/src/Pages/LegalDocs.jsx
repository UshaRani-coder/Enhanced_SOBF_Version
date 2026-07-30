
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getLegalDocuments,
  removeLegalDocument,
} from '../reducers/legalDocSlice';

import LegalDocModal from '../components/LegalDocs/LegalDocModal';
import LegalDocList from '../components/LegalDocs/LegalDocList';
import PdfPreviewModal from '../components/LegalDocs/PdfPreviewModal';

import useLegalDocForm from '../hooks/useLegalDocForm';

const LegalDoc = () => {
  const dispatch = useDispatch();

  const { legalDocs, status } = useSelector(
    (state) => state.legalDocs
  );

  const maxLength = 150;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);

  const [previewPdf, setPreviewPdf] = useState(null);

  const {
    formData,
    isLoading,
    handleInputChange,
    handleFileChange,
    handleAddDoc,
    handleUpdateDoc,
    resetForm,
    populateForm,
  } = useLegalDocForm(dispatch);


  // Fetch documents
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLegalDocuments());
    }
  }, [status, dispatch]);


  // Open Add Modal
  const openAddModal = () => {
    resetForm();

    setCurrentDoc(null);
    setIsUpdateMode(false);
    setIsModalOpen(true);
  };


  // Open Update Modal
  const openUpdateModal = (doc) => {
    setCurrentDoc(doc);
    setIsUpdateMode(true);

    populateForm(doc);

    setIsModalOpen(true);
  };


  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);

    setIsUpdateMode(false);

    setCurrentDoc(null);

    resetForm();
  };


  // Add Document
  const handleAdd = async () => {
    const success = await handleAddDoc();

    if (success) {
      closeModal();
    }
  };


  // Update Document
  const handleUpdate = async () => {
    const success = await handleUpdateDoc(
      currentDoc?._id
    );

    if (success) {
      closeModal();
    }
  };


  // Delete Document
  const handleDeleteDoc = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this legal document? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      await dispatch(removeLegalDocument(id)).unwrap();

      toast.success(
        'Document deleted successfully!'
      );
    } catch (error) {
      toast.error(
        error || 'Failed to delete document'
      );
    }
  };


  return (
    <div className="container mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center m-4">

        <h1 className="text-xl small-range:text-2xl lg:text-4xl font-semibold">
          Legal Documents
        </h1>


        <button
          onClick={openAddModal}
          className="
          bg-gradient-to-r 
          from-indigo-600 
          via-purple-600 
          to-pink-500 
          text-white 
          px-3 py-1.5 
          small-max:px-4 
          small-max:py-1.5 
          text-[12px] 
          small-max:text-[16px] 
          font-semibold 
          rounded-3xl 
          shadow-lg 
          transition-all 
          duration-300 
          hover:scale-105 
          hover:shadow-2xl"
        >
          Add Document
        </button>

      </div>



      {/* PDF Preview */}

      <PdfPreviewModal
        isOpen={Boolean(previewPdf)}
        pdfUrl={previewPdf}
        onClose={() => setPreviewPdf(null)}
      />



      {/* Add / Update Modal */}

      <LegalDocModal
        isOpen={isModalOpen}
        isUpdateMode={isUpdateMode}
        currentDoc={currentDoc}

        formData={formData}
        maxLength={maxLength}

        isLoading={isLoading}

        onInputChange={handleInputChange}
        onFileChange={handleFileChange}

        onClose={closeModal}

        onSubmit={
          isUpdateMode
            ? handleUpdate
            : handleAdd
        }
      />



      {/* Documents */}

      <LegalDocList
        legalDocs={legalDocs}
        onEdit={openUpdateModal}
        onDelete={handleDeleteDoc}
        onPreview={setPreviewPdf}
      />

    </div>
  );
};


export default LegalDoc;