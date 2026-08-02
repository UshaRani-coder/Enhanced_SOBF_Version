import React from 'react';

const RegisteredUserTable = ({ users, selectedUsers, toggleSelectUser }) => {
  return (
    <div className="hidden lg:block overflow-x-auto rounded-lg">
      <table className="w-full min-w-[700px] bg-white shadow-md rounded-lg border-collapse">
        <thead>
          <tr className="bg-gray-200 text-md">
            <th className="px-4 py-3 text-left font-medium">Select</th>

            <th className="px-4 py-3 text-left font-medium">Name</th>

            <th className="px-4 py-3 text-left font-medium">Email</th>

            <th className="px-4 py-3 text-left font-medium">Event Name</th>

            <th className="px-4 py-3 text-left font-medium">
              Registration Date
            </th>
          </tr>
        </thead>

        <tbody>
          {users?.length > 0 ? (
            users.map((user) => {
              if (!user.event) return null;

              return (
                <tr key={user.registrationId} className="border-b text-sm">
                  {/* Checkbox */}
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.registrationId)}
                      disabled={
                        selectedUsers.length > 0 &&
                        !selectedUsers.includes(user.registrationId)
                      }
                      onChange={() => toggleSelectUser(user.registrationId)}
                      className="cursor-pointer disabled:cursor-not-allowed"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-4 py-2">{user.username}</td>

                  {/* Email */}
                  <td className="px-4 py-2">{user.email}</td>

                  {/* Event */}
                  <td className="px-4 py-2">{user.event?.title || 'N/A'}</td>

                  {/* Registration Date */}
                  <td className="px-4 py-2">
                    {new Date(user.registeredAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No registered users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUserTable;
