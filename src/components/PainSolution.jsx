import React from 'react';
// Import icons for visual storytelling
import { FaSpinner, FaChartLine, FaTasks, FaRocket, FaFunnelDollar, FaRobot } from 'react-icons/fa';
import { BsXCircleFill, BsCheckCircleFill } from 'react-icons/bs';

const PainSolution = () => {
  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="container">
        
        {/* SECTION HEADER */}
        <div className="row text-center mb-5" data-aos="fade-up">
          <div className="col-lg-8 mx-auto">
            <h2 className="display-5 fw-bold mb-3">
              Is Your Current Website Holding Your Business Back?
            </h2>
            <p className="lead text-muted">
              Let’s bridge the gap between where you are and where you could be.
            </p>
          </div>
        </div>

        {/* THE COMPARISON SPLIT */}
        <div className="row g-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* LEFT SIDE: THE STRUGGLE (Pain) */}
          <div className="col-lg-6 bg-light p-5 border-end" data-aos="fade-right">
            <div className="text-center mb-5">
              <span className="badge bg-secondary text-uppercase letter-spacing-2 mb-2">Current Reality</span>
              <h3 className="fw-bold text-muted">The Struggle</h3>
            </div>

            {/* Pain Point 1: Speed */}
            <div className="d-flex gap-4 mb-5 opacity-75">
              <div className="flex-shrink-0">
                <FaSpinner className="text-danger fs-1" />
              </div>
              <div>
                <h5 className="fw-bold text-danger mb-2">
                  <BsXCircleFill className="me-2" size={16} />
                  Slow Loading Speeds
                </h5>
                <p className="text-muted small">
                  Customers leave before your page even opens. You are losing credibility and sales to competitors just because of lag.
                </p>
              </div>
            </div>

            {/* Pain Point 2: Traffic */}
            <div className="d-flex gap-4 mb-5 opacity-75">
              <div className="flex-shrink-0">
                <FaChartLine className="text-danger fs-1" />
              </div>
              <div>
                <h5 className="fw-bold text-danger mb-2">
                  <BsXCircleFill className="me-2" size={16} />
                  Traffic Without Revenue
                </h5>
                <p className="text-muted small">
                  You get clicks and "likes," but the inquiries aren't turning into paying customers. It feels like you are shouting into a void.
                </p>
              </div>
            </div>

            {/* Pain Point 3: Manual Tasks */}
            <div className="d-flex gap-4 opacity-75">
              <div className="flex-shrink-0">
                <FaTasks className="text-danger fs-1" />
              </div>
              <div>
                <h5 className="fw-bold text-danger mb-2">
                  <BsXCircleFill className="me-2" size={16} />
                  Drowning in Manual Tasks
                </h5>
                <p className="text-muted small">
                  You are stuck replying to chats, updating inventory, and tracking leads manually. You are working in the business, not on it.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: THE MACROTEK SOLUTION (Gain) */}
          <div className="col-lg-6 bg-white p-5 position-relative" data-aos="fade-left">
            {/* Background highlight for the 'Good' side */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary opacity-10" style={{ pointerEvents: 'none' }}></div>
            
            <div className="text-center mb-5 position-relative">
              <span className="badge bg-success text-uppercase letter-spacing-2 mb-2">Future Standard</span>
              <h3 className="fw-bold text-dark">The Macrotek Solution</h3>
            </div>

            {/* Solution 1: Speed */}
            <div className="d-flex gap-4 mb-5 position-relative">
              <div className="flex-shrink-0">
                <FaRocket className="text-success fs-1" />
              </div>
              <div>
                <h5 className="fw-bold text-success mb-2">
                  <BsCheckCircleFill className="me-2" size={16} />
                  High-Performance Storefronts
                </h5>
                <p className="text-dark small">
                  We build fast, responsive, and reliable digital storefronts. Your business remains open, professional, and ready to sell 24/7 without delays.
                </p>
              </div>
            </div>

            {/* Solution 2: Conversion */}
            <div className="d-flex gap-4 mb-5 position-relative">
              <div className="flex-shrink-0">
                <FaFunnelDollar className="text-success fs-1" />
              </div>
              <div>
                <h5 className="fw-bold text-success mb-2">
                  <BsCheckCircleFill className="me-2" size={16} />
                  Lead Conversion Systems
                </h5>
                <p className="text-dark small">
                  We don’t just build pretty pages; we build sales engines. Our designs are psychology-backed to guide visitors from "just looking" to "ready to buy."
                </p>
              </div>
            </div>

            {/* Solution 3: Automation */}
            <div className="d-flex gap-4 position-relative">
              <div className="flex-shrink-0">
                <FaRobot className="text-success fs-1" />
              </div>
              <div>
                <h5 className="fw-bold text-success mb-2">
                  <BsCheckCircleFill className="me-2" size={16} />
                  Enterprise-Grade Automations
                </h5>
                <p className="text-dark small">
                  Scale like a big corporation without the overhead. We automate your repetitive tasks so you can focus on strategy and growth while the system does the heavy lifting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CAPTION */}
        <div className="row mt-5 text-center">
          <div className="col-12" data-aos="zoom-in">
            <h4 className="fw-bold fst-italic text-secondary">
              "Stop settling for 'good enough.' Upgrade to a system that works as hard as you do."
            </h4>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PainSolution;