import { useRef, useState } from 'react';
import cropImage from '../utils/cropImage';

const useHeroBannerForm = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    quotes: '',
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const maxLength = 80;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value.length <= maxLength) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const croppedFile = await cropImage(file);

      setFormData((prev) => ({
        ...prev,
        image: croppedFile,
      }));

      setPreviewImage(URL.createObjectURL(croppedFile));
    } catch (error) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const resetForm = () => {
    setFormData({
      quotes: '',
      image: null,
    });

    setPreviewImage(null);
    setCurrentPost(null);
    setIsUpdateMode(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openUpdateModal = (post) => {
    setIsUpdateMode(true);
    setCurrentPost(post);

    setFormData({
      quotes: post.quotes || '',
      image: null,
    });

    setPreviewImage(post.image);
  };

  return {
    formData,
    setFormData,

    previewImage,
    setPreviewImage,

    currentPost,
    setCurrentPost,

    isUpdateMode,
    setIsUpdateMode,

    fileInputRef,

    maxLength,

    handleInputChange,
    handleFileChange,

    resetForm,
    openUpdateModal,
  };
};

export default useHeroBannerForm;
