import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import {
  addService,
  getServices,
  removeService,
  updateService,
} from '../Reducers/OurServicesSlice';

const OurService = () => {
  const dispatch = useDispatch();
  const { services, status } = useSelector((state) => state.services);
  const maxLength = 500; // Max character limit for description
  const maxImages = 5; // Max number of service images allowed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    small_description: '',
    description: '',
    color: '',
    logo: null,
    images: [],
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getServices()); // Fetching posts
    }
  }, [status, dispatch]);

  // ! Add a post
  const handleAddPost = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required and cannot be empty');
      return;
    }
    if (!formData.small_description) {
      toast.error('Small Description is required and cannot be empty');
      return;
    }
    if (!formData.description) {
      toast.error('Description is required and cannot be empty');
      return;
    }
    if (!formData.logo) {
      toast.error('Logo is required');
      return;
    }
    if (formData?.images?.length === 0) {
      toast.error('At least one service image is required');
      return;
    }
    if (!formData.color) {
      toast.error('Put color of your choice !');
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('small_description', formData.small_description);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('color', formData.color);
    formDataToSend.append('logo', formData.logo);
    formData.images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    setIsLoading(true); // Start loading
    dispatch(addService(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success('Post added successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getServices());
      })
      .catch((error) => {
        toast.error(error || 'Failed to add post');
      })
      .finally(() => setIsLoading(false));
  };

  //!  Update a post
  const handleUpdatePost = () => {
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('small_description', formData.small_description);
    updatedData.append('color', formData.color);
    updatedData.append('description', formData.description);
    if (formData.logo) updatedData.append('logo', formData.logo);
    formData.images.forEach((image) => updatedData.append('images', image));

    setIsLoading(true);
    dispatch(updateService({ id: currentPost?._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Post updated successfully!');
        setIsModalOpen(false);
        resetForm();
        setIsModalOpen(false);
        dispatch(getServices());
      })
      .catch((error) => {
        toast.error(error || 'Failed to update post');
      })
      .finally(() => {
        setIsLoading(false);
        setIsModalOpen(false);
        dispatch(getServices());
      });
  };

  // ! Delete a post
  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsLoading(true); // Start loading
      dispatch(removeService(id))
        .unwrap()
        .then(() => {
          toast.success('Post deleted successfully!');
        })
        .catch((error) => {
          toast.error(error || 'Failed to delete post');
        })
        .finally(() => setIsLoading(false)); // End loading;
    }
  };

  const handleExpandPost = (post) => {
    if (!post) {
      console.error('Service data is invalid or undefined.');
      return;
    }
    setExpandedItem(post);
  };
  const closeExpandedModal = () => {
    setExpandedItem(null);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaste = (e) => {
    const { name } = e.target;
    const pastedText = e.clipboardData.getData('text');
    if (name === 'description') {
      const combinedText = formData.description + pastedText;
      setFormData((prev) => ({ ...prev, [name]: combinedText }));
    }
  };

  // ! Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (name === 'logo') {
      if (files[0] && !allowedImageTypes.includes(files[0].type)) {
        toast.error(
          'Only image files (JPEG, PNG, GIF, WebP) are allowed for the logo.',
        );
        return;
      }
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else if (name === 'images') {
      const invalidFiles = Array.from(files).filter(
        (file) => !allowedImageTypes.includes(file.type),
      );
      if (invalidFiles.length > 0) {
        toast.error(
          'Only image files (JPEG, PNG, JPG) are allowed for service images.',
        );
        return;
      }
      if (files.length > maxImages) {
        toast.error(`You can upload a maximum of ${maxImages} images.`);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)].slice(0, maxImages),
      }));
    }
  };

  //! reset form data
  const resetForm = () => {
    setFormData({
      title: '',
      small_description: '',
      description: '',
      logo: null,
      color: '',
      images: [],
    });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      title: post?.title || '',
      small_description: post?.small_description || '',
      description: post?.description || '',
      color: post?.color || '',
      logo: null,
      images: [],
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl  md:text-4xl font-semibold">Our Services</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Service
        </button>
      </div>

      {expandedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto scrollbar-none">
            {/* Header */}
            <div className="flex justify-between items-center gap-x-[20px] mb-4">
              <div className="flex items-center justify-between w-full">
                <img
                  src={expandedItem?.logo}
                  alt="service-logo"
                  className="w-[30px]"
                />
                <button onClick={closeExpandedModal}>
                  <MdClose className="text-2xl text-gray-600" />
                </button>
              </div>
            </div>
            <h2 className="text-xl font-bold">{expandedItem?.title}</h2>
            {/* Short Description */}
            <p className="text-md font-medium text-gray-600 mt-2 line-clamp-1">
              {expandedItem?.small_description}
            </p>
            {/* Description */}
            <p className="mb-2 text-gray-500">{expandedItem?.description}</p>

            {/* Images */}
            {Array.isArray(expandedItem?.images) &&
            expandedItem.images.length > 0 ? (
              expandedItem.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post Image ${index + 1}`}
                  className="w-full  object-cover rounded mb-[20px]"
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No images available</p>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-h-[90vh] overflow-y-auto scrollbar-none md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Post' : 'Add New Post'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData?.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Small Description
                </label>
                <textarea
                  name="small_description"
                  value={formData.small_description}
                  onChange={handleInputChange}
                  onPaste={handlePaste}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter small description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onPaste={handlePaste}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className=""
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Images</label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className=""
                />
                <p className="text-sm text-gray-500">
                  You can upload up to {maxImages} images.
                </p>
                <div className="flex gap-3 mt-4 w-[80%] small-range:w-[100%] flex-wrap">
                  {formData &&
                    formData?.images.map((image, index) => (
                      <img
                        key={image._id}
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="h-14 w-14 object-cover rounded"
                      />
                    ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Select Color</label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full  cursor-pointer border rounded-lg h-[20px] shadow-md"
                  style={{
                    background:
                      'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)', // 🌈 Rainbow effect
                    border: 'none',
                    padding: '0',
                  }}
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
                  disabled={isLoading}
                  onClick={isUpdateMode ? handleUpdatePost : handleAddPost}
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
                    'Update'
                  ) : (
                    'Add'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {services && services?.length > 0 ? (
          services.map((post) => (
            <div
              key={post._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={post?.logo}
                alt="Logo"
                className="h-20 w-20 object-cover rounded-full mt-2"
              />
              <h2 className="text-lg font-bold line-clamp-2">{post?.title}</h2>
              <p className=" mt-2 line-clamp-1">{post?.small_description}</p>
              <p className=" mt-2 line-clamp-3">{post?.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => openUpdateModal(post)}
                >
                  <MdEdit />
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => handleDeletePost(post?._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No posts found.</p>
        )}
      </div> */}
      <div className=" gap-6 p-4 flex flex-col items-center lg:grid lg:grid-cols-2">
        {services && services.length > 0 ? (
          services.map((post) => (
            <div
              key={post._id}
              className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition small-max:w-[90%] md:w-[60%] lg:w-full"
              onClick={() => handleExpandPost(post)}
            >
              <img
                src={post?.logo}
                alt="Logo"
                className=" w-20 object-cover mt-2"
              />

              <h2 className="text-lg font-bold line-clamp-2">{post?.title}</h2>

              {/* Short Description */}
              <p className="text-md font-medium text-gray-600 mt-2 line-clamp-1">
                {post?.small_description}
              </p>

              {/* Detailed Description */}
              <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                {post?.description}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openUpdateModal(post);
                  }}
                >
                  <MdEdit />
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post?._id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default OurService;
