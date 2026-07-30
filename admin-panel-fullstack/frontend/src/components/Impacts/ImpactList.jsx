import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const ImpactList = ({ impacts, onEdit, onDelete }) => {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4 lg:gap-10">
      {impacts && impacts.length > 0 ? (
        impacts.map((impact) => (
          <div
            key={impact?._id}
            className="border p-4 py-10 rounded w-64 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center"
          >
            {/* Image */}
            <img
              src={impact?.image || 'https://via.placeholder.com/150'}
              alt="Impact"
              className="w-[70px] h-[70px] object-contain rounded"
            />

            {/* Total Count */}
            <h3 className="line-clamp-2 mt-2 font-bold text-xl text-center">
              {impact?.total_services}
            </h3>

            {/* Description */}
            <p className="w-full text-center min-h-[50px] line-clamp-2 mt-1 text-gray-600">
              {impact?.description}
            </p>

            {/* Actions */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => onEdit(impact)}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center"
              >
                <MdEdit className="text-blue-800 text-2xl" />
              </button>

              <button
                onClick={() => onDelete(impact?._id)}
                className="bg-red-100 text-red-800 px-4 py-2 rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center"
              >
                <MdDelete className="text-red-800 text-2xl" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No impacts found.</p>
      )}
    </div>
  );
};

export default ImpactList;
