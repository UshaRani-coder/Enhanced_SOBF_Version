import React from 'react';
import ShareButton from '@/components/common_components/ShareButton';

const SubscriptionForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  handlePanInputChange,
  isValid,
  loading,
  duration,
  amountMap,
  title,
  url,
}) => {
  return (
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
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: 'Invalid PAN format',
                },
              })}
              onChange={handlePanInputChange}
              placeholder="AAAAA9999A"
              className={`w-full px-3 py-2 text-sm border rounded-lg ${
                errors.pan ? 'border-red-500' : 'border-gray-300'
              }`}
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
            {...register('duration', {
              required: 'Required',
            })}
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

        {/* Submit Button */}
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

      {/* Share */}
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
};

export default SubscriptionForm;
