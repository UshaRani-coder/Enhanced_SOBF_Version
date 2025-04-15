import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const DonationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Existing fields
    donationAmount: '',
    customAmount: '',
    sponsorPlate: false,
    citizenship: 'Indian Citizen',
    donationType: 'Donate Once',

    // New personal details fields
    title: 'Mr',
    fullName: '',
    email: '',
    mobile: '',
    whatsappMobile: '',
    receiveCertificate: false,
    birthdate: '',
    alternateMobile: '',
    acceptTerms: false,

    // Captcha
    captchaAnswer: '',
    captchaValue1: Math.floor(Math.random() * 10),
    captchaValue2: Math.floor(Math.random() * 10),
  });

  const amounts = [
    4500.00, 9000.00, 13500.00, 18000.00, 24000.00, 30000.00,
    37500.00, 45000.00, 60000.00, 75000.00, 80000.00, 105000.00,
    150000.00, 201000.00
  ];
  const paypalOptions = {
    clientId: "AY23HLH8T-gvSI3zA05FlxpksO7VmiPzvGl3UC_4AoOfopdiLlZM_j-Q1aI0w7zV9njcqdT1Yho81DYz", 
    currency: "USD", // Change to "INR" if needed
    intent: "capture",
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({
      ...prev,
      donationAmount: amount,
      customAmount: ''
    }));
  };

  const handleCustomAmount = (e) => {
    setFormData(prev => ({
      ...prev,
      customAmount: e.target.value,
      donationAmount: ''
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const refreshCaptcha = () => {
    setFormData(prev => ({
      ...prev,
      captchaValue1: Math.floor(Math.random() * 10),
      captchaValue2: Math.floor(Math.random() * 10),
      captchaAnswer: ''
    }));
  };

  const createOrder = (data, actions) => {
    const amount = parseFloat(formData.customAmount || formData.donationAmount) + (formData.sponsorPlate ? 100 : 0);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: (amount / 83.33).toFixed(2), // Convert INR to USD (approximate)
            currency_code: "USD"
          },
          description: `Donation to Charity Organization`
        }
      ]
    });
  };

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();

    // Save donation to database
    const donationData = {
      ...formData,
      paymentId: details.id,
      paymentStatus: details.status
    };

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        handleNext();
      }
    } catch (error) {
      console.error('Error saving donation:', error);
    }
  };

  // Calculate captcha answer
  const correctCaptcha = formData.captchaValue1 + formData.captchaValue2;
  const isFormValid = step === 1 ?
    (formData.donationAmount || formData.customAmount) &&
    formData.acceptTerms &&
    parseInt(formData.captchaAnswer) === correctCaptcha :
    formData.fullName &&
    formData.email &&
    formData.mobile;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md  mt-44 mb-20">
      {/* Progress Steps */}
      <div className="relative mb-8">
        <div className="flex justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${step >= stepNumber ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {stepNumber}
              </div>
              <div className={`mt-2 text-sm font-medium ${step === stepNumber ? 'text-green-600' : 'text-gray-500'}`}>
                {stepNumber === 1 && 'Choose Amount'}
                {stepNumber === 2 && 'Details'}
                {stepNumber === 3 && 'Confirmation'}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 z-0">
          <div
            className={`h-full bg-green-500 transition-all duration-300 ease-in-out`}
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Choose Amount */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Donation Amount</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {amounts.map((amount, index) => (
              <button
                key={index}
                className={`p-4 border rounded-lg text-center transition-colors
                  ${formData.donationAmount === amount ?
                    'bg-green-500 text-white border-green-500' :
                    'bg-white text-gray-700 border-gray-300 hover:border-green-400'}`}
                onClick={() => handleAmountSelect(amount)}
              >
                ₹{amount.toLocaleString('en-IN')}
              </button>
            ))}
            <div className="col-span-2 md:col-span-3">
              <input
                type="number"
                name="customAmount"
                placeholder="Other Amount"
                value={formData.customAmount}
                onChange={handleCustomAmount}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="sponsorPlate"
                checked={formData.sponsorPlate}
                onChange={handleInputChange}
                className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
              />
              <span className="text-gray-700">I would also like to sponsor a steel meal plate worth ₹100.</span>
            </label>
            <p className="mt-2 text-sm text-gray-600">₹4900 feeds 3 children/year.</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Select your citizenship</h3>
            <div className="flex flex-wrap gap-4">
              {['Indian Citizen', 'Foreign National'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="citizenship"
                    value={option}
                    checked={formData.citizenship === option}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Select donation type</h3>
            <div className="flex flex-wrap gap-4">
              {['Donate Once', 'Donate Monthly'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="donationType"
                    value={option}
                    checked={formData.donationType === option}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Captcha */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Captcha</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{formData.captchaValue1}</span>
                <span>+</span>
                <span className="text-xl font-bold">{formData.captchaValue2}</span>
                <span>=</span>
                <input
                  type="number"
                  name="captchaAnswer"
                  value={formData.captchaAnswer}
                  onChange={handleInputChange}
                  className="w-20 p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="text-blue-500 hover:text-blue-700"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="h-5 w-5 text-green-500 rounded focus:ring-green-500 mt-1"
              />
              <span className="text-gray-700">
                I have read through the website&apos;s Privacy Policy & Terms and Conditions to make a donation.
              </span>
            </label>
          </div>

          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors
              ${!isFormValid ?
                'bg-gray-400 cursor-not-allowed' :
                'bg-green-500 hover:bg-green-600'}`}
          >
            Continue to Personal Details
          </button>
        </div>
      )}

      {/* Step 2: Personal Details */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>

          <form className="space-y-4">
            {/* Title and Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <label className="block text-gray-700 font-medium mb-1">Title</label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-gray-700 font-medium mb-1">Full Name*</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email ID*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Mobile No.*</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* WhatsApp Mobile */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">WhatsApp Mobile Number</label>
              <input
                type="tel"
                name="whatsappMobile"
                value={formData.whatsappMobile}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Please share your WhatsApp number for donation updates and receipts.
              </p>
            </div>

            {/* Alternate Mobile */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Alternate Mobile No.</label>
              <input
                type="tel"
                name="alternateMobile"
                value={formData.alternateMobile}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Birthdate */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* 80G Certificate */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="receiveCertificate"
                  checked={formData.receiveCertificate}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">I would like to receive 80(G) Certificate</span>
              </label>
              <p className="mt-2 text-sm text-gray-600">
                Available tax exemption under Section 80G
              </p>
            </div>

            {/* Payment Summary */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Donation Amount:</span> ₹{(formData.customAmount || formData.donationAmount).toLocaleString('en-IN')}
                </p>
                {formData.sponsorPlate && (
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Additional:</span> Steel meal plate (₹100)
                  </p>
                )}
                <p className="text-gray-700 font-medium">
                  Total: ₹{(parseFloat(formData.customAmount || formData.donationAmount) + (formData.sponsorPlate ? 100 : 0)).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="mt-6">
              <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="py-2 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Donation!</h2>
          <p className="text-gray-600 mb-8">Your donation has been submitted successfully.</p>

          <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg text-left space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Amount:</span> ₹{(formData.customAmount || formData.donationAmount).toLocaleString('en-IN')}
            </p>
            {formData.sponsorPlate && (
              <p className="text-gray-700">
                <span className="font-medium">Additional:</span> Steel meal plate sponsored (₹100)
              </p>
            )}
            <p className="text-gray-700">
              <span className="font-medium">Donation Type:</span> {formData.donationType}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {formData.title} {formData.fullName}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {formData.email}
            </p>
            {formData.receiveCertificate && (
              <p className="text-green-600 font-medium">
                80(G) Certificate will be sent to your email
              </p>
            )}
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-8 py-2 px-6 bg-black text-white rounded-lg font-medium"
          >
            Make Another Donation
          </button>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        This site is protected by <span className="font-bold">RapidSSL</span>
      </div>
    </div>
  );
};

export default DonationForm;