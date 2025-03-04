import React,{useEffect} from "react";
import Hero from "../Components/Home_Section/Hero.jsx";
import HeroVideo from "../Components/Home_Section/HeroVideo.jsx";
import Impacts from "../Components/Home_Section/Impacts.jsx";
import Contactus from "../Components/Home_Section/Support.jsx";
import Faq from "../Components/Home_Section/Faq.jsx";
import About from "../Components/Home_Section/About.jsx";
import Services from "../Components/Home_Section/Services.jsx";
import Team from "../Components/Home_Section/Team.jsx";
import Testimonials from "../Components/Home_Section/Testimonials.jsx";
import Video from "../Components/Home_Section/Video.jsx";
import Programms from "../Components/Home_Section/Initiatives.jsx";
import Home_Gallery from "../Components/Home_Section/Home_gallery.jsx";
import Partners from "../Components/Home_Section/Partners.jsx";
import Press_Release from "../Components/Home_Section/Press_Release.jsx";
import Recent_Activities from "../Components/Home_Section/Recent_Activities.jsx";
import SidePopup from "../Components/sidePopup.jsx";
import UpcomingEvents from "../Components/Home_Section/UpcomingEvents.jsx";
import { useLocation } from "react-router-dom";


const HomePage = () => {
  const location = useLocation();
  useEffect(() => {
      if (location.pathname === '/') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, [location.pathname]);
  return (
    <div className="flex flex-col items-center overflow-auto">
      {/* Parent Container for Hero and HeroVideo */}
      <div className="relative w-full h-screen">
        {/* Fixed Background Video */}
        <div className="fixed top-0  w-full h-full z-[0]">
          <Hero />
        </div>

        {/* Hero Section Above Video */}
        <div className="relative z-[10] w-full overflow-hidden">
          <HeroVideo />
        </div>
      </div>

      {/* Remaining Content Below (Normal Flow) */}
      <div className=" relative z-[10] w-full bg-white mt-[400px] md:mt-[600px] lg:mt-[900px] xl:mt-[1000px]">
        <SidePopup />
        <Impacts />
        <Programms />
        <About />
        <Video />
        <Services />
        <Press_Release />
        <Recent_Activities />
        <Team />
        <Partners />
        <Testimonials />
        <Home_Gallery />
        <UpcomingEvents />
        <Contactus />
        <Faq />
      </div>
    </div>
  );
};


export default HomePage;





