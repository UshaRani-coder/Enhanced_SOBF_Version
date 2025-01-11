import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import {
  addHeroBanner,
  getHeroBanners,
  updateHeroBanners,
  removeHeroBanner,
} from '../Reducers/heroBannerSlice';

const HeroBanner = () => {
  const dispatch = useDispatch();
  const { heroBanner, status } = useSelector((state) => state.heroBanner);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({ quotes: '', image: null });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getHeroBanners());
    }
  }, [status, dispatch]);

  const handleAddPost = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('quotes', formData.quotes);
    if (formData.image) formDataToSend.append('image', formData.image);

    dispatch(addHeroBanner(formDataToSend));
    toast.success('Successfully added Hero Banner');
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdatePost = () => {
    const updatedData = new FormData();
    updatedData.append('quotes', formData.quotes);
    if (formData.image) updatedData.append('image', formData.image);

    dispatch(updateHeroBanners({ id: currentPost._id, updatedData }));
    toast.success('Successfully updated Hero Banner');
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeletePost = (id) => {
    dispatch(removeHeroBanner(id));
    toast.success('Successfully deleted Hero Banner');
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
    setFormData({ quotes: '', image: null });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      quotes: post.quotes || '',
      image: null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between px-14 pb-4">
        <h1 className="text-4xl">Hero Banners</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Banner
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Banner' : 'Add New Banner'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Quote</label>
                <input
                  type="text"
                  name="quotes"
                  value={formData.quotes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
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
                  {isUpdateMode ? 'Update Banner' : 'Add Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        {heroBanner.length > 0 ? (
          heroBanner.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded w-64 hover:shadow-lg"
            >
              <img
                src={post.image || 'https://via.placeholder.com/150'}
                alt="Hero Banner"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-bold text-xl">{post.quotes}</h3>
              <div className="mt-4 flex gap-4">
                <button
                  className="text-blue-600 hover:underline cursor-pointe"
                  onClick={() => openUpdateModal(post)}
                >
                  Update
                </button>
                <button
                  className="text-red-600 hover:underline cursor-pointer"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No banners found.</p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
