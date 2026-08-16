import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import usePostForm from '../hooks/usePostForm';
import useBulletinForm from '../hooks/usePostForm';
import {
  addBulletine,
  updateBulletine,
  removeBulletine,
  getBulletine,
} from '../reducers/bulletinSlice';
import validatePost from '../utils/validatePost.js';
import BulletinList from '../components/NewsBulletines/BulletinList';
import BulletinModal from '../components/NewsBulletines/BulletinModal';
import BulletinPreviewModal from '../components/NewsBulletines/BulletinPreviewModal';

const NewsBulletines = () => {
  const dispatch = useDispatch();

  const { bulletines, status } = useSelector((state) => state.bulletines);

  const {
    formData,
    setFormData,

    previewImage,
    setPreviewImage,

    currentPost,

    isModalOpen,
    setIsModalOpen,

    isUpdateMode,

    isLoading,

    fileInputRef,

    quillRef,

    openAddModal,

    openUpdateModal,

    closeModal,

    handleInputChange,

    handleFileChange,

    handleAddPost,

    handleUpdatePost,

    handleDeletePost,

    handleRemoveImage,
  } = usePostForm({
    addAction: addBulletine,

    updateAction: updateBulletine,

    removeAction: removeBulletine,

    getAction: getBulletine,

    validate: validatePost,
  });

  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBulletine());
    }
  }, [status, dispatch]);

  const handleExpandBulletin = (bulletin) => {
    setExpandedItem(bulletin);
  };

  const closePreview = () => {
    setExpandedItem(null);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">News Posts</h1>

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
    active:scale-95"
          onClick={openAddModal}
        >
          Add Post
        </button>
      </div>

      <BulletinList
        bulletines={bulletines}
        onExpand={handleExpandBulletin}
        onEdit={openUpdateModal}
        onDelete={handleDeletePost}
      />

      {expandedItem && (
        <BulletinPreviewModal bulletin={expandedItem} onClose={closePreview} />
      )}

      {isModalOpen && (
        <BulletinModal
          isModalOpen={isModalOpen}
          formData={formData}
          previewImage={previewImage}
          fileInputRef={fileInputRef}
          isUpdateMode={isUpdateMode}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleRemoveImage={handleRemoveImage}
          handleSubmit={isUpdateMode ? handleUpdatePost : handleAddPost}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default NewsBulletines;
