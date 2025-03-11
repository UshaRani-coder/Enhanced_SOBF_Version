import React, { useEffect, useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Avatar from "../assets/OurTeam/TarunMisra.png";
import { useLocation } from "react-router-dom";

const Whatsapp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const location = useLocation()
  useEffect(() => {
    // Detect system dark mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
      const handleScroll = () => {
        let scrollThreshold = 500;
        if (window.innerWidth >= 1280) {
          scrollThreshold = 800;
        } else if (window.innerWidth >= 1024) {
          scrollThreshold = 1000;
        } else if (window.innerWidth >= 768) {
          scrollThreshold = 700;
        }
  
        // Show button when scrolling down on the home page
        if (location.pathname === '/') {
          setShowButton(window.scrollY > scrollThreshold);
        }
      };
  
      // Show button immediately if NOT on the home page
      if (location.pathname !== '/') {
        setShowButton(true);
      } else {
        window.addEventListener('scroll', handleScroll);
      }
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]); 
  return (
    <div className="">
      {showButton && (
        <FloatingWhatsApp
          phoneNumber="918439406670"
          accountName="Soul Of Braj Federation"
          allowEsc
          allowClickAway
          notification
          notificationSound={true}
          avatar={Avatar}
          chatMessage="Welcome to Soul of Braj Federation! How can we help you today?"
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Whatsapp;
