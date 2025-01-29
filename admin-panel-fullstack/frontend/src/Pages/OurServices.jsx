import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdEdit, MdDelete } from "react-icons/md";
import { addService, getServices, removeService, updateService, } from "../Reducers/OurServicesSlice";

const OurService = () => {
  const dispatch = useDispatch();
  const { services, status } = useSelector((state) => state.services);
  const maxLength = 500; // Max character limit for description
  const maxImages = 5; // Max number of service images allowed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    logo: null,
    images: [],
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getServices()); // Fetching posts
    }
  }, [status, dispatch]);

  // ! Add a post
  const handleAddPost = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required and cannot be empty");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required and cannot be empty");
      return;
    }
    if (!formData.logo) {
      toast.error("Logo is required");
      return;
    }
    if (formData?.images?.length === 0) {
      toast.error("At least one service image is required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("logo", formData.logo);
    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    setIsLoading(true); // Start loading
    dispatch(addService(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success("Post added successfully!");
        setIsModalOpen(false);
        resetForm();
        dispatch(getServices()); // Re-fetch services after adding a post
      })
      .catch((error) => {
        toast.error(error || "Failed to add post");
      })
      .finally(() => setIsLoading(false)); // End loading
  };


  //!  Update a post
  const handleUpdatePost = () => {
    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("description", formData.description);
    if (formData.logo) updatedData.append("logo", formData.logo);
    formData.images.forEach((image) => updatedData.append("images", image));

    setIsLoading(true);
    dispatch(updateService({ id: currentPost?._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Post updated successfully!");
        setIsModalOpen(false);
        resetForm();
        setIsModalOpen(false);
        dispatch(getServices());
      })
      .catch((error) => {
        toast.error(error || "Failed to update post");
      })
      .finally(() => {
        setIsLoading(false)
        setIsModalOpen(false);
        dispatch(getServices());
      });
  };

  // ! Delete a post
  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsLoading(true); // Start loading
      dispatch(removeService(id))
        .unwrap()
        .then(() => {
          toast.success("Post deleted successfully!");
        })
        .catch((error) => {
          toast.error(error || "Failed to delete post");
        }).finally(() => setIsLoading(false)); // End loading;
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > maxLength) {
      toast.error(`Description exceeds the maximum character limit of ${maxLength}.`);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaste = (e) => {
    const { name } = e.target;
    const pastedText = e.clipboardData.getData("text");
    if (name === "description") {
      const combinedText = formData.description + pastedText;
      setFormData((prev) => ({ ...prev, [name]: combinedText }));
    }
  };


  // ! Handle file changes 
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/avif", "image/webp"];
    if (name === "logo") {
      if (files[0] && !allowedImageTypes.includes(files[0].type)) {
        toast.error("Only image files (JPEG, PNG, GIF, WebP) are allowed for the logo.");
        return;
      }
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else if (name === "images") {
      const invalidFiles = Array.from(files).filter((file) => !allowedImageTypes.includes(file.type));
      if (invalidFiles.length > 0) {
        toast.error("Only image files (JPEG, PNG, GIF, WebP) are allowed for service images.");
        return;
      }
      if (files.length > maxImages) {
        toast.error(`You can upload a maximum of ${maxImages} images.`);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)].slice(0, maxImages),
      }));
    }
  };

  //! reset form data
  const resetForm = () => {
    setFormData({ title: "", description: "", logo: null, images: [] });
    setCurrentPost(null);
  };


  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      title: post?.title || "",
      description: post?.description || "",
      logo: null,
      images: [],
    });
  };


  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">Our Services</h1>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
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
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onPaste={handlePaste}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter description"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block font-semibold mb-2">Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className=""
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
                  className=""
                />
                <p className="text-sm text-gray-500">
                  You can upload up to {maxImages} images.
                </p>
                <div className="flex gap-3 mt-4">
                  {
                    formData && formData?.images.map((image, index) => (
                      <img
                        key={image._id}
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="h-14 w-14 object-cover rounded"
                      />
                    ))
                  }
                </div>
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
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  disabled={isLoading}
                  onClick={isUpdateMode ? handleUpdatePost : handleAddPost}
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
                    "Update"
                  ) : (
                    "Add"
                  )}

                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {services && services?.length > 0 ? (
          services.map((post) => (
            <div
              key={post._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={post?.logo}
                alt="Logo"
                className="h-20 w-20 object-cover rounded-full mt-2"
              />
              <h2 className="text-lg font-bold">{post?.title}</h2>
              <p className="text-sm mt-2">{post?.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  onClick={() => openUpdateModal(post)}
                >
                  <MdEdit />
                </button>
                <button
                  className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500"
                  onClick={() => handleDeletePost(post?._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default OurService;
