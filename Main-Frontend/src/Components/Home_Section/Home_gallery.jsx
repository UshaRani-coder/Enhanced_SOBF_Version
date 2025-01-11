import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGalleryImages } from "../../Reducers/gallerySlice";
// import { getGalleryImages } from "../../slices/gallerySlice";

const Home_Gallery = () => {
  const dispatch = useDispatch();

  // Access gallery state from Redux store
  const { gallery, status, error } = useSelector((state) => state.gallery);

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

  return (
    <div className="py-14">
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <div className="w-full text-center mb-8">
          <h1 className="inline-block text-[30px] lg:text-heading2 font-bold p-1 lg:p-5 text-blue">
            Featured Gallery
            <hr className="mt-1 border-light-lavender border-[1px]" />
          </h1>
        </div>
        <div className="container mx-auto p-0 px-4 lg:px-20">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {displayedImages.map((image, index) => (
              <div key={index} className="w-full hover:opacity-90 relative group">
                <img
                  src={image.image}
                  alt={`Shot ${index + 1}`}
                  className="w-[1000px] h-72 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
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
    </div>
  );
};

export default Home_Gallery;
