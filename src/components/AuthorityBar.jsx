import React from 'react';
// Importing specific brand icons from the SimpleIcons (si) pack
import { 
  SiWordpress, 
  SiReact, 
  SiJavascript, 
  SiPostgresql, 
  SiNodedotjs, 
  SiVercel, 
  SiGithub 
} from 'react-icons/si';

const AuthorityBar = () => {
  // Configuration for uniform icon size and styling
  const iconStyle = { fontSize: '2.5rem', transition: 'transform 0.3s ease, color 0.3s ease' };

  return (
    <div className="bg-light py-5" data-aos="fade-in" data-aos-delay="200">
      <div className="container">
        
        {/* Section Heading */}
        <div className="row mb-4">
          <div className="col text-center">
            <p className="text-uppercase text-muted fw-bold letter-spacing-2 m-0" style={{ letterSpacing: '2px' }}>
              Tech Stack We Use
            </p>
          </div>
        </div>

        {/* Logos Flex Container */}
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-4 gap-md-5 opacity-75">
          
          {/* WordPress */}
          <div className="text-secondary hover-color-brand" title="WordPress">
            <SiWordpress style={iconStyle} />
          </div>

          {/* React */}
          <div className="text-secondary hover-color-brand" title="React">
            <SiReact style={iconStyle} />
          </div>

          {/* JavaScript */}
          <div className="text-secondary hover-color-brand" title="JavaScript">
            <SiJavascript style={iconStyle} />
          </div>

          {/* PostgreSQL */}
          <div className="text-secondary hover-color-brand" title="PostgreSQL">
            <SiPostgresql style={iconStyle} />
          </div>

          {/* Node.js */}
          <div className="text-secondary hover-color-brand" title="Node.js">
            <SiNodedotjs style={iconStyle} />
          </div>

          {/* Vercel */}
          <div className="text-secondary hover-color-brand" title="Vercel">
            <SiVercel style={iconStyle} />
          </div>

          {/* GitHub */}
          <div className="text-secondary hover-color-brand" title="GitHub">
            <SiGithub style={iconStyle} />
          </div>

          {/* GoHighLevel (Custom Image) 
              Note: You need to place a 'ghl-logo.png' in your public/imgs folder.
              If you don't have one yet, this text acts as a placeholder.
          */}
          <div className="d-flex align-items-center text-secondary fw-bold" style={{ fontSize: '1.5rem' }}>
             {/* Replace this text with <img src="/imgs/ghl-logo.png" height="40" /> once you have the file */}
             <span>GoHighLevel</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthorityBar;