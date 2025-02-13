import React from 'react';
import ReactPlayer from 'react-player';
import aboutBackgroundImg from '../../assets/Sobf Images/food distribution/fd7.png';
import aboutImg from '../../assets/Sobf Images/children_activities/aboutUs.jpg';
const About = () => {
  return (
    <div
      className="home-about relative flex flex-col items-center "
      style={{
        backgroundImage: `url(${aboutBackgroundImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-center mt-5 mb-5 text-logoYellow text-heading3 lg:text-heading2 font-bold  px-5 pt-5 text-logo-yellow relative z-10 ">
        Who Are We?
        <hr className="mt-1 border-light-lavender border-[0.5px]" />
      </h1>
      <div className=" md:mb-10  text-start flex flex-col items-center  lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-x-[50px] z-40  mt-5 lg:px-[40px] xl:justify-around pb-[30px]">
        <p className="ml-4 leading-[25px] md:leading-[30px]  md:text-lg  text-[rgba(225,225,225,0.85)]   md:mt-4 mx-2 lg:m-0 md:mx-[40px] lg:w-[50%] ">
          <span className="text-xl  font-bold hover:underline ">
            Soul Of Braj Federation
          </span>{' '}
          is a Section-8 recognized non-profit organization dedicated to serving society members in Shri Vrindavan Dham. Since 2020, SOBF has been committed to serving the poorest of the poor residents of Vrindavan and the Braj region of Uttar Pradesh (Bharat), particularly adolescent girls and women, by providing comprehensive and essential community services. Our initiatives include Clean and Healthy Vrindavan, Affordable Food, Basic Education, Skill Training, Health and Hygiene Care, distribution of free meals/ration kits, and waste management projects. Currently, we are impacting more than 1,000 beneficiaries on a daily basis.
          <br />
          <br />
          <span className="mt-4 lg:mt-0 font-bold text-xl w-[100%]">
            Focused And Ongoing Initiatives :
          </span >
          <br />
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
