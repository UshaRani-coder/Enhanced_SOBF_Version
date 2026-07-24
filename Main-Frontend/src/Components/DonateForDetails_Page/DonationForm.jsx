import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchDonationById } from '@/reducers/donateForSlice';
import {
  validateDonationForm,
  loadRazorpayScript,
} from '@/helper/donationHelpers.js';

const DonationForm = ({ id, currentDonation, dispatch, donorStatus }) => {
  const initialFormState = {
    fullname: '',
    email: '',
    phone_no: '',
    pan_no: '',
    aadhar_no: '',
    address: '',
    amount: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateDonationForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        toast.error('Razorpay failed to load');
        return;
      }

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/donatefor`,
        {
          amount: Number(formData.amount) * 100,
          currency: 'INR',
          receipt: `donation_${Date.now()}`,
          notes: {
            donationId: id,
            donorName: formData.fullname,
            donorEmail: formData.email,
          },
        }
      );

      const { order } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Soul of Braj Federation',
        description: `Donation for ${currentDonation?.title}`,
        image: 'https://sobf.in/assets/logo-xV2I52-F.png',
        order_id: order.id,

        handler: async function (response) {
          const verifyResponse = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/post/verifydonatefor`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donationData: formData,
              donationId: id,
            }
          );

          if (verifyResponse.data.success) {
            toast.success(
              'Payment successful! Thank you for your donation.'
            );

            setFormData(initialFormState);
            dispatch(fetchDonationById(id));
          } else {
            toast.error('Payment verification failed');
          }
        },

        prefill: {
          name: formData.fullname,
          email: formData.email,
          contact: formData.phone_no,
        },

        notes: {
          address: formData.address,
          donationId: id,
        },

        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

      razorpay.on('payment.failed', (response) => {
        toast.error(response.error.description);
      });

    } catch (error) {
      console.error('Donation Error:', error);
      toast.error('Something went wrong');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };


  return (
    <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Make a Donation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'fullname', label: 'Full Name' },
          { name: 'email', label: 'Email Address' },
          { name: 'phone_no', label: 'Phone Number' },
          { name: 'pan_no', label: 'PAN Number' },
          { name: 'aadhar_no', label: 'Aadhar Number' },
          { name: 'amount', label: 'Donation Amount (₹)' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">
              {field.label}*
            </label>

            <input
              type={field.name === 'amount' ? 'number' : 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors[field.name]
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />

            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">
            Address*
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Message (Optional)
          </label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

     
          <button
                type="submit"
                disabled={donorStatus === 'loading'}
                className="w-full bg-blue hover:bg-blue text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
              >
                {donorStatus === 'loading' ? 'Processing...' : 'Donate Now'}
              </button>
      </form>
    </div>
  );
};

export default DonationForm;