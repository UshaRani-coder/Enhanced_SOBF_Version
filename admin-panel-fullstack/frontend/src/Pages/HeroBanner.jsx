import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  addHeroBanner,
  getHeroBanners,
  updateHeroBanners,
  removeHeroBanner,
} from '../reducers/heroBannerSlice';

import HeroBannerFormModal from '../components/HeroBanner/HeroBannerFormModal';
import HeroBannerList from '../components/HeroBanner/HeroBannerList';
import useHeroBannerForm from '../hooks/useHeroBannerForm';

const HeroBanner = () => {
  const dispatch = useDispatch();

  const { heroBanner, status } = useSelector((state) => state.heroBanner);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    formData,
    currentPost,
    isUpdateMode,
    previewImage,
    fileInputRef,
    maxLength,
    handleInputChange,
    handleFileChange,
    resetForm,
    openUpdateModal,
  } = useHeroBannerForm();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getHeroBanners());
    }
  }, [dispatch, status]);

  const handleAddPost = () => {
    setIsLoading(true);

    if (!formData.quotes.trim()) {
      toast.error('Quote is required and cannot be empty.');
      setIsLoading(false);
      return;
    }

    if (!formData.image) {
      toast.error('Image is required.');
      setIsLoading(false);
      return;
    }

    const data = new FormData();

    data.append('quotes', formData.quotes);
    data.append('image', formData.image);

    dispatch(addHeroBanner(data))
      .unwrap()
      .then(() => {
        toast.success('Hero Banner added successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getHeroBanners());
      })
      .catch((error) => {
        toast.error(error || 'Failed to add Hero Banner.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdatePost = () => {
    setIsLoading(true);

    if (!formData.quotes.trim()) {
      toast.error('Quote is required and cannot be empty.');
      setIsLoading(false);
      return;
    }

    const updatedData = new FormData();

    updatedData.append('quotes', formData.quotes);

    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    dispatch(
      updateHeroBanners({
        id: currentPost._id,
        updatedData,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success('Hero Banner updated successfully!');
        setIsModalOpen(false);
        resetForm();
        dispatch(getHeroBanners());
      })
      .catch((error) => {
        toast.error(error || 'Failed to update Hero Banner.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeletePost = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Hero Banner? This action cannot be undone.',
    );

    if (!confirmDelete) return;

    setIsLoading(true);

    dispatch(removeHeroBanner(id))
      .unwrap()
      .then(() => {
        toast.success('Hero Banner deleted successfully!');
        dispatch(getHeroBanners());
      })
      .catch((error) => {
        toast.error(error || 'Failed to delete Hero Banner.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenUpdateModal = (post) => {
    openUpdateModal(post);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      <div className="mx-4 my-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold small-range:text-3xl md:text-4xl">
          Hero Banners
        </h1>

        <button
          onClick={handleOpenAddModal}
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
          Add Banner
        </button>
      </div>

      <HeroBannerFormModal
        isModalOpen={isModalOpen}
        isUpdateMode={isUpdateMode}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleAddPost={handleAddPost}
        handleUpdatePost={handleUpdatePost}
        isLoading={isLoading}
        previewImage={previewImage}
        fileInputRef={fileInputRef}
        maxLength={maxLength}
        onClose={handleCloseModal}
      />

      <HeroBannerList
        heroBanner={heroBanner}
        openUpdateModal={handleOpenUpdateModal}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default HeroBanner;
