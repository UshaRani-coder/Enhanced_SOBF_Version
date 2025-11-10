import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import subscriptionImage from '@/assets/Subscription.jpeg';
import ShareButton from '@/Components/common_components/ShareButton';
import { toast } from 'react-toastify';
import axios from 'axios';

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
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

  const renderStep1 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Quick Subscription
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name & Place */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Full Name *
            </label>
            <input
              {...register('name', {
                required: 'Required',
                pattern: { value: /^[A-Za-z\s]+$/i, message: 'Letters only' },
                minLength: { value: 3, message: 'Min 3 chars' },
              })}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Place *
            </label>
            <input
              {...register('place', {
                required: 'Required',
                pattern: { value: /^[A-Za-z\s]+$/i, message: 'Letters only' },
                minLength: { value: 2, message: 'Min 2 chars' },
              })}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${
                errors.place ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.place && (
              <p className="text-xs text-red-600">{errors.place.message}</p>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Email *
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email',
                },
              })}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Mobile *
            </label>
            <input
              type="tel"
              {...register('phone', {
                required: 'Required',
                pattern: { value: /^[0-9]{10}$/, message: '10 digits only' },
              })}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* PAN & Aadhaar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              PAN Card
            </label>
            <input
              {...register('pan', {
                // required: 'Required for tax receipts',
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: 'Invalid PAN format',
                },
              })}
              placeholder="AAAAA9999A"
              className={`w-full px-3 py-2 text-sm border rounded-lg ${
                errors.pan ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={handlePanInputChange}
            />
            {errors.pan && (
              <p className="text-xs text-red-600">{errors.pan.message}</p>
            )}
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Aadhaar (Optional)
            </label>
            <input
              {...register('aadhaar', {
                pattern: { value: /^[0-9]{12}$/, message: '12 digits only' },
              })}
              placeholder="123412341234"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Duration *
          </label>
          <select
            {...register('duration', { required: 'Required' })}
            className={`w-full px-3 py-2 text-sm border rounded-lg ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select</option>
            <option value="1_month">Monthly (₹11)</option>
            <option value="3_months">Quarterly (₹33)</option>
            <option value="6_months">Half-Yearly (₹66)</option>
            <option value="1_year">Yearly (₹132)</option>
          </select>
          {errors.duration && (
            <p className="text-xs text-red-600">{errors.duration.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full text-sm font-semibold py-2.5 px-4 rounded-md shadow-md flex items-center justify-center gap-2 transition-all duration-200 ${
            isValid && !loading
              ? 'bg-amber-500 hover:bg-amber-600 text-black cursor-pointer'
              : 'bg-amber-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Processing...' : `Pay ₹${amountMap[duration] || '--'}`}
        </button>
      </form>

      <div className="mt-4">
        <ShareButton
          title={title}
          url={url}
          fullWidth
          className="bg-amber-400 hover:bg-amber-500 text-black py-2.5"
        />
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Thank You for Your Subscription! 🙏
      </h2>
      <p className="text-gray-700 mb-4">
        Your subscription payment has been successfully processed. Here are your
        details:
      </p>

      <div className="bg-white border border-amber-200 rounded-lg p-4 shadow-sm text-sm sm:text-base text-gray-700 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{formData.name}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{formData.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>{formData.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Plan:</p>
            <p>
              {formData.duration === '1_month'
                ? 'Monthly'
                : formData.duration === '3_months'
                ? 'Quarterly'
                : formData.duration === '6_months'
                ? 'Half-Yearly'
                : 'Yearly'}
              (₹{amountMap[formData.duration]})
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center mt-6">
        <button
          onClick={handleBackToHome}
          className="border border-amber-500 text-amber-700 hover:bg-amber-100 text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md transition duration-200"
        >
          Back to Home
        </button>
        <ShareButton
          title={title}
          url={url}
          className="bg-amber-400 hover:bg-amber-500 text-black"
        />
      </div>
    </>
  );

  return (
    <div className="pt-28 bg-gray-50 py-12 mt-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row bg-amber-50 border border-amber-100 rounded-xl shadow-md overflow-hidden">
          {/* Left Side */}
          <div className="lg:w-1/2 bg-gradient-to-br from-amber-100 to-amber-50 p-6 md:p-8 flex flex-col justify-center">
            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={subscriptionImage}
                alt="Braj Seva"
                className="lg:w-full lg:h-auto object-cover"
              />
            </div>
            <div className="space-y-4 text-gray-800 bg-amber-50 p-4 rounded-lg shadow-inner">
              <div className="text-left">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-snug">
                  <span className="text-amber-700 font-extrabold">
                    Be one in a million.
                  </span>
                  <br />
                  Let your{' '}
                  <span className="font-semibold text-amber-800">₹11</span>{' '}
                  become a ripple of change —<br className="hidden sm:block" />
                  for <span className="italic">Braj</span>, for{' '}
                  <span className="italic">Seva</span>, for the{' '}
                  <span className="italic">Soul</span>. 💛
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm sm:text-base font-semibold text-gray-700 mt-2">
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold text-base sm:text-lg">
                    #
                  </span>
                  <span className="tracking-wide">Mission1Million</span>
                </div>
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold text-base sm:text-lg">
                    #
                  </span>
                  <span className="tracking-wide">SupportBrajSeva</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Steps */}
          <div className="lg:w-1/2 p-6 md:p-8">
            {step === 1 && renderStep1()}
            {step === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
