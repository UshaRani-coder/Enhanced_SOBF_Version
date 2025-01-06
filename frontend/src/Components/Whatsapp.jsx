import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import Avatar from '../assets/OurTeam/TarunMisra.avif'
import '../App.css'
const Whatsapp = () => {
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
        darkMode
      />
    </div>
  );
};

export default Whatsapp;
