import React, { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import loader from './assets/loader.webp';
import DonateForDetailedPage from './pages/DonateFor_Details';
import EventDetails from './pages/EventDetails';
import ScrollToTop from './components/common_components/ScrollToTop';

// Lazy loading the components
const Header = lazy(() => import('./components/common_components/Header.jsx'));
const Footer = lazy(() => import('./components/common_components/Footer/Footer.jsx'));
const BackgroundMusic = lazy(
  () => import('./components/common_components/BackgroundMusic.jsx'),
);
const LegalDoc = lazy(() => import('./pages/LegalDoc.jsx'));
const NewsBulletinDetails = lazy(
  () => import('./pages/NewsBulletinDetails.jsx'),
);
const Whatsapp = lazy(
  () => import('./components/common_components/Whatsapp.jsx'),
);
const RecentActivityDetails = lazy(
  () => import('./pages/RecentActivityDetail.jsx'),
);
const HomePage = lazy(() => import('./pages/Home.jsx'));
const AboutUs = lazy(() => import('./pages/Aboutus.jsx'));
const ContactUsPage = lazy(() => import('./pages/ContactUs.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Subscription = lazy(
  () => import('./components/subscription-page/Subscription.jsx'),
);
const DonateForMain = lazy(() => import('./pages/DonateForList.jsx'));
const DonateUs = lazy(() => import('./pages/Donateus.jsx'));
const Press_Release = lazy(
  () => import('./components/Home_Page/Press_Release.jsx'),
);
const Recent_Activities = lazy(
  () => import('./components/Home_Page/Recent_Activities.jsx'),
);

const ServiceDetails = lazy(
  () => import('./components/Home_Page/Services/ServiceDetails.jsx'),
);
const PrivacyPolicy = lazy(() => import('./components/common_components/Footer/PrivacyPolicy.jsx'));
const Videos = lazy(() => import('./components/Home_Page/Video.jsx'));
const RefundPolicy = lazy(() => import('./components/common_components/Footer/RefundPolicy.jsx'));
const TermsAndConditions = lazy(
  () => import('./components/common_components/Footer/TermsAndConditions.jsx'),
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
    '/donate-for',
    '/donate/:id',
    '/subscription',
    '/press-release',
    '/press-release/:id',
    '/recent-activities',
    '/recent-activities/:id',
    '/events/:id',
    '/videos',
    '/legal-doc',
    '/services/:id',
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
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
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
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/donate-for" element={<DonateForMain />} />
          <Route path="/donate/:id" element={<DonateForDetailedPage />} />
          <Route path="/donate-us" element={<DonateUs />} />
          <Route path="/legal-doc" element={<LegalDoc />} />

          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
        {!isNotFound && <BackgroundMusic />}
        {!isNotFound && <Whatsapp />}
        {!isNotFound && <Footer />}
      </div>
    </Suspense>
  );
};

export default App;
