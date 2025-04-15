import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QRPayment = () => {
  // Your UPI details
  const upiDetails = {
    name: "Kumari Ranjana Yadav",
    upiId: "9667188563@ptsbi",
    note: "Donation for social cause"
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    transactionId: '',
  });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.amount) {
      toast.error('Please fill all required fields');
      return;
    }

    if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      toast.error('Please enter a valid amount greater than 0');
      return;
    }

    toast.success('Please scan the QR code to complete payment');
  };

  const confirmPayment = () => {
    if (!formData.transactionId) {
      toast.error('Please enter transaction ID');
      return;
    }
    setPaymentConfirmed(true);
    toast.success('Payment confirmed! Thank you for your donation');
  };

  // Generate UPI payment link with your details
  const paymentLink = `upi://pay?pa=${upiDetails.upiId}&pn=${encodeURIComponent(upiDetails.name)}&am=${formData.amount}&cu=INR&tn=${encodeURIComponent(upiDetails.note)}`;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-44 mb-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Make a Donation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Generate Payment QR Code
        </button>
      </form>

      {formData.amount && (
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-4">Scan to Pay via UPI</h3>

          <div className="flex flex-col items-center">
            <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg mb-4 bg-white">
              <QRCodeSVG
                value={paymentLink}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-md w-full">
              <p className="text-sm font-medium">Pay to: <span className="font-bold">{upiDetails.name}</span></p>
              <p className="text-sm font-medium">UPI ID: <span className="font-mono">{upiDetails.upiId}</span></p>
              <p className="text-sm font-medium">Amount: <span className="font-bold">₹{formData.amount}</span></p>
            </div>

            {!paymentConfirmed ? (
              <div className="w-full">
                <div className="mb-4 bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">After payment:</h4>
                  <ol className="list-decimal list-inside text-sm space-y-1 text-left">
                    <li>Complete payment in your UPI app</li>
                    <li>Check payment confirmation</li>
                    <li>Find the Transaction ID/UTR</li>
                    <li>Enter it below to confirm</li>
                  </ol>
                </div>

                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="Enter Transaction ID/UTR"
                  className="w-full px-4 py-2 border rounded-md mb-2"
                  required
                />
                <button
                  onClick={confirmPayment}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                >
                  Confirm Payment
                </button>
              </div>
            ) : (
              <div className="w-full p-3 bg-green-100 text-green-800 rounded-md">
                Payment confirmed! Thank you for supporting our cause.
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default QRPayment;