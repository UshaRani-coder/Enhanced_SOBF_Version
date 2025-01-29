import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { MdEdit, MdDelete, MdPreview } from "react-icons/md";
import { Link } from "react-router-dom";
import { addLegalDocument, getLegalDocuments, removeLegalDocument, updateLegalDocumentById, } from "../Reducers/legalDocSlice";




const LegalDoc = () => {
  const dispatch = useDispatch();
  const { legalDocs, status } = useSelector((state) => state.legalDocs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getLegalDocuments()).unwrap();
    }
  }, [status, dispatch]);


  // ? all validations are here
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return false;
    }
    if (!isUpdateMode && !formData.file) {
      toast.error("File is required for new documents.");
      return false;
    }
    if (formData.file && formData.file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return false;
    }
    return true;
  };

  //? adding post 
  const handleAddDoc = () => {
    if (!validateForm()) return;
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.file) formDataToSend.append("file", formData.file);

    dispatch(addLegalDocument(formDataToSend))
      .unwrap()
      .then(() => toast.success("Successfully added legal document"))
      .catch(() => toast.error("Error adding document"));
    setIsModalOpen(false);
    resetForm();
    dispatch(getLegalDocuments()).unwrap();
  };


  // ? updating post 
  const handleUpdateDoc = async () => {
    if (!validateForm()) return;
    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("description", formData.description);
    if (formData.file) updatedData.append("file", formData.file);

    try {
      await dispatch(
        updateLegalDocumentById({ id: currentDoc._id, updatedData })
      ).unwrap();
      toast.success("Successfully updated legal document")
      dispatch(getLegalDocuments()).unwrap();
    } catch {
      toast.error("Error while updating document");
    } finally {
      setIsModalOpen(false);
      resetForm();
    }
  };

  // ? deleting post
  const handleDeleteDoc = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this legal document? This action cannot be undone."
    );
    if (confirmDelete) {
      dispatch(removeLegalDocument(id))
        .unwrap()
        .then(() => toast.success("Document deleted successfully!"))
        .catch(() => toast.error("Failed to delete legal document"));
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
    setFormData({ title: "", description: "", file: null });
    setCurrentDoc(null);
  };

  const openUpdateModal = (doc) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentDoc(doc);
    setFormData({
      title: doc?.title || "",
      description: doc?.description || "",
      file: null,
    });
  };

  const handlePreview = (fileUrl) => {
    setPreviewPdf(fileUrl);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center m-4">
        <h1 className="text-3xl font-semibold">Legal Documents</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-3 text-lg font-semibold rounded-3xl shadow-lg transition-all hover:scale-105"
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
              {isUpdateMode ? "Update Document" : "Add New Document"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter title of document here"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter description here..."
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
                  {isUpdateMode ? "Update Document" : "Add Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {legalDocs && legalDocs?.length > 0 ? (
          legalDocs?.map((doc) => (
            <div
              key={doc?._id}
              className="flex flex-col justify-between w-[90%] sm:w-[48%] lg:w-[40%] p-6 border border-gray-300 bg-white shadow-xl rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {doc?.title}
              </h2>
              <p className="text-gray-600 mb-6">{doc?.description}</p>
              <div className="mt-4 flex gap-4 flex-wrap">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2"
                  onClick={() => openUpdateModal(doc)}
                >
                  <MdEdit className="text-blue-800 text-2xl" /> Edit
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2"
                  onClick={() => handleDeleteDoc(doc?._id)}
                >
                  <MdDelete className="text-red-800 text-2xl" /> Delete
                </button>
                {/* <button
                  className="bg-green-100 text-green-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2" 
                  onClick={() => window.open(doc?.filename, "_blank")}
                >
                  <MdPreview className="text-green-800 text-2xl" /> Preview
                </button>  */}
                <Link to={doc?.fileName} target="_blank"
                  className="bg-green-100 text-green-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2"
                >
                  <MdPreview className="text-green-800 text-2xl" /> Preview
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
