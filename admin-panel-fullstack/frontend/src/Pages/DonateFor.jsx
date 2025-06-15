import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDonationCategory,
  deleteDonationCategory,
  fetchAllDonations,
  updateDonationCategory,
} from '../Reducers/donateForSlice';
import { toast } from 'react-toastify';
import CircularProgress from '../helper/CircularPorgrogress';
import { ACCEPTED_DIMENSIONS } from '../helper/Dimention';

const DonateFor = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state?.donateFor);
  const [displayData, setDisplayData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
    raised: '',
    goal: '',
  });
  const [errors, setErrors] = useState({});
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const itemsPerPage = 5;
  const TOLERANCE = 10;

  useEffect(() => {
    dispatch(fetchAllDonations());
  }, [dispatch, reloadTrigger]);

  useEffect(() => {
    let filtered = [...(categories || [])];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filtered.sort((a, b) => {
      if (sortConfig.key === 'raised' || sortConfig.key === 'goal') {
        const aVal = parseInt(a[sortConfig.key].replace(/₹|,/g, ''));
        const bVal = parseInt(b[sortConfig.key].replace(/₹|,/g, ''));
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      } else {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setDisplayData(filtered);
    setCurrentPage(1);
  }, [categories, searchTerm, sortConfig]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!isEditMode && !formData.image) newErrors.image = 'Image is required';
    if (!formData.raised.trim()) newErrors.raised = 'Raised amount is required';
    if (!formData.goal.trim()) newErrors.goal = 'Goal amount is required';

    if (formData.raised.trim() && isNaN(Number(formData.raised.replace(/₹|,/g, '')))) {
      newErrors.raised = 'Please enter a valid number';
    }
    if (formData?.goal?.trim() && isNaN(Number(formData.goal.replace(/₹|,/g, '')))) {
      newErrors.goal = 'Please enter a valid number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.image) formDataToSend.append('image', formData.image);
      formDataToSend.append('raised', formData.raised);
      formDataToSend.append('goal', formData.goal);

      if (isEditMode) {
        const resultAction = await dispatch(
          updateDonationCategory({ id: currentCategoryId, data: formDataToSend })
        );

        if (updateDonationCategory.fulfilled.match(resultAction)) {
          toast.success('Post updated successfully!');
        } else {
          throw resultAction.error;
        }
      } else {
        const resultAction = await dispatch(createDonationCategory(formDataToSend));
        if (createDonationCategory.fulfilled.match(resultAction)) {
          toast.success('Post added successfully!');
        } else {
          throw resultAction.error;
        }
      }

      setIsModalOpen(false);
      resetForm();
      setReloadTrigger(prev => !prev);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || `Failed to ${isEditMode ? 'update' : 'add'} post.`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: '',
      raised: '',
      goal: '',
    });
    setErrors({});
    setIsEditMode(false);
    setCurrentCategoryId(null);
  };

  const handleEdit = (category) => {
    setFormData({
      title: category.title,
      description: category.description,
      image: null,
      imagePreview: category.image,
      raised: category.raised,
      goal: category.goal,
    });
    setIsEditMode(true);
    setCurrentCategoryId(category._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation post?')) {
      try {
        const resultAction = await dispatch(deleteDonationCategory(id));
        if (deleteDonationCategory.fulfilled.match(resultAction)) {
          toast.success('Post deleted successfully!');
          setReloadTrigger(prev => !prev);
        } else {
          throw resultAction.error;
        }
      } catch (error) {
        console.error('Deletion error:', error);
        toast.error(error.message || 'Failed to delete post.');
      }
    }
  };

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };



  const handleImageChange = (e) => {
    const file = e.target?.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setErrors({ ...errors, image: 'Please select an image file' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const isValidDimension = ACCEPTED_DIMENSIONS.some(
          (dim) =>
            Math.abs(img.width - dim.width) <= TOLERANCE &&
            Math.abs(img.height - dim.height) <= TOLERANCE,
        );

        if (!isValidDimension) {
          setErrors({
            ...errors,
            image: `Image dimensions (${img.width}x${img.height}) don't match required dimensions`,
          });
          return;
        }

        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });

        if (errors.image) {
          setErrors({ ...errors, image: null });
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const paginatedData = displayData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 mx-auto">
      {/* Add/Edit Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full sm:w-96 sm:ml-28 lg:w-full max-w-2xl max-h-[90vh] overflow-y-auto z-[1000]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? 'Edit Donation Post' : 'Add New Donation Post'}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="title">
                      Title*
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData?.title}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg ${errors?.title ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors?.title}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="description">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter description"
                      rows="3"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">
                      Image{!isEditMode && '*'}
                    </label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className={`w-full p-2 border rounded-lg ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {isEditMode && (
                          <p className="text-sm text-gray-500 mt-1">
                            Leave empty to keep current image
                          </p>
                        )}
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                      </div>
                      {(formData.imagePreview || isEditMode) && (
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">Image Preview:</p>
                          <div className="border p-2 rounded-lg">
                            <img
                              src={formData.imagePreview}
                              alt="Preview"
                              className="max-h-40 w-auto mx-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="raised">
                        Amount Raised*
                      </label>
                      <input
                        type="text"
                        id="raised"
                        name="raised"
                        value={formData.raised}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.raised ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter amount raised"
                      />
                      {errors.raised && <p className="text-red-500 text-sm mt-1">{errors.raised}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2" htmlFor="goal">
                        Goal Amount*
                      </label>
                      <input
                        type="text"
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.goal ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter goal amount"
                      />
                      {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {isEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pb-8 items-center">
        <h1 className="text-2xl small-range:text-3xl md:text-3xl lg:text-4xl font-semibold">
          Donors Details
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-4 py-2 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={() => {
            setIsEditMode(false);
            setIsModalOpen(true);
          }}
        >
          Add Post
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or description..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-[#27274F]">
            <tr >
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('title')}>
                Title {sortConfig?.key === 'title' && (sortConfig?.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('raised')}>
                Raised {sortConfig?.key === 'raised' && (sortConfig?.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('goal')}>
                Goal {sortConfig?.key === 'goal' && (sortConfig?.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3">Progress</th>
              <th className="px-6 py-3">Donors</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody onClick={() => toggleExpand(category?._id)}>
            {paginatedData?.map((category) => {
              const parseCurrency = (value) => parseInt((value || '0').replace(/₹|,/g, ''));
              const raised = parseCurrency(category?.raised);
              const goal = parseCurrency(category?.goal);
              const progress = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

              return (
                <React.Fragment key={category?._id}>
                  <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => toggleExpand(category?._id)}>
                    <td className="px-6 py-4 font-medium text-gray-900 cursor-pointer"  onClick={() => toggleExpand(category?._id)}>
                      <div className="flex items-center">
                        <img
                          src={category?.image || ''}
                          alt={category?.title}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        {category?.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" >
                      {category?.description}
                    </td>
                    <td className="px-6 py-4">{category?.raised}</td>
                    <td className="px-6 py-4">{category?.goal}</td>
                    <td className="px-6 py-4">
                      <CircularProgress percentage={progress} />
                    </td>
                    <td className="px-6 py-4 text-center" onClick={() => toggleExpand(category?._id)}>
                      {category?.donor?.length || 0}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 font-bold hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category?._id)}
                          className="text-red-600 font-bold hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedRow === category?._id && category?.donor?.length > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan="7" className="px-6 py-4">
                        <div className="ml-12">
                          <h4 className="font-semibold mb-2">Donors:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category?.donor?.map((user) => (
                              <div key={user?._id} className="border p-3 rounded-lg">
                                <p><span className="font-medium">Name:</span> {user?.fullname}</p>
                                <p><span className="font-medium">Email:</span> {user?.email}</p>
                                <p><span className="font-medium">Amount:</span> {user?.amount}</p>
                                <p><span className="font-medium">Aadhar:</span> {user?.aadhar_no}</p>
                                <p><span className="font-medium">PAN:</span> {user?.pan_no}</p>
                                <p><span className="font-medium">Phone:</span> {user?.phone_no}</p>
                                <p><span className="font-medium">Address:</span> {user?.address}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={`page-${i}-${pageNum}`}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === pageNum
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      <div className="mt-4 text-center text-gray-500">
        Showing {paginatedData?.length} of {displayData?.length} items
      </div>
    </div>
  );
};

export default DonateFor;