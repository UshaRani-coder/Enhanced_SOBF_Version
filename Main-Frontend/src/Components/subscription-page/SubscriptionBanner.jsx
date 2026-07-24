import React from 'react';
import subscriptionImage from '@/assets/subscription.jpeg';

const SubscriptionBanner = () => {
  return (
    <div className="lg:w-1/2 bg-gradient-to-br from-amber-100 to-amber-50 p-6 md:p-8 flex flex-col justify-center">
      {/* Image */}
      <div className="rounded-lg overflow-hidden mb-6">
        <img
          src={subscriptionImage}
          alt="Braj Seva"
          className="lg:w-full lg:h-auto object-cover"
        />
      </div>

      {/* Mission Content */}
      <div className="space-y-4 text-gray-800 bg-amber-50 p-4 rounded-lg shadow-inner">
        <div className="text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-snug">
            <span className="text-amber-700 font-extrabold">
              Be one in a million.
            </span>
            <br />
            Let your <span className="font-semibold text-amber-800">
              ₹11
            </span>{' '}
            become a ripple of change —
            <br className="hidden sm:block" />
            for <span className="italic">Braj</span>, for{' '}
            <span className="italic">Seva</span>, for the{' '}
            <span className="italic">Soul</span>. 💛
          </h3>
        </div>

        {/* Hashtags */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 
            gap-x-6 gap-y-2 
            text-sm sm:text-base 
            font-semibold 
            text-gray-700 
            mt-2
          "
        >
          <div className="flex items-start">
            <span className="text-amber-600 mr-2 font-bold text-base sm:text-lg">
              #
            </span>

            <span className="tracking-wide">Mission1Million</span>
          </div>

          <div className="flex items-start">
            <span className="text-amber-600 mr-2 font-bold text-base sm:text-lg">
              #
            </span>

            <span className="tracking-wide">SupportBrajSeva</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
