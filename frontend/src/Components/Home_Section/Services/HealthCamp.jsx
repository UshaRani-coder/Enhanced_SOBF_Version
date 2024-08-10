/* eslint-disable react/prop-types */
import React from 'react'
import Image from '../../../assets/Sobf Images/health_and_awareness_camp/hac4.jpg'



const HealthCamp = ({setService}) => {
  return (
    <div className="w-full md:w-[90%] flex flex-col items-center lg:items-start mx-auto">
      <button
        className="back-button my-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-indigo-500 hover:text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
        onClick={() => setService(null)}
      >
        Back to Services
      </button>

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <img
          src={Image}
          alt="community-service"
          className="w-[90%] lg:w-[50%] xl:w-[45%] "
        />

        <div className="flex flex-col items-center md:items-start mx-[20px] w-[90%] lg:w-[50%] justify-center">
        <h1 className="text-center text-heading4 lg:text-[27px] font-bold my-4 text-peacock-green relative hover:text-peacock-green-hover transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
           Health and Awareness Camp
          </h1>
          <p className="text-gray-700 text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 xl:pb-[50px]   lg:leading-[30px]">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt culpa voluptatibus in beatae fugiat dicta dolorum omnis magnam nulla! Voluptatum, suscipit magnam? Cum officiis atque facere temporibus sit incidunt quia ab dolorum, rerum reprehenderit velit qui accusamus, dolorem ratione? Similique blanditiis voluptas libero dicta laborum quos tempore laboriosam animi nihil.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HealthCamp
