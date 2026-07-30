import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const GalleryCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg shadow-lg flex flex-col items-center w-full small-range:w-[80%] md:w-[90%] lg:w-full">
      <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg">
        <img
          src={item?.image}
          alt="Gallery"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="my-4 flex gap-4">
        <button
          onClick={() => onEdit(item)}
          className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl flex items-center gap-2"
        >
          <MdEdit size={20} />
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl flex items-center gap-2"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default GalleryCard;
