import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { addOurImpact, getOurImpact, removeOurImpact, updateOurImpact, } from '../Reducers/ourImpactsSlice';

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
      <div className="flex justify-between px-14 pb-4">
        <h1 className="text-4xl font-semibold">Our Impacts</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

      <div className="mt-6 flex flex-wrap gap-4">
        {
          ourImpacts.length > 0 ? (
            ourImpacts.map((impact) => (
              <div
                key={impact._id}
                className="border p-4 rounded w-64 hover:shadow-lg"
              >
                <img
                  src={impact.image || 'https://via.placeholder.com/150'}
                  alt="Our Impact"
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-bold text-xl">{impact.total_services}</h3>
                <p className="mt-2">{impact.description}</p>
                <div className="mt-4 flex gap-4">
                  <button
                    className="text-blue-600"
                    onClick={() => openModal(impact)}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(impact._id)}
                  >
                    Delete
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
