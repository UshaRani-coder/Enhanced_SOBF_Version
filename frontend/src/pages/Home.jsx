import React from 'react'
import { lazy } from 'react'
import Hero from '../Components/Home_Section/Hero.jsx'
import Statistics from '../Components/Home_Section/Statistics.jsx'
import Contactus from './Support.jsx'
import Faq from '../Components/Home_Section/Faq.jsx'
import About from '../Components/Home_Section/About.jsx'
import Services from '../Components/Home_Section/Services.jsx'
import Team from '../Components/Home_Section/Team.jsx'




const HomePage = () => {
  return (
    <div className='flex flex-col items-center '>
      <Hero />
      <Statistics />
      <About />
      <Services />
      <Team />
      <Contactus />
      <Faq />
    </div>
  )
}

export default HomePage