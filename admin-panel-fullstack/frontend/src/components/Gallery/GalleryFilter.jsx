import React from "react";

const GalleryFilter = ({
  availableTags,
  activeTagFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap mx-12 small-max:mx-20 md:mx-4 gap-2 mb-4">
      {availableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onFilterChange(tag)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            activeTagFilter === tag
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {tag.replace(/_/g, " ")}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilter;