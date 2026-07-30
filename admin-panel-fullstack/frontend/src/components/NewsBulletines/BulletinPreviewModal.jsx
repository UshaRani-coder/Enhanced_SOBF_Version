import React from 'react';
import DOMPurify from 'dompurify';
import { MdClose } from 'react-icons/md';

const BulletinPreviewModal = ({ bulletin, onClose }) => {
  if (!bulletin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Header */}
        <div className="flex justify-between items-start gap-5 mb-4">
          <h2 className="text-xl font-bold break-words">{bulletin?.title}</h2>

          <button onClick={onClose}>
            <MdClose className="text-2xl text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Description */}
        <div
          className="mb-4 prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(bulletin?.description || '').replace(
              /<a /g,
              '<a style="color:#4a90e2;" ',
            ),
          }}
        />

        {/* Date */}
        <div className="text-gray-700 my-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-3 h-3 text-gray-600"
          >
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 0 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </svg>

          <span>
            {bulletin?.date
              ? new Date(bulletin.date).toLocaleDateString()
              : 'Date not available'}
          </span>
        </div>

        {/* Images */}
        {Array.isArray(bulletin?.images) && bulletin.images.length > 0 ? (
          <div className="space-y-4">
            {bulletin.images.map((image, index) => (
              <img
                key={image?._id || index}
                src={image.url}
                alt={`Bulletin image ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[80vh] rounded-xl shadow-md object-contain"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No images available</p>
        )}
      </div>
    </div>
  );
};

export default BulletinPreviewModal;
