
// // import React, { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getHeroBanners } from "../../Reducers/heroBannerSlice";

// // const Hero = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [currentImage, setCurrentImage] = useState(null);
// //   const dispatch = useDispatch();
// //   const { heroBanner, status } = useSelector((state) => state.heroBanner);

// //   useEffect(() => {
// //     dispatch(getHeroBanners());
// //   }, [dispatch]);
  
// //   useEffect(() => {
// //     if (heroBanner.length > 0) {
// //       setCurrentImage(heroBanner[currentIndex]?.image);
// //     }
// //   }, [heroBanner, currentIndex]);
// //   useEffect(() => {
// //     if (heroBanner.length > 0) {
// //       const interval = setInterval(() => {
// //         setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner.length);
// //       }, 3000); // Increased interval for better effect

// //       return () => clearInterval(interval);
// //     }
// //   }, [currentIndex, heroBanner.length]);

// //   const imageVariants = {
// //     enter: {
// //       opacity: 1,
// //       scale: 1,
// //       filter: "blur(0px) brightness(1)",
// //       transition: { duration: 1.5, ease: "easeInOut" },
// //     },
// //     exit: {
// //       opacity: 0,
// //       scale: 1.2, // Slight zoom out on exit
// //       filter: "blur(8px) brightness(0.7)",
// //       transition: { duration: 1.5, ease: "easeInOut" },
// //     },
// //   };


// //   const textVariants = {
// //     enter: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 1, ease: "easeOut", delay: 0.5 }, // Delay text animation
// //     },
// //     exit: {
// //       opacity: 0,
// //       y: -50,
// //       transition: { duration: 1, ease: "easeOut" },
// //     },
// //   };

// //   if (status === "loading" || heroBanner?.length === 0) {
// //     return (
// //       <div className="hero flex items-center justify-center w-full h-screen">
// //         <p className="text-white font-bold text-xl">Loading...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative  overflow-hidden font-quicksand w-[100%] h-[100vh] mt-[100px]">
// //       <AnimatePresence>
// //         <motion.div
// //           key={heroBanner[currentIndex]?.id}
// //           className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
// //         //   style={{ 
// //         //     backgroundImage: `url(${heroBanner[currentIndex]?.image})`
// //         //  }}
// //         style={{ backgroundImage: currentImage ? `url(${currentImage})` : 'none' }}
// //           variants={imageVariants} // Keep your existing image transition variants
// //           initial="exit"
// //           animate="enter"
// //           exit="exit"
// //         >
// //           {/* Ken Burns Effect (Zoom In/Out) */}
// //           <motion.div
// //             className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" // Important: bg-cover, bg-center
// //             // style={{ backgroundImage: `url(${heroBanner[currentIndex]?.image})` }} 
// //             style={{ backgroundImage: currentImage ? `url(${currentImage})` : 'none' }}
// //             initial={{ scale: 1 }} // Start at normal scale
// //             animate={{ scale: 1.1 }}  // Zoom in (adjust 1.1 for more/less zoom)
// //             transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }} // Smooth zoom
// //           />

// //           <div className="absolute inset-0 bg-black opacity-75" /> 
// //         </motion.div>
// //       </AnimatePresence>

// //       {/* Scroll Arrows */}
// //       <div className="absolute top-[50%] left-[20px] z-20 transform -translate-y-1/2">
// //         <button
// //           onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + heroBanner.length) % heroBanner.length)}
// //           className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //           </svg>
// //         </button>
// //       </div>

// //       <div className="absolute top-[50%] right-[20px] z-20 transform -translate-y-1/2">
// //         <button
// //           onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner.length)}
// //           className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
// //         >
// //           <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //           </svg>
// //         </button>
// //       </div>

// //       {/* Quote Text */}
// //       <AnimatePresence>
// //         <motion.div
// //           key={heroBanner[currentIndex]?.quotes}
// //           className="absolute inset-0 flex items-center justify-center z-10"
// //         >
// //           <motion.p
// //             className="text-logoYellow text-center font-bold text-3xl leading-[40px] md:leading-[70px] lg:leading-[80px] md:text-4xl lg:text-5xl w-[90%] md:w-[60%] shadow-md"
// //             style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}
// //             variants={textVariants}
// //             initial="exit"
// //             animate="enter"
// //             exit="exit"
// //           >
// //             {heroBanner[currentIndex]?.quotes || ""}
// //           </motion.p>
// //         </motion.div>
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default Hero;



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import { getHeroBanners } from '../../Reducers/heroBannerSlice'; // Adjust path if needed

// const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentImage, setCurrentImage] = useState(null);
//   const dispatch = useDispatch();
//   const { heroBanner, status } = useSelector((state) => state.heroBanner);

//   useEffect(() => {
//     dispatch(getHeroBanners());
//   }, [dispatch]);

//   useEffect(() => {
//     if (heroBanner && heroBanner.length > 0) { // Check if heroBanner exists
//       setCurrentImage(heroBanner[currentIndex]?.image);
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner.length);
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [heroBanner, currentIndex]);

//   const imageVariants = {
//     enter: {
//       opacity: 1,
//       scale: 1,
//       filter: "blur(0px) brightness(1)",
//       transition: { duration: 1.5, ease: "easeInOut" },
//     },
//     exit: {
//       opacity: 0,
//       scale: 1.2,
//       filter: "blur(8px) brightness(0.7)",
//       transition: { duration: 1.5, ease: "easeInOut" },
//     },
//   };

//   const textVariants = {
//     enter: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1, ease: "easeOut", delay: 0.5 },
//     },
//     exit: {
//       opacity: 0,
//       y: -50,
//       transition: { duration: 1, ease: "easeOut" },
//     },
//   };

