import React from 'react';
import { MdDelete, MdEdit, MdPreview } from 'react-icons/md';

const LegalDocList = ({ legalDocs, onEdit, onDelete, onPreview }) => {
  if (!legalDocs || legalDocs.length === 0) {
    return (
      <div className="mt-10 flex justify-center">
        <p className="text-gray-500 text-lg">No documents found.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 flex flex-wrap justify-center lg:justify-start lg:mx-4 gap-4 lg:gap-10">
      {legalDocs.map((doc) => (
        <div
          key={doc._id}
          className="border p-4 rounded w-[90%] small-max:w-[80%] md:w-[65%] lg:w-[40%] shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 line-clamp-2">
            {doc.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 line-clamp-4 flex-1">{doc.description}</p>

          {/* Buttons */}
          <div className="mt-5 flex gap-4 flex-wrap">
            {/* Edit */}
            <button
              onClick={() => onEdit(doc)}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-2xl shadow-lg transition hover:bg-blue-200 hover:shadow-xl"
            >
              <MdEdit className="text-2xl" />
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(doc._id)}
              className="bg-red-100 text-red-800 px-4 py-2 rounded-2xl shadow-lg transition hover:bg-red-200 hover:shadow-xl"
            >
              <MdDelete className="text-2xl" />
            </button>

            {/* Preview */}
            <button
              onClick={() => onPreview(doc.fileName)}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-2xl shadow-lg transition hover:bg-green-200 hover:shadow-xl"
            >
              <MdPreview className="text-2xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegalDocList;
