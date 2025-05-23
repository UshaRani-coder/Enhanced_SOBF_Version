import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import donate from '../assets/donateMotive.png';
import { donors_words } from '../Constant/data';
import { our_donors } from '../Constant/data';
import Donate_hero from '../Components/Donate_page/donate_hero.jsx';
import Impacts from '../Components/Home_Section/Impacts.jsx';
import QRCode from '../assets/QRCode.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PayPal Configuration (Replace with your Client ID)
const paypalOptions = {
  clientId: "test", // Replace with YOUR_PAYPAL_CLIENT_ID (e.g., "AeJ9...")
  currency: "USD", // Change to "INR" if needed
  intent: "capture",
};

const Donateus = () => {
  const [activeTab, setActiveTab] = useState('whydonate');
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    pan: "",
    aadhar: "",
    pin: "",
    donationFor: "",
    donationAmount: "10", // Default amount to test PayPal
    transactionId: "",
  });
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/donate-us') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate Form (Simplified for testing)
  const validateForm = () => {
    const { fullName, email, donationAmount } = formData;

    if (!fullName || fullName.trim().length < 2) {
      toast.error("Full Name is required.");
      return false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Valid Email is required.");
      return false;
    }

    if (!donationAmount || donationAmount <= 0) {
      toast.error("Donation Amount must be > 0.");
      return false;
    }

    return true;
  };

  // Handle PayPal Payment Success
  const handlePaymentSuccess = (details) => {
    toast.success(`Donation successful! Transaction ID: ${details.id}`);
    setFormData({
      ...formData,
      transactionId: details.id,
    });
    setPaymentCompleted(true);
  };

  // Render Tabs (Keep your existing tab content)
  const renderContent = () => { /* ... */ };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div>
        <Donate_hero />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

        {/* Tabs Section (Unchanged) */}
        <div className="w-full lg:w-full px-4 mt-10">
          {/* ... (Your tab buttons and content) */}
        </div>

        {/* Donation Form */}
        <div id="donate-form">
          <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center rounded-lg">
            <div className="container max-w-screen-lg mx-auto md:mt-32 md:mb-16 mt-28 mb-10 flex flex-col">
              <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6 md:w-[100%]">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                  {/* Form Heading */}
                  <div className="text-gray-600 text-left">
                    <div className="flex">
                      <span className="font-medium md:text-[2rem] text-logoYellow text-heading4 py-3 pr-2">
                        Personal
                      </span>
                      <span className="font-medium md:text-[2rem] text-logo-blue text-heading4 py-3">
                        Details
                      </span>
                    </div>
                    <p className="pt-1.5 lg:pb-0 pb-4">Please fill out all the fields.</p>
                  </div>

                  {/* Form Fields (Shortened for testing) */}
                  <div className="w-full">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                      <div className="md:col-span-5">
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          placeholder="Full Name"
                          required
                          onChange={handleChange}
                          value={formData.fullName}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">Email *</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          placeholder="example@gmail.com"
                          required
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="donationAmount">Donation Amount (USD) *</label>
                        <input
                          type="number"
                          name="donationAmount"
                          id="donationAmount"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          placeholder="10"
                          required
                          onChange={handleChange}
                          value={formData.donationAmount}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PayPal Button (Now Visible!) */}
                <div className="md:col-span-5 flex justify-center pt-10">
                  {!paymentCompleted ? (
                    <PayPalButtons
                      style={{ layout: "vertical", shape: "pill" }}
                      forceReRender={[formData.donationAmount]}
                      createOrder={(data, actions) => {
                        if (!validateForm()) {
                          return Promise.reject("Form validation failed");
                        }
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: formData.donationAmount,
                                currency_code: "USD",
                              },
                              description: "Donation to SOBF",
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(handlePaymentSuccess);
                      }}
                      onError={(err) => {
                        toast.error("Payment failed. Please try again.");
                        console.error("PayPal error:", err);
                      }}
                    />
                  ) : (
                    <button className="text-white bg-green-500 px-5 py-2.5 rounded-lg" disabled>
                      Payment Completed ✅
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Opportunity Image */}
        <div className="pt-10">
          <img src={donate} alt="donation opportunity" className="w-full object-cover" />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Donateus;