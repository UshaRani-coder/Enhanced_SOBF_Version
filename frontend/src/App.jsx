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
import Donateus from './pages/Donateus.jsx';
import Press_Release from './Components/Home_Section/Press_Release.jsx';
import Recent_Activities from './Components/Home_Section/Recent_Activities.jsx';
import BackgroundMusic from './Components/BackgroundMusic.jsx';
import Login from './pages/Login.jsx';

const App = () => {
  return (
    
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path='/login' element={<Login/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/press-release" element={<Press_Release/>} />
        <Route path="/recent-activities" element= {<Recent_Activities/>} />
        <Route path="/donate-us" element={<Donateus/>} />
      </Routes>
      <BackgroundMusic />
      <Footer />
    </Suspense>
  );
};

export default App;
