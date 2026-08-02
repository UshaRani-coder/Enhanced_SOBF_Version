import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addRegisteredEvent } from '@/reducers/upcomingeventSlice';

const useEventRegistration = (eventId) => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setProgress(0);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 10;

          if (next >= 90) {
            clearInterval(interval);
          }

          return next;
        });
      }, 200);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/post/register-event/${eventId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
          }),
        },
      );

      clearInterval(interval);
      setProgress(100);

      const data = await response.json();

      if (response.ok) {
        dispatch(addRegisteredEvent(eventId));

        toast.success(data.message || 'Registration successful!');

        setTimeout(() => {
          setShowForm(false);
          setFormData({
            name: '',
            email: '',
          });
        }, 1000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Failed to register for the event');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  return {
    showForm,
    setShowForm,

    formData,
    setFormData,

    errors,

    isLoading,
    progress,

    handleInputChange,
    handleSubmit,
  };
};

export default useEventRegistration;
