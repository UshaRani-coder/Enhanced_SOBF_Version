import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBulletine, getBulletine, removeBulletine, updateBulletine } from '../Reducers/bulletinSlice';
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { updatePost } from '../Reducers/RecentActivityPostPageSlice';

const PostPage = () => {
  const dispatch = useDispatch();
  const { bulletines, status } = useSelector((state) => state.bulletines);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    videos: [],
  });

  // Fetching all posts from the backend through redux
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine()); //? getting posts 
      setErrorMessage("");
    }
  }, [status, dispatch]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return false;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return false;
    }

    if (!formData.images && !formData.videos) {
      toast.error("Either images or videos are required.");
      return false;
    }

    // Validate images
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"];
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        if (!validImageTypes.includes(formData.images[i].type)) {
          toast.error("Only valid image files (JPEG, PNG, GIF, WEBP) are allowed in the Images section.");
          return false;
        }
      }
    }

    // Validate videos
    const validVideoTypes = ["video/mp4", "video/avi", "video/mkv", "video/webm"];
    if (formData.videos) {
      for (let i = 0; i < formData.videos.length; i++) {
        if (!validVideoTypes.includes(formData.videos[i].type)) {
          toast.error("Only valid video files (MP4, AVI, MKV, WEBM) are allowed in the Videos section.");
          return false;
        }
      }
    }
    return true;
  };


  //? Adding a new post
  const handleAddBulletine = () => {
    if (!validateForm()) return;
  
    const newBulletine = new FormData();
    newBulletine.append('title', formData.title);
    newBulletine.append('description', formData.description);

    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        newBulletine.append("images", formData.images[i]);
      }
    }
    if (formData.videos) {
      for (let i = 0; i < formData.videos.length; i++) {
        newBulletine.append("videos", formData.videos[i]);
      }
    }

    dispatch(addBulletine(newBulletine))
      .then(() => {
        toast.success("Successfully added news/bulletine.");
        setIsModalOpen(false);
        resetForm();
        dispatch(getBulletine());
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add news/bulletine.");
      });
  };

  //? Updating post
  const handleUpdateBulletine = () => {
      if (!formData.title.trim()) {
        toast.error("Title is required.");
        return;
      }
      if (!formData.description.trim()) {
        toast.error("Description is required.");
        return;
      }
  
      // Validate images
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          if (!validImageTypes.includes(formData.images[i].type)) {
            toast.error("Only valid image files (JPEG, PNG, GIF, WEBP) are allowed in the Images section.");
            return;
          }
        }
      }
  
      // Validate videos
      const validVideoTypes = ["video/mp4"];
      if (formData.videos) {
        for (let i = 0; i < formData.videos.length; i++) {
          if (!validVideoTypes.includes(formData.videos[i].type)) {
            toast.error("Only mp4  video files are valid.");
            return;
          }
        }
      }
  
      const updatedData = new FormData();
      updatedData.append("title", formData.title);
      updatedData.append("description", formData.description);
  
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          updatedData.append("images", formData.images[i]);
        }
      }
      if (formData.videos) {
        for (let i = 0; i < formData.videos.length; i++) {
          updatedData.append("videos", formData.videos[i]);
        }
      }
  
      dispatch(updateBulletine({ id: currentPost._id, updatedData }))
        .unwrap()
        .then(() => {
          toast.success("Post updated successfully!");
          setIsModalOpen(false);
          resetForm();
          dispatch(getPosts());
        })
        .catch((error) => {
          toast.error(error || "Failed to update post.");
        });
    };
  

  // ? Deleting a post
  const handleDeleteBulletine = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bulletin? This action cannot be undone."
    );
    if (confirmDelete) {
      dispatch(removeBulletine(id))
        .then(() => {
          toast.success("Successfully deleted news/bulletin.");
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete news/bulletin.");
        });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
  };

  // Handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handling file changes for images and videos
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), ...files],
    }));
  };

  // Reset form to its initial state
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      images: null,
      videos: null,
    });
    setCurrentPost(null);
  };

  // Open modal for updating a post
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
      <div className="flex justify-between items-center m-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">News Posts</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Post
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">{isUpdateMode ? "Update Post" : "Add New Post"}</h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData?.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder='Enter your title of the post '
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder='Enter description'
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Images</label>
                <input
                  type="file"
                  name="images"
                  accept="images/*"
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
                        src={image instanceof File ? URL.createObjectURL(image) : image}
                        alt={`Image Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <svg className="absolute top-0 right-0" onClick={() => handleRemoveImage(index)} width={16} height={16} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><defs><style dangerouslySetInnerHTML={{ __html: ".cls-1{fill:#ff4141;fill-rule:evenodd;}" }} /></defs><title>cross</title><path className="cls-1" d="M6,6H6a20.53,20.53,0,0,1,29,0l26.5,26.49L87.93,6a20.54,20.54,0,0,1,29,0h0a20.53,20.53,0,0,1,0,29L90.41,61.44,116.9,87.93a20.54,20.54,0,0,1,0,29h0a20.54,20.54,0,0,1-29,0L61.44,90.41,35,116.9a20.54,20.54,0,0,1-29,0H6a20.54,20.54,0,0,1,0-29L32.47,61.44,6,34.94A20.53,20.53,0,0,1,6,6Z" /></svg>
                    </div>
                  ))}
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Videos</label>
                <input
                  type="file"
                  name="videos"
                  accept="video/*"
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
                  onClick={isUpdateMode ? handleUpdateBulletine : handleAddBulletine}
                >
                  {isUpdateMode ? "Update Post" : "Add Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {bulletines && bulletines?.length > 0 ? (
          bulletines?.map((bulletin) => (
            <div
              key={bulletin?._id}
              className="border p-4 rounded w-64 hover:shadow-lg flex flex-col items-center"
            >
              <img
                src={bulletin?.images && (bulletin?.images[0] || "https://via.placeholder.com/150")}
                alt="Bulletin Post"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="w-full mt-2 font-bold text-xl">{bulletin?.title}</h3>
              <p className="mt-2 italic">{bulletin?.description}</p>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg"
                  onClick={() => openUpdateModal(bulletin)}
                >
                  <MdEdit className="text-blue-800 text-2xl" />
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg"
                  onClick={() => handleDeleteBulletine(bulletin?._id)}
                >
                  <MdDelete className="text-red-800 text-2xl" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
