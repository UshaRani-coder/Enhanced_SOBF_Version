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

  const states = ['Select State', 'Delhi', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];
  const cities = {
    'Delhi': ['Select City', 'New Delhi', 'Noida', 'Gurgaon'],
    'Uttar Pradesh': ['Select City', 'Lucknow', 'Kanpur', 'Varanasi'],
    'Maharashtra': ['Select City', 'Mumbai', 'Pune', 'Nagpur'],
    'Karnataka': ['Select City', 'Bangalore', 'Mysore', 'Hubli'],
    'Tamil Nadu': ['Select City', 'Chennai', 'Coimbatore', 'Madurai']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.state || formData.state === 'Select State') newErrors.state = 'State is required';
    if (!formData.city || formData.city === 'Select City') newErrors.city = 'City is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Thank you for volunteering! We will contact you soon.');
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
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Become a Volunteer</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your phone number"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Your profession"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Your age"
              min="18"
              max="100"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            >
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state || formData.state === 'Select State'}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            >
              {formData.state && formData.state !== 'Select State' ? (
                cities[formData.state].map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))
              ) : (
                <option value="">Select State first</option>
              )}
            </select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Any additional information"
          ></textarea>
        </div>

        {/* Purpose */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Purpose of joining</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Why do you want to volunteer with us?"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange hover:bg-logo-blue text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;