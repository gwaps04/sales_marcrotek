import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const MyNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 1. Navbar Scroll Hide/Show Logic
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

  // 2. NEW: Function to force-close the mobile menu
  const closeMenu = () => {
    const menu = document.getElementById('navbarNav');
    // If the menu is open (has 'show' class), remove it
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
          <ul className="navbar-nav navbar-centered-absolute align-items-center gap-4">
            
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="/#services" onClick={closeMenu}>Services</a>
            </li>
            
            {/* HIDDEN: "Free Growth Audit" is removed from here.
               It is now accessible ONLY via the Email Link. 
            */}

            <li className="nav-item">
              <a className="nav-link" href="/#testimonials" onClick={closeMenu}>Testimonials</a>
            </li>
            
            <li className="nav-item">
              <a className="btn btn-light text-danger fw-bold rounded-pill px-4 shadow-sm" href="/#book" onClick={closeMenu}>
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