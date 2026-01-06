import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 1. Logic to Show/Hide based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 2. Logic to actually scroll up smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    // We conditionally render the button ONLY if isVisible is true
    // We use a fixed position to keep it floating in the corner
    <div 
      className={`position-fixed bottom-0 end-0 p-4 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      style={{ 
        zIndex: 1000, 
        transition: 'opacity 0.4s ease-in-out',
        pointerEvents: isVisible ? 'auto' : 'none' // Prevents clicking when invisible
      }}
    >
      <button
        onClick={scrollToTop}
        className="btn btn-danger rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{ width: '50px', height: '50px' }}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-white" />
      </button>
    </div>
  );
};

export default ScrollToTop;