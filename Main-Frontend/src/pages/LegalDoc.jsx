import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLegalDocuments } from '../Reducers/legalDocSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import hardCodedLegalDocs from '../defaultData/legal-doc.json';

const LegalDoc = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { legalDocs, status, error } = useSelector((state) => state.legalDocs);
  const docsToShow = legalDocs?.length > 0 ? legalDocs : hardCodedLegalDocs;
  useEffect(() => {
    if (location.pathname === '/legal-doc') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLegalDocuments());
    }
  }, [status, dispatch]);

  // Function to show download progress using toast
  const handleDownload = async (url, title) => {
    const toastId = toast.loading(`Downloading ${title}...`);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch document');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', title || 'document.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);

      toast.update(toastId, {
        render: `${title} downloaded successfully!`,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast.update(toastId, {
        render: 'Download failed! Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className={`flex flex-col items-center mb-[30px] ${location.pathname === '/legal-doc' ? 'mt-[150px]' : 'mt-[30px]'}`}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-[27px] small-range:text-[30px] md:text-heading3 lg:text-heading2 font-bold mb-4 text-[#2d335d]">
        Our Legal Documents
        <hr className="mt-1 border hover:border-light-lavender hover:border-[1px]" />
      </h1>
      <p className="text-center text-lg lg:text-xl mb-8 text-gray-600 px-3">
        Below, you will find important legal documents that showcase our NGO’s
        mission, goals, and legal standing.
      </p>

      {status === 'loading' && <p>Loading Documents...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-8 justify-center items-stretch p-5">
        {docsToShow.map((doc) => (
          <div
            key={doc._id || doc.title}
            className="flex flex-col items-stretch justify-between mb-8 w-full sm:w-[48%] md:w-[500px] lg:w-[450px] p-6 border border-gray-300 bg-white shadow-xl rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {doc.title}
              </h2>
              <p className="text-gray-600 mb-6">{doc.description}</p>
            </div>

            <div className="mt-auto flex justify-end gap-3 items-center">
              <a
                href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                  doc.fileName,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-peacock-green text-white rounded-md hover:bg-teal-400 transition-colors font-bold"
              >
                View
              </a>

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
    </div>
  );
};

export default LegalDoc;
