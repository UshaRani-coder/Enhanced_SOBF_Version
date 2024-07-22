import React from 'react'
import { lazy } from 'react'
import Hero from '../Home Page/Hero.jsx'
import Statistics from '../Home Page/Statistics.jsx'
const HomePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Hero />
      <Statistics />
    </div>
  )
}

export default HomePage
