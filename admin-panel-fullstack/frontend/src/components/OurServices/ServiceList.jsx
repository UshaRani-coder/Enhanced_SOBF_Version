import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import DOMPurify from 'dompurify';

import { truncateDescription } from '../../helper/serviceHelpers';

const ServiceList = ({ services, onEdit, onDelete, onExpand }) => {
  return (
    <div className="gap-6 p-4 flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-2">
      {Array.isArray(services) && services.length > 0 ? (
        services.map((service) => (
          <div
            key={service._id}
            className="cursor-pointer border rounded-lg p-4 shadow-lg hover:shadow-xl transition w-full small-max:w-[90%] md:w-[75%] lg:w-full"
            onClick={() => onExpand(service)}
          >
            {/* Logo */}
            <img
              src={service?.logo}
              alt="Service Logo"
              className="w-20 object-cover mt-2"
            />

            {/* Title */}
            <h2 className="text-lg font-bold line-clamp-2 mt-2">
              {service?.title}
            </h2>

            {/* Small Description */}
            <p className="mt-2 line-clamp-1">
              {truncateDescription(service?.small_description)}
            </p>

            {/* Description */}
            <p
              className="text-sm text-gray-500 mt-1 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(service?.description || '').replace(
                  /<a /g,
                  '<a style="color:#4a90e2;" ',
                ),
              }}
            />

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(service);
                }}
              >
                <MdEdit />
              </button>

              <button
                className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(service._id);
                }}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center">No services found.</p>
      )}
    </div>
  );
};

export default ServiceList;
