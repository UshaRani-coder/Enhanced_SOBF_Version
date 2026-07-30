import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { quillStyles } from '../../utils/quillConfig.js';

const RecentActivityModal = ({
  isOpen,
  isUpdateMode,
  formData,
  handleInputChange,
  handleFileChange,
  handleRemoveImage,
  handleSubmit,
  previewImage,
  fileInputRef,
  quillRef,
  isLoading,
  closeModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] md:pl-20">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
        <h2 className="text-xl font-bold mb-4">
          {isUpdateMode ? 'Update Activity' : 'Add New Activity'}
        </h2>

        <form>
          {/* Title */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter the title of the activity"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <style>{quillStyles}</style>

            <label className="block font-semibold mb-2">Description</label>

            <ReactQuill
              ref={quillRef}
              value={formData.description || ''}
              onChange={(value) =>
                handleInputChange({
                  name: 'description',
                  value,
                })
              }
              className="w-full bg-white"
              placeholder="Enter the description of the activity"
            />
          </div>

          {/* Date */}
          {!isUpdateMode && (
            <div className="mb-4">
              <label className="block font-semibold mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Images</label>

            <input
              ref={fileInputRef}
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />

            {previewImage && (
              <div className="mt-4">
                <div className="relative w-full pb-[56.25%] bg-gray-100 rounded overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  16:9 Aspect Ratio Preview
                </p>
              </div>
            )}
          </div>

          {/* Selected Images */}
          <div className="flex gap-3 mt-4">
            {formData.images &&
              Array.isArray(formData.images) &&
              formData.images.length > 0 &&
              formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />

                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              onClick={handleSubmit}
              disabled={isLoading}
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

export default RecentActivityModal;
