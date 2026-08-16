import React, { useEffect, useState, Suspense, lazy } from 'react';
import Hero from '../components/Home_Page/Hero.jsx';
import HeroVideo from '../components/Home_Page/HeroVideo.jsx';
const Impacts = lazy(() => import('../components/Home_Page/Impacts.jsx'));
const Contactus = lazy(() => import('../components/Home_Page/Support.jsx'));
const Faq = lazy(() => import('../components/Home_Page/Faq.jsx'));
const About = lazy(() => import('../components/Home_Page/About.jsx'));
const Services = lazy(
  () => import('../components/Home_Page/Services/Services.jsx'),
);
const Team = lazy(() => import('../components/Home_Page/Team.jsx'));
const Testimonials = lazy(
  () => import('@/components/Home_Page/Testimonial/Testimonials.jsx'),
);
const Video = lazy(() => import('../components/Home_Page/Video.jsx'));
const Programms = lazy(() => import('../components/Home_Page/Initiatives.jsx'));
const Partners = lazy(() => import('../components/Home_Page/Partners.jsx'));
const Recent_Activities = lazy(
  () => import('../components/Home_Page/Recent_Activities.jsx'),
);
const SidePopup = lazy(
  () => import('../components/common_components/sidePopup.jsx'),
);
const UpcomingEvents = lazy(
  () => import('../components/Home_Page/Upcoming Events/UpcomingEvents.jsx'),
);
const VolunteerForm = lazy(
  () => import('../components/Volunteer/Volunteer.jsx'),
);
const DonationOptions = lazy(
  () => import('@/components/Home_Page/DonateForPreview.jsx'),
);

import { WavySeparator } from '../utils/Seperator.jsx';

const HomePage = () => {
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);

  // Show popup after 8 seconds on every page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVolunteerForm(true);
    }, 8000); 

    return () => clearTimeout(timer);
  }, []); 

  useEffect(() => {
    const sectionId = sessionStorage.getItem('scroll-section');

    if (!sectionId) return;

    const timer = setInterval(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });

        sessionStorage.removeItem('scroll-section');
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center overflow-auto">
      {showVolunteerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowVolunteerForm(false)}
              className="absolute top-7 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <VolunteerForm onSuccess={() => setShowVolunteerForm(false)} />
          </div>
        </div>
      )}

      <div className=" w-full ">
        <HeroVideo />
      </div>

      <div className={` w-full`}>
        <Hero />
      </div>
      <Suspense fallback={null}>
        <SidePopup />
        <Impacts />
        <UpcomingEvents />
        <DonationOptions />
        <WavySeparator />
        <Programms />
        <About />
        <Video />
        <WavySeparator />
        <Services />
        <WavySeparator />
        <Recent_Activities />
        <Team />
        <Partners />
        <Testimonials />
        <Contactus />
        <Faq />
      </Suspense>
    </div>
  );
};

export default HomePage;
