import React from "react";
import { lazy } from "react";
import Hero from "../Components/Home_Section/Hero.jsx";
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

const HomePage = () => {
  return (
    <div className="flex flex-col items-center ">
      <Hero />
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
      <Contactus />
      <Faq />
    </div>
  );
};

export default HomePage;
