import React from 'react';
import ShareButton from '@/components/common_components/ShareButton';
import DonorCard from '@/helper/DonorCard';
import {
  parseAmount,
  getDonationProgress,
} from '@/helper/donationHelpers.js';
const DonationDetails = ({
  currentDonation,

  setShowAllDonors,
}) => {
  const title = 'Support Braj Seva – Be one in a million';

  const baseURL =
    window.location.origin === 'https://sobf.in'
      ? 'https://sobf.in'
      : window.location.origin;
const raised = parseAmount(
  currentDonation?.raised ??
  currentDonation?.category?.raised
);

const goal = parseAmount(
  currentDonation?.goal ??
  currentDonation?.category?.goal
);

const progress = getDonationProgress(
  raised,
  goal
);

const donor = currentDonation?.category?.donor || [];

const displayedDonors = donor.slice(0, 4);
  return (
    <div className="lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={currentDonation?.category?.image}
          alt={currentDonation?.category?.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {currentDonation?.title}
        </h1>

        {/* Title + Share */}
        <div className="mb-4 flex justify-between">
          <p className="text-gray-700 text-xl font-bold whitespace-pre-line">
            {currentDonation?.category?.title}
          </p>

          <div onClick={(e) => e.stopPropagation()}>
            <ShareButton
              title={title}
              url={`${baseURL}/donate/${currentDonation?.category?._id}`}
              className="px-3 py-[7px] md:py-[9px] border-0 text-xs md:text-sm mb-3 inline-block font-bold rounded-full shadow-md bg-gradient-to-r from-indigo-400 to-indigo-600 text-white hover:from-indigo-500 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Description */}
        {currentDonation?.category?.description && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-1">
              About the cause:
            </h3>

            <p className="text-gray-600 whitespace-pre-line">
              {currentDonation?.category?.description}
            </p>
          </div>
        )}

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">
              {(progress || 0).toFixed(0)}% funded
            </span>
            <span className="text-gray-600">
              {raised} raised of {goal} goal
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Recent Donors */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800 text-lg">
              Recent Donors
            </h3>

            {donor.length > 3 && (
              <button
                onClick={() => setShowAllDonors(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                See All ({donor.length})
              </button>
            )}
          </div>

          {donor.length > 0 ? (
            <div className="space-y-3">
              {displayedDonors.map((donor, index) => (
                <DonorCard key={index} donor={donor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>

              <h4 className="mt-2 text-sm font-medium text-gray-700">
                No donors yet
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Be the first to support this cause!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
