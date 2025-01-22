import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addGallery, getGalleryImages, updateGalleryImage, removeGallery, } from "../Reducers/gallerySlice";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const tags = [
  "all",
  "child_activities",
  "sadhu_seva",
  "health_awareness",
  "child_education",
  "yamuna_cleaning",
];

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({ image: null, tag: "all" });


  useEffect(() => {
    if (status === "idle") {
      dispatch(getGalleryImages());   // ? getting post 
    }
  }, [status, dispatch]);


  // ? Adding post 
  const handleAddPost = () => {
    if (!formData.image) {
      toast.error("Image is required");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("tag", formData.tag);
    dispatch(addGallery(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success("Gallery post added successfully!");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add gallery post.");
      });
  };

  // ? update post
  const handleUpdatePost = () => {
    const updatedData = new FormData();
    if (formData.image) updatedData.append("image", formData.image);
    updatedData.append("tag", formData.tag);

    dispatch(updateGalleryImage({ id: currentPost?._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Image updated successfully!");
        setIsModalOpen(false);
        resetForm();
      })
      .catch((error) => {
        toast.error(error || "Failed to update image.");
      });
  };

  // ? delete post
  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(removeGallery(id))
        .unwrap()
        .then(() => {
          toast.success("Image deleted successfully!");
        })
        .catch((error) => {
          toast.error(error || "Failed to delete image.");
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({ image: null, tag: "all" });
    setCurrentPost(null);
  };

  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({ image: null, tag: post.tag });
  };
  const filteredGallery = formData?.tag === "all"
    ? gallery?.filter((item) => item?.tag)
    : gallery?.filter((item) => item?.tag === formData?.tag);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Image
        </button>
      </div>

      {/* Dropdown for Tags */}
      <div className="flex justify-center my-4 gap-2">
        {tags && tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => setFormData((prev) => ({ ...prev, tag }))}
            className={`px-4 py-2 rounded-lg ${formData?.tag === tag
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
              }`}
          >
            {tag.replace("_", " ")}
          </button>
        ))}
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? "Update Image" : "Add New Image"}
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
                  value={formData?.tag}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded-lg"
                >
                  {tags && tags?.map((tag) => (
                    <option key={tag._id} value={tag}>
                      {tag?.replace("_", " ")}
                    </option>
                  ))}
                </select>
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
                  {isUpdateMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Images */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGallery && filteredGallery && filteredGallery?.length > 0 ? (
          filteredGallery.map((post) => (
            <div
              key={post?._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={post?.image}
                alt={post?.tag || "No Tag"}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">
                  {post?.tag?.replace("_", " ") || "No Tag"}
                </h3>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openUpdateModal(post)}
                    className="text-blue-600"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post?._id)}
                    className="text-red-600"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No images available or data is loading...</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
