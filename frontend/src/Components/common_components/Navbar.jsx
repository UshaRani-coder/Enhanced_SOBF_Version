import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../App.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <div className="w-full fixed top-[1px] lg:top-1 z-50 flex justify-center mt-10">
      <nav className="cursor-pointer w-full bg-white shadow-2xl">
        <div className="container mx-auto flex justify-between items-center p-2">
          {/* Logo on the left */}
          <NavLink to="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-20" />
          </NavLink>

          {/* Navigation items in the center */}
          <ul
            className={`nav-items ${
              isActive ? "flex" : "hidden"
            } md:flex  flex-col z-50 md:flex-row items-center gap-4 md:gap-x-10 absolute md:static top-full left-0 w-full md:w-auto bg-[#f2f2f2] border border-t-2 md:border-none lg:border-none shadow-2xl lg:shadow-none md:bg-transparent p-4 md:p-0`}
          >
            <li>
              <NavLink
                exact
                to="/"
                className="text-blue hover:text-logoYellow text-lg font-bold font-sans"
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className="text-blue  hover:text-logoYellow text-lg font-bold font-sans"
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vision"
                className="text-blue  hover:text-logoYellow text-lg font-bold font-sans"
                onClick={closeMenu}
              >
                Vision
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                className="text-blue  hover:text-logoYellow text-lg font-bold font-sans"
                onClick={closeMenu}
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className="text-blue  hover:text-logoYellow text-lg font-bold font-sans"
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
            {/* Donate button */}

            <li className="block md:hidden">
              <Link
                href=""
                className="px-8 py-3.5 relative rounded-full group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg"
              >
                <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
                <span className="relative z-10">
                  <NavLink to="/donate-us" onClick={closeMenu}>
                    Donate
                  </NavLink>
                </span>
              </Link>
            </li>
          </ul>

          {/* Donate button on the right for desktop */}
          <div className="hidden md:block">
  <Link
    href=""
    className="px-8 py-3.5 relative rounded-full group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:text-white hover:shadow-lg"
  >
    <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
    <span className="relative z-10">
      <NavLink to="/donate-us" onClick={closeMenu}>
        Donate
      </NavLink>
    </span>
  </Link>
</div>


          {/* Hamburger menu for mobile */}
          <div
            className={`ham-menu  md:hidden cursor-pointer flex flex-col justify-center gap-1 relative w-[25px] h-[25px] ${
              isActive ? "active" : ""
            }`}
            onClick={toggleMenu}
          >
            <span className="block w-[100%] h-[3.5px]  rounded-[20px] absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition duration-500 ease-in-out bg-logo-blue "></span>
            <span className="block w-[100%] h-[3.5px]  rounded-[20px] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition duration-500 ease-in-out bg-logo-blue"></span>
            <span className="block w-[100%] h-[3.5px]  rounded-[20px] absolute top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition duration-500 ease-in-out bg-logo-blue"></span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
