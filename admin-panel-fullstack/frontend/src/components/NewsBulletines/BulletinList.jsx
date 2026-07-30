import React from 'react';
import DOMPurify from 'dompurify';
import { MdEdit, MdDelete } from 'react-icons/md';

const BulletinList = ({ bulletines, onEdit, onDelete, onExpand }) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center lg:justify-start lg:p-4 gap-4">
      {bulletines && bulletines.length > 0 ? (
        bulletines.map((bulletin, index) => (
          <div
            key={bulletin?._id || index}
            className="cursor-pointer border p-4 rounded w-[90%] small-range:w-[80%] small-max:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[30%] shadow-lg hover:shadow-none flex flex-col items-center"
            onClick={() => onExpand(bulletin)}
          >
            <div className="w-full overflow-hidden rounded-lg">
              <img
                src={
                  Array.isArray(bulletin?.images) && bulletin.images.length > 0
                    ? bulletin.images[0]?.url
                    : ''
                }
                alt={bulletin?.title}
                loading="lazy"
                decoding="async"
                className="w-full h-56 md:h-64 lg:h-72 object-cover"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-x-1 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 text-gray-600"
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 0 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>

                <span className="text-gray-700">
                  {bulletin?.date
                    ? new Date(bulletin.date).toLocaleDateString()
                    : 'Date not available'}
                </span>
              </div>

              <h3 className="w-full line-clamp-2 mt-2 font-bold text-xl">
                {bulletin?.title}
              </h3>

              <p
                className="mt-2 line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    bulletin?.description || '',
                  ).replace(/<a /g, '<a style="color:#4a90e2;" '),
                }}
              />

              <div className="mt-4 flex gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-2xl shadow-lg hover:bg-blue-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(bulletin);
                  }}
                >
                  <MdEdit className="text-2xl" />
                </button>

                <button
                  className="bg-red-100 text-red-800 px-4 py-2 rounded-2xl shadow-lg hover:bg-red-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(bulletin._id);
                  }}
                >
                  <MdDelete className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full justify-center">
          <p>No bulletins found.</p>
        </div>
      )}
    </div>
  );
};

export default BulletinList;
