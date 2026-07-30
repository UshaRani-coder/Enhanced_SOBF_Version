const validateTeam = (formData, isUpdateMode = false) => {
  const { name, role, linkedIn, instagram, image } = formData;

  if (!name?.trim() || !role || role === '<p><br></p>') {
    return {
      valid: false,
      message: 'Name and Role are required fields.',
    };
  }

  const linkedInRegex = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/i;

  const instagramRegex = /^https:\/\/([a-z]{2,3}\.)?instagram\.com\/.*$/i;

  if (!linkedIn) {
    return {
      valid: false,
      message: 'LinkedIn is required.',
    };
  }

  if (!linkedInRegex.test(linkedIn)) {
    return {
      valid: false,
      message: 'Invalid LinkedIn URL.',
    };
  }

  if (!instagram) {
    return {
      valid: false,
      message: 'Instagram is required.',
    };
  }

  if (!instagramRegex.test(instagram)) {
    return {
      valid: false,
      message: 'Invalid Instagram URL.',
    };
  }

  if (!isUpdateMode && !image) {
    return {
      valid: false,
      message: 'Profile image is required.',
    };
  }

  if (image) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(image.type)) {
      return {
        valid: false,
        message: 'Image must be jpg, png, or jpeg.',
      };
    }
  }

  return {
    valid: true,
    message: '',
  };
};

export default validateTeam;
