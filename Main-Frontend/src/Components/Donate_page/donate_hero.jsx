import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import { heroes_donate } from "../../Constant/data";
import { Link as ScrollLink } from "react-scroll";

const donate_hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textAnimation, setTextAnimation] = useState(false);
  const imageElement = useRef(null);

  const scrollLeft = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + heroes_donate.length) % heroes_donate.length
    );
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes_donate.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
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
    <div className="hero-donate relative flex items-center overflow-hidden font-quicksand w-[100%] h-[100vh] mt-[100px]">
      <div
        className="hero-img object-cover w-[100%] h-[100%] animate-zoomIn transition-bg-image"
        ref={imageElement}
        key={currentIndex}
        style={{
          backgroundImage: `url(${heroes_donate[currentIndex].img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div
        className="scroll-arrow hidden cursor-pointer lg:block absolute top-[60%] left-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full z-[10]"
        style={{ transform: "translateY(-50%)" }}
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
        className="scroll-arrow hidden cursor-pointer lg:block absolute top-[60%] right-[10px] bg-[rgba(0,0,0,0.5)] text-[#ffffff] py-[8.5px] px-[10px] rounded-full z-[10]"
        style={{ transform: "translateY(-50%)" }}
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
        className={`absolute px-2 font-bold top-[35%] lg:top-[50.5%] xl:top-[42.5%] left-1/2 transform -translate-x-1/2 text-white z-[10] text-center hero-text w-[320px] md:w-[600px] lg:w-[700px] sm:text-[25px] md:text-[30px] lg:text-[45px]  ${
          textAnimation ? "text-animate" : ""
        }`}
      >
        {heroes_donate[currentIndex].text}
        <br />
        <ScrollLink
          to="donate-form"
          smooth={true}
          duration={1200}
          className="z-[10] transform -translate-x-1/2"
        >
           <button aria-label="Play Video" className="text-white bg-logoYellow font-semibold rounded-lg md:text-[1.25rem] text-heading5 px-5 py-2.5 me-2 md:mb-7 md:mt-7 mb:5 mt-5">
            Donate
          </button>
        </ScrollLink>
      </p>
    </div>
  );
};

export default donate_hero;
