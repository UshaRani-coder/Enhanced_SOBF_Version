import { toast } from 'react-toastify';

const validateEvent = (formData, isUpdateMode = false) => {
  const { title, description, date, startTime, endTime, location, image } =
    formData;

  if (!title?.trim()) {
    toast.error('Title is required.');
    return false;
  }

  if (!description?.trim()) {
    toast.error('Description is required.');
    return false;
  }

  if (!date) {
    toast.error('Please pick the date of the event.');
    return false;
  }

  if (!startTime) {
    toast.error('Please add the start time.');
    return false;
  }

  if (!endTime) {
    toast.error('Please add the end time.');
    return false;
  }

  if (startTime >= endTime) {
    toast.error('End time must be after start time.');
    return false;
  }

  if (!location?.trim()) {
    toast.error('Please add the event location.');
    return false;
  }

  // Image required only while creating
  if (!isUpdateMode && !image) {
    toast.error('Please add an image.');
    return false;
  }

  if (image instanceof File) {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!validTypes.includes(image.type)) {
      toast.error('Only JPEG, PNG, JPG images are allowed.');
      return false;
    }
  }

  return true;
};

export default validateEvent;
