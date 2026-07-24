import React from "react";

const GalleryModal = ({
  filteredImages,
  selectedIndex,
  closeModal,
  prevImage,
  nextImage,
  handleTouchStart,
  handleTouchEnd,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="relative w-[90%] bg-black bg-opacity-30 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-300"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={filteredImages[selectedIndex]?.image}
          alt="Full size"
          loading="eager"
          decoding="async"
          className="w-full max-h-[90vh] object-contain"
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-md lg:text-lg xl:text-xl">
          {selectedIndex + 1} / {filteredImages.length}
        </div>

       <button
              onClick={prevImage}
              className=" absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 p-1.5  items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 md:w-6 md:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 p-1.5  items-center justify-center rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 md:w-6 md:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={closeModal}
              className="absolute top-[-10px] right-[-10px]   p-1.5 text-white bg-[#ffffff] rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="15px"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
      </div>
    </div>
  );
};

export default GalleryModal;