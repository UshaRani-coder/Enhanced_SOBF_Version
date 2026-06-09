import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import {
  addBulletine,
  getBulletine,
  removeBulletine,
  updateBulletine,
} from '../Reducers/bulletinSlice';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import { ACCEPTED_DIMENSIONS } from '../helper/Dimention';

const PostPage = () => {
  ReactQuill.Quill = Quill;
  const dispatch = useDispatch();
  const { bulletines, status } = useSelector((state) => state.bulletines);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    date: '',
  });

  // Function to check image dimensions and aspect ratio
  const checkImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        const width = this.naturalWidth;
        const height = this.naturalHeight;

        // Check if dimensions match any accepted size (with 1% tolerance)
        const isValid = ACCEPTED_DIMENSIONS.some((dim) => {
          const widthMatch =
            Math.abs(width - dim.width) <= Math.round(dim.width * 0.01);
          const heightMatch =
            Math.abs(height - dim.height) <= Math.round(dim.height * 0.01);
          return widthMatch && heightMatch;
        });

        resolve({
          isValid,
          width,
          height,
          acceptedSizes: ACCEPTED_DIMENSIONS.map(
            (d) => `${d.width}×${d.height}`,
          ),
          currentAspectRatio: (width / height).toFixed(2),
        });
      };
      img.onerror = () => resolve({ isValid: false });
      img.src = URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);

  const validateForm = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return false;
    }

    if (!formData.description.trim()) {
      toast.error('Description is required.');
      return false;
    }

    if (!formData.date) {
      toast.error('Please pick a date.');
      return false;
    }

    if (formData.images.length === 0) {
      toast.error('Images are required.');
      return false;
    }

    // Validate images
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (formData.images.length > 0) {
      for (let i = 0; i < formData.images.length; i++) {
        const image = formData.images[i];

        if (!validImageTypes.includes(image.type)) {
          toast.error(
            'Only valid image files (JPEG, PNG, JPG) are allowed in the Images section.',
          );
          return false;
        }

        const { isValid, width, height } = await checkImageDimensions(image);
        if (!isValid) {
          toast.error(
            `Image "${image.name}" must match one of the accepted dimensions. Current dimensions: ${width}x${height}`,
          );
          return false;
        }
      }
    }
    return true;
  };

  const handleExpandPost = (post) => {
    if (!post) {
      console.error('Post data is invalid or undefined.');
      return;
    }
    setExpandedItem(post);
  };

  const closeExpandedModal = () => {
    setExpandedItem(null);
  };

  const handleAddPost = async () => {
    if (!(await validateForm())) return;
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);

    formData.images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    setIsLoading(true);
    dispatch(addBulletine(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success('Post added successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getBulletine());
      })
      .catch((error) => {
        toast.error(error || 'Failed to add post.');
        setIsLoading(false);
      });
  };

  const handleUpdatePost = async () => {
    if (!(await validateForm())) return;
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('description', formData.description);
    updatedData.append('date', formData.date);
    formData.images.forEach((image) => {
      updatedData.append('images', image);
    });

    setIsLoading(true);
    dispatch(updateBulletine({ id: currentPost?._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Post updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getBulletine());
      })
      .catch((error) => {
        toast.error(error || 'Failed to update post.');
        setIsLoading(false);
      });
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Bulletin? This action cannot be undone.',
    );

    if (confirmDelete) {
      setIsLoading(true);
      dispatch(removeBulletine(id))
        .unwrap()
        .then(() => {
          toast.success('Post deleted successfully!');
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to delete post.');
          setIsLoading(false);
        });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      const { name, value } = e;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    if (name === 'images') {
      const file = files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!validImageTypes.includes(file.type)) {
        toast.error('Only image files (JPEG, PNG, JPG) are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const image = new Image();
        image.onload = async () => {
          const { isValid, width, height, acceptedSizes } =
            await checkImageDimensions(file);

          if (!isValid) {
            toast.error(
              `Image must be one of these sizes: ${acceptedSizes.join(' or ')}.\n` +
                `Your image is ${width}×${height}px.`,
            );
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            return;
          }

          setFormData((prev) => ({
            ...prev,
            images: [file],
          }));
          setPreviewImage(URL.createObjectURL(file));
        };
        image.onerror = () => {
          toast.error('Failed to load the image. Please try another file.');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        };
        image.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      images: [],
      date: '',
    });
    setPreviewImage(null);
    setCurrentPost(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);

    setFormData({
      title: post?.title || '',
      description: post?.description || '',
      date: post?.date || '',
      images: post?.images || [],
    });

    setPreviewImage(post?.images?.[0]?.url || null);
  };

  return (
    <div className="container mx-auto">
      {/* Add Post Button */}
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">News Posts</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Post
        </button>
      </div>

      {expandedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto scrollbar-none">
            {/* Header */}
            <div className="flex justify-between items-start gap-x-[20px] mb-4">
              <h2 className="text-xl font-bold">{expandedItem?.title}</h2>
              <button onClick={closeExpandedModal}>
                <MdClose className="text-2xl text-gray-600 mt-1" />
              </button>
            </div>

            {/* Description */}
            <p
              className="mb-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(expandedItem?.description).replace(
                  /<a /g,
                  '<a style="color: #4a90e2; " ',
                ),
              }}
            ></p>

            {/* Date */}
            <p className="text-gray-700 my-2 flex items-center gap-x-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-[12px] h-[12px] text-gray-600"
              >
                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
              </svg>
              {expandedItem?.date
                ? new Date(expandedItem?.date).toLocaleDateString()
                : 'Date not available'}
            </p>
            {/* Images */}
            {Array?.isArray(expandedItem?.images) &&
            expandedItem?.images?.length > 0 ? (
              expandedItem?.images.map((image, index) => (
                <img
                  src={image.url}
                  alt={`Post Image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[80vh] rounded-xl shadow-md object-contain"
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No images available</p>
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] md:pl-20">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update News' : 'Add New News'}
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
                  placeholder="Enter the title of the news"
                />
              </div>
              <div className="mb-4">
                <style>
                  {`.ql-container {
                    padding: 8px;
                    min-height: 100px;
                  }
                  .ql-editor {
                    font-size: 1rem;
                    font-weight: normal;
                    line-height: 1.5;
                    letter-spacing:0.5px;
                    padding: 10px;
                  }
                  .ql-toolbar {
                    border-radius: 8px 8px 0 0;
                    background-color: #f9fafb;
                  }
                  .ql-editor.ql-blank::before {
                    font-style: normal !important;
                  }`}
                </style>
                <label className="block font-semibold mb-2">Description</label>
                <ReactQuill
                  value={formData?.description}
                  onChange={(value) =>
                    handleInputChange({ name: 'description', value })
                  }
                  name="description"
                  className="w-full bg-white"
                  placeholder="Enter the description of the news"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData?.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Images</label>
                <input
                  type="file"
                  name="images"
                  accept="images/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                />
                {previewImage && (
                  <div className="mt-4">
                    <div className="relative w-full pb-[56.25%] bg-gray-100 rounded overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      16:9 Aspect Ratio Preview
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                {formData?.images &&
                  Array?.isArray(formData.images) &&
                  formData?.images?.length > 0 &&
                  formData?.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : image?.url || ''
                        }
                        alt={`Image Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <svg
                        className="absolute top-0 right-0"
                        onClick={() => handleRemoveImage(index)}
                        width={16}
                        height={16}
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 122.88 122.88"
                      >
                        <defs>
                          <style
                            dangerouslySetInnerHTML={{
                              __html: '.cls-1{fill:#ff4141;fill-rule:evenodd;}',
                            }}
                          />
                        </defs>
                        <title>cross</title>
                        <path
                          className="cls-1"
                          d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z"
                        />
                      </svg>
                    </div>
                  ))}
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

      {/* rendering all posts */}
      <div className="mt-6 flex flex-wrap justify-center lg:justify-start lg:p-4 gap-4">
        {bulletines && bulletines?.length > 0 ? (
          bulletines?.map((bulletin, index) => (
            <div
              key={bulletin?._id || index}
              className="cursor-pointer border p-4 rounded w-[90%] small-range:w-[80%] small-max:w-[70%] md:w-[60%] lg:w-[30%] shadow-lg hover:shadow-none flex flex-col items-center"
              onClick={() => handleExpandPost(bulletin)}
            >
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={
                    Array.isArray(bulletin?.images) &&
                    bulletin?.images.length > 0
                      ? bulletin.images[0]?.url
                      : ''
                  }
                  alt={bulletin?.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-56 md:h-64 lg:h-72 object-cover"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                {/* Date */}
                <div className="flex items-center justify-start gap-x-1 mt-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-gray-600 mr-1"
                  >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                  <span className="text-gray-700">
                    {bulletin?.date
                      ? new Date(bulletin.date).toLocaleDateString()
                      : 'Date not available'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">
                  {bulletin?.title}
                </h3>
                {/* Description */}
                <p
                  className="mt-2 line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(bulletin?.description).replace(
                      /<a /g,
                      '<a style="color: #4a90e2; " ',
                    ),
                  }}
                ></p>

                {/* Edit/Delete Buttons */}
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      openUpdateModal(bulletin);
                    }}
                  >
                    <MdEdit className="text-blue-800 text-2xl" />
                  </button>
                  <button
                    className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(bulletin?._id);
                    }}
                  >
                    <MdDelete className="text-red-800 text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
