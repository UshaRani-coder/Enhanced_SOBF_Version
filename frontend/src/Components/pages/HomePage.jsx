import React from 'react'
import { lazy } from 'react'

const Footer = lazy(() => import("../common/Footer.jsx"));
const Header = lazy(() => import("../common/Header.jsx"));
const Navbar = lazy(() => import("../common/Navbar.jsx"));
const HomePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Header />
      <Navbar />
      <Footer/>
    </div>
  )
}

export default HomePage
