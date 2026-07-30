import React from 'react';

const ImpactModal = ({
  open,
  close,
  isUpdateMode,
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  isLoading,
}) => {
  const maxLength = 150;

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:pl-20">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {isUpdateMode ? 'Update Impact' : 'Add New Impact'}
        </h2>

        <form>
          {/* Total Services */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Total Impact Count
            </label>

            <input
              type="text"
              name="total_services"
              value={formData.total_services}
              onChange={handleInputChange}
              maxLength={maxLength}
              placeholder="Number of Total Impacts"
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={maxLength}
              placeholder="Enter description here"
              className="w-full px-4 py-2 border rounded"
            />

            <p className="mt-2 text-sm text-gray-500">
              {maxLength - formData.description.length} characters remaining
            </p>
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />

            <p className="mt-2 text-sm text-blue-600">
              Need icons?{' '}
              <a
                href="https://www.flaticon.com/icon-fonts-most-downloaded?weight=bold&type=uicon"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Download from Flaticon
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  />
                  Processing...
                </span>
              ) : isUpdateMode ? (
                'Update'
              ) : (
                'Add'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImpactModal;
