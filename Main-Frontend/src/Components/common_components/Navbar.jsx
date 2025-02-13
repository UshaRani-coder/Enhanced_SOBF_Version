import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../App.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);

  const closeMenu = () => {
    setIsActive(false);
  };

  const handleSmoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full fixed top-[1px] lg:top-1 z-50 flex justify-center mt-10">
      <nav className="cursor-pointer w-[100%] bg-white shadow-2xl p-2  flex justify-between items-center z-20">
        {/* Logo on the left */}
        <Link to="/" className="flex-shrink-0" onClick={handleSmoothScroll}>
          <img src={logo} alt="logo" className="w-20 object-cover" />
        </Link>

        {/* Navigation items in the center */}
        <ul
          className={`nav-items ${
            isActive ? 'flex' : 'hidden'
          } lg:flex max-h-[450px] overflow-y-auto scrollbar-none flex-col z-50 lg:flex-row items-center justify-center gap-3 lg:gap-x-8 xl:gap-x-10 absolute lg:static top-full left-0 w-full  bg-[#f2f2f2] border border-t-2 lg:border-none shadow-2xl lg:shadow-none lg:bg-transparent p-4 lg:p-0`}
        >
          <li>
            <Link
              to="/"
              className="text-blue hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={() => {
                closeMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/vision"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              Vision
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/press-release"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              Press Release
            </Link>
          </li>
          <li>
            <Link
              to="/recent-activities"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              Recent Activities
            </Link>
          </li>
          <li>
            <Link
              to="/legal-doc"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              Legal Documents
            </Link>
          </li>
          <li>
            <NavLink
              to="/videos"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className="text-blue  hover:text-logoYellow text-lg lg:text-[16px]  font-bold font-sans"
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>

          {/* Donate button */}
          <li className="block lg:hidden">
            <Link
              to="/donate-us"
              className="px-8 py-3.5 relative rounded-full group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-lg"
              onClick={closeMenu}
            >
              <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
              <span className="relative z-10">Donate</span>
            </Link>
          </li>
        </ul>

        {/* Donate button on the right for desktop */}
        <div className="hidden lg:block">
          <Link
            to="/donate-us"
            className="px-8 py-3.5 relative rounded-full group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:text-white hover:shadow-lg"
            onClick={closeMenu}
          >
            <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
            <span className="relative z-10">Donate</span>
          </Link>
        </div>
        {/* Hamburger menu for mobile and large screens */}
        <div
          className={`ham-menu lg:hidden cursor-pointer flex flex-col justify-center gap-1 relative w-[25px] h-[25px] ${
            isActive ? 'active' : ''
          }`}
          onClick={toggleMenu}
        >
          <span className="block w-[100%] h-[3.5px] rounded-[20px] absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition duration-500 ease-in-out bg-logo-blue"></span>
          <span className="block w-[100%] h-[3.5px] rounded-[20px] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition duration-500 ease-in-out bg-logo-blue"></span>
          <span className="block w-[100%] h-[3.5px] rounded-[20px] absolute top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition duration-500 ease-in-out bg-logo-blue"></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
