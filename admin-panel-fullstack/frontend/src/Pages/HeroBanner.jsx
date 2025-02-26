import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addHeroBanner,
  getHeroBanners,
  updateHeroBanners,
  removeHeroBanner,
} from '../Reducers/heroBannerSlice';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

const HeroBanner = () => {
  const dispatch = useDispatch();
  const { heroBanner, status } = useSelector((state) => state.heroBanner);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({ quotes: '', image: null });
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const maxLength = 80;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getHeroBanners());
    }
  }, [status, dispatch]);

  // ! Adding post
  const handleAddPost = () => {
    // Set loading state to true when adding
    setIsLoading(true);

    if (!formData.quotes.trim()) {
      toast.error('Quote is required and cannot be empty.');
      setIsLoading(false);
      return;
    }
    if (!formData.image) {
      toast.error('Image is required.');
      setIsLoading(false);
      return;
    }
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(formData.image.type)) {
      toast.error('Only image files (JPEG, PNG, JPG) are allowed.');
      setIsLoading(false);
      return;
    } else {
      const formDataToSend = new FormData();
      formDataToSend.append('quotes', formData.quotes);
      formDataToSend.append('image', formData.image);
      dispatch(addHeroBanner(formDataToSend))
        .unwrap()
        .then(() => {
          toast.success('Hero Banner added successfully!');
          setIsModalOpen(false);
          resetForm();
          dispatch(getHeroBanners());
        })
        .catch((error) => {
          toast.error(error || 'Failed to add Hero Banner.');
        })
        .finally(() => setIsLoading(false));
    }
  };

  // ! Updating post
  const handleUpdatePost = () => {
    setIsLoading(true);
    if (!formData.quotes.trim()) {
      toast.error('Quote is required and cannot be empty.');
      setIsLoading(false);
      return;
    }
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (formData.image && !validImageTypes.includes(formData.image.type)) {
      toast.error('Only image files (JPEG, PNG and JPG) are allowed.');
      setIsLoading(false);
      return;
    }
    const updatedData = new FormData();
    updatedData.append('quotes', formData.quotes);
    if (formData.image) updatedData.append('image', formData.image);
    dispatch(updateHeroBanners({ id: currentPost?._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Hero Banner updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getHeroBanners());
      })
      .catch((error) => {
        toast.error(error || 'Failed to update Hero Banner.');
      })
      .finally(() => {
        setIsLoading(false);
        window.location.reload();
      });
  };

  // ! Deleting post
  const handleDeletePost = (id) => {
    setIsLoading(true);
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Hero Banner? This action cannot be undone.',
    );

    if (confirmDelete) {
      dispatch(removeHeroBanner(id))
        .unwrap()
        .then(() => {
          toast.success('Hero Banner deleted successfully!');
        })
        .catch((error) => {
          toast.error(error || 'Failed to delete Hero Banner.');
        })
        .finally(() => setIsLoading(false)); // Reset loading state after delete
    }
  };

  // ! Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value?.length <= maxLength) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    // setFormData({ ...formData, [name]: value });
  };

  // ! Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // ! Reset the value of the form
  const resetForm = () => {
    setFormData({ quotes: '', image: null });
    setCurrentPost(null);
    setIsUpdateMode(false);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      quotes: post.quotes || '',
      image: null,
      // image: e.tagert.files[0]
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl small-range:text-3xl md:text-4xl font-semibold">
          Hero Banners
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
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
                  maxLength={maxLength}
                />
                <p className="mt-2 text-sm text-gray-500">
                  {maxLength - formData?.quotes?.length} characters remaining
                </p>
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
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold`}
                  onClick={isUpdateMode ? handleUpdatePost : handleAddPost}
                  disabled={isLoading} // Disable the button while loading
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      ></svg>
                      Processing...
                    </span>
                  ) : isUpdateMode ? (
                    'Update Banner'
                  ) : (
                    'Add Banner'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Displaying the banners */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 lg:gap-10">
        {heroBanner && heroBanner?.length > 0 ? (
          heroBanner?.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded w-[90%] small-max:w-[80%] md:w-[70%] lg:w-[40%] hover:shadow-lg flex flex-col items-center"
            >
              <div
                className="w-full h-[250px] overflow-hidden"
                style={{
                  backgroundImage: `url(${post.image || 'https://via.placeholder.com/150'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: 'full',
                  height: 'full',
                }}
              ></div>
              <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">
                {post.quotes}
              </h3>

              <div className="mt-4 flex gap-4">
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
          <p>No Hero Banners found.</p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
