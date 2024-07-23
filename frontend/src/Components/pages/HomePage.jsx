import React from 'react'
import { lazy } from 'react'
import Hero from '../Home Page/Hero.jsx'
import Statistics from '../Home Page/Statistics.jsx'
import Contactus from './Contactus.jsx'
import Faq from './Faq.jsx'
const HomePage = () => {
  return (
    <div className='flex flex-col items-center '>
      <Hero />
      <Statistics />
      <Contactus />
      <Faq />
    </div>
  )
}

export default HomePage