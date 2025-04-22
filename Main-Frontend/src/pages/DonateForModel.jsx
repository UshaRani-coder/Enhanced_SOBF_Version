// src/components/Modal.js
import React from 'react';

const DonateForModel = ({ donation, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <span className="text-4xl mr-4">{donation.icon}</span>
              <h2 className={`${donation.textColor} text-2xl font-bold`}>
                {donation.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-700 mb-6">{donation.details}</p>

          {/* Progress Bar in Modal */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">{donation.progress}% funded</span>
              <span>{donation.raised} raised of {donation.goal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className={`h-3 rounded-full ${donation.textColor.replace('text-', 'bg-')}`}
                style={{ width: `${donation.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-semibold">Select donation amount</h3>
            <div className="grid grid-cols-3 gap-3">
              {[500, 1000, 2000].map((amount) => (
                <button
                  key={amount}
                  className={`py-2 rounded-lg border ${donation.textColor.replace('text-', 'border-')} font-medium hover:text-white hover:bg-blue`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[5000, 'Other'].map((amount) => (
                <button
                  key={amount}
                  className={`py-2 rounded-lg border ${donation.textColor.replace('text-', 'border-')} font-medium hover:text-white hover:bg-blue`}
                >
                  {amount === 'Other' ? amount : `₹${amount}`}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${donation.textColor.replace('text-', 'bg-')} hover:${donation.textColor.replace('text-', 'bg-').replace('600', '700')} transition-colors`}
          >
            Complete Donation
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateForModel;

