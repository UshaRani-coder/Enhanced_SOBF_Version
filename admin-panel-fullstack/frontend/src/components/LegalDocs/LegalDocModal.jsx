import React from 'react';

const LegalDocModal = ({
  isOpen,
  isUpdateMode,
  currentDoc,
  formData,
  maxLength,
  isLoading,
  onInputChange,
  onFileChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 md:pl-20">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {isUpdateMode
            ? `Update Document: ${currentDoc?.title}`
            : 'Add New Document'}
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Title</label>

            <textarea
              name="title"
              value={formData.title}
              maxLength={maxLength}
              onChange={onInputChange}
              placeholder="Enter title of the document"
              className="w-full px-4 py-2 border rounded resize-none"
              rows={3}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Description</label>

            <textarea
              name="description"
              value={formData.description}
              maxLength={maxLength}
              onChange={onInputChange}
              placeholder="Enter the description..."
              className="w-full px-4 py-2 border rounded resize-none"
              rows={5}
            />

            <p className="mt-2 text-sm text-gray-500">
              {maxLength - formData.description.length} characters remaining
            </p>
          </div>

          {/* PDF */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">PDF File</label>

            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={onFileChange}
              className="w-full"
            />

            {isUpdateMode && (
              <p className="text-sm text-gray-500 mt-2">
                Leave this empty if you don't want to replace the existing PDF.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 font-semibold disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={onSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
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

export default LegalDocModal;
