import React, { useRef, useEffect, useState } from 'react';
import Popup from '../common_components/Popup.jsx';

const HeroVideo = () => {
  const videoRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement
        .play()
        .catch((error) => console.error('Video play error:', error));
    }
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      {showPopup && <Popup onClose={closePopup} />}

      <video
        ref={videoRef}
        src="https://drive.google.com/uc?export=download&id=1uu1XRi-n414LpZnCABFYI-vmTA00w3TW"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* <video
        ref={videoRef}
        src="https://drive.google.com/uc?id=1uu1XRi-n414LpZnCABFYI-vmTA00w3TW"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      /> */}
    </div>
  );
};

export default HeroVideo;
