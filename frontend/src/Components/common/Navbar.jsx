import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../../App.css";
const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  return (
    <nav className="cursor-pointer w-[100%] md:flex md:pr-[30px] md:items-center ">
      <div className="flex w-[100%] justify-between items-center p-[15px]">
        <img src={logo} alt="logo" width={"70px"} />
        <div
          className={`ham-menu md:hidden flex flex-col gap-y-[4px] justify-center ${
            isActive ? "active" : ""
          }`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`nav-items ${isActive ? "active" : ""}  flex flex-col items-center  md:flex-row  md:gap-x-[20px]`}>
        <li className="hover:text-[#ff7700] font-semibold">Home</li>
        <li className="hover:text-[#ff7700] font-semibold">About</li>
        <li className="hover:text-[#ff7700] font-semibold">Vision</li>
        <li className="hover:text-[#ff7700] font-semibold">Gallery</li>
        <li className="hover:text-[#ff7700] font-semibold">Contact</li>
        <li className="hover:text-[#ff7700] font-semibold">More</li>
        <div>
        <button className="bg-[#ff7700] p-[5px] px-[20px] text-[#ffffff] rounded font-semibold">Donate</button>
        </div>
      </ul>
      
    </nav>
  );
};

export default Navbar;
