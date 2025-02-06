import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { MdEdit, MdDelete, MdPreview } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  addLegalDocument,
  getLegalDocuments,
  removeLegalDocument,
  updateLegalDocumentById,
} from '../Reducers/legalDocSlice';

const LegalDoc = () => {
  const dispatch = useDispatch();
  const { legalDocs, status } = useSelector((state) => state.legalDocs);
const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLegalDocuments()).unwrap();
    }
  }, [status, dispatch]);

  // ? all validations are here
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required.');
      return false;
    }
    if (!isUpdateMode && !formData.file) {
      toast.error('File is required for new documents.');
      return false;
    }
    if (formData.file && formData.file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed.');
      return false;
    }
    return true;
  };

  //? adding post
  const handleAddDoc = () => {
    if (!validateForm()) return;
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.file) formDataToSend.append('file', formData.file);
    setIsLoading(true); 
    dispatch(addLegalDocument(formDataToSend))
      .unwrap()
      .then(() => toast.success('Successfully added legal document'))
      .catch(() => toast.error('Error adding document'));
    setIsModalOpen(false);
    setIsLoading(false);
    resetForm();
    dispatch(getLegalDocuments()).unwrap();
  };

  // ? updating post
  const handleUpdateDoc = async () => {
    if (!validateForm()) return;
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('description', formData.description);
    if (formData.file) updatedData.append('file', formData.file);

    try {
      setIsLoading(true);
      await dispatch(
        updateLegalDocumentById({ id: currentDoc._id, updatedData }),
      ).unwrap();
      toast.success('Successfully updated legal document');
      dispatch(getLegalDocuments()).unwrap();
    } catch {
      toast.error('Error while updating document');
    } finally {
      setIsModalOpen(false);
      resetForm();
      setIsLoading(false);
    }
  };

  // ? deleting post
  const handleDeleteDoc = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this legal document? This action cannot be undone.',
    );
    if (confirmDelete) {
      setIsLoading(true);
      dispatch(removeLegalDocument(id))
        .unwrap()
        .then(() => toast.success('Document deleted successfully!'))
        .catch(() => toast.error('Failed to delete legal document'));
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, file: files[0] }));
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', file: null });
    setCurrentDoc(null);
  };

  const openUpdateModal = (doc) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentDoc(doc);
    setFormData({
      title: doc?.title || '',
      description: doc?.description || '',
      file: null,
    });
  };

  const handlePreview = (fileUrl) => {
    setPreviewPdf(fileUrl);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center m-4">
        <h1 className="text-xl small-range:text-2xl small-max:text-3xl lg:text-4xl font-semibold">
          Legal Documents
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl "
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Document
        </button>
      </div>

      {previewPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 h-3/4">
            <button
              onClick={() => setPreviewPdf(null)}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <Viewer fileUrl={previewPdf} />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Document' : 'Add New Document'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter title of the document"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter the description..."
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">File</label>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                  onClick={isUpdateMode ? handleUpdateDoc : handleAddDoc}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      ></svg>
                      Processing...
                    </span>
                  ) : isUpdateMode ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-12 flex flex-wrap justify-center gap-4 lg:gap-10">
        {legalDocs && legalDocs?.length > 0 ? (
          legalDocs?.map((doc) => (
            <div
              key={doc?._id}
              className="border p-4 rounded w-[90%] small-range:w-[80%] sm:w-[48%] lg:w-[35%] hover:shadow-lg transition-shadow duration-300 flex-wrap flex flex-col items-center"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 line-clamp-2 text-left w-[100%]">
                {doc?.title}
              </h2>
              <p className="text-gray-600 line-clamp-4 mb-6 text-left w-full">
                {doc?.description}
              </p>
              <div className="mt-4 flex gap-4 flex-wrap justify-end w-full">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => openUpdateModal(doc)}
                >
                  <MdEdit className="text-blue-800 text-2xl" />
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => handleDeleteDoc(doc?._id)}
                >
                  <MdDelete className="text-red-800 text-2xl" />
                </button>
                {/* <Link to={doc?.fileName} target="_blank"
                  className="bg-green-100 text-green-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2"
                >
                  <MdPreview className="text-green-800 text-2xl" /> 
                </Link> */}
                <Link
                  to={doc?.fileName}
                  target="_blank"
                  className="bg-green-100 text-green-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2 shadow-lg transition duration-300 ease-in-out hover:bg-green-200 hover:shadow-xl"
                >
                  <MdPreview className="text-green-800 text-2xl" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No documents found.</p>
        )}
      </div>
    </div>
  );
};

export default LegalDoc;
