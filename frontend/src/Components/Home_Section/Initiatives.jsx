import React from "react";
import noPoverty from "../../assets/no-poverty1.png";
import education from "../../assets/education.png";
import food1 from "../../assets/food1.png";
import gender from "../../assets/gender-equality1.png";
import goodhealth from "../../assets/good-health1.png";
import cleanwater from "../../assets/clean-water1.png";

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
          {/* <div className='gap-4 flex p-4'>
            <img className='bg-[#e4243c] border-2rounded-xl w-11 h-11 p-1 rounded-lg' src={noPoverty} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold'>No Poverty</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div> */}
          <div className="gap-4 flex p-4 flex-col items-center md:flex-row ">
            <img
              className="bg-[#dda63a] border-2rounded-xl w-11 h-11 rounded-lg p-1"
              src={food1}
              alt=""
            />
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-heading4 text-black  font-sans font-bold ">
                Zero Hunger
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, magnam.
              </p>
            </div>
          </div>
          <div className="gap-4 flex p-4 flex-col items-center md:flex-row">
            <img
              className="bg-[#4c9f38] border-2rounded-xl w-11 h-11 rounded-lg p-1"
              src={goodhealth}
              alt=""
            />
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-heading4 text-black  font-sans font-bold text-center">
                Good health and Well being
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, magnam.
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, magnam.
              </p>
            </div>
          </div>
          {/* <div className='gap-4 flex p-4'>
            <img className='bg-[#ff3a21] border-2rounded-xl w-11 h-11 rounded-lg p-1' src={gender} alt="" />
            <div>
              <h2 className='text-heading4 text-black  font-sans font-bold'>Gender Equality</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, magnam.</p>
            </div>
          </div> */}
          <div className="gap-4 flex p-4 flex-col items-center md:flex-row ">
            <img
              className="bg-[#26bde2] border-2rounded-xl w-11 h-11 rounded-lg p-1"
              src={cleanwater}
              alt=""
            />
            <div className="flex flex-col items-center md:items-start ">
              <h2 className="text-heading4 text-black  font-sans font-bold  text-center md:text-start">
                Clean water and sanitation
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, magnam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programms;
