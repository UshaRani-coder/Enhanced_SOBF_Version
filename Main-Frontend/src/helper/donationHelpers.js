export const validateDonationForm = (formData) => {
  const errors = {};

  if (!formData.fullname.trim())
    errors.fullname = 'Full name is required';

  if (!formData.email.trim())
    errors.email = 'Email is required';

  if (!formData.phone_no.trim())
    errors.phone_no = 'Phone number is required';

  if (!formData.pan_no.trim())
    errors.pan_no = 'PAN number is required';

  if (!formData.aadhar_no.trim())
    errors.aadhar_no = 'Aadhar number is required';

  if (!formData.address.trim())
    errors.address = 'Address is required';

  if (!formData.amount.trim())
    errors.amount = 'Amount is required';

  if (
    formData.email &&
    !/^\S+@\S+\.\S+$/.test(formData.email)
  ) {
    errors.email = 'Please enter a valid email';
  }

  if (
    formData.phone_no &&
    !/^[0-9]{10}$/.test(formData.phone_no)
  ) {
    errors.phone_no = 'Phone number must be 10 digits';
  }

  if (
    formData.pan_no &&
    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_no)
  ) {
    errors.pan_no = 'Please enter a valid PAN';
  }

  if (
    formData.aadhar_no &&
    !/^[0-9]{12}$/.test(formData.aadhar_no)
  ) {
    errors.aadhar_no = 'Aadhar number must be 12 digits';
  }

  if (
    formData.amount &&
    isNaN(formData.amount)
  ) {
    errors.amount = 'Please enter a valid amount';
  }

  return errors;
};


export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');

    script.src =
      'https://checkout.razorpay.com/v1/checkout.js';

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};


export const parseAmount = (value) => {
  if (typeof value === 'string') {
    return parseInt(value.replace(/₹|,/g, '')) || 0;
  }

  return Number(value) || 0;
};


export const getDonationProgress = (raised, goal) => {
  if (!goal || goal <= 0) return 0;

  return (raised / goal) * 100;
};
