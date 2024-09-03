import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/common_components/Header.jsx";
import Footer from "./Components/common_components/Footer.jsx";
import BackgroundMusic from "./Components/BackgroundMusic.jsx";

// Lazy loading the components
const HomePage = lazy(() => import("./pages/Home.jsx"));
const AboutUs = lazy(() => import("./pages/Aboutus.jsx"));
const ContactUsPage = lazy(() => import("./pages/ContactUs.jsx"));
const Vision = lazy(() => import("./pages/Vision.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Donateus = lazy(() => import("./pages/Donateus.jsx"));
const Press_Release = lazy(() =>
  import("./Components/Home_Section/Press_Release.jsx")
);
const Recent_Activities = lazy(() =>
  import("./Components/Home_Section/Recent_Activities.jsx")
);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path='/login' element={<Login/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/press-release" element={<Press_Release />} />
        <Route path="/recent-activities" element={<Recent_Activities />} />
        <Route path="/donate-us" element={<Donateus />} />
      </Routes>
      <BackgroundMusic />
      <Footer />
    </Suspense>
  );
};

export default App;
