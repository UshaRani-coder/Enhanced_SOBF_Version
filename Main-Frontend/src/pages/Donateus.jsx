import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import donate from "../assets/donateMotive.png";
import qrCodeImage from "../assets/QRCode.png";

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

  const validateForm = () => {
    const { fullName, email, phone, donationFor, donationAmount, transactionId } = formData;

    if (!fullName || fullName.trim().length < 2) {
      toast.error("Full Name must be at least 2 characters long.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (!phone || !/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return false;
    }

    if (!donationFor.trim()) {
      toast.error("Please select a donation purpose.");
      return false;
    }

    if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
      toast.error("Enter a valid Donation Amount greater than 0.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowBankDetails(true);
    }
  };

  const BankDetailsModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Complete Your Donation</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Bank Transfer Details</h4>
            <div className="space-y-2 text-sm">
              <span><strong>Bank Name</strong> : Axis Bank</span> <br />
              <span><strong>Account Number</strong> : 920020058749691</span> <br />
              <span><strong>IFSC Code</strong> : UTIB0000794</span><br />
              <span><strong>BRANCH</strong> : VRINDAVAN</span><br />
            </div>
          </div>
          <p className="text-center items-center font-bold">OR</p>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">UPI Payment</h4>
            <div className="flex flex-col items-center">
              <img
                src={qrCodeImage}
                alt="UPI QR Code"
                width={200}
                height={200}
                className="mb-2"
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            I've Completed the Payment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl mt-36">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Make a Donation</h2>
        <p className="text-gray-600 mb-4">
          Please fill out the form below to proceed with your donation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <select
            name="donationFor"
            value={formData.donationFor}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3"
          >
            <option value="">Select Donation Purpose</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
            <option value="Animal Welfare">Animal Welfare</option>
          </select>
          <input
            type="number"
            name="donationAmount"
            placeholder="Donation Amount (₹)"
            value={formData.donationAmount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3"
          />
          <button
            type="submit"
            className="w-full bg-blue text-white py-3 rounded-md hover:bg-blue-700 transition font-medium text-lg"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      {showBankDetails && <BankDetailsModal onClose={() => setShowBankDetails(false)} />}

      <div className="pt-10">
        <img
          src={donate}
          alt="donation opportunity"
          className="w-full object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
