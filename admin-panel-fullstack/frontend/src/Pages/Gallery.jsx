import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addGallery,
  getGalleryImages,
  removeGallery,
  updateGalleryImage,
} from "../Reducers/gallerySlice";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({ image: null });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getGalleryImages());
    }
  }, [status, dispatch]);

  const handleAddPost = () => {
    const formDataToSend = new FormData();
    if (formData.image) formDataToSend.append("image", formData.image);

    dispatch(addGallery(formDataToSend));
    toast.success("Successfully added gallery image");
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdatePost = () => {
    const updatedData = new FormData();
    if (formData.image) updatedData.append("image", formData.image);

    dispatch(updateGalleryImage({ id: currentPost._id, updatedData }));
    toast.success("Successfully updated  gallery image");
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeletePost = (id) => {
    dispatch(removeGallery(id));
    toast.success("Successfully deleted  gallery image");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const resetForm = () => {
    setFormData({ quotes: "", image: null });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      quotes: post.quotes || "",
      image: null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center m-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">Gallery</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Images
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 ">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? "Update Image" : "Add a new Image"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
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
                  onClick={isUpdateMode ? handleUpdatePost : handleAddPost}
                >
                  {isUpdateMode ? "Update Image" : "Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {gallery.length > 0 ? (
          gallery.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded w-64 hover:shadow-lg flex flex-col items-center"
            >
              <img
                src={post.image || "https://via.placeholder.com/150"}
                alt="Hero Banner"
                className="w-full h-40 object-cover rounded"
              />
              <div className="mt-6 flex gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => openUpdateModal(post)}
                >
                  <MdEdit className="text-blue-800 text-2xl" />
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => handleDeletePost(post._id)}
                >
                  <MdDelete className="text-red-800 text-2xl" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Images found.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
