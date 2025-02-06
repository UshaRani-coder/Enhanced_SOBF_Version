// import React, { useState, useEffect, useRef } from 'react';

// const ImgBanner = ({ banners }) => {
//   console.log(banners,"Image Banner")
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timerRef = useRef(null);

//   // Move to the previous slide
//   const scrollLeft = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
//   };

//   // Move to the next slide
//   const scrollRight = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//   };

//   // Automatically cycle through slides
//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       scrollRight();
//     }, 3000);

//     return () => clearInterval(timerRef.current);
//   }, []);

//   // Pause slider on hover
//   const handleMouseEnter = () => {
//     clearInterval(timerRef.current);
//   };

//   const handleMouseLeave = () => {
//     timerRef.current = setInterval(() => {
//       scrollRight();
//     }, 3000);
//   };

//   return (
//     <div
//       className="relative flex items-center justify-center overflow-hidden w-[90%]  h-[60vh]  rounded-2xl"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Slide */}
//       <div
//         className="absolute w-full h-full transition-all duration-1000"
//         style={{
//           backgroundImage: `url(${banners[currentIndex]})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       ></div>
//       {console.log(banners[currentIndex],currentIndex)}
//       {/* Left Arrow */}
//       <div
//         className="scroll-arrow hidden lg:block absolute top-[50%] left-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8px] px-[10px] rounded-full z-[10] cursor-pointer"
//         style={{ transform: 'translateY(-50%)' }}
//         onClick={scrollLeft}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 448 512"
//           className="w-[10px] font-normal"
//           fill="rgba(250,250,250,0.8)"
//         >
//           <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
//         </svg>
//       </div>

//       {/* Right Arrow */}
//       <div
//         className="scroll-arrow hidden lg:block absolute top-[50%] right-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8px] px-[10px] rounded-full z-[10] cursor-pointer"
//         style={{ transform: 'translateY(-50%)' }}
//         onClick={scrollRight}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 448 512"
//           className="w-[10px] font-normal"
//           fill="rgba(250,250,250,0.8)"
//         >
//           <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
//         </svg>
//       </div>

//       {/* Indicators */}
//       <div className="absolute bottom-4 flex justify-center gap-2">
//         {banners.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full transition-all duration-500 ${
//               currentIndex === index ? 'bg-white scale-125' : 'bg-black/50'
//             } cursor-pointer`}
//             onClick={() => setCurrentIndex(index)}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImgBanner;


import React, { useState, useEffect, useRef } from "react";

const ImgBanner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => clearInterval(timerRef.current);
  }, []);

  const scrollLeft = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const scrollRight = () => {
    setLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handleMouseEnter = () => clearInterval(timerRef.current);
  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      scrollRight();
    }, 3000);
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden w-[90%] h-[60vh] rounded-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Image */}
      <img
        src={banners[currentIndex]}
        alt="banner"
        className="absolute w-full h-full object-cover transition-all duration-1000"
        onLoad={() => setLoading(false)} // Hide loader when the image loads
      />

      {/* Left Arrow */}
      <div
        className="scroll-arrow hidden lg:block absolute top-[50%] left-[10px] bg-[rgba(0,0,0,0.5)] text-white py-1 px-3 rounded-full z-10 cursor-pointer"
        style={{ transform: "translateY(-50%)" }}
        onClick={scrollLeft}
      >
        &lt;
      </div>

      {/* Right Arrow */}
      <div
        className="scroll-arrow hidden lg:block absolute top-[50%] right-[10px] bg-[rgba(0,0,0,0.5)] text-white py-1 px-3 rounded-full z-10 cursor-pointer"
        style={{ transform: "translateY(-50%)" }}
        onClick={scrollRight}
      >
        &gt;
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 flex justify-center gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              currentIndex === index ? "bg-white scale-125" : "bg-black/50"
            } cursor-pointer`}
            onClick={() => {
              setLoading(true);
              setCurrentIndex(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImgBanner;
