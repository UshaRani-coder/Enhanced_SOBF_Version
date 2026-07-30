import React from "react";

const HeroBannerFormModal = ({
  isModalOpen,
  isUpdateMode,
  formData,
  handleInputChange,
  handleFileChange,
  handleAddPost,
  handleUpdatePost,
  isLoading,
  previewImage,
  fileInputRef,
  maxLength,
  onClose,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:pl-20">
      <div className="w-11/12 rounded-lg bg-white p-6 md:w-1/2">
        <h2 className="mb-4 text-xl font-bold">
          {isUpdateMode ? "Update Banner" : "Add New Banner"}
        </h2>

        <form>
          {/* Quote */}
          <div className="mb-4">
            <label className="mb-2 block font-semibold">
              Quote
            </label>

            <input
              type="text"
              name="quotes"
              value={formData.quotes}
              onChange={handleInputChange}
              className="w-full rounded border px-4 py-2"
              maxLength={maxLength}
            />

            <p className="mt-2 text-sm text-gray-500">
              {maxLength - formData.quotes.length} characters remaining
            </p>
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="mb-2 block font-semibold">
              Image (16:9 ratio)
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              ref={fileInputRef}
            />

            {previewImage && (
              <div className="mt-4">
                <div className="relative w-full overflow-hidden rounded bg-gray-100 pb-[56.25%]">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  16:9 Aspect Ratio Preview
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-400 px-4 py-2 font-semibold text-white hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={
                isUpdateMode
                  ? handleUpdatePost
                  : handleAddPost
              }
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin rounded-full border-t-2 border-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  />
                  Processing...
                </span>
              ) : isUpdateMode ? (
                "Update Banner"
              ) : (
                "Add Banner"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroBannerFormModal;