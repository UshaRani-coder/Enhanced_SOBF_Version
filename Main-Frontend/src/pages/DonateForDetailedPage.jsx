import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDonorToDonation, fetchDonationById } from "@/Reducers/donateForSlice";
import qr from "../assets/QRCode.png";
import { toast } from "react-toastify";
import ShareButton from "@/Components/common_components/ShareButton";
const DonationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showBankDetails, setShowBankDetails] = useState(false);
  const { currentDonation, status, error, donorStatus } = useSelector((state) => state.donateFor);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_no: "",
    pan_no: "",
    aadhar_no: "",
    address: "",
    amount: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [showAllDonors, setShowAllDonors] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchDonationById(id))
      .unwrap()
      .catch((err) => console.error("Fetch error:", err));
  }, [dispatch, id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone_no.trim()) newErrors.phone_no = "Phone number is required";
    if (!formData.pan_no.trim()) newErrors.pan_no = "PAN number is required";
    if (!formData.aadhar_no.trim()) newErrors.aadhar_no = "Aadhar number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.amount.trim()) newErrors.amount = "Amount is required";

    // Additional validations
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.phone_no && !/^[0-9]{10}$/.test(formData.phone_no)) {
      newErrors.phone_no = "Phone number must be 10 digits";
    }
    if (formData.pan_no && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_no)) {
      newErrors.pan_no = "Please enter a valid PAN (e.g., ABCDE1234F)";
    }
    if (formData.aadhar_no && !/^[0-9]{12}$/.test(formData.aadhar_no)) {
      newErrors.aadhar_no = "Aadhar number must be 12 digits";
    }
    if (formData.amount && isNaN(formData.amount)) {
      newErrors.amount = "Please enter a valid number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Instead of immediately submitting, show the bank details popup
      setShowBankDetails(true);
    }
  };

  const confirmDonation = () => {
    // This will be called after user sees bank details and confirms
    dispatch(addDonorToDonation({
      donationId: id,
      donorData: formData
    }))
      .unwrap()
      .then(() => {
        setDonationSuccess(true);
        setFormData({
          fullname: "",
          email: "",
          phone_no: "",
          pan_no: "",
          aadhar_no: "",
          address: "",
          amount: "",
          message: ""
        });
        setTimeout(() => setDonationSuccess(false), 5000);
        dispatch(fetchDonationById(id));
        toast.success("Donation successful! Thank you for your support.");
        setShowBankDetails(false); // Close the bank details popup
      })
      .catch((error) => {
        console.error("Donation error:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  if (status === 'loading') return <div className="text-center py-8">Loading donation details...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (!currentDonation) return <div className="text-center py-8">Donation not found</div>;

  const progress = currentDonation?.category?.raised && currentDonation.goal
    ? (parseInt(currentDonation?.category?.raised.replace(/₹|,/g, "")) /
      parseInt(currentDonation?.category?.goal.replace(/₹|,/g, ""))) * 100
    : 0;

  const donor = currentDonation?.category?.donor || [];
  const displayedDonors = showAllDonors ? donor : donor.slice(0, 4);

  const DonorCard = ({ donor }) => {
    // Array of more vibrant color combinations (bg-color and text-color)
    const colorSchemes = [
      'bg-red-100 text-red-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-teal-100 text-teal-800',
      'bg-amber-100 text-amber-800',
      'bg-cyan-100 text-cyan-800',
      'bg-fuchsia-100 text-fuchsia-800',
      'bg-rose-100 text-rose-800',
      'bg-emerald-100 text-emerald-800',
      'bg-violet-100 text-violet-800',
      'bg-sky-100 text-sky-800',
      'bg-lime-100 text-lime-800'
    ];

    // Generate a consistent color based on donor's name
    const colorIndex = donor.fullname.charCodeAt(0) % colorSchemes.length;
    const [bgColor, textColor] = colorSchemes[colorIndex].split(' ');

    return (
      <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className={`w-10 h-10 rounded-full ${bgColor} ${textColor} flex items-center justify-center text-lg font-bold`}>
          {donor.fullname.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 truncate">{donor.fullname}</p>
          <div className="flex items-center mt-1">
            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm text-gray-500 truncate">{donor.email}</p>
          </div>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Supporter
        </div>
      </div>
    );
  };

  const title = 'Support Braj Seva – Be one in a million';
  const baseURL =
    window.location.origin === 'http://localhost:5173'
      ? 'https://sobf.in'
      : window.location.origin;

  return (
    <div className="container mx-auto px-4 pb-8 max-w-9xl">
      <div className="container mx-auto px-4 py-8 max-w-6xl mt-40">
        {/* Bank Details Modal */}
        {showBankDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Bank Transfer Details</h2>
                  <button
                    onClick={() => setShowBankDetails(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                  </button>
                </div>

                <div className="mb-6">
                  {/* QR Code/Scanner Placeholder */}
                  <div className="bg-gray-100 p-4 rounded-lg flex justify-center mb-4">
                    <div className="bg-white p-2 rounded">
                      <img
                        src={qr}
                        alt="Scanner"
                        className="w-48 h-48 object-contain"
                      />
                      <p className="text-center text-sm text-gray-500 mt-2">Scan to pay</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Bank Name:</span>
                      <span>Axis Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Account Number:</span>
                      <span>920020058749691</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">IFSC Code:</span>
                      <span>UTIB0000794</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Branch:</span>
                      <span>VRINDAVAN</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowBankDetails(false)}
                    className="px-4 py-2 border bg-red-700 border-red-300 text-white rounded-md  hover:bg-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDonation}
                    className="px-4 py-2 bg-blue text-white rounded-md hover:bg-orange"
                  >
                    I&apos;ve Made the Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Donors Modal */}
        {showAllDonors && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">All Donors</h2>
                  <button
                    onClick={() => setShowAllDonors(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  {donor?.map((donor, index) => (
                    <DonorCard key={index} donor={donor} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Donation Card Details */}
          <div className="lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={currentDonation?.category?.image}
                alt={currentDonation?.category?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentDonation?.title}</h1>

              {/* Main description */}
              <div className="mb-4 flex justify-between">
                {/* <h3 className="font-semibold text-gray-700 mb-1">About this campaign:</h3> */}
                <p className="text-gray-700 text-xl font-bold whitespace-pre-line">{currentDonation?.category?.title}</p>
                <div onClick={(e) => e.stopPropagation()}>
                  <ShareButton
                    title={title}
                    url={`${baseURL}/donate/${currentDonation?.category?._id}`}
                    className= "px-3 py-[7px] md:py-[9px] border-0 text-xs md:text-sm mb-3 inline-block font-bold rounded-full shadow-md bg-gradient-to-r from-indigo-400 to-indigo-600 text-white hover:from-indigo-500 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Category description if available */}
              {currentDonation?.category?.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-1">About the cause:</h3>
                  <p className="text-gray-600 whitespace-pre-line">{currentDonation?.category?.description}</p>
                </div>
              )}

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{progress.toFixed(0)}% funded</span>
                  <span className="text-gray-600">
                    {currentDonation?.raised} raised of {currentDonation.goal} goal
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 text-lg">Recent Donors</h3>
                  {donor.length > 3 && (
                    <button
                      onClick={() => setShowAllDonors(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      See All ({donor?.length})
                    </button>
                  )}
                </div>

                {donor?.length > 0 ? (
                  <div className="space-y-3">
                    {displayedDonors?.map((donor, index) => (
                      <DonorCard key={index} donor={donor} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h4 className="mt-2 text-sm font-medium text-gray-700">No donors yet</h4>
                    <p className="mt-1 text-sm text-gray-500">Be the first to support this cause!</p>
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Updated Donation Form */}
          <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Make a Donation</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData?.fullname}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors?.fullname ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors?.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_no" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone_no"
                  name="phone_no"
                  value={formData?.phone_no}
                  onChange={handleChange}
                  required
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className={`w-full px-4 py-2 border ${errors.phone_no ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.phone_no && <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>}
              </div>

              {/* PAN Number */}
              <div>
                <label htmlFor="pan_no" className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Number*
                </label>
                <input
                  type="text"
                  id="pan_no"
                  name="pan_no"
                  value={formData.pan_no}
                  onChange={handleChange}
                  required
                  maxLength="10"
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  className={`w-full px-4 py-2 border ${errors.pan_no ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500 uppercase`}
                />
                {errors.pan_no && <p className="text-red-500 text-xs mt-1">{errors.pan_no}</p>}
              </div>

              {/* Aadhar Number */}
              <div>
                <label htmlFor="aadhar_no" className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhar Number*
                </label>
                <input
                  type="text"
                  id="aadhar_no"
                  name="aadhar_no"
                  value={formData.aadhar_no}
                  onChange={handleChange}
                  required
                  maxLength="12"
                  pattern="[0-9]{12}"
                  className={`w-full px-4 py-2 border ${errors.aadhar_no ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.aadhar_no && <p className="text-red-500 text-xs mt-1">{errors.aadhar_no}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="1"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                ></textarea>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Donation Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Amount (₹)*
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="1"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              </div>

              {/* Message (Optional) */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={donorStatus === 'loading'}
                className="w-full bg-blue hover:bg-blue text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
              >
                {donorStatus === 'loading' ? 'Processing...' : 'Donate Now'}
              </button>

              {donorStatus === 'failed' && (
                <p className="text-red-500 text-sm">There was an error processing your donation. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;