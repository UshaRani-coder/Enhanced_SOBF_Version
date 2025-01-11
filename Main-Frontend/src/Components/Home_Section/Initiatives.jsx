import React from "react";
import education from "../../assets/education.avif";
import food1 from "../../assets/food1.avif";
import goodhealth from "../../assets/good-health1.avif";
import cleanwater from "../../assets/clean-water1.avif";

const Programms = () => {
  return (
    <div className="my-[15px]">
      <div className="mt-2 text-center">
        <h2 className="inline-block text-heading3 lg:text-heading2 font-bold p-5 text-blue">
          Our Initiatives
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h2>
      </div>

      <div className="flex  flex-col lg:flex-row px-2  md:mx-[100px] lg:mx-[50px]">
        <div className=" pt-1 lg:py-12">
          <div className="gap-4 flex p-4 flex-col items-center md:flex-row ">
            <img
              className="bg-[#dda63a] object-cover border-2rounded-xl w-11 h-11 rounded-lg p-1"
              src={food1}
              alt=""
            />
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-heading4 text-black  font-sans font-bold ">
                Zero Hunger
              </h2>
              <p className="text-justify">
              We provide affordable, nutritious Sattvik food to address hunger and improve quality of life.
              </p>
            </div>
          </div>
          <div className="gap-4 flex p-4 flex-col items-center md:flex-row">
            <img
              className="bg-[#4c9f38] object-cover border-2rounded-xl w-11 h-11 rounded-lg p-1"
              src={goodhealth}
              alt=""
            />
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-heading4 text-black  font-sans font-bold text-center">
                Good health and Well being
              </h2>
              <p className="text-justify">
              We do promote health, hygiene, and a clean environment to foster well-being and spiritual growth.
              </p>
            </div>
          </div>
        </div>
        <div className=" py-1 lg:py-12">
          <div className="gap-4 flex p-4 flex-col items-center md:flex-row">
            <img
              className="bg-[#c5182d] border-2rounded-xl w-11 h-11 rounded-lg p-1"
              src={education}
              alt=""
            />
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-heading4 text-black  font-sans font-bold text-center">
                Quality Education
              </h2>
              <p className="text-justify">
              Providing quality education to all, especially girls and women, to empower them and create equal opportunities.
              </p>
            </div>
          </div>
          <div className="gap-4 flex p-4 flex-col items-center md:flex-row ">
            <img
              className="bg-[#26bde2] object-cover border-2rounded-xl w-11 h-11 rounded-lg p-1"
              src={cleanwater}
              alt=""
            />
            <div className="flex flex-col items-center md:items-start ">
              <h2 className="text-heading4 text-black  font-sans font-bold  text-center md:text-start">
                Clean water and sanitation
              </h2>
              <p className="text-justify">
                Anna Vitran Seva promotes sustainable living through waste management and sanitation initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programms;
