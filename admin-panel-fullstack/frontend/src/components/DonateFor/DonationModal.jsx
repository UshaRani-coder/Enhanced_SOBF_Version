import React from 'react';

const DonationModal = ({
  formData,
  errors,
  isEditMode,
  onSubmit,
  onChange,
  onImageChange,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-70 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditMode ? 'Edit Donation Post' : 'Add New Donation Post'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Title*</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={onChange}
                  placeholder="Enter title"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  rows="3"
                  placeholder="Enter description"
                  className={`w-full px-3 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Image*</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className={`w-full p-2 border rounded-lg ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                />

                {isEditMode && (
                  <p className="text-sm text-gray-500">
                    Leave empty to keep current image
                  </p>
                )}

                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}

                {formData.imagePreview && (
                  <div className="mt-3  flex justify-end items-center">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="max-h-40 object-contain border  p-2 rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Amount Raised*
                  </label>
                  <input
                    name="raised"
                    value={formData.raised}
                    onChange={onChange}
                    placeholder="Enter amount raised"
                    className={`w-full px-3 py-2 border rounded-lg ${errors.raised ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.raised && (
                    <p className="text-red-500 text-sm">{errors.raised}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Goal Amount*
                  </label>
                  <input
                    name="goal"
                    value={formData.goal}
                    onChange={onChange}
                    placeholder="Enter goal amount"
                    className={`w-full px-3 py-2 border rounded-lg ${errors.goal ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.goal && (
                    <p className="text-red-500 text-sm">{errors.goal}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEditMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
