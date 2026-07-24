import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RazorpayPayment = ({
  formData,
  razorpayLoaded,
  saveDonation,
  validateForm,
}) => {
  const [loading, setLoading] = useState(false);
  const initiatePayment = async () => {
    if (!validateForm()) return;
    if (!razorpayLoaded) {
      toast.error('Payment system is loading. Please try again.');
      return;
    }
    setLoading(true);
    try {
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/donation/create-razorpay-order`,
        {
          amount: Number(formData.donationAmount) * 100,
          currency: 'INR',
          receipt: `donation_${Date.now()}`,
          notes: {
            purpose: formData.donationFor,
            donorName: formData.fullName,
            donorEmail: formData.email,
          },
        },
      );

      const order = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Soul Of Braj Federation',
        description: `Donation for ${formData.donationFor}`,
        image: 'https://sobf.in/assets/logo-xV2I52-F.png',
        order_id: order.id,

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        handler: async (response) => {
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            ...formData,
          };

          await saveDonation(paymentData);
        },

        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
          },
        },

        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      toast.error('Payment initiation failed.');
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={initiatePayment}
      className="w-full bg-blue text-white py-3 rounded-md font-medium text-lg disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Proceed to Payment'}
    </button>
  );
};

export default RazorpayPayment;
