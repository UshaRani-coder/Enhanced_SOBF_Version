import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { addPost, getPosts, removePost, updatePost } from "../Reducers/RecentActivityPostPageSlice";

const RecentActivityPostPage = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: null,
    videos: null,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  const handleAddPost = () => {
    if (!formData.title.trim() ) {
      toast.error("Title is  required.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description are required.");
      return;
    }
    if (!formData.images ) {
      toast.error("Either images or videos is required.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.images) formDataToSend.append("images", formData.images);
    if (formData.videos) formDataToSend.append("videos", formData.videos);

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
      toast.error("Description are required.");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("description", formData.description);
    if (formData.images) updatedData.append("images", formData.images);
    if (formData.videos) updatedData.append("videos", formData.videos);

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
    setIsModalOpen(false);
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Hero Banner? This action cannot be undone."
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
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
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl small-range:text-3xl md:text-4xl font-semibold">Recent Activity Posts</h1>
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
                <label className="block font-semibold mb-2">images</label>
                <input
                  type="file"
                  name="images"
                  accept="images/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">videos</label>
                <input
                  type="file"
                  name="videos"
                  accept="videos/*"
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
              className="border p-4 rounded w-64 hover:shadow-lg flex flex-col items-center"
            >
              <img
                src={post?.images || "https://via.placeholder.com/150"}
                alt="Recent Activity Post"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">{post?.title}</h3>
              <p className="mt-2 italic line-clamp-4">{post?.description}</p>
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
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivityPostPage;
