import React, { useState } from 'react';
// 1. Import PopupModal instead of InlineWidget
import { PopupModal } from "react-calendly"; 

const BookingSection = () => {
  // 2. State to control the popup (Open/Close)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="book" className="section-padding py-5 bg-gradient-booking font-montserrat">
      <div className="container py-5 text-center">
        
        {/* HEADLINES */}
        <div className="row mb-5" data-aos="fade-down">
          <div className="col-lg-8 mx-auto">
            <h5 className="text-uppercase text-info fw-bold letter-spacing-2">
              Start Your Transformation
            </h5>
            <h2 className="display-4 fw-bold text-white mb-3">
              See the System in Action
            </h2>
            <p className="lead text-light opacity-75 mb-5">
              Stop guessing and start scaling. Book a live demo to see exactly how we build 
              24/7 sales engines for businesses like yours.
            </p>

            {/* 3. THE TRIGGER BUTTON */}
            <button 
              className="btn btn-danger btn-lg rounded-pill px-5 py-4 fw-bold shadow-lg display-6"
              style={{ fontSize: '1.5rem', transition: 'transform 0.2s' }}
              onClick={() => setIsOpen(true)} // Opens the modal
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <i className="bi bi-calendar-check-fill me-2"></i>
              Book a Live Demo
            </button>

            <p className="text-white-50 mt-4 small">
              <i className="bi bi-lock-fill me-1"></i>
              No pressure. Just a conversation about your growth.
            </p>
          </div>
        </div>

        {/* 4. THE INVISIBLE POPUP COMPONENT 
             This sits here silently until 'isOpen' becomes true.
        */}
        <PopupModal 
          url="https://calendly.com/jeisonmillena/live-demo-calendar" /* <--- PASTE YOUR CALENDLY LINK HERE */
          
          /* This tells the modal to show when 'isOpen' is true */
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          
          /* IMPORTANT: This targets the main 'root' div of your React app 
             to ensure the popup overlays everything correctly. */
          rootElement={document.getElementById("root")}
        />

      </div>
    </section>
  );
};

export default BookingSection;