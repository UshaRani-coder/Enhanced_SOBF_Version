import React from 'react';
import { donationPurposes } from './donationConstants';

const DonationPurpose = ({ formData, handleChange }) => {
  return (
    <div>
      <label
        htmlFor="donationFor"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Donation Purpose <span className="text-red-500">*</span>
      </label>

      <select
        id="donationFor"
        name="donationFor"
        value={formData.donationFor}
        onChange={handleChange}
        className=" w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition"
        required
      >
        <option value="">Select a purpose</option>

        {donationPurposes.map((purpose) => (
          <option key={purpose} value={purpose}>
            {purpose}
          </option>
        ))}
      </select>

      {/* Show note only when Other is selected */}
      {formData.donationFor === 'Other' && (
        <input
          type="text"
          id="otherPurposeNote"
          name="otherPurposeNote"
          placeholder="Please specify your donation purpose"
          value={formData.otherPurposeNote}
          onChange={handleChange}
          className=" w-full border border-gray-300 rounded-md p-3 mt-3 focus:ring-2 focus:ring-blue focus:border-blue transition"
          required
        />
      )}
    </div>
  );
};

export default DonationPurpose;
