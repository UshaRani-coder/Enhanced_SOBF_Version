import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    occupation: '',
    gender: '',
    age: '',
    state: '',
    city: '',
    message: '',
    purpose: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const states = ['Select State', 'Delhi', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];
  const cities = {
    'Delhi': ['Select City', 'New Delhi', 'Noida', 'Gurgaon'],
    'Uttar Pradesh': ['Select City', 'Mathura', 'Vrindavan', 'Govardhan', 'Barsana', 'Nandgaon', 'Baldeo', 'Bharatpur', 'Deeg', 'Dholpur', 'Lucknow', 'Kanpur', 'Varanasi'],
    'Maharashtra': ['Select City', 'Mumbai', 'Pune', 'Nagpur'],
    'Karnataka': ['Select City', 'Bangalore', 'Mysore', 'Hubli'],
    'Tamil Nadu': ['Select City', 'Chennai', 'Coimbatore', 'Madurai']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.state || formData.state === 'Select State') newErrors.state = 'State is required';
    if (!formData.city || formData.city === 'Select City') newErrors.city = 'City is required';

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

    try {
      const response = await fetch('http://localhost:5000/api/post/create-volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      toast.success(data.message || 'Thank you for volunteering! A confirmation email has been sent to you.');
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        occupation: '',
        gender: '',
        age: '',
        state: '',
        city: '',
        message: '',
        purpose: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (name, label, type = 'text', placeholder, options = null) => (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          disabled={name === 'city' && (!formData.state || formData.state === 'Select State')}
        >
          {options ? (
            options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))
          ) : (
            <>
              <option value="">Select {label}</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </>
          )}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          placeholder={placeholder}
          min={type === 'number' ? "18" : undefined}
          max={type === 'number' ? "100" : undefined}
        />
      )}
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      

      {isSubmitted ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">Thank you for volunteering!</h3>
          <p className="mt-2 text-gray-600">We&apos;ve received your application and will contact you soon.</p>
          <p className="mt-2 text-gray-600">A confirmation email has been sent to {formData.email}.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 bg-orange hover:bg-logo-blue text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Become a Volunteer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {renderInputField('name', 'Name', 'text', 'Your full name')}
            {renderInputField('email', 'Email', 'email', 'Your email address')}
            {renderInputField('mobile', 'Mobile', 'tel', 'Your phone number')}
            {renderInputField('occupation', 'Occupation', 'text', 'Your profession')}
            {renderInputField('gender', 'Gender', 'select')}
            {renderInputField('age', 'Age', 'number', 'Your age')}
            {renderInputField('state', 'State', 'select', '', states)}
            {renderInputField('city', 'City', 'select', '',
              formData.state && formData.state !== 'Select State' ? cities[formData.state] : ['Select State first']
            )}
          </div>

          {renderInputField('message', 'Message', 'textarea', 'Any additional information')}
          {renderInputField('purpose', 'Purpose of joining', 'textarea', 'Why do you want to volunteer with us?')}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange hover:bg-logo-blue text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VolunteerForm;