import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DonationFields from "@/components/DonateUs_Page/DonationFields.jsx";
import DonationPurpose from "@/components/DonateUs_Page/DonationPurpose";
import DonationAmount from "@/components/DonateUs_Page/DonationAmount";
import DonationAdditionalInfo from "@/components/DonateUs_Page/DonationAdditionalInfo";
import DonationBenefits from "@/components/DonateUs_Page/DonationBenefits";
import RazorpayPayment from "@/components/DonateUs_Page/RazorpayPayment";

import useRazorpay from "@/hooks/useRazorpay.js";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  donationFor: "",
  donationAmount: "",
  address: "",
  panNumber: "",
  isAnonymous: false,
  otherPurposeNote: "",
};

const DonationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [showCustomAmount, setShowCustomAmount] = useState(false);

  const razorpayLoaded = useRazorpay();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      toast.error("Enter a valid full name");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Enter a valid mobile number");
      return false;
    }

    if (!formData.donationFor) {
      toast.error("Please select donation purpose");
      return false;
    }

    if (
      formData.donationFor === "Other" &&
      !formData.otherPurposeNote.trim()
    ) {
      toast.error("Please specify donation purpose");
      return false;
    }

    if (!formData.donationAmount || Number(formData.donationAmount) <= 0) {
      toast.error("Enter valid donation amount");
      return false;
    }

    return true;
  };

  const saveDonation = async (paymentData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/donation/save-donation`,
        paymentData
      );

      if (response.data.success) {
        toast.success("Thank you for your donation!");

        setFormData(initialState);
        setShowCustomAmount(false);
      } else {
        toast.error("Donation saved but receipt failed");
      }
    } catch (error) {
      console.error("Save donation error:", error);
      toast.error("Failed to save donation");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 mt-32">
      <ToastContainer position="top-right" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Make a Donation
            </h2>

            <p className="text-gray-600 mb-6">
              Your contribution makes a difference. Fill the form below to proceed.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <DonationFields
                formData={formData}
                handleChange={handleChange}
              />

              <DonationPurpose
                formData={formData}
                handleChange={handleChange}
              />

              <DonationAmount
                formData={formData}
                setFormData={setFormData}
                showCustomAmount={showCustomAmount}
                setShowCustomAmount={setShowCustomAmount}
              />

              <DonationAdditionalInfo
                formData={formData}
                handleChange={handleChange}
              />

              <RazorpayPayment
                formData={formData}
                razorpayLoaded={razorpayLoaded}
                saveDonation={saveDonation}
                validateForm={validateForm}
              />
              

            </form>
          </div>

          <DonationBenefits />

        </div>
      </div>
    </div>
  );
};

export default DonationForm;