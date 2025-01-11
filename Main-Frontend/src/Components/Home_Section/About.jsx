import React from "react";
import ReactPlayer from "react-player";
import aboutBackgroundImg from "../../assets/Sobf Images/food distribution/fd7.avif";
import aboutImg from "../../assets/Sobf Images/children_activities/aboutUs.jpg";
const About = () => {
  return (
    <div
      className="home-about relative flex flex-col items-center "
      style={{
        backgroundImage: `url(${aboutBackgroundImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-center mt-5 mb-5 text-logoYellow text-heading3 lg:text-heading2 font-bold  px-5 pt-5 text-logo-yellow relative z-10 ">
        Who Are We?
        <hr className="mt-1 border-light-lavender border-[0.5px]" />
      </h1>
      <div className=" md:mb-10 text-justify flex flex-col items-center  lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-x-[50px] z-40  mt-5 lg:px-[40px] xl:justify-around pb-[30px]">
        <p className=" leading-[27px]  text-heading5  text-[rgba(225,225,225,0.85)]   md:mt-4 mx-4 lg:m-0 md:mx-[40px] lg:w-[50%] ">
        <span className="text-xl  font-bold hover:underline ">
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
          <br />
          <div className="lg:mt-0 font-bold text-xl">
            Focused And Ongoing Initiatives :
          </div>{" "}
          Anna Vitran Seva (affordable food prasadam for all), Swasth aur Swachh
          Vrindavan, Give Me A Chance, Say Yes To Me, Brajkulam Community
          Center.
        </p>

        <img
          src={aboutImg}
          alt="about"
          className="z-40 my-[30px] lg:my-0 w-[90%] lg:w-[35%]    "
        />
      </div>
    </div>
  );
};

export default About;
