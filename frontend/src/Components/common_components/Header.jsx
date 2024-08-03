import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="licence fixed top-0 z-50 w-[100%] p-[5px] py-3.5 text-center bg-blue text-[#ffffff] text-[10px] md:text-[12px]">
        <p className="text-md">
          <span>Licence under Section 8(1) of the Company Act, 2013 &nbsp; | &nbsp; </span>
          <span>
            Pursuant to rule 20 the Companies(Incorporation) Rules, 2014 &nbsp; | &nbsp;
          </span>
          <span>Section-8 Company Licence Number - 119528</span>
        </p>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
