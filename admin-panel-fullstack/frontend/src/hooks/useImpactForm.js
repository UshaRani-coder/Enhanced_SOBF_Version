import { useState } from 'react';
import { toast } from 'react-toastify';

const useImpactForm = () => {
  const [formData, setFormData] = useState({
    total_services: '',
    description: '',
    image: null,
  });

  const maxImageSize = 2 * 1024 * 1024; // 2MB

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image/icon upload with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
      'image/svg+xml',
    ];

    // Validate file type immediately
    if (!allowedImageTypes.includes(file.type)) {
      toast.error(
        'Only JPG, PNG, WEBP, or SVG icons/images are allowed.',
      );

      e.target.value = '';
      return;
    }

    // Validate file size
    if (file.size > maxImageSize) {
      toast.error('Image size should be less than 2MB.');

      e.target.value = '';
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // Validate form before submit
  const validateForm = (isUpdateMode = false) => {
    const { total_services, description, image } = formData;

    if (!total_services.trim()) {
      toast.error('Total services is required and cannot be empty.');
      return false;
    }

    if (!description.trim()) {
      toast.error('Description is required and cannot be empty.');
      return false;
    }

    // Image required only for creating
    if (!isUpdateMode && !image) {
      toast.error('Icon/Image is required.');
      return false;
    }

    return true;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      total_services: '',
      description: '',
      image: null,
    });
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleFileChange,
    validateForm,
    resetForm,
  };
};

export default useImpactForm;