import React from "react";
import ReactPlayer from "react-player";
import aboutImg from '../../assets/about-img.png'


const About = () => {
  return (
    <div className="flex flex-col items-center lg:mx-[20px] mt-5">
          <div className="w-[90%]">
    <h1 className="text-center text-heading3 lg:text-heading2 font-bold mb-1 p-5 text-peacock-green relative hover:text-peacock-green-hover transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
        Who are we?
      </h1>
    </div>
      <div className="mx-4 px-16">
        <p className="text-lg text-gray-700 text-start font-medium mt-4 ">
          <span className="text-2xl text-violet-700 font-bold hover:underline">
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
          <span className=" text-violet-700 font-bold text-xl ">
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
