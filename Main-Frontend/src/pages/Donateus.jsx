import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import education from '../assets/banner2.png';
import food from '../assets/Sobf Images/food distribution/FoodDonation.png';
import objective from '../assets/objective.png';
import donate from '../assets/donateMotive.png';
import Donate_hero from '../Components/Donate_page/donate_hero.jsx';
import QRCode from '../assets/QRCode.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

// PayPal Configuration (Replace with your Client ID)
const paypalOptions = {
  clientId: "AY23HLH8T-gvSI3zA05FlxpksO7VmiPzvGl3UC_4AoOfopdiLlZM_j-Q1aI0w7zV9njcqdT1Yho81DYz", // Replace with your PayPal Client ID
  currency: "USD", // Change to "INR" if needed
  // intent: "capture",
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
    donationAmount: "",
    transactionId: "",
  });
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'qr' or 'paypal'

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

  // Validate Form
  const validateForm = () => {
    const { fullName, email, phone, pan, aadhar, pin, donationAmount } = formData;

    if (!fullName || fullName.trim().length < 2) {
      toast.error("Full Name must be at least 2 characters long.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit Mobile Number.");
      return false;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      toast.error("Enter a valid PAN Number (e.g., ABCDE1234F).");
      return false;
    }

    if (aadhar && !/^\d{12}$/.test(aadhar)) {
      toast.error("Enter a valid 12-digit Aadhaar Number.");
      return false;
    }

    if (!/^\d{6}$/.test(pin)) {
      toast.error("Enter a valid 6-digit PIN Code.");
      return false;
    }

    if (donationAmount <= 0) {
      toast.error("Enter a valid Donation Amount greater than 0.");
      return false;
    }

    return true;
  };

  // ... existing code ...

  const handleStoreDonation = async (paymentDetails) => {
    try {
      // Prepare the data to send to your backend
      const donationData = {
        ...formData,
        paymentMethod: 'paypal',
        paymentDetails: {
          paymentId: paymentDetails.id,
          amount: paymentDetails.purchase_units[0].amount.value,
          currency: paymentDetails.purchase_units[0].amount.currency_code,
          status: paymentDetails.status,
          payerEmail: paymentDetails.payer.email_address,
          payerName: `${paymentDetails.payer.name.given_name} ${paymentDetails.payer.name.surname}`,
        }
      };
      // Replace with your actual API endpoint
      const response = await axios.post('https://your-api-endpoint.com/donations', donationData);

      if (response.data.success) {
        toast.success("Donation recorded successfully!");
      } else {
        toast.warning("Donation completed but recording failed. Please contact support.");
      }
    } catch (error) {
      console.error("Error storing donation:", error);
      toast.error("Error recording donation. Please contact support with your transaction ID.");
    }
  };


  // Handle PayPal Payment Success
  const handlePaymentSuccess = async (details, data) => {
    try {
      // First show success message
      toast.success(`Donation successful! Transaction ID: ${details.id}`);

      // Update form data with transaction ID
      setFormData(prev => ({
        ...prev,
        transactionId: details.id,
      }));

      // Set payment as completed
      setPaymentCompleted(true);

      // Store the donation in your database
      await handleStoreDonation(details);
    } catch (error) {
      console.error("Error handling payment success:", error);
      toast.error("Payment completed but there was an error processing your donation.");
    }
  };

  // Render Content Based on Active Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'whydonate':
        return (
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 sm:gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={objective}
                alt="Community Service Projects"
                className="mt-4 md:w-full sm:w-1/2 lg:h-[60vh] sm:h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2 pt-[20px] md:pt-0  ">
              <p className="text-[16px] md:text-lg text-gray-600 text-center md:text-left lg:leading-[30px]">
                Donating to us means contributing to a mission dedicated to
                simplifying complex processes, enhancing efficiency, and driving
                growth through innovative services. We empower communities to
                navigate the ever-changing tech landscape, ensuring that
                resources reach those in need effectively. Your donation
                supports our diverse programs that address fundamental issues
                such as poverty, hunger, health, education, gender equality, and
                sanitation. By supporting us, you become part of a movement that
                has already impacted over 15,000 lives, distributed essential
                items, and fostered community development. Join us in making a
                tangible difference in countless lives.
              </p>
            </div>
          </div>
        );
      case 'howweuse':
        return (
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={food}
                alt="Community Service Projects"
                className="mt-4 md:w-full sm:w-1/2 h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2   ">
              <p className="text-[16px] md:text-lg text-gray-600 text-center md:text-left lg:leading-[30px]">
                We utilize donations strategically to maximize their impact on
                the communities we serve. Funds are allocated to various
                programs that address critical needs such as food distribution,
                sanitary napkin distribution, and providing access to clean
                water and sanitation. Our programs focus on sustainable
                development and community empowerment, ensuring that each dollar
                donated translates into real-world benefits. We maintain
                transparency and efficiency in our operations, ensuring that
                donations are used effectively to support our mission.
                Additionally, we invest in our volunteers, enhancing their
                ability to serve and expand our reach to more individuals and
              </p>
            </div>
          </div>
        );
      case 'whereweuse':
        return (
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 justify-center">
            <div className="lg:w-1/2 md:w-full lg:ml-0 ">
              <img
                src={education}
                alt="Community Service Projects"
                className="mt-4 md:w-full sm:w-1/2 h-auto rounded-lg grayscale hover:grayscale-0 delay-150 transition duration-500 ease-in-out"
              />
            </div>
            <div className="lg:w-1/2   ">
              <p className="text-[16px] md:text-lg text-gray-600 text-center md:text-left ">
                Your generous donations are used across multiple impactful
                programs and initiatives. Our focus areas include addressing
                poverty, hunger, health and well-being, quality education,
                gender equality, and clean water and sanitation. We have reached
                over 15,000 lives, distributed food and sanitary napkins, and
                engaged over 200 volunteers in our efforts. Our community
                service projects, such as Anna Vitran Seva, Swachh & Swasth
                Vrindavan, and the Brajkulam Community Center, are designed to
                foster sustainable development and community well-being. By
                contributing, you are directly supporting these programs and
                helping us extend our reach to more villages and individuals in
                need.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div>
        <Donate_hero />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

        {/* Tabs Section */}
        {/* <div className="w-full lg:w-full px-4 mt-10">
          <div className="flex">
            <button
              className={`poppins-medium w-[33.3%] px-3 py-2 rounded-tl-lg text-sm md:text-lg ${activeTab === 'whydonate' ? 'text-white bg-logoYellow' : 'bg-light-lavender text-gray-700'
                }`}
              onClick={() => setActiveTab('whydonate')}
            >
              Why donate us
            </button>
            <button
              className={`poppins-medium w-[33.3%] px-3 py-2 text-sm md:text-lg ${activeTab === 'howweuse' ? 'text-white bg-logoYellow' : 'bg-light-lavender text-gray-700'
                }`}
              onClick={() => setActiveTab('howweuse')}
            >
              How we use
            </button>
            <button
              className={`poppins-medium w-[33.3%] px-3 py-2 rounded-tr-lg text-sm md:text-lg ${activeTab === 'whereweuse' ? 'text-white bg-logoYellow' : 'bg-light-lavender text-gray-700'
                }`}
              onClick={() => setActiveTab('whereweuse')}
            >
              Where we use
            </button>
          </div>
          <div className="p-4 py-8 bg-gray-50 rounded-b-lg text-lg rounded-lg border">
            {renderContent()}
          </div>
        </div> */}

        {/* Donation Form */}
        <div id="donate-form">
          <div className="min-h-screen p-6 flex items-center justify-center rounded-lg">
            <div className="container max-w-screen-lg mx-auto md:mb-16  mb-10 flex flex-col">
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

                  {/* Payment Method Toggle */}
                  <div className="md:col-span-5 mb-6">
                    <div className="flex flex-col">
                      <label className="mb-2 font-medium">Payment Method</label>
                      <div className="flex rounded-lg overflow-hidden border border-gray-300">
                        <button
                          type="button"
                          className={`flex-1 py-2 px-4 ${paymentMethod === 'qr' ? 'bg-logoYellow text-white' : 'bg-gray-100 text-gray-700'}`}
                          onClick={() => setPaymentMethod('qr')}
                        >
                          QR Code Payment
                        </button>
                        <button
                          type="button"
                          className={`flex-1 py-2 px-4 ${paymentMethod === 'paypal' ? 'bg-logoYellow text-white' : 'bg-gray-100 text-gray-700'}`}
                          onClick={() => setPaymentMethod('paypal')}
                        >
                          PayPal
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                      <div className="md:flex md:items-end md:gap-[30px]">
                        <div className="md:w-full lg:w-full">
                          <div className="md:col-span-5 mt-[10px]">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                              type="text"
                              name="fullName"
                              id="fullName"
                              className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                              placeholder="Full Name"
                              required
                              minLength="2"
                              onChange={handleChange}
                              value={formData.fullName}
                            />
                          </div>
                          <div className="md:col-span-5 mt-[10px]">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                              type="date"
                              name="dob"
                              id="dob"
                              className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                              required
                              onChange={handleChange}
                              value={formData.dob}
                            />
                          </div>
                          <div className="md:col-span-5 mt-[10px]">
                            <label htmlFor="email">Email Address</label>
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
                          <div className="md:col-span-5 mt-[10px]">
                            <label htmlFor="phone">Mobile Number</label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                              placeholder="Mobile Number"
                              required
                              onChange={handleChange}
                              value={formData.phone}
                            />
                          </div>
                        </div>

                        {/* QR Code for Larger Screens - Only shown when QR is selected */}
                        {paymentMethod === 'qr' && (
                          <div className="hidden md:flex flex-col items-end gap-[15px] md:w-[200px] lg:w-[30%]">
                            <p className="text-lg font-semibold">Scan the QR code to proceed:</p>
                            <img src={QRCode} alt="QR Code" className="w-32 h-32 md:w-[200px] md:h-[200px]" />
                          </div>
                        )}
                      </div>

                      {/* Remaining Fields */}
                      <div className="md:col-span-5">
                        <label htmlFor="pan">PAN Number</label>
                        <input
                          type="text"
                          name="pan"
                          id="pan"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          placeholder="Enter a valid PAN number (e.g., ABCDE1234F)"
                          maxLength="10"
                          onChange={handleChange}
                          value={formData.pan}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="aadhar">Aadhar Number (Optional)</label>
                        <input
                          type="number"
                          name="aadhar"
                          id="aadhar"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          placeholder="Enter a valid 12-digit Aadhaar number (e.g., 123456789012)"
                          maxLength="12"
                          onChange={handleChange}
                          value={formData.aadhar}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="pin">PIN Code</label>
                        <input
                          type="number"
                          name="pin"
                          id="pin"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          placeholder="ex. 236790"
                          required
                          onChange={handleChange}
                          value={formData.pin}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="donationFor">Donation For</label>
                        <select
                          name="donationFor"
                          id="donationFor"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          required
                          onChange={handleChange}
                          value={formData.donationFor}
                        >
                          <option value="">Select Program/Service</option>
                          <option value="program1">Child and Education empowerment</option>
                          <option value="program2">Children activities</option>
                          <option value="program3">Food distribution</option>
                          <option value="program4">Women empowerment</option>
                          <option value="program5">Health awareness camp</option>
                          <option value="program6">Sanitary pads distribution</option>
                          <option value="program7">Face mask distribution</option>
                        </select>
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="donationAmount">Donation Amount</label>
                        <input
                          type="number"
                          name="donationAmount"
                          id="donationAmount"
                          className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                          placeholder="Enter amount"
                          required
                          onChange={handleChange}
                          value={formData.donationAmount}
                        />
                      </div>

                      {/* Transaction ID Field - Only shown for QR payments */}
                      {paymentMethod === 'qr' && (
                        <div className="md:col-span-5">
                          <label htmlFor="transactionId">Transaction ID</label>
                          <input
                            type="text"
                            name="transactionId"
                            id="transactionId"
                            className="h-10 border mt-1 rounded px-4 w-full bg-light-lavender"
                            placeholder="Enter the ID of transaction (e.g., TXN12345ABC67890)"
                            required
                            onChange={handleChange}
                            value={formData.transactionId}
                          />
                        </div>
                      )}

                      {/* QR Code for Smaller Screens - Only shown when QR is selected */}
                      {paymentMethod === 'qr' && (
                        <div className="md:hidden flex flex-col items-center gap-[15px] mt-6">
                          <p className="font-semibold text-left w-full small-range:text-lg">Scan the QR code to proceed:</p>
                          <img src={QRCode} alt="QR Code" className="w-40 h-40" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="md:col-span-5 flex flex-col md:flex-row justify-center pt-10 md:gap-10 gap-3">
                  {!paymentCompleted ? (
                    paymentMethod === 'qr' ? (
                      // Modify your QR payment confirmation button:
                      <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg"
                        onClick={async () => {
                          if (validateForm()) {
                            try {
                              const donationData = {
                                ...formData,
                                paymentMethod: 'qr',
                                paymentDetails: {
                                  paymentId: formData.transactionId,
                                  amount: formData.donationAmount,
                                  currency: "INR", // Assuming QR payments are in INR
                                  status: "COMPLETED",
                                }
                              };

                              // Store the donation
                              await handleStoreDonation(donationData);

                              toast.success("Payment details confirmed and recorded!");
                              setPaymentCompleted(true);
                            } catch (error) {
                              console.error("Error storing QR payment:", error);
                              toast.error("Error recording payment. Please try again.");
                            }
                          }
                        }}
                      >
                        Confirm QR Payment Details
                      </button>
                    ) : (
                      <div className="w-full">
                          <PayPalButtons
                            style={{ layout: "vertical", shape: "pill" }}
                            createOrder={(data, actions) => {
                              if (!validateForm()) {
                                toast.error("Please fill all fields correctly.");
                                return Promise.reject("Form validation failed");
                              }
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: formData.donationAmount,
                                      currency_code: "USD",
                                    },
                                    description: `Donation for ${formData.donationFor}`,
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order.capture().then((details) => {
                                handlePaymentSuccess(details, data);
                              });
                            }}
                            onError={(err) => {
                              toast.error("Payment failed. Please try again.");
                              console.error("PayPal error:", err);
                            }}
                          />
                      </div>
                    )
                  ) : (
                    <button
                      className="text-white bg-green-500 px-5 py-2.5 rounded-lg"
                      disabled
                    >
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