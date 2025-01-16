import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { addOurImpact, getOurImpact, removeOurImpact, updateOurImpact, } from '../Reducers/ourImpactsSlice';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const OurImpacts = () => {
  const dispatch = useDispatch();
  const { ourImpacts, status } = useSelector((state) => state.ourImpacts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentImpact, setCurrentImpact] = useState(null);
  const [formData, setFormData] = useState({ total_services: '', description: '', image: null, });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getOurImpact());
    }
  }, [status, dispatch]);

  const resetForm = () => {
    setFormData({ total_services: '', description: '', image: null });
    setCurrentImpact(null);
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append('total_services', formData.total_services);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);

    if (isUpdateMode) {
      dispatch(updateOurImpact({ id: currentImpact._id, updatedData: data }))
        .then(() => toast.success('Successfully updated Our Impact'))
        .catch(() => toast.error('Failed to update Our Impact'));
    } else {
      dispatch(addOurImpact(data))
        .then(() => toast.success('Successfully added Our Impact'))
        .catch(() => toast.error('Failed to add Our Impact'));
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    dispatch(removeOurImpact(id))
      .then(() => toast.success('Successfully deleted Our Impact'))
      .catch(() => toast.error('Failed to delete Our Impact'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const openModal = (impact = null) => {
    setIsModalOpen(true);
    setIsUpdateMode(!!impact);
    setCurrentImpact(impact);
    setFormData({
      total_services: impact?.total_services || '',
      description: impact?.description || '',
      image: null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mx-4 items-center my-4">
        <h1 className="text-2xl small-range:text-3xl  lg:text-4xl font-semibold">Our Impacts</h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[13px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl "
          onClick={() => openModal()}
        >
          Add Impact
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Impact' : 'Add New Impact'}
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Services</label>
                <input
                  type="text"
                  name="total_services"
                  value={formData.total_services}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
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
                  onClick={handleSubmit}
                >
                  {isUpdateMode ? 'Update Impact' : 'Add Impact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-4 ">
        {
          ourImpacts.length > 0 ? (
            ourImpacts.map((impact) => (
              <div
                key={impact._id}
                className="border p-4 rounded w-64 hover:shadow-lg flex flex-col items-center"
              >
                <img
                  src={impact.image || 'https://via.placeholder.com/150'}
                  alt="Our Impact"
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-bold text-xl">{impact.total_services}</h3>
                <p className=" line-clamp-2 mt-2 ">{impact.description}</p>
                <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => openModal(impact)}
                >
                  <MdEdit className="text-blue-800 text-2xl" />
                </button>

                <button
                  className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                  onClick={() => handleDelete(impact._id)}
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
