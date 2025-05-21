"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DonateForModel from "./DonateForModel";
import donate from "../assets/donateMotive.png";

export default function DonationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    donationFor: "",
    donationAmount: "",
    transactionId: "",
  });

  const [showBankDetails, setShowBankDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { fullName, email, phone, donationFor, donationAmount } = formData;
    if (!fullName || fullName.trim().length < 2) {
      toast.error("Full Name must be at least 2 characters long.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (!phone || phone.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number.");
      return false;
    }

    if (!donationFor) {
      toast.error("Please select a donation purpose.");
      return false;
    }

    if (!donationAmount || donationAmount <= 0) {
      toast.error("Enter a valid Donation Amount greater than 0.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowBankDetails(true);
      toast.success("Donation form submitted!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl mt-36">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Make a Donation</h2>
        <p className="text-gray-600 mb-4">
          Please fill out the form below to proceed with your donation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="donationFor">Donation Purpose</label>
            <select
              name="donationFor"
              id="donationFor"
              value={formData.donationFor}
              onChange={handleSelectChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a purpose</option>
              <option value="education">Child and Education Empowerment</option>
              <option value="activities">Children Activities</option>
              <option value="food">Food Distribution</option>
              <option value="women">Women Empowerment</option>
              <option value="health">Health Awareness Camp</option>
              <option value="sanitary">Sanitary Pads Distribution</option>
              <option value="masks">Face Mask Distribution</option>
            </select>
          </div>

          <div>
            <label htmlFor="donationAmount">Donation Amount (INR)</label>
            <input
              type="number"
              name="donationAmount"
              id="donationAmount"
              placeholder="Enter amount in INR"
              value={formData.donationAmount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="transactionId">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              id="transactionId"
              placeholder="Enter transaction ID"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Donation
            </button>
          </div>
        </form>
      </div>

      {showBankDetails && <DonateForModel donation={formData.donationFor} onClose={() => setShowBankDetails(false)} />}

      <div className="pt-10">
        <img
          src={donate}
          alt="donation opportunity"
          className="w-full object-cover rounded"
        />
      </div>
    </div>
  );
}
