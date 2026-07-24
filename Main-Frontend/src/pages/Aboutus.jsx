import React from 'react';
import AboutUsIntro from '@/Components/AboutUs_Page/AboutUsIntro.jsx';
import AboutUsSections from '@/Components/AboutUs_Page/AboutUsSections';
import AboutUsGallery from '@/Components/AboutUs_Page/AboutUsGallery';

const AboutUs = () => {
  return (
    <div className="pt-[90px] md:pt-[100px] lg:pt-[120px]">
      <AboutUsIntro />
      <AboutUsSections />
      <AboutUsGallery />
    </div>
  );
};

export default AboutUs;
