import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import donate from "../assets/donateMotive.png";
import axios from "axios";

export default function DonationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    donationFor: "",
    donationAmount: "",
    address: "",
    panNumber: "",
    isAnonymous: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRazorpayLoading, setIsRazorpayLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const presetAmounts = [11,51,101, 251, 301,401, 501, 1001, 2001, 5001];

  // Load Razorpay script when component mounts
  useEffect(() => {
    const loadRazorpayScript = async () => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        return;
      }

      try {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          setRazorpayLoaded(true);
          console.log("Razorpay SDK loaded successfully");
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay SDK");
          setRazorpayLoaded(false);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Razorpay:", error);
        setRazorpayLoaded(false);
      }
    };

    loadRazorpayScript();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePresetAmount = (amount) => {
    setFormData((prev) => ({
      ...prev,
      donationAmount: amount,
    }));
    setShowCustomAmount(false);
  };

  const toggleCustomAmount = () => {
    setShowCustomAmount(!showCustomAmount);
    if (!showCustomAmount) {
      setFormData(prev => ({ ...prev, donationAmount: "" }));
    }
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

  const initiateRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      toast.error("Payment system is still initializing. Please try again in a moment.");
      return;
    }
    setIsRazorpayLoading(true);
    try {
      const orderResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/donation/create-razorpay-order`, {
        amount: formData.donationAmount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `donation_${Date.now()}`,
        notes: {
          purpose: formData.donationFor,
          donorName: formData.fullName,
          donorEmail: formData.email,
        },
      });
      const orderId = orderResponse.data.id;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: formData.donationAmount * 100,
        currency: "INR",
        name: "Soul Of Braj Federation",
        description: `Donation for ${formData.donationFor}`,
        image: "https://sobf.in/assets/logo-xV2I52-F.png",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            ...formData,
          };

          // Verify payment and save to database
          await saveDonation(paymentData);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          purpose: formData.donationFor,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      toast.error("Payment initiation failed. Please try again.");
    } finally {
      setIsRazorpayLoading(false);
    }
  };
  

  const saveDonation = async (paymentData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/donation/save-donation`, {
        ...paymentData,
        isAnonymous: formData.isAnonymous,
        panNumber: formData.panNumber,
        address: formData.address,
      });

      if (response.data.success) {
        toast.success("Thank you for your donation! A receipt will be emailed to you.");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          donationFor: "",
          donationAmount: "",
          address: "",
          panNumber: "",
          isAnonymous: false,
        });
      } else {
        toast.error("Donation recorded but there was an issue sending the receipt.");
      }
    } catch (error) {
      console.error("Error saving donation:", error);
      toast.error("There was an error processing your donation. Please contact support.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await initiateRazorpayPayment();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 mt-32">
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

                {!showCustomAmount ? (
                  <>
                    <div className="flex flex-wrap gap-2 mb-3">
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
                    <button
                      type="button"
                      onClick={toggleCustomAmount}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-3"
                    >
                      + Enter custom amount
                    </button>
                  </>
                ) : (
                  <div className="mb-3">
                    <input
                      type="number"
                      id="donationAmount"
                      name="donationAmount"
                      placeholder="Enter custom amount in INR"
                      value={formData.donationAmount}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue focus:border-blue transition"
                      min="1"
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={toggleCustomAmount}
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium mt-2"
                    >
                      ← Back to preset amounts
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number (for 80G receipt)
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    placeholder="Enter PAN (if needed for tax exemption)"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isRazorpayLoading}
                  className={`w-full ${isSubmitting || isRazorpayLoading ? "bg-blue" : "bg-blue hover:bg-blue"
                    } text-white py-3 rounded-md transition-colors font-medium text-lg flex items-center justify-center ${isSubmitting || isRazorpayLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting || isRazorpayLoading ? (
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
      </div>
    </div>
  );
}