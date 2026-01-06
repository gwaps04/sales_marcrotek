import React, { useState } from 'react';
import NewsletterModal from './NewsletterModal';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* OPTIMIZATION 1: Removed manual padding (paddingTop: 220px).
        Added 'd-flex align-items-center' to perfectly center content vertically
        on ALL screen sizes automatically.
      */}
      <header className="hero-section text-white d-flex align-items-center font-montserrat">
        
        {/* The Dark Overlay */}
        <div className="hero-overlay"></div>

        <div className="container hero-content position-relative z-2">
          <div className="row justify-content-center">
            
            {/* OPTIMIZATION 2: Mobile Spacing
              - 'col-12': Full width on mobile.
              - 'px-3': Adds padding on the sides so text doesn't hit the phone screen edge.
            */}
            <div className="col-12 col-lg-10 text-center px-3">
              
              <div className="hero-text-group">
                {/* Added 'd-none d-md-block' break to stack text nicely on desktop 
                   but let it flow naturally on mobile 
                */}
                <h1 className="display-3 fw-bold mb-4" data-aos="fade-down">
                  Let your website get <br className="d-none d-md-block" />
                  {/* Added a text highlight color for professional contrast */}
                  <span className="text-danger">customers for you.</span>
                </h1>

                <p 
                  className="lead mb-5 fs-4 opacity-90 mx-auto" 
                  style={{ maxWidth: '800px' }}
                  data-aos="fade-up" 
                  data-aos-delay="100"
                >
                  We create affordable, automated digital storefronts that capture customers while you sleep.
                </p>
              </div>

              {/* OPTIMIZATION 3: Button Interaction
                Added 'transform-hover' (assuming you might add this class to CSS later for hover effects)
                or standard Bootstrap shadow-lg for "pop".
              */}
              <button 
                onClick={() => setShowModal(true)}
                className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
                style={{ transition: 'transform 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                Learn More
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* The Modal Component */}
      <NewsletterModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default Hero;