//   if (status === "loading" || !heroBanner || heroBanner.length === 0) { // Handle null or undefined
//     return (
//       <div className="hero flex items-center justify-center w-full h-screen">
//         <p className="text-white font-bold text-xl">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-hidden font-quicksand w-[100%] h-[100vh] mt-[100px]">
//       <AnimatePresence>
//         <motion.div
//           key={heroBanner[currentIndex]?.id}
//           className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: currentImage ? `url(${currentImage})` : 'none' }}
//           variants={imageVariants}
//           initial="exit"
//           animate="enter"
//           exit="exit"
//         >
//           {/* Ken Burns Effect (Optional - Uncomment if needed) */}
//           {/* <motion.div
//             className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: currentImage ? `url(${currentImage})` : 'none' }}
//             initial={{ scale: 1 }}
//             animate={{ scale: 1.1 }}
//             transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//           /> */}

//           <div className="absolute inset-0 bg-black opacity-75" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Scroll Arrows */}
//       <div className="absolute top-[50%] left-[20px] z-20 transform -translate-y-1/2">
//         <button
//           onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + heroBanner.length) % heroBanner.length)}
//           className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//       </div>

//       <div className="absolute top-[50%] right-[20px] z-20 transform -translate-y-1/2">
//         <button
//           onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner.length)}
//           className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>

//       {/* Quote Text */}
//       <AnimatePresence>
//         <motion.div
//           key={heroBanner[currentIndex]?.quotes}
//           className="absolute inset-0 flex items-center justify-center z-10"
//         >
//           <motion.p
//             className="text-logoYellow text-center font-bold text-3xl leading-[40px] md:leading-[70px] lg:leading-[80px] md:text-4xl lg:text-5xl w-[90%] md:w-[60%] shadow-md"
//             style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}
//             variants={textVariants}
//             initial="exit"
//             animate="enter"
//             exit="exit"
//           >
//             {heroBanner[currentIndex]?.quotes || ""}
//           </motion.p>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Hero;



import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroBanners } from '../../Reducers/heroBannerSlice';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textAnimation, setTextAnimation] = useState(false);
  const { heroBanner, status } = useSelector((state) => state.heroBanner);
  const dispatch = useDispatch();

  const scrollLeft = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroBanner.length) % heroBanner.length,
    );
  };

  

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroBanner.length);
  };

  useEffect(() => {
    // Fetch hero banners when the component mounts
    dispatch(getHeroBanners());
  }, [dispatch]);

  useEffect(() => {
    if (heroBanner.length > 0) {
      const interval = setInterval(() => {
        scrollRight();
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, heroBanner?.length]);

  useEffect(() => {
    // Animate text when currentIndex changes
    if (heroBanner.length > 0) {
      setTextAnimation(true);
      const textElement = document.querySelector('.hero-text');
      textElement.classList.add('text-animate');
      const handleTextAnimationEnd = () => {
        textElement.classList.remove('text-animate');
        textElement.removeEventListener('animationend', handleTextAnimationEnd);
      };
      textElement.addEventListener('animationend', handleTextAnimationEnd);

      return () => {
        textElement.removeEventListener('animationend', handleTextAnimationEnd);
      };
    }
  }, [currentIndex, heroBanner?.length]);

  if (status === 'loading' || heroBanner?.length === 0) {
    return (
      <div className="hero flex items-center justify-center w-full h-[100vh]">
        <p className="text-white font-bold text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="hero relative flex items-center overflow-hidden font-quicksand w-[100%] h-[80vh] md:h-[100vh] lg:h-[80vh] mt-[100px] lg:mt-[120px]">
      {/* <div
        className="hero-img object-cover w-[100%] h-[100%] animate-zoomIn transition-bg-image"
        style={{
          backgroundImage: `url(${heroBanner[currentIndex]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div> */}
      {/* <div
    className="hero-img object-cover w-full h-full animate-zoomIn transition-bg-image"
    style={{
      backgroundImage: `url(${heroBanner[currentIndex]?.image})`,
      backgroundSize: "cover",  // Ensures the image covers the entire container
      backgroundPosition: "center",  // Keeps the image centered
      backgroundRepeat: "no-repeat", // Prevents repeating the image
    }}
  ></div> */}
      <div
        className="hero-img object-cover w-full h-full bg-fixed transition-all ease-in-out duration-700"
        style={{
          backgroundImage: `url(${heroBanner[currentIndex]?.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed', // Creates a parallax effect
        }}
      ></div>

      <div
        className="scroll-arrow hidden lg:block absolute top-[50%] left-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full z-[10] cursor-pointer"
        style={{ transform: 'translateY(-50%)' }}
        onClick={scrollLeft}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-[10px] font-normal"
          fill="rgba(250,250,250,0.5)"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </div>
      <div
        className="scroll-arrow hidden lg:block absolute top-[50%] right-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full z-[10] cursor-pointer"
        style={{ transform: 'translateY(-50%)' }}
        onClick={scrollRight}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-[10px] font-normal"
          fill="rgba(250,250,250,0.5)"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </div>
      <p
        className={`absolute  font-bold top-[38%] lg:top-[40.5%] xl:top-[43.0%] left-1/2 transform -translate-x-1/2 text-white z-[10] text-center hero-text w-[300px] md:w-[600px] md:text-[40px] lg:text-[50px] lg:w-[700px] ${
          textAnimation ? 'text-animate' : ''
        }`}
      >
        {heroBanner[currentIndex]?.quotes || ''}
      </p>
    </div>
    
  );
};

export default Hero;