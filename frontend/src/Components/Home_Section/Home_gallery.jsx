import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { galleryImage } from "../../Constant/data";
// import { galleryImage } from "../Constant/data";

const Home_Gallery = () => {
  // Get the first 8 images
  const displayedImages = galleryImage.slice(0, 6);

  return (
    <div className="pt-[110px] py-6 border-b">
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <div className="w-full">
        <h1 className="text-center text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
            Featured Gallery
          </h1>
        </div>
        {/* Gallery Grid */}
        <div>
          
        </div>
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
        <div className="flex justify-center mt-6">
          <Link
            to="/gallery"
            className="bg-blue text-white font-bold py-4 px-8 rounded hover:bg-blue-hover transition-colors duration-300"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home_Gallery;
