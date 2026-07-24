import React from 'react';
import { presetAmounts } from './donationConstants';

const DonationAmount = ({
  formData,
  setFormData,
  showCustomAmount,
  setShowCustomAmount,
}) => {
    
  const handlePresetAmount = (amount) => {
    setFormData((prev) => ({
      ...prev,
      donationAmount: amount,
    }));

    setShowCustomAmount(false);
  };

  const handleCustomToggle = () => {
    setShowCustomAmount((prev) => !prev);

    if (!showCustomAmount) {
      setFormData((prev) => ({
        ...prev,
        donationAmount: '',
      }));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      donationAmount: e.target.value,
    }));
  };

  return (
    <div>
      <label
        htmlFor="donationAmount"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Donation Amount (₹)
        <span className="text-red-500">*</span>
      </label>

      {!showCustomAmount ? (
        <>
          {/* Preset Amount Buttons */}
          <div className="flex flex-wrap gap-3 mb-3">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePresetAmount(amount)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  Number(formData.donationAmount) === amount
                    ? 'bg-blue text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCustomToggle}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Enter custom amount
          </button>
        </>
      ) : (
        <div>
          <input
            type="number"
            id="donationAmount"
            name="donationAmount"
            value={formData.donationAmount}
            onChange={handleChange}
            placeholder="Enter custom amount"
            min="1"
            className="
              w-full
              border
              border-gray-300
              rounded-md
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue
              focus:border-blue
              transition
            "
          />

          <button
            type="button"
            onClick={handleCustomToggle}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium mt-2"
          >
            ← Back to preset amounts
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationAmount;
