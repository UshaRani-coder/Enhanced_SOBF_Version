import React from 'react';
import DOMPurify from 'dompurify';
import { MdEdit, MdDelete, MdAccessTimeFilled } from 'react-icons/md';
import { formatDateTime } from '../../utils/dateUtils.js';

const EventList = ({
  events,

  openUpdateModal,
  handleDeletePost,
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
      {events && events.length > 0 ? (
        events.map((post) => (
          <div
            key={post._id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white"
          >
            {/* Image Section */}

            <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 relative overflow-hidden">
              {post?.image ? (
                <img
                  src={post.image}
                  alt="Event"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x400?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Content */}

            <div className="p-4 flex flex-col flex-grow">
              {/* Date + Location */}

              <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MdAccessTimeFilled className="mr-1 w-4 h-4 text-[#1890CE]" />

                  <span>
                    {formatDateTime(post.date, post.startTime, post.endTime)}
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-4 h-4 mr-1"
                    fill="#D90210"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>

                  <span>{post.location || 'N/A'}</span>
                </div>
              </div>

              {/* Title */}

              <h3 className="text-lg font-bold mb-2 line-clamp-2">
                {post.title}
              </h3>

              {/* Description */}

              <div
                className="text-gray-700 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.description || '').replace(
                    /<a /g,
                    '<a style="color:#4a90e2;" ',
                  ),
                }}
              />

              {/* Actions */}

              <div className="mt-auto flex flex-wrap gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    openUpdateModal(post);
                  }}
                >
                  <MdEdit className="text-lg" />

                  <span className="hidden xs:inline">Edit</span>
                </button>

                <button
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post.id || post._id);
                  }}
                >
                  <MdDelete className="text-lg" />

                  <span className="hidden xs:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-10 text-gray-500">
          No events found.
        </div>
      )}
    </div>
  );
};

export default EventList;
