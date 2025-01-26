import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBulletine,
  getBulletine,
  removeBulletine,
  updateBulletine,
} from "../Reducers/bulletinSlice";
import { toast } from "react-toastify";
import { MdDelete, MdClose, MdEdit } from "react-icons/md";

const PostPage = () => {
  const dispatch = useDispatch();
  const { bulletines, status } = useSelector((state) => state.bulletines);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: null,
    videos: null,
    date:""
  });

  // Fetching all posts from the backend through redux
  useEffect(() => {
    if (status === "idle") {
      dispatch(getBulletine()); //? getting posts
    }
  }, [status, dispatch]);

  //?  Adding a new post
  const handleAddBulletine = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }
    if (!formData.date.trim()) {
      toast.error("Date is required.");
      return;
    }
    if (!formData.images && !formData.videos) {
      toast.error("Either image or video is required.");
      return;
    }
    const newBulletine = new FormData();
    newBulletine.append("title", formData.title);
    newBulletine.append("description", formData.description);
    newBulletine.append("date", formData.date);

    // Append multiple images
    formData.images.forEach((file) => {
      newBulletine.append("images", file);
    });

    // Append multiple videos
    if (formData.videos) {
      formData.videos.forEach((file) => {
        newBulletine.append("videos", file);
      });
    }

    dispatch(addBulletine(newBulletine))
      .then(() => {
        toast.success("Successfully added news/bulletin.");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add news/bulletin.");
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
    const updatedBulletine = new FormData();
    updatedBulletine.append("title", formData.title);
    updatedBulletine.append("description", formData.description);
    updatedBulletine.append("date", formData.date);
    if (formData.images) {
      formData.images.forEach((file) => {
        updatedBulletine.append("images", file);
      });
    }
    if (formData.videos) {
      formData.videos.forEach((file) => {
        updatedBulletine.append("videos", file);
      });
    }

    dispatch(
      updateBulletine({ id: currentPost._id, updatedData: updatedBulletine })
    )
      .then(() => {
        toast.success("Successfully updated news/bulletin.");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update news/bulletin.");
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
  const handleExpandPost = (bulletin) => {
    if (!bulletin) {
      console.error("Post data is invalid or undefined.");
      return;
    }
    setExpandedItem(bulletin);
  };

  const closeExpandedModal = () => {
    setExpandedItem(null);
  };

  // Handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handling file changes for images and videos
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Array.from(files), // Store files as an array
    }));
  };
  

  // Reset form to its initial state
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      images: [],
      videos: [],
      date: "",
    });
    setCurrentPost(null);
  };

  // Open modal for updating a post
  const openUpdateModal = (bulletin) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(bulletin);
    setFormData({
      title: bulletin?.title,
      description: bulletin?.description,
      images: [],
      videos: [],
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
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? "Update Post" : "Add New Post"}
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
                  placeholder="Enter your title of the post "
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter description"
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
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Videos</label>
                <input
                  type="file"
                  name="videos"
                  accept="video/*"
                  multiple
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
                  onClick={
                    isUpdateMode ? handleUpdateBulletine : handleAddBulletine
                  }
                >
                  {isUpdateMode ? "Update Post" : "Add Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {expandedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
            {/* Header */}
            <div className="flex justify-between items-center gap-x-[20px] mb-4">
              <h2 className="text-xl font-bold">{expandedItem?.title}</h2>
              <button onClick={closeExpandedModal}>
                <MdClose className="text-2xl text-gray-600" />
              </button>
            </div>

            {/* Description */}
            <p className="mb-2 italic">{expandedItem?.description}</p>

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
                ? new Date(expandedItem.date).toLocaleDateString()
                : "Date not available"}
            </p>

            {/* Images */}
            {Array.isArray(expandedItem?.images) &&
            expandedItem.images.length > 0 ? (
              expandedItem.images.map((image, index) => (
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

            {/* Videos */}
            {expandedItem?.videos?.length > 0
              ? expandedItem.videos.map((video, index) => (
                  <video key={index} controls className="w-full rounded mb-4">
                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))
              : null}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {bulletines && bulletines?.length > 0 ? (
          bulletines?.map((bulletin) => (
            <div
              key={bulletin?._id}
              className="cursor-pointer border p-4 rounded w-[90%] small-range:w-[80%] small-max:w-[70%] md:w-[60%] lg:w-[30%] hover:shadow-lg flex flex-col "
              onClick={() => handleExpandPost(bulletin)}
            >
              {/* Conditional rendering for media */}
              {bulletin?.video ? (
                <video
                  src={bulletin.video}
                  controls
                  className="w-full h-[200px] object-cover rounded"
                />
              ) : (
                <img
                  src={
                    bulletin?.images?.[0] || "https://via.placeholder.com/150"
                  }
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
                  {/* {console.log(bulletin.date)}
                  {console.log(formData.date)} */}
                  {bulletin?.date
                    ? new Date(bulletin.date).toLocaleDateString()
                    : "Date not available"}
                </span>
              </div>
              <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">
                {bulletin?.title}
              </h3>
              <p className="mt-2 italic line-clamp-4">
                {bulletin?.description}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openUpdateModal(bulletin);
                  }}
                >
                  <MdEdit className="text-blue-800 text-2xl" />
                  Edit
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBulletine(bulletin._id);
                  }}
                >
                  <MdDelete className="text-red-800 text-2xl" />
                  Delete
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
