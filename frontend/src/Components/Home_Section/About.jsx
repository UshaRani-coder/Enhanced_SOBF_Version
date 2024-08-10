import React from "react";
import ReactPlayer from "react-player";
import aboutImg from "../../assets/Sobf Images/food distribution/fd7.jpg";
import aboutBackgroundImg from "../../assets/Sobf Images/child_education_and_empowerment/cee12.jpg";
const About = () => {
  return (
    <div
      className="home-about relative flex flex-col items-center "
      style={{
        backgroundImage: `url(${aboutImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-center text-[25px] md:text-heading3 lg:text-heading2 font-bold  p-5 text-peacock-green relative z-10 hover:text-peacock-green-hover transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
        Who are we?
      </h1>
      <div className="flex flex-col items-center text-center lg:text-start lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-x-[50px] z-40  mt-5 lg:px-[40px] xl:justify-around pb-[100px]">
        <p className=" leading-[27px] text-heading5    text-[rgba(225,225,225,0.85)]   mt-4 mx-4 lg:m-0 lg:w-[50%] ">
          <span className="text-xl text-logo-yellow font-bold hover:underline">
            Soul Of Braj Federation
          </span>{" "}
          is a Section-8 recognized Non Profit Organization, dedicated to serve
          society members in Shri Vrindavan Dham, since 2020, SOBF is dedicated
          to serve the poorest of the poor residents of vrindavan and the braj
          region of Uttar Pradesh, ( Bharat ). Particularly adolescent girls and
          women by providing comprehensive, essential community services. Our
          initiatives are, Clean and Healthy Vrindavan, Affordable Food ,
          Providing Basic Education, Skill Training, Health-Hygiene Care,
          Distribution of free Meals / Ration Kits ,Waste Management Projects,
          Currently we are Impacting more than 1000+ Beneficiaries on Daily
          Basis.
          <br />
          <div className="text-logo-yellow mt-[20px] lg:mt-0 font-bold text-xl">
            Focused And Ongoing Initiatives :
          </div>{" "}
          Gopala Bhog (affordable food prasadam for all), Swasth aur Swachh
          Vrindavan, Give Me A Chance, Say Yes To Me, Brajkulam Community
          Centre.
        </p>

        <img
          src={aboutBackgroundImg}
          alt="about"
          className="z-40 my-[30px] lg:my-0 w-[90%] lg:w-[50%] xl:w-[37%]   "
        />
      </div>
    </div>
  );
};

export default About;
