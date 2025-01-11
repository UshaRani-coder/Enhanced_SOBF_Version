import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, getPosts, removePost, updatePost } from '../Reducers/postSlice';
import { toast } from "react-toastify";

const PostPage = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: "",
    videos: "",
  });

  // ! fetching all posts from backend throught redux 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPosts());
    }
  }, [status, dispatch]);



  // ! Adding new posts
  const handleAddPost = () => {
    const newPost = new FormData();
    newPost.append('title', formData.title);
    newPost.append('description', formData.description);
    if (formData.images) newPost.append('images', formData.images);
    if (formData.videos) newPost.append('videos', formData.videos);
    dispatch(addPost(newPost));
    toast.success("Successfully added post data .")
    setIsModalOpen(false);
    resetForm();
  };



  // ! Update post 
  const handleUpdatePost = () => {
    const updatedPost = new FormData();
    updatedPost.append('title', formData.title);
    updatedPost.append('description', formData.description);

    // Append images and videos if they exist
    if (formData.images) updatedPost.append('images', formData.images);
    if (formData.videos) updatedPost.append('videos', formData.videos);
    dispatch(updatePost({ id: currentPost._id, updatedData: updatedPost }));     // Dispatch updated data
    toast.success("Successfully updated post data .")
    setIsModalOpen(false);
    resetForm();
  };


  // ! delete post
  const handleDeletePost = (id) => {
    dispatch(removePost(id));
    toast.success("Successfully deleted post data .")
  }


  // ! handling all input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ! handling file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // ! reset the form to initial stage
  const resetForm = () => {
    setFormData({ title: '', description: '', images: null, videos: null });
    setCurrentPost(null);
  };


  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      images: null,
      videos: null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between px-14 pb-4">
        <h1 className="text-4xl">Recent Activities</h1>
        <button
          className="px-4 py-1 md:px-6 md:py-2 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Post
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Post' : 'Add New Post'}
            </h2>
            <form>
              {/* Title */}
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  rows="4"
                ></textarea>
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="images">
                  Image
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              {/* Videos */}
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="videos">
                  Video
                </label>
                <input
                  type="file"
                  id="videos"
                  name="videos"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={isUpdateMode ? handleUpdatePost : handleAddPost}
                >
                  {isUpdateMode ? 'Update Post' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="mt-6 flex flex-wrap justify-evenly gap-2">
        { posts.length > 0 ?
          posts?.map((post) => (
            <div
              key={post._id}
              className="border cursor-pointer p-4 mb-4 rounded flex-grow flex-shrink-0 min-w-[250px] max-w-[350px] w-full hover:shadow-lg transition-shadow duration-300 flex-wrap"
            >
              <div className="w-full h-34">
                <img
                  src={
                    post.images && post.images.length > 0
                      ? post.images[0]
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s'
                  }
                  alt={post.title || 'Default image'}
                  className="w-full rounded h-52"
                />
              </div>

              <h3 className="font-bold text-xl overflow-hidden text-ellipsis whitespace-pre w-[90%]">
                {post.title}
              </h3>
              <p className="mt-2 italic line-clamp-4">{post.description}</p>
              <div className="mt-2 flex gap-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => openUpdateModal(post)}
                >
                  Update
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
          :
          <p>No data found </p>
        }
      </div>
    </div>
  );
};

export default PostPage;
