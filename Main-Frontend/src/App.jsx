import React, { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import loader from './assets/loader.webp';
import DonationForm from './pages/Payment.jsx';
import QRPayment from './Components/Home_Section/QRPayament.jsx';
import DonationOptions from './pages/DonateFor.jsx';

// Lazy loading the components
const Header = lazy(() => import('./Components/common_components/Header.jsx'));
const Footer = lazy(() => import('./Components/common_components/Footer.jsx'));
const BackgroundMusic = lazy(() => import('./Components/BackgroundMusic.jsx'));
const LegalDoc = lazy(() => import('./pages/LegalDoc.jsx'));
const NewsBulletinDetails = lazy(
  () => import('./pages/NewsBulletinDetails.jsx'),
);
const Whatsapp = lazy(() => import('./Components/Whatsapp.jsx'));
const RecentActivityDetails = lazy(
  () => import('./pages/RecentActivityDetail.jsx'),
);
const HomePage = lazy(() => import('./pages/Home.jsx'));
const AboutUs = lazy(() => import('./pages/Aboutus.jsx'));
const ContactUsPage = lazy(() => import('./pages/ContactUs.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Subscription = lazy(() => import('./Components/subscription-page/Subscription.jsx'));
const Donateus = lazy(() => import('./pages/Donateus.jsx'));
const Press_Release = lazy(
  () => import('./Components/Home_Section/Press_Release.jsx'),
);
const Recent_Activities = lazy(
  () => import('./Components/Home_Section/Recent_Activities.jsx'),
);
const AnnaVitranSeva = lazy(
  () => import('./Components/Home_Section/Services/AnnaVitranSeva.jsx'),
);
const SwachhVrindavan = lazy(
  () => import('./Components/Home_Section/Services/SwachhVrindavan.jsx'),
);
const SadhuSeva = lazy(
  () => import('./Components/Home_Section/Services/SadhuSeva.jsx'),
);
const Brajkulam = lazy(
  () => import('./Components/Home_Section/Services/Brajkulam.jsx'),
);
const PrivacyPolicy = lazy(() => import('./Footer/PrivacyPolicy.jsx'));
const Videos = lazy(() => import('./Components/Home_Section/Video.jsx'));
const RefundPolicy = lazy(() => import('./Footer/RefundPolicy.jsx'));
const TermsAndConditions = lazy(
  () => import('./Footer/TermsAndConditions.jsx'),
);
const CommunityService = lazy(
  () => import('./Components/Home_Section/Services/CommunityService.jsx'),
);
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const App = () => {
  const location = useLocation();
  const validRoutes = [
    '/',
    '/about-us',
    '/contact-us',
    '/gallery',
    '/donate-us',
    '/subscription',
    '/press-release',
    '/press-release/:id',
    '/recent-activities',
    '/recent-activities/:id',
    '/videos',
    '/legal-doc',
    '/anna-vitran-seva',
    '/community-service',
    '/swachh-vrindavan',
    '/sadhu-seva',
    '/brajkulam',
    '/privacy-policy',
    '/refund-policy',
    '/terms-and-conditions',
  ];

  // Properly check for dynamic routes
  const isDynamicRoute = validRoutes.some((route) =>
    new RegExp(`^${route.replace(/:\w+/g, '[^/]+')}$`).test(location.pathname),
  );
  const isNotFound = !isDynamicRoute;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <img src={loader} alt="Loading..." className="w-20" />
        </div>
      }
    >
      {!isNotFound && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/press-release" element={<Press_Release />} />
        <Route path="/press-release/:id" element={<NewsBulletinDetails />} />
        <Route path="/recent-activities" element={<Recent_Activities />} />
        <Route
          path="/recent-activities/:id"
          element={<RecentActivityDetails />}
        />
        <Route path="/videos" element={<Videos />} />
        {/* <Route path="/donat" element={<DonationOptions />} /> */}
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/donate-us" element={<Donateus />} />
        {/* <Route path="/donate-us" element={<DonationForm />} /> */}
        {/* <Route path="/donate-us" element={<QRPayment />} /> */}
        <Route path="/legal-doc" element={<LegalDoc />} />
        <Route path="/anna-vitran-seva" element={<AnnaVitranSeva />} />
        <Route path="/community-service" element={<CommunityService />} />
        <Route path="/swachh-vrindavan" element={<SwachhVrindavan />} />
        <Route path="/sadhu-seva" element={<SadhuSeva />} />
        <Route path="/brajkulam" element={<Brajkulam />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {!isNotFound && <BackgroundMusic />}
      {!isNotFound && <Whatsapp />}
      {!isNotFound && <Footer />}
    </Suspense>
  );
};

export default App;
