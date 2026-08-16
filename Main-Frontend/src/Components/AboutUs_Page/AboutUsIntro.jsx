import React, { useState } from 'react';
import aboutus from '@/assets/aboutUsImage.webp';
import ourStory from '@/assets/ourStoryImg.avif';

const AboutUsIntro = () => {
  const [activeTab, setActiveTab] = useState('mission');

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

  return (
    <>
      {/* Hero Banner */}
      <img
        src={aboutus}
        alt="About Us"
        loading="eager"
        fetchpriority="high"
        width={800}
        height={350}
        className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] object-cover"
      />

      {/* What We Do */}
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
                  ? 'text-white bg-peacock-green-hover'
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

      {/* Our Story */}
      <div className="flex pt-4 pb-8 px-4 lg:px-12 gap-3 lg:gap-24 justify-around flex-col items-center w-full lg:flex-row">
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
            <span className="inline-block mt-6 lg:mt-2 font-bold text-xl w-full">
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
            width={450}
            height={450}
            className="w-full rounded-xl shadow-xl"
          />
        </div>
      </div>
    </>
  );
};

export default AboutUsIntro;
