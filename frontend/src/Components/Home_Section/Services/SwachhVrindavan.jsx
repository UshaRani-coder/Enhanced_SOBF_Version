import React from "react";
import { useLocation } from "react-router-dom";
import Img1 from "../../../assets/Sobf Images/health_and_awareness_camp/swachhVrindavan.jpg";
import Img2 from "../../../assets/Sobf Images/health_and_awareness_camp/swachhVrindavan2.jpg";
import Img3 from "../../../assets/Sobf Images/health_and_awareness_camp/swachhVrindavan3.jpg";
import ImgBanner from "./ImgBanner";
import { Link } from "react-router-dom";
const SwachhVrindavan = ({ setService }) => {
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
        <ImgBanner banners={images}/>
                <div className="flex flex-col items-center md:items-start mx-[20px] w-[90%] lg:w-[70%] justify-center">
          <h1 className="text-center text-heading4 lg:text-[27px] font-bold my-4 relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] mt-5">
            Swachh Yamuna, Swasth Vrindavan
          </h1>
          {/* <p className="text-gray-700 text-[16px] text-justify lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px] md:text-left lg:leading-[30px]">
            We feel very sad when we see garbage and filth in Shri Vrindavan
            Dham, and even more sad when we see cows eating that garbage. Swachh Yamuna, Swasth Vrindavan, is our initiative, in which we will
            take steps to make Shri Vrindavan Dham cleaner and healthier. Every
            year, lakhs of devotees come to visit Shri Vrindavan Dham, and we
            aim to ensure they have a good experience. Our Shri Vrindavan Dham is
            very sacred, and it is our duty to make continuous efforts to keep
            it clean and healthy. Parikrama is ongoing in Shri Vrindavan Dham,
            and every Guru, Sadhu, Sanyasi, Acharya, and Vaishnav performs
            Parikrama. We strive to ensure there is no dirt on their feet during
            Parikrama.
          </p> */}
          <p className="text-gray-700 text-[16px] text-justify lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px] md:text-left lg:leading-[30px]">
            "Swachh Yamuna, Swasth Vrindavan" emphasizes the vital link between
            a clean Yamuna River and a healthy Vrindavan. It calls for
            collective efforts—government action, community participation, NGO
            involvement, and individual responsibility—to restore ecological
            balance, enhance public health, preserve religious sanctity, and
            boost tourism, ensuring a sustainable future.
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

export default SwachhVrindavan;
