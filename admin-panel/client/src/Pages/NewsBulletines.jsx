import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBulletine, getBulletine, removeBulletine, updateBulletine } from '../Reducers/bulletinSlice';
import { toast } from 'react-toast';
// import { addBulletine, getBulletine, removeBulletine, updateBulletine, } from '../Reducers/postSlice';

const PostPage = () => {
  const dispatch = useDispatch();
  const { bulletines, status } = useSelector((state) => state.bulletines);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: '',
    videos: '',
  });

  // ! fetching all posts from backend throught redux
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);


  // ! Adding new news posts
  const handleAddBulletine = () => {
    const newBulletine = new FormData();
    newBulletine.append('title', formData.title);
    newBulletine.append('description', formData.description);
    if (formData.images) newBulletine.append('images', formData.images);
    if (formData.videos) newBulletine.append('videos', formData.videos);

    dispatch(addBulletine(newBulletine));
    setIsModalOpen(false);
    resetForm();
  };

  // ! Update news post
  const handleUpdateBulletine = () => {
    const updatedBulletine = new FormData();
    updatedBulletine.append('title', formData.title);
    updatedBulletine.append('description', formData.description);

    // Append images and videos if they exist
    if (formData.images) updatedBulletine.append('images', formData.images);
    if (formData.videos) updatedBulletine.append('videos', formData.videos);

    // Dispatch updated data
    dispatch(updateBulletine({ id: currentPost._id, updatedData: updatedBulletine }));
    toast.success("Successfully updated news/bulletines data .")
    setIsModalOpen(false);
    resetForm();
  };

  // ! delete news post
  const handleDeleteBulletine = (id) => {
    dispatch(removeBulletine(id));
    toast.success("Successfully deleted news/bulletines data .")
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
        <h1 className="text-4xl">News Posts</h1>
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
                  onClick={isUpdateMode ? handleUpdateBulletine : handleAddBulletine}
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
        { bulletines.length > 0 ?
          bulletines.map((post) => (
          <div
            key={post._id}
            className="border cursor-pointer p-4 mb-4 rounded flex-grow flex-shrink-0 min-w-[250px] max-w-[350px] w-full hover:shadow-lg transition-shadow duration-300 flex-wrap"
          >
            <div className="w-full h-34">
              <img
                src={
                  post.images && post.images.length > 0
                    ? post.images[0]
                    : 'https://via.placeholder.com/150'
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
                onClick={() => handleDeleteBulletine(post._id)}
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
