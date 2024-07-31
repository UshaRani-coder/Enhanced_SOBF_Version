import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from './Components/common_components/Header.jsx';
import Footer from './Components/common_components/Footer.jsx';
import HomePage from './pages/Home.jsx';
import AboutUs from './pages/Aboutus.jsx';
import ContactUsPage from './pages/ContactUs.jsx';
import Vision from './pages/Vision.jsx';
import Gallery from './pages/Gallery.jsx';




const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default App;
