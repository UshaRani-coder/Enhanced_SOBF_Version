import React from 'react';
import ShareButton from '@/components/common_components/ShareButton';

const SubscriptionSuccess = ({
  formData,
  amountMap,
  handleBackToHome,
  title,
  url,
}) => {
  const planNames = {
    '1_month': 'Monthly',
    '3_months': 'Quarterly',
    '6_months': 'Half-Yearly',
    '1_year': 'Yearly',
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        Thank You for Your Subscription! 🙏
      </h2>

      <p className="text-sm text-gray-700">
        Your subscription payment has been successfully processed. Here are your
        details:
      </p>

      {/* Details Card */}
      <div className="bg-white border border-amber-200 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-800">Name</p>
            <p>{formData.name}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Email</p>
            <p className="break-all">{formData.email}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Phone</p>
            <p>{formData.phone}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Plan</p>

            <p>
              {planNames[formData.duration]} ( ₹{amountMap[formData.duration]})
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleBackToHome}
          className="  border border-amber-500   text-amber-700  hover:bg-amber-100 text-sm  font-semibold  py-2   px-5   rounded-lg  transition"
        >
          Back to Home
        </button>

        <ShareButton
          title={title}
          url={url}
          className=" bg-amber-400  hover:bg-amber-500  text-black text-sm  py-2   px-5 "
        />
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
