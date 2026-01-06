import React, { useEffect, useState } from 'react';
import { FaGift, FaTimes, FaSpinner } from 'react-icons/fa'; // Added Spinner Icon
import confetti from 'canvas-confetti';

// PASTE YOUR GOOGLE SCRIPT URL HERE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_Vvxf4iyBy5La3oGwdFJcqxc_1A9VvfqKYT092_l8nG395b-FmEj2t612jLm3TSvi/exec"; 

const NewsletterModal = ({ show, onClose }) => {
  // STATE MANAGEMENT
  const [formData, setFormData] = useState({ fullName: '', mobile: '', email: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [message, setMessage] = useState('');

  // 1. CONFETTI LOGIC (unchanged)
  useEffect(() => {
    if (show) {
      const count = 200;
      const defaults = { origin: { y: 0.7 }, zIndex: 10000 };
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

  // RESET FORM ON CLOSE
  useEffect(() => {
    if (!show) {
      setStatus('idle');
      setMessage('');
      setFormData({ fullName: '', mobile: '', email: '' });
    }
  }, [show]);

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // HANDLE SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // We use 'no-cors' mode for Google Apps Script, but sending JSON blob is tricky.
      // The reliable standard method for React -> GAS is fetch with text/plain body.
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        // Using text/plain prevents "CORS preflight" errors
        body: JSON.stringify(formData) 
      });

      const data = await response.json();

      if (data.result === "success") {
        setStatus('success');
        setMessage("Success! Check your email for your gift.");
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || "Something went wrong.");
      }

    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
      setMessage("Connection failed. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div 
        className="bg-gradient-gift p-5 text-center position-relative shadow-lg mx-3" 
        style={{ 
          maxWidth: '600px', 
          width: '100%',
          border: '3px solid rgba(255,255,255,0.3)', 
          boxShadow: '0 0 50px rgba(220, 20, 60, 0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-3 rounded-circle"
          style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
          <FaTimes />
        </button>

        {/* UI: LOADING / SUCCESS / FORM */}
        {status === 'success' ? (
          <div className="py-5">
            <FaGift size={80} className="text-warning mb-4" />
            <h3 className="fw-bold text-white mb-3">Welcome to the Inner Circle!</h3>
            <p className="text-white-50">{message}</p>
          </div>
        ) : (
          <>
            <div className="mb-3 text-warning">
              <FaGift size={60} className="shake-animation" />
            </div>

            <h3 className="blink-text fw-bold mb-4 font-montserrat text-warning">
              Receive your first Gift with exciting updates Good For your business with No Commitment!
            </h3>
            
            <p className="mb-4 opacity-75 small text-white">
              Join Macrotek Digital Solutions today. No spam, just value.
            </p>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                className="form-control form-control-lg text-center"
                value={formData.fullName}
                onChange={handleChange}
                required 
                disabled={status === 'submitting'}
              />
              
              <input 
                type="tel" 
                name="mobile"
                placeholder="Mobile Number" 
                className="form-control form-control-lg text-center"
                value={formData.mobile}
                onChange={handleChange}
                required 
                disabled={status === 'submitting'}
              />
              
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                className="form-control form-control-lg text-center"
                value={formData.email}
                onChange={handleChange}
                required 
                disabled={status === 'submitting'}
              />

              {status === 'error' && (
                <div className="alert alert-danger py-2 small">{message}</div>
              )}

              <button 
                type="submit" 
                className="btn btn-light text-danger fw-bold btn-lg mt-3 shadow-sm transform-hover d-flex align-items-center justify-content-center gap-2"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <FaSpinner className="spin-animation" /> Processing...
                  </>
                ) : (
                  "Claim and Join For Free!"
                )}
              </button> 
            </form>
          </>
        )}

      </div>

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
        @keyframes spin { 
          100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } 
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsletterModal;