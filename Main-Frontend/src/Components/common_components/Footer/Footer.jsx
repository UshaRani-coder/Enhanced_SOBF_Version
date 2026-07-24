import sobfLogo from '@/assets/sobfLogo.png';
import { Link } from 'react-router-dom';
import ContactInfo from './ContactInfo.jsx';
import SocialIcons from './SocialIcons.jsx';
import FooterSection from './FooterSection.jsx';
import { services, legalLinks } from './footerData';

const Footer = () => {
  return (
    <footer className="text-start text-slate-500 w-full z-[10] relative">
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
                <img src={sobfLogo} className="h-12 sm:h-16" alt="Logo" />
              </Link>
              <p className="text-gray-400 font-bold text-[15px] p-3">
                Serving in Braj is equivalent to serving Krishna.
              </p>

              {/* Address below logo*/}

              <ContactInfo />
            </div>

            {/* Navigation sections */}
            <div className="lg:col-span-8">
              <div className="flex justify-start lg:ml-[20%]">
                <div className="grid grid-cols-1 gap-20 sm:gap-20 sm:grid-cols-2">
                  {/* Service links */}
                  <FooterSection title="Services" links={services} />
                  {/* Legal links */}

                  <FooterSection title="Legal" links={legalLinks} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className=" w-full h-auto py-4 flex items-center justify-center gap-3 flex-wrap">
          <SocialIcons />
        </div>
      </div>
      {/* End of main footer */}

      {/* Bottom footer */}
      <div className="border-t border-t-[#3c3c3c] py-2 text-xs text-center text-gray-400 bg-[#101840]">
        <div className="container px-4 mx-auto">
          <p>© 2024 Soul of Braj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
