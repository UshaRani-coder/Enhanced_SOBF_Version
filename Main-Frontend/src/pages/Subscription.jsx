import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import subscriptionImage from '../../src/assets/Subscription.jpeg';
import QRCode from '../../src/assets/brajQr.jpg';
import { useState } from 'react';

const Subscription = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue, // Import setValue
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // important to track real-time validity
  });

  const onSubmit = (data) => {
    console.log(data);
    setFormData(data); // store form input
    setStep(2);
  };

  const handlePanInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setValue('pan', value, { shouldValidate: true }); // Update the form value and trigger validation
  };

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
                className="lg:size-auto object-cover"
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
                  become a ripple of change — <br className="hidden sm:block" />
                  for <span className="italic">Braj</span>, for{' '}
                  <span className="italic">Seva</span>, for the{' '}
                  <span className="italic">Soul</span>. 💛
                </h3>
              </div>

              {/* Hashtags */}
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

          {/* Right Side */}
          {step == 1 && (
            <div className="lg:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quick Subscription
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Row: Name & Place */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Name */}
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register('name', {
                        required: 'Required',
                        pattern: {
                          value: /^[A-Za-z\s]+$/i,
                          message: 'Letters only',
                        },
                        minLength: {
                          value: 3,
                          message: 'Min 3 chars',
                        },
                      })}
                      className={`w-full px-3 py-2 text-sm border rounded-lg ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Place */}
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Place *
                    </label>
                    <input
                      {...register('place', {
                        required: 'Required',
                        pattern: {
                          value: /^[A-Za-z\s]+$/i,
                          message: 'Letters only',
                        },
                        minLength: {
                          value: 2,
                          message: 'Min 2 chars',
                        },
                      })}
                      className={`w-full px-3 py-2 text-sm border rounded-lg ${
                        errors.place ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.place && (
                      <p className="text-xs text-red-600">
                        {errors.place.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row: Email & Phone */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Email */}
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
                      <p className="text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Mobile *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', {
                        required: 'Required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: '10 digits only',
                        },
                      })}
                      className={`w-full px-3 py-2 text-sm border rounded-lg ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row: PAN & Aadhaar */}
                <div className="flex flex-col md:flex-row gap-4">
                  {/* PAN */}
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      PAN Card *
                    </label>
                    <input
                      {...register('pan', {
                        required: 'Required for tax receipts',
                        pattern: {
                          value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                          message: 'Invalid PAN format',
                        },
                      })}
                      placeholder="AAAAA9999A"
                      className={`w-full px-3 py-2 text-sm border rounded-lg ${
                        errors.pan ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onChange={handlePanInputChange} // Add this line
                    />
                    {errors.pan && (
                      <p className="text-xs text-red-600">
                        {errors.pan.message}
                      </p>
                    )}
                  </div>

                  {/* Aadhaar */}
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Aadhaar (Optional)
                    </label>
                    <input
                      {...register('aadhaar', {
                        pattern: {
                          value: /^[0-9]{12}$/,
                          message: '12 digits only',
                        },
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
                    <p className="text-xs text-red-600">
                      {errors.duration.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full text-sm font-semibold py-2.5 px-4 rounded-md shadow-md flex items-center justify-center gap-2 transition-all duration-200 ${
                    isValid
                      ? 'bg-amber-500 hover:bg-amber-600 text-black cursor-pointer'
                      : 'bg-amber-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Subscription
                </button>
              </form>
            </div>
          )}

          {step == 2 && (
            <div className="lg:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Payment Details
              </h2>
              <div className='flex flex-col sm:flex-row sm:gap-2 md:gap-0 items-start justify-between lg:flex-col'>
                <img src={QRCode} alt="QR Code" className="size-72 mb-5 lg:mb-12" />
                <div className="flex flex-col items-left justify-center mt-4">
                  <span className="mb-2 text-lg">
                    <strong>Soul Of Braj Federation Bank Details :</strong>{' '}
                  </span>
                  <span>
                    <strong>Bank Name</strong> : Axis Bank
                  </span>
                  <span>
                    <strong>Account Number</strong> : 920020058749691
                  </span>
                  <span>
                    <strong>IFSC Code</strong> : UTIB0000794
                  </span>
                  <span>
                    <strong>BRANCH</strong> : VRINDAVAN
                  </span>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-between gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium py-2.5 px-4 rounded-md shadow-sm transition duration-200"
                >
                  <span className="mr-2"> ← </span> Back
                </button>

                <button
                  onClick={() => setStep(3)} // Replace with next logic
                  className="w-1/2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-semibold py-2.5 px-4 rounded-md shadow-md transition duration-200"
                >
                  <div className="flex justify-center items-center gap-1">
                    <span>Payment Completed </span>
                    <span> → </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP-3 */}
          {step === 3 && (
            <div className="lg:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Thank You for Your Subscription! 🙏
              </h2>

              <p className="text-gray-700 mb-4">
                Your willingness to help means the world to us. Even though we
                can't confirm your payment instantly, we trust your kindness.
              </p>

              <div className="bg-white border border-amber-200 rounded-lg p-4 shadow-sm text-sm sm:text-base text-gray-700">
                <p className="font-semibold mb-2">
                  📩 Kindly send the following details to:
                </p>
                <p className="mb-4 text-amber-800 font-medium">
                  <a
                    href={`mailto:soulofbraj@gmail.com?subject=Subscription%20Details&body=Jai%20Shree%20Radha%20Rani,%0A%0AI%20have%20made%20a%20payment%20for%20subscription.%20Here%20are%20my%20details:%0A%0AName:%20${encodeURIComponent(
                      formData.name || '',
                    )}%0AEmail:%20${encodeURIComponent(
                      formData.email || '',
                    )}%0AContact%20No:%20${encodeURIComponent(
                      formData.phone || '',
                    )}%0APlace:%20${encodeURIComponent(
                      formData.place || '',
                    )}%0AAmount:%20₹${
                      formData.duration === '1_month'
                        ? '11'
                        : formData.duration === '3_months'
                        ? '33'
                        : formData.duration === '6_months'
                        ? '66'
                        : '132'
                    }%0ATransaction%20ID:%20%3CEnter%20Transaction%20ID%20here%3E%0A%0AThank%20you!`}
                    className="text-blue-600 font-semibold underline mt-2 inline-block"
                  >
                    soulofbraj@gmail.com
                  </a>
                </p>

                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>
                    <strong>Your Name</strong>
                  </li>
                  <li>
                    <strong>Your Contact No</strong>
                  </li>
                  <li>
                    <strong>Your Donation Transaction ID (optional)</strong>
                  </li>
                  <li>
                    <strong>Your Donation Amount</strong>
                  </li>
                  <li>
                    <strong>Your E-Mail</strong>
                  </li>
                  <li>
                    <strong>Your Complete Postal Address</strong>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold py-2.5 px-4 rounded-md shadow-md transition duration-200"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
