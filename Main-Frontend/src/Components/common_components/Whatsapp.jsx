
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '../../assets/Sobf Images/people/TarunMisra_Sir.png';
import './whatsapp.css';

const Whatsapp = () => {
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

      setShowButton(window.scrollY > scrollThreshold);
    };

    // Show immediately on pages other than Home
    if (location.pathname !== '/') {
      setShowButton(true);
      return;
    }

    // Home page: show after scrolling
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    // Check current scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleWhatsAppClick = () => {
    const message = 'Hello Soul of Braj Federation! How can we help you today?';

    const whatsappUrl = `https://wa.me/918439406670?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!showButton) {
    return null;
  }

  return (
    <div className="whatsapp-wrapper">
      {/* Chat popup */}
      {isOpen && (
        <div className="whatsapp-chat">
          <div className="whatsapp-chat-header">
            <div className="whatsapp-profile">
              <img
                src={Avatar}
                alt="Soul of Braj Federation"
                className="whatsapp-avatar"
                width="45"
                height="45"
              />

              <div className="whatsapp-profile-info">
                <div className="whatsapp-account-name">
                  Soul Of Braj Federation
                </div>

                <div className="whatsapp-status">
                  Typically replies instantly
                </div>
              </div>
            </div>

            <button
              type="button"
              className="whatsapp-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat"
            >
              ×
            </button>
          </div>

          <div className="whatsapp-chat-body">
            <div className="whatsapp-message">
              <div className="whatsapp-message-name">
                Soul Of Braj Federation
              </div>

              <p>
                Welcome to Soul of Braj Federation!
                <br />
                How can we help you today?
              </p>
            </div>
          </div>

          <button
            type="button"
            className="whatsapp-start-button"
            onClick={handleWhatsAppClick}
          >
            
            Start Chat
          </button>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        className="whatsapp-floating-button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={isOpen}
      >
        <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.49 0 .15 5.34.15 11.9c0 2.1.55 4.15 1.6 5.95L.05 24l6.3-1.65a11.88 11.88 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.44-8.42ZM12.06 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 1 1 8.36 4.63Zm5.41-7.39c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.04-1.06 2.54 0 1.5 1.08 2.95 1.23 3.15.15.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.72.63.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
        </svg>

        {!isOpen && <span className="whatsapp-notification">1</span>}
      </button>
    </div>
  );
};

export default Whatsapp;
