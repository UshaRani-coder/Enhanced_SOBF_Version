import React, { useState, useEffect, useRef } from "react";
import Boy from "../../assets/Boy.jpg";
import FoodDonation from "../../assets/FoodDonation.jpg";
import Nature from "../../assets/nature.jpg";

import "../../App.css";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textAnimation, setTextAnimation] = useState(false);
  const imageElement = useRef(null);
  const heroes = [
    {
      img: Boy,
      text: "He has a desire to go to School, your support can fulfill his Dream",
    },
    {
      img: FoodDonation,
      text: "Your food can fill more than just a plate.",
    },
    {
      img: Nature,
      text: "Every small act of cleanliness contributes to a healthier world.",
    },
  ];

  const scrollLeft = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroes.length) % heroes.length
    );
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes.length);
  };

  useEffect(() => {
    // const imgElement = document.querySelector('.hero-img');
    // if (imageElement.current) {
    //   imageElement.current.classList.add("zoom-in");
    //   const handleAnimationEnd = () => {
    //     if (imageElement.current) {
    //       imageElement.current.classList.remove("zoom-in");
    //       imageElement.current.removeEventListener(
    //         "animationend",
    //         handleAnimationEnd
    //       );
    //     }
    //   };
    //   imageElement.current.addEventListener("animationend", handleAnimationEnd);
    // }
    // Animate text when currentIndex changes
    setTextAnimation(true);
    const textElement = document.querySelector(".hero-text");
    textElement.classList.add("text-animate");
    const handleTextAnimationEnd = () => {
      textElement.classList.remove("text-animate");
      textElement.removeEventListener("animationend", handleTextAnimationEnd);
    };
    textElement.addEventListener("animationend", handleTextAnimationEnd);

    return () => {
      textElement.removeEventListener("animationend", handleTextAnimationEnd);
    };
  }, [currentIndex]);

  return (
    <div className="hero pt-[120px]">
      <div className="hero-img" ref={imageElement} key={currentIndex} style={{ backgroundImage: `url(${heroes[currentIndex].img})`}}></div>

    <div className="scroll-arrow absolute top-[60%] left-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full cursor-pointer z-[10]" style={{ transform: 'translateY(-50%)' }} onClick={scrollLeft}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-[10px] font-normal"
          fill="rgba(250,250,250,0.5)"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </div>
      <div className="scroll-arrow  absolute top-[60%] right-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full cursor-pointer z-[10] style={{ transform: 'translateY(-50%)' }} " onClick={scrollRight}>
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
        className={`absolute font-bold top-[55%] left-[20%]  text-white z-[10] w-[200px] text-center hero-text ${
          textAnimation ? "text-animate" : ""
        }`}
      >
        {heroes[currentIndex].text}
      </p>
    </div>
  );
};

export default Hero;
