import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  addOurImpact,
  getOurImpact,
  updateOurImpact,
  removeOurImpact,
} from '../reducers/ourImpactsSlice';

import ImpactModal from '../components/Impacts/ImpactModal';
import ImpactList from '../components/Impacts/ImpactList';
import useImpactForm from '../hooks/useImpactForm';

const OurImpacts = () => {
  const dispatch = useDispatch();

  const { ourImpacts, status } = useSelector((state) => state.ourImpacts);

  const {
    formData,
    setFormData,
    handleInputChange,
    handleFileChange,
    validateForm,
    resetForm,
  } = useImpactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentImpact, setCurrentImpact] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getOurImpact());
    }
  }, [status, dispatch]);

  const openAddModal = () => {
    resetForm();
    setCurrentImpact(null);
    setIsUpdateMode(false);
    setIsModalOpen(true);
  };

  const openUpdateModal = (impact) => {
    setCurrentImpact(impact);
    setIsUpdateMode(true);

    setFormData({
      total_services: impact?.total_services || '',
      description: impact?.description || '',
      image: null,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdateMode(false);
    setCurrentImpact(null);
    resetForm();
  };

  const handleAddImpact = async () => {
    if (!validateForm(false)) return;

    try {
      setIsLoading(true);

      const formDataToSend = new FormData();

      formDataToSend.append('total_services', formData.total_services);

      formDataToSend.append('description', formData.description);

      formDataToSend.append('image', formData.image);

      await dispatch(addOurImpact(formDataToSend)).unwrap();

      toast.success('Our impact added successfully!');

      closeModal();

      dispatch(getOurImpact());
    } catch (error) {
      toast.error(error || 'Failed to add our impact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateImpact = async () => {
    if (!validateForm(true)) return;

    if (!currentImpact?._id) {
      toast.error('No impact selected for updating');
      return;
    }

    try {
      setIsLoading(true);

      const updatedData = new FormData();

      updatedData.append('total_services', formData.total_services);

      updatedData.append('description', formData.description);

      if (formData.image) {
        updatedData.append('image', formData.image);
      }

      await dispatch(
        updateOurImpact({
          id: currentImpact._id,
          updatedData,
        }),
      ).unwrap();

      toast.success('Our impact updated successfully!');

      closeModal();

      dispatch(getOurImpact());
    } catch (error) {
      toast.error(error || 'Failed to update our impact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImpact = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this impact? This action cannot be undone.',
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      await dispatch(removeOurImpact(id)).unwrap();

      toast.success('Our impact deleted successfully!');
    } catch (error) {
      toast.error(error || 'Failed to delete our impact');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-2xl md:text-4xl font-semibold">Our Impacts</h1>

        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-6 small-max:py-3 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={openAddModal}
        >
          Add Impact
        </button>
      </div>

      <ImpactModal
        open={isModalOpen}
        close={closeModal}
        isUpdateMode={isUpdateMode}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={isUpdateMode ? handleUpdateImpact : handleAddImpact}
        isLoading={isLoading}
      />

      <ImpactList
        impacts={ourImpacts}
        onEdit={openUpdateModal}
        onDelete={handleDeleteImpact}
      />
    </div>
  );
};

export default OurImpacts;
