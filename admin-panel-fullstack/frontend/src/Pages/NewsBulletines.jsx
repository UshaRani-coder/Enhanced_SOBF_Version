import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import {
  addBulletine,
  getBulletine,
  removeBulletine,
  updateBulletine,
} from '../Reducers/bulletinSlice';

const PostPage = () => {
  const dispatch = useDispatch();
  const { bulletines, status } = useSelector((state) => state.bulletines);
  const [expandedItem, setExpandedItem] = useState(null); // For expanded post details modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: null,
    videos: null,
    date: '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);

  const validateForm = () => {
    if (!formData.title) {
      toast.error('Title is required.');
      return false;
    }

    if (!formData.description) {
      toast.error('Description is required.');
      return false;
    }

    if (!formData.images) {
      toast.error('Atleast one images is required. Video can be optional.');
      setFormData({
        images: null,
      });
      return false;
    }

    // Validate images
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        if (!validImageTypes.includes(formData.images[i].type)) {
          toast.error(
            'Only valid image files (JPEG, PNG,JPG) are allowed in the Images section.',
          );
          return false;
        }
      }
    }

    // Validate videos
    const validVideoTypes = ['video/mp4', 'video/mkv'];
    if (formData.videos) {
      for (let i = 0; i < formData.videos.length; i++) {
        if (!validVideoTypes.includes(formData.videos[i].type)) {
          toast.error(
            'Only valid video files (MP4, MKV) are allowed in the Videos section.',
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

  const handleAddPost = () => {
    if (!validateForm()) return;
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        formDataToSend.append('images', formData.images[i]);
      }
    }
    if (formData.videos) {
      for (let i = 0; i < formData.videos.length; i++) {
        formDataToSend.append('videos', formData.videos[i]);
      }
    }

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
      });
  };

  const handleUpdatePost = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required.');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required.');
      return;
    }

    // Validate images
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/avif',
    ];
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        if (!validImageTypes.includes(formData.images[i].type)) {
          toast.error(
            'Only valid image files (JPEG, PNG, GIF, WEBP) are allowed in the Images section.',
          );
          return;
        }
      }
    }

    // Validate videos
    const validVideoTypes = ['video/mp4'];
    if (formData.videos) {
      for (let i = 0; i < formData.videos.length; i++) {
        if (!validVideoTypes.includes(formData.videos[i].type)) {
          toast.error('Only mp4  video files are valid.');
          return;
        }
      }
    }

    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('description', formData.description);

    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        updatedData.append('images', formData.images[i]);
      }
    }
    if (formData.videos) {
      for (let i = 0; i < formData.videos.length; i++) {
        updatedData.append('videos', formData.videos[i]);
      }
    }

    dispatch(updateBulletine({ id: currentPost._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Post updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getBulletine());
      })
      .catch((error) => {
        toast.error(error || 'Failed to update post.');
      });
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Bulletin? This action cannot be undone.',
    );

    if (confirmDelete) {
      dispatch(removeBulletine(id))
        .unwrap()
        .then(() => {
          toast.success('Post deleted successfully!');
        })
        .catch((error) => {
          toast.error(error.message);
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), ...files],
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      images: null,
      videos: null,
    });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      title: post?.title,
      description: post?.description,
      images: null,
      videos: null,
    });
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto scrollbar-none">
            {/* Header */}
            <div className="flex justify-between items-center gap-x-[20px] mb-4">
              <h2 className="text-xl font-bold">{expandedItem?.title}</h2>
              <button onClick={closeExpandedModal}>
                <MdClose className="text-2xl text-gray-600" />
              </button>
            </div>

            {/* Description */}
            <p className="mb-2 ">{expandedItem?.description}</p>

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

            {/* Videos */}
            {expandedItem?.videos?.length > 0
              ? expandedItem?.videos?.map((video, index) => (
                  <video key={index} controls className="w-full rounded mb-4">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))
              : null}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter the title of the news"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter the description of the news"
                />
              </div>
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
              </div>
              <div className="flex gap-3 mt-4">
                {formData?.images &&
                  Array.isArray(formData.images) &&
                  formData.images.length > 0 &&
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
              <div className="mb-4">
                <label className="block font-semibold mb-2">Videos</label>
                <input
                  type="file"
                  name="videos"
                  accept="videos/*"
                  multiple
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
                  onClick={isUpdateMode ? handleUpdatePost : handleAddPost}
                >
                  {isUpdateMode ? 'Update Post' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* rendering all posts  */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {bulletines && bulletines?.length > 0 ? (
          bulletines.map((bulletin) => (
            <div
              key={bulletin._id}
              className="cursor-pointer border p-4 rounded w-[90%] small-range:w-[80%] small-max:w-[70%] md:w-[60%] lg:w-[30%] hover:shadow-lg flex flex-col items-center"
              onClick={() => handleExpandPost(bulletin)}
            >
              {/* Conditional rendering for media */}
              {!bulletin?.videos ? (
                <video controls className="w-full rounded mb-4">
                  <source src={bulletin.videos} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={bulletin.images[0]}
                  alt="Post Image"
                  className="w-full h-[200px] object-cover rounded"
                />
              )}

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
              <p className="mt-2  line-clamp-4">{bulletin?.description}</p>

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
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
