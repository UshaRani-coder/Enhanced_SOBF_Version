import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import logo from '../../assets/logo.webp';

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
      <nav className="cursor-pointer w-[100%] bg-white shadow-2xl p-4 flex justify-between items-center z-20">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0" onClick={handleSmoothScroll}>
          <img
            src={logo}
            width={200}
            height={102}
            alt="logo"
            className="w-20 object-cover"
          />
        </NavLink>

        {/* Navigation Menu */}
        <ul
          className={`nav-items ${
            isActive ? 'flex' : 'hidden'
          } lg:flex max-h-[450px] overflow-y-auto scrollbar-none flex-col z-50 lg:flex-row items-center justify-center gap-3 lg:gap-x-8 xl:gap-x-10 absolute lg:static top-full left-0 w-full bg-[#f2f2f2] border border-t-2 lg:border-none shadow-2xl lg:shadow-none lg:bg-transparent p-4 lg:p-0`}
        >
          {[
            { path: '/', label: 'Home' },
            { path: '/about-us', label: 'Our Mission' },
            { path: '/gallery', label: 'Gallery' },
            { path: '/press-release', label: 'Press Release' },
            { path: '/recent-activities', label: 'Activities' },
            { path: '/legal-doc', label: 'Legal' },
            { path: '/videos', label: 'Videos' },
            { path: '/contact-us', label: 'Contact' },
          ].map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-lg lg:text-[12px] xl:text-[16px] font-bold font-sans transition-all duration-300 ${
                    isActive
                      ? 'text-logoYellow'
                      : 'text-blue hover:text-logoYellow'
                  }`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 -ml-5">
          {/* Donate button (desktop view) */}
          <div className="hidden lg:block">
            <NavLink
              to="/donate-us"
              className="px-4 py-2.5 relative rounded-full group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:text-white hover:shadow-lg"
              onClick={closeMenu}
            >
              <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
              <span className="relative z-10">Donate</span>
            </NavLink>
          </div>
        </div>

        {/* Mobile buttons + hamburger (right side) */}
        <div className="flex items-center gap-3">
          {/* Mobile buttons */}
          <div className="flex lg:hidden gap-3">
            <NavLink
              to="/donate-us"
              className="px-2 small-range:px-4 py-1.5 relative rounded-full group overflow-hidden font-semibold bg-logoYellow text-white inline-block shadow-md transition-all duration-300 ease-in-out hover:bg-logo-blue hover:shadow-                         lg"
              onClick={closeMenu}
            >
              <span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out transform bg-logo-blue group-hover:w-full"></span>
              <span className="relative z-10 text-xs sm:text-sm">Donate</span>
            </NavLink>
          </div>

          {/* Hamburger Menu */}
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
