import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const scrollToHash = () => {
      const element = document.getElementById(hash.substring(1));

      if (element) {
        element.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });

        return true;
      }

      return false;
    };

    // Try after the new page has rendered
    requestAnimationFrame(() => {
      if (!scrollToHash()) {
        setTimeout(scrollToHash, 50);
      }
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
