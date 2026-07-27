import React from 'react';

const DonorDetails = ({ donors }) => {
  return (
    <tr className="bg-gray-50">
      <td colSpan="7" className="px-6 py-4">
        <div className="ml-12">
          <h4 className="font-semibold mb-2">Donors:</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((user) => (
              <div key={user?._id} className="border p-3 rounded-lg">
                <p>
                  <span className="font-medium">Name:</span> {user?.fullname}
                </p>

                <p>
                  <span className="font-medium">Email:</span> {user?.email}
                </p>

                <p>
                  <span className="font-medium">Amount:</span> {user?.amount}
                </p>

                <p>
                  <span className="font-medium">Aadhar:</span> {user?.aadhar_no}
                </p>

                <p>
                  <span className="font-medium">PAN:</span> {user?.pan_no}
                </p>

                <p>
                  <span className="font-medium">Phone:</span> {user?.phone_no}
                </p>

                <p>
                  <span className="font-medium">Address:</span> {user?.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DonorDetails;
