import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonorTable from './DonorTable';


const SubscribedDonor = () => {
  const [donor, setDonor] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonor = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-donors`);
        console.log("res?.data?.data", res?.data?.subscribers)
        setDonor(res?.data?.subscribers);
      } catch (err) {
        console.error('Error fetching Donor:', err);
      }
      setLoading(false);
    };
    fetchDonor();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Subscribed Donor List
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            View and manage all Subscribed Donor
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <DonorTable donor={donor} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default SubscribedDonor;