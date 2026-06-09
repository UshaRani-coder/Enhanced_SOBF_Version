import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import aboutus from '../assets/aboutUsImage.png';
import { getGalleryImages } from '../Reducers/gallerySlice';

const Gallery = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (location.pathname === '/gallery') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getGalleryImages()); // Fetch gallery images when component mounts
  }, [dispatch]);

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

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
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
                  onClick={() => openModal(image?.image)}
                >
                  <img
                    src={image.image}
                    alt={`Shot ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg">
                    <p className="text-white text-center font-bold px-4">
                      {image.quote}
                    </p>
                  </div>
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
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-[90%]  bg-black bg-opacity-30 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-300">
            <img
              src={selectedImage}
              alt="Full size"
              loading="eager"
              decoding="async"
              className="w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => {
                closeModal();
                setSelectedImage(null);
              }}
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
