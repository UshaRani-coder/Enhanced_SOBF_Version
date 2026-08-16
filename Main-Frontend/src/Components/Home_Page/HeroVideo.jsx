import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import posterImage from '@/assets/Sobf Images/child_education_and_empowerment/cee29.webp';
const HeroVideo = () => {
  const videoRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (showPopup) {
      videoElement.pause();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [showPopup]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      const offset = 150;
      const sectionPosition =
        nextSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: sectionPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        poster={posterImage}
        className="w-full h-full object-cover"
        disablePictureInPicture
      >
        <source
          media="(max-width: 768px)"
          src="https://res.cloudinary.com/dhv61cvx5/video/upload/q_auto,f_auto/v1786777066/SOBF_mobile_r97aty.webm"
          type="video/webm"
        />

        <source
          src="https://res.cloudinary.com/dhv61cvx5/video/upload/q_auto,f_auto/v1786776035/SOBF_lf0cax.webm"
          type="video/webm"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0  bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-[clamp(1.8rem,4vw,3.8rem)] font-bold tracking-wide leading-tight text-[#f6f1d3] relative text-center w-full max-w-[90%] mx-auto">
          Welcome to
          <span className=" font-extrabold uppercase overflow-hidden text-center w-full flex justify-center items-center">
            <span className="md:mt-2 text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-[size:200%] bg-clip-text ">
              Soul of Braj Federation
            </span>
          </span>
        </h1>

        <p className="small-max:mt-2 text-[clamp(1rem,2.2vw,1.5rem)] max-w-2xl text-[#f6f1d3]">
          Supporting Vrindavan’s underprivileged through education, healthcare,
          and sustainable growth.
        </p>

        {/* Subscription button with left-to-right hover effect */}
        <div className="mt-5">
          <button
            className="relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg overflow-hidden font-semibold text-white rounded-full group 
  bg-[#2d335d] shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#edb25a]/50"
            onClick={() => {
              navigate('/subscription');
            }}
          >
            {/* Gold gradient hover */}
            <span className="absolute inset-0 w-0 transition-all duration-300 bg-gradient-to-r from-[#edb259] to-[#d9a441] group-hover:w-full"></span>

            {/* Shine effect */}
            <span className="absolute top-0 left-0 w-6 h-full -skew-x-12 bg-white/10 group-hover:left-[120%] transition-all duration-500"></span>

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Monthly Seva Subscription</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 opacity-90"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Scroll Down Arrow */}
        <div
          className="absolute bottom-[150px] lg:bottom-20 animate-bounce cursor-pointer"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;
