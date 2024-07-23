// src/App.jsx
import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './Components/common/Header';
import Navbar from './Components/common/Navbar.jsx';
// Lazy load components
const HomePage = lazy(() => import('./Components/pages/HomePage'));
const AboutUs = lazy(() => import('./Components/pages/Aboutus'));
const ContactUs = lazy(() => import('./Components/pages/Contactus'));
const Footer = lazy(() => import('./Components/common/Footer'))


const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
    
      </Routes>
      <Footer/>
    </Suspense>
  );
};

export default App;
