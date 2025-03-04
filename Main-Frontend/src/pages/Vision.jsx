import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import aboutus from '../assets/aboutUsImage.png';
import VisionImg from '../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv1.png';
import HealthCampImg from '../assets/Sobf Images/health_and_awareness_camp/hac6.jpg';
import childrenImg from '../assets/Sobf Images/children_activities/ca18.jpg';
// import MisionImg from '../assets/Mission.png';
import MisionImg from '../assets/Sobf Images/food distribution/sadhuSeva3.jpg';
import educationImg from '../assets/Mission.png';
import sadhuSevaImg from '../assets/Sobf Images/Sadhu Seva/ss7.jpg';
import ObjectiveImg from '../assets/objective.png';
import womenSkillDevImg from '../assets/Sobf Images/women empowerment/we3.png';
import childEduImg from '../assets/Sobf Images/child_education_and_empowerment/cee12.png';
import HealthCampImg2 from '../assets/Sobf Images/health_and_awareness_camp/hac4.png';

const Vision = () => {
  const location = useLocation();
  // Scroll to top when path changes
  useEffect(() => {
    if (location.pathname === '/vision') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Enables smooth scrolling
      });
    }
  }, [location.pathname]);
  return (
    <div className="pt-[100px]">
      <div
        className="w-full h-[200px] md:h-[300px] lg:h-[450px]"
        style={{
          backgroundImage: `url(${aboutus})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* 1st Card */}
      <div className="lg:mt-10 flex gap-4 lg:flex-row flex-col flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0">
        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none ">
          {' '}
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4  ">
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 ">
              {' '}
              {/* Polaroid container */}
              <img
                src={VisionImg}
                alt="Vision 1"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />{' '}
            </div>
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 ">
              <img
                src={childrenImg}
                alt="Vision 3"
                className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-[350px] lg:w-[200px] md:mt-4 mx-auto mt-4 bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 ">
            <img
              src={HealthCampImg}
              alt="Vision 2"
              className=" h-auto rounded-lg shadow-lg"
            />
          </div>
         
        </div>
        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold  mb-2 text-logoYellow flex lg:justify-normal justify-center items-center lg:items-start">
            Our Vision
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className="md:text-lg text-gray-700 mt-4 ">
            Our vision for the next upcoming years is to make Shri Vrindavan
            Dham a cleaner, healthier, and more beautiful place. By doing so, we
            hope to provide a better living experience for the residents of Braj
            and an unforgettable spiritual journey for all who visit this sacred
            land of Shri Radha Krishna. Our commitment to serving the people of
            Braj since 2020 will continue to drive our efforts in achieving this
            vision.
          </p>
        </div>
      </div>

      {/* 2nd Card */}
      <div className="flex gap-4 lg:flex-row flex-col flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0 lg:mt-10">
        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="text-heading3 lg:text-heading2 font-bold  mb-2  text-logo-blue flex lg:justify-normal  justify-center items-center lg:items-start">
            Our Mission
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className="md:text-lg  text-gray-700 mt-4 text-left">
            Our mission over the next 2-3 years is to significantly contribute
            to the cleanliness and spiritual vibrancy of Shri Vrindavan Dham. We
            will achieve this by maintaining a clean environment, offering pure
            and nutritious Sattvik food prasadam and langar at affordable
            prices, and ensuring that these services are accessible to all.
            Through these initiatives, we aim to create a harmonious, healthy,
            and spiritually enriching experience for everyone in Shri Vrindavan
            Dham.
            {/* Our mission is to significantly contribute to the cleanliness, nourishment, and spiritual well-being of Vrindavan. We strive to maintain clean public spaces, provide pure and affordable Sattvik food through prasadam and langar, and ensure accessibility to basic healthcare and hygiene services. Additionally, we are committed to empowering the underprivileged through education and skill development, creating a harmonious and self-sustaining community that thrives in devotion and service. */}
          </p>
        </div>

        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none flex flex-col items-center gap-4">
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 ">
            <img
              src={MisionImg}
              alt="Mission 1"
              className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4 ">
            <div className="bg-white flex-1 shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2  z-10">
              <img
                src={educationImg}
                alt="Mission 3"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-white flex-1 shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2  ">
              <img
                src={sadhuSevaImg}
                alt="Mission 2"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3rd Card */}
      <div className="mb-20 flex gap-4 lg:flex-row flex-col flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0 lg:mt-10">
        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none ">
          {' '}
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4  ">
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 ">
              {' '}
              {/* Polaroid container */}
              <img
                src={womenSkillDevImg}
                alt="Objective 1"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />{' '}
            </div>
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 ">
              <img
                src={HealthCampImg2}
                alt="Objective 3"
                className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-full mt-4 md:w-[350px] lg:w-[200px] md:mt-4  mx-auto bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 ">
            <img
              src={childEduImg}
              alt="Objective 2"
              className=" h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold  mb-2 text-logoYellow flex lg:justify-normal  justify-center items-center lg:items-start">
            Our Objective
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className="md:text-lg  text-gray-700 mt-4 lg:p-0 text-left">
            {/* Our objective is to create a harmonious and holistic environment in
            Vrindavan by offering affordable and nutritious Sattvik food,
            maintaining a clean and healthy living space, and providing
            comprehensive community support services. By doing so, we aim to
            enhance the quality of life for residents and visitors, promoting
            well-being, sustainability, and spiritual growth. */}
            To achieve our vision and mission, we focus on expanding cleanliness
            initiatives, improving food accessibility, and establishing
            education and skill training centers for the needy. We aim to
            promote better healthcare, raise hygiene awareness, and preserve
            Braj’s cultural and spiritual heritage. Through community
            participation and sustainable growth initiatives, we seek to make
            Shri Vrindavan Dham a model of purity, service, and devotion,
            ensuring a better future for all who call it home or seek its divine
            presence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
