import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { lockScroll, unlockScroll } from '@/utils/scrollLock';
import VolunteerFields from './VolunteerFeilds.jsx';
import VolunteerSuccess from './VolunteerSuccess.jsx';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    occupation: '',
    gender: '',
    age: '',
    state: '',
    customState: '',
    city: '',
    customCity: '',
    message: '',
    purpose: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Lock the bg scroll when this modal is active
  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && {
        city: '',
        customState: '',
        customCity: '',
      }),
      ...(name === 'city' && {
        customCity: '',
      }),
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.state || formData.state === 'Select State') {
      newErrors.state = 'State is required';
    }

    if (formData.state === 'Other' && !formData.customState.trim()) {
      newErrors.customState = 'Please enter your state';
    }
    if (formData.state === 'Other') {
      if (!formData.customCity.trim()) {
        newErrors.customCity = 'Please enter your city';
      }
    } else {
      if (!formData.city || formData.city === 'Select City') {
        newErrors.city = 'City is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      state:
        formData.state === 'Other'
          ? formData.customState.trim()
          : formData.state,
      city:
        formData.state === 'Other' ? formData.customCity.trim() : formData.city,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/post/create-volunteer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      toast.success(
        data.message ||
          'Thank you for volunteering! A confirmation email has been sent to you.',
      );

      setIsSubmitted(true);
      setSubmittedEmail(payload.email);

      setFormData({
        name: '',
        email: '',
        mobile: '',
        occupation: '',
        gender: '',
        age: '',
        state: '',
        customState: '',
        city: '',
        customCity: '',
        message: '',
        purpose: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {isSubmitted ? (
        <VolunteerSuccess
          submittedEmail={submittedEmail}
          onSubmitAnother={() => {
            setIsSubmitted(false);
            setSubmittedEmail('');
          }}
        />
      ) : (
        <VolunteerFields
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default VolunteerForm;
