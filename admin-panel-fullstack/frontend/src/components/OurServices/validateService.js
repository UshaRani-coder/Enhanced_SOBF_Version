import { toast } from 'react-toastify';

const TITLE_MAX_LENGTH = 20;
const SMALL_DESCRIPTION_MAX_LENGTH = 80;
const MAX_IMAGES = 5;

const validateService = (formData, isUpdateMode = false) => {
  const { title, small_description, description, color, logo, images } =
    formData;

  if (!title?.trim()) {
    toast.error('Title is required');
    return false;
  }

  if (title.trim().length > TITLE_MAX_LENGTH) {
    toast.error(`Title cannot exceed ${TITLE_MAX_LENGTH} characters`);
    return false;
  }

  if (!small_description?.trim()) {
    toast.error('Small description is required');
    return false;
  }

  if (small_description.trim().length > SMALL_DESCRIPTION_MAX_LENGTH) {
    toast.error(
      `Small description cannot exceed ${SMALL_DESCRIPTION_MAX_LENGTH} characters`,
    );
    return false;
  }

  // Remove HTML tags from Quill content
  const plainDescription = description
    ?.replace(/<[^>]*>/g, '')
    ?.replace(/&nbsp;/g, '')
    ?.trim();

  if (!plainDescription) {
    toast.error('Description is required');
    return false;
  }

  if (!color) {
    toast.error('Color is required');
    return false;
  }

  // Logo required only while adding
  if (!isUpdateMode && !logo) {
    toast.error('Logo is required');
    return false;
  }

  // At least one image required while adding
  if (!isUpdateMode && (!images || images.length === 0)) {
    toast.error('At least one image is required');
    return false;
  }

  if (images && images.length > MAX_IMAGES) {
    toast.error(`Maximum ${MAX_IMAGES} images are allowed`);
    return false;
  }

  return true;
};

export default validateService;
