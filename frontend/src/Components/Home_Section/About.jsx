import React from "react";
import ReactPlayer from "react-player";
import aboutImg from '../../assets/about-img.png'


const About = () => {
  return (
    <div className="flex flex-col items-center lg:mx-[20px] lg:mt-[-24rem]">
      <h1 className="text-heading1 font-serif font-bold text-orange lg:pb-[25px]">
        Who We Are
      </h1>
      <div className="mx-4 ">
        <p className="text-lg text-gray-700 text-center font-semibold mt-4 ">
          <span className="text-2xl text-orange font-bold hover:underline">
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
          <span className=" text-[rgb(216,78,32)] underline font-bold ">
            Focused And On Going Initiatives :
          </span> Gopala Bhog ( Affordable Food Prasadam For All ), Swasth aur Swachh
          Vrindavan, Give Me A Chance, Say Yes To Me, Brajkulam Community
          Centre.
        </p>
      </div>
      {/* <img src={aboutImg} alt="about" className="mt-[15px] w-[90%] lg:w-[95%]" /> */}
    </div>
  );
};

export default About;
