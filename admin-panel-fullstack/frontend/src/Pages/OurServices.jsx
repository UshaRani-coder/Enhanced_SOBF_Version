import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getServices, removeService } from '../reducers/OurServicesSlice';

import useServiceForm from '../hooks/useServiceForm';

import ServiceModal from '../components/OurServices/ServiceModal';
import ServiceList from '../components/OurServices/ServiceList';
import ServicePreviewModal from '../components/OurServices/ServicePreviewModal';

const OurServices = () => {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services?.services || []);

  const {
    formData,
    setFormData,
    isModalOpen,
    isUpdateMode,
    isLoading,
    openAddModal,
    openUpdateModal,
    closeModal,
    handleInputChange,
    handlePaste,
    handleFileChange,
    handleAddService,
    handleUpdateService,
    resetForm,
    handleRemoveImage,
  } = useServiceForm();

  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?'))
      return;

    try {
      await dispatch(removeService(id)).unwrap();

      toast.success('Deleted successfully');

      dispatch(getServices());
    } catch (error) {
      toast.error(error?.message || 'Failed to delete service');
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl small-range:text-3xl md:text-3xl lg:text-4xl font-semibold">
          Our Services
        </h1>

        <button
          className="   bg-[rgb(39,39,79)]
    text-white
    px-4 py-2
    small-max:px-5 small-max:py-2
    text-[14px] small-max:text-[16px]
    font-semibold
    rounded-full
    shadow-md
    transition-all duration-300 ease-out
    hover:bg-[rgb(49,49,95)]
    hover:shadow-[0_8px_25px_rgba(39,39,79,0.35)]
    active:scale-95
  "
          onClick={openAddModal}
        >
          Add Service
        </button>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        isUpdateMode={isUpdateMode}
        isLoading={isLoading}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handlePaste={handlePaste}
        handleFileChange={handleFileChange}
        handleSubmit={isUpdateMode ? handleUpdateService : handleAddService}
        resetForm={resetForm}
        handleRemoveImage={handleRemoveImage}
      />

      <ServiceList
        services={services}
        onEdit={openUpdateModal}
        onDelete={handleDeleteService}
        onExpand={setExpandedItem}
      />

      <ServicePreviewModal
        service={expandedItem}
        onClose={() => setExpandedItem(null)}
      />
    </div>
  );
};

export default OurServices;
