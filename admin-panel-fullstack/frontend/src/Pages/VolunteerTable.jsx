// src/components/VolunteerTable.js
import React from 'react';

const VolunteerTable = ({ volunteers, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#1d1d42] py-4">
          <tr>
            <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
              Phone
            </th>
            <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-gray-100 uppercase tracking-wider hidden sm:table-cell md:hidden">
              City
            </th>
            <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-gray-100 uppercase tracking-wider hidden lg:table-cell">
              State
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <tr key={volunteer._id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                  {volunteer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                  {volunteer.mobile || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700 hidden sm:table-cell md:hidden">
                  {volunteer.city || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700 hidden lg:table-cell">
                  {volunteer.state || 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                No volunteers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerTable;