import React from "react";
import ReactPlayer from "react-player";
import aboutImg from '../../assets/about-img.png'


const About = () => {
  return (
    <div className="flex flex-col items-center md:mt-[30px] lg:mx-[20px]">
      <h1 className="font-amatic font-bold text-orange tracking-wide text-xl md:text-3xl pt-[20px] lg:pb-[25px]">
        WHO WE ARE
      </h1>
      <div className="flex flex-col items-center gap-y-[20px] md:flex-row md:gap-x-[20px] mx-4 ">
        <p className=" text-[#696f8c] text-[14px] lg:text-[16px] mt-4 font-workSans md:w-[45%] lg:w-[50%] ">
          <span className="text-xl text-orange font-bold hover:underline">
            Soul Of Braj Federation
          </span> is a Section-8 Recognized Non Profit Organization, dedicated to Serve
          Society members in Shri Vrindavan Dham, Since 2020, SOBF is Dedicated
          to Serve the Poorest of the Poor Residents of Vrindavan and the Braj
          region of Uttar Pradesh, ( Bharat ). Particularly Adolescent Girls and
          Women by Providing Comprehensive, Essential Community Services. Our
          Initiatives are, Clean and Healthy Vrindavan, Affordable Food ,
          Providing Basic Education, Skill Training, Health-Hygiene Care,
          Distribution of free Meals / Ration Kits ,Waste Management Projects,
          Currently we are Impacting more than 1000+ Beneficiaries on Daily
          Basis.
          <br />
          <span className=" text-[rgb(119,119,119)] font-bold ">
            Focused And On Going Initiatives :
          </span> Gopala Bhog ( Affordable Food Prasadam For All ), Swasth aur Swachh
          Vrindavan, Give Me A Chance, Say Yes To Me, Brajkulam Community
          Centre.
        </p>
        <div className="w-[90%] h-[200px] md:w-[50%]  md:h-[400px] lg:h-[300px]">
          <ReactPlayer width={'100%'} height={'100%'} controls url={'https://youtu.be/FINV2QMsPF4?si=ERWrN4z3R13Fqvpu'} />
        </div>

      </div>
      <img src={aboutImg} alt="about" className="mt-[15px] w-[90%] lg:w-[95%]" />
    </div>
  );
};

export default About;
