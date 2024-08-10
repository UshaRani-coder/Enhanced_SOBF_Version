import React from "react";
import Image from "../../assets/cow.avif";
const SwachhVrindavan = ({ setService }) => {
  return (
    <div className="w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto">
      <button
        className="back-button my-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
        onClick={() => setService(null)}
      >
        Back to Services
      </button>

      <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <img
          src={Image}
          alt="community-service"
          className="w-[90%] lg:w-[30%]  "
        />

        <div className="flex flex-col items-center md:items-start mx-[20px] w-[90%] lg:w-[70%] justify-center">
        <h1 className="text-center text-heading4 lg:text-[27px] font-bold my-4 text-peacock-green relative hover:text-peacock-green-hover transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
            Swachh & Swasth Vrindavan
          </h1>
          <p className="text-gray-700 text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 xl:pb-[50px]  md:text-left lg:leading-[30px]">
            We feel very sad when we see garbage and filth in Shri Vrindavan
            Dham, and even more sad when we see cows eating that garbage,Swachh
            Vrindavan, Swasth Vrindavan, is our initiative, in which we will
            take steps to make Shri Vrindavan Dham more clean and healthy, every
            year lakhs of devotees come to visit Shri Vrindavan Dham, we will
            make an effort for all, so that all the pilgrims Had a very good
            experience of Braj Yatra.Our Shri Vrindavan Dham is very sacred,
            hence it is our duty to keep making continuous efforts to keep Shri
            Vrindavan Dham clean and healthy.Parikrama is going on continuously
            in Shri Vrindavan Dham, every Guru, Sadhu, Sanyasi, Acharya,
            Vaishnav all do Parikrama, we will try that while doing Parikrama
            there is no dirt on their feet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwachhVrindavan;
