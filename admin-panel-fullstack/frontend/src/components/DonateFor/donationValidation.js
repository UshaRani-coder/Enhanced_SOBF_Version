const donationValidation = (formData, isEditMode) => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!formData.description.trim()) {
    errors.description = 'Description is required';
  }

  if (!isEditMode && !formData.image) {
    errors.image = 'Image is required';
  }

  if (!formData.raised.trim()) {
    errors.raised = 'Raised amount is required';
  } else if (isNaN(Number(formData.raised.replace(/₹|,/g, '')))) {
    errors.raised = 'Please enter a valid number';
  }

  if (!formData.goal.trim()) {
    errors.goal = 'Goal amount is required';
  } else if (isNaN(Number(formData.goal.replace(/₹|,/g, '')))) {
    errors.goal = 'Please enter a valid number';
  }

  return errors;
};

export default donationValidation;
