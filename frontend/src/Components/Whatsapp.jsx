import React, { useEffect, useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Avatar from '../assets/OurTeam/TarunMisra.avif';
import '../App.css';

const Whatsapp = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if the user has dark mode in their system
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    // Listen for changes in the system dark mode preference
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="">
      <FloatingWhatsApp
        phoneNumber="918439406670"
        accountName="Tarun Misra"
        allowEsc
        allowClickAway
        notification
        notificationSound={true}
        avatar={Avatar}
        chatMessage="Welcome to Soul of Braj Federation! How can we help you today?"
        darkMode={darkMode}
      />
    </div>
  );
};

export default Whatsapp;
