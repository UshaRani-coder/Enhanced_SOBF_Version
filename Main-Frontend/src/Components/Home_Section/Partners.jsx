import React from 'react';
import raturiFoundationLogo from '../../assets/Sobf Images/partners/raturiFoundation2.png';
import hinduFoundationLogo from '../../assets/Sobf Images/partners/hinduFoundation.png';
import curiousBusinessSolutions from '../../assets/Sobf Images/partners/curiousBusinessSolutions.jpg';
import { Link } from 'react-router-dom';
const Partners = () => {
  return (
    <div className="overflow-hidden mt-[30px] flex flex-col items-center ">
      <h1 className="text-center text-heading3 lg:text-heading2 font-bold my-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
        Supported by
        <hr className="mt-1 border-light-lavender border-[1px]" />
      </h1>
      <ul className=" flex items-center justify-center  mt-[20px] [&_li]:mx-2 [&_img]:max-w-none gap-[10px]">
        <Link to="https://raturi.org/">
          {' '}
          <li>
            <img
              src={raturiFoundationLogo}
              alt="raturi-foundation"
              className="cursor-pointer w-[78px] lg:w-[110px] object-cover"
            />
          </li>
        </Link>
        <Link to="https://thehindudiaspora.com/">
          <li>
            <img
              src={hinduFoundationLogo}
              alt="hindu-foundation"
              className="cursor-pointer w-[70px] lg:w-[100px] object-cover"
            />
          </li>
        </Link>
        <Link to="https://curiousdevelopers.in/">
          <li>
            <img
              src={curiousBusinessSolutions}
              alt="curious-business-solutions"
              className="cursor-pointer w-[70px] lg:w-[100px] object-cover"
            />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Partners;
