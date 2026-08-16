import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { quillStyles } from '../../utils/quillConfig';

const TeamModal = ({
  isUpdateMode,
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  isLoading,
  quillRef,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:pl-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90%] overflow-y-auto scrollbar-none">
        <h2 className="text-xl font-bold mb-4">
          {isUpdateMode ? 'Update Team Member' : 'Add New Team Member'}
        </h2>
        <style>{quillStyles}</style>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Role</label>

          <ReactQuill
            ref={quillRef}
            value={formData.role || ''}
            onChange={(value) =>
              handleInputChange({
                name: 'role',
                value,
              })
            }
            placeholder="Enter role and responsibility"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">LinkedIn</label>

          <input
            type="text"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleInputChange}
            placeholder="Enter LinkedIn profile link"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Instagram</label>

          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            placeholder="Enter Instagram profile link"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Image</label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
          >
            {isLoading ? 'Processing...' : isUpdateMode ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
