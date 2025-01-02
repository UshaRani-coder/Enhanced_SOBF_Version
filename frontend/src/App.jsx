import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/common_components/Header.jsx";
import Footer from "./Components/common_components/Footer.jsx";
import BackgroundMusic from "./Components/BackgroundMusic.jsx";
import LegalDoc from "./pages/LegalDoc.jsx";
import loader from "./assets/loader.webp"
import ActivityDetails from "./pages/ActivityDetails.jsx";

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
const Recent_Activities = lazy(() => import("./Components/Home_Section/Recent_Activities.jsx"));
const AnnaVitranSeva = lazy(() => import("./Components/Home_Section/Services/AnnaVitranSeva.jsx"));
const SwachhVrindavan = lazy(() => import("./Components/Home_Section/Services/SwachhVrindavan.jsx"));
const Brajkulam = lazy(() => import("./Components/Home_Section/Services/Brajkulam.jsx"));
const PrivacyPolicy = lazy(() => import("./Footer/PrivacyPolicy.jsx"));
const RefundPolicy = lazy(() => import("./Footer/RefundPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./Footer/TermsAndConditions.jsx"));
const CommunityService = lazy(() => import("./Components/Home_Section/Services/CommunityService.jsx"));

const App = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <img src={loader} alt="" className="w-20" />
      </div>
    }
    >
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/press-release" element={<Press_Release />} />
        <Route path="/press-release/:id" element={<ActivityDetails />} />
        <Route path="/recent-activities" element={<Recent_Activities />} />
        <Route path="/recent-activities/:id" element={<ActivityDetails />} />
        <Route path="/donate-us" element={<Donateus />} />
        <Route path="/legal-doc" element={<LegalDoc />} />
        <Route path="/anna-vitran-seva" element={<AnnaVitranSeva />} />
        <Route path="/community-service" element={<CommunityService/>} />
        <Route path="/swachh-vrindavan" element={<SwachhVrindavan />} /> 
        <Route path="/brajkulam" element={<Brajkulam />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path= "/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
      <BackgroundMusic />
      <Footer />
    </Suspense>
  );
};

export default App;
