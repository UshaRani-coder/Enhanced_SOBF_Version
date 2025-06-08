import { useEffect, useState } from 'react';
import axios from 'axios';

const DonorDashboard = () => {
 const [donations, setDonations] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  const fetchDonationData = async () => {
   try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/donation/getdonation`);
    console.log("response.data", response?.data?.data);
    setDonations(response?.data?.data || []);
    setLoading(false);
   } catch (err) {
    setError(err.message);
    setLoading(false);
   }
  };

  fetchDonationData();
 }, []);

 if (loading) {
  return (
   <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
   </div>
  );
 }


 if (!donations || donations?.length === 0) {
  return (
   <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
    <p>No donation data found</p>
   </div>
  );
 }

 // Calculate totals
 const totalDonations = donations?.reduce((sum, donation) => sum + donation?.amount, 0);
 const uniqueDonors = [...new Set(donations?.map(donation => donation?.donorEmail))].length;

 return (
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
     <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
      Donation Dashboard
     </h1>
     <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
      Overview of all donations received
     </p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
         <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Total Donations</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">
            ₹{totalDonations?.toLocaleString()}
           </div>
          </dd>
         </dl>
        </div>
       </div>
      </div>
     </div>

     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <div className="flex items-center">
        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
         <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
         </svg>
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Total Donors</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">
            {uniqueDonors}
           </div>
          </dd>
         </dl>
        </div>
       </div>
      </div>
     </div>

     <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
       <div className="flex items-center">
        <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
         <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
         </svg>
        </div>
        <div className="ml-5 w-0 flex-1">
         <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">Total Transactions</dt>
          <dd className="flex items-baseline">
           <div className="text-2xl font-semibold text-gray-900">
            {donations?.length}
           </div>
          </dd>
         </dl>
        </div>
       </div>
      </div>
     </div>
    </div>

    {/* Donation Table */}
    <div className="bg-white shadow rounded-lg overflow-hidden">
     <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-800">
      <h3 className="text-lg leading-6 font-medium text-white">
       All Donations
      </h3>
     </div>
     <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
        <tr>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Donor Name
         </th>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
         </th>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
         </th>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Purpose
         </th>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Amount
         </th>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
         </th>
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Payment Method
         </th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {donations && donations?.map((donation) => (
         <tr key={donation?._id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
           {donation?.donorName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {donation?.donorEmail}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {new Date(donation?.date).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {donation?.purpose}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           ₹{donation?.amount?.toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${donation?.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'}`}>
            {donation?.status}
           </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           {donation?.paymentMethod}
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    </div>
   </div>
  </div>
 );
};

export default DonorDashboard;