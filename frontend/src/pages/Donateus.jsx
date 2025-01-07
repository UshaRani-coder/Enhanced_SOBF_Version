import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import education from "../assets/banner2.avif";
import food from "../assets/Sobf Images/food distribution/FoodDonation.avif";
import objective from "../assets/objective.avif";
import donate from "../assets/donateMotive.avif";
import { donors_words } from "../Constant/data";
import { our_donors } from "../Constant/data";
import Donate_hero from "../Components/Donate_page/donate_hero.jsx";
import PaymentScreenshot from  "../assets/Sobf Images/PaymentScreenshot.png";


const Donateus = () => {
  const [activeTab, setActiveTab] = useState("whydonate");
  
  // Number animation
  function Number({ n }) {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 },
    });
    return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
  }

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "whydonate":
        return (
          <div className="flex flex-col lg:flex-row lg:gap-10 sm:gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={objective} // Use curly braces here, not angle brackets
                alt="Community Service Projects"
                className="mt-4 lg:w-full sm:w-1/2 lg:h-[80%] sm:h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2 pt-10 lg:text-[18px] text-[14px]">
              <p className="text-gray-600 text-justify">
                Donating to us means contributing to a mission dedicated to
                simplifying complex processes, enhancing efficiency, and driving
                growth through innovative services. We empower communities to
                navigate the ever-changing tech landscape, ensuring that
                resources reach those in need effectively. Your donation
                supports our diverse programs that address fundamental issues
                such as poverty, hunger, health, education, gender equality, and
                sanitation. By supporting us, you become part of a movement that
                has already impacted over 15,000 lives, distributed essential
                items, and fostered community development. Join us in making a
                tangible difference in countless lives.
              </p>
            </div>
          </div>
        );

      case "howweuse":
        return (
          <div className="flex flex-col lg:flex-row gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={food} // Use curly braces here, not angle brackets
                alt="Community Service Projects"
                className="mt-4 lg:w-full sm:w-1/2 h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2 pt-20 lg:text-[18px] text-[14px]">
              <p className="text-gray-600 text-justify">
                We utilize donations strategically to maximize their impact on
                the communities we serve. Funds are allocated to various
                programs that address critical needs such as food distribution,
                sanitary napkin distribution, and providing access to clean
                water and sanitation. Our programs focus on sustainable
                development and community empowerment, ensuring that each dollar
                donated translates into real-world benefits. We maintain
                transparency and efficiency in our operations, ensuring that
                donations are used effectively to support our mission.
                Additionally, we invest in our volunteers, enhancing their
                ability to serve and expand our reach to more individuals and
              </p>
            </div>
          </div>
        );

      case "whereweuse":
        return (
          <div className="flex flex-col lg:flex-row gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={education} // Use curly braces here, not angle brackets
                alt="Community Service Projects"
                className="mt-4 lg:w-full sm:w-1/2 h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2 pt-6 lg:text-[18px] text-[14px]">
              <p className="text-gray-600 text-justify">
                Your generous donations are used across multiple impactful
                programs and initiatives. Our focus areas include addressing
                poverty, hunger, health and well-being, quality education,
                gender equality, and clean water and sanitation. We have reached
                over 15,000 lives, distributed food and sanitary napkins, and
                engaged over 200 volunteers in our efforts. Our community
                service projects, such as Anna Vitran Seva, Swachh & Swasth
                Vrindavan, and the Brajkulam Community Center, are designed to
                foster sustainable development and community well-being. By
                contributing, you are directly supporting these programs and
                helping us extend our reach to more villages and individuals in
                need.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Hero section */}
      <Donate_hero/>

      {/* Tabs */}
      <div className="w-full lg:w-full p-10 mt-4">
        <div className="flex">
           <button aria-label="Play Video"
            className={`poppins-medium w-[33.3%] px-4 py-3 rounded-tl-lg text-sm md:text-lg ${
              activeTab === "whydonate"
                ? "text-white bg-logoYellow"
                : "bg-light-lavender text-gray-700"
            }`}
            onClick={() => setActiveTab("whydonate")}
          >
            Why donate us
          </button>
           <button aria-label="Play Video"
            className={`poppins-medium w-[33.3%] px-4 py-3 text-sm md:text-lg  ${
              activeTab === "howweuse"
                ? "text-white bg-logoYellow"
                : "bg-light-lavender text-gray-700"
            }`}
            onClick={() => setActiveTab("howweuse")}
          >
            How we use
          </button>
           <button aria-label="Play Video"
            className={`poppins-medium w-[33.3%] px-4 py-3 rounded-tr-lg text-sm md:text-lg  ${
              activeTab === "whereweuse"
                ? "text-white bg-logoYellow"
                : "bg-light-lavender text-gray-700"
            }`}
            onClick={() => setActiveTab("whereweuse")}
          >
            Where we use
          </button>
        </div>
        <div className="p-4 py-8 bg-gray-50 rounded-b-lg text-lg rounded-lg border ">
          {renderContent()}
        </div>
      </div>

      {/* dynamic number datas */}
      <div className="mt-5 max-w[90%] text-center">
        {/* Title section for Donors words about us */}
        <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-blue ">
          Our achievements
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h1>
      </div>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-6xl w-full">
          <ul className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-6 gap-4">
            {/* List items */}

            <li className="flex flex-col items-center group p-6 rounded-xl hover:shadow-xl">
              {/* SVG and content for yamuna waste and garbage */}
              <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"fill="currentColor"
                className="w-12 h-12 text-[#001d23] group-hover:text-peacock-green-hover">

