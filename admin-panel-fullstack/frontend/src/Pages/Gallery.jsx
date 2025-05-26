import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addGallery,
  getGalleryImages,
  updateGalleryImage,
  removeGallery,
} from '../Reducers/gallerySlice';
import { MdEdit, MdDelete } from 'react-icons/md';

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    tag: '',
    customTag: '',
  });
  const [availableTags, setAvailableTags] = useState([]);
  const [activeTagFilter, setActiveTagFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getGalleryImages());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const tags = gallery.reduce((acc, item) => {
      if (item?.tag && !acc.includes(item.tag)) acc.push(item.tag.trim());
      return acc;
    }, []);
    setAvailableTags(['all', ...tags]);
  }, [gallery]);

  

  const validateFile = (file) => {
    if (!validImageTypes.includes(file.type)) {
      toast.error('Only image files (JPEG, PNG, JPG) are allowed.');
      return false;
    }

    return true;
  };

  const handleAddPost = () => {
    if (!formData.image) {
      toast.error('Image is required.');
      return;
    }

    if (!validateFile(formData.image)) return;

    // Ensure either tag or customTag is filled
    if (!formData.tag && !formData.customTag.trim()) {
      toast.error('Either a tag or a custom tag is required.');
      return;
    }

    let tagToUse =
      formData.tag || formData.customTag.trim().toLowerCase().replace(' ', '_');

    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('tag', tagToUse);

    setIsLoading(true); // Start loading
    dispatch(addGallery(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success('Gallery post added successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getGalleryImages());
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to add gallery post.');
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
        dispatch(getGalleryImages());
      });
  };

  const handleUpdatePost = () => {
    const updatedData = new FormData();
    if (formData.image) {
      if (!validateFile(formData.image)) return;
      updatedData.append('image', formData.image);
    }

    // Ensure either tag or customTag is filled
    if (!formData.tag && !formData.customTag.trim()) {
      toast.error('Either a tag or a custom tag is required.');
      return;
    }

    updatedData.append(
      'tag',
      formData.tag || formData.customTag.trim().toLowerCase().replace(' ', '_'),
    );

    setIsLoading(true); // Start loading
    dispatch(updateGalleryImage({ id: currentPost?._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Image updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getGalleryImages());
      })
      .catch((error) => {
        toast.error(error || 'Failed to update image.');
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
        dispatch(getGalleryImages());
      });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file && validateFile(file)) {
        setFormData((prev) => ({ ...prev, image: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({ image: null, tag: '', customTag: '' });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({ image: null, tag: post.tag });
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this gallery image? This action cannot be undone.',
    );
    if (confirmDelete) {
      dispatch(removeGallery(id))
        .then(() => {
          toast.success('Successfully deleted gallery image.');
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to delete gallery image.');
        });
    }
  };

  const filteredGallery =
    activeTagFilter === 'all'
      ? gallery
      : gallery?.filter((item) => item?.tag === activeTagFilter);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-3xl  md:text-4xl font-semibold">Gallery</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Image
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mx-4 mb-4">
        {/* {console.log(availableTags)} */}
        {availableTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeTagFilter === tag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTagFilter(tag)}
          >
            {tag.replace('_', ' ')}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:pl-20">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Image' : 'Add New Image'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Tag</label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="">Select a tag</option>
                  {availableTags
                    .filter((tag) => tag !== 'all')
                    .map((tag) => (
                      <option key={tag} value={tag}>
                        {tag.replace('_', ' ')}
                      </option>
                    ))}
                </select>
              </div>
              {isUpdateMode ? (
                <> </>
              ) : (
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Custom Tag</label>
                  <input
                    type="text"
                    name="customTag"
                    value={formData.customTag}
                    onChange={handleInputChange}
                    placeholder="Enter your custom tag"
                    className="w-full border p-2 rounded-lg"
                  />
                </div>
              )}

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
                  disabled={isLoading} // Disable button while loading
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

      <div className="flex flex-col items-center gap-4 mx-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {filteredGallery.map((item) => (
          <div
            key={item._id}
            className=" rounded-lg shadow-lg flex flex-col items-center w-full small-range:w-[80%] md:w-[90%] lg:w-[80%]"
          >
            <div className="w-full h-[250px] overflow-hidden">
              <img
                src={item.image}
                alt="Gallery"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="my-4 flex gap-4">
              <button
                onClick={() => openUpdateModal(item)}
                className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
              >
                <MdEdit />
              </button>

              <button
                onClick={() => handleDeletePost(item._id)}
                className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
