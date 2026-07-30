import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  addService,
  updateService,
  getServices,
} from '../reducers/OurServicesSlice';
import validateService from '../components/OurServices/validateService';
import {
  MAX_IMAGES,
  checkAspectRatio,
  createServiceFormData,
} from '../helper/serviceHelpers';

const initialFormData = {
  title: '',
  small_description: '',
  description: '',
  color: '',
  logo: null,
  images: [],
  existingImages: [],
};

const useServiceForm = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentPost(null);
    setIsUpdateMode(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openUpdateModal = (post) => {
    setCurrentPost(post);
    setIsUpdateMode(true);
    setIsModalOpen(true);
    setFormData({
      title: post?.title || '',
      small_description: post?.small_description || '',
      description: post?.description || '',
      color: post?.color || '',
      logo: null,
      images: [],
      existingImages: post?.images || [],
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const { name, value } = e;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePaste = (e) => {
    const { name } = e.target;
    if (name !== 'description') return;
    const pastedText = e.clipboardData.getData('text');
    setFormData((prev) => ({
      ...prev,
      [name]: prev.description + pastedText,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (!files || !files.length) return;
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (name === 'logo') {
      const file = files[0];
      if (!allowedImageTypes.includes(file.type)) {
        toast.error('Only JPEG, JPG and PNG files are allowed for logo.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
      return;
    }

    if (name === 'images') {
      const selectedImages = Array.from(files);
      const invalidFiles = selectedImages.filter(
        (file) => !allowedImageTypes.includes(file.type),
      );
      if (invalidFiles.length) {
        toast.error('Only JPEG, JPG and PNG files are allowed.');
        return;
      }
      if (selectedImages.length > MAX_IMAGES) {
        toast.error(`You can upload maximum ${MAX_IMAGES} images.`);
        return;
      }

      const validImages = [];

      for (const file of selectedImages) {
        const { isValid, width, height } = await checkAspectRatio(file);

        if (!isValid) {
          toast.error(
            `Image is ${width}×${height}px. Please upload 16:9 image`,
          );
          return;
        }

        validImages.push(file);
      }
      setFormData((prev) => ({
        ...prev,
        images: validImages,
      }));
    }
  };

  const handleAddService = async () => {
    if (!validateService(formData)) return;
    try {
      setIsLoading(true);
      const payload = createServiceFormData(formData);
      await dispatch(addService(payload)).unwrap();
      toast.success('Service added successfully');
      closeModal();
      await dispatch(getServices());
    } catch (err) {
      toast.error(err?.message || 'Failed to add service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateService = async () => {
    if (!validateService(formData, true)) return;
    try {
      setIsLoading(true);
      const payload = createServiceFormData(formData);
      await dispatch(
        updateService({
          id: currentPost._id,
          updatedData: payload,
        }),
      ).unwrap();
      toast.success('Service updated successfully');
      closeModal();
      await dispatch(getServices());
    } catch (err) {
      toast.error(err?.message || 'Failed to update service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      ...(type === 'new'
        ? {
            images: prev.images.filter((_, i) => i !== index),
          }
        : {
            existingImages: prev.existingImages.filter((_, i) => i !== index),
          }),
    }));
  };

  return {
    formData,
    setFormData,
    isModalOpen,
    setIsModalOpen,
    isUpdateMode,
    currentPost,
    isLoading,
    openAddModal,
    openUpdateModal,
    closeModal,
    handleInputChange,
    handlePaste,
    handleFileChange,
    handleAddService,
    handleUpdateService,
    handleRemoveImage,
    resetForm,
  };
};

export default useServiceForm;
