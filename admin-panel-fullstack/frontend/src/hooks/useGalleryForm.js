import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addGallery,
  updateGalleryImage,
  removeGallery,
  getGalleryImages,
} from '../reducers/gallerySlice';

const useGalleryForm = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    image: null,
    tag: '',
    customTag: '',
  });

  const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const validateFile = (file) => {
    if (!validImageTypes.includes(file.type)) {
      toast.error('Only image files (JPEG, PNG, JPG) are allowed.');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];

      if (file && validateFile(file)) {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      image: null,
      tag: '',
      customTag: '',
    });
    setCurrentPost(null);
    setIsUpdateMode(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const getFinalTag = () => {
    return (
      formData.tag ||
      formData.customTag.trim().toLowerCase().replace(/\s+/g, '_')
    );
  };

  const handleAddPost = async () => {
    if (!formData.image) {
      toast.error('Image is required.');
      return;
    }

    if (!formData.tag && !formData.customTag.trim()) {
      toast.error('Either a tag or custom tag is required.');
      return;
    }

    if (!validateFile(formData.image)) return;

    const data = new FormData();
    data.append('image', formData.image);
    data.append('tag', getFinalTag());

    try {
      setIsLoading(true);

      await dispatch(addGallery(data)).unwrap();

      toast.success('Gallery post added successfully!');

      closeModal();
      dispatch(getGalleryImages());
    } catch (error) {
      toast.error(error?.message || 'Failed to add gallery post.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    const updatedData = new FormData();

    if (formData.image) {
      if (!validateFile(formData.image)) return;
      updatedData.append('image', formData.image);
    }

    if (!formData.tag && !formData.customTag.trim()) {
      toast.error('Either a tag or custom tag is required.');
      return;
    }

    updatedData.append('tag', getFinalTag());

    try {
      setIsLoading(true);

      await dispatch(
        updateGalleryImage({
          id: currentPost._id,
          updatedData,
        }),
      ).unwrap();

      toast.success('Image updated successfully!');

      closeModal();
      dispatch(getGalleryImages());
    } catch (error) {
      toast.error(error?.message || 'Failed to update image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    isUpdateMode ? handleUpdatePost() : handleAddPost();
  };

  const openAddModal = () => {
    resetForm();
    setIsUpdateMode(false);
    setIsModalOpen(true);
  };

  const openUpdateModal = (post) => {
    setCurrentPost(post);
    setFormData({
      image: null,
      tag: post.tag,
      customTag: '',
    });
    setIsUpdateMode(true);
    setIsModalOpen(true);
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this gallery image?',
    );

    if (!confirmDelete) return;

    try {
      await dispatch(removeGallery(id)).unwrap();

      toast.success('Successfully deleted gallery image.');
      dispatch(getGalleryImages());
    } catch (error) {
      toast.error(error?.message || 'Failed to delete gallery image.');
    }
  };

  return {
    formData,
    isModalOpen,
    setIsModalOpen,
    isUpdateMode,
    isLoading,
    handleInputChange,
    handleSubmit,
    openAddModal,
    openUpdateModal,
    handleDeletePost,
    closeModal,
    resetForm,
  };
};

export default useGalleryForm;