<path d="M566.6 54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192-34.7-34.7c-4.2-4.2-10-6.6-16-6.6c-12.5 0-22.6 10.1-22.6 22.6v29.1L364.3 320h29.1c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16l-34.7-34.7 192-192zM341.1 353.4L222.6 234.9c-42.7-3.7-85.2 11.7-115.8 42.3l-8 8C76.5 307.5 64 337.7 64 369.2c0 6.8 7.1 11.2 13.2 8.2l51.1-25.5c5-2.5 9.5 4.1 5.4 7.9L7.3 473.4C2.7 477.6 0 483.6 0 489.9C0 502.1 9.9 512 22.1 512l173.3 0c38.8 0 75.9-15.4 103.4-42.8c30.6-30.6 45.9-73.1 42.3-115.8z"></path>

</svg>
              <span className="text-logoYellow text-center font-bold text-3xl md:text-3xl lg:text-4xl mt-4">
                <Number n={10} /> 
                <br />
                Tons
              </span>
              <p className="text-center text-base mt-2">
                More than 10 tons of Yamuna Waste and Garbage collected
              </p>
            </li>

            <li className="flex flex-col items-center group p-6 rounded-xl hover:shadow-xl">
              {/* SVG and content for food distribution */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fill="currentColor"
                clipRule="evenodd"
                viewBox="0 0 512 493.84"
                className="w-12 h-12 text-[#001d23] group-hover:text-peacock-green-hover"
              >
                {/* SVG path */}
                <path d="M390.34 441.59V291H322.6c-28.71 5.15-57.43 20.71-86.15 38.8h-52.61c-23.81 1.43-36.28 25.57-13.15 41.43 18.45 13.52 42.79 12.76 67.74 10.52 17.2-.85 17.95 22.28 0 22.36-6.23.48-13.02-.98-18.93-.98-31.14-.03-56.79-5.99-72.49-30.59l-7.89-18.41-78.26-38.8c-39.16-12.9-66.99 28.07-38.14 56.56 56.68 41.24 114.82 75.17 174.27 102.58 43.19 26.27 86.37 25.38 129.56 0l63.79-32.88zM26.61 295.84C13.26 274.78 5.03 248.03.07 213.49c-.38-2.71.81-5.29 2.87-6.8 1.16-25.91 13.69-39.74 37.53-48.27 2.14-18.68 16.9-31.73 34.98-34.86 25.04-25.44 65.94-33.03 99-20.35 1.14.44 4.7 2.24 7.92 3.86.5.25.78.5.94.72 11.09-8.54 23.81-13.07 36.47-14.37 9.14-.93 18.27-.19 26.74 1.94l42.11-84.37c3.84-7.5 9.98-14.67 21.91-8.88 3.19 1.55 6 3.94 7.87 6.83 5.41 8.3.87 14.09-3.25 21.24l-45.58 75.58c9.12 6.43 16.4 15.39 19.04 26.41 3.95 1.12 7.74 2.37 11.34 3.76l53.07-88.26c4.43-7.18 11.13-13.83 22.55-7.11 3.06 1.8 5.67 4.41 7.31 7.43 4.73 8.71-.26 14.12-4.94 20.92l-55.4 78.84c20.12 14.12 32.83 36.04 27.22 61.26-.3 1.41.32 1.93.32 3.47l-.06.92c-.16 2.81-.4 5.62-.7 8.43-1.76 16.5-5.96 32.94-13.17 48.51H322.6c-.86 0-1.71.06-2.53.2 8.53-16.08 13.29-33.44 15.09-50.88H15.52c5.13 30.94 13.25 54.57 26.01 72.76-5.29.44-10.3 1.62-14.92 3.42zm231-103.63c-3.97 0-7.18-3.21-7.18-7.17 0-3.97 3.21-7.18 7.18-7.18h16.07c3.97 0 7.18 3.21 7.18 7.18 0 3.96-3.21 7.17-7.18 7.17h-16.07zm-3.88-47.66a7.155 7.155 0 1 1-5.83 13.07l-14.66-6.59a7.155 7.155 0 0 1-3.62-9.45 7.155 7.155 0 0 1 9.45-3.62l14.66 6.59zm-81.67 4.82a7.208 7.208 0 0 1-3.98-9.38 7.22 7.22 0 0 1 9.39-3.98l16.07 6.56a7.22 7.22 0 0 1 3.98 9.39 7.223 7.223 0 0 1-9.39 3.97l-16.07-6.56zm-5.53 42.84c-3.96 0-7.18-3.21-7.18-7.17a7.18 7.18 0 0 1 7.18-7.18h16.07c3.97 0 7.18 3.21 7.18 7.18 0 3.96-3.21 7.17-7.18 7.17h-16.07zm-54.6-32.63a7.155 7.155 0 0 1-9.45-3.62 7.155 7.155 0 0 1 3.62-9.45l14.66-6.59c3.61-1.61 7.84.01 9.45 3.62a7.155 7.155 0 0 1-3.62 9.45l-14.66 6.59zm-31.65 32.63c-3.97 0-7.18-3.21-7.18-7.17 0-3.97 3.21-7.18 7.18-7.18h16.07a7.18 7.18 0 0 1 7.18 7.18c0 3.96-3.22 7.17-7.18 7.17H80.28zm-62.88 13.1 318.54-.01c6.91-33.52-27.73-53.61-55.3-60.43-2.85-.7-5.1-3.13-5.41-6.22-1.43-13.91-14.66-23.51-26.9-27.81-8.3-2.92-17.69-4.14-27.09-3.17-11.1 1.13-22.23 5.35-31.62 13.43a7.118 7.118 0 0 1-5.13 2.16c-3.36 0-11.38-5.21-15.14-6.65-28.36-10.88-64.32-4.09-85.15 18.54a7.134 7.134 0 0 1-4.49 2.27c-13.94 1.55-25.12 11.2-25.21 25.77a7.184 7.184 0 0 1-5.02 7.33c-19.1 5.97-30.51 13.81-32.08 34.79zM44 238.06a5.723 5.723 0 0 1 3.45-7.32c2.97-1.06 6.25.48 7.32 3.46 3.91 10.84 8.9 21.3 14.91 31.14 1.65 2.7.8 6.23-1.9 7.87-2.7 1.65-6.23.8-7.88-1.9-6.39-10.47-11.75-21.71-15.9-33.25zm25.64 47.5a5.745 5.745 0 0 1 1.08-8.04 5.743 5.743 0 0 1 8.03 1.08c4.69 6.14 9.81 11.83 15.55 17a5.748 5.748 0 0 1 .43 8.1 5.73 5.73 0 0 1-8.1.43c-6.2-5.59-11.92-11.95-16.99-18.57zm433.5-9.03h-83.55c-4.88 0-8.87 3.98-8.87 8.86v162.46c0 4.88 3.99 8.87 8.87 8.87h83.55c4.87 0 8.86-3.99 8.86-8.87V285.39c0-4.88-3.99-8.86-8.86-8.86zm-41.78 27.35c-7.27 0-13.17 5.9-13.17 13.18 0 7.27 5.9 13.17 13.17 13.17 7.28 0 13.17-5.9 13.17-13.17 0-7.28-5.89-13.18-13.17-13.18z" />
              </svg>
              <span className="text-logoYellow text-center font-bold text-3xl md:text-3xl lg:text-4xl mt-4">
                <Number n={100000} /> <br/>
                 Plates
              </span>
              <p className="text-center text-base mt-2">More than 1,00,000 Food Plate Seva accomplished</p>
            </li>

            {/* Sanitary napkins */}
            <li className="flex flex-col items-center group p-6 rounded-xl hover:shadow-xl">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.78 122.88"
                className="w-[40px] text-[#001d23] group-hover:text-peacock-green-hover"
                fill="currentColor"
              >
                <path d="M102.68,20.56h0c8.11,8.1,9.52,23.09,0,29.47q-6.74,4.53-12.9,9.31c-16.57,12.86-30,27.21-39.71,43.31-5.93,9.81-21.37,8.11-29.48,0h0c-8.1-8.11-9.73-23.42,0-29.48A164,164,0,0,0,63.9,33.72q4.86-6.28,9.31-13.16c6.22-9.63,21.37-8.11,29.47,0Zm2.66,41.76.32.41,1.8,2.23a13.18,13.18,0,0,1,3,8.15,10.62,10.62,0,0,1-3.16,7.66L80.68,107.39a10.88,10.88,0,0,1-7.77,3.2,12.56,12.56,0,0,1-8.11-3.08l-2.22-1.92-.66-.57c-1.88,2.85-3.8,5.92-5.84,9.3a16.34,16.34,0,0,1-2.44,3.12h0c-4.29,4.29-10.6,5.81-17.28,5.35a43.29,43.29,0,0,1-18.76-6.07A35,35,0,0,1,11,111.6a34.38,34.38,0,0,1-4.77-6.08A41.59,41.59,0,0,1,.06,86.75c-.41-6.68,1.18-13,5.54-17.39a17.64,17.64,0,0,1,3.06-2.42c3.37-2.09,6.43-4,9.27-5.94l-.23-.28-2-2.3a12.6,12.6,0,0,1-3.07-8.11,10.84,10.84,0,0,1,3.2-7.77L42.45,15.93a10.57,10.57,0,0,1,7.62-3.14,13.5,13.5,0,0,1,8.16,2.94c.87.67,1.62,1.27,2.26,1.77l.31.25.36-.52q3-4.31,5.87-8.66a16.58,16.58,0,0,1,2.3-2.85h0c4.47-4.47,11-6.09,17.8-5.64a41.25,41.25,0,0,1,19,6.43,31.82,31.82,0,0,1,9.6,9.44,42.44,42.44,0,0,1,6.91,19.52c.57,7-1,13.78-5.59,18.37l-.15.13a16.64,16.64,0,0,1-2.46,2q-4.38,2.94-8.54,5.93l-.59.43ZM64.64,101l1.07.94,2.21,1.9a7.75,7.75,0,0,0,5,1.92,6.1,6.1,0,0,0,4.37-1.8l26.61-26.61a5.92,5.92,0,0,0,1.75-4.26A8.34,8.34,0,0,0,103.72,68l-1.78-2.2-.47-.57c-1.18.89-2.38,1.81-3.58,2.74-10.64,8.27-18,14.73-24.21,21.66a121.8,121.8,0,0,0-9,11.44ZM58,21.64l-.47-.38L55.3,19.53a8.71,8.71,0,0,0-5.23-1.93,5.85,5.85,0,0,0-4.22,1.73L19.24,45.94a6.09,6.09,0,0,0-1.79,4.37,7.74,7.74,0,0,0,1.91,5l2,2.29.6.69a133.83,133.83,0,0,0,12-9.34c7-6.15,13.28-13.23,21.2-23.48,1-1.25,1.94-2.53,2.9-3.82Zm50.28-7.34a28.74,28.74,0,0,0-4.71-3.77A36.1,36.1,0,0,0,86.81,4.87c-5.51-.37-10.68.84-14.08,4.24h0a12.74,12.74,0,0,0-1.68,2.08q-3,4.56-6,8.81c-2,2.84-4.08,5.64-6.21,8.41C50.77,38.87,44.27,46.16,37.06,52.53S22,64.3,11.2,71A12.54,12.54,0,0,0,9,72.77c-3.29,3.29-4.48,8.31-4.14,13.7A36.61,36.61,0,0,0,10.26,103a29.42,29.42,0,0,0,4.09,5.22,30,30,0,0,0,5.73,4.41,38.14,38.14,0,0,0,16.6,5.4c5.37.37,10.35-.76,13.56-4h0A12,12,0,0,0,52,111.84C58.33,101.3,63.64,93.6,70.11,86.38s14-13.85,24.83-22.26c2.55-2,5.29-4,8.19-6.12s5.74-4.06,8.67-6a12.4,12.4,0,0,0,1.76-1.44l.11-.12c3.5-3.49,4.67-8.87,4.2-14.59a37.4,37.4,0,0,0-6.1-17.22,28.07,28.07,0,0,0-3.51-4.31ZM98.33,24.69a3.66,3.66,0,1,1-5.17,0,3.66,3.66,0,0,1,5.17,0ZM28,77a3.66,3.66,0,1,0,0,5.17A3.65,3.65,0,0,0,28,77Zm5.9-5.9a3.66,3.66,0,1,1,5.17,0,3.65,3.65,0,0,1-5.17,0ZM50.11,54.84a3.66,3.66,0,1,0,0,5.17,3.65,3.65,0,0,0,0-5.17ZM72.25,32.7a3.66,3.66,0,1,1-5.17,0,3.65,3.65,0,0,1,5.17,0ZM56,48.94a3.66,3.66,0,1,0,0-5.17,3.65,3.65,0,0,0,0,5.17ZM78.15,26.8a3.66,3.66,0,1,0,0-5.17,3.65,3.65,0,0,0,0,5.17ZM46.05,95.05a3.66,3.66,0,1,0,0,5.18,3.66,3.66,0,0,0,0-5.18Zm5.89-5.89a3.66,3.66,0,1,1,5.18,0,3.66,3.66,0,0,1-5.18,0ZM68.19,72.91a3.66,3.66,0,1,0,0,5.18,3.66,3.66,0,0,0,0-5.18ZM90.33,50.77a3.66,3.66,0,1,1-5.18,0,3.66,3.66,0,0,1,5.18,0ZM74.08,67a3.66,3.66,0,1,0,0-5.18,3.66,3.66,0,0,0,0,5.18ZM96.22,44.88a3.66,3.66,0,1,0,0-5.18,3.66,3.66,0,0,0,0,5.18ZM64.69,58.34a3.66,3.66,0,1,0,0,5.17,3.66,3.66,0,0,0,0-5.17ZM37.08,86a3.66,3.66,0,1,1,5.17,0,3.66,3.66,0,0,1-5.17,0ZM25.86,97.16a3.66,3.66,0,1,1,5.18,0,3.65,3.65,0,0,1-5.18,0Zm27.61-27.6a3.66,3.66,0,1,0,0,5.17,3.66,3.66,0,0,0,0-5.17ZM81.94,41.08a3.66,3.66,0,1,0,0-5.17,3.66,3.66,0,0,0,0,5.17ZM70.73,52.3a3.66,3.66,0,1,0,0-5.18,3.65,3.65,0,0,0,0,5.18Z" />
              </svg>
              <span className="text-logoYellow text-center font-bold text-3xl md:text-3xl lg:text-4xl mt-4">
                <Number n={12000} /> <br /> Units
              </span>
              <p className="text-center text-base mt-2">More than 12,000 Sanitary napkins distributed</p>
            </li>

            {/* Underserved Children */}
            <li className="flex flex-col items-center group p-6 rounded-xl hover:shadow-xl">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 107.91"
                className="w-[40px] text-[#001d23] group-hover:text-peacock-green-hover"
                fill="currentColor"
              >
                <path d="M67.9,7.73c7.53-12.42,33.37-9.87,33.37,7.65v5.46c0,2.45-0.09,2.52,0.8,3.8c0.67,0.98,0.83,1.09,1.06,2.29 c0.3,1.56,0.32,3.16,0.34,4.8c0.04,2.55-0.93,3.28-2.23,5.35l-5.51,8.79c-1.71,2.74-1.98,4.42-1.3,7.88 c1.52,7.71,22.29,12.05,28.46,14.79v14.6l-14.54,0v-5.03l-4.01-1.78c-1.86-0.83-4.41-1.65-7.35-2.59 c-6.96-2.24-16.85-5.42-17.23-7.35c-0.19-0.96-0.27-1.55-0.22-1.84c0.03-0.19,0.24-0.57,0.62-1.19l-0.01,0l5.49-8.76l0.62-0.92 c1.61-2.35,2.69-3.93,2.64-8.09c-0.01-1-0.03-1.99-0.07-2.71c-0.06-1.07-0.17-2.15-0.38-3.24V39.6c-0.44-2.29-0.75-2.85-1.75-4.28 l0-0.54h0.03v-5.46c0-10.72-6.57-17.56-14.97-20.52l0-0.01C70.5,8.34,69.21,7.99,67.9,7.73L67.9,7.73z M0,107.91l0-12.89 c6.17-2.74,29-8.8,30.52-16.51c0.68-3.47,0.41-5.14-1.3-7.88l-5.51-8.79c-1.29-2.06-2.26-2.8-2.23-5.35 c0.02-1.43,0.04-2.85,0.25-4.23c0.26-1.76,0.48-1.82,1.4-3.23c0.62-0.95,0.55-1.24,0.55-3.43v-5.46 c0-11.04,10.26-16.14,19.73-15.29c8.13,0.72,15.68,5.82,15.68,15.29v5.46c0,2.45-0.09,2.52,0.8,3.8c0.67,0.98,0.83,1.09,1.06,2.29 c0.3,1.56,0.32,3.16,0.34,4.8c0.04,2.55-0.93,3.28-2.23,5.35l-5.51,8.79c-1.71,2.74-1.98,4.42-1.3,7.88 c1.52,7.71,22.29,12.05,28.46,14.79v14.6L0,107.91L0,107.91z M48.73,18.98c9.35-9.24,31.25-5.8,31.25,10.33v5.46 c0,2.46-0.09,2.52,0.8,3.8c0.67,0.98,0.83,1.09,1.06,2.29c0.3,1.56,0.32,3.16,0.34,4.8c0.04,2.55-0.93,3.28-2.23,5.35l-5.51,8.79 c-1.71,2.74-1.98,4.42-1.3,7.88c1.52,7.71,22.29,12.05,28.46,14.79v14.6l-14.15,0v-8.13l-4.01-1.78c-1.86-0.83-4.41-1.65-7.35-2.59 c-6.96-2.24-16.85-5.42-17.23-7.35c-0.19-0.97-0.27-1.55-0.22-1.84c0.03-0.19,0.24-0.57,0.62-1.19l-0.01,0l5.49-8.76l0.62-0.92 c1.61-2.35,2.69-3.93,2.64-8.09c-0.01-1.01-0.03-2-0.07-2.71c-0.06-1.07-0.17-2.15-0.38-3.24v-0.03c-0.44-2.29-0.75-2.85-1.75-4.28 l0-0.54h0.03v-5.46c0-6.4-2.45-11.49-6.28-15.22C56.59,22.03,52.8,20.05,48.73,18.98L48.73,18.98z" />
              </svg>
              <span className="text-logoYellow text-center font-bold text-3xl md:text-3xl lg:text-4xl mt-4">
                <Number n={200} /> <br /> Children
              </span>
              <p className="text-center text-base mt-2">More than 200 Underserved Children were served</p>
            </li>

            {/* Donation received */}
            <li className="flex flex-col items-center group p-6 rounded-xl hover:shadow-xl">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 100.58"
                fill="currentColor"
                className="w-[40px] text-[#001d23] group-hover:text-peacock-green-hover"
              >
                <path
                  d="M29.83,87.77V50.85h16.61c7.04,1.26,14.08,5.08,21.12,9.51h12.9c5.84,0.35,8.9,6.27,3.22,10.16 
        c-4.52,3.32-10.49,3.13-16.61,2.58c-4.22-0.21-4.4,5.46,0,5.48c1.53,0.12,3.19-0.24,4.64-0.24c7.63-0.01,13.92-1.47,17.77-7.5 
        l1.93-4.51l19.19-9.51c9.6-3.16,16.43,6.88,9.35,13.87c-13.9,10.11-28.15,18.43-42.73,25.15c-10.59,6.44-21.18,6.22-31.76,0 
        L29.83,87.77L29.83,87.77z M42.41,0l71.41,19.13l-9.95,37.13L32.46,37.13L42.41,0L42.41,0z M76.08,17.22 
        c6.04,1.62,9.62,7.81,8,13.85c-1.62,6.04-7.81,9.62-13.85,8c-6.04-1.62-9.62-7.81-8-13.85C63.84,19.18,70.03,15.6,76.08,17.22 
        L76.08,17.22z M52.83,8.85l47.48,12.72c-0.81,3.02,0.99,6.15,4.02,6.95l-3.93,14.68c-3.02-0.81-6.15,0.99-6.95,4.02L45.96,34.5 
        c0.81-3.02-0.99-6.14-4.02-6.95l3.93-14.68C48.89,13.68,52.02,11.88,52.83,8.85L52.83,8.85z M0,47.3h24.83v44.18H0V47.3L0,47.3z"
                />
              </svg>
              <span className="text-logoYellow text-center font-bold text-3xl md:text-3xl lg:text-4xl mt-4">
                <Number n={1} /> <br /> Crore ₹
              </span>
              <p className="text-center text-base mt-2">More than 1 crore Rupees of Donation received</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Section for Donors' Words */}
      <div className="mt-5 max-w[90%] text-center">
        {/* Title section for Donors words about us */}
        <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-blue ">
        Donors words about us
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h1>
      </div>

      {/* Container for the donor review cards, allowing horizontal scrolling */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        {/* Wrapper for the donor review cards with an animation for infinite scrolling */}
        <div className="flex animate-infinite-scroll">
          {/* Map through the donors_words array to create donor review cards */}
          {[...donors_words, ...donors_words].map((item, index) => (
            <div
              key={index}
              className="review-item mb-8 p-4 border rounded-lg flex flex-col flex-shrink-0 w-[24rem]   mx-4"
            >
              <div className="flex items-start mb-4">
                {/* Image section of the donor */}
                <div className="w-20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
                <div className="w-10"></div>
                {/* Donor details section */}
                <div className="w-50">
                  <h3 className="md:text-xl text-base font-bold ">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.occupation}</p>
                  <p className="text-gray-600">{item.place}</p>
                </div>
              </div>
              {/* Review text from the donor */}
              <p className="text-gray-800 text-justify">
                {item.reviews}
              </p>
            </div>
          ))}
        </div>

        {/* Duplicate wrapper for smooth infinite scrolling effect */}
        <div className="flex animate-infinite-scroll" aria-hidden="true">
          {[...donors_words, ...donors_words].map((item, index) => (
            <div
              key={index}
              className="review-item mb-8 p-4 border rounded-lg flex flex-col flex-shrink-0 w-96 mx-4"
            >
              <div className="flex items-start mb-4">
                {/* Image section of the donor */}
                <div className="w-20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
                <div className="w-20"></div>
                {/* Donor details section */}
                <div className="w-50">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.occupation}</p>
                  <p className="text-gray-600">{item.place}</p>
                </div>
              </div>
              {/* Review text from the donor */}
              <p className="text-gray-800 text-justify">{item.reviews}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section for Recent Donors */}
      <div className="mt-5 max-w[90%] text-center">
        {/* Title section for Recent Donors */}
        <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-blue ">
        Our Donors
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h1>
      </div>

      {/* Container for the donor cards, allowing horizontal scrolling */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        {/* Wrapper for the donor cards with an animation for infinite scrolling */}
        <div className="flex animate-infinite-scroll-reverse">
          {/* Map through the donors_words array to create donor cards */}
          {[...our_donors, ...our_donors].map((item, index) => (
            <div
              key={index}
              className="review-item mb-8 p-4 border rounded-lg flex flex-col flex-shrink-0 w-[24rem] mx-4"
            >
              <div className="flex items-start mb-4">
                {/* Image section of the donor */}
                <div className="w-20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
                <div className="w-10"></div>
                {/* Donor details section */}
                <div className="w-50">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.occupation}</p>
                  <p className="text-gray-600">{item.place}</p>
                </div>
              </div>
              {/* Review text from the donor */}
              <p className="text-gray-800 text-justify">{item.reviews}</p>
            </div>
          ))}
        </div>

        {/* Duplicate wrapper for smooth infinite scrolling effect */}
        <div
          className="flex animate-infinite-scroll-reverse"
          aria-hidden="true"
        >
          {[...our_donors, ...our_donors].map((item, index) => (
            <div
              key={index}
              className="review-item mb-8 p-4 border rounded-lg flex flex-col flex-shrink-0 w-96 mx-4"
            >
              <div className="flex items-start mb-4">
                {/* Image section of the donor */}
                <div className="w-20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
                <div className="w-20"></div>
                {/* Donor details section */}
                <div className="w-50">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.occupation}</p>
                  <p className="text-gray-600">{item.place}</p>
                </div>
              </div>
              {/* Review text from the donor */}
              <p className="text-gray-800 text-justify">{item.reviews}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Donate form */}
      <div id="donate-form">
        {/* Title section for the donate form */}
        <div className="min-h-screen mt-24 p-6 bg-gray-100 flex  items-center justify-center rounded-lg ">
          {/* Container for the donate form */}
          <div className="container max-w-screen-lg mx-auto md:mt-32 md:mb-16 mt-28 mb-10 flex flex-col items-center">
            <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6 md:w-[100%]">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                <div className="text-gray-600">
                  <div className="flex justify-center">
                    <span className="font-medium md:text-[2rem] text-logoYellow text-heading4 py-3 pr-2">
                      Personal
                    </span>

                    <span className="font-medium md:text-[2rem] text-logo-blue text-heading4 py-3">
                      Details
                    </span>
                  </div>

                  <p className="pt-1.5 lg:pb-0 pb-4 flex justify-center">
                    Please fill out all the fields.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="first_name">Full Name</label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="Full Name"
                        required
                        minLength="2"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        placeholder="dd/mm/yyyy"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="phone">Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="Mobile Number"
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pan">PAN Number</label>
                      <input
                        type="text"
                        name="pan"
                        id="pan"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="Enter a valid PAN number (e.g., ABCDE1234F)"
                        maxLength="10"
                      />
                    </div>
                    <div className="md:col-span-5 ">
                      <label htmlFor="aadhar">Aadhar Number (Optional)</label>
                      <input
                        type="number"
                        name="aadhar"
                        id="aadhar"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="Enter a valid 12-digit Aadhaar number (e.g., 123456789012)"
                        maxLength="12"
                        pattern="\d{12}"
                        color="#edf1ffdb"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pin">PIN Code</label>
                      <input
                        type="number"
                        name="pin"
                        id="pin"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="ex. 236790"
                        required
                      />
                    </div>
                    {/* <div className="md:col-span-5">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="state"
                        required
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="City"
                        required
                      />
                    </div> */}
                    <div className="md:col-span-5">
                      <label htmlFor="donation_for">Donation For</label>
                      <select
                        name="donation_for"
                        id="donation_for"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        required
                      >
                        <option value="">Select Program/Service</option>
                        <option value="program1">
                          Child and Education empowerment
                        </option>
                        <option value="program2">Children activities</option>
                        <option value="program3">Food distribution</option>
                        <option value="program3">Women empowerment</option>
                        <option value="program3">Health awareness camp</option>
                        <option value="program3">
                          Sanitary pads distribution
                        </option>
                        <option value="program3">Face mask distribution</option>
                      </select>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="donation_amount">Donation Amount</label>
                      <input
                        type="number"
                        name="donation_amount"
                        id="donation_amount"
                        className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col  md:flex-row justify-center pt-10 md:gap-10 gap-3">
                 <button aria-label="Play Video" className="text-white bg-blue hover:bg-logoYellow border-gray-300 focus:outline-none  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                Pay Now
              </button>
                </div>
            </div>
          </div>
        </div>
      </div>


      
      {/* Donation opportunity Image*/}
      <div className="pt-10">
        <img src={donate} alt="donation oppurtunity" className="w-full object-cover"/>
      </div>

      
    </div>
  );
};

export default Donateus;
