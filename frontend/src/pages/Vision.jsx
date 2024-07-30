import React from 'react'
import aboutus from "../assets/about-us.png"
import VisionImg from "../assets/Vision.jpeg"
import MisionImg from "../assets/Mission.jpeg"
import ObjectiveImg from "../assets/objective.jpeg"

const Vision = () => {
  return (
    <div className='pt-[110px]'>
      {/* image */}
      <img src={aboutus} alt="" className='w-full h-[190px] lg:h-[420px]' />
      {/* 1st card */}
      <div className='flex gap-4 lg:flex-row flex-col justify-between px-2 lg:px-24 py-12'>
        <div className='w-[99%] lg:w-[50%] p-0 lg:p-6'>
          <img src={VisionImg} alt="Vision" className='w-full h-auto rounded-lg border border-gray-100' />
        </div>
        <div className='w-[99%] lg:w-[50%] '>
          <h1 className='text-start text-heading3 lg:text-heading2 font-bold mb-4 pb-5 text-orange hover:text-blue relative hover:text-blue-900 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>Our Vision</h1>
          <p className='text-lg text-gray-700 mt-4'>Our vision for the next upcoming years is to make Shri Vrindavan Dham a cleaner, healthier, and more beautiful place. By doing so, we hope to provide a better living experience for the residents of Braj and an unforgettable spiritual journey for all who visit this sacred land of Shri Radha Krishna. Our commitment to serving the people of Braj since 2020 will continue to drive our efforts in achieving this vision.</p>
        </div>
      </div>
      {/* 2nd card */}
      <div className='flex gap-4 lg:flex-row flex-col justify-between px-2 lg:px-24 py-6'>
        <div className='w-[99%] lg:w-[50%]'>
          <h1 className='text-start text-heading3 lg:text-heading2 font-bold mb-4 pb-5 text-orange hover:text-blue relative hover:text-blue-900 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>Our Mission</h1>
          <p className='text-lg text-gray-700 mt-4'> Our mission over the next 2-3 years is to significantly contribute to the cleanliness and spiritual vibrancy of Shri Vrindavan Dham. We will achieve this by maintaining a clean environment, offering pure and nutritious Sattvik food prasadam and langar at affordable prices, and ensuring that these services are accessible to all. Through these initiatives, we aim to create a harmonious, healthy, and spiritually enriching experience for everyone in Shri Vrindavan Dham..</p>
        </div>
        <div className='w-[90%] lg:w-[50%] p-0 lg:p-6'>
          <img src={MisionImg} alt="Vision" className='w-full h-auto rounded-lg border border-gray-200' />
        </div>
      </div>

      {/* 3rd card */}
      <div className='flex gap-4 lg:flex-row flex-col justify-between px-2 lg:px-24 py-6'>
        <div className='w-[90%] lg:w-[50%] p-0 lg:p-6' >
          <img src={ObjectiveImg} alt="Vision" className='w-full h-auto rounded-lg border border-gray-200' />
        </div>
        <div className='w-[99%] lg:w-[50%]'>
          <h1 className='text-start text-heading3 lg:text-heading2 font-bold mb-4 pb-5 text-orange hover:text-blue relative hover:text-blue-900 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'>Our Objective</h1>
          <p className='text-lg text-gray-700 mt-4'>Our objective is to create a harmonious and holistic environment in Vrindavan by offering affordable and nutritious Sattvik food, maintaining a clean and healthy living space, and providing comprehensive community support services. By doing so, we aim to enhance the quality of life for residents and visitors, promoting well-being, sustainability, and spiritual growth.</p>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Vision