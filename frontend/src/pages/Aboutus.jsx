import React, { useState } from "react";
import aboutus from "../assets/aboutUsImage.avif";
import cee14 from "../assets/Sobf Images/child_education_and_empowerment/cee14.avif";
import cee11 from "../assets/Sobf Images/child_education_and_empowerment/cee11.avif";
import ca5 from "../assets/Sobf Images/children_activities/ca5.avif";
import ca15 from "../assets/Sobf Images/children_activities/ca3.avif";
import hac4 from "../assets/Sobf Images/health_and_awareness_camp/hac4.avif";
import ca6 from "../assets/Sobf Images/children_activities/ca6.avif";
import ourStory from "../assets/ourStoryImg.avif";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const renderContent = () => {
    switch (activeTab) {
      case "mission":
        return (
          <p className="text-gray-600 text-justify">
            We aim to simplify complex processes, enhance efficiency, and drive
            growth through our innovative software and services. By providing
            solutions, we enable to navigate the ever-changing tech landscape.
          </p>
        );
      case "vision":
        return (
          <p className="text-gray-600  text-justify">
            Our vision is to be the leading provider of innovative tech
            solutions that empower businesses to reach their full potential.
          </p>
        );
      case "objective":
        return (
          <p className="text-gray-600  text-justify">
            Our objective is to deliver high-quality, efficient, and reliable
            software solutions that meet the evolving needs of our clients.
          </p>
        );
      default:
        return null;
    }
  };

  const images = [
   cee14,
    ca5,
    hac4,
    cee11,
    ca15,
    ca6,

  ];

  return (
    <div className="pt-[100px]">
      {/* image */}
      {/* <img src={aboutus} alt="" className='w-full h-[190px] lg:h-[420px] mt-[10px]' /> */}
      <div
        className="w-full h-[200px] md:h-[300px] lg:h-[450px]"
        style={{
          backgroundImage: `url(${aboutus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {/* toggler  */}
      <div className="w-full flex justify-center items-center flex-col lg:flex-row gap-1 lg:gap-5 mx-auto py-8 px-4">
        <div className="w-[98%] lg:w-[50%] ">
          <h2 className="text-logoYellow poppins-semibold text-heading4">
            What We Do
          </h2>
          <h1 className="poppins-bold text-3xl lg:text-heading1 leading-snug text-gray-900 mt-2 ">
            Discover our mission-driven approach
          </h1>
        </div>

        <div className="w-[99%] lg:w-[50%] mt-4">
          <div className="flex ">
             <button aria-label="Play Video"
              className={`poppins-medium w-[33.3%] px-4 py-3 rounded-tl-lg text-sm lg:text-lg ${
                activeTab === "mission"
                  ? "text-white bg-peacock-green-hover"
                  : "bg-light-lavender text-gray-700"
              }`}
              onClick={() => setActiveTab("mission")}
            >
              Our Mission
            </button>
             <button aria-label="Play Video"
              className={`poppins-medium w-[33.3%] px-4 py-3 text-sm lg:text-lg  ${
                activeTab === "vision"
                  ? "text-white hover:bg bg-peacock-green-hover"
                  : "bg-light-lavender text-gray-700"
              }`}
              onClick={() => setActiveTab("vision")}
            >
              Our Vision
            </button>
             <button aria-label="Play Video"
              className={`poppins-medium w-[33.3%] px-4 py-3 rounded-tr-lg text-sm lg:text-lg  ${
                activeTab === "objective"
                  ? "text-white bg-peacock-green-hover "
                  : "bg-light-lavender text-gray-700"
              }`}
              onClick={() => setActiveTab("objective")}
            >
              Our Objective
            </button>
          </div>
          <div className="p-4 py-8 bg-gray-50 rounded-b-lg text-lg rounded-lg border ">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* about us data */}
      <div className="flex py-12 px-4 lg:px-12 gap-3 lg:gap-24 justify-around flex-col lg:flex-row ">
        <div className="w-[99%] lg:w-[50%] p-0 lg:p-4 text-start">
          <h1 className="inline-block text-heading3 lg:text-heading1 font-bold mb-1 pb-5 text-logoYellow ">
            Our Story
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className="text-lg text-gray-700 mt-4 text-justify">
            <span className="text-xl text-purple-700 font-bold hover:underline">
              Soul Of Braj Federation
            </span>{" "}
            is a Section-8 Recognized Non Profit Organization, dedicated to
            Serve Society members in Shri Vrindavan Dham, Since 2020, SOBF is
            Dedicated to Serve the Poorest of the Poor Residents of Vrindavan
            and the Braj region of Uttar Pradesh, ( Bharat ). Particularly
            Adolescent Girls and Women by Providing Comprehensive, Essential
            Community Services. Our Initiatives are, Clean and Healthy
            Vrindavan, Affordable Food , Providing Basic Education, Skill
            Training, Health-Hygiene Care, Distribution of free Meals / Ration
            Kits ,Waste Management Projects, Currently we are Impacting more
            than 1000+ Beneficiaries on Daily Basis. Focused And On Going
            Initiatives: Anna Vitran Seva( Affordable Food Prasadam For All ),
            Swasth aur Swachh Vrindavan, Give Me A Chance, Say Yes To Me,
            Brajkulam Community Centre.
          </p>
        </div>
        <div className="w-[99%] lg:w-[50%] ">
          <img
            src={ourStory}
            className="rounded-xl shadow-xl w-[570px] lg:w-[550px]"
            alt=""
          />
        </div>
      </div>

      {/* collected shots */}
      <div className="container mx-auto p-0 lg:p-4 px-4 lg:px-20 text-center">
        <h1 className=" text-heading3 lg:text-heading1 inline-block font-bold mb-4 pb-5 text-logoYellow ">
          Collected Shots
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <div key={index} className="w-full hover:opacity-90">
              <img
                src={image}
                alt={`Shot ${index + 1}`}
                className="w-full h-auto transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
