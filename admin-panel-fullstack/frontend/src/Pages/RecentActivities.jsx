import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// import { getPosts, removePost } from '../reducers/RecentActivityPostPageSlice';
import {
  getPosts,
  addPost,
  updatePost,
  removePost,

} from '../reducers/RecentActivityPostPageSlice';
import usePostForm from '../hooks/usePostForm';
import validatePost from '../utils/validatePost.js';
import RecentActivityModal from '../components/RecentActivities/RecentActivityModal';
import RecentActivityList from '../components/RecentActivities/RecentActivityList';
import RecentActivityPreviewModal from '../components/RecentActivities/RecentActivityPreviewModal.jsx';

const RecentActivities = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts?.posts || []);

  const {
    formData,
    setFormData,

    isModalOpen,
    isUpdateMode,
    isLoading,

    previewImage,

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
    resetForm,
  } = usePostForm({
    addAction: addPost,
    updateAction: updatePost,
    removeAction: removePost,
    getAction: getPosts,
    validate: validatePost,
  });

  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      {/* Header */}

      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl small-range:text-3xl md:text-4xl font-semibold">
          Recent Activities
        </h1>

        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[14px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          onClick={openAddModal}
        >
          Add Post
        </button>
      </div>

      {/* Add / Update Modal */}
      <RecentActivityModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        isUpdateMode={isUpdateMode}
        isLoading={isLoading}
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={isUpdateMode ? handleUpdatePost : handleAddPost}
        resetForm={resetForm}
        handleRemoveImage={handleRemoveImage}
        previewImage={previewImage}
        fileInputRef={fileInputRef}
        quillRef={quillRef}
      />

      {/* List */}
      <RecentActivityList
        posts={posts}
        onEdit={openUpdateModal}
        onDelete={handleDeletePost}
        onExpand={setExpandedItem}
      />

      {/* Expanded Preview */}
      <RecentActivityPreviewModal
        expandedItem={expandedItem}
        closeExpandedModal={() => setExpandedItem(null)}
      />
    </div>
  );
};

export default RecentActivities;
