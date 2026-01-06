import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // We use Link instead of <a> for internal pages

const MyNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav 
      className={`navbar navbar-expand-lg navbar-dark bg-gradient-red w-100 shadow-sm smart-navbar ${
        isVisible ? 'navbar-visible' : 'navbar-hidden'
      }`}
    >
      <div className="container-fluid px-4">
        
        {/* Link to Home using React Router Link */}
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          Macrotek Digital Solutions
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav navbar-centered-absolute align-items-center gap-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              {/* Anchor links (#) only work well if you are ALREADY on the home page. 
                  For a multi-page app, we might need to adjust this later. */}
              <a className="nav-link" href="/#services">Services</a>
            </li>
            
            {/* NEW LINK: The Lead Magnet */}
            <li className="nav-item">
              <Link className="nav-link text-warning fw-bold" to="/free-audit">
                Free Growth Audit
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/#testimonials">Testimonials</a>
            </li>
            <li className="nav-item">
              <a className="btn btn-light text-danger fw-bold rounded-pill px-4 shadow-sm" href="/#book">
                Book Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;