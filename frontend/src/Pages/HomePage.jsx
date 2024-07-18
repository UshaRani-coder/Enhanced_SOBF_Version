import React from 'react'
import { lazy } from 'react'

const Footer = lazy(() => import("../Components/HomePage/Footer.jsx"));

const HomePage = () => {
  return (
    <div>
      <Footer/>
    </div>
  )
}

export default HomePage
