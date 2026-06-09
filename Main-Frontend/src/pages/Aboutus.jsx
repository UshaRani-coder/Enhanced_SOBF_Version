import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import aboutus from '../assets/aboutUsImage.png';
import VisionImg from '../assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv1.png';
import HealthCampImg from '../assets/Sobf Images/health_and_awareness_camp/hac6.jpg';
import childrenImg from '../assets/Sobf Images/children_activities/ca18.jpg';
import MisionImg from '../assets/Sobf Images/food distribution/sadhuSeva3.jpg';
import educationImg from '../assets/Mission.png';
import sadhuSevaImg from '../assets/Sobf Images/Sadhu Seva/ss7.jpg';
import womenSkillDevImg from '../assets/Sobf Images/women empowerment/we3.png';
import childEduImg from '../assets/Sobf Images/child_education_and_empowerment/cee12.png';
import HealthCampImg2 from '../assets/Sobf Images/health_and_awareness_camp/hac4.png';
import ourStory from '../assets/ourStoryImg.png';
import cee14 from '../assets/Sobf Images/child_education_and_empowerment/cee14.png';
import cee11 from '../assets/Sobf Images/child_education_and_empowerment/cee11.png';
import ca5 from '../assets/Sobf Images/children_activities/ca5.png';
import ca15 from '../assets/Sobf Images/children_activities/ca3.png';
import hac4 from '../assets/Sobf Images/health_and_awareness_camp/hac4.png';
import ca6 from '../assets/Sobf Images/children_activities/ca6.png';
import { DottedSeparator } from '../utils/Seperator';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const location = useLocation();

  // Scroll to top when path changes
  useEffect(() => {
    if (location.pathname === '/about-us') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
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
          <p className="text-gray-600 text-center small-max:text-left">
            Our vision is to uplift Vrindavan and Braj&apos;s poorest by
            ensuring nutritious food, education, skill training, clean
            surroundings, and healthcare, fostering a self-sustaining,
            empowered, and compassionate community.
          </p>
        );
      case 'objective':
        return (
          <p className="text-gray-600 text-center small-max:text-left">
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
    <div className="pt-[90px] md:pt-[100px] lg:pt-[120px]">
      {/* Hero Banner */}

      <img
        src={aboutus}
        alt="Mission"
        loading="eager"
        decoding="async"
        className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] object-cover"
      />

      {/* Mission/Vision/Objective Toggler */}
      <div className="w-full flex justify-center items-center flex-col lg:flex-row gap-1 lg:gap-5 mx-auto py-8 px-4">
        <div className="w-[98%] lg:w-[50%]">
          <h2 className="text-logoYellow poppins-semibold text-heading4">
            What We Do
          </h2>
          <h1 className="poppins-bold text-3xl lg:text-heading1 leading-snug text-gray-900 mt-2">
            Discover our mission-driven approach
          </h1>
        </div>

        <div className="w-[99%] lg:w-[50%] mt-4">
          <div className="flex">
            <button
              aria-label="Our Mission"
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
              aria-label="Our Vision"
              className={`poppins-medium w-[33.3%] px-4 py-3 text-sm lg:text-lg ${
                activeTab === 'vision'
                  ? 'text-white hover:bg bg-peacock-green-hover'
                  : 'bg-light-lavender text-gray-700'
              }`}
              onClick={() => setActiveTab('vision')}
            >
              Our Vision
            </button>
            <button
              aria-label="Our Objective"
              className={`poppins-medium w-[33.3%] px-4 py-3 rounded-tr-lg text-sm lg:text-lg ${
                activeTab === 'objective'
                  ? 'text-white bg-peacock-green-hover'
                  : 'bg-light-lavender text-gray-700'
              }`}
              onClick={() => setActiveTab('objective')}
            >
              Our Objective
            </button>
          </div>
          <div className="p-4 py-8 bg-gray-50 rounded-b-lg md:text-lg rounded-lg border">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="flex py-12 px-4 lg:px-12 gap-3 lg:gap-24 justify-around flex-col items-center w-full lg:flex-row">
        <div className="w-[99%] lg:w-[50%] p-0 lg:p-4 text-start">
          <h1 className="inline-block text-heading3 lg:text-heading1 font-bold mb-1 text-logoYellow">
            Our Story
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px] mb-6" />
          <p className="text-md md:text-lg leading-[25px] md:leading-[30px] text-gray-700 mt-4">
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
        <div className="w-[99%] lg:w-[50%]">
          <img
            src={ourStory}
            alt="Our Story"
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl shadow-xl"
          />
        </div>
      </div>
      <DottedSeparator />
      {/* Vision Section */}
      <div className="lg:mt-10 flex gap-4 lg:flex-row  flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0">
        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none">
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4">
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={VisionImg}
                alt="Vision 1"
                loading="lazy"
                decoding="async"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={childrenImg}
                alt="Vision 3"
                className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-[350px] lg:w-[200px] md:mt-4 mx-auto mt-4 bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
            <img
              src={HealthCampImg}
              alt="Vision 2"
              className="h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-2 text-logoYellow  lg:justify-normal justify-center items-center lg:items-start">
            Our Vision
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className="md:text-lg text-gray-700 mt-4">
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
      <DottedSeparator />
      {/* Mission Section */}
      <div className="flex gap-4 lg:flex-row  flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0 lg:mt-10">
        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="text-heading3  lg:text-heading2 font-bold mb-2 text-logo-blue flex lg:justify-normal justify-center items-center lg:items-start">
            Our Mission
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className="md:text-lg text-gray-700 mt-4 text-left">
            Our mission over the next 2-3 years is to significantly contribute
            to the cleanliness and spiritual vibrancy of Shri Vrindavan Dham. We
            will achieve this by maintaining a clean environment, offering pure
            and nutritious Sattvik food prasadam and langar at affordable
            prices, and ensuring that these services are accessible to all.
            Through these initiatives, we aim to create a harmonious, healthy,
            and spiritually enriching experience for everyone in Shri Vrindavan
            Dham.
          </p>
        </div>
        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none flex flex-col items-center gap-4">
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
            <img
              src={MisionImg}
              alt="Mission 1"
              className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4">
            <div className="bg-white flex-1 shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2 z-10">
              <img
                src={educationImg}
                alt="Mission 3"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-white flex-1 shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={sadhuSevaImg}
                alt="Mission 2"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <DottedSeparator />
      {/* Objective Section */}
      <div className=" flex gap-4 lg:flex-row  flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0 lg:mt-10">
        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none">
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4">
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={womenSkillDevImg}
                alt="Objective 1"
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={HealthCampImg2}
                alt="Objective 3"
                className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-full mt-4 md:w-[350px] lg:w-[200px] md:mt-4 mx-auto bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
            <img
              src={childEduImg}
              alt="Objective 2"
              className="h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-2 text-logoYellow  lg:justify-normal justify-center items-center lg:items-start">
            Our Objective
          </h1>
          <hr className="mt-1 border-light-lavender border-[1px]" />
          <p className="md:text-lg text-gray-700 mt-4 lg:p-0 text-left">
            To achieve our vision and mission, we focus on expanding cleanliness
            initiatives, improving food accessibility, and establishing
            education and skill training centers for the needy. We aim to
            promote better healthcare, raise hygiene awareness, and preserve
            Braj&apos;s cultural and spiritual heritage. Through community
            participation and sustainable growth initiatives, we seek to make
            Shri Vrindavan Dham a model of purity, service, and devotion,
            ensuring a better future for all who call it home or seek its divine
            presence.
          </p>
        </div>
      </div>
      <DottedSeparator />
      {/* Gallery Section */}
      <div className="container mx-auto p-0 lg:p-4 px-4 lg:px-20 text-center mb-20">
        <h1 className="text-heading3 lg:text-heading1 inline-block font-bold mb-4 py-5 text-logoYellow">
          Collected Shots
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <div key={index} className="w-full hover:opacity-90">
            
              <img
  src={image}
  alt={`Shot ${index + 1}`}
  loading="lazy"
  decoding="async"
  className="w-full h-[250px] md:h-[300px] object-cover rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
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
