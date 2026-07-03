import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addOurImpact,
  getOurImpact,
  updateOurImpact,
  removeOurImpact,
} from '../Reducers/ourImpactsSlice';
import { MdEdit, MdDelete } from 'react-icons/md';

const OurImpacts = () => {
  const dispatch = useDispatch();
  const { ourImpacts, status } = useSelector((state) => state.ourImpacts);
  const maxLength = 150;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentImpact, setCurrentImpact] = useState(null);
  const [formData, setFormData] = useState({
    total_services: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getOurImpact()); //? getting posts
    }
  }, [status, dispatch]);

  // ! Validating form data
  const validateForm = () => {
    const { total_services, description, image } = formData;
    if (!total_services.trim()) {
      toast.error('Total services is required and cannot be empty');
      return false;
    }
    if (!description.trim()) {
      toast.error('Description is required and cannot be empty');
      return false;
    }
    if (!image) {
      toast.error('Image is required');
      return;
    }
    // Validate image
    if (image) {
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedImageTypes.includes(image.type)) {
        toast.error('Only JPG, PNG, or JPG images are allowed.');
        return false;
      }
    }
    return true;
  };

  // ! Adding post
  const handleAddPost = () => {
    if (!validateForm()) return;
    const formDataToSend = new FormData();
    formDataToSend.append('total_services', formData.total_services);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);
    setIsLoading(true); // Start loading
    dispatch(addOurImpact(formDataToSend))
      .unwrap()
      .then(() => {
        toast.success('Our impact added successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getOurImpact());
      })
      .catch((error) => {
        toast.error(error || 'Failed to add our impact');
      })
      .finally(() => setIsLoading(false)); // End loading
  };

  // ! Updating post
  const handleUpdatePost = () => {
    if (!formData.total_services) {
      toast.error('Total services is required and cannot be empty');
      return;
    }
    if (!formData.description) {
      toast.error('Description is required and cannot be empty');
      return;
    }
    // Validate image (if provided)
    if (formData.image) {
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedImageTypes.includes(formData.image.type)) {
        toast.error('Only JPG, PNG, or JPG images are allowed.');
        return;
      }
    }
    const updatedData = new FormData();
    updatedData.append('total_services', formData.total_services);
    updatedData.append('description', formData.description);
    if (formData.image) updatedData.append('image', formData.image);
    if (!currentImpact || !currentImpact._id) {
      toast.error('No impact selected for updating.');
      return;
    }
    setIsLoading(true);
    
    dispatch(updateOurImpact({ id: currentImpact?._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Our impact updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getOurImpact());
      })
      .catch((error) => {
        console.error('Update Error:', error);
        toast.error(error?.message || 'Failed to update our impact');
      })
      .finally(() => setIsLoading(false)); 
  };

  // ! Deleting post
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this impact? This action cannot be undone.',
    );
    if (confirmDelete) {
      setIsLoading(true); 
      dispatch(removeOurImpact(id))
        .unwrap()
        .then(() => {
          toast.success('Our impact deleted successfully!');
        })
        .catch((error) => {
          toast.error(error || 'Failed to delete our impact');
        })
        .finally(() => setIsLoading(false)); 
    }
  };

  // ! Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  // ! Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
    setErrorMessage('');
  };

  // ! Reset form data
  const resetForm = () => {
    setFormData({ total_services: '', description: '', image: null });
    setCurrentImpact(null);
  };

  const openUpdateModal = (impact) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentImpact(impact);
    setFormData({
      total_services: impact?.total_services || '',
      description: impact?.description || '',
      image: null,
    });
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl md:text-4xl font-semibold">Our Impacts</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Impact
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:pl-20">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Impact' : 'Add New Impact'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Total Impact Count
                </label>
                <input
                  type="text"
                  name="total_services"
                  value={formData.total_services}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  maxLength={maxLength}
                  placeholder="Number of Total Impacts"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  maxLength={maxLength}
                  placeholder="Enter description here"
                ></textarea>
                <p className="mt-2 text-sm text-gray-500">
                  {maxLength - formData.description?.length} characters
                  remaining
                </p>
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
                <p className="mt-2 text-sm text-blue-600">
                  Need icons?{' '}
                  <a
                    href="https://www.flaticon.com/icon-fonts-most-downloaded?weight=bold&type=uicon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Download from Flaticon
                  </a>
                </p>
              </div>
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

      <div className="mt-6 flex flex-wrap justify-center gap-4 lg:gap-10">
        {ourImpacts && ourImpacts?.length > 0 ? (
          ourImpacts?.map((impact) => (
            <div
              key={impact._id}
              className="border p-4 py-10 rounded w-64 shadow-lg hover:shadow-xl flex flex-col items-center justify-center"
            >
              <img
                src={impact?.image || 'https://via.placeholder.com/150'}
                alt="Impact"
                className="w-[70px] object-content rounded"
              />

              <h3 className=" line-clamp-2 mt-2 font-bold text-xl">
                {impact?.total_services}
              </h3>
              <p className="w-full text-center min-h-[50px] line-clamp-2 mt-1  ">
                {impact?.description}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => openUpdateModal(impact)}
                >
                  <MdEdit className="text-blue-800 text-2xl" />
                </button>
                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => handleDelete(impact?._id)}
                >
                  <MdDelete className="text-red-800 text-2xl" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No impacts found.</p>
        )}
      </div>
    </div>
  );
};

export default OurImpacts;
