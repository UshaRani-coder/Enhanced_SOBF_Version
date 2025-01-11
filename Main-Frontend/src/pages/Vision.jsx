import React from 'react'
import aboutus from "../assets/aboutUsImage.avif"
import VisionImg from "../assets/Vision.avif"
import MisionImg from "../assets/Mission.avif"
import ObjectiveImg from "../assets/objective.avif"

const Vision = () => {
  return (
    <div className='pt-[100px]'>
      {/* Header Image */}
      <div
        className="w-full h-[200px] md:h-[300px] lg:h-[450px]"
        style={{
          backgroundImage: `url(${aboutus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* 1st Card */}
      <div className='flex gap-4 lg:flex-row flex-col justify-center items-center lg:px-24 py-6 px-4 lg:p-0'>
        <div className='w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none'>
          <img src={VisionImg} alt="Vision" className='object-cover w-full h-auto rounded-lg border border-gray-100' />
        </div>
        <div className='w-[99%] lg:w-[50%] order-2 lg:order-none'>
          <h1 className='inline-block text-heading3 lg:text-heading2 font-bold mt-10 mb-2 pb-5 text-logoYellow flex lg:justify-normal  justify-center items-center lg:items-start'>
            Our Vision
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className='text-lg text-justify text-gray-700 mt-4'>
            Our vision for the next upcoming years is to make Shri Vrindavan Dham a cleaner, healthier, and more beautiful place. By doing so, we hope to provide a better living experience for the residents of Braj and an unforgettable spiritual journey for all who visit this sacred land of Shri Radha Krishna. Our commitment to serving the people of Braj since 2020 will continue to drive our efforts in achieving this vision.
          </p>
        </div>
      </div>

      {/* 2nd Card */}
      <div className='flex gap-4 lg:flex-row flex-col justify-center items-center lg:px-24 py-6 px-4 lg:p-0'>
        <div className='w-[99%] lg:w-[50%] order-2 lg:order-none'>
          <h1 className='text-heading3 lg:text-heading2 font-bold mt-10 mb-2 pb-5 text-logo-blue flex lg:justify-normal  justify-center items-center lg:items-start'>
            Our Mission
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className='text-lg text-justify text-gray-700 mt-4'>
            Our mission over the next 2-3 years is to significantly contribute to the cleanliness and spiritual vibrancy of Shri Vrindavan Dham. We will achieve this by maintaining a clean environment, offering pure and nutritious Sattvik food prasadam and langar at affordable prices, and ensuring that these services are accessible to all. Through these initiatives, we aim to create a harmonious, healthy, and spiritually enriching experience for everyone in Shri Vrindavan Dham.
          </p>
        </div>
        <div className='w-[90%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none'>
          <img src={MisionImg} alt="Mission" className='object-cover w-full h-auto rounded-lg border border-gray-200' />
        </div>
      </div>

      {/* 3rd Card */}
      <div className='flex gap-4 lg:flex-row flex-col justify-center items-center lg:px-24 py-6 px-4 lg:p-0'>
        <div className='w-[90%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none'>
          <img src={ObjectiveImg} alt="Objective" className='object-cover w-full h-auto rounded-lg border border-gray-200' />
        </div>
        <div className='w-[99%] lg:w-[50%] order-2 lg:order-none'>
          <h1 className='inline-block text-heading3 lg:text-heading2 font-bold mt-10 mb-2 pb-5 text-logoYellow flex lg:justify-normal  justify-center items-center lg:items-start'>
            Our Objective
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className='text-lg text-justify text-gray-700 mt-4 px-4 lg:p-0'>
            Our objective is to create a harmonious and holistic environment in Vrindavan by offering affordable and nutritious Sattvik food, maintaining a clean and healthy living space, and providing comprehensive community support services. By doing so, we aim to enhance the quality of life for residents and visitors, promoting well-being, sustainability, and spiritual growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Vision



