import React, { useEffect } from 'react';
import { FaGift, FaTimes } from 'react-icons/fa';
import confetti from 'canvas-confetti'; // Import the confetti engine

const NewsletterModal = ({ show, onClose }) => {
  // 1. CONFETTI LOGIC
  useEffect(() => {
    if (show) {
      // Trigger a "Real cannon" explosion from the bottom-center
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }, // Start a bit lower on the screen
        zIndex: 10000,      // IMPORTANT: Must be higher than the modal overlay (9999)
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      // Fire multiple bursts for a "Party" effect
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [show]); // Only run this when 'show' changes to true

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your gift is on its way. (This is where we would connect to your CRM/Database)");
    onClose();
  };

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      {/* Stop click propagation so clicking inside the box doesn't close it */}
      <div 
        className="bg-gradient-gift p-5 text-center position-relative shadow-lg mx-3" 
        style={{ 
          maxWidth: '600px', 
          width: '100%',
          border: '3px solid rgba(255,255,255,0.3)', // Added Glass border
          boxShadow: '0 0 50px rgba(220, 20, 60, 0.6)' // Red glow effect
        }}
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in" // This handles the "Pop" animation
      >
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-3 rounded-circle"
          style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
          <FaTimes />
        </button>

        {/* Icon */}
        <div className="mb-3 text-warning">
          <FaGift size={60} className="shake-animation" /> {/* Added shake animation class */}
        </div>

        {/* BLINKING HEADLINE */}
        <h3 className="blink-text fw-bold mb-4 font-montserrat text-warning">
          Receive your first Gift with exciting updates Good For your business with No Commitment!
        </h3>
        
        <p className="mb-4 opacity-75 small text-white">
          Join Macrotek Digital Solutions today. No spam, just value.
        </p>

        {/* The Input Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          
          <input 
            type="text" 
            placeholder="Full Name" 
            className="form-control form-control-lg text-center"
            required 
          />
          
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            className="form-control form-control-lg text-center"
            required 
          />
          
          <input 
            type="email" 
            placeholder="Email Address" 
            className="form-control form-control-lg text-center"
            required 
          />

          <button 
            type="submit" 
            className="btn btn-light text-danger fw-bold btn-lg mt-3 shadow-sm transform-hover"
          >
            Claim and Join For Free!
          </button> 
        </form>

      </div>

      {/* Inline styles for the icon shake */}
      <style>{`
        @keyframes shake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
        .shake-animation {
          animation: shake 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NewsletterModal;