import React from 'react';
import DOMPurify from 'dompurify';
import { MdClose } from 'react-icons/md';

const RecentActivityPreviewModal = ({ expandedItem, closeExpandedModal }) => {
  if (!expandedItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9]">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Header */}
        <div className="flex justify-between items-start gap-x-5 mb-4">
          <h2 className="text-xl font-bold">{expandedItem.title}</h2>

          <button type="button" onClick={closeExpandedModal}>
            <MdClose className="text-2xl text-gray-600 mt-1" />
          </button>
        </div>

        {/* Description */}
        <div
          className="mb-2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(expandedItem.description || '').replace(
              /<a /g,
              '<a style="color:#4a90e2;" ',
            ),
          }}
        />

        {/* Date */}
        <p className="text-gray-700 my-2 flex items-center gap-x-[5px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-3 h-3 text-gray-600"
          >
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120v136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </svg>

          {expandedItem?.date
            ? new Date(expandedItem.date).toLocaleDateString()
            : 'Date not available'}
        </p>

        {/* Images */}
        {Array.isArray(expandedItem.images) &&
        expandedItem.images.length > 0 ? (
          expandedItem.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${expandedItem.title} - ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full max-h-[70vh] object-cover rounded-lg mb-5"
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No images available</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivityPreviewModal;
