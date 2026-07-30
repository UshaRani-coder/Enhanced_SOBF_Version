import React from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import { quillStyles } from '../../utils/quillConfig';

import ImagePreview from '../ImagePreview.jsx';

ReactQuill.Quill = Quill;

const EventModal = ({
  isModalOpen,
  setIsModalOpen,
  isUpdateMode,
  formData,
  handleInputChange,
  handleFileChange,
  handleRemoveImage,
  handleSubmit,
  isLoading,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto scrollbar-none">
        <h2 className="text-xl font-bold mb-4">
          {isUpdateMode ? 'Update Event' : 'Add New Event'}
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
              placeholder="Enter the title of the Event"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <style>{quillStyles}</style>

            <label className="block font-semibold mb-2">Description</label>

            <ReactQuill
              value={formData.description || ''}
              onChange={(value) =>
                handleInputChange({
                  name: 'description',
                  value,
                })
              }
              className="w-full bg-white"
              placeholder="Enter the description of the Event"
            />
          </div>

          {/* Date */}
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

          {/* Timing */}

          <div className="mb-4">
            <label className="block font-semibold mb-3">Event Timing</label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Start Time
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  End Time
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Location */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter event location"
            />
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
          </div>

          {/* Preview */}

          {formData.image && (
            <ImagePreview image={formData.image} onRemove={handleRemoveImage} />
          )}

          {/* Buttons */}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
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
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" />
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

export default EventModal;
