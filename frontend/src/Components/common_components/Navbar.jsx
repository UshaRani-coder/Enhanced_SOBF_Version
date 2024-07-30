import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <nav className="cursor-pointer w-[100%] md:flex md:pr-[15px] md:items-center top-12 md:top-11 fixed z-50 bg-[#001233]">
      <div className="flex justify-between items-center p-4 w-full">
        <NavLink to="/">
          <img src="https://www.sobf.in/images/BRAJ%20WHITE.png" alt="logo" className="w-20" />
        </NavLink>
        <div
          className={`ham-menu md:hidden cursor-pointer flex flex-col justify-center gap-1 ${isActive ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </div>
      <ul className={`nav-items ${isActive ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center gap-4 w-full md:w-auto bg-[#001233] text-white md:bg-transparent p-4 md:p-0 md:gap-x-5`}>
        <li>
          <NavLink exact to="/" className="text-white lg:text-creamy-white hover:text-[#ff7700] text-lg hover:underline font-bold font-sans" onClick={closeMenu}> Home </NavLink>
        </li>
        <li>
          <NavLink to="/about-us" className="text-white lg:text-creamy-white hover:text-[#ff7700] text-lg hover:underline font-bold font-sans" onClick={closeMenu}> About </NavLink>
        </li>
        <li>
          <NavLink to="/vision" className="text-white lg:text-creamy-white hover:text-[#ff7700] text-lg hover:underline font-bold font-sans" onClick={closeMenu}> Vision </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" className="text-white lg:text-creamy-white hover:text-[#ff7700] text-lg hover:underline font-bold font-sans" onClick={closeMenu}> Gallery </NavLink>
        </li>
        <li>
          <NavLink to="/contact-us" className="text-white lg:text-creamy-white font-sans hover:text-[#ff7700] text-lg hover:underline font-bold" onClick={closeMenu}> Contact </NavLink>
        </li>
        <div className="mt-4 md:mt-0 w-full">
          <button className="bg-orange py-2.5 px-8 text-white rounded-lg font-semibold text-xl  font-sans hover:bg-white w-full hover:text-orange ">Donate</button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
