import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaArrowLeft, 
  FaTrashAlt, 
  FaChartLine, 
  FaShoppingCart, 
  FaUsersCog, 
  FaShieldAlt 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeadMagnet = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const currentScore = Object.values(checkedItems).filter(Boolean).length;
    setScore(currentScore);
  }, [checkedItems]);

  const handleClear = () => {
    setCheckedItems({});
    setShowResult(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id] 
    }));
  };

  // --- CUSTOM STYLES FOR ANIMATION ---
  // This creates a "Heartbeat" effect for the button
  const customStyles = `
    @keyframes pulse-red {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 15px rgba(220, 53, 69, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
      }
    }
    .btn-pulse {
      animation: pulse-red 2s infinite;
    }
  `;

  // DATA: The 15-Point Checklist
  const checklistData = [
    {
      category: "SECTION A: VISIBILITY & OWNERSHIP (Do they know you exist?)",
      items: [
        { id: 1, text: "Do you own your platform? (Not just Facebook/Instagram/TikTok)" },
        { id: 2, text: "Is your business visible on Google Maps/Search?" },
        { id: 3, text: "Do you have a professional domain name? (e.g., www.yourclinic.com)" },
        { id: 4, text: "Is your brand consistent? (Logo/messaging same everywhere)" },
        { id: 5, text: "Is your business information up to date 24/7? (Hours/Services)" }
      ]
    },
    {
      category: "SECTION B: USER EXPERIENCE (Is it easy to buy?)",
      items: [
        { id: 6, text: "Is your presence Mobile-Optimized? (Looks perfect on smartphones)" },
        { id: 7, text: "Does your site load in under 3 seconds?" },
        { id: 8, text: "Is navigation intuitive? (Can a stranger find 'Services' in one click?)" },
        { id: 9, text: "Is your content readable? (No walls of text, clear headlines)" },
        { id: 10, text: "Do you have high-quality visuals? (Professional images, not blurry)" }
      ]
    },
    {
      category: "SECTION C: CONVERSION & SECURITY (Is it safe to buy?)",
      items: [
        { id: 11, text: "Do you have a clear Call-to-Action (CTA) on every page?" },
        { id: 12, text: "Is your site Secured (SSL/Padlock icon)?" },
        { id: 13, text: "Is there a Lead Capture system? (Form or newsletter signup)" },
        { id: 14, text: "Do you have Social Proof? (Testimonials/Case studies visible)" },
        { id: 15, text: "Do you have Analytics installed? (Tracking visitor data)" }
      ]
    }
  ];

  return (
    <div className="bg-light font-montserrat min-vh-100">
      {/* Inject Styles */}
      <style>{customStyles}</style>

      {/* 1. HERO SECTION */}
      <header 
        className="text-white text-center position-relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', 
          paddingTop: '6rem', 
          paddingBottom: '5rem' 
        }}
      >
        <div className="container position-relative z-2">
          <Link to="/" className="btn btn-outline-light rounded-pill btn-sm mb-4 px-4">
            <FaArrowLeft className="me-2" /> Back to Home
          </Link>
          
          <h1 className="display-4 fw-bold mb-3" data-aos="fade-down">
            The Digital Growth Blueprint
          </h1>
          <p className="lead opacity-75 mb-4" data-aos="fade-up" data-aos-delay="200">
            Is Your Business Actually Ready for Online Customers?
          </p>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="alert alert-danger border-0 shadow-lg" role="alert" data-aos="zoom-in" data-aos-delay="400">
                <h5 className="alert-heading fw-bold">
                  <FaExclamationTriangle className="me-2" /> 
                  The Wake-Up Call
                </h5>
                <p className="mb-0 small text-dark">
                  "Social media is rented land. A dedicated website is your digital real estate. 
                  It’s the difference between a hobby and a scalable enterprise."
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            
            {/* 2. THE CHECKLIST CARD */}
            <div className="card shadow-lg border-0 rounded-4 mb-5" data-aos="fade-up">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-bold text-dark m-0">The 15-Point Revenue Checklist</h3>
                  <button onClick={handleClear} className="btn btn-outline-danger btn-sm rounded-pill">
                    <FaTrashAlt className="me-1" /> Clear
                  </button>
                </div>
                
                <p className="text-muted mb-4 fst-italic border-start border-4 border-primary ps-3">
                  Be honest with your answers. Your future revenue depends on it. 
                  Check the box if <strong>"YES"</strong>. Leave blank if <strong>"NO"</strong>.
                </p>

                <form>
                  {checklistData.map((section, sIndex) => (
                    <div key={sIndex} className="mb-4">
                      <h6 className="text-uppercase text-primary fw-bold letter-spacing-1 mb-3 mt-4">
                        {section.category}
                      </h6>
                      {section.items.map((item) => (
                        <div 
                          key={item.id} 
                          className={`form-check p-3 rounded-3 mb-2 transition-all ${
                            checkedItems[item.id] ? 'bg-primary bg-opacity-10' : 'bg-light'
                          }`}
                          onClick={() => toggleItem(item.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <input 
                            className="form-check-input fs-5 mt-0 me-3" 
                            type="checkbox" 
                            id={`check-${item.id}`} 
                            checked={checkedItems[item.id] || false}
                            onChange={() => toggleItem(item.id)}
                            style={{ cursor: 'pointer' }}
                          />
                          <label 
                            className="form-check-label fs-6 pt-1 w-100" 
                            style={{ cursor: 'pointer' }}
                          >
                            {item.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </form>

                <div className="text-center mt-5">
                  <button 
                    onClick={() => setShowResult(true)} 
                    className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-lg transform-hover"
                    style={{ minWidth: '250px' }}
                  >
                    Get My Diagnosis
                  </button>
                </div>
              </div>
            </div>

            {/* 3. THE DIAGNOSIS */}
            {showResult && (
              <div id="results" className="scroll-mt-5">
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5" data-aos="zoom-in">
                  <div className={`card-body p-5 text-center text-white ${
                    score >= 12 ? 'bg-success' : score >= 8 ? 'bg-warning' : 'bg-danger'
                  }`}>
                    <h2 className="display-4 fw-bold mb-2">{score} / 15</h2>
                    <h4 className="text-uppercase letter-spacing-2 opacity-75 mb-4">Your Readiness Score</h4>
                    
                    {score >= 12 && (
                      <div>
                        <FaCheckCircle size={60} className="mb-3" />
                        <h2 className="fw-bold">Excellent.</h2>
                        <p className="fs-5">You are ready to scale.</p>
                      </div>
                    )}
                    {score >= 8 && score < 12 && (
                      <div className="text-dark">
                        <FaExclamationTriangle size={60} className="mb-3" />
                        <h2 className="fw-bold">Risky.</h2>
                        <p className="fs-5">You are losing potential leads daily.</p>
                      </div>
                    )}
                    {score < 8 && (
                      <div>
                        <FaTimesCircle size={60} className="mb-3" />
                        <h2 className="fw-bold">Critical.</h2>
                        <p className="fs-5">Your business is invisible to the modern customer.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. THE CURE */}
                <div className="text-center mb-5" data-aos="fade-up">
                  <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">THE CURE</span>
                  <h2 className="fw-bold mb-5">Transform Your Website from an<br/>Expense into an Investment</h2>
                  
                  <div className="row g-4 text-start">
                    <div className="col-md-6">
                      <div className="p-4 bg-white shadow-sm rounded-4 h-100 border-top border-5 border-primary">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                                <FaChartLine size={24} />
                            </div>
                            <h5 className="fw-bold m-0">Marketing & Awareness</h5>
                        </div>
                        <p className="text-muted small">
                          <strong>The Pain:</strong> "People don't know my new services."<br/>
                          <strong>Our Fix:</strong> We build SEO-ready architectures. Your site becomes a central hub that educates customers 24/7.
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-4 bg-white shadow-sm rounded-4 h-100 border-top border-5 border-danger">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger me-3">
                                <FaShoppingCart size={24} />
                            </div>
                            <h5 className="fw-bold m-0">Sales on Autopilot</h5>
                        </div>
                        <p className="text-muted small">
                          <strong>The Pain:</strong> "I only sell when I'm awake."<br/>
                          <strong>Our Fix:</strong> Integrated booking and e-commerce systems allow you to accept appointments and orders while you sleep.
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-4 bg-white shadow-sm rounded-4 h-100 border-top border-5 border-success">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success me-3">
                                <FaUsersCog size={24} />
                            </div>
                            <h5 className="fw-bold m-0">Expansion & CRM</h5>
                        </div>
                        <p className="text-muted small">
                          <strong>The Pain:</strong> "I'm overwhelmed with admin work."<br/>
                          <strong>Our Fix:</strong> We deploy Enterprise Systems that track inventory and manage customer data automatically.
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-4 bg-white shadow-sm rounded-4 h-100 border-top border-5 border-warning">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning me-3">
                                <FaShieldAlt size={24} />
                            </div>
                            <h5 className="fw-bold m-0">Security & Speed</h5>
                        </div>
                        <p className="text-muted small">
                          <strong>The Pain:</strong> "My site is slow and unsafe."<br/>
                          <strong>Our Fix:</strong> Enterprise-grade security (SSL) and optimization. Fast sites rank higher on Google.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. FINAL CTA (ANIMATED) */}
                <div 
                  className="rounded-4 p-5 text-center text-white shadow-lg position-relative overflow-hidden"
                  style={{ background: 'linear-gradient(to right, #ff416c, #ff4b2b)' }}
                  data-aos="zoom-in-up"
                >
                  <div className="position-relative z-2">
                    <h2 className="fw-bold mb-3">Stop Losing Leads. Start Scaling Today.</h2>
                    <p className="lead mb-4">You have the diagnosis. Now you need the specialist.</p>
                    
                    {/* BUTTON UPDATED: Uses 'btn-pulse' class and Link to /#book */}
                    <Link 
                      to="/#book" 
                      className="btn btn-light text-danger fw-bold btn-lg rounded-pill px-5 shadow btn-pulse"
                      style={{ fontSize: '1.2rem' }}
                    >
                      Claim Free 30-Minute Strategy Session
                    </Link>
                    
                    <p className="mt-4 mb-0 opacity-75 small">
                      Let’s review your checklist score and build a roadmap to profit.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;