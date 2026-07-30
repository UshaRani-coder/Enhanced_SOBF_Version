import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { quillStyles } from '../../utils/quillConfig.js';
import ImagePreview from '../ImagePreview.jsx';

const ServiceModal = ({
  isOpen,
  closeModal,
  isUpdateMode,
  isLoading,
  formData,
  handleInputChange,
  handlePaste,
  handleFileChange,
  handleSubmit,
  resetForm,
  handleRemoveImage,
}) => {
  if (!isOpen) return null;

  const titleMaxLength = 20;
  const smallDescriptionMaxLength = 80;
  const maxImages = 5;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:pl-20 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-h-[90vh] overflow-y-auto scrollbar-none md:w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {isUpdateMode ? 'Update Service' : 'Add New Service'}
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
              maxLength={titleMaxLength}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter title"
            />

            <p className="text-sm text-gray-500">
              {titleMaxLength - formData.title.length} characters remaining
            </p>
          </div>

          {/* Small Description */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Small Description
            </label>

            <textarea
              name="small_description"
              value={formData.small_description}
              onChange={handleInputChange}
              onPaste={handlePaste}
              maxLength={smallDescriptionMaxLength}
              className="w-full px-4 py-3 border rounded"
              placeholder="Enter small description"
            />

            <p className="text-sm text-gray-500">
              {smallDescriptionMaxLength - formData.small_description.length}{' '}
              characters remaining
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Description</label>

            <style>{quillStyles}</style>

            <ReactQuill
              value={formData.description || ''}
              onChange={(value) =>
                handleInputChange({
                  name: 'description',
                  value,
                })
              }
              onPaste={handlePaste}
              placeholder="Enter the description of Service"
            />
          </div>

          {/* Logo */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Logo</label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
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

          {/* Images */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Images</label>

            <input
              type="file"
              name="images"
              accept="image/jpeg,image/png,image/jpg"
              multiple
              onChange={handleFileChange}
            />

            <p className="text-sm text-gray-500">
              You can upload up to {maxImages} images.
            </p>

            <div className="flex gap-3 mt-4 flex-wrap"></div>
            <div className="flex gap-3 mt-4 flex-wrap">
              {formData.images.map((image, index) => (
                <ImagePreview
                  key={index}
                  image={image}
                  width="w-20"
                  height="h-20"
                  alt={`Service Image ${index + 1}`}
                  onRemove={() => handleRemoveImage('new', index)}
                />
              ))}
              
            </div>
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Select Color</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full  cursor-pointer border rounded-lg h-[20px] shadow-md"
              style={{
                background:
                  'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
                border: 'none',
                padding: '0',
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
              onClick={() => {
                closeModal();
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            >
              {isLoading ? 'Processing...' : isUpdateMode ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
