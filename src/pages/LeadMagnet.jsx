import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const LeadMagnet = () => {
  // SCORE STATE: Tracks how many boxes are checked
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // CHECKLIST DATA (From your PDF)
  const checklist = [
    // SECTION A: VISIBILITY
    { id: 1, text: "Do you own your platform? (Not just Facebook/TikTok)" },
    { id: 2, text: "Is your business visible on Google Maps/Search?" },
    { id: 3, text: "Do you have a professional domain name? (www.yourclinic.com)" },
    { id: 4, text: "Is your brand consistent everywhere?" },
    { id: 5, text: "Is your business info (Hours/Services) up to date 24/7?" },
    // SECTION B: USER EXPERIENCE
    { id: 6, text: "Is your presence Mobile-Optimized?" },
    { id: 7, text: "Does your site load in under 3 seconds?" },
    { id: 8, text: "Is navigation intuitive? (Can strangers find 'Services'?)" },
    { id: 9, text: "Is your content readable? (Clear headlines, no walls of text)" },
    { id: 10, text: "Do you have high-quality visuals?" },
    // SECTION C: CONVERSION
    { id: 11, text: "Do you have a clear Call-to-Action (CTA) on every page?" },
    { id: 12, text: "Is your site Secured (SSL/Padlock icon)?" },
    { id: 13, text: "Is there a Lead Capture system (Form/Newsletter)?" },
    { id: 14, text: "Do you have Social Proof (Testimonials) visible?" },
    { id: 15, text: "Do you have Analytics installed?" }
  ];

  // LOGIC: Handle checkbox clicks
  const toggleItem = (e) => {
    if (e.target.checked) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
  };

  return (
    <div className="min-vh-100 bg-light font-montserrat">
      
      {/* 1. HERO HEADER: Engaging Gradient */}
      <header className="py-5 text-white text-center shadow-lg" 
        style={{ background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' }}>
        <div className="container py-4">
          <a href="/" className="btn btn-outline-light rounded-pill btn-sm mb-4">
            <FaArrowLeft className="me-2" /> Back to Home
          </a>
          <h1 className="display-4 fw-bold mb-3">The Digital Growth Blueprint</h1>
          <p className="lead opacity-75">
            Is Your Business Actually Ready for Online Customers? <br/>
            Take the 15-Point Revenue Diagnosis.
          </p>
        </div>
      </header>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* 2. THE CHECKLIST CARD */}
            <div className="card shadow border-0 rounded-4 mb-5" data-aos="fade-up">
              <div className="card-body p-5">
                <h3 className="fw-bold text-dark mb-4">The Readiness Checklist</h3>
                <p className="text-muted mb-4 small">Check the box if "YES". Leave blank if "NO".</p>
                
                <form>
                  {checklist.map((item) => (
                    <div key={item.id} className="form-check mb-3 p-3 bg-light rounded-3">
                      <input 
                        className="form-check-input fs-5 mt-1 me-3" 
                        type="checkbox" 
                        id={`check-${item.id}`} 
                        onChange={toggleItem}
                      />
                      <label className="form-check-label fs-6 pt-1" htmlFor={`check-${item.id}`}>
                        {item.text}
                      </label>
                    </div>
                  ))}
                </form>

                <div className="text-center mt-5">
                  <button 
                    onClick={() => setShowResult(true)} 
                    className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow"
                  >
                    Diagnose My Business
                  </button>
                </div>
              </div>
            </div>

            {/* 3. THE DIAGNOSIS (ANIMATED REVEAL) */}
            {showResult && (
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5" data-aos="zoom-in">
                <div className={`card-body p-5 text-center text-white ${
                  score >= 12 ? 'bg-success' : score >= 8 ? 'bg-warning' : 'bg-danger'
                }`}>
                  <h2 className="fw-bold text-uppercase mb-3">Your Score: {score}/15</h2>
                  
                  {/* DYNAMIC FEEDBACK from PDF */}
                  {score >= 12 && (
                    <div>
                      <FaCheckCircle size={50} className="mb-3" />
                      <h3>Excellent. You are ready to scale.</h3>
                    </div>
                  )}
                  {score >= 8 && score < 12 && (
                    <div className="text-dark">
                      <FaExclamationTriangle size={50} className="mb-3" />
                      <h3>Risky. You are losing potential leads daily.</h3>
                    </div>
                  )}
                  {score < 8 && (
                    <div>
                      <FaTimesCircle size={50} className="mb-3" />
                      <h3>Critical. Your business is invisible.</h3>
                    </div>
                  )}
                  
                  <hr className="my-4 opacity-50" />
                  
                  <div className={score >= 8 && score < 12 ? "text-dark" : "text-white"}>
                    <p className="mb-4 fs-5">
                      Don't let a low score hold you back. We specialize in fixing these exact gaps.
                    </p>
                    {/* CTA LINKING BACK TO HOME BOOKING */}
                    <a href="/#book" className="btn btn-light text-dark fw-bold btn-lg rounded-pill px-5 shadow">
                      Claim Free Strategy Session
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 4. THE CURE (Macrotek Solutions from PDF) */}
            <div className="text-center mt-5" data-aos="fade-up">
              <h6 className="text-uppercase text-primary fw-bold letter-spacing-2">The Cure</h6>
              <h2 className="fw-bold mb-4">How We Fix Your Score</h2>
              
              <div className="row g-4 text-start">
                <div className="col-md-6">
                  <div className="p-4 bg-white shadow-sm rounded-3 h-100 border-start border-5 border-primary">
                    <h5 className="fw-bold">Visibility & Awareness</h5>
                    [cite_start]<p className="text-muted small mb-0">We build SEO-ready hubs that capture interest without you repeating yourself 100 times a day. [cite: 50]</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 bg-white shadow-sm rounded-3 h-100 border-start border-5 border-danger">
                    <h5 className="fw-bold">24/7 Revenue</h5>
                    [cite_start]<p className="text-muted small mb-0">Our automated booking systems allow your clinic or store to accept orders while you sleep. [cite: 53]</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;