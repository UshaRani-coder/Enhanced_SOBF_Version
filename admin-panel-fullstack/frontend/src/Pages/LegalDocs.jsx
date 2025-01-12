// Updated Component for Legal Documents
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {
  addLegalDocument,
  updateLegalDocumentById,
  removeLegalDocument,
  getLegalDocuments,
} from '../Reducers/legalDocSlice';

const LegalDoc = () => {
  const dispatch = useDispatch();
  const { legalDocs, status } = useSelector((state) => state.legalDocs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: '',
    file: null,
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLegalDocuments());
    }
  }, [status, dispatch]);

  const handleAddDoc = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.file) formDataToSend.append('file', formData.file);

    dispatch(addLegalDocument(formDataToSend))
      .then(() => toast.success('Successfully added legal document'))
      .catch(() => toast.error('Failed to add legal document'));
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateDoc = () => {
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('description', formData.description);

    // Only append the file if it's selected
    if (formData.file) {
      updatedData.append('file', formData.file);
    }

    dispatch(updateLegalDocumentById({ id: currentDoc._id, updatedData }))
    toast.success('Successfully updated legal document')
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteDoc = (id) => {
    dispatch(removeLegalDocument(id))
      .then(() => toast.success('Successfully deleted legal document'))
      .catch(() => toast.error('Failed to delete legal document'));
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
      title: doc.title || '',
      description: doc.description || '',
      file: doc.file || null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center m-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">Legal Documents</h1>
        <button
          className="text-[12px] md:text-lg px-4 py-1 md:px-6 md:py-2 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Document
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90%] md:max-h-full overflow-y-auto md:overflow-y-none">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Document' : 'Add New Document'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <textarea
                  name="title"
                  value={formData?.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
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
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={isUpdateMode ? handleUpdateDoc : handleAddDoc}
                >
                  {isUpdateMode ? 'Update Document' : 'Add Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* <div className="mt-12 flex flex-wrap justify-evenly gap-4">
        {
          legalDocs.length > 0 ? (
            legalDocs.map((doc) => (
              <div
                key={doc._id}
                className="flex flex-col justify-between mb-8 w-[90%] sm:w-[48%] lg:w-[30%] p-6 border border-gray-300 bg-white shadow-xl rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{doc.title}</h2>
                <p className="text-gray-600 mb-6">{doc.description}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    className="text-blue-600 cursor-pointer"
                    onClick={() => openUpdateModal(doc)}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteDoc(doc._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No documents found.</p>
          )}
      </div> */}
      <div className="mt-12 flex flex-wrap justify-evenly gap-4 max-w-full">
  {
    legalDocs.length > 0 ? (
      legalDocs.map((doc) => (
        <div
          key={doc._id}
          className="flex flex-col justify-between mb-8 w-[90%] sm:w-[48%] lg:w-[30%] p-6 border border-gray-300 bg-white shadow-xl rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">{doc.title}</h2>
          <p className="text-gray-600 mb-6">{doc.description}</p>
          <div className="mt-4 flex gap-4">
            <button
              className="text-blue-600 cursor-pointer"
              onClick={() => openUpdateModal(doc)}
            >
              Update
            </button>
            <button
              className="text-red-600 cursor-pointer"
              onClick={() => handleDeleteDoc(doc._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No documents found.</p>
    )
  }
</div>

    </div>
  );
};

export default LegalDoc;
