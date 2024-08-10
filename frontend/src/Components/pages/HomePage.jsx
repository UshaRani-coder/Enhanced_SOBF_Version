import React, { useEffect } from 'react'
import { lazy } from 'react'
import Hero from '../Home Page/Hero.jsx'
import Statistics from '../Home Page/Statistics.jsx'
import Contactus from './Contactus.jsx'
import Faq from './Faq.jsx'
import About from '../Home Page/About.jsx'
import Services from '../Home Page/Services.jsx'
import Team from '../Home Page/Team.jsx'
import Testimonials from '../Home_Section/Testimonials.jsx'
import Partners from '../Home_Section/Partners.jsx'
const HomePage = () => {
  useEffect(()=>console.log("HomePage"),[])
  return (
    <div className='flex flex-col items-center '>
      <Hero />
      <Statistics />
      <About />
      <Services />
      <Partners />
      <Team />
      <Testimonials />
      <Contactus />
      <Faq />
    </div>
  )
}

export default HomePage
