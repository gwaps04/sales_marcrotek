import React, { useState } from 'react';
import NewsletterModal from './NewsletterModal'; // 1. Import the new component

const Hero = () => {
  // 2. State to manage the popup visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header 
        className="hero-section text-white text-center" 
        style={{ paddingTop: '220px', paddingBottom: '100px' }}
      >
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <div className="row justify-content-center">
            
            <div className="col-lg-10 hero-hover-trigger" data-aos="fade-up">
              
              <div className="hero-text-group">
                <h1 className="display-3 fw-bold mb-4">
                  Let your website get customers for you.
                </h1>

                <p className="lead mb-5 fs-4">
                  We create affordable, automated digital storefronts that capture customers while you sleep.
                </p>
              </div>

              {/* 3. BUTTON CHANGED:
                  - Removed href="#services"
                  - Added onClick to open modal
              */}
              <button 
                onClick={() => setShowModal(true)}
                className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-bold shadow"
              >
                Learn More
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* 4. RENDER THE MODAL HERE 
          It sits outside the header structure but inside the component return
      */}
      <NewsletterModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default Hero;