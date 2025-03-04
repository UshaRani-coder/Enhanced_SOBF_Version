// import { useState, useEffect, useRef } from 'react';
// import { X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // Import Images for Mobile (below md)
// import brajkulamImg from '../../assets/Sobf Images/child_education_and_empowerment/cee28.jpg';
// import sadhuSevaImg from '../../assets/Sobf Images/Sadhu Seva/cropped-ss8.png';
// import yamunaCleaning from '../../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv6.jpg';

// // Import Images for md & above
// import mdBrajkulamImg from '../../assets/Sobf Images/children_activities/ca1.png'
// import mdSadhuSevaImg from '../../assets/Sobf Images/Sadhu Seva/ss9.png'
// import mdYamunaCleaning from '../../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv1.png'

// const popupImagesArray = [
//   {
//     img: sadhuSevaImg,
//     description:
//       'Your donation provides essential care and support for elderly and needy sadhus.',
//   },
//   {
//     img: brajkulamImg,
//     description:
//       'Your donation empowers underprivileged children with education and a brighter future.',
//   },
//   {
//     img: yamunaCleaning,
//     description:
//       'Your donation helps restore and preserve the sacred Yamuna River for future generations.',
//   },
// ];

// const popupImagesArrayMD = [
//   {
//     img: mdBrajkulamImg,
//     description:
//       'Your donation empowers underprivileged children with education and a brighter future.',
//   },
//   {
//     img: mdSadhuSevaImg,
//     description:
//       'Your donation provides essential care and support for elderly and needy sadhus.',
//   },
//   {
//     img: mdYamunaCleaning,
//     description:
//       'Your donation helps restore and preserve the sacred Yamuna River for future generations.',
//   },
// ];

// const Popup = ({ onClose }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const intervalRef = useRef(null);
//   const [isMD, setIsMD] = useState(window.innerWidth >= 768);

//   useEffect(() => {
//     const updateSize = () => setIsMD(window.innerWidth >= 768);
//     window.addEventListener('resize', updateSize);

//     startSlideshow();

//     return () => {
//       clearInterval(intervalRef.current);
//       window.removeEventListener('resize', updateSize);
//     };
//   }, []);

//   const startSlideshow = () => {
//     intervalRef.current = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % (isMD ? popupImagesArrayMD.length : popupImagesArray.length));
//     }, 3000);
//   };

//   const stopSlideshow = () => {
//     clearInterval(intervalRef.current);
//   };

//   const imagesToShow = isMD ? popupImagesArrayMD : popupImagesArray;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center pt-64 md:pt-10 lg:pt-20 bg-black bg-opacity-30 z-[99999] ">
//       <div className="relative  w-[90%] small-max:w-[85%] md:w-[70%] lg:w-[50%]  h-[100vh] md:h-[80vh]  rounded-lg  flex flex-col">
//         {/* Close Button */}
//         <button
//           className="absolute top-3 right-3 text-white bg-black bg-opacity-50 rounded-full p-1 z-20"
//           onClick={onClose}
//         >
//           <X size={15} />
//         </button>

//         {/* Slideshow */}
//         <div
//           className="relative w-full h-full  flex flex-col items-center justify-center"
//           onMouseEnter={stopSlideshow}
//           onMouseLeave={startSlideshow}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               className="absolute inset-0 flex flex-col items-center justify-center w-full h-full   p-6 rounded-lg text-center"
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.6 }}
//               style={{
//                 backgroundImage: `url(${imagesToShow[currentIndex].img})`,
//                 backgroundSize: '100% 100%',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundPosition: 'center',
//               }}
//             >
//               {/* Description */}
//               <motion.p
//                 className="text-lg font-bold md:text-2xl small-max:mt-[50px] md:mt-[200px] lg:mt-[250px] text-white mb-6 max-w-lg p-2 bg-gray-900 bg-opacity-50 md:bg-opacity-60 rounded-md"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 {imagesToShow[currentIndex].description}
//               </motion.p>

//               {/* Donate Button */}
//               <Link to={'/donate-us'} onClick={onClose}>
//                 <motion.button
//                   className="bg-orange animate-bounce hover:bg-red-700 text-white px-6 text-md py-3 rounded-lg font-semibold shadow-md"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   Donate Now
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import brajkulamImg from '../../assets/Sobf Images/child_education_and_empowerment/cee28.jpg';
import sadhuSevaImg from '../../assets/Sobf Images/Sadhu Seva/cropped-ss8.png';
import yamunaCleaning from '../../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv6.jpg';

const Popup = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling

    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when popup closes
    };
  }, []);
  const popupImagesArray = [
    {
      img: sadhuSevaImg,
      description:
        'Your donation provides essential care and support for elderly and needy sadhus.',
    },
    {
      img: brajkulamImg,
      description:
        'Your donation empowers underprivileged children with education and a brighter future.',
    },
    {
      img: yamunaCleaning,
      description:
        'Your donation helps restore and preserve the sacred Yamuna River for future generations.',
    },
  ];
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[99999]">
      {/* <div className="relative w-[90%]  md:w-[60%] lg:w-[60%] xl:w-[40%]  h-[75vh] lg:h-[65vh] xl:h-[70vh]  bg-[#FFFEFA] rounded-lg shadow-lg flex flex-col mt-[100px] md:mt-[70px] lg:mt-0 xl:mt-[120px]"> */}
      <div className="relative w-[90%] md:w-[60%] lg:w-[60%] xl:w-[40%] bg-[#FFFEFA] rounded-lg shadow-lg flex flex-col mt-[100px] md:mt-[70px] lg:mt-0 xl:mt-[120px] h-[75vh] lg:h-[65vh] xl:h-[70vh] safari:h-[80vh] firefox:h-[70vh] edge:h-[100vh]">
        {/* Close Button */}
        <button
          className="absolute top-[-10px] right-[-10px] text-white font-bold bg-red-500 hover:bg-red-700 rounded-full p-1"
          onClick={onClose}
        >
          <X size={12} />
        </button>

        {/* Images Section (Top Half) */}
        
        <div className="flex w-full h-[60%] rounded-lg overflow-hidden">
  {popupImagesArray.map((item, index) => (
    <div
      key={index}
      className={`w-1/3 h-full bg-center bg-no-repeat ${
        index === 0 ? "rounded-l-lg" : index === popupImagesArray.length - 1 ? "rounded-r-lg" : ""
      }`}
      style={{
        backgroundImage: `url(${item.img})`,
        backgroundSize: "100% 100%",
      }}
    />
  ))}
</div>

        {/* Description Section (Bottom Half) */}
        <div className="flex flex-col items-center justify-center  px-6 text-center">
          <p className="text-lg font-bold md:text-2xl max-w-lg p-2 small-range:pt-4 lg:pt-6">
            Your support honors sadhus, nurtures young minds, and protects the
            sacred Yamuna.
          </p>

          {/* Donate Button */}
          <Link to={'/donate-us'} onClick={onClose} className="m-2">
            <button
              className="lg:mt-6 xl:mt-0 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-2 px-4 md:px-4 md:py-3 rounded-full 
                     shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2 animate-bounce"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentcolor"
                stroke="currentcolor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[14px] h-[14px]"
              >
                <path d="M20.8 4.6c-2.3-2.2-6.1-2.1-8.3.3l-.5.6-.5-.6C9.2 2.5 5.4 2.4 3.1 4.6a5.5 5.5 0 0 0 0 7.8l8.2 8.1 8.2-8.1a5.5 5.5 0 0 0 .3-7.8z" />
              </svg>
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
