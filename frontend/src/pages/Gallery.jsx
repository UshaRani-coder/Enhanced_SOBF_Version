import React, { useState } from "react";
import aboutus from "../assets/aboutUsImage.png";
import { galleryImage } from "../Constant/data";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredImages =
    selectedCategory === "all"
      ? galleryImage
      : galleryImage.filter((image) => image.title === selectedCategory);

  return (
    <div className="pt-[110px] py-6">
      <img src={aboutus} alt="" className="w-full h-[190px] lg:h-[420px]" />
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <div className="w-full mb-6">
          <h1 className="text-center text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-peacock-green relative hover:text-peacock-green-hover  transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
            Gallery
          </h1>
          {/* Filter Buttons */}
          <div className="flex lg:justify-center flex-wrap mb-4 gap-4">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-3 lg:px-4 py-1 lg:py-2 font-bold rounded ${selectedCategory === "all" ? "bg-peacock-green text-white" : "bg-gray-200"
                }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("child_activites")}
              className={`px-3 lg:px-4 py-1 lg:py-2  font-bold rounded ${selectedCategory === "child_activites" ? "bg-peacock-green text-white" : "bg-gray-200"
                }`}
            >
              Child Activities
            </button>
            <button
              onClick={() => handleFilterChange("face_mask_distribution")}
              className={`px-3 lg:px-4 py-1 lg:py-2  font-bold rounded ${selectedCategory === "face_mask_distribution" ? "bg-peacock-green text-white" : "bg-gray-200"
                }`}
            >
              Face Mask Distribution
            </button>
            <button
              onClick={() => handleFilterChange("health_awaraness")}
              className={`px-3 lg:px-4 py-1 lg:py-2  font-bold rounded ${selectedCategory === "health_awaraness" ? "bg-peacock-green text-white" : "bg-gray-200"
                }`}
            >
              Health Awareness
            </button>
            <button
              onClick={() => handleFilterChange("child_education")}
              className={`px-3 lg:px-4 py-1 lg:py-2  font-bold rounded ${selectedCategory === "child_education" ? "bg-peacock-green text-white" : "bg-gray-200"
                }`}
            >
              Child Education
            </button>
            <button
              onClick={() => handleFilterChange("sanitary_pads_distribution")}
              className={`px-1 lg:px-4 py-1 lg:py-2  font-bold rounded ${selectedCategory === "sanitary_pads_distribution" ? "bg-peacock-green text-white" : "bg-gray-200"
                }`}
            >
              Sanitary Pads Distribution
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center md:grid-cols-3 gap-5">
          {filteredImages.map((image, index) => (
            <div key={index} className="transition transform hover:scale-95 ease-in-out duration-300 w-full lg:h-70 hover:opacity-90 relative group">
              <img
                src={image.image}
                alt={`Shot ${index + 1}`}
                className="w-full h-full transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg">
                <p className="text-white text-center font-bold px-4">
                  {image.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
