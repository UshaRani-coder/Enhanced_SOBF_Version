import React from "react";
import GalleryCard from "./GalleryCard";

const GalleryGrid = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No gallery images found.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mx-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <GalleryCard
          key={`${item._id}-${item.image}`}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;