import {
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter,
  FaTelegramPlane,
  FaCopy,
} from 'react-icons/fa';
import { MdEmail, MdSms, MdShare } from 'react-icons/md';

export const getSharePlatforms = ({ title, url, onCopy }) => {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [];

  // ✅ 1. Add Web Share API if supported (mobile native share)
  if (typeof window !== 'undefined' && navigator.share) {
    platforms.push({
      name: 'Device Share',
      icon: <MdShare />,
      action: () => {
        navigator
          .share({
            title,
            text: title,
            url,
          })
          .catch((error) => console.log('Share cancelled', error));
      },
    });
  }

  // ✅ 2. Add all standard platforms
  platforms.push(
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedURL}`,
    },
    {
      name: 'Email',
      icon: <MdEmail />,
      url: `mailto:?subject=${encodedTitle}&body=Check this out: ${encodedURL}`,
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}%20${encodedURL}`,
    },
    {
      name: 'Telegram',
      icon: <FaTelegramPlane />,
      url: `https://t.me/share/url?url=${encodedURL}&text=${encodedTitle}`,
    },
    {
      name: 'SMS',
      icon: <MdSms />,
      url: `sms:?&body=${encodedTitle}%20-%20${encodedURL}`,
    },
    {
      name: 'Copy Link',
      icon: <FaCopy />,
      action: () => {
        navigator.clipboard
          .writeText(url)
          .then(() => {
            if (onCopy) onCopy();
          })
          .catch(() => alert('Failed to copy link.'));
      },
    },
  );

  return platforms;
};
