import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  // MENTOR NOTE: We use the useNavigate hook to redirect users programmatically
  const navigate = useNavigate();

  return (
    <>
      <header className="hero-section d-flex align-items-center font-montserrat position-relative overflow-hidden">
        <div className="hero-bg-gradient position-absolute top-0 start-0 w-100 h-100 z-0"></div>

        <div className="container position-relative z-2">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 text-center text-lg-start order-2 order-lg-1">
              <div className="hero-text-group pe-lg-5">
                <h5 className="text-uppercase text-danger fw-bold letter-spacing-2 mb-3" data-aos="fade-down">
                  Digital Growth Architects
                </h5>
                
                <h1 className="display-4 fw-bold mb-4 text-dark" style={{ lineHeight: '1.2' }} data-aos="fade-right" data-aos-delay="100">
                  Let your website get <br className="d-none d-lg-block" />
                  <span className="text-transparent bg-clip-text bg-gradient-red" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(90deg, #ff416c, #ff4b2b)' }}>
                    customers for you.
                  </span>
                </h1>

                <p className="lead mb-5 text-muted mx-auto mx-lg-0" style={{ maxWidth: '500px' }} data-aos="fade-up" data-aos-delay="200">
                  We create affordable, automated digital storefronts that capture customers while you sleep. Stop relying on luck—start relying on systems.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="300">
                  {/* CHANGED: Now navigates to /assessment */}
                  <button 
                    onClick={() => navigate('/assessment')}
                    className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg"
                    style={{ transition: 'transform 0.2s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                     Start My Growth Now
                  </button>
                  
                  <a href="#services" className="btn btn-outline-dark btn-lg rounded-pill px-5 py-3 fw-bold">
                    View Services
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center order-1 order-lg-2 mb-4 mb-lg-0">
              <div className="hero-image-wrapper position-relative" data-aos="fade-left" data-aos-delay="200">
                <img 
                  src="/imgs/pn1.png" 
                  alt="Digital Growth Expert" 
                  className="img-fluid position-relative z-2 hero-main-img" 
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                />
                <div className="blob-shape position-absolute top-50 start-50 translate-middle z-0 bg-gradient-red opacity-10 rounded-circle" 
                     style={{ width: '80%', height: '80%', filter: 'blur(50px)' }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Hero;