import React, { useEffect } from 'react';
import { lockScroll, unlockScroll } from '@/utils/scrollLock.js';

const EventRegistrationModal = ({
  showForm,
  event,
  formData,
  errors,
  isLoading,
  progress,
  onChange,
  onClose,
  onSubmit,
}) => {
  useEffect(() => {
    if (showForm) {
      lockScroll();
    }

    return () => {
      unlockScroll();
    };
  }, [showForm]);

  if (!showForm || !event) return null;

  const handleClose = () => {
    unlockScroll();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Register for {event.title}
          </h2>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>

        {isLoading && (
          <div className="px-6 pb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EventRegistrationModal);