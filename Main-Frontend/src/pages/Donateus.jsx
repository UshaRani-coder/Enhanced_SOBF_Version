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
    paymentMethod: "upi",
  });

  const [showBankDetails, setShowBankDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePresetAmount = (amount) => {
    setFormData((prev) => ({
      ...prev,
      donationAmount: amount,
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
      setIsSubmitting(true);
      setTimeout(() => {
        setShowBankDetails(true);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handlePaymentCompletion = () => {
    setShowBankDetails(false);
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      donationFor: "",
      donationAmount: "",
      transactionId: "",
      paymentMethod: "upi",
    });
    toast.success("Thank you for your donation.");
  };

  const BankDetailsModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Complete Your Donation</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-blue mb-3 text-lg">Bank Transfer Details</h4>
            <div className="space-y-3 text-gray-700">
              
              <p><span className="font-medium">Bank Name:</span> Axis Bank</p>
              <p><span className="font-medium">Account Number:</span> 920020058749691</p>
              <p><span className="font-medium">IFSC Code:</span> UTIB0000794</p>
              <p><span className="font-medium">Branch:</span> VRINDAVAN</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3 text-lg">UPI Payment</h4>
            <div className="flex flex-col items-center">
              <img
                src={qrCodeImage}
                alt="UPI QR Code"
                width={220}
                height={220}
                className="mb-4 border-2 border-green-300 rounded-lg"
              />
              <p className="text-sm text-gray-600 mb-2">Scan the QR code or use this UPI ID:</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction ID (after payment)
          </label>
          <input
            type="text"
            name="transactionId"
            placeholder="Enter transaction reference"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        <button
          onClick={handlePaymentCompletion}
          className="w-full mt-6 bg-blue hover:bg-blue text-white py-3 rounded-lg transition-colors font-medium text-lg flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "I've Completed the Payment"
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 mt-32" >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Make a Donation</h2>
                <p className="text-gray-600">
                  Your contribution makes a difference. Fill the form below to proceed.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="donationFor" className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Purpose <span className="text-red-500">*</span>
                </label>
                <select
                  id="donationFor"
                  name="donationFor"
                  value={formData.donationFor}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition"
                  required
                >
                  <option value="">Select a purpose</option>
                  <option value="Education">Education for Underprivileged</option>
                  <option value="Healthcare">Healthcare Initiatives</option>
                  <option value="Environment">Environmental Conservation</option>
                  <option value="Animal Welfare">Animal Welfare</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                  <option value="Other">Other (Specify in Transaction Note)</option>
                </select>
              </div>

              <div>
                <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  name="donationAmount"
                  placeholder="Enter amount in INR"
                  value={formData.donationAmount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition mb-2"
                  min="1"
                  required
                />
                <div className="flex flex-wrap gap-2">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePresetAmount(amount)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${Number(formData.donationAmount) === amount
                          ? "bg-blue text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? "bg-blue" : "bg-blue hover:bg-blue"
                    } text-white py-3 rounded-md transition-colors font-medium text-lg flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
            <img
              src={donate}
              alt="Your donation can change lives"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">How Your Donation Helps</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>₹500 provides school supplies for 1 child for a year</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>₹1,000 feeds a family for a month</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>₹5,000 provides medical care for 5 people</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>₹10,000 helps build clean water access for a village</span>
                </li>
              </ul>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue mb-3">Why Donate to Us?</h4>
                <ul className="space-y-3 text-blue">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>90% of funds go directly to programs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparent financial reporting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tax-exempt under 80G of Income Tax Act</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {showBankDetails && <BankDetailsModal onClose={() => setShowBankDetails(false)} />}
      </div>
    </div>
  );
}