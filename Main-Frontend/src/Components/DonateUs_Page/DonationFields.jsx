import React from 'react';

const DonationFields = ({ formData, handleChange }) => {
  return (
    <>
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          className=" w-full border  border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition "
          required
        />
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className=" w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition "
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue  transition"
            required
          />
        </div>
      </div>
    </>
  );
};

export default DonationFields;
