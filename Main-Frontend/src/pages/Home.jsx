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
import Partners from '../Components/Home_Section/Partners.jsx';
import Recent_Activities from '../Components/Home_Section/Recent_Activities.jsx';
import SidePopup from '../Components/common_components/sidePopup.jsx';
import UpcomingEvents from '../Components/Home_Section/UpcomingEvents.jsx';
import VolunteerForm from './Volunteer.jsx';
import DonationOptions from './DonateFor.jsx';
import { DottedSeparator, HealthSeparator, WavySeparator } from '../utils/Seperator.jsx';



const HomePage = () => {
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);

  // Show popup after 8 seconds on every page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolunteerForm(true);
    }, 8000); // 8000 milliseconds = 8 seconds

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <div className="flex flex-col items-center overflow-auto">
      {showVolunteerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowVolunteerForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <VolunteerForm onSuccess={() => setShowVolunteerForm(false)} />
          </div>
        </div>
      )}

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
      <DottedSeparator />
      <Impacts />
      <WavySeparator />
      <UpcomingEvents />
      <DottedSeparator />
      <DonationOptions />
      <WavySeparator />
      <Programms />
      {/* <DottedSeparator /> */}
      <About />
      <DottedSeparator />
      <Video />
      <DottedSeparator />
      <Services />
      {/* <Press_Release /> */}
      {/* <HealthSeparator /> */}
      <Recent_Activities />
      <Team />
      <Partners />
      <Testimonials />
      {/* <Home_Gallery /> */}
      <Contactus />
      <Faq />
    </div>

  );
};

export default HomePage;
