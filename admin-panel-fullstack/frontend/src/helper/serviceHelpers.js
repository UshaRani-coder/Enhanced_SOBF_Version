export const TITLE_MAX_LENGTH = 20;
export const SMALL_DESCRIPTION_MAX_LENGTH = 80;
export const MAX_IMAGES = 5;
export const REQUIRED_ASPECT_RATIO = 16 / 9;

export const truncateDescription = (description, maxLength = 60) => {
  if (!description) return '';

  return description.length > maxLength
    ? `${description.slice(0, maxLength)}...`
    : description;
};

export const checkAspectRatio = (file) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      const aspectRatio = width / height;

      resolve({
        isValid: Math.abs(aspectRatio - REQUIRED_ASPECT_RATIO) < 0.02,
        width,
        height,
      });

      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const createServiceFormData = (formData) => {
  const payload = new FormData();

  payload.append('title', formData.title);
  payload.append('small_description', formData.small_description);
  payload.append('description', formData.description);
  payload.append('color', formData.color);

  if (formData.logo) {
    payload.append('logo', formData.logo);
  }

  formData.images.forEach((image) => {
    payload.append('images', image);
  });

  return payload;
};
