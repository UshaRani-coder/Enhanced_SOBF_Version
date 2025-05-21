import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import { addPost, getPosts, removePost, updatePost } from '../Reducers/RecentActivityPostPageSlice';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

const RecentActivityPostPage = () => {
  ReactQuill.Quill = Quill;
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const [expandedItem, setExpandedItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
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

        // Accepted dimensions with tolerance
        const ACCEPTED_DIMENSIONS = [
          { width: 800, height: 596 },
          { width: 1150, height: 862 },
          { width: 1200, height: 453 },
          { width: 1200, height: 900 },
          { width: 1280, height: 597 },
          { width: 1280, height: 960 },
          { width: 4000, height: 1868 },
          { width: 4080, height: 1904 },
          { width: 2048, height: 1536 },
        ];

        // Check if dimensions match any accepted size (with 1% tolerance)
        const isValid = ACCEPTED_DIMENSIONS.some(dim => {
          const widthMatch = Math.abs(width - dim.width) <= Math.round(dim.width * 0.01);
          const heightMatch = Math.abs(height - dim.height) <= Math.round(dim.height * 0.01);
          return widthMatch && heightMatch;
        });

        resolve({
          isValid,
          width,
          height,
          acceptedSizes: ACCEPTED_DIMENSIONS.map(d => `${d.width}×${d.height}`),
          currentAspectRatio: (width / height).toFixed(2)
        });
      };
      img.onerror = () => resolve({ isValid: false });
      img.src = URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  const validateForm = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return false;
    }

    if (!formData?.description?.trim()) {
      toast?.error('Description is required.');
      return false;
    }

    if (!formData?.date) {
      toast.error('Please pick a date.');
      return false;
    }

    if (formData?.images?.length === 0) {
      toast.error('Images are required.');
      return false;
    }

    // Validate images
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (formData.images.length > 0) {
      for (let i = 0; i < formData?.images?.length; i++) {
        const image = formData?.images[i];

        // Check file type
        if (!validImageTypes?.includes(image?.type)) {
          toast.error(
            'Only valid image files (JPEG, PNG, JPG) are allowed in the Images section.',
          );
          return false;
        }

        // Check dimensions
        const { isValid, width, height } = await checkImageDimensions(image);
        if (!isValid) {
          toast.error(
            `Image "${image.name}" must have a 16:9 aspect ratio. Current dimensions: ${width}x${height}`
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

    if (formData.images) {
      for (let i = 0; i < formData?.images?.length; i++) {
        formDataToSend.append('images', formData?.images[i]);
      }
    }

    setIsLoading(true);
    dispatch(addPost(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success('Post added successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getPosts());
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

    if (formData.images) {
      for (let i = 0; i < formData.images?.length; i++) {
        updatedData.append('images', formData.images[i]);
      }
    }

    setIsLoading(true);
    dispatch(updatePost({ id: currentPost._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Post updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getPosts());
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error || 'Failed to update post.');
        setIsLoading(false);
      });
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.',
    );

    if (confirmDelete) {
      setIsLoading(true);
      dispatch(removePost(id))
        .unwrap()
        .then(() => {
          toast.success('Post deleted successfully!');
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
  };

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, value } = e;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    if (name === 'images') {
      const file = files[0]; // Only take the first file for single upload
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!validImageTypes.includes(file.type)) {
        toast.error('Only image files (JPEG, PNG, JPG) are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.onload = async () => {
          // Check if image is too extreme to crop to 16:9
          const originalAspect = image.width / image.height;
          const minAspect = 1; // Minimum acceptable aspect ratio (1:1)
          const maxAspect = 3; // Maximum acceptable aspect ratio (3:1)

          if (originalAspect < minAspect || originalAspect > maxAspect) {
            toast.error(
              'Image is too extreme to crop properly. Please use an image with aspect ratio between 1:1 and 3:1.',
              { autoClose: 5000 }
            );
            if (fileInputRef.current) {
              fileInputRef.current.value = ''; // Reset file input
            }
            return;
          }

          // Check dimensions before proceeding
          const { isValid, width, height, requiredSize } = await checkImageDimensions(file);

          if (!isValid) {
            toast.error(
              `Image must be exactly ${requiredSize} (4:3 aspect ratio). ` +
              `Your image is ${width}×${height}px.`
            );
            return false;
          }

          // If validation passes, update the form data
          setFormData(prev => ({
            ...prev,
            images: [file] // Replace any existing images with the new one
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
      images: null,
      date: post?.date || null,
    });
    setPreviewImage(post?.images?.[0]);
  };

  return (
    <div className="container mx-auto">
      {/* Add Post Button */}
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl small-range:text-3xl md:text-4xl font-semibold">
          Recent Activities
        </h1>
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

      {/* Expanded Post Modal */}
      {expandedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto scrollbar-none">
            <div className="flex justify-between items-center gap-x-[20px] mb-4">
              <h2 className="text-xl font-bold">{expandedItem?.title}</h2>
              <button onClick={closeExpandedModal}>
                <MdClose className="text-2xl text-gray-600" />
              </button>
            </div>
            <p
              className="mb-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(expandedItem?.description).replace(
                  /<a /g,
                  '<a style="color: #4a90e2; " ',
                ),
              }}
            ></p>
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

            {Array.isArray(expandedItem?.images) &&
              expandedItem.images?.length > 0 ? (
              expandedItem?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post Image ${index + 1}`}
                  className="w-full object-cover rounded mb-[20px]"
                />
              ))
            ) : (
              <p className="text-gray-500 italic">No images available</p>
            )}
          </div>
        </div>
      )}

      {/* Add/Edit Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Activity' : 'Add New Activity'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter the title of the activity"
                />
              </div>
              <div className="mb-4">
                <style>
                  {`
                    .ql-container {
                      padding: 8px;
                      min-height: 100px;
                    }
                    .ql-editor {
                      font-size: 1rem;
                      font-weight: normal;
                      line-height: 1.5;
                      letter-spacing: 0.5px;
                      padding: 10px;
                    }
                    .ql-toolbar {
                      border-radius: 8px 8px 0 0;
                      background-color: #f9fafb;
                    }
                    .ql-editor.ql-blank::before {
                      font-style: normal !important;
                    }
                  `}
                </style>
                <label className="block font-semibold mb-2">Description</label>
                <ReactQuill
                  value={formData.description || ''}
                  ref={quillRef}
                  onChange={(value) =>
                    handleInputChange({ name: 'description', value })
                  }
                  className="w-full bg-white"
                  placeholder="Enter the description of the activity"
                />
              </div>
              {isUpdateMode ? null : (
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block font-semibold mb-2">Images</label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                  ref={fileInputRef}
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
                    <p className="text-sm text-gray-500 mt-2">16:9 Aspect Ratio Preview</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                {formData?.images &&
                  Array.isArray(formData.images) &&
                  formData?.images?.length > 0 &&
                  formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt={`Image Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                      >
                        ×
                      </button>
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
                  disabled={isLoading}
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

      {/* Posts List */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {posts && posts?.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={post._id || index}
              className="cursor-pointer border p-4 rounded w-[90%] small-range:w-[80%] small-max:w-[70%] md:w-[60%] lg:w-[30%] hover:shadow-lg flex flex-col items-center"
              onClick={() => handleExpandPost(post)}
            >
              {post.images?.length > 0 ? (
                <img
                  src={post.images[0]}
                  alt="Post Image"
                  className="w-full h-[200px] object-cover rounded"
                />
              ) : (
                <div className="w-full h-[200px] bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500">No media</span>
                </div>
              )}
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center justify-start gap-x-1 mt-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 text-gray-600 mr-1"
                  >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>
                  <span className="text-gray-700">
                    {post?.date
                      ? new Date(post.date).toLocaleDateString()
                      : 'Date not available'}
                  </span>
                </div>

                <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">
                  {post?.title}
                </h3>

                <p
                  className="mt-2 line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post?.description).replace(
                      /<a /g,
                      '<a style="color: #4a90e2; " ',
                    ),
                  }}
                ></p>

                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      openUpdateModal(post);
                    }}
                  >
                    <MdEdit className="text-blue-800 text-2xl" />
                  </button>
                  <button
                    className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post._id);
                    }}
                  >
                    <MdDelete className="text-red-800 text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivityPostPage;