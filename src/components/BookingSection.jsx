import React, { useState, useEffect } from 'react';
import { PopupModal } from "react-calendly"; 

const BookingSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // 1. COUNTDOWN LOGIC (Resets every 24 hours at midnight)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target is "Tomorrow at 00:00:00"
      const target = new Date(now);
      target.setHours(24, 0, 0, 0);

      const difference = target - now;

      // Calculate HH:MM:SS
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours: h, minutes: m, seconds: s });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Run immediately to avoid 00:00:00 flash

    return () => clearInterval(timer);
  }, []);

  // Helper to add "0" before single digits (e.g., "5" becomes "05")
  const formatTime = (num) => num.toString().padStart(2, '0');

  return (
    <section id="book" className="section-padding py-5 bg-gradient-booking font-montserrat">
      <div className="container py-5 text-center">
        
        {/* HEADLINES */}
        <div className="row mb-4" data-aos="fade-down">
          <div className="col-lg-8 mx-auto">
            <h5 className="text-uppercase text-info fw-bold letter-spacing-2">
              Start Your Transformation
            </h5>
            <h2 className="display-4 fw-bold text-white mb-3">
              See the System in Action
            </h2>
            <p className="lead text-light opacity-75">
              Stop guessing and start scaling. The market moves fast—competitors are stealing 
              your leads while you think about it.
            </p>
          </div>
        </div>

        {/* 2. URGENCY MODULE (The Timer) */}
        <div className="row justify-content-center mb-5" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-md-8 col-lg-6">
            <div className="bg-white text-dark rounded-4 p-4 shadow-lg border border-4 border-danger position-relative overflow-hidden">
              
              {/* Pulsing "Live" Badge */}
              <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 fw-bold small rounded-bottom-start">
                LIMITED TIME OFFER
              </div>

              <h3 className="fw-bolder text-danger text-uppercase mb-1">
                Avail 30% OFF
              </h3>
              <p className="text-muted small mb-3 fw-bold">
                Your Strategic Implementation Discount Expires In:
              </p>

              {/* THE CLOCK */}
              <div className="d-flex justify-content-center align-items-center gap-2 gap-md-3 mb-3">
                
                {/* Hours */}
                <div className="text-center">
                  <div className="bg-dark text-white rounded-3 p-2 display-6 fw-bold font-monospace shadow-sm">
                    {formatTime(timeLeft.hours)}
                  </div>
                  <small className="text-muted fw-bold" style={{ fontSize: '0.7rem' }}>HRS</small>
                </div>
                
                <div className="display-6 fw-bold text-secondary pb-4">:</div>
                
                {/* Minutes */}
                <div className="text-center">
                  <div className="bg-dark text-white rounded-3 p-2 display-6 fw-bold font-monospace shadow-sm">
                    {formatTime(timeLeft.minutes)}
                  </div>
                  <small className="text-muted fw-bold" style={{ fontSize: '0.7rem' }}>MIN</small>
                </div>
                
                <div className="display-6 fw-bold text-secondary pb-4">:</div>

                {/* Seconds (Red for Urgency) */}
                <div className="text-center">
                  <div className="bg-danger text-white rounded-3 p-2 display-6 fw-bold font-monospace shadow-sm animate-pulse">
                    {formatTime(timeLeft.seconds)}
                  </div>
                  <small className="text-danger fw-bold" style={{ fontSize: '0.7rem' }}>SEC</small>
                </div>

              </div>

              <p className="small text-muted mb-0 fst-italic">
                "Procrastination is the most expensive habit in business."
              </p>
            </div>
          </div>
        </div>

        {/* 3. THE TRIGGER BUTTON (Persuasive Update) */}
        <div data-aos="fade-up" data-aos-delay="200">
          <button 
            className="btn btn-danger btn-lg rounded-pill px-5 py-4 fw-bold shadow-lg display-6"
            style={{ fontSize: '1.4rem', transition: 'transform 0.2s' }}
            onClick={() => setIsOpen(true)}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <i className="bi bi-lock-fill me-2"></i>
            Lock In My 30% Discount & Demo
          </button>

          <p className="text-white-50 mt-4 small">
            <i className="bi bi-shield-fill-check me-1"></i>
            Zero Risk. 100% Clarity. This offer resets at midnight.
          </p>
        </div>

        {/* 4. CALENDLY POPUP */}
        <PopupModal 
          url="https://calendly.com/jeisonmillena/live-demo-calendar" 
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={document.getElementById("root")}
        />

      </div>

      {/* INLINE STYLE FOR PULSE ANIMATION */}
      <style>{`
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }
        .animate-pulse {
          animation: pulse-red 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default BookingSection;