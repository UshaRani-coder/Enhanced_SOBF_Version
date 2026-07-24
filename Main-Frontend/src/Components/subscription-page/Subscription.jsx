import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

import SubscriptionBanner from './SubscriptionBanner';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionSuccess from './SubscriptionSuccess';

import { loadRazorpayScript } from '@/helper/donationHelpers.js';

const Subscription = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const duration = watch('duration');
  const amountMap = {
    '1_month': 11,
    '3_months': 33,
    '6_months': 66,
    '1_year': 132,
  };

  const handlePanInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setValue('pan', value, { shouldValidate: true });
  };

  const initiateRazorpayPayment = async (data) => {
    try {
      setLoading(true);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }
      // Create order on backend
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/donateforsubscription`,
        {
          amount: amountMap[data.duration] * 100, // Convert to paise,
          currency: 'INR',
          receipt: `subscription_${Date.now()}`,
          notes: {
            subscriptionType: data.duration,
            donorName: data.name,
            donorEmail: data.email,
          },
        },
      );

      const { order } = orderResponse.data;

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Soul of Braj Federation',
        description: `Subscription: ${data.duration.replace('_', ' ')}`,
        image: 'https://sobf.in/assets/logo-xV2I52-F.png',
        order_id: order.id,
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verificationResponse = await axios.post(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/post/verifydonateforsubscription`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                subscriptionData: data,
                amount: amountMap[data.duration],
              },
            );

            console.log('verificationResponse', verificationResponse);
            if (verificationResponse.data.success) {
              // Payment successful
              setPaymentSuccess(true);
              setFormData(data);
              setStep(3);
              toast.success(
                'Subscription successful! Thank you for your support.',
              );
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast.error(error, 'An error occurred during payment verification');
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          address: data.place,
          subscriptionType: data.duration,
        },
        theme: {
          color: '#F59E0B',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment processing');
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setFormData(data);
    await initiateRazorpayPayment(data);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const title = 'Support Braj Seva – Be one in a million';
  const baseURL =
    window.location.origin === 'https://sobf.in'
      ? 'https://sobf.in'
      : window.location.origin;
  const url = `${baseURL}/subscription`;

  return (
    <div className="pt-28 bg-gray-50 py-12 mt-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row bg-amber-50 border border-amber-100 rounded-xl shadow-md overflow-hidden">
          {/* Left Side */}
          <SubscriptionBanner />

          {/* Right Side Steps */}
          <div className="lg:w-1/2 p-6 md:p-8">
            {step === 1 && (
              <SubscriptionForm
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                handlePanInputChange={handlePanInputChange}
                isValid={isValid}
                loading={loading}
                duration={duration}
                amountMap={amountMap}
                title={title}
                url={url}
              />
            )}

            {step === 3 && (
              <SubscriptionSuccess
                formData={formData}
                amountMap={amountMap}
                handleBackToHome={handleBackToHome}
                title={title}
                url={url}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
