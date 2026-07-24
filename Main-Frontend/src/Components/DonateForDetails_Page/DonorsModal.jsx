import React from 'react';
import DonorCard from '@/helper/DonorCard';

const DonorsModal = ({
  donors = [],
  showAllDonors,
  setShowAllDonors,
}) => {
  if (!showAllDonors) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              All Donors
            </h2>

            <button
              onClick={() => setShowAllDonors(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {donors.length > 0 ? (
              donors.map((donor, index) => (
                <DonorCard
                  key={donor._id || index}
                  donor={donor}
                />
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No donors available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorsModal;