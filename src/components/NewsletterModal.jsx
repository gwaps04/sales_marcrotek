import React, { useEffect, useState } from 'react';
import { FaGift, FaTimes, FaSpinner } from 'react-icons/fa'; 
import confetti from 'canvas-confetti';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2do_afm9D-VqkJqLZg7hFyGvOxIKAAuX3kICXpBu8JU1iQv_6Dy31Hy8AAaJc74yQ/exec"; 

const NewsletterModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({ fullName: '', mobile: '', email: '' });
  const [status, setStatus] = useState('idle'); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (show) {
      const count = 200;
      const defaults = { origin: { y: 0.7 }, zIndex: 11000 };
      function fire(particleRatio, opts) {
        confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
      }
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [show]);

  useEffect(() => {
    if (!show) {
      setStatus('idle');
      setMessage('');
      setFormData({ fullName: '', mobile: '', email: '' });
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData) 
      });
      const data = await response.json();
      if (data.result === "success") {
        setStatus('success');
        setMessage("Success! Check your email for your gift.");
        setTimeout(() => { onClose(); }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus('error');
      setMessage("Connection failed. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div 
        className="bg-gradient-gift p-4 p-md-5 text-center shadow-lg mx-2" 
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        
        {/* IMPROVED CLOSE BUTTON: High visibility */}
        <button 
          onClick={onClose}
          className="btn btn-dark text-white position-absolute top-0 end-0 m-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
          style={{ width: '35px', height: '35px', zIndex: 10, border: '2px solid rgba(255,255,255,0.5)' }}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {status === 'success' ? (
          <div className="py-4">
            <FaGift size={60} className="text-warning mb-3" />
            <h3 className="fw-bold text-white mb-2">Welcome to the Inner Circle!</h3>
            <p className="text-white-50 small">{message}</p>
          </div>
        ) : (
          <>
            <div className="mb-2 text-warning">
              <FaGift size={50} className="shake-animation" />
            </div>

            <h3 className="blink-text fw-bold mb-3 font-montserrat text-warning h4">
              Unlock Your Exclusive Business Gift!
            </h3>
            
            <p className="mb-4 opacity-88 small text-white">
              No Commitment. Just pure value from Macrotek Digital Solutions.
            </p>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
              <input 
                type="text" name="fullName" placeholder="Full Name" 
                className="form-control form-control-lg text-center fs-6"
                value={formData.fullName} onChange={handleChange} required disabled={status === 'submitting'}
              />
              <input 
                type="tel" name="mobile" placeholder="Mobile Number" 
                className="form-control form-control-lg text-center fs-6"
                value={formData.mobile} onChange={handleChange} required disabled={status === 'submitting'}
              />
              <input 
                type="email" name="email" placeholder="Email Address" 
                className="form-control form-control-lg text-center fs-6"
                value={formData.email} onChange={handleChange} required disabled={status === 'submitting'}
              />

              {status === 'error' && <div className="alert alert-danger py-1 small">{message}</div>}

              <button 
                type="submit" 
                className="btn btn-light text-danger fw-bold btn-lg mt-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? <><FaSpinner className="spin-animation" /> Submitting...</> : "Claim My Gift Now!"}
              </button> 
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;