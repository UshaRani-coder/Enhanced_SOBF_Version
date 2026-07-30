import React from 'react';

const GalleryModal = ({
  isOpen,
  isUpdateMode,
  formData,
  availableTags,
  defaultTags,
  isLoading,
  onChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:pl-20">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {isUpdateMode ? 'Update Image' : 'Add New Image'}
        </h2>

        <form>
          {/* Image */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={onChange}
              className="w-full"
            />
          </div>

          {/* Tag */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Tag</label>

            <select
              name="tag"
              value={formData.tag}
              onChange={onChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Select a tag</option>

              {defaultTags.map((tag) => (
                <option
                  key={tag}
                  value={tag.toLowerCase().replace(/\s+/g, '_')}
                >
                  {tag}
                </option>
              ))}

              {availableTags
                .filter((tag) => tag !== 'all')
                .filter((tag) => !defaultTags.includes(tag))
                .map((tag) => (
                  <option key={tag} value={tag}>
                    {tag.replace(/_/g, ' ')}
                  </option>
                ))}
            </select>
          </div>

          {/* Custom Tag only while adding */}
          {!isUpdateMode && (
            <div className="mb-4">
              <label className="block font-semibold mb-2">Custom Tag</label>

              <input
                type="text"
                name="customTag"
                value={formData.customTag}
                onChange={onChange}
                placeholder="Enter your custom tag"
                className="w-full border p-2 rounded-lg"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold disabled:opacity-50"
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

export default GalleryModal;
