import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaArrowLeft, FaRocket } from 'react-icons/fa';

const Result = () => {
  const { score } = useParams();
  const numericScore = parseInt(score) || 0;

  // Woz: Data mapping based on your "guide to answer.txt" [cite: 1, 2, 3, 4, 5, 6, 7, 8]
  const getDiagnosis = (s) => {
    if (s <= 7) {
      return {
        color: 'danger',
        icon: <FaTimesCircle size={80} className="mb-4 text-danger" />,
        title: "Critical System Gap",
        headline: "“Your business badly needs a lead generation and follow-up system.”",
        description: "You’re losing clients because you have no website, no consistent way to get leads, and no automated follow-ups. This is urgent.",
        action: "Critical Overhaul Required"
      };
    } else if (s <= 10) {
      return {
        color: 'warning',
        icon: <FaExclamationTriangle size={80} className="mb-4 text-warning" />,
        title: "Inconsistent Systems",
        headline: "“Your business has some pieces in place, but nothing works reliably together.”",
        description: "You’re leaving money on the table because your process is manual and inconsistent. A few automations would double your results.",
        action: "Strategic Automation Needed"
      };
    } else if (s <= 13) {
      return {
        color: 'info',
        icon: <FaExclamationTriangle size={80} className="mb-4 text-info" />,
        title: "Minor Gaps",
        headline: "“Your business is doing okay, but small inefficiencies are holding you back.”",
        description: "You don’t need a full overhaul — just 1–2 specific fixes to scale smoothly.",
        action: "Optimization Recommended"
      };
    } else {
      return {
        color: 'success',
        icon: <FaCheckCircle size={80} className="mb-4 text-success" />,
        title: "Already Systemized",
        headline: "“Your business already has strong digital systems in place.”",
        description: "You’re ahead of most. Focus on advanced growth or maintenance.",
        action: "Scale with Confidence"
      };
    }
  };

  const diagnosis = getDiagnosis(numericScore);

  return (
    <div className="bg-light font-montserrat min-vh-100 py-5">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            
            <Link to="/assessment" className="btn btn-outline-dark rounded-pill btn-sm mb-4 px-4 shadow-sm">
              <FaArrowLeft className="me-2" /> Retake Assessment
            </Link>

            <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5 animate-fade-in">
              <div className="card-header bg-macrotek-black text-white py-4">
                <h5 className="text-uppercase letter-spacing-2 m-0 opacity-75 small">Your Digital Readiness Score</h5>
                <h1 className="display-3 fw-bold m-0 text-macrotek-orange">{numericScore} <span className="fs-4 text-white opacity-50">/ 15</span></h1>
              </div>

              <div className="card-body p-5">
                {diagnosis.icon}
                <h2 className={`fw-bold text-${diagnosis.color} text-uppercase mb-3`}>{diagnosis.title}</h2>
                <h4 className="fw-bold text-dark mb-4 px-md-5" style={{ lineHeight: '1.4' }}>{diagnosis.headline}</h4>
                <p className="lead text-muted mb-5 px-md-4">{diagnosis.description}</p>

                <div className={`p-3 rounded-3 bg-light border-start border-5 border-${diagnosis.color} text-start mb-4`}>
                    <p className="mb-0 small fw-bold text-uppercase text-muted">Immediate Action Item:</p>
                    <p className="mb-0 fw-bold text-dark">{diagnosis.action}</p>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION */}
            <div className="rounded-4 p-5 text-center text-white shadow-lg bg-macrotek-black border-bottom border-5 border-macrotek-orange">
              <h2 className="fw-bold mb-3">Stop Losing Leads. Start Scaling.</h2>
              <p className="lead mb-4 opacity-75">You have the diagnosis. Now you need the specialist to build your roadmap to profit.</p>
              
              <Link 
                to="/#book" 
                className="btn btn-macrotek-orange btn-lg rounded-pill px-5 fw-bold shadow transform-hover py-3"
                style={{ fontSize: '1.1rem' }}
              >
                Claim Free 30-Minute Strategy Session
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;