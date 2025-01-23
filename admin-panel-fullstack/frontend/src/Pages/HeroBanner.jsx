import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {addHeroBanner,getHeroBanners, updateHeroBanners,removeHeroBanner,} from "../Reducers/heroBannerSlice";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const HeroBanner = () => {
  const dispatch = useDispatch();
  const { heroBanner, status } = useSelector((state) => state.heroBanner);
  const maxLength = 60;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({ quotes: "", image: null });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getHeroBanners()); // ? getting post 
    }
  }, [status, dispatch]);



  // ? adding post
  const handleAddPost = () => {
    if (!formData.quotes.trim()) {
      toast.error("Quote is required and cannot be empty");
      return;
    }
    if (!formData.image) {
      toast.error("Image is required");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("quotes", formData.quotes);
    formDataToSend.append("image", formData.image);

    dispatch(addHeroBanner(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success("Hero Banner added successfully!");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error || "Failed to add Hero Banner");
      });
  };


  // ? updating post 
  const handleUpdatePost = () => {
    if (!formData.quotes.trim()) {
      toast.error("Quote is required and cannot be empty");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("quotes", formData.quotes);
    if (formData.image) updatedData.append("image", formData.image);

    dispatch(updateHeroBanners({ id: currentPost._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Hero Banner updated successfully!");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error || "Failed to update Hero Banner");
      });
  };


//  ? deleting 
  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Hero Banner? This action cannot be undone."
    );

    if (confirmDelete) {
      dispatch(removeHeroBanner(id))
        .unwrap()
        .then(() => {
          toast.success("Hero Banner deleted successfully!");
        })
        .catch((error) => {
          toast.error(error || "Failed to delete Hero Banner");
        });
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.length <= maxLength) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const resetForm = () => {
    setFormData({ quotes: "", image: null });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      quotes: post.quotes || "",
      image: null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl small-range:text-3xl md:text-4xl  font-semibold">
          Hero Banners
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl "
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Banner
        </button>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
      <h2 className="text-xl font-bold mb-4">
        {isUpdateMode ? "Update Banner" : "Add New Banner"}
      </h2>
      <form>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Quote</label>
          <input
            type="text"
            name="quotes"
            value={formData.quotes}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            maxLength={maxLength}
          />
          <p className="mt-2 text-sm text-gray-500">
            {maxLength - formData.quotes.length} characters remaining
          </p>

          {/* Warning if character limit exceeded */}
          {formData.quotes.length > maxLength && (
            <p className="mt-2 text-sm text-red-500">
              Warning: Character limit exceeded!
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
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
            disabled={formData.quotes.length > maxLength} // Disable if character limit is exceeded
          >
            {isUpdateMode ? "Update Banner" : "Add Banner"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      <div className="mt-6 flex flex-wrap justify-center  gap-4 ">
        {heroBanner.length > 0 ? (
          heroBanner.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded w-64 hover:shadow-lg flex flex-col items-center"
            >
              <img
                src={post.image || "https://via.placeholder.com/150"}
                alt="Hero Banner"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">
                {post.quotes}
              </h3>

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
          <p>No banners found.</p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
