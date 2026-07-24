import React from 'react';
import donate from '../../assets/donateMotive.png';

const DonationBenefits = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <img
        src={donate}
        alt="Your donation can change lives"
        className="w-full h-64 object-cover"
      />

      <div className="p-8">
        {/* How Donation Helps */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          How Your Donation Helps
        </h3>

        <ul className="space-y-4 text-gray-600">
          <BenefitItem>₹501 care & feed cows / monkeys / dogs</BenefitItem>

          <BenefitItem>
            ₹1001 Yamuna Ghats and Vrindavan Cleaning Seva
          </BenefitItem>

          <BenefitItem>₹5001 Feed More than Hundred Sadhu Sanyasis</BenefitItem>

          <BenefitItem>₹10001 Your Seva Day in Shri Vrindavan Dham</BenefitItem>
        </ul>

        {/* Why Donate */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-blue mb-3">
            Why Donate to Us?
          </h4>

          <ul className="space-y-3 text-blue">
            <BenefitItem blue>90% of funds go directly to programs</BenefitItem>

            <BenefitItem blue>Transparent financial reporting</BenefitItem>

            <BenefitItem blue>
              Tax-exempt under 80G of Income Tax Act
            </BenefitItem>
          </ul>
        </div>
      </div>
    </div>
  );
};

const BenefitItem = ({ children, blue = false }) => {
  return (
    <li className="flex items-start">
      <svg
        className={`h-6 w-6 ${
          blue ? 'text-blue' : 'text-green-500'
        } mr-3 mt-0.5 flex-shrink-0`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>

      <span>{children}</span>
    </li>
  );
};

export default DonationBenefits;
