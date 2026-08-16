import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDonations } from '../reducers/donateForSlice';

import DonationModal from '../components/DonateFor/DonationModal';
import DonationTable from '../components/DonateFor/DonationTable';
import DonationSearch from '../components/DonateFor/DonationSearch';
import Pagination from '../components/common/Pagination';

import useDonationForm from '../hooks/useDonationForm.js';
import useDonationFilter from '../hooks/useDonationFilter';

const DonateFor = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.donateFor);

  const [expandedRow, setExpandedRow] = useState(null);

  const {
    modalOpen,
    setModalOpen,
    formData,
    errors,
    isEditMode,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleInputChange,
    handleImageChange,
    resetForm,
  } = useDonationForm();

  const {
    currentItems,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useDonationFilter(categories);

  useEffect(() => {
    dispatch(fetchAllDonations());
  }, [dispatch]);

  return (
    <div className="w-full px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 mx-auto">
      <div className="flex justify-between pb-8 items-center">
        <h1 className="text-2xl small-range:text-3xl md:text-3xl lg:text-4xl font-semibold">
          Donate For
        </h1>

        <button
          onClick={() => {
            setModalOpen(true);
          }}
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
        >
          Add Post
        </button>
      </div>

      <DonationSearch value={searchTerm} onChange={setSearchTerm} />

      <DonationTable
        data={currentItems}
        sortConfig={sortConfig}
        requestSort={requestSort}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <div className="mt-4 text-center text-gray-500">
        Showing {currentItems.length} of {categories?.length || 0} items
      </div>

      {modalOpen && (
        <DonationModal
          formData={formData}
          errors={errors}
          isEditMode={isEditMode}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onImageChange={handleImageChange}
          onClose={() => {
            setModalOpen(false);
            resetForm();
          }}
        />
      )}
    </div>
  );
};

export default DonateFor;
