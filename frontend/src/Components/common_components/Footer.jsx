const Footer = () => {
  return (
    <footer className="text-start text-slate-500 w-full">
      {/* Main footer */}
      <div className="pt-16 pb-12 text-sm border-t bg-[#101840] max-w-full justify-start font-poppins">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Logo, slogan and contact information */}
            <div className="lg:col-span-4">
              <a
                id="WindUI-5-logo"
                aria-label="WindUI logo"
                aria-current="page"
                className="flex items-center gap-2 mb-3 text-base font-medium leading-6 whitespace-nowrap focus:outline-none text-black hover:text-[#8800ff]"
                href="#"
              >
                <img
                  src="https://www.sobf.in/images/BRAJ%20WHITE.png"
                  className="h-12 sm:h-16"
                  alt="Logo"
                />
              </a>
              <p className="text-gray-400 font-bold text-[15px] p-3">
                Serving in Braj is equivalent to serving Krishna.
              </p>

              {/* Address below logo*/}
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                </span>
                Soul of Braj Federation Chaitnya Vihar Phase-2, Plot No : 9-10,
                Near Electric Sub Station, Durga Mandir, Vrindavan, UttarPradesh
                281121
              </p>

              {/* Email below logo */}
              <p className="mb-4 flex items-center justify-start md:justify-start">
                <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </span>
                soulofbraj@gmail.com
              </p>

              {/* Phone below logo*/}
              <p className="mb-4 flex items-center justify-start md:justify-start">
                <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                +91 8439406670
              </p>
            </div>

            {/* Navigation sections */}
            <div className="lg:col-span-8">
              <div className="flex justify-start lg:ml-[20%]">
                <div className="grid grid-cols-1 gap-20 sm:gap-20 sm:grid-cols-2">
                  {/* Product links */}
                  <nav aria-labelledby="footer-product-5-logo">
                    <h3 className="mb-6 text-base font-medium text-gray-300 text-[20px]" id="footer-product-5-logo">

                      Services
                    </h3>
                    <ul>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Community Service
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Gopala Bhog
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Swachh & Swasth Vrindavan
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Brajkulam Community Center
                        </a>
                      </li>
                    </ul>
                  </nav>

                  {/* About us links
                  <nav className="lg:ml-[22%] md:ml-[25%]" aria-labelledby="footer-about-5-logo">
                    <h3 className="mb-6 text-base font-medium text-gray-200" id="footer-about-5-logo">
                      About us
                    </h3>
                    <ul>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          About us
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Services
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Contact Us
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Volunteering
                        </a>
                      </li>
                    </ul>
                  </nav> */}

                  {/* Legal links */}
                  <nav className="lg:ml-[30%]" aria-labelledby="footer-legal-5-logo">
                    <h3 className="mb-6 text-base font-medium text-gray-200 text-[20px]" id="footer-legal-5-logo">
                      Legal
                    </h3>
                    <ul>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Privacy Policy
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Terms & Conditions
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Cookie Policy
                        </a>
                      </li>
                      <li className="mb-2 leading-6">
                        <a href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Disclaimer
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of main footer */}

      {/* Bottom footer */}
      <div className="border-t border-t-[#3c3c3c] py-2 text-xs text-center text-gray-400 bg-[#101840]">
        <div className="container px-4 mx-auto">
          <p>© 2024 Soul of Braj. All rights reserved.</p>
        </div>
      </div>
      {/* End of bottom footer */}
    </footer>
  );
};

export default Footer;
