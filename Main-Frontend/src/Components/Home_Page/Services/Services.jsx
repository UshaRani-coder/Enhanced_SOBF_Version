import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector, useDispatch } from 'react-redux';
import { getServices } from '@/reducers/OurServicesSlice.js';
import { useLocation } from 'react-router-dom';
import hardcodedServices from '@/defaultData/ourServices.json';
import ServiceGrid from './ServiceGrid.jsx';
import ServiceDetails from './ServiceDetails.jsx';

const Services = () => {
  const { services, status, error } = useSelector((state) => state.services);
  const finalServices =
    Array.isArray(services) && services.length > 0
      ? services
      : hardcodedServices;
  const dispatch = useDispatch();
  const [service, setService] = useState(null);
  const ourServicesRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getServices());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Function to handle screen resizing and update AOS attributes
    const handleResize = () => {
      const elements = document.querySelectorAll('[data-aos]');

      elements.forEach((element) => {
        // Get stored default attributes
        const defaultAos =
          element.getAttribute('data-default-aos') || 'fade-right';
        const defaultDelay =
          element.getAttribute('data-default-aos-delay') || '100';

        if (window.innerWidth < 768) {
          // Change data-aos attributes for small screens
          element.setAttribute('data-aos', 'fade-up');
          element.setAttribute('data-aos-delay', '200');
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
          // Change data-aos attributes for medium screens
          element.setAttribute('data-aos', 'fade-down');
          element.setAttribute('data-aos-delay', '100');
        } else {
          // Revert to default data-aos attributes
          element.setAttribute('data-aos', defaultAos);
          element.setAttribute('data-aos-delay', defaultDelay);
        }
      });

      // Refresh AOS to apply the changes
      AOS.refresh();
    };

    // Initialize AOS
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
    });

    // Store default attributes on mount
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((element) => {
      if (!element.hasAttribute('data-default-aos')) {
        element.setAttribute(
          'data-default-aos',
          element.getAttribute('data-aos') || 'fade-right',
        );
        element.setAttribute(
          'data-default-aos-delay',
          element.getAttribute('data-aos-delay') || '100',
        );
      }
    });

    // Initial screen size check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (services?.length > 0) {
      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        document.querySelectorAll('.service')?.forEach((element) => {
          const bgImage = element.getAttribute('data-bg');

          if (bgImage) {
            element.style.setProperty('--bg-image', `url(${bgImage})`);
          }
        });
      });
    }
  }, [services]);

  const scrollToServices = () => {
    ourServicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center mb-14">
      <h1
        ref={ourServicesRef}
        className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative transition-all ease-in-out"
      >
        Our Services
        <hr className="mt-1 border-light-lavender border-[1px]" />
      </h1>
      {status === 'loading' && <p>Loading Services...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      {service === null ? (
        <ServiceGrid
          services={finalServices}
          onSelect={(title) => {
            setService(title);

            if (isHomePage) {
              scrollToServices();
            }
          }}
        />
      ) : (
        <ServiceDetails
          services={finalServices}
          service={service}
          isHomePage={isHomePage}
          setService={setService}
        />
      )}
    </div>
  );
};

export default Services;
