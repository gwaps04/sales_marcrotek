import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookingSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(now);
      target.setHours(24, 0, 0, 0);
      const difference = target - now;
      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => num.toString().padStart(2, '0');

  return (
    <section id="book" className="section-padding py-5 bg-gradient-booking font-montserrat">
      <div className="container py-5 text-center">
        <div className="row mb-4" data-aos="fade-down">
          <div className="col-lg-8 mx-auto">
            <h5 className="text-uppercase text-info fw-bold letter-spacing-2">Start Your Transformation</h5>
            <h2 className="display-4 fw-bold text-white mb-3">See the System in Action</h2>
          </div>
        </div>

        {/* TIMER MODULE */}
        <div className="row justify-content-center mb-5" data-aos="zoom-in">
          <div className="col-md-8 col-lg-6">
            <div className="bg-white text-dark rounded-4 p-4 shadow-lg border border-4 border-danger position-relative">
              <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 fw-bold small rounded-bottom-start">
                LIMITED TIME OFFER
              </div>
              <h3 className="fw-bolder text-danger mb-1">Avail 30% OFF</h3>
              <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                <div className="text-center">
                  <div className="bg-dark text-white rounded-3 p-2 h3 mb-0 font-monospace">{formatTime(timeLeft.hours)}</div>
                  <small className="text-muted fw-bold">HRS</small>
                </div>
                <div className="h3 mb-3">:</div>
                <div className="text-center">
                  <div className="bg-dark text-white rounded-3 p-2 h3 mb-0 font-monospace">{formatTime(timeLeft.minutes)}</div>
                  <small className="text-muted fw-bold">MIN</small>
                </div>
                <div className="h3 mb-3">:</div>
                <div className="text-center">
                  <div className="bg-danger text-white rounded-3 p-2 h3 mb-0 font-monospace animate-pulse">{formatTime(timeLeft.seconds)}</div>
                  <small className="text-danger fw-bold">SEC</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA LINK */}
        <div data-aos="fade-up">
          <Link 
            to="/book-now" 
            className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
            style={{ fontSize: '1.25rem' }}
          >
            <i className="bi bi-calendar-check me-2"></i>
            Lock In My 30% Discount & Schedule Now
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }
        .animate-pulse { animation: pulse-red 1.5s infinite; }
      `}</style>
    </section>
  );
};

export default BookingSection;