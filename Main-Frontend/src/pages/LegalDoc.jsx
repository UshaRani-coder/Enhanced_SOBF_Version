import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLegalDocuments } from '../Reducers/legalDocSlice';
import { useLocation } from 'react-router-dom';

const LegalDoc = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { legalDocs, status, error } = useSelector((state) => state.legalDocs); 


  useEffect(() => {
    if (location.pathname === '/legal-doc') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  // Dispatching the getLegalDocuments action when status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLegalDocuments());
    }
  }, [status, dispatch]);

  // Function to force file download via Blob
  const handleDownload = async (url, title) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf', // Adjust based on file type
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the document.');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', title || 'document.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${
        location.pathname === '/legal-doc' ? 'mt-[150px]' : 'mt-[30px]'
      }`}
    >
      <h1 className=" text-[30px] md:text-heading3 lg:text-heading2 font-bold mb-4 text-[#2d335d]   transition-all ease-in-out">
        Our Legal Documents
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <p className="text-center text-lg lg:text-xl mb-8 text-gray-600  px-3">
        Below, you will find important legal documents that showcase our NGO’s
        mission, goals, and legal standing. Feel free to view or download them
        for more information.
      </p>
      {status === 'loading' && <p>Loading Documents...</p>}

      {/* Ensure legalDocs is an array and has elements */}
      {legalDocs?.length > 0 ? (
        <div className="flex flex-wrap gap-8 justify-center items-stretch p-5">
          {legalDocs.map((doc) => (
            <div
              key={doc._id} // Ensure _id exists in `doc`
              className="flex flex-col items-stretch justify-between mb-8 w-full sm:w-[48%] md:w-[500px] lg:w-[450px] p-6 border border-gray-300 bg-white shadow-xl rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  {doc.title}
                </h2>
                <p className="text-gray-600 mb-6">{doc.description}</p>
              </div>
              <div className="mt-auto flex justify-end gap-3 items-center">
                <Link
                  to={doc.fileName} // Use fileName to view document
                  className="px-4 py-2 bg-peacock-green text-white rounded-md hover:bg-teal-400 transition-colors font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDownload(doc.fileName, doc.title)}
                  className="px-4 py-2 bg-logoYellow text-white rounded-md hover:bg-yellow-600 transition-colors font-bold"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No documents available</p>
      )}
    </div>
  );
};

export default LegalDoc;

