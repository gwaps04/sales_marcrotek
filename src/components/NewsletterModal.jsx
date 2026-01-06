import React from 'react';
import { FaGift, FaTimes } from 'react-icons/fa';

const NewsletterModal = ({ show, onClose }) => {
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
        style={{ maxWidth: '600px', width: '100%' }}
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-3 rounded-circle"
        >
          <FaTimes />
        </button>

        {/* Icon */}
        <div className="mb-3 text-warning">
          <FaGift size={50} />
        </div>

        {/* BLINKING HEADLINE */}
        <h3 className="blink-text fw-bold mb-4 font-montserrat text-warning">
          Receive your first Gift with exciting newsletters Good For your business ALL FOR FREE!
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
            className="btn btn-light text-danger fw-bold btn-lg mt-3 shadow-sm"
          >
            CLAIM MY GIFT NOW
          </button>
        </form>

      </div>
    </div>
  );
};

export default NewsletterModal;