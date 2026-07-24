import { useEffect, useState } from "react";

const RAZORPAY_SCRIPT_URL =
  "https://checkout.razorpay.com/v1/checkout.js";

export default function useRazorpay() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // If already loaded
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");

    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      console.log("Razorpay SDK loaded successfully");
      setRazorpayLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      setRazorpayLoaded(false);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      const existingScript = document.querySelector(
        `script[src="${RAZORPAY_SCRIPT_URL}"]`
      );

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return razorpayLoaded;
}