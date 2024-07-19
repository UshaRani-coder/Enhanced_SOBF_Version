const Footer = () => {
  return (
    <footer className="text-start text-slate-500 w-full">
      {/* Main footer */}
      <div className="pt-16 pb-12 text-sm border-t bg-[#101840] max-w-full font-poppins">
        <div className="sm:container px-3 mx-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            {/* Logo, slogan and contact information */}
            <div
              className="col-span-4 md:col-span-8 lg:col-span-4"
              aria-labelledby="footer-header"
            >
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
                      fill-rule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                +91 8439406670
              </p>
            </div>

            {/* Product links */}
            <nav
              className="col-span-2 md:col-span-3 lg:col-span-3 bg-transparent ml-20"
              aria-labelledby="footer-product-5-logo"
            >
              <h3
                className="mb-6 text-base font-medium text-gray-200"
                id="footer-product-5-logo"
              >
                Product
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Community Service
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Gopala Bhog
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Swachh & Swasth Vrindavan
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Brajkulam Community Center
                  </a>
                </li>
              </ul>
            </nav>

            {/* About us links */}
            <nav
              className="col-span-2 md:col-span-3 lg:col-span-2 ml-20"
              aria-labelledby="footer-about-5-logo"
            >
              <h3
                className="mb-6 text-base font-medium text-gray-200"
                id="footer-about-5-logo"
              >
                About us
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    About us
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Services
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Volunteering
                  </a>
                </li>
              </ul>
            </nav>

            {/* Legal links */}
            <nav
              className="col-span-2 md:col-span-3 lg:col-span-3 bg-transparent ml-10 md:ml-20 mx-auto text-start ml-20"
              aria-labelledby="footer-product-5-logo"
            >
              <h3
                className="mb-6 text-base font-medium text-gray-200"
                id="footer-product-5-logo"
              >
                Legal
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-white focus:text-white"
                  >
                    Legal Information
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Social media icons container */}
      <div class=" flex justify-center space-x-2 bg-[#101840]">
          {/* facebook icon */}
        <a
          href="#!"
          type="button"
          class="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:hover:bg-secondary-900"
          data-twe-ripple-init
        >
          <span class="[&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 320 512"
            >
              <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
            </svg>
          </span>
        </a>

        {/* Twitter Icon */}
        <a
          href="#!"
          type="button"
          class="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:hover:bg-secondary-900"
          data-twe-ripple-init
        >
          <span class="mx-auto [&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </span>
        </a>

        {/* Google Link */}
        <a
          href="#!"
          type="button"
          class="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0  dark:hover:bg-secondary-900"
          data-twe-ripple-init
        >
          <span class="mx-auto [&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 488 512"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </span>
        </a>

        {/* Instagram Icon */}
        <a
          href="#!"
          type="button"
          class="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0  dark:hover:bg-secondary-900"
          data-twe-ripple-init
        >
          <span class="mx-auto [&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 448 512"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
          </span>
        </a>

      </div>

      {/* Footer bottom*/}
      <div className="py-8 text-center text-xs bg-[#101840] border-b border-slate-900">
        <p className="font-poppins text-white">
          All Rights Reserved. © 2024 Soul of Braj Federation NGO.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
