import React from 'react';
// 1. IMPORT THE NEW ICON (FaGlobe)
import { FaFacebook, FaPhoneAlt, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          
          {/* COLUMN 1: Copyright */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 small text-white-50">
              &copy; {new Date().getFullYear()} Macrotek Digital Solutions. All Rights Reserved.
            </p>
          </div>

          {/* COLUMN 2: Contact & Socials */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-4 align-items-center">
              
              {/* Phone Number */}
              <a href="tel:+639563355850" className="text-white text-decoration-none small hover-opacity">
                <FaPhoneAlt className="me-2 text-danger" />
                +63 956 335 5850
              </a>

              {/* 2. MAIN WEBSITE LINK (Added Here) */}
              <a 
                href="https://www.macrotekdigitalsolutions.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white fs-4 hover-opacity"
                title="Visit Main Website"
              >
                <FaGlobe />
              </a>

              {/* Facebook Link */}
              <a 
                href="https://www.facebook.com/macrotekdigitalsolutions" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white fs-4 hover-opacity"
                title="Visit us on Facebook"
              >
                <FaFacebook />
              </a>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;