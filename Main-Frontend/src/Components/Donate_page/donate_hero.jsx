// /* eslint-disable react-hooks/rules-of-hooks */
// import React, { useState, useEffect, useRef } from 'react';
// import '../../App.css';
// import { heroes_donate } from '../../Constant/data';
// import { Link as ScrollLink } from 'react-scroll';

// const donate_hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [textAnimation, setTextAnimation] = useState(false);
//   const imageElement = useRef(null);

//   const scrollLeft = () => {
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + heroes_donate.length) % heroes_donate.length,
//     );
//   };

//   const scrollRight = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes_donate.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       scrollRight();
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   useEffect(() => {
//     // Animate text when currentIndex changes
//     setTextAnimation(true);
//     const textElement = document.querySelector('.hero-text');
//     textElement.classList.add('text-animate');
//     const handleTextAnimationEnd = () => {
//       textElement.classList.remove('text-animate');
//       textElement.removeEventListener('animationend', handleTextAnimationEnd);
//     };
//     textElement.addEventListener('animationend', handleTextAnimationEnd);

//     return () => {
//       textElement.removeEventListener('animationend', handleTextAnimationEnd);
//     };
//   }, [currentIndex]);

//   return (
//     <div className="hero-donate relative flex items-center overflow-hidden font-quicksand w-[100%] h-[50vh] md:h-[80vh] mt-[100px]">
//       <div
//         className="hero-img object-cover w-[100%] h-[100%] animate-zoomIn transition-bg-image"
//         ref={imageElement}
//         key={currentIndex}
//         style={{
//           backgroundImage: `url(${heroes_donate[currentIndex].img})`,
//           backgroundSize: '100% 100%',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       ></div>

//       <div
//         className="scroll-arrow hidden cursor-pointer lg:block absolute top-[50%] left-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full z-[10]"
//         style={{ transform: 'translateY(-50%)' }}
//         onClick={scrollLeft}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 448 512"
//           className="w-[10px] font-normal"
//           fill="rgba(250,250,250,0.5)"
//         >
//           <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
//         </svg>
//       </div>
//       <div
//         className="scroll-arrow hidden cursor-pointer lg:block absolute top-[50%] right-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full z-[10]"
//         style={{ transform: 'translateY(-50%)' }}
//         onClick={scrollRight}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 448 512"
//           className="w-[10px] font-normal"
//           fill="rgba(250,250,250,0.5)"
//         >
//           <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
//         </svg>
//       </div>
//       <p
//         className={`absolute px-2 font-bold top-[35%]  left-1/2 transform -translate-x-1/2 text-white z-[10] text-center hero-text w-[320px] md:w-[600px] lg:w-[700px] text-xl  leading-[40px] md:leading-[50px] lg:leading-[60px]  md:text-3xl lg:text-4xl  ${
//           textAnimation ? 'text-animate' : ''
//         }`}
//       >
//         {heroes_donate[currentIndex].text}
//         <br />
//         <ScrollLink
//           to="donate-form"
//           smooth={true}
//           duration={1200}
//           className="z-[10] transform -translate-x-1/2"
//         >
//           <button
//             aria-label="Play Video"
//             className="text-white bg-logoYellow font-semibold rounded-lg md:text-[1.25rem] text-heading5 px-5 py-2.5 me-2 md:mb-7 md:mt-7 mb:5 mt-5"
//           >
//             Donate
//           </button>
//         </ScrollLink>
//       </p>
//     </div>
//   );
// };

// export default donate_hero;

import React, { useState, useEffect } from 'react';
import '../../App.css';
import { heroes_donate } from '../../Constant/data';
import { AnimatePresence, motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
const DonateHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState(null);

  useEffect(() => {
    if (heroes_donate && heroes_donate.length > 0) {
      if (heroes_donate[currentIndex]?.img) {
        const img = new Image();
        img.src = heroes_donate[currentIndex]?.img;
        img.onload = () => setLoadedImage(heroes_donate[currentIndex]?.img);
      }
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes_donate.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [heroes_donate, currentIndex]);

  return (
    <div className="relative overflow-hidden font-quicksand w-[100%] h-[50vh] md:h-[80vh] mt-[100px] lg:mt-[120px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={heroes_donate[currentIndex]?._id}
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${loadedImage || heroes_donate[currentIndex]?.img})`,
            backgroundSize: '100% 100%',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-75" />
        </motion.div>
      </AnimatePresence>

      {/* Scroll Arrows */}
      <div className="absolute top-[50%] left-[20px] z-20 transform -translate-y-1/2">
        <button
          onClick={() =>
            setCurrentIndex(
              (prevIndex) =>
                (prevIndex - 1 + heroes_donate?.length) % heroes_donate?.length,
            )
          }
          className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[15px] font-bold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-[50%] right-[20px] z-20 transform -translate-y-1/2">
        <button
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex + 1) % heroes_donate?.length,
            )
          }
          className="hidden md:block md:cursor-pointer bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[15px] font-bold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Quote Text */}
      <AnimatePresence>
        <motion.div
          key={heroes_donate[currentIndex]?.text}
          className="absolute top-10 md:inset-0 flex items-center justify-center z-10"
        >
          <motion.p
            className="text-logoYellow text-center font-bold text-xl leading-[30px] md:leading-[50px] lg:leading-[80px] small-range:text-2xl md:text-3xl lg:text-5xl w-[90%] md:w-[60%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {heroes_donate[currentIndex]?.text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[30]">
          <ScrollLink to="donate-form" smooth={true} duration={1200}>
            <button
              aria-label="Donate"
              className="text-white bg-logoYellow font-semibold rounded-full md:text-[1.1rem] text-heading5 px-5 py-2.5 animate-bounce"
            >
              Donate
            </button>
          </ScrollLink>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default DonateHero;
