import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import {
  addPost,
  getPosts,
  removePost,
  updatePost,
} from "../Reducers/RecentActivityPostPageSlice";

const RecentActivityPostPage = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const [expandedItem, setExpandedItem] = useState(null); // For expanded post details modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  console.log(expandedItem);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: null,
    videos: null,
    date: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  // const handleAddPost = () => {
  //   if (!formData.title.trim()) {
  //     toast.error("Title is required.");
  //     return;
  //   }
  //   if (!formData.description.trim()) {
  //     toast.error("Description is required.");
  //     return;
  //   }
  //   if (!formData.images) {
  //     toast.error("At least one image is required.");
  //     return;
  //   }

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("title", formData.title);
  //   formDataToSend.append("description", formData.description);
  //   formDataToSend.append("date", formData.date);
  //   if (formData.images) formDataToSend.append("images", formData.images);
  //   if (formData.videos) formDataToSend.append("videos", formData.videos);

  //   dispatch(addPost(formDataToSend))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Post added successfully!");
  //       setIsModalOpen(false);
  //       resetForm();
  //     })
  //     .catch((error) => {
  //       toast.error(error || "Failed to add post.");
  //     });
  // };

  const handleAddPost = () => {
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
    if (!formData.images?.length) {
      toast.error("At least one image is required.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);

    // Append multiple images
    formData.images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // Append multiple videos
    if (formData.videos) {
      formData.videos.forEach((file) => {
        formDataToSend.append("videos", file);
      });
    }

    dispatch(addPost(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success("Post added successfully!");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error || "Failed to add post.");
      });
  };

  const handleUpdatePost = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("description", formData.description);
    updatedData.append("date", formData.date);
    // if (formData.images) updatedData.append("images", formData.images);
    // if (formData.videos) updatedData.append("videos", formData.videos);
    
  if (formData.images) {
    formData.images.forEach((file) => {
      updatedData.append("images", file);
    });
  }
  
 
  if (formData.videos) {
    formData.videos.forEach((file) => {
      updatedData.append("videos", file);
    });
  }

    dispatch(updatePost({ id: currentPost._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Post updated successfully!");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error || "Failed to update post.");
      });
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (confirmDelete) {
      dispatch(removePost(id))
        .unwrap()
        .then(() => {
          toast.success("Post deleted successfully!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  
  const handleExpandPost = (post) => {
    if (!post) {
      console.error("Post data is invalid or undefined.");
      return;
    }
    setExpandedItem(post);
  };
  

  const closeExpandedModal = () => {
    setExpandedItem(null);
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
      [name]: Array.from(files), // Store files as an array
    }));
  };

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

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      title: post?.title,
      description: post?.description,
      date: post?.date,
      images: null,
      videos: null,
    });
  };
  

  return (
    <div className="container mx-auto">
      {/* Add Post Button */}
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl small-range:text-3xl md:text-4xl font-semibold">
          Recent Activities
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
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
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
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
                  className="w-full h-60 object-cover rounded mb-4"
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
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your title here"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter your description here"
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
                  {isUpdateMode ? "Update Post" : "Add Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {posts && posts?.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="cursor-pointer border p-4 rounded w-[90%] small-range:w-[80%] small-max:w-[70%] md:w-[60%] lg:w-[30%] hover:shadow-lg flex flex-col "
              onClick={() => handleExpandPost(post)}
            >
              {/* Conditional rendering for media */}
              {post?.video ? (
                <video
                  src={post.video}
                  controls
                  className="w-full h-[200px] object-cover rounded"
                />
              ) : (
                <img
                  src={post?.images?.[0] || "https://via.placeholder.com/150"}
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
                  {post?.date
                    ? new Date(post.date).toLocaleDateString()
                    : "Date not available"}
                </span>
              </div>

              {/* Title */}
              <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">
                {post?.title}
              </h3>

              {/* Description */}
              <p className="mt-2 italic line-clamp-4">{post?.description}</p>

              {/* Edit/Delete Buttons */}
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openUpdateModal(post);
                  }}
                >
                  <MdEdit className="text-blue-800 text-2xl" />
                  Edit
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post._id);
                  }}
                >
                  <MdDelete className="text-red-800 text-2xl" />
                  Delete
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

export default RecentActivityPostPage;
