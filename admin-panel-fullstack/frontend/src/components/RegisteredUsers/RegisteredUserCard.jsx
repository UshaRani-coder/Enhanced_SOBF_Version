import React from 'react';

const RegisteredUserCard = ({ users, selectedUsers, toggleSelectUser }) => {
  return (
    <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {users?.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 shadow rounded-lg border space-y-2 hover:shadow-lg overflow-hidden"
          >
            {/* Checkbox */}
            <div>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user._id)}
                onChange={() => toggleSelectUser(user._id)}
                className="mr-2 cursor-pointer"
              />
            </div>

            {/* User Name */}
            <h2 className="font-semibold text-lg break-words">
              {user.username}
            </h2>

            {/* Email */}
            <p className="text-gray-600 break-words">{user.email}</p>

            {/* Event */}
            <p className="text-gray-700 text-sm break-words">
              <strong>Event:</strong>{' '}
              {user?.registeredEvents?.[0]?.title || 'N/A'}
            </p>

            {/* Registration Date */}
            <p className="text-sm text-gray-700">
              <strong>Registered Date:</strong>{' '}
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No registered users found.
        </p>
      )}
    </div>
  );
};

export default RegisteredUserCard;
