import React, { useRef, useEffect, useState } from 'react';
import video from '../../assets/sobf.mp4';
import Popup from '../common_components/Popup.jsx';

const HeroVideo = () => {
  const videoRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

     useEffect(() => {
       // Always show the popup on every page refresh
       setShowPopup(true);
     }, []);

     const closePopup = () => {
       setShowPopup(false);
    };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.play();
    }
  }, []);

  return (
    <div className=" w-[100%] h-[100vh] overflow-hidden ">
      {showPopup && <Popup onClose={closePopup} />}
      
      <video
        ref={videoRef}
        src={video}
        className=" w-full h-full object-cover"
      />
      
      
    </div>
  );
};

export default HeroVideo;
