/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="w-full md:w-[90%] flex flex-col items-center lg:items-center mx-auto mt-32">

      <div className="flex flex-col lg:flex-row items-center lg:justify-center lg:gap-x-[30px] xl:gap-x-[100px] gap-y-[10px]">
        <div className="flex flex-col items-center md:items-center mx-[20px] w-[90%] lg:w-[70%] justify-center">
        <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2  font-bold mb-4 p-5 text-[#2d335d] relative  transition-all ease-in-out ">
        Privacy Policy
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>

          <div className="text-gray-700 text-justify text-[16px] lg:text-[18px] mt-2 font-workSans xl:mt-0 pb-[30px] lg:leading-[30px]">
            <p>
              This Privacy Policy is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000 and the rules made thereunder and the amended provisions pertaining to electronic documents / records in various statutes as amended by the Information Technology Act, 2000. This Privacy Policy does not require any physical, electronic or digital signature.
            </p>

            <p>
              This Privacy Policy is a legally binding document between you and <strong style={{ color: "#000", fontSize: "15px" }}>SOUL OF BRAJ FEDERATION</strong> (both terms defined below). The terms of this Privacy Policy will be effective upon your acceptance of the same (directly or indirectly in electronic form, by clicking on the I accept tab or by use of the website or by other means) and will govern the relationship between you and <strong style={{ color: "#000", fontSize: "15px" }}>SOUL OF BRAJ FEDERATION</strong> for your use of the website <strong style={{ color: "#000" }}>"Website"</strong> (defined below).
            </p>

            <p>
              This document is published and shall be construed in accordance with the provisions of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data of Information) Rules, 2011 under the Information Technology Act, 2000; that require publishing of the Privacy Policy for collection, use, storage, and transfer of sensitive personal data or information.
            </p>

            <p>
              Please read this Privacy Policy carefully. By using the Website, you indicate that you understand, agree and consent to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use this Website.
            </p>

            <p>
              By providing us your information or by making use of the facilities provided by the Website, you hereby consent to the collection, storage, processing and transfer of any or all of your Personal Information and Non-Personal Information by us as specified under this Privacy Policy. You further agree that such collection, use, storage and transfer of your Information shall not cause any loss or wrongful gain to you or any other person.
            </p>

            <h2 className="text-xl font-semibold mt-5 text-black">USER INFORMATION</h2>
            <p>
              To avail certain services on our Website, users are required to provide certain information for the registration process including: a) your name, b) email address, c) sex, d) age, e) PIN code, f) credit card or debit card details g) medical records and history h) sexual orientation, i) biometric information, j) password etc., and / or your occupation, interests, and the like. The Information as supplied by the users enables us to improve our sites and provide you the most user-friendly experience.
            </p>

            <p>
              All required information is service-dependent, and we may use the above-said user information to maintain, protect, and improve our services (including advertising services) and for developing new services. Such information will not be considered as sensitive if it is freely available and accessible in the public domain or is furnished under the Right to Information Act, 2005 or any other law for the time being in force.
            </p>

            <h2 className="text-xl font-semibold mt-5 text-black">COOKIES</h2>
            <p>
              To improve the responsiveness of the sites for our users, we may use "cookies", or similar electronic tools to collect information to assign each visitor a unique, random number as a User Identification (User ID) to understand the user's individual interests using the Identified Computer. Unless you voluntarily identify yourself (through registration, for example), we will have no way of knowing who you are, even if we assign a cookie to your computer.
            </p>

            <p>
              Our web servers automatically collect limited information about your computer's connection to the Internet, including your IP address, when you visit our site. (Your IP address is a number that lets computers attached to the Internet know where to send you data — such as the web pages you view.) Your IP address does not identify you personally. We use this information to deliver our web pages to you upon request, to tailor our site to the interests of our users, to measure traffic within our site, and let advertisers know the geographic locations from where our visitors come.
            </p>

            <h2 className="text-xl font-semibold mt-5 text-black">LINKS TO OTHER SITES</h2>
            <p>
              Our policy discloses the privacy practices for our own website only. Our site provides links to other websites that are beyond our control. We shall in no way be responsible for your use of such sites.
            </p>

            <h2 className="text-xl font-semibold mt-5 text-black">INFORMATION SHARING</h2>
            <p>
              We share sensitive personal information with any third party without obtaining the prior consent of the user in the following limited circumstances:
            </p>

            <ul className="list-disc ml-5">
              <li> When it is requested or required by law or by any court or governmental agency or authority to disclose, for the purpose of verification of identity, or for the prevention, detection, investigation including cyber incidents, or for prosecution and punishment of offences.</li>
              <li> We propose to share such information within its group companies and officers and employees of such group companies for the purpose of processing personal information on its behalf.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-5 text-black">INFORMATION SECURITY</h2>
            <p>
              We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of data. These include internal reviews of our data collection, storage and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data.
            </p>

           <br />
            <p>
              <strong><a href="http://www.soulofbrajfederation.org">www.soulofbrajfederation.org</a></strong>
            </p>
            <p>
              <strong>SOUL OF BRAJ FEDERATION</strong><br />
              <strong>Sri Krishna Greens</strong><br />
              <strong>Vrindavan, Mathura</strong><br />
              <strong>Pin-281121</strong><br />
              <strong>Email: <a href="mailto:soulofbrajfederation@gmail.com">soulofbrajfederation@gmail.com</a></strong><br />
              <strong>Ph: +91 6395897780</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
