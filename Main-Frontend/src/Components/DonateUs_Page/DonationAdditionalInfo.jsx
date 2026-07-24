import React from "react";

const DonationAdditionalInfo = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* Address Field */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Address
        </label>

        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          className="  w-full  border  border-gray-300  rounded-md  p-3 focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue  transition "
        />
      </div>


      {/* PAN Number Field */}
      <div>
        <label
          htmlFor="panNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          PAN Number
          <span className="text-gray-500 text-xs ml-1">
            (for 80G receipt)
          </span>
        </label>

        <input
          type="text"
          id="panNumber"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          placeholder="Enter PAN number"
          maxLength={10}
          className=" w-full border border-gray-300  rounded-md p-3 uppercase  focus:outline-none  focus:ring-2 focus:ring-blue focus:border-blue  transition "
        />
      </div>


    </div>
  );
};


export default DonationAdditionalInfo;