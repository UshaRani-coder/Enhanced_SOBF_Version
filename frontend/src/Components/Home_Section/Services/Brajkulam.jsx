import React from "react";
import { useLocation } from "react-router-dom";
import Img1 from "../../../assets/Sobf Images/child_education_and_empowerment/cee1.avif";
import Img2 from "../../../assets/Sobf Images/child_education_and_empowerment/cee12.avif";
import Img3 from "../../../assets/Sobf Images/child_education_and_empowerment/cee25.avif";
import ImgBanner from "./ImgBanner";
import { Link } from "react-router-dom";

const Brajkulam = ({ setService }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if the current page is the home page
  const images = [
    {
      img: Img1,
    },
    {
      img: Img2,
    },
    {
      img: Img3,
    },
  ];
  return (
    <div
      className={`w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto ${
        isHomePage ? "" : "mt-20 mb-20" // Apply mt and mb only if not on home page
      }`}
    >
      {/* Only show the "Back to Services" button if on the home page */}
      {location.pathname == "/" && (
        <button
          aria-label="Back to Services"
          className="back-button my-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={() => setService(null)}
        >
          Back to Services
        </button>
      )}

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <ImgBanner banners={images} />
        <div className="flex flex-col md:items-start items-center mx-[20px] w-[90%] lg:w-[50%] justify-center">
          <h1 className="text-center text-heading4 lg:text-heading3 font-bold mb-5">
            Brajkulam Community Center
          </h1>
          <p className="text-gray-700 text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px] md:text-left lg:leading-[30px] text-justify">
            We started a free Computer lab for our Brajkulam children in Shri
            Vrindavan Dham, Mathura District, Uttar Pradesh. In this lab, they
            will gain knowledge of machine learning, so they can prepare for a
            bright future. With this effort, we aim to transform hundreds of
            deprived children in the Braj region. We need your guidance and
            support to achieve this goal.
          </p>
          <button>
            <Link
              href=""
              className="px-8 py-3.5 relative rounded-lg group overflow-hidden font-semibold bg-orange text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg"
            >
              <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
              <span className="relative z-10">
                <Link to="/donate-us" onClick={""}>
                  Donate
                </Link>
              </span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brajkulam;
