import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getSharePlatforms } from '@/utils/sharePlatforms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShareModal = ({ isOpen, onClose, title, url }) => {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef();
  const hasCopiedOnce = useRef(false); // Prevent duplicate toasts in StrictMode

  const platforms = getSharePlatforms({
    title,
    url,
    onCopy: () => {
      if (!hasCopiedOnce.current) {
        setCopied(true);
        toast.success('Link copied to clipboard!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          style: {
            backgroundColor: '#f5b20b',
            color: '#000',
          },
          className: 'custom-toast',
        });
        hasCopiedOnce.current = true;
        setTimeout(() => {
          setCopied(false);
          hasCopiedOnce.current = false;
        }, 2000);
      }
    },
  });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on click outside modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  return createPortal (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Share this</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-black text-lg"
              >
                ✖
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {platforms.map((platform, idx) => {
                if (platform.url) {
                  return (
                    <a
                      key={idx}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-gray-700 hover:text-blue-600 hover:text-gray-900"
                    >
                      <div className="text-2xl">{platform.icon}</div>
                      <span className="mt-1 text-sm text-center">{platform.name}</span>
                    </a>
                  );
                }

                if (platform.action) {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        platform.action();
                        if (platform.name !== 'Copy Link') {
                          onClose();
                        }
                      }}
                      className="flex flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                      <div className="text-2xl">{platform.icon}</div>
                      <span className="mt-1 text-sm text-center">
                        {copied && platform.name === 'Copy Link' ? 'Copied!' : platform.name}
                      </span>
                    </button>
                  );
                }

                return null;
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body // important (render on the full page, not inside small div)
  );
};

export default ShareModal;
