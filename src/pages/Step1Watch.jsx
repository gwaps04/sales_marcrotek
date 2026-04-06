import React from 'react';
import { Link } from 'react-router-dom';

const Step1Watch = () => {
  return (
    <div className="container py-5 font-lato">
      
      {/* Header Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="display-3 mb-2" style={{ fontWeight: 900 }}>
          Manual vs. Automated
        </h1>
        <p className="lead text-muted">See the difference in how your business scales.</p>
      </div>

      <div className="row g-4 align-items-stretch">
        {/* Manual / Traditional Way Card */}
        <div className="col-md-6" data-aos="fade-right">
          <div className="card h-100 border-danger border-2 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-danger text-white py-4 text-center border-0">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-x-lg me-2"></i> Manual / Traditional Way
              </h3>
              <p className="mb-0 opacity-75 small">(Reality Today)</p>
            </div>
            <div className="card-body p-4 p-lg-5">
              <p className="fw-bold mb-3">Scenario:</p>
              <p className="text-muted mb-4 italic">A potential client messages your business at 9:30 PM…</p>
              
              <ul className="list-unstyled">
                {/* Woz: bi-exclamation-octagon-fill signifies the headache/stress side */}
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-exclamation-octagon-fill text-danger me-3 fs-5"></i>
                  <span>You reply the next morning</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-exclamation-octagon-fill text-danger me-3 fs-5"></i>
                  <span>Client already contacted 2–3 competitors</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-exclamation-octagon-fill text-danger me-3 fs-5"></i>
                  <span>You forget to follow up</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-exclamation-octagon-fill text-danger me-3 fs-5"></i>
                  <span>No system to track leads</span>
                </li>
              </ul>
              
              <div className="mt-5 pt-4 border-top border-danger border-opacity-25">
                <h4 className="text-danger fw-bold mb-0">Result: Lost sale</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Way Card */}
        <div className="col-md-6" data-aos="fade-left">
          <div className="card h-100 border-success border-2 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-success text-white py-4 text-center border-0">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-check-lg me-2"></i> With Website + Automation
              </h3>
            </div>
            <div className="card-body p-4 p-lg-5">
              <p className="fw-bold mb-3">Same Scenario:</p>
              <br />
              
              <ul className="list-unstyled">
                {/* Woz: bi-stars signifies the 100% ease and magic side */}
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-stars text-success me-3 fs-5"></i>
                  <span>Instant auto-reply within seconds</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-stars text-success-emphasis me-3 fs-5"></i>
                  <span>Client gets info + pricing + next steps</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-stars text-success-emphasis me-3 fs-5"></i>
                  <span>Automatically booked into your calendar</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-stars text-success-emphasis me-3 fs-5"></i>
                  <span>Follow-up messages sent automatically</span>
                </li>
              </ul>
              
              <div className="mt-5 pt-4 border-top border-success border-opacity-25">
                <h4 className="text-success fw-bold mb-0">Result: Higher chance of closing</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 CTA Section */}
      <div className="mt-5 py-5 text-center bg-light border shadow-sm" data-aos="zoom-in" style={{ borderRadius: '20px' }}>
        <h2 className="fw-bold mb-3">Step 2: Start your Free Online Consultation!</h2>
        <p className="text-muted mb-4">You're just one click away from transforming your business operations.</p>
        <Link to="/book-now" className="btn btn-macrotek-orange btn-lg px-5 py-3 fw-bold shadow-sm">
          <i className="bi bi-calendar-check me-2"></i>
          Book My Free Consultation
        </Link>
      </div>
    </div>
  );
};

export default Step1Watch;