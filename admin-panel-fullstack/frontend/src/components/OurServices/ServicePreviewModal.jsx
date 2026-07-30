import React from 'react';
import { MdClose } from 'react-icons/md';
import DOMPurify from 'dompurify';

const ServicePreviewModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <img src={service?.logo} alt="service-logo" className="w-[40px]" />

          <button onClick={onClose}>
            <MdClose className="text-2xl text-gray-600" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold">{service?.title}</h2>

        {/* Small Description */}
        <p className="text-md font-medium text-gray-600 mt-2">
          {service?.small_description}
        </p>

        {/* Description */}
        <p
          className="mb-4 text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(service?.description || '').replace(
              /<a /g,
              '<a style="color:#4a90e2;" ',
            ),
          }}
        />

        {/* Images */}
        {Array.isArray(service?.images) && service.images.length > 0 ? (
          service.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Service Image ${index + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-lg mb-5"
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No images available</p>
        )}
      </div>
    </div>
  );
};

export default ServicePreviewModal;
