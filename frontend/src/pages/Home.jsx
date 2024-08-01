import React from 'react'
import { lazy } from 'react'
import Hero from '../Components/Home_Section/Hero.jsx'
import Statistics from '../Components/Home_Section/Stats.jsx'
import Contactus from './Support.jsx'
import Faq from '../Components/Home_Section/Faq.jsx'
import About from '../Components/Home_Section/About.jsx'
import Services from '../Components/Home_Section/Services.jsx'
import Team from '../Components/Home_Section/Team.jsx'
import Testimonials from '../Components/Home_Section/Testimonials.jsx'
import Video from '../Components/Home_Section/Video.jsx'
import Programms from '../Components/Home_Section/Programms.jsx'




const HomePage = () => {
  return (
    <div className='flex flex-col items-center '>
      <Hero />
      <Statistics />
      <Programms/>
      <Video />
      <About />
      <Services />
      <Team />
      <Testimonials />
      <Contactus />
      <Faq />
    </div>
  )
}

export default HomePage