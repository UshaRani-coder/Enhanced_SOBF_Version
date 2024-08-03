import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import Donateus from "../../pages/Donateus";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <div className="w-full fixed top-1 z-50 flex justify-center mt-10">
      <nav className="cursor-pointer w-full bg-white shadow-2xl">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo on the left */}
          <NavLink to="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-20" />
          </NavLink>

          {/* Navigation items in the center */}
          <ul className={`nav-items ${isActive ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center gap-4 md:gap-x-10 absolute md:static top-full left-0 w-full md:w-auto bg-light-lavender md:bg-transparent p-4 md:p-0`}>
            <li>
              <NavLink exact to="/" className="text-blue md:text-blue hover:text-[#379e90] text-lg font-bold font-sans" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="text-blue md:text-blue hover:text-[#379e90] text-lg font-bold font-sans" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/vision" className="text-blue md:text-blue hover:text-[#379e90] text-lg font-bold font-sans" onClick={closeMenu}>
                Vision
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className="text-blue md:text-blue hover:text-[#379e90] text-lg font-bold font-sans" onClick={closeMenu}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="text-blue md:text-blue hover:text-[#379e90] text-lg font-bold font-sans" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Donate button on the right */}
          <div className="hidden md:block">
            <a href="" className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-peacock-green text-white inline-block">
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-peacock-green-hover group-hover:h-full opacity-100"></span>
              <span className="relative group-hover:text-white">
                <NavLink to="/donate-us" onClick={closeMenu}>Donate</NavLink>
              </span>
            </a>
          </div>

          {/* Hamburger menu for mobile */}
          <div
            className={`ham-menu md:hidden cursor-pointer flex flex-col justify-center gap-1 ${isActive ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;