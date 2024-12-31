import sobfLogo from "../../assets/sobfLogo.avif";
import { Link } from "react-router-dom";
import LegalDoc from "../../pages/LegalDoc";
// import { Services } from '/src/Components/Home_Section/Services.jsx';
const Footer = () => {
  const handleRedirectMap = () => {
    window.open(
      "https://google.com/maps/place/Soul+Of+Braj+Federation/@27.564868,77.672604,16z/data=!4m6!3m5!1s0x39736fffb9ab491f:0xf32c290c550ecc7b!8m2!3d27.5648675!4d77.6726042!16s%2Fg%2F11jk5x0qcw?hl=en&entry=ttu",
      "_blank"
    );
  };
  const handleRedirectMail = () => window.open("mailto:soulofbraj@gmail.com", "_blank");
  const handleRedirectCall = () => window.open("tel:+91 8439406670", "_blank");
  const handleRedirectFacebook = () => window.open("https://www.facebook.com/soulofbraj/", "_blank");
  const handleRedirectInstagram = () => window.open("https://www.instagram.com/soulofbraj/?hl=en", "_blank");
  const handleRedirectWhatsapp = () => window.open("https://wa.me/918439406670", "_blank");
  const handleRedirectLinkedIn = () => window.open("https://www.linkedin.com/company/soulofbraj/", "_blank");
  const handleRedirectYoutube = () => window.open("https://www.youtube.com/@sobf", "_blank");  


  return (
    <footer className="text-start text-slate-500 w-full">
      {/* Main footer */}
      <div className="pt-16 text-sm border-t bg-[#101840] max-w-full justify-start font-poppins">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Logo, slogan and contact information */}
            <div className="lg:col-span-4">
              <Link
                id="WindUI-5-logo"
                aria-label="WindUI logo"
                aria-current="page"
                className="flex items-center gap-2 mb-3 text-base font-medium leading-6 whitespace-nowrap focus:outline-none text-black hover:text-[#8800ff]"
                href="/"
              >
                <img
                  src= {sobfLogo}
                  className="h-12 sm:h-16"
                  alt="Logo"
                />
              </Link>
              <p className="text-gray-400 font-bold text-[15px] p-3">
                Serving in Braj is equivalent to serving Krishna.
              </p>

              {/* Address below logo*/}
              <Link onClick={handleRedirectMap} >
              <p className="mb-4 flex items-center justify-center md:justify-start hover:text-gray-300">
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
              </Link>

              {/* Email below logo */}
              <Link onClick={handleRedirectMail} >
              <p className="mb-4 flex items-center justify-start md:justify-start hover:text-gray-300">
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
              </Link>

              {/* Phone below logo*/}
              <Link onClick={handleRedirectCall}>
              <p className="mb-4 flex items-center justify-start md:justify-start hover:text-gray-300">
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
              </Link>
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
                        <Link
                          to="/community-service"
                          className="transition-colors duration-300 hover:text-white focus:text-white"
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                          Community Service
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                        <Link
                          to="/anna-vitran-seva"
                          className="transition-colors duration-300 hover:text-white focus:text-white"
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                          Anna Vitran Seva
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                      <Link
                        to="/swachh-vrindavan"
                        className="transition-colors duration-300 hover:text-white focus:text-white"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        Swachh & Swasth Vrindavan
                      </Link>
                    </li>

                    <li className="mb-2 leading-6">
                      <Link
                        to="/brajkulam"
                        className="transition-colors duration-300 hover:text-white focus:text-white"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        Brajkulam Education Center
                      </Link>
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
                        <Link href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          About us
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                        <Link href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Services
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                        <Link href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Contact Us
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                        <Link href="#" className="transition-colors duration-300 hover:text-white focus:text-white">
                          Volunteering
                        </Link>
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
                        <Link to="/privacy-policy" className="transition-colors duration-300 hover:text-white focus:text-white"
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                        <Link to="/terms-and-conditions" className="transition-colors duration-300 hover:text-white focus:text-white"
                         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                          Terms & Conditions
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                        <Link to="/refund-policy" className="transition-colors duration-300 hover:text-white focus:text-white"
                         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                          Refund Policy
                        </Link>
                      </li>
                      <li className="mb-2 leading-6">
                        <Link
                          to="/legal-doc"
                          className="transition-colors duration-300 hover:text-white focus:text-white"
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                          Legal Documents
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

              {/* Social Icons */}

      <div className=" w-full h-auto py-4 flex items-center justify-center gap-3 flex-wrap">
      {/* Facebook */}
      <Link onClick={handleRedirectFacebook} 
      className="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 71 72"
      fill="none">
      <path
        d="M46.4233 38.6403L47.7279 30.3588H39.6917V24.9759C39.6917 22.7114 40.8137 20.4987 44.4013 20.4987H48.1063V13.4465C45.9486 13.1028 43.7685 12.9168 41.5834 12.8901C34.9692 12.8901 30.651 16.8626 30.651 24.0442V30.3588H23.3193V38.6403H30.651V58.671H39.6917V38.6403H46.4233Z"
        fill="#111827" />
      </svg>
      </Link>
      {/* Instagram */}
      <Link onClick={handleRedirectInstagram} 
      className="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 71 72"
      fill="none">
      <path
        d="M27.3762 35.7808C27.3762 31.1786 31.1083 27.4468 35.7132 27.4468C40.3182 27.4468 44.0522 31.1786 44.0522 35.7808C44.0522 40.383 40.3182 44.1148 35.7132 44.1148C31.1083 44.1148 27.3762 40.383 27.3762 35.7808ZM22.8683 35.7808C22.8683 42.8708 28.619 48.618 35.7132 48.618C42.8075 48.618 48.5581 42.8708 48.5581 35.7808C48.5581 28.6908 42.8075 22.9436 35.7132 22.9436C28.619 22.9436 22.8683 28.6908 22.8683 35.7808ZM46.0648 22.4346C46.0646 23.0279 46.2404 23.608 46.5701 24.1015C46.8997 24.595 47.3684 24.9797 47.9168 25.2069C48.4652 25.4342 49.0688 25.4939 49.6511 25.3784C50.2334 25.2628 50.7684 24.9773 51.1884 24.5579C51.6084 24.1385 51.8945 23.6041 52.0105 23.0222C52.1266 22.4403 52.0674 21.8371 51.8404 21.2888C51.6134 20.7406 51.2289 20.2719 50.7354 19.942C50.2418 19.6122 49.6615 19.436 49.0679 19.4358H49.0667C48.2708 19.4361 47.5077 19.7522 46.9449 20.3144C46.3821 20.8767 46.0655 21.6392 46.0648 22.4346ZM25.6072 56.1302C23.1683 56.0192 21.8427 55.6132 20.9618 55.2702C19.7939 54.8158 18.9606 54.2746 18.0845 53.4002C17.2083 52.5258 16.666 51.6938 16.2133 50.5266C15.8699 49.6466 15.4637 48.3214 15.3528 45.884C15.2316 43.2488 15.2073 42.4572 15.2073 35.781C15.2073 29.1048 15.2336 28.3154 15.3528 25.678C15.4639 23.2406 15.8731 21.918 16.2133 21.0354C16.668 19.8682 17.2095 19.0354 18.0845 18.1598C18.9594 17.2842 19.7919 16.7422 20.9618 16.2898C21.8423 15.9466 23.1683 15.5406 25.6072 15.4298C28.244 15.3086 29.036 15.2844 35.7132 15.2844C42.3904 15.2844 43.1833 15.3106 45.8223 15.4298C48.2612 15.5408 49.5846 15.9498 50.4677 16.2898C51.6356 16.7422 52.4689 17.2854 53.345 18.1598C54.2211 19.0342 54.7615 19.8682 55.2161 21.0354C55.5595 21.9154 55.9658 23.2406 56.0767 25.678C56.1979 28.3154 56.2221 29.1048 56.2221 35.781C56.2221 42.4572 56.1979 43.2466 56.0767 45.884C55.9656 48.3214 55.5573 49.6462 55.2161 50.5266C54.7615 51.6938 54.2199 52.5266 53.345 53.4002C52.4701 54.2738 51.6356 54.8158 50.4677 55.2702C49.5872 55.6134 48.2612 56.0194 45.8223 56.1302C43.1855 56.2514 42.3934 56.2756 35.7132 56.2756C29.033 56.2756 28.2432 56.2514 25.6072 56.1302ZM25.4001 10.9322C22.7371 11.0534 20.9174 11.4754 19.3282 12.0934C17.6824 12.7316 16.2892 13.5878 14.897 14.977C13.5047 16.3662 12.6502 17.7608 12.0116 19.4056C11.3933 20.9948 10.971 22.8124 10.8497 25.4738C10.7265 28.1394 10.6982 28.9916 10.6982 35.7808C10.6982 42.57 10.7265 43.4222 10.8497 46.0878C10.971 48.7494 11.3933 50.5668 12.0116 52.156C12.6502 53.7998 13.5049 55.196 14.897 56.5846C16.289 57.9732 17.6824 58.8282 19.3282 59.4682C20.9204 60.0862 22.7371 60.5082 25.4001 60.6294C28.0687 60.7506 28.92 60.7808 35.7132 60.7808C42.5065 60.7808 43.3592 60.7526 46.0264 60.6294C48.6896 60.5082 50.5081 60.0862 52.0983 59.4682C53.7431 58.8282 55.1373 57.9738 56.5295 56.5846C57.9218 55.1954 58.7745 53.7998 59.4149 52.156C60.0332 50.5668 60.4575 48.7492 60.5768 46.0878C60.698 43.4202 60.7262 42.57 60.7262 35.7808C60.7262 28.9916 60.698 28.1394 60.5768 25.4738C60.4555 22.8122 60.0332 20.9938 59.4149 19.4056C58.7745 17.7618 57.9196 16.3684 56.5295 14.977C55.1395 13.5856 53.7431 12.7316 52.1003 12.0934C50.5081 11.4754 48.6894 11.0514 46.0284 10.9322C43.3612 10.811 42.5085 10.7808 35.7152 10.7808C28.922 10.7808 28.0687 10.809 25.4001 10.9322Z"
        fill="#111827" />
      </svg>
      </Link>
      {/* Twitter */}
      {/* <Link href="javascript:;"
      class="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 72 72"
      fill="none">
      <path
        d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
        fill="#111827" />
      </svg>
      </Link> */}
      {/* Whatsapp */}
      <Link onClick={handleRedirectWhatsapp}  rel="noopener noreferrer"
      className="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 71 72"
      fill="none">
      <path
        d="M12.5068 56.8405L15.7915 44.6381C13.1425 39.8847 12.3009 34.3378 13.4211 29.0154C14.5413 23.693 17.5482 18.952 21.89 15.6624C26.2319 12.3729 31.6173 10.7554 37.0583 11.1068C42.4992 11.4582 47.6306 13.755 51.5108 17.5756C55.3911 21.3962 57.7599 26.4844 58.1826 31.9065C58.6053 37.3286 57.0535 42.7208 53.812 47.0938C50.5705 51.4668 45.8568 54.5271 40.5357 55.7133C35.2146 56.8994 29.6432 56.1318 24.8438 53.5513L12.5068 56.8405ZM25.4386 48.985L26.2016 49.4365C29.6779 51.4918 33.7382 52.3423 37.7498 51.8555C41.7613 51.3687 45.4987 49.5719 48.3796 46.7452C51.2605 43.9185 53.123 40.2206 53.6769 36.2279C54.2308 32.2351 53.445 28.1717 51.4419 24.6709C49.4388 21.1701 46.331 18.4285 42.6027 16.8734C38.8745 15.3184 34.7352 15.0372 30.8299 16.0736C26.9247 17.11 23.4729 19.4059 21.0124 22.6035C18.5519 25.801 17.2209 29.7206 17.2269 33.7514C17.2237 37.0937 18.1503 40.3712 19.9038 43.2192L20.3823 44.0061L18.546 50.8167L25.4386 48.985Z"
        fill="#111827" />
      <path fillRule="evenodd" clipRule="evenodd"
        d="M43.9566 36.8847C43.5093 36.5249 42.9856 36.2716 42.4254 36.1442C41.8651 36.0168 41.2831 36.0186 40.7236 36.1495C39.8831 36.4977 39.3399 37.8134 38.7968 38.4713C38.6823 38.629 38.514 38.7396 38.3235 38.7823C38.133 38.8251 37.9335 38.797 37.7623 38.7034C34.6849 37.5012 32.1055 35.2965 30.4429 32.4475C30.3011 32.2697 30.2339 32.044 30.2557 31.8178C30.2774 31.5916 30.3862 31.3827 30.5593 31.235C31.165 30.6368 31.6098 29.8959 31.8524 29.0809C31.9063 28.1818 31.6998 27.2863 31.2576 26.5011C30.9157 25.4002 30.265 24.42 29.3825 23.6762C28.9273 23.472 28.4225 23.4036 27.9292 23.4791C27.4359 23.5546 26.975 23.7709 26.6021 24.1019C25.9548 24.6589 25.4411 25.3537 25.0987 26.135C24.7562 26.9163 24.5939 27.7643 24.6236 28.6165C24.6256 29.0951 24.6864 29.5716 24.8046 30.0354C25.1049 31.1497 25.5667 32.2144 26.1754 33.1956C26.6145 33.9473 27.0937 34.6749 27.6108 35.3755C29.2914 37.6767 31.4038 39.6305 33.831 41.1284C35.049 41.8897 36.3507 42.5086 37.7105 42.973C39.1231 43.6117 40.6827 43.8568 42.2237 43.6824C43.1018 43.5499 43.9337 43.2041 44.6462 42.6755C45.3588 42.1469 45.9302 41.4518 46.3102 40.6512C46.5334 40.1675 46.6012 39.6269 46.5042 39.1033C46.2714 38.0327 44.836 37.4007 43.9566 36.8847Z"
        fill="#111827" />
      </svg>
      </Link>
      {/* LinkedIn */}
      <Link onClick={handleRedirectLinkedIn} 
      className="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 72 72"
      fill="none">
      <path
        d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z"
        fill="#111827" />
      </svg>
      </Link>
     {/* Telegram */}
      {/* <Link href="https://t.me/918439406670"  rel="noopener noreferrer"
      class="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 72 72"
      fill="none">
      <path
        d="M17.5822 33.5652C17.5822 33.5652 36.2102 25.7194 42.6707 22.9567C45.1473 21.8518 53.546 18.3155 53.546 18.3155C53.546 18.3155 57.4224 16.7685 57.0993 20.5256C56.9916 22.0728 56.1302 27.4874 55.2688 33.3442C53.9767 41.6322 52.5769 50.6935 52.5769 50.6935C52.5769 50.6935 52.3615 53.2352 50.5311 53.6772C48.7006 54.1192 45.6856 52.1302 45.1473 51.6881C44.7165 51.3566 37.0715 46.3838 34.272 43.9527C33.5182 43.2897 32.6569 41.9637 34.3796 40.4166C38.256 36.7699 42.886 32.2392 45.6856 29.3661C46.9778 28.04 48.2698 24.9459 42.886 28.703C35.2411 34.1178 27.7038 39.201 27.7038 39.201C27.7038 39.201 25.9809 40.306 22.7507 39.3115C19.5203 38.317 15.7516 36.9909 15.7516 36.9909C15.7516 36.9909 13.1675 35.3334 17.5822 33.5652Z"
        fill="#111827" />
      </svg>
      </Link> */}
      {/* Gmail */}
      <Link onClick={handleRedirectMail} 
      className="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 72 72"
      fill="none">
      <path
        d="M11.9362 56.1235H20.4189V35.5227L8.30078 26.434V52.4881C8.30078 54.4997 9.93067 56.1235 11.9362 56.1235Z"
        fill="#111827" />
      <path
        d="M49.5025 56.1235H57.9853C59.9969 56.1235 61.6207 54.4936 61.6207 52.4881V26.434L49.5025 35.5227"
        fill="#111827" />
      <path
        d="M49.5025 19.7693V35.5227L61.6207 26.434V21.587C61.6207 17.0912 56.4887 14.5282 52.8956 17.2245"
        fill="#111827" />
      <path d="M20.4189 35.5227V19.769L34.9607 30.6754L49.5025 19.7693V35.5227L34.9607 46.429"
        fill="#111827" />
      <path
        d="M8.30078 21.587V26.434L20.4189 35.5227V19.769L17.0259 17.2245C13.4268 14.5282 8.30078 17.0912 8.30078 21.587Z"
        fill="#111827" />
      </svg>
      </Link>
      {/* Youtube */}
      <Link onClick={handleRedirectYoutube} 
      className="p-2 rounded-lg flex items-center border bg-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 71 71"
      fill="none">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M56.5615 18.2428C58.8115 18.8504 60.58 20.6234 61.1778 22.8708C62.2654 26.9495 62.2654 35.4647 62.2654 35.4647C62.2654 35.4647 62.2654 43.98 61.1778 48.0586C60.5717 50.3144 58.8032 52.0873 56.5615 52.6866C52.4932 53.7771 36.1703 53.7771 36.1703 53.7771C36.1703 53.7771 19.8557 53.7771 15.7791 52.6866C13.5291 52.079 11.7606 50.306 11.1628 48.0586C10.0752 43.98 10.0752 35.4647 10.0752 35.4647C10.0752 35.4647 10.0752 26.9495 11.1628 22.8708C11.7689 20.615 13.5374 18.8421 15.7791 18.2428C19.8557 17.1523 36.1703 17.1523 36.1703 17.1523C36.1703 17.1523 52.4932 17.1523 56.5615 18.2428ZM44.5142 35.4647L30.9561 43.314V27.6154L44.5142 35.4647Z"
        fill="#111827" />
      </svg>
      </Link>
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
