import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const HeroBannerList = ({
  heroBanner,
  openUpdateModal,
  handleDeletePost,
}) => {
  if (!heroBanner || heroBanner.length === 0) {
    return (
      <div className="mt-6 flex justify-center">
        <p className="text-lg text-gray-500">
          No Hero Banners found.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start lg:gap-10 lg:p-4">
      {heroBanner.map((post) => (
        <div
          key={post._id}
          className="flex w-[90%] flex-col items-center rounded border p-4 shadow-lg transition hover:shadow-none small-max:w-[80%] md:w-[70%] lg:w-[40%]"
        >
          {/* Banner Image */}
          <div className="relative w-full overflow-hidden pb-[56.25%]">
            <img
              src={post.image}
              alt="Hero Banner"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          </div>

          {/* Quote */}
          <h3 className="mt-2 w-full line-clamp-2 text-xl font-bold">
            {post.quotes}
          </h3>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => openUpdateModal(post)}
              className="flex items-center gap-2 rounded-2xl bg-blue-100 px-4 py-2 font-semibold text-blue-800 shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl"
            >
              <MdEdit className="text-2xl text-blue-800" />
            </button>

            <button
              onClick={() => handleDeletePost(post._id)}
              className="flex items-center gap-2 rounded-2xl bg-red-100 px-4 py-2 font-semibold text-red-800 shadow-lg transition duration-300 ease-in-out hover:bg-red-200 hover:shadow-xl"
            >
              <MdDelete className="text-2xl text-red-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroBannerList;