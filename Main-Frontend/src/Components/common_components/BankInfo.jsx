

import qrCodeImage from "../assets/QRCode.png";

const BankDetailsModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Complete Your Donation</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-blue mb-3 text-lg">Bank Transfer Details</h4>
            <div className="space-y-3 text-gray-700">
              <p><span className="font-medium">Bank Name:</span> Axis Bank</p>
              <p><span className="font-medium">Account Number:</span> 920020058749691</p>
              <p><span className="font-medium">IFSC Code:</span> UTIB0000794</p>
              <p><span className="font-medium">Branch:</span> VRINDAVAN</p>
              <p><span className="font-medium">Account Type:</span> Current</p>
              <p><span className="font-medium">Account Name:</span> Your Organization Name</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3 text-lg">UPI Payment</h4>
            <div className="flex flex-col items-center">
              <img
                src={qrCodeImage}
                alt="UPI QR Code"
                width={220}
                height={220}
                className="mb-4 border-2 border-green-300 rounded-lg"
              />
              <p className="text-sm text-gray-600 mb-2">Scan the QR code or use this UPI ID:</p>
              <p className="font-medium text-green-700">yourorg@upi</p>
            </div>
          </div>
        </div>
        <button
          onClick={handlePaymentCompletion}
          disabled={isSubmitting}
          className={`w-full mt-6 bg-blue hover:bg-blue text-white py-3 rounded-lg transition-colors font-medium text-lg flex items-center justify-center ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "I've Completed the Payment"
          )}
        </button>
      </div>
    </div>
  );

  export default BankDetailsModal