import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleryImages } from '../reducers/gallerySlice';

import GalleryModal from '../components/Gallery/GalleryModal';
import GalleryGrid from '../components/Gallery/GalleryGrid';
import GalleryFilter from '../components/Gallery/GalleryFilter';
import Pagination from '../components/Pagination';

import useGalleryForm from '../hooks/useGalleryForm';

const Gallery = () => {
  const dispatch = useDispatch();

  const { gallery = [], status } = useSelector((state) => state.gallery);

  const [availableTags, setAvailableTags] = useState([]);
  const [activeTagFilter, setActiveTagFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const defaultTags = [
    'Sadhu Seva',
    'Brajkulam Community Center',
    'Swachh & Swasth Vrindavan',
    'Food Distribution',
  ];

  const {
    formData,
    isModalOpen,
    isUpdateMode,
    isLoading,
    handleInputChange,
    handleSubmit,
    openAddModal,
    openUpdateModal,
    handleDeletePost,
    closeModal,
  } = useGalleryForm();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getGalleryImages());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const uniqueTags = [];

    gallery.forEach((item) => {
      const tag = item?.tag?.trim().toLowerCase();

      if (tag && tag !== 'all' && !uniqueTags.includes(tag)) {
        uniqueTags.push(tag);
      }
    });

    setAvailableTags(['all', ...uniqueTags]);
  }, [gallery]);

  const handleFilterChange = (tag) => {
    setActiveTagFilter(tag);
    setCurrentPage(1);
  };

  const filteredGallery =
    activeTagFilter === 'all'
      ? gallery
      : gallery.filter((item) => item.tag === activeTagFilter);

  const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);

  const paginatedGallery = filteredGallery.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-3xl md:text-4xl font-semibold">Gallery</h1>

        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
        >
          Add Image
        </button>
      </div>

      <GalleryFilter
        availableTags={availableTags}
        activeTagFilter={activeTagFilter}
        onFilterChange={handleFilterChange}
      />

      <GalleryGrid
        data={paginatedGallery}
        onEdit={openUpdateModal}
        onDelete={handleDeletePost}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <div className="text-center text-gray-500 mt-4">
        Showing {paginatedGallery.length} of {filteredGallery.length} images
      </div>

      <GalleryModal
        isOpen={isModalOpen}
        isUpdateMode={isUpdateMode}
        formData={formData}
        availableTags={availableTags}
        defaultTags={defaultTags}
        isLoading={isLoading}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
};

export default Gallery;
