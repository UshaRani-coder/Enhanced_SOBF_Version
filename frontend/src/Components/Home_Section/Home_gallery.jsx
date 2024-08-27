import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { galleryImage } from "../../Constant/data";
// import { galleryImage } from "../Constant/data";

const Home_Gallery = () => {
  // Get the first 8 images
  const displayedImages = galleryImage.slice(0, 6);

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
                className=" transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
              />
            </div>
          ))}
        </div>
        {/* See More Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/gallery"
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
