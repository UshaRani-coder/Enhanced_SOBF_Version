// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { getGalleryImages } from "../redux/gallerySlice"; // Import the Redux action
// import aboutus from "../assets/aboutUsImage.avif";
// import { getGalleryImages } from "../Reducers/gallerySlice";

// const Gallery = () => {
//   const dispatch = useDispatch();
//   const { gallery, status } = useSelector((state) => state.gallery);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedImage, setSelectedImage] = useState(null);
//   useEffect(() => {
//     dispatch(getGalleryImages()); // Fetch gallery images when the component mounts
//   }, [dispatch]);

//   const handleFilterChange = (category) => {
//     setSelectedCategory(category);
//   };

//   // Filter gallery images based on selected category
//   const filteredImages =
//     selectedCategory === "all"
//       ? gallery
//       : gallery.filter((image) => image.title === selectedCategory);

//       const openModal = (image) => {
//         setSelectedImage(image);
//       };

//       const closeModal = () => {
//         setSelectedImage(null);
//       };
//   return (
//     <div className="pt-[110px] py-6">
//       <img src={aboutus} alt="About Us" className="w-full h-[190px] lg:h-[420px] object-cover" />
//       <div className="container mx-auto p-0 px-4 lg:px-20">
//         <div className="w-full mb-6 text-center">
//           <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-logoYellow">
//             Gallery
//             <hr className="mt-1 border-light-lavender border-[1px]" />
//           </h1>

//           {/* Filter Buttons */}
//           <div className="flex lg:justify-center flex-wrap mb-4 gap-4">
//             {["all", "child_activites", "sadhu_seva", "health_awaraness", "child_education", "Yamuna Cleaning"].map((category) => (
//               <button
//                 key={category}
//                 onClick={() => handleFilterChange(category)}
//                 className={`px-3 lg:px-4 py-1 lg:py-2 font-bold rounded ${selectedCategory === category ? "bg-blue text-white" : "bg-gray-200"
//                   }`}
//               >
//                 {category.replace("_", " ")}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Gallery Grid */}
//         {status === "loading" ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center md:grid-cols-3 gap-5">
//             {filteredImages.length > 0 ? (
//               filteredImages.map((image, index) => (
//                 <div
//                   key={index}
//                   className="transition transform hover:scale-95 ease-in-out duration-300 w-full lg:h-70 hover:opacity-90 relative group"
//                 >
//                   <img
//                     src={image.image}
//                     alt={`Shot ${index + 1}`}
//                     className="w-full h-[300px] object-cover transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg">
//                     <p className="text-white text-center font-bold px-4">{image.quote}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">No images found for this category.</p>
//             )}
//           </div>
//         )}
//       </div>
//       {selectedImage && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="relative flex justify-center items-center w-[90%]">
//       <img
//         src={selectedImage}
//         alt="Full size"
//         className="w-[100%] max-h-[90vh] object-contain mx-2"
//       />
//       <button
//         onClick={closeModal}
//         className="absolute top-[-10px] right-[-10px]   p-1.5 text-white bg-[#ffffff] rounded-full"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 384 512">
//           <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
//         </svg>
//       </button>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default Gallery;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import aboutus from "../assets/aboutUsImage.avif";
import { getGalleryImages } from "../Reducers/gallerySlice";

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, status } = useSelector((state) => state.gallery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openModal = (image) => {
    setSelectedImage(image.image); // Set the selected image's URL for the modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal by resetting selectedImage
  };

  return (
    <div className="pt-[110px] py-6">
      <img
        src={aboutus}
        alt="About Us"
        className="w-full h-[190px] lg:h-[420px] object-cover"
      />
      <div className="container mx-auto p-0 px-4 lg:px-20">
        <div className="w-full mb-6 text-center">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-logoYellow">
            Gallery
            <hr className="mt-1 border-light-lavender border-[1px]" />
          </h1>

          {/* Filter Buttons */}
          <div className="flex flex-col small-range:flex-row justify-center small-range:items-center flex-wrap mb-4 gap-4">
            {[
              "all",
              "child_activites",
              "sadhu_seva",
              "health_awaraness",
              "child_education",
              "Yamuna Cleaning",
            ].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-3 lg:px-4 py-1 lg:py-2 font-bold rounded ${
                  selectedCategory === category
                    ? "bg-blue text-white"
                    : "bg-gray-200"
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
                  className="transition cursor-pointer transform hover:scale-95 ease-in-out duration-300 w-full lg:h-70 hover:opacity-90 relative group"
                  onClick={() => openModal(image)} // Open modal on image click
                >
                  <img
                    src={image.image}
                    alt={`Shot ${index + 1}`}
                    className="w-full h-[300px] object-cover transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
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
          <div className="relative flex justify-center items-center w-[90%]">
            <img
              src={selectedImage}
              alt="Full size"
              className="w-[100%] max-h-[90vh] object-contain mx-2 "
            />
            <button
              onClick={() => {
                closeModal();
                setSelectedImage(null);
              }}
              className="absolute top-[-10px] right-[-10px] p-1.5 text-white bg-[#ffffff] rounded-full"
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
