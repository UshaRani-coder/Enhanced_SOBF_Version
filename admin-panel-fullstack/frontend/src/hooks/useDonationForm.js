import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createDonationCategory,
  updateDonationCategory,
  deleteDonationCategory,
} from '../reducers/donateForSlice';
import  donationValidation  from '../utils/donationValidation.js';
import { validateDonationImage } from '../utils/imageValidator';

const useDonationForm = () => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
    raised: '',
    goal: '',
  });

  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: '',
      raised: '',
      goal: '',
    });

    setErrors({});
    setIsEditMode(false);
    setCurrentCategoryId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validationError = await validateDonationImage(file);

    if (validationError) {
      setErrors((prev) => ({
        ...prev,
        image: validationError,
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }));

      setErrors((prev) => ({
        ...prev,
        image: null,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = donationValidation(formData, isEditMode);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const data = new FormData();

      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('raised', formData.raised);
      data.append('goal', formData.goal);

      if (formData.image) {
        data.append('image', formData.image);
      }

      if (isEditMode) {
        const result = await dispatch(
          updateDonationCategory({
            id: currentCategoryId,
            data,
          }),
        );

        if (updateDonationCategory.fulfilled.match(result)) {
          toast.success('Post updated successfully!');
        } else {
          throw result.error;
        }
      } else {
        const result = await dispatch(createDonationCategory(data));

        if (createDonationCategory.fulfilled.match(result)) {
          toast.success('Post added successfully!');
        } else {
          throw result.error;
        }
      }

      setModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || `Failed to ${isEditMode ? 'update' : 'add'} post`,
      );
    }
  };

  const handleEdit = (category) => {
    setFormData({
      title: category.title,
      description: category.description,
      image: null,
      imagePreview: category.image,
      raised: category.raised,
      goal: category.goal,
    });

    setIsEditMode(true);
    setCurrentCategoryId(category._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm('Are you sure you want to delete this donation post?')
    ) {
      return;
    }

    try {
      const result = await dispatch(deleteDonationCategory(id));

      if (deleteDonationCategory.fulfilled.match(result)) {
        toast.success('Post deleted successfully!');
      } else {
        throw result.error;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to delete post.');
    }
  };

  return {
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
  };
};

export default useDonationForm;
