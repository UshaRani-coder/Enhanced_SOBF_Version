
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGalleryImages } from '../../Reducers/gallerySlice';
import { Link } from 'react-router-dom';

const Home_Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, status, error } = useSelector((state) => state.gallery);
 

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getGalleryImages());
    }
  }, [dispatch, status]);

  // Display only the first 6 images
  const displayedImages = gallery.slice(0, 6);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="py-14">
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <div className="w-full text-center mb-8">
          <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold p-1 lg:p-5 text-blue">
            Featured Gallery
            <hr className="mt-1 border-light-lavender border-[1px]" />
          </h1>
        </div>
        <div className="container mx-auto p-0 px-4 lg:px-20">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {displayedImages?.map((image, index) => (
              <div
                key={index}
                className="w-full hover:opacity-90 relative group cursor-pointer"
                onClick={() => openModal(image?.image)} // Open modal on click
              >
                <img
                  src={image?.image}
                  alt={`Shot ${index + 1}`}
                  className="w-full h-72 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
                />
              </div>
            ))}
          </div>
          {/* See More Button */}
          <div className="flex justify-center mt-10">
            <Link
              to="/gallery"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-blue text-white font-bold py-4 px-8 rounded-xl hover:bg-logoYellow transition-colors duration-300"
            >
              See More
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for Full-Size Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-[90%]  bg-black bg-opacity-30 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-300">
            <img
              src={selectedImage}
              alt="Full size"
              className="w-[100%] max-h-[90vh] object-contain "
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

export default Home_Gallery;
