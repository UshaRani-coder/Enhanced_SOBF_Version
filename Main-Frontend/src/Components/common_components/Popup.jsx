import { X } from "lucide-react";
import image from "../../assets/pop4.png";
import { Link } from "react-router-dom";

const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pt-64 bg-black bg-opacity-30 z-[99999]">
      <div
        className="relative w-[90%] max-w-4xl h-[100vh] rounded-lg overflow-hidden flex flex-col"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-2"
          onClick={onClose}
        >
          <X size={15} />
        </button>

        {/* Overlay for Text Readability */}
        <div className="bg-black bg-opacity-40 w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-4xl lg:text-7xl font-sans font-extrabold text-white mb-4">
            Support Our Cause
          </h2>
          <p className="text-lg font-bold lg:text-2xl text-white mb-6 max-w-lg">
            Your donation helps us continue our mission to serve those in need.
          </p>
          {/* Donate Button with Heartbeat Animation */}
          <Link to={"/donate-us"} onClick={onClose}>
            <button className="bg-orange animate-bounce hover:bg-red-700 text-white px-6 text-md py-3 rounded-lg font-semibold shadow-md ">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
