import React, { useEffect, useState } from 'react';
import Hero from '../Components/Home_Section/Hero.jsx';
import HeroVideo from '../Components/Home_Section/HeroVideo.jsx';
import Impacts from '../Components/Home_Section/Impacts.jsx';
import Contactus from '../Components/Home_Section/Support.jsx';
import Faq from '../Components/Home_Section/Faq.jsx';
import About from '../Components/Home_Section/About.jsx';
import Services from '../Components/Home_Section/Services.jsx';
import Team from '../Components/Home_Section/Team.jsx';
import Testimonials from '../Components/Home_Section/Testimonials.jsx';
import Video from '../Components/Home_Section/Video.jsx';
import Programms from '../Components/Home_Section/Initiatives.jsx';
import Home_Gallery from '../Components/Home_Section/Home_gallery.jsx';
import Partners from '../Components/Home_Section/Partners.jsx';
import Press_Release from '../Components/Home_Section/Press_Release.jsx';
import Recent_Activities from '../Components/Home_Section/Recent_Activities.jsx';
import SidePopup from '../Components/sidePopup.jsx';
import UpcomingEvents from '../Components/Home_Section/UpcomingEvents.jsx';
import { useLocation } from 'react-router-dom';

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
      
        <div className=" w-full ">
          <HeroVideo />
        </div>
     
        <div
          className={` w-full    
            `}
        >
          <Hero />
        </div>
      
        <SidePopup />
        <Impacts />
        <Programms />
        <About />
        <Video />
        <UpcomingEvents />
        <Services />
        <Press_Release />
        <Recent_Activities />
        <Team />
        <Partners />
        <Testimonials />
        <Home_Gallery />
        <Contactus />
        <Faq />
      </div>
   
  );
};

export default HomePage;
