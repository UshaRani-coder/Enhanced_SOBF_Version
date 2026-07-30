import { toast } from 'react-toastify';

const validatePost = (formData, isUpdateMode = false) => {
  if (!formData.title.trim()) {
    toast.error('Title is required.');
    return false;
  }

  if (!formData.description?.trim()) {
    toast.error('Description is required.');
    return false;
  }

  if (!isUpdateMode && !formData.date) {
    toast.error('Please pick a date.');
    return false;
  }

  // Only require image while adding new activity
  if (!isUpdateMode && (!formData.images || formData.images.length === 0)) {
    toast.error('Images are required.');
    return false;
  }

  return true;
};

export default validatePost;
