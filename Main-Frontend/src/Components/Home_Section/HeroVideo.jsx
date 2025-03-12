
import React, { useRef, useEffect, useState } from "react";
import Popup from "../common_components/Popup.jsx";


const HeroVideo = () => {
  const videoRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.playsInline = true;

      if (!showPopup) {
        videoElement.play().catch((error) =>
          console.error("Video play error:", error)
        );
      } else {
        videoElement.pause();
      }
    }

    // Prevent scrolling when popup is open
    if (showPopup) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showPopup]

);
  

  const handleScrollDown = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      const offset = 10;
      const sectionPosition =
        nextSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: sectionPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {showPopup && <Popup onClose={closePopup} />}

      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dpxilylu2/video/upload/v1741364280/urkl8zbeoo0gj9yknioy.mp4"  
        autoPlay
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0  bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-[45px] lg:text-6xl font-bold tracking-wide leading-tight text-[#f6f1d3] relative text-center w-full max-w-[90%] mx-auto">
          Welcome to
          <span className="block font-extrabold uppercase overflow-hidden text-center w-full flex justify-center items-center">
            <span className="md:mt-2 text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-[size:200%] bg-clip-text animate-gradient-shimmer">
              Soul of Braj Federation
            </span>
          </span>
        </h1>

        <p className="small-max:mt-2 text-xl md:text-3xl lg:text-2xl max-w-2xl text-[#f6f1d3]">
        Supporting Vrindavan’s underprivileged through education, healthcare, and sustainable growth.
        </p>

        {/* Scroll Down Arrow */}
        <div
          className="absolute bottom-20 animate-bounce cursor-pointer"
          onClick={handleScrollDown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes gradient-shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animate-gradient-shimmer {
            animation: gradient-shimmer 5s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HeroVideo;

