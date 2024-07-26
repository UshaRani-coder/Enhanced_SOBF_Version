import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ContactUs from "../pages/Contactus";

// npm i @emailjs/browser

const ContactUsPage = () => {
  // Reference for the form element
  const form = useRef();
  
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to store submission message
  const [submitMessage, setSubmitMessage] = useState("");

  // Handler to update form data state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Sending the form data using emailjs
    emailjs
      .sendForm(
        "service_5pnbrna", // Service ID
        "template_1qb8sbl", // Template ID
        form.current, // Form reference
        "cMxdmY6NY1lUSrCy7" // User ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitMessage("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form data
          form.current.reset(); // Reset the form fields
        },
        (error) => {
          console.log(error.text);
          setSubmitMessage("Failed to send. Please try again later.");
          setFormData({ name: "", email: "", message: "" }); // Reset form data
          form.current.reset(); // Reset the form fields
        }
      )
      // Set isSubmitting to false after the form submission is complete
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Component to display toast messages
  const ToastMessage = ({ submitMessage }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      // Set a timer to hide the message after 3 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setSubmitMessage(""); // Clear the submit message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }, [submitMessage]);

    if (!visible) return null;

    // Display the message with a green color for success and red for failure
    return (
      <p
        className={`mt-4 text-center ${
          submitMessage.includes("success")
            ? "text-green-600 delay-75 duration-200"
            : "text-red-600"
        }`}
      >
        {submitMessage}
      </p>
    );
  };

  return (
    <>
      {/* Contact Us Form parent div */}
      <div className="flex flex-col lg:flex-row mx-[3rem] lg:gap-10 gap-16 md:mt-40 mt-36 ">
        {/*  Form div */}
        <div className="lg:w-[50%] w-[100%]  ">
          <h3 className="text-start text-4xl font-bold mb-4 pb-5 text-orange hover:text-blue relative hover:text-blue-900 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
            Have any questions?
          </h3>
          <p className="text-gray-600 mb-6">
            If you have any questions or feedback, fill out the form below, and we'll get back to you.
          </p>
          <form ref={form} onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-3 rounded-md bg-[#FCF7F5] border border-gray-400"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            {/* Email field */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full p-3 rounded-md bg-[#FCF7F5] border border-gray-400"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            {/* Message field */}
            <div className="mb-6">
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                className="w-full p-3 rounded-md bg-[#FCF7F5] border font-poppins border-gray-400 resize-none"
                onChange={handleChange}
                value={formData.message}
                required
              ></textarea>
            </div>
            {/* Submit button */}
            <div className="flex justify-center md:p-4 p-2">
              <button
                type="submit"
                className="bg-blue text-white md:py-2 md:px-6 py-1.5 px-5  rounded-full hover:bg-orange transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          {/* if button is clicked, show the toast message */}
          {submitMessage && <ToastMessage submitMessage={submitMessage} />}
        </div>
        {/* Map div */}
        <div className="lg:w-3/5 w-[100%] ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.924050891156!2d77.67002927546226!3d27.564867476264563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736fffb9ab491f%3A0xf32c290c550ecc7b!2sSoul%20Of%20Braj%20Federation!5e0!3m2!1sen!2sus!4v1721823186502!5m2!1sen!2sus"
            className="border-0 rounded-lg w-[100%] md:h-[500px] h-[300px]"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
      {/* Contact Us Form parent div */}
      <div className="md:py-0 py-10">
        <ContactUs />
      </div>
    </>
  );
};

export default ContactUsPage;
