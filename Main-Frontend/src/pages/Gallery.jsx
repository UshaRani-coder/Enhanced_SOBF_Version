import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import aboutus from '../assets/aboutUsImage.webp';
import { getGalleryImages } from '../reducers/gallerySlice';
import { lockScroll, unlockScroll } from '@/utils/scrollLock';
import GalleryModal from '@/components/Gallery_Page/GalleryModal.jsx';

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const IMAGES_PER_LOAD = 9;

  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);
  useEffect(() => {
    setVisibleCount(IMAGES_PER_LOAD);
  }, [selectedCategory, gallery]);
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
  const getCloudinaryUrl = (url, width) => {
    return url.replace(
      '/image/upload/',
      `/image/upload/w_${width},f_auto,q_auto/`,
    );
  };
  return (
    <div className="pt-[90px] md:pt-[100px] lg:pt-[120px] pb-8">
      <img
        src={aboutus}
        alt="Gallery"
        loading="eager"
        decoding="async"
        fetchPriority="high"
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-4">
              {filteredImages.length > 0 ? (
                filteredImages.slice(0, visibleCount).map((image, index) => (
                  <div
                    key={image._id}
                    className="relative group cursor-pointer transition transform hover:scale-95 duration-300"
                    onClick={() => openModal(index)}
                  >
                    <img
                      src={getCloudinaryUrl(image.image, 400)}
                      srcSet={`
    ${getCloudinaryUrl(image.image, 400)} 400w,
    ${getCloudinaryUrl(image.image, 800)} 800w,
    ${getCloudinaryUrl(image.image, 1200)} 1200w
  `}
                      sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(50vw - 30px), calc(33.333vw - 25px)"
                      alt={`Shot ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover rounded-lg"
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No images found for this category.
                </p>
              )}
            </div>

            {visibleCount < filteredImages.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(prev + IMAGES_PER_LOAD, filteredImages.length),
                    )
                  }
                  className="px-6 py-3 rounded-lg bg-blue text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal to display full image */}
      {selectedIndex !== null && (
        <GalleryModal
          filteredImages={filteredImages}
          selectedIndex={selectedIndex}
          closeModal={closeModal}
          prevImage={prevImage}
          nextImage={nextImage}
          handleTouchStart={handleTouchStart}
          handleTouchEnd={handleTouchEnd}
        />
      )}
    </div>
  );
};

export default Gallery;
