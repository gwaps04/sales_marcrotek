import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

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

  const closeMenu = () => {
    const menu = document.getElementById('navbarNav');
    if (menu && menu.classList.contains('show')) {
      menu.classList.remove('show');
    }
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg navbar-dark bg-gradient-red w-100 shadow-sm smart-navbar ${
        isVisible ? 'navbar-visible' : 'navbar-hidden'
      }`}
    >
      <div className="container-fluid px-4">
        
        <Link className="navbar-brand fw-bold text-uppercase" to="/" onClick={closeMenu}>
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
          <ul className="navbar-nav ms-auto align-items-center gap-4">
            
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="/#services" onClick={closeMenu}>Services</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/#testimonials" onClick={closeMenu}>Testimonials</a>
            </li>
            
            <li className="nav-item">
              <Link 
                className="btn btn-light text-danger fw-bold rounded-pill px-4 shadow-sm" 
                to="/book-now" 
                onClick={closeMenu}
              >
                Book Now
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;