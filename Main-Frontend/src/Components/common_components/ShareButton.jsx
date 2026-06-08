import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import ShareModal from '@/Components/common_components/ShareModal';

const ShareButton = ({ title, url, fullWidth = false, className = '' }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl border border-amber-500 text-amber-700 hover:bg-amber-100 hover:shadow-md transition-all duration-200 font-medium shadow-sm ${
          fullWidth ? 'w-full' : ''
        } ${className}`.trim()}
      >
        <FaShareAlt className="text-xs md:text-sm" />
        <span className="text-xs md:text-sm">Share</span>
      </button>

      <ShareModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        url={url}
      />
    </>
  );
};

export default ShareButton;
