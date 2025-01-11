import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getGalleryImages } from "../redux/gallerySlice"; // Import the Redux action
import aboutus from "../assets/aboutUsImage.avif";
import { getGalleryImages } from "../Reducers/gallerySlice";

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(getGalleryImages()); // Fetch gallery images when the component mounts
  }, [dispatch]);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter gallery images based on selected category
  const filteredImages =
    selectedCategory === "all"
      ? gallery
      : gallery.filter((image) => image.title === selectedCategory);

  return (
    <div className="pt-[110px] py-6">
      <img src={aboutus} alt="About Us" className="w-full h-[190px] lg:h-[420px] object-cover" />
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <div className="w-full mb-6 text-center">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-logoYellow">
            Gallery
            <hr className="mt-1 border-light-lavender border-[1px]" />
          </h1>

          {/* Filter Buttons */}
          <div className="flex lg:justify-center flex-wrap mb-4 gap-4">
            {["all", "child_activites", "sadhu_seva", "health_awaraness", "child_education", "Yamuna Cleaning"].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-3 lg:px-4 py-1 lg:py-2 font-bold rounded ${selectedCategory === category ? "bg-blue text-white" : "bg-gray-200"
                  }`}
              >
                {category.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {status === "loading" ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center md:grid-cols-3 gap-5">
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="transition transform hover:scale-95 ease-in-out duration-300 w-full lg:h-70 hover:opacity-90 relative group"
                >
                  <img
                    src={image.image}
                    alt={`Shot ${index + 1}`}
                    className="w-full h-[300px] object-cover transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg">
                    <p className="text-white text-center font-bold px-4">{image.quote}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No images found for this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
