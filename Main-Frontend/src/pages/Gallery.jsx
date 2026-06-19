import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import aboutus from '../assets/aboutUsImage.png';
import { getGalleryImages } from '../Reducers/gallerySlice';
import { lockScroll, unlockScroll } from '@/utils/scrollLock';

const Gallery = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [selectedIndex, setSelectedIndex] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (location.pathname === '/gallery') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  useEffect(() => {
    dispatch(getGalleryImages()); // Fetch gallery images when component mounts
  }, [dispatch]);
  // Lock the bg scroll when the gallery slider is open
  useEffect(() => {
    if (selectedIndex !== null) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [selectedIndex]);
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  // Extract unique tags
  const tags = [
    'all',
    ...Array.from(
      new Set(
        gallery
          .map((image) => image?.tag?.trim().toLowerCase())
          .filter((tag) => tag && tag !== 'all'),
      ),
    ),
  ];

  // Filter gallery images based on selected category
  const filteredImages =
    selectedCategory === 'all'
      ? gallery
      : gallery.filter(
          (image) => image?.tag?.trim().toLowerCase() === selectedCategory,
        );

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };
  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;

    const distance = touchStartX.current - touchEndX.current;

    // Minimum swipe distance
    if (distance > 50) {
      nextImage();
    } else if (distance < -50) {
      prevImage();
    }
  };
  return (
    <div className="pt-[90px] md:pt-[100px] lg:pt-[120px] pb-8">
      <img
        src={aboutus}
        alt="Gallery"
        loading="eager"
        decoding="async"
        className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] object-cover"
      />
      <div className="container mx-auto px-1 small-max:px-4">
        <div className="w-full mb-6 text-center">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold  p-5 text-logoYellow">
            Gallery
            <hr className="mt-1 border-light-lavender border-[1px]" />
          </h1>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-start m-4 gap-2 md:gap-4 mb-0">
            {tags.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 font-bold rounded ${
                  selectedCategory === category
                    ? 'bg-blue text-white'
                    : 'bg-gray-200'
                }`}
              >
                {category.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {status === 'loading' ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-4 ">
            {filteredImages?.length > 0 ? (
              filteredImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer transition transform hover:scale-95 duration-300"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={image.image}
                    alt={`Shot ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No images found for this category.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal to display full image */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md  flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-[90%]  bg-black bg-opacity-30 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-300"
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
              className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2
             p-1.5 
              items-center justify-center
             rounded-full
             bg-white/10 backdrop-blur-lg
             border border-white/20
             text-white
             shadow-xl
             hover:bg-white/20
             hover:scale-105
             transition-all duration-300"
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
              className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2
              p-1.5 
             hidden md:flex items-center justify-center
             rounded-full
             bg-white/10 backdrop-blur-lg
             border border-white/20
             text-white
             shadow-xl
             hover:bg-white/20
             hover:scale-105
             transition-all duration-300"
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
      )}
    </div>
  );
};

export default Gallery;
