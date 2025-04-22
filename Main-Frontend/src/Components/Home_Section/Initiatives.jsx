import React from 'react';
import zeroHunger from '../../assets/Sobf Images/sdg/Zero Hunger.jpg';
import goodHealth from '../../assets/Sobf Images/sdg/Good Health and Well-Being.jpg';
import qualityEducation from '../../assets/Sobf Images/sdg/Quality Education.jpg';
import cleanWater from '../../assets/Sobf Images/sdg/Clean Water and Sanitation.jpg';
const Programms = () => {
  return (
    <div className="my-[15px] pb-12">
      <div className="mt-2 text-center">
        <h2 className="inline-block text-heading3 lg:text-heading2 font-bold p-5 text-blue">
          Our Initiatives
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h2>
      </div>
      <div className="flex  flex-col lg:flex-row lg:flex-wrap lg:w-[90%] px-2  md:mx-[100px] lg:mx-[50px]">
        <div className="gap-4 flex p-4 flex-col items-center md:flex-row lg:w-[50%]">
          <img
            className="bg-[#dda63a] object-cover border-2rounded-xl w-16 h-16 rounded-lg p-1"
            src={zeroHunger}
            alt=""
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-heading4 text-black  font-sans font-bold ">
              Zero Hunger
            </h2>
            <p className="text-center md:text-left">
              We provide affordable, nutritious Sattvik food to combat hunger
              and enhance the quality of life for individuals and communities.
            </p>
          </div>
        </div>
        <div className="gap-4 flex p-4 flex-col items-center md:flex-row lg:w-[50%]">
          <img
            className="bg-[#4c9f38] object-cover border-2rounded-xl w-16 h-16 rounded-lg p-1"
            src={goodHealth}
            alt=""
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-heading4 text-black  font-sans font-bold text-center">
              Good health and Well being
            </h2>
            <p className="text-center md:text-left">
              We promote health, hygiene, and a clean environment to support
              well-being, holistic health, and the foundation for a thriving
              life.
            </p>
          </div>
        </div>

        <div className="gap-4 flex p-4 flex-col items-center md:flex-row lg:w-[50%]">
          <img
            className="bg-[#c5182d] border-2rounded-xl w-16 h-16 rounded-lg p-1"
            src={qualityEducation}
            alt=""
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-heading4 text-black  font-sans font-bold text-center">
              Quality Education
            </h2>
            <p className="text-center md:text-left">
              Providing quality education to all, especially girls and women, to
              empower them and create equal opportunities.
            </p>
          </div>
        </div>
        <div className="gap-4 flex p-4 flex-col items-center md:flex-row lg:w-[50%]">
          <img
            className="bg-[#26bde2] object-cover border-2rounded-xl w-16 h-16 rounded-lg p-1"
            src={cleanWater}
            alt=""
          />
          <div className="flex flex-col items-center md:items-start ">
            <h2 className="text-heading4 text-black  font-sans font-bold  text-center md:text-start">
              Clean water and sanitation
            </h2>
            <p className="text-center md:text-left">
              We are actively working on the Swachh Yamuna and Swasth Vrindavan
              initiatives to ensure a clean river and a healthy community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programms;
