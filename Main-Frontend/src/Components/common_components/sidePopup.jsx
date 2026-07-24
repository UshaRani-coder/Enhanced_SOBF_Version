import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
export default function SidePopup() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false); // Initially hidden
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      let scrollThreshold = 500;
      if (window.innerWidth >= 1280) {
        scrollThreshold = 800;
      } else if (window.innerWidth >= 1024) {
        scrollThreshold = 1000;
      } else if (window.innerWidth >= 768) {
        scrollThreshold = 700;
      }
  
      // Show button when scrolled beyond threshold
      setShowButton(window.scrollY > scrollThreshold);
    };
  
    // Always add the scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Show button immediately on non-home pages
    if (location.pathname !== '/') {
      setShowButton(true);
    }
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  
  return (
    <div className="fixed bottom-[70px] md:bottom-[80px]  left-[10px] lg:left-[20px] flex flex-col items-center md:items-end z-50">
      {/* Floating Button with Side-to-Side Animation */}
      {showButton && (
        <motion.button
          // initial={{ x: 0, opacity: 0 }}
          animate={{ x: [-15, 15, -15, 15], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-4 py-3 rounded-full 
                     shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-2 relative"
        >
          <Leaf size={15} />
          <span className="hidden md:block">Support Initiative</span>

          {/* Close (X) Button Inside the Floating Button */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowButton(false);
            }}
            className="absolute -top-2 -right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition"
          >
            <X size={10} />
          </div>
        </motion.button>
      )}

      {/* Animated Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }} // Appears from left
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }} // Exits to left
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }} // Fast and smooth
            className="w-[90%] bg-white  rounded-lg p-4 mt-4 border border-gray-200 
             shadow-[0px_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0px_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Join the Cause
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Swachh Yamuna & Swasth Vrindavan */}
            <div className="mt-4 flex items-start gap-3">
              <Leaf className="text-green-600" size={24} />
              <div>
                <h4 className="text-md font-semibold text-green-700">
                  Swachh Yamuna & Swasth Vrindavan
                </h4>
                <p className="text-sm text-gray-600">
                  Help us keep Vrindavan clean & healthy for all.
                </p>
              </div>
            </div>

            {/* Sadhu Seva */}
            <div className="mt-4 flex items-start gap-3">
              <Heart className="text-orange" size={24} />
              <div>
                <h4 className="text-md font-semibold text-orange">
                  Sadhu Seva
                </h4>
                <p className="text-sm text-gray-600">
                  Support sadhus with food, shelter, and essentials.
                </p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-6 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-green-600 text-white px-2 py-2 rounded-md shadow-md flex-1 text-[12px] small-max:text-[15px]"
                onClick={() => navigate('/swachh-vrindavan')}
              >
                Support Yamuna 
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-orange text-white px-2 py-2 rounded-md shadow-md flex-1 text-[12px] small-max:text-[15px]"
                onClick={() => navigate('/sadhu-seva')}
              >
                Help Sadhus 
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
