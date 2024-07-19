import React from 'react'
import { lazy } from 'react'
import ContactUs from './ContactUs.jsx';
const Faq = lazy(() => import("./Faq.jsx"));



const HomePage = () => {
  return (
    <div>
      <ContactUs/>
      <Faq/>
    </div>
  )
}

export default HomePage