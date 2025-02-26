import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import aboutus from '../assets/aboutUsImage.png';
import cee14 from '../assets/Sobf Images/child_education_and_empowerment/cee14.png';
import cee11 from '../assets/Sobf Images/child_education_and_empowerment/cee11.png';
import ca5 from '../assets/Sobf Images/children_activities/ca5.png';
import ca15 from '../assets/Sobf Images/children_activities/ca3.png';
import hac4 from '../assets/Sobf Images/health_and_awareness_camp/hac4.png';
import ca6 from '../assets/Sobf Images/children_activities/ca6.png';
import ourStory from '../assets/ourStoryImg.png';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const location = useLocation();
  // Scroll to top when path changes
  useEffect(() => {
    if (location.pathname === '/about-us') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Enables smooth scrolling
      });
    }
  }, [location.pathname]);
  const renderContent = () => {
    switch (activeTab) {
      case 'mission':
        return (
          <p className="text-gray-600 text-center small-max:text-left">
            To serve the underprivileged in Vrindavan and Braj by providing
            food, education, healthcare, and skill training, ensuring dignity,
            empowerment, and sustainable development for a better and
            self-reliant future.
          </p>
        );
      case 'vision':
        return (
          <p className="text-gray-600  text-center small-max:text-left">
            Our vision is to uplift Vrindavan and Braj’s poorest by ensuring
            nutritious food, education, skill training, clean surroundings, and
            healthcare, fostering a self-sustaining, empowered, and
            compassionate community.
          </p>
        );
      case 'objective':
        return (
          <p className="text-gray-600  text-center small-max:text-left">
            To create lasting social impact by addressing poverty, hunger,
            education, and healthcare needs, fostering skill development,
            promoting environmental sustainability, and empowering communities
            for a healthier, educated, and self-sufficient Braj region.
          </p>
        );
      default:
        return null;
    }
  };

  const images = [cee14, ca5, hac4, cee11, ca15, ca6];

  return (
    <div className="pt-[100px]">
      {/* image */}
      {/* <img src={aboutus} alt="" className='w-full h-[190px] lg:h-[420px] mt-[10px]' /> */}
      <div
        className="w-full h-[200px] md:h-[300px] lg:h-[450px]"
        style={{
          backgroundImage: `url(${aboutus})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      {/* toggler  */}
      <div className="w-full flex justify-center items-center flex-col lg:flex-row gap-1 lg:gap-5 mx-auto py-8 px-4">
        <div className="w-[98%] lg:w-[50%] ">
          <h2 className="text-logoYellow poppins-semibold text-heading4">
            What We Do
          </h2>
          <h1 className="poppins-bold text-3xl lg:text-heading1 leading-snug text-gray-900 mt-2 ">
            Discover our mission-driven approach
          </h1>
        </div>

        <div className="w-[99%] lg:w-[50%] mt-4">
          <div className="flex ">
            <button
              aria-label="Play Video"
              className={`poppins-medium w-[33.3%] px-4 py-3 rounded-tl-lg text-sm lg:text-lg ${
                activeTab === 'mission'
                  ? 'text-white bg-peacock-green-hover'
                  : 'bg-light-lavender text-gray-700'
              }`}
              onClick={() => setActiveTab('mission')}
            >
              Our Mission
            </button>
            <button
              aria-label="Play Video"
              className={`poppins-medium w-[33.3%] px-4 py-3 text-sm lg:text-lg  ${
                activeTab === 'vision'
                  ? 'text-white hover:bg bg-peacock-green-hover'
                  : 'bg-light-lavender text-gray-700'
              }`}
              onClick={() => setActiveTab('vision')}
            >
              Our Vision
            </button>
            <button
              aria-label="Play Video"
              className={`poppins-medium w-[33.3%] px-4 py-3 rounded-tr-lg text-sm lg:text-lg  ${
                activeTab === 'objective'
                  ? 'text-white bg-peacock-green-hover '
                  : 'bg-light-lavender text-gray-700'
              }`}
              onClick={() => setActiveTab('objective')}
            >
              Our Objective
            </button>
          </div>
          <div className="p-4 py-8 bg-gray-50 rounded-b-lg md:text-lg rounded-lg border ">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* about us data */}
      <div className="flex py-12 px-4 lg:px-12 gap-3 lg:gap-24 justify-around flex-col items-center w-full lg:flex-row ">
        <div className="w-[99%] lg:w-[50%] p-0 lg:p-4 text-start">
          <h1 className="inline-block text-heading3 lg:text-heading1 font-bold mb-1  text-logoYellow ">
            Our Story
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px] mb-6" />
          <p className="text-md md:text-lg leading-[25px] md:leading-[30px] text-gray-700 mt-4 ">
            <span className="text-xl text-blue font-bold hover:underline">
              Soul Of Braj Federation
            </span>{' '}
            is a Section-8 recognized non-profit organization dedicated to
            serving society members in Shri Vrindavan Dham. Since 2020, SOBF has
            been committed to serving the poorest of the poor residents of
            Vrindavan and the Braj region of Uttar Pradesh (Bharat),
            particularly adolescent girls and women, by providing comprehensive
            and essential community services. Our initiatives include Clean and
            Healthy Vrindavan, Affordable Food, Basic Education, Skill Training,
            Health and Hygiene Care, distribution of free meals/ration kits, and
            waste management projects. Currently, we are impacting more than
            1,000 beneficiaries on a daily basis.
            <br />
            <span className="inline-block mt-6 lg:mt-2 font-bold text-xl w-[100%]">
              Focused And On Going Initiatives:
            </span>
            <br />
            Anna Vitran Seva (affordable food prasadam for all), Swasth aur
            Swachh Vrindavan, Give Me A Chance, Say Yes To Me, Brajkulam
            Community Center.
          </p>
        </div>
        <div className="w-[99%] lg:w-[50%] ">
          <img src={ourStory} className="rounded-xl shadow-xl " alt="" />
        </div>
      </div>

      {/* collected shots */}
      <div className="container mx-auto p-0 lg:p-4 px-4 lg:px-20 text-center mb-20">
        <h1 className=" text-heading3 lg:text-heading1 inline-block font-bold mb-4 pb-5 text-logoYellow ">
          Collected Shots
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <div key={index} className="w-full hover:opacity-90">
              <img
                src={image}
                alt={`Shot ${index + 1}`}
                className="w-full h-auto transform transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
              />
            </div>
          ))}
        </div>
        {/* See More Button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/gallery"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue text-white font-bold py-4 px-8 rounded-xl hover:bg-logoYellow transition-colors duration-300"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
