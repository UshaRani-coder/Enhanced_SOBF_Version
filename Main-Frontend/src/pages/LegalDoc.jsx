import React from 'react';
import { Link } from "react-router-dom"
import SOBF_Incorporation from "../assets/SOBF_Incorporation.PDF"
import NGO_Darpan from "../assets/NGO_Darpan.pdf"
import MOA_compressed from "../assets/MOA_compressed.pdf"
import { useLocation } from "react-router-dom";

const LegalDoc = () => {
  const location = useLocation();
  const documents = [
    {
      title: 'NGO Darpan Details',
      description: 'Get detailed information about our NGO registered with the Darpan portal, including mission and compliance data.',
      viewLink: NGO_Darpan,
      downloadLink: NGO_Darpan,
    },
    {
      title: 'Certificate of Incorporation',
      description: 'Access the official Certificate of Incorporation, confirming our legal status and date of establishment.',
      viewLink: SOBF_Incorporation,
      downloadLink: SOBF_Incorporation,
    },
    {
      title: 'Memorandum of Association (MOA)',
      description: 'Read the Memorandum of Association to understand the aims, objectives, and rules governing our NGO.',
      viewLink: MOA_compressed,
      downloadLink: MOA_compressed,
    }
  ];

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${location.pathname === "/legal-doc" ? "mt-[120px]" : "mt-[30px]"
        }`}
    >
      <h1 className="inline-block text-[30px] md:text-heading3 lg:text-heading2 font-bold mb-4 p-5 text-[#2d335d] relative transition-all ease-in-out">
        Our Legal Documnets 
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <p className="text-center text-lg lg:text-xl mb-8 text-gray-600 max-w-3xl mx-auto p-5">
        Below, you will find important legal documents that showcase our NGO’s mission, goals, and legal standing. Feel free to view or download them for more information.
      </p>
      <div className='flex flex-wrap gap-8 justify-center items-stretch p-5'>
        {documents.map((doc, idx) => (
          <div key={idx} className="flex flex-col justify-between mb-8 w-full sm:w-[48%] lg:w-[30%] p-6 border border-gray-300 bg-white shadow-xl rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{doc.title}</h2>
              <p className="text-gray-600 mb-6">{doc.description}</p>
            </div>
            <div className="mt-auto flex justify-end gap-3 items-center">
              <Link to={doc.viewLink} className="px-4 py-2 bg-peacock-green text-white rounded-md hover:bg-blue-700 transition-colors" target="_blank" rel="noopener noreferrer">
                View
              </Link>
              <a href={doc.downloadLink} download className="px-4 py-2 bg-logoYellow text-white rounded-md hover:bg-logoYellow transition-colors">
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalDoc;
