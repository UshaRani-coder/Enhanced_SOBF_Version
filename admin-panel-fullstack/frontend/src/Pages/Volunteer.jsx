// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import VolunteerTable from './VolunteerTable';

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [volunteersPerPage] = useState(5);

  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-volunteers`);
        console.log("res", res?.data?.data)
        
        setVolunteers(res?.data?.data);
      } catch (err) {
        console.error('Error fetching volunteers:', err);
      }
      setLoading(false);
    };

    fetchVolunteers();
  }, []);

  // Get current volunteers
  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Volunteers List
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            View and manage all registered volunteers
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <VolunteerTable volunteers={currentVolunteers} loading={loading} />
          <Pagination
            volunteersPerPage={volunteersPerPage}
            totalVolunteers={volunteers.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Volunteer;