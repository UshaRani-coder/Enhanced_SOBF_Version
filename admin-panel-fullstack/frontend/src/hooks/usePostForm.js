import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import validatePost from '../utils/validatePost.js';
import checkImageDimensions from '../utils/checkImageDimensions.js';

import {
  initialPostFormData,
  resetPostForm,
  handlePostInputChange,
  removePostImage,
  populatePostForm,
} from '../helper/postHelpers.js';

const usePostForm = ({
  addAction,
  updateAction,
  removeAction,
  getAction,
  validate,
}) => {
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const quillRef = useRef(null);

  const [formData, setFormData] = useState(initialPostFormData);

  const [previewImage, setPreviewImage] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    resetPostForm({
      setFormData,
      setPreviewImage,
      setCurrentPost,
      fileInputRef,
    });
  };

  const openAddModal = () => {
    resetForm();
    setIsUpdateMode(false);
    setIsModalOpen(true);
  };

  const openUpdateModal = (post) => {
    populatePostForm({
      post,
      setFormData,
      setPreviewImage,
      setCurrentPost,
      setIsModalOpen,
      setIsUpdateMode,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (data) => {
    handlePostInputChange(data, setFormData);
  };

  const handleRemoveImage = (index) => {
    removePostImage(index, setFormData);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    if (name !== 'images') return;
    const file = files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(file.type)) {
      toast.error('Only image files (JPEG, PNG, JPG) are allowed.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();

      image.onload = () => {
        const aspectRatio = image.width / image.height;

        const minAspect = 1;
        const maxAspect = 3;
        const isValidRatio = Math.abs(aspectRatio - 16 / 9) < 0.02;

        if (!isValidRatio) {
          toast.error(
            `Please upload a 16:9 aspect ratio image. Your image ${image.width}×${image.height}px is too tall or too wide.`,
            {
              autoClose: 5000,
            },
          );

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          return;
        }

        setFormData((prev) => ({
          ...prev,
          images: [file],
        }));

        setPreviewImage(URL.createObjectURL(file));
      };

      image.onerror = () => {
        toast.error('Failed to load the image. Please try another file.');

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleAddPost = async () => {
    if (!(await validatePost(formData, false))) {
      return;
    }
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);

    formData.images.forEach((image) => data.append('images', image));

    try {
      setIsLoading(true);
      await dispatch(addAction(data)).unwrap();

      dispatch(getAction());
      toast.success('Post added successfully');
      closeModal();
      dispatch(getPosts());
    } catch (error) {
      toast.error(error || 'Failed to add post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!(await validatePost(formData, true))) {
      return;
    }
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    formData.images?.forEach((image) => data.append('images', image));

    try {
      setIsLoading(true);
      await dispatch(
        updateAction({
          id: currentPost._id,
          updatedData: data,
        }),
      ).unwrap();

      dispatch(getAction());
      toast.success('Post updated successfully');
      closeModal();
      dispatch(getPosts());
    } catch (error) {
      toast.error(error || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    try {
      await dispatch(removeAction(id)).unwrap();

      dispatch(getAction());
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error(error?.message || 'Failed to delete post');
    }
  };

  return {
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
  };
};

export default usePostForm;
