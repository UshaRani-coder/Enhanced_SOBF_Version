import React from 'react';

const VolunteerSuccess = ({ submittedEmail, onSubmitAnother }) => {
  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <svg
        className="mx-auto h-16 w-16 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>

      {/* Heading */}
      <h3 className="mt-4 text-xl font-medium text-gray-900">
        Thank you for volunteering!
      </h3>

      {/* Message */}
      <p className="mt-2 text-gray-600">
        We've received your application and will contact you soon.
      </p>

      {/* Email Confirmation */}
      <p className="mt-2 text-gray-600">
        A confirmation email has been sent to{' '}
        <span className="font-medium text-gray-800">
          {submittedEmail}
        </span>
        .
      </p>

      {/* Submit Another Response Button */}
      <button
        type="button"
        onClick={onSubmitAnother}
        className=" mt-6  bg-gradient-to-r from-yellow-500 to-yellow-700  text-white   font-bold  py-2   px-6  rounded-full shadow-xl  hover:shadow-yellow-500/30  transition-all  duration-300 hover:scale-105 "
      >
        Submit Another Response
      </button>
    </div>
  );
};

export default VolunteerSuccess;