import React from 'react';
import VisionImg from '@/assets/Sobf Images/Swachh yamuna swasth vrindawan/sysv1.avif';
import HealthCampImg from '@/assets/Sobf Images/health_and_awareness_camp/hac6.avif';
import childrenImg from '@/assets/Sobf Images/children_activities/ca18.avif';
import MisionImg from '@/assets/Sobf Images/food distribution/sadhuSeva3.avif';
import educationImg from '@/assets/mission.avif';
import sadhuSevaImg from '@/assets/Sobf Images/Sadhu Seva/ss7.avif';
import womenSkillDevImg from '@/assets/Sobf Images/women empowerment/we3.avif';
import childEduImg from '@/assets/Sobf Images/child_education_and_empowerment/cee12.avif';
import HealthCampImg2 from '@/assets/Sobf Images/health_and_awareness_camp/hac4.avif';
import { DottedSeparator } from '@/utils/Seperator.jsx';

const AboutUsSections = () => {
  return (
    <>
      <DottedSeparator />

      {/* Vision Section */}
      <div className="lg:mt-10 flex gap-4 lg:flex-row flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0">
        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none">
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4">
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={VisionImg}
                alt="Vision 1"
                loading="lazy"
                decoding="async"
                width={450}
                height={211}
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg object-cover"
              />
            </div>

            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={childrenImg}
                alt="Vision 2"
                loading="lazy"
                decoding="async"
                width={450}
                height={338}
                className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="w-full md:w-[350px] lg:w-[200px] md:mt-4 mx-auto mt-4 bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
            <img
              src={HealthCampImg}
              alt="Vision 3"
              loading="lazy"
              decoding="async"
              width={450}
              height={338}
              className="h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-2 text-logoYellow">
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
      <div className="flex gap-4 lg:flex-row flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0 lg:mt-10">
        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="text-heading3 lg:text-heading2 font-bold mb-2 text-logo-blue">
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
              loading="lazy"
              decoding="async"
              width={450}
              height={255}
              className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4">
            <div className="bg-white flex-1 shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={educationImg}
                alt="Mission 2"
                loading="lazy"
                decoding="async"
                width={450}
                height={335}
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-white flex-1 shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={sadhuSevaImg}
                alt="Mission 3"
                loading="lazy"
                decoding="async"
                width={450}
                height={240}
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <DottedSeparator />

      {/* Objective Section */}
      <div className="flex gap-4 lg:flex-row flex-col-reverse justify-center items-center lg:px-24 py-6 px-4 lg:p-0 lg:mt-10">
        <div className="relative w-[99%] lg:w-[50%] p-0 lg:p-6 order-1 lg:order-none">
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-4">
            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={womenSkillDevImg}
                alt="Objective 1"
                loading="lazy"
                decoding="async"
                width={450}
                height={334}
                className="w-full md:w-[350px] lg:w-[200px] h-full rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
              <img
                src={HealthCampImg2}
                alt="Objective 2"
                loading="lazy"
                decoding="async"
                width={450}
                height={334}
                className="w-full md:w-[350px] lg:w-[200px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="w-full mt-4 md:w-[350px] lg:w-[200px] md:mt-4 mx-auto bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.3)] rounded-lg p-2">
            <img
              src={childEduImg}
              alt="Objective 3"
              loading="lazy"
              decoding="async"
              width={450}
              height={337}
              className="h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="w-[99%] lg:w-[50%] order-2 lg:order-none">
          <h1 className="inline-block text-heading3 lg:text-heading2 font-bold mb-2 text-logoYellow">
            Our Objective
          </h1>

          <hr className="mt-1 border-light-lavender border-[1px]" />

          <p className="md:text-lg text-gray-700 mt-4 text-left">
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
    </>
  );
};

export default AboutUsSections;